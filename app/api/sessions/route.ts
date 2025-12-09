import { NextRequest, NextResponse } from 'next/server';
import { createSession, getAllSessions } from '@/app/lib/db';

// POST /api/sessions - Create a new session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const session = createSession({
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      referrer: body.referrer || request.headers.get('referer'),
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id
    });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

// GET /api/sessions - Get all sessions (for debugging)
export async function GET() {
  try {
    const sessions = getAllSessions(50);

    return NextResponse.json({ success: true, sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}
