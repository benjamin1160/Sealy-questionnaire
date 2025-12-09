// Webhook configuration
export const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/wpxhXvKE7oVVQkIomEKv/webhook-trigger/bf4e30b7-1d2e-4143-a972-11cfe4d872a7';

export interface WebhookPayload {
  // Session Info
  sessionId: string;
  sessionStatus: string;
  createdAt: string;
  completedAt: string | null;

  // Lead Contact Info
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;

  // Qualification
  qualificationScore: number;
  qualificationTier: string | null;
  tags: string[];

  // All Question Answers
  answers: Record<string, {
    questionId: string;
    answerId: string;
    answerText: string | null;
  }>;

  // Individual Answer Fields (for easier mapping)
  answer_start: string | null;
  answer_motivation: string | null;
  answer_timeline: string | null;
  answer_land_situation: string | null;
  answer_land_utilities: string | null;
  answer_land_with_home: string | null;
  answer_acreage_preference: string | null;
  answer_community_awareness: string | null;
  answer_community_preferences: string | null;
  answer_land_preference_after_education: string | null;
  answer_home_size: string | null;
  answer_home_style: string | null;
  answer_new_vs_used: string | null;
  answer_payment_method: string | null;
  answer_cash_budget: string | null;
  answer_credit_situation: string | null;
  answer_credit_improvement: string | null;
  answer_monthly_budget: string | null;
  answer_down_payment_amount: string | null;
  answer_final_question: string | null;

  // Metadata
  userAgent: string | null;
  ipAddress: string | null;
  referrer: string | null;
}

export async function sendWebhook(payload: WebhookPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Helper to build payload from session data
export function buildWebhookPayload(session: {
  id: string;
  status: string;
  createdAt: Date;
  completedAt: Date | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  qualificationScore: number;
  qualificationTier: string | null;
  tags: string;
  userAgent: string | null;
  ipAddress: string | null;
  referrer: string | null;
  answers: Array<{
    questionId: string;
    answerId: string;
    answerText: string | null;
  }>;
}): WebhookPayload {
  // Build answers record
  const answersRecord: Record<string, { questionId: string; answerId: string; answerText: string | null }> = {};
  for (const answer of session.answers) {
    answersRecord[answer.questionId] = {
      questionId: answer.questionId,
      answerId: answer.answerId,
      answerText: answer.answerText,
    };
  }

  // Helper to get answer text
  const getAnswerText = (questionId: string) => answersRecord[questionId]?.answerText || null;

  let tags: string[] = [];
  try {
    tags = JSON.parse(session.tags);
  } catch {
    tags = [];
  }

  return {
    sessionId: session.id,
    sessionStatus: session.status,
    createdAt: session.createdAt.toISOString(),
    completedAt: session.completedAt?.toISOString() || null,

    firstName: session.firstName,
    lastName: session.lastName,
    email: session.email,
    phone: session.phone,

    qualificationScore: session.qualificationScore,
    qualificationTier: session.qualificationTier,
    tags,

    answers: answersRecord,

    // Individual answer fields for easy mapping
    answer_start: getAnswerText('start'),
    answer_motivation: getAnswerText('motivation'),
    answer_timeline: getAnswerText('timeline'),
    answer_land_situation: getAnswerText('land-situation'),
    answer_land_utilities: getAnswerText('land-utilities'),
    answer_land_with_home: getAnswerText('land-with-home'),
    answer_acreage_preference: getAnswerText('acreage-preference'),
    answer_community_awareness: getAnswerText('community-awareness'),
    answer_community_preferences: getAnswerText('community-preferences'),
    answer_land_preference_after_education: getAnswerText('land-preference-after-education'),
    answer_home_size: getAnswerText('home-size'),
    answer_home_style: getAnswerText('home-style'),
    answer_new_vs_used: getAnswerText('new-vs-used'),
    answer_payment_method: getAnswerText('payment-method'),
    answer_cash_budget: getAnswerText('cash-budget'),
    answer_credit_situation: getAnswerText('credit-situation'),
    answer_credit_improvement: getAnswerText('credit-improvement'),
    answer_monthly_budget: getAnswerText('monthly-budget'),
    answer_down_payment_amount: getAnswerText('down-payment-amount'),
    answer_final_question: getAnswerText('final-question'),

    userAgent: session.userAgent,
    ipAddress: session.ipAddress,
    referrer: session.referrer,
  };
}
