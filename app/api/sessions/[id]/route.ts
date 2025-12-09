import { NextRequest, NextResponse } from 'next/server';
import {
  getSession,
  getSessionWithAnswers,
  updateSession,
  upsertAnswer
} from '@/app/lib/db';
import { sendWebhook, buildWebhookPayload } from '@/app/lib/webhook';
import { getQualificationTier } from '@/app/lib/funnelData';

// GET /api/sessions/[id] - Get session by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = getSessionWithAnswers(id);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, session });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

// PATCH /api/sessions/[id] - Update session (answer, lead info, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const {
      // Answer data
      questionId,
      answerId,
      answerText,
      qualificationScore,
      tags,
      currentQuestionId,
      // Lead data
      firstName,
      lastName,
      email,
      phone,
      // Status
      status,
    } = body;

    // Get current session
    const currentSession = getSession(id);
    if (!currentSession) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: Record<string, unknown> = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (currentQuestionId !== undefined) updateData.currentQuestionId = currentQuestionId;
    if (status !== undefined) updateData.status = status;

    // Update qualification score (additive)
    if (qualificationScore !== undefined) {
      const newScore = currentSession.qualificationScore + qualificationScore;
      updateData.qualificationScore = newScore;

      // Merge tags
      if (tags && Array.isArray(tags)) {
        let existingTags: string[] = [];
        try {
          existingTags = JSON.parse(currentSession.tags);
        } catch {
          existingTags = [];
        }
        const mergedTags = [...new Set([...existingTags, ...tags])];
        updateData.tags = JSON.stringify(mergedTags);
      }

      // Calculate qualification tier
      const tier = getQualificationTier(newScore);
      updateData.qualificationTier = tier.tier;
    }

    // Update session
    const updatedSession = updateSession(id, updateData);

    // Create answer record if provided
    if (questionId && answerId) {
      upsertAnswer({
        sessionId: id,
        questionId,
        answerId,
        answerText,
      });
    }

    return NextResponse.json({
      success: true,
      session: updatedSession,
    });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update session' },
      { status: 500 }
    );
  }
}

// POST /api/sessions/[id] - Complete session and send webhook
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json().catch(() => ({}));
    const action = body.action || 'complete';

    if (action === 'complete') {
      // Mark session as completed
      const session = updateSession(id, {
        status: 'completed',
        completedAt: new Date().toISOString(),
      });

      if (!session) {
        return NextResponse.json(
          { success: false, error: 'Session not found' },
          { status: 404 }
        );
      }

      // Get session with answers for webhook
      const fullSession = getSessionWithAnswers(id);
      if (!fullSession) {
        return NextResponse.json(
          { success: false, error: 'Session not found' },
          { status: 404 }
        );
      }

      // Build webhook payload
      const payload = buildWebhookPayload({
        id: fullSession.id,
        status: fullSession.status,
        createdAt: new Date(fullSession.createdAt),
        completedAt: fullSession.completedAt ? new Date(fullSession.completedAt) : null,
        firstName: fullSession.firstName,
        lastName: fullSession.lastName,
        email: fullSession.email,
        phone: fullSession.phone,
        qualificationScore: fullSession.qualificationScore,
        qualificationTier: fullSession.qualificationTier,
        tags: fullSession.tags,
        userAgent: fullSession.userAgent,
        ipAddress: fullSession.ipAddress,
        referrer: fullSession.referrer,
        answers: fullSession.answers,
      });

      // Send webhook
      const webhookResult = await sendWebhook(payload);

      // Update webhook sent timestamp
      if (webhookResult.success) {
        updateSession(id, { webhookSentAt: new Date().toISOString() });
      }

      return NextResponse.json({
        success: true,
        session: fullSession,
        webhookSent: webhookResult.success,
        webhookError: webhookResult.error,
      });
    } else if (action === 'abandon') {
      // Mark session as abandoned
      const session = updateSession(id, {
        status: 'abandoned',
      });

      return NextResponse.json({
        success: true,
        session,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error completing session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to complete session' },
      { status: 500 }
    );
  }
}
