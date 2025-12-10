'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  funnelQuestions,
  getQuestionById,
  getQualificationTier,
  getProgressForQuestion,
  type Question,
  type Answer,
  type LeadData
} from '../lib/funnelData';

// Session API helpers
async function createSession(): Promise<string | null> {
  try {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referrer: document.referrer }),
    });
    const data = await response.json();
    return data.success ? data.sessionId : null;
  } catch (error) {
    console.error('Failed to create session:', error);
    return null;
  }
}

async function updateSession(
  sessionId: string,
  updates: {
    questionId?: string;
    answerId?: string;
    answerText?: string;
    qualificationScore?: number;
    tags?: string[];
    currentQuestionId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }
): Promise<void> {
  try {
    await fetch(`/api/sessions/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  } catch (error) {
    console.error('Failed to update session:', error);
  }
}

async function completeSession(sessionId: string): Promise<{ webhookSent: boolean }> {
  try {
    const response = await fetch(`/api/sessions/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'complete' }),
    });
    const data = await response.json();
    return { webhookSent: data.webhookSent || false };
  } catch (error) {
    console.error('Failed to complete session:', error);
    return { webhookSent: false };
  }
}

async function abandonSession(sessionId: string): Promise<void> {
  try {
    // Use sendBeacon for reliability during page unload
    const data = JSON.stringify({ action: 'abandon' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`/api/sessions/${sessionId}`, new Blob([data], { type: 'application/json' }));
    } else {
      await fetch(`/api/sessions/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        keepalive: true,
      });
    }
  } catch (error) {
    console.error('Failed to abandon session:', error);
  }
}

// Progress indicator component - Clayton style
function ProgressIndicator({
  progress
}: {
  progress: number
}) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-end text-sm text-[var(--text-body)] mb-2">
        <span className="uppercase tracking-wide font-medium">{Math.round(progress)}% complete</span>
      </div>
      <div className="h-1 bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-[var(--brand-blue)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Answer button component - Clayton style
function AnswerButton({
  answer,
  onClick,
  isSelected
}: {
  answer: Answer;
  onClick: () => void;
  isSelected: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 border text-left transition-all duration-300
        hover:border-[var(--brand-blue)] hover:bg-[var(--brand-blue-light)] hover:shadow-md
        active:scale-[0.99]
        ${isSelected
          ? 'border-[var(--brand-blue)] bg-[var(--brand-blue-light)] shadow-md'
          : 'border-gray-300 bg-white'
        }
      `}
    >
      <div className="flex items-start gap-4">
        {answer.icon && (
          <span className="text-2xl flex-shrink-0 mt-0.5">{answer.icon}</span>
        )}
        <div className="flex-grow">
          <p className="font-semibold text-[var(--foreground)] text-lg">{answer.text}</p>
          {answer.subtext && (
            <p className="text-[var(--text-body)] text-sm mt-1">{answer.subtext}</p>
          )}
        </div>
        <div className={`
          w-6 h-6 border flex-shrink-0 flex items-center justify-center
          transition-all duration-300
          ${isSelected
            ? 'border-[var(--brand-blue)] bg-[var(--brand-blue)]'
            : 'border-gray-300'
          }
        `}>
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

// Lead capture form component
function LeadCaptureForm({
  question,
  leadData,
  onSubmit,
  onBack
}: {
  question: Question;
  leadData: LeadData;
  onSubmit: (data: Partial<LeadData>) => void;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: leadData.firstName || '',
    lastName: leadData.lastName || '',
    email: leadData.email || '',
    phone: leadData.phone || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (question.leadFields?.includes('firstName') && !formData.firstName.trim()) {
      newErrors.firstName = 'Please enter your first name';
    }
    if (question.leadFields?.includes('lastName') && !formData.lastName.trim()) {
      newErrors.lastName = 'Please enter your last name';
    }
    if (question.leadFields?.includes('email')) {
      if (!formData.email.trim()) {
        newErrors.email = 'Please enter your email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    if (question.leadFields?.includes('phone')) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Please enter your phone number';
      } else if (!/^[\d\s\-\(\)\+]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const personalizedHeadline = question.headline.replace('{{firstName}}', leadData.firstName || 'there');

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">
        {personalizedHeadline}
      </h2>
      {question.subheadline && (
        <p className="text-[var(--text-body)] text-lg mb-8">{question.subheadline}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {question.leadFields?.includes('firstName') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={`
                w-full px-4 py-3 border text-lg
                focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-[var(--brand-blue)]
                transition-all duration-300
                ${errors.firstName ? 'border-red-400' : 'border-gray-300'}
              `}
              placeholder="Enter your first name"
              autoFocus
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
        )}

        {question.leadFields?.includes('lastName') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className={`
                w-full px-4 py-3 border text-lg
                focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-[var(--brand-blue)]
                transition-all duration-300
                ${errors.lastName ? 'border-red-400' : 'border-gray-300'}
              `}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        )}

        {question.leadFields?.includes('email') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`
                w-full px-4 py-3 border text-lg
                focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-[var(--brand-blue)]
                transition-all duration-300
                ${errors.email ? 'border-red-400' : 'border-gray-300'}
              `}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        )}

        {question.leadFields?.includes('phone') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`
                w-full px-4 py-3 border text-lg
                focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-[var(--brand-blue)]
                transition-all duration-300
                ${errors.phone ? 'border-red-400' : 'border-gray-300'}
              `}
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-[var(--text-body)] font-semibold uppercase tracking-wide
              hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-grow px-6 py-3 bg-[var(--brand-blue)] border border-[var(--brand-blue)]
              text-white font-semibold text-base uppercase tracking-wide
              hover:bg-[var(--brand-blue-hover)] hover:border-[var(--brand-blue-hover)]
              active:scale-[0.99] transition-all duration-300"
          >
            Continue
          </button>
        </div>
      </form>

      <p className="text-xs text-gray-400 mt-6 text-center">
        Your information is secure and will never be shared with third parties.
      </p>
    </div>
  );
}

// Transition screen component - Clayton style
function TransitionScreen({
  question,
  leadData,
  onContinue,
  onBack
}: {
  question: Question;
  leadData: LeadData;
  onContinue: () => void;
  onBack: () => void;
}) {
  const personalizedHeadline = question.headline.replace('{{firstName}}', leadData.firstName || 'there');

  return (
    <div className="animate-fadeIn text-center">
      <div className="w-16 h-16 bg-[var(--brand-blue-light)] flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-[var(--brand-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
        {personalizedHeadline}
      </h2>
      {question.subheadline && (
        <p className="text-[var(--text-body)] text-lg mb-8 max-w-md mx-auto leading-relaxed">
          {question.subheadline}
        </p>
      )}

      <div className="flex gap-3 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-[var(--text-body)] font-semibold uppercase tracking-wide
            hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-[var(--brand-blue)] border border-[var(--brand-blue)]
            text-white font-semibold uppercase tracking-wide
            hover:bg-[var(--brand-blue-hover)] hover:border-[var(--brand-blue-hover)]
            active:scale-[0.99] transition-all duration-300"
        >
          Got it, let&apos;s continue
        </button>
      </div>
    </div>
  );
}

// Result screen component - Clayton style
function ResultScreen({
  question,
  leadData
}: {
  question: Question;
  leadData: LeadData;
}) {
  const personalizedHeadline = question.headline.replace('{{firstName}}', leadData.firstName || 'there');
  const qualification = getQualificationTier(leadData.qualificationScore);

  // Log lead data (in production, this would send to your CRM/backend)
  useEffect(() => {
    console.log('Lead captured:', {
      ...leadData,
      qualification
    });
  }, [leadData, qualification]);

  return (
    <div className="animate-fadeIn text-center">
      <div className="w-20 h-20 bg-[var(--brand-blue)] flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
        {personalizedHeadline}
      </h2>
      {question.subheadline && (
        <p className="text-[var(--text-body)] text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          {question.subheadline}
        </p>
      )}

      <div className="bg-[var(--brand-blue-light)] p-6 max-w-md mx-auto mb-8">
        <p className="text-sm text-[var(--brand-blue-dark)] font-semibold uppercase tracking-wide mb-3">What happens next?</p>
        <ul className="text-left text-[var(--text-body)] space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[var(--brand-blue)] font-bold">✓</span>
            <span>A Reliable Homes specialist will review your info</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--brand-blue)] font-bold">✓</span>
            <span>We&apos;ll match you with homes that fit your needs</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--brand-blue)] font-bold">✓</span>
            <span>Expect to hear from us within 24 hours</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="tel:9798856767"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--brand-blue)] text-[var(--brand-blue)]
            font-semibold uppercase tracking-wide hover:bg-[var(--brand-blue)] hover:text-white transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          (979) 885-6767
        </a>
        <a
          href="https://www.reliablehomesofsealy.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-blue)] border border-[var(--brand-blue)]
            text-white font-semibold uppercase tracking-wide hover:bg-[var(--brand-blue-hover)] transition-all duration-300"
        >
          Browse Our Homes
        </a>
      </div>
    </div>
  );
}

