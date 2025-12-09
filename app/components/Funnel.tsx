'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  funnelQuestions,
  getQuestionById,
  getQualificationTier,
  getProgressForQuestion,
  type Question,
  type Answer,
  type LeadData
} from '../lib/funnelData';

// Progress indicator component
function ProgressIndicator({
  progress
}: {
  progress: number
}) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-end text-sm text-gray-500 mb-2">
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Answer button component
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
        w-full p-4 rounded-xl border-2 text-left transition-all duration-200
        hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md hover:scale-[1.02]
        active:scale-[0.98]
        ${isSelected
          ? 'border-emerald-500 bg-emerald-50 shadow-md'
          : 'border-gray-200 bg-white'
        }
      `}
    >
      <div className="flex items-start gap-4">
        {answer.icon && (
          <span className="text-2xl flex-shrink-0 mt-0.5">{answer.icon}</span>
        )}
        <div className="flex-grow">
          <p className="font-semibold text-gray-900 text-lg">{answer.text}</p>
          {answer.subtext && (
            <p className="text-gray-500 text-sm mt-1">{answer.subtext}</p>
          )}
        </div>
        <div className={`
          w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center
          transition-all duration-200
          ${isSelected
            ? 'border-emerald-500 bg-emerald-500'
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
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {personalizedHeadline}
      </h2>
      {question.subheadline && (
        <p className="text-gray-600 text-lg mb-8">{question.subheadline}</p>
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
                w-full px-4 py-3 rounded-xl border-2 text-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                transition-all duration-200
                ${errors.firstName ? 'border-red-400' : 'border-gray-200'}
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
                w-full px-4 py-3 rounded-xl border-2 text-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                transition-all duration-200
                ${errors.lastName ? 'border-red-400' : 'border-gray-200'}
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
                w-full px-4 py-3 rounded-xl border-2 text-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                transition-all duration-200
                ${errors.email ? 'border-red-400' : 'border-gray-200'}
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
                w-full px-4 py-3 rounded-xl border-2 text-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                transition-all duration-200
                ${errors.phone ? 'border-red-400' : 'border-gray-200'}
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
            className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium
              hover:bg-gray-50 transition-all duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-grow px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500
              text-white font-semibold text-lg shadow-lg shadow-emerald-200
              hover:shadow-xl hover:shadow-emerald-300 hover:scale-[1.02]
              active:scale-[0.98] transition-all duration-200"
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

// Transition screen component
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
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {personalizedHeadline}
      </h2>
      {question.subheadline && (
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          {question.subheadline}
        </p>
      )}

      <div className="flex gap-3 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium
            hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500
            text-white font-semibold text-lg shadow-lg shadow-emerald-200
            hover:shadow-xl hover:shadow-emerald-300 hover:scale-[1.02]
            active:scale-[0.98] transition-all duration-200"
        >
          Got it, let&apos;s continue
        </button>
      </div>
    </div>
  );
}

// Result screen component
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
      <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {personalizedHeadline}
      </h2>
      {question.subheadline && (
        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          {question.subheadline}
        </p>
      )}

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 max-w-md mx-auto mb-8">
        <p className="text-sm text-emerald-700 font-medium mb-2">What happens next?</p>
        <ul className="text-left text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">✓</span>
            <span>A mobile home specialist will review your info</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">✓</span>
            <span>We&apos;ll match you with homes that fit your needs</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">✓</span>
            <span>Expect to hear from us within 24 hours</span>
          </li>
        </ul>
      </div>

      <div className="text-gray-500 text-sm">
        <p>Questions? Call us at <a href="tel:1-800-555-HOME" className="text-emerald-600 font-medium hover:underline">1-800-555-HOME</a></p>
      </div>
    </div>
  );
}

// Question screen component
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
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {personalizedHeadline}
      </h2>
      {question.subheadline && (
        <p className="text-gray-600 text-lg mb-8">{question.subheadline}</p>
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
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm font-medium"
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

  const currentQuestion = getQuestionById(currentQuestionId);

  // Calculate progress based on current question position in funnel
  const progress = getProgressForQuestion(currentQuestionId);

  const navigateToQuestion = useCallback((questionId: string | null) => {
    if (!questionId) return;

    setIsAnimating(true);
    setTimeout(() => {
      setHistory(prev => [...prev, currentQuestionId]);
      setCurrentQuestionId(questionId);
      setIsAnimating(false);
    }, 150);
  }, [currentQuestionId]);

  const goBack = useCallback(() => {
    if (history.length === 0) return;

    setIsAnimating(true);
    setTimeout(() => {
      const newHistory = [...history];
      const previousQuestion = newHistory.pop()!;
      setHistory(newHistory);
      setCurrentQuestionId(previousQuestion);
      setIsAnimating(false);
    }, 150);
  }, [history]);

  const handleAnswer = useCallback((answer: Answer) => {
    // Update lead data
    setLeadData(prev => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestionId]: answer.id },
      tags: [...new Set([...prev.tags, ...(answer.tags || [])])],
      qualificationScore: prev.qualificationScore + (answer.qualificationScore || 0)
    }));

    // Navigate to next question
    navigateToQuestion(answer.nextQuestionId);
  }, [currentQuestionId, navigateToQuestion]);

  const handleLeadCapture = useCallback((data: Partial<LeadData>) => {
    setLeadData(prev => ({
      ...prev,
      ...data
    }));

    if (currentQuestion?.nextQuestionId) {
      navigateToQuestion(currentQuestion.nextQuestionId);
    }
  }, [currentQuestion, navigateToQuestion]);

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
