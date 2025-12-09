import { NextResponse } from 'next/server';
import { sendWebhook, WebhookPayload } from '@/app/lib/webhook';

// POST /api/test-webhook - Send a test webhook with all fields
export async function POST() {
  // Create a test payload with all fields populated
  const testPayload: WebhookPayload = {
    // Session Info
    sessionId: 'test-session-' + Date.now(),
    sessionStatus: 'completed',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),

    // Lead Contact Info
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '555-123-4567',

    // Qualification
    qualificationScore: 175,
    qualificationTier: 'hot',
    tags: ['serious-buyer', 'has-land', 'cash-buyer', 'hot-lead', 'budget-100-150k', 'double-wide', 'new-home'],

    // All Question Answers
    answers: {
      'start': { questionId: 'start', answerId: 'yes-serious', answerText: "Absolutely, I'm ready to make this happen" },
      'motivation': { questionId: 'motivation', answerId: 'first-home', answerText: 'Looking to own my first home' },
      'timeline': { questionId: 'timeline', answerId: 'asap', answerText: 'As soon as possible' },
      'land-situation': { questionId: 'land-situation', answerId: 'have-land', answerText: 'Yes, I have land ready' },
      'land-utilities': { questionId: 'land-utilities', answerId: 'all-utilities', answerText: 'All utilities are there' },
      'home-size': { questionId: 'home-size', answerId: '3-bed', answerText: '3 bedrooms' },
      'home-style': { questionId: 'home-style', answerId: 'double-wide', answerText: 'Double-wide' },
      'new-vs-used': { questionId: 'new-vs-used', answerId: 'new-only', answerText: 'New - I want everything fresh' },
      'payment-method': { questionId: 'payment-method', answerId: 'cash', answerText: "I'm paying cash" },
      'cash-budget': { questionId: 'cash-budget', answerId: '100-150k', answerText: '$100,000 - $150,000' },
      'final-question': { questionId: 'final-question', answerId: 'call-me', answerText: "Call me - I'm ready to talk" },
    },

    // Individual Answer Fields (for easier mapping)
    answer_start: "Absolutely, I'm ready to make this happen",
    answer_motivation: 'Looking to own my first home',
    answer_timeline: 'As soon as possible',
    answer_land_situation: 'Yes, I have land ready',
    answer_land_utilities: 'All utilities are there',
    answer_land_with_home: null, // Not in this path
    answer_acreage_preference: null, // Not in this path
    answer_community_awareness: null, // Not in this path
    answer_community_preferences: null, // Not in this path
    answer_land_preference_after_education: null, // Not in this path
    answer_home_size: '3 bedrooms',
    answer_home_style: 'Double-wide',
    answer_new_vs_used: 'New - I want everything fresh',
    answer_payment_method: "I'm paying cash",
    answer_cash_budget: '$100,000 - $150,000',
    answer_credit_situation: null, // Cash path, not financing
    answer_credit_improvement: null, // Cash path, not financing
    answer_monthly_budget: null, // Cash path, not financing
    answer_down_payment_amount: null, // Cash path, not combo
    answer_final_question: "Call me - I'm ready to talk",

    // Metadata
    userAgent: 'Test Webhook / 1.0',
    ipAddress: '127.0.0.1',
    referrer: 'https://sealy-questionnaire.com',
  };

  console.log('Sending test webhook with payload:', JSON.stringify(testPayload, null, 2));

  const result = await sendWebhook(testPayload);

  if (result.success) {
    return NextResponse.json({
      success: true,
      message: 'Test webhook sent successfully!',
      payload: testPayload,
    });
  } else {
    return NextResponse.json({
      success: false,
      error: result.error,
      payload: testPayload,
    }, { status: 500 });
  }
}

// GET /api/test-webhook - Show what the test payload looks like
export async function GET() {
  const testPayload: WebhookPayload = {
    sessionId: 'example-session-id',
    sessionStatus: 'completed',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),

    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',

    qualificationScore: 150,
    qualificationTier: 'hot',
    tags: ['serious-buyer', 'has-land', 'cash-buyer'],

    answers: {
      'start': { questionId: 'start', answerId: 'yes-serious', answerText: "Absolutely, I'm ready to make this happen" },
    },

    answer_start: "Absolutely, I'm ready to make this happen",
    answer_motivation: 'Looking to own my first home',
    answer_timeline: 'As soon as possible',
    answer_land_situation: 'Yes, I have land ready',
    answer_land_utilities: 'All utilities are there',
    answer_land_with_home: null,
    answer_acreage_preference: null,
    answer_community_awareness: null,
    answer_community_preferences: null,
    answer_land_preference_after_education: null,
    answer_home_size: '3 bedrooms',
    answer_home_style: 'Double-wide',
    answer_new_vs_used: 'New - I want everything fresh',
    answer_payment_method: "I'm paying cash",
    answer_cash_budget: '$100,000 - $150,000',
    answer_credit_situation: null,
    answer_credit_improvement: null,
    answer_monthly_budget: null,
    answer_down_payment_amount: null,
    answer_final_question: "Call me - I'm ready to talk",

    userAgent: 'Mozilla/5.0...',
    ipAddress: '192.168.1.1',
    referrer: 'https://sealy-questionnaire.com',
  };

  return NextResponse.json({
    message: 'This is an example of the webhook payload structure',
    payload: testPayload,
    fields: Object.keys(testPayload),
  });
}