// Question screen component - Clayton style
function QuestionScreen({
  question,
  leadData,
  onAnswer,
  onBack,
  canGoBack
}: {
  question: Question;
  leadData: LeadData;
  onAnswer: (answer: Answer) => void;
  onBack: () => void;
  canGoBack: boolean;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const personalizedHeadline = question.headline.replace('{{firstName}}', leadData.firstName || 'there');

  const handleSelect = (answer: Answer) => {
    setSelectedAnswer(answer.id);
    // Small delay for visual feedback
    setTimeout(() => {
      onAnswer(answer);
    }, 300);
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">
        {personalizedHeadline}
      </h2>
      {question.subheadline && (
        <p className="text-[var(--text-body)] text-lg mb-8">{question.subheadline}</p>
      )}

      <div className="space-y-3 mb-8">
        {question.answers?.map((answer) => (
          <AnswerButton
            key={answer.id}
            answer={answer}
            onClick={() => handleSelect(answer)}
            isSelected={selectedAnswer === answer.id}
          />
        ))}
      </div>

      {canGoBack && (
        <button
          onClick={onBack}
          className="text-[var(--text-body)] hover:text-[var(--brand-blue)] transition-colors duration-300 text-sm font-semibold uppercase tracking-wide"
        >
          ← Go back
        </button>
      )}
    </div>
  );
}

// Main Funnel component
export default function Funnel() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [leadData, setLeadData] = useState<LeadData>({
    answers: {},
    tags: [],
    qualificationScore: 0,
    timestamp: new Date()
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const sessionCompletedRef = useRef(false);

  const currentQuestion = getQuestionById(currentQuestionId);

  // Calculate progress based on current question position in funnel
  const progress = getProgressForQuestion(currentQuestionId);

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      const id = await createSession();
      if (id) {
        setSessionId(id);
        console.log('Session created:', id);
      }
    };
    initSession();
  }, []);

  // Handle bounce/abandon detection
  useEffect(() => {
    if (!sessionId || sessionCompletedRef.current) return;

    const handleBeforeUnload = () => {
      // Don't abandon if session was completed
      if (!sessionCompletedRef.current) {
        abandonSession(sessionId);
      }
    };

    const handleVisibilityChange = () => {
      // Mark as abandoned if user leaves the tab without completing
      if (document.visibilityState === 'hidden' && !sessionCompletedRef.current) {
        // We could track this as a potential abandon, but let's wait for actual unload
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionId]);

  const navigateToQuestion = useCallback((questionId: string | null) => {
    if (!questionId) return;

    setIsAnimating(true);
    setTimeout(() => {
      setHistory(prev => [...prev, currentQuestionId]);
      setCurrentQuestionId(questionId);
      setIsAnimating(false);

      // Update session with current question
      if (sessionId) {
        updateSession(sessionId, { currentQuestionId: questionId });
      }
    }, 150);
  }, [currentQuestionId, sessionId]);

  const goBack = useCallback(() => {
    if (history.length === 0) return;

    setIsAnimating(true);
    setTimeout(() => {
      const newHistory = [...history];
      const previousQuestion = newHistory.pop()!;
      setHistory(newHistory);
      setCurrentQuestionId(previousQuestion);
      setIsAnimating(false);

      // Update session
      if (sessionId) {
        updateSession(sessionId, { currentQuestionId: previousQuestion });
      }
    }, 150);
  }, [history, sessionId]);

  const handleAnswer = useCallback((answer: Answer) => {
    // Update lead data locally
    setLeadData(prev => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestionId]: answer.id },
      tags: [...new Set([...prev.tags, ...(answer.tags || [])])],
      qualificationScore: prev.qualificationScore + (answer.qualificationScore || 0)
    }));

    // Update session with the answer
    if (sessionId) {
      updateSession(sessionId, {
        questionId: currentQuestionId,
        answerId: answer.id,
        answerText: answer.text,
        qualificationScore: answer.qualificationScore || 0,
        tags: answer.tags || [],
        currentQuestionId: answer.nextQuestionId || currentQuestionId,
      });
    }

    // Navigate to next question
    navigateToQuestion(answer.nextQuestionId);
  }, [currentQuestionId, navigateToQuestion, sessionId]);

  const handleLeadCapture = useCallback(async (data: Partial<LeadData>) => {
    // Update lead data locally
    setLeadData(prev => ({
      ...prev,
      ...data
    }));

    // Update session with lead info
    if (sessionId) {
      await updateSession(sessionId, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      });

      // If this is the contact-capture form (has email and phone), complete the session and send webhook
      if (currentQuestion?.id === 'contact-capture' && data.email && data.phone) {
        console.log('Contact info captured, completing session and sending webhook...');
        sessionCompletedRef.current = true;
        const result = await completeSession(sessionId);
        console.log('Webhook sent:', result.webhookSent);
      }
    }

    if (currentQuestion?.nextQuestionId) {
      navigateToQuestion(currentQuestion.nextQuestionId);
    }
  }, [currentQuestion, navigateToQuestion, sessionId]);

  const handleTransitionContinue = useCallback(() => {
    if (currentQuestion?.nextQuestionId) {
      navigateToQuestion(currentQuestion.nextQuestionId);
    }
  }, [currentQuestion, navigateToQuestion]);

  if (!currentQuestion) {
    return (
      <div className="text-center text-red-500">
        Question not found. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {currentQuestion.type !== 'result' && (
        <ProgressIndicator progress={progress} />
      )}

      <div className={`transition-opacity duration-150 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {currentQuestion.type === 'question' && (
          <QuestionScreen
            question={currentQuestion}
            leadData={leadData}
            onAnswer={handleAnswer}
            onBack={goBack}
            canGoBack={history.length > 0}
          />
        )}

        {currentQuestion.type === 'lead-capture' && (
          <LeadCaptureForm
            question={currentQuestion}
            leadData={leadData}
            onSubmit={handleLeadCapture}
            onBack={goBack}
          />
        )}

        {currentQuestion.type === 'transition' && (
          <TransitionScreen
            question={currentQuestion}
            leadData={leadData}
            onContinue={handleTransitionContinue}
            onBack={goBack}
          />
        )}

        {currentQuestion.type === 'result' && (
          <ResultScreen
            question={currentQuestion}
            leadData={leadData}
          />
        )}
      </div>
    </div>
  );
}
