// NEPQ-Style Dynamic Funnel for Mobile Home Sales
// Branching conversation that qualifies leads and builds rapport

export interface Answer {
  id: string;
  text: string;
  subtext?: string;
  icon?: string;
  nextQuestionId: string | null;
  qualificationScore?: number; // Higher = more qualified
  tags?: string[]; // For tracking user profile
}

export interface Question {
  id: string;
  type: 'question' | 'lead-capture' | 'transition' | 'result';
  category?: 'connection' | 'situation' | 'problem' | 'solution' | 'qualification';
  headline: string;
  subheadline?: string;
  answers?: Answer[];
  leadFields?: ('firstName' | 'lastName' | 'email' | 'phone')[];
  nextQuestionId?: string; // For lead-capture and transition types
}

export interface LeadData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  answers: Record<string, string>;
  tags: string[];
  qualificationScore: number;
  timestamp: Date;
}

export const funnelQuestions: Record<string, Question> = {
  // =============================================
  // OPENING - Build Connection & Interest
  // =============================================
  'start': {
    id: 'start',
    type: 'question',
    category: 'connection',
    headline: "Hey there! So you're thinking about making a move into a new mobile home?",
    subheadline: "Let's have a quick chat to see how we can help you find exactly what you're looking for.",
    answers: [
      {
        id: 'yes-exploring',
        text: "Yes, I'm exploring my options",
        subtext: "Just starting to look around",
        icon: "🔍",
        nextQuestionId: 'motivation',
        qualificationScore: 5,
        tags: ['exploring']
      },
      {
        id: 'yes-serious',
        text: "Absolutely, I'm ready to make this happen",
        subtext: "I've been thinking about this for a while",
        icon: "🎯",
        nextQuestionId: 'motivation',
        qualificationScore: 15,
        tags: ['serious-buyer']
      },
      {
        id: 'just-curious',
        text: "I'm just curious about pricing",
        subtext: "Want to see what's out there",
        icon: "💭",
        nextQuestionId: 'motivation',
        qualificationScore: 2,
        tags: ['price-shopping']
      }
    ]
  },

  'motivation': {
    id: 'motivation',
    type: 'question',
    category: 'problem',
    headline: "What's driving you to look at mobile homes right now?",
    subheadline: "Understanding your 'why' helps us point you in the right direction.",
    answers: [
      {
        id: 'first-home',
        text: "Looking to own my first home",
        subtext: "Ready to stop renting",
        icon: "🏠",
        nextQuestionId: 'timeline',
        qualificationScore: 15,
        tags: ['first-time-buyer', 'renter']
      },
      {
        id: 'downsize',
        text: "Want to downsize and simplify",
        subtext: "Less space, less stress",
        icon: "📦",
        nextQuestionId: 'timeline',
        qualificationScore: 15,
        tags: ['downsizing', 'equity-likely']
      },
      {
        id: 'investment',
        text: "Looking for an investment property",
        subtext: "Rental income or land development",
        icon: "📈",
        nextQuestionId: 'timeline',
        qualificationScore: 20,
        tags: ['investor', 'cash-likely']
      },
      {
        id: 'upgrade',
        text: "Upgrading from my current mobile home",
        subtext: "Time for something newer",
        icon: "⬆️",
        nextQuestionId: 'timeline',
        qualificationScore: 20,
        tags: ['upgrade', 'experienced-buyer']
      },
      {
        id: 'life-change',
        text: "Going through a life change",
        subtext: "Divorce, retirement, relocation",
        icon: "🔄",
        nextQuestionId: 'timeline',
        qualificationScore: 15,
        tags: ['life-change', 'motivated']
      }
    ]
  },

  'timeline': {
    id: 'timeline',
    type: 'question',
    category: 'qualification',
    headline: "When are you hoping to be in your new home?",
    subheadline: "This helps us understand what options make the most sense for you.",
    answers: [
      {
        id: 'asap',
        text: "As soon as possible",
        subtext: "I'm ready to move quickly",
        icon: "🚀",
        nextQuestionId: 'first-name-capture',
        qualificationScore: 25,
        tags: ['urgent', 'hot-lead']
      },
      {
        id: '1-3-months',
        text: "Within the next 1-3 months",
        subtext: "Have some things to wrap up first",
        icon: "📅",
        nextQuestionId: 'first-name-capture',
        qualificationScore: 20,
        tags: ['near-term']
      },
      {
        id: '3-6-months',
        text: "In 3-6 months",
        subtext: "Planning ahead",
        icon: "🗓️",
        nextQuestionId: 'first-name-capture',
        qualificationScore: 10,
        tags: ['planning']
      },
      {
        id: 'not-sure',
        text: "Not sure yet, just researching",
        subtext: "Gathering information",
        icon: "🤔",
        nextQuestionId: 'first-name-capture',
        qualificationScore: 3,
        tags: ['researcher']
      }
    ]
  },

  // =============================================
  // LEAD CAPTURE - Get First Name Early
  // =============================================
  'first-name-capture': {
    id: 'first-name-capture',
    type: 'lead-capture',
    headline: "Love it! I want to make sure I'm giving you the right info.",
    subheadline: "What should I call you?",
    leadFields: ['firstName'],
    nextQuestionId: 'land-situation'
  },

  // =============================================
  // LAND SITUATION - Major Branching Point
  // =============================================
  'land-situation': {
    id: 'land-situation',
    type: 'question',
    category: 'situation',
    headline: "Alright {{firstName}}, here's a big question...",
    subheadline: "Do you already have land where you'd place the home?",
    answers: [
      {
        id: 'have-land',
        text: "Yes, I have land ready",
        subtext: "I own property to place the home on",
        icon: "🏞️",
        nextQuestionId: 'land-utilities',
        qualificationScore: 20,
        tags: ['has-land']
      },
      {
        id: 'buying-land',
        text: "I'm looking to buy land too",
        subtext: "Need both the home and property",
        icon: "🔎",
        nextQuestionId: 'land-with-home',
        qualificationScore: 15,
        tags: ['needs-land', 'land-buyer']
      },
      {
        id: 'community',
        text: "I'd prefer a mobile home community",
        subtext: "Interested in community living",
        icon: "🏘️",
        nextQuestionId: 'community-awareness',
        qualificationScore: 15,
        tags: ['community-interest']
      },
      {
        id: 'not-sure-land',
        text: "Not sure yet - what are my options?",
        subtext: "Help me understand",
        icon: "❓",
        nextQuestionId: 'land-education',
        qualificationScore: 10,
        tags: ['needs-education']
      }
    ]
  },

  // =============================================
  // HAS LAND BRANCH
  // =============================================
  'land-utilities': {
    id: 'land-utilities',
    type: 'question',
    category: 'situation',
    headline: "Nice! Having your own land is a great advantage.",
    subheadline: "What's the utility situation on your property?",
    answers: [
      {
        id: 'all-utilities',
        text: "All utilities are there",
        subtext: "Water, electric, and septic/sewer ready",
        icon: "✅",
        nextQuestionId: 'home-size',
        qualificationScore: 20,
        tags: ['utilities-ready', 'move-in-ready-land']
      },
      {
        id: 'some-utilities',
        text: "Some utilities, not all",
        subtext: "Partially developed",
        icon: "⚡",
        nextQuestionId: 'land-work-needed',
        qualificationScore: 15,
        tags: ['partial-utilities']
      },
      {
        id: 'raw-land',
        text: "It's raw land - nothing yet",
        subtext: "Will need development work",
        icon: "🌲",
        nextQuestionId: 'land-work-needed',
        qualificationScore: 10,
        tags: ['raw-land', 'development-needed']
      },
      {
        id: 'not-sure-utilities',
        text: "I'm not entirely sure",
        subtext: "Need to find out",
        icon: "🤷",
        nextQuestionId: 'land-work-needed',
        qualificationScore: 5,
        tags: ['uncertain-utilities']
      }
    ]
  },

  'land-work-needed': {
    id: 'land-work-needed',
    type: 'transition',
    headline: "Good to know! Land prep can sometimes add costs, but it's totally doable.",
    subheadline: "We work with people in all stages of land development. The key is planning it right from the start.",
    nextQuestionId: 'home-size'
  },

  // =============================================
  // NEEDS LAND BRANCH
  // =============================================
  'land-with-home': {
    id: 'land-with-home',
    type: 'question',
    category: 'situation',
    headline: "Land + home packages can be a great option!",
    subheadline: "What kind of area are you looking at?",
    answers: [
      {
        id: 'rural',
        text: "Rural - want some space and privacy",
        subtext: "Acreage, room to breathe",
        icon: "🌾",
        nextQuestionId: 'acreage-preference',
        qualificationScore: 15,
        tags: ['rural', 'privacy-seeker']
      },
      {
        id: 'suburban',
        text: "Suburban - close to town amenities",
        subtext: "Balance of space and convenience",
        icon: "🏡",
        nextQuestionId: 'home-size',
        qualificationScore: 15,
        tags: ['suburban']
      },
      {
        id: 'flexible-location',
        text: "I'm flexible on location",
        subtext: "Open to options",
        icon: "📍",
        nextQuestionId: 'home-size',
        qualificationScore: 10,
        tags: ['flexible']
      }
    ]
  },

  'acreage-preference': {
    id: 'acreage-preference',
    type: 'question',
    category: 'situation',
    headline: "Love the country living mindset!",
    subheadline: "How much land are you thinking?",
    answers: [
      {
        id: 'under-1-acre',
        text: "Under 1 acre",
        subtext: "Just enough for the home and yard",
        icon: "🏠",
        nextQuestionId: 'home-size',
        qualificationScore: 10,
        tags: ['small-lot']
      },
      {
        id: '1-5-acres',
        text: "1-5 acres",
        subtext: "Room for gardens, animals, projects",
        icon: "🌳",
        nextQuestionId: 'home-size',
        qualificationScore: 15,
        tags: ['medium-acreage']
      },
      {
        id: '5-plus-acres',
        text: "5+ acres",
        subtext: "Real elbow room",
        icon: "🏔️",
        nextQuestionId: 'home-size',
        qualificationScore: 15,
        tags: ['large-acreage']
      }
    ]
  },

  // =============================================
  // COMMUNITY BRANCH
  // =============================================
  'community-awareness': {
    id: 'community-awareness',
    type: 'question',
    category: 'situation',
    headline: "Communities can be a great choice!",
    subheadline: "Are you familiar with how lot rent works?",
    answers: [
      {
        id: 'know-lot-rent',
        text: "Yes, I understand lot rent",
        subtext: "I know I'd pay monthly for the space",
        icon: "👍",
        nextQuestionId: 'community-preferences',
        qualificationScore: 15,
        tags: ['understands-lot-rent']
      },
      {
        id: 'some-idea',
        text: "I have a general idea",
        subtext: "But could use more clarity",
        icon: "🤔",
        nextQuestionId: 'lot-rent-education',
        qualificationScore: 10,
        tags: ['needs-lot-rent-info']
      },
      {
        id: 'no-idea-rent',
        text: "No, tell me more",
        subtext: "I'm not sure how it works",
        icon: "📚",
        nextQuestionId: 'lot-rent-education',
        qualificationScore: 5,
        tags: ['needs-education']
      }
    ]
  },

  'lot-rent-education': {
    id: 'lot-rent-education',
    type: 'transition',
    headline: "Great question! Here's the deal with lot rent...",
    subheadline: "You own your home, but lease the land it sits on - typically $300-$800/month depending on the community. You get amenities, maintenance-free living, and often a sense of community. It's kind of like a condo fee, but for your lot.",
    nextQuestionId: 'community-preferences'
  },

  'community-preferences': {
    id: 'community-preferences',
    type: 'question',
    category: 'situation',
    headline: "What matters most to you in a community?",
    subheadline: "This helps us match you with the right fit.",
    answers: [
      {
        id: 'amenities',
        text: "Amenities & activities",
        subtext: "Pool, clubhouse, social events",
        icon: "🏊",
        nextQuestionId: 'home-size',
        qualificationScore: 10,
        tags: ['amenities-focused']
      },
      {
        id: 'affordability',
        text: "Lowest lot rent possible",
        subtext: "Keep monthly costs down",
        icon: "💰",
        nextQuestionId: 'home-size',
        qualificationScore: 10,
        tags: ['budget-conscious']
      },
      {
        id: 'family-friendly',
        text: "Family-friendly environment",
        subtext: "Good for kids",
        icon: "👨‍👩‍👧‍👦",
        nextQuestionId: 'home-size',
        qualificationScore: 15,
        tags: ['family', 'family-friendly']
      },
      {
        id: 'senior',
        text: "55+ community",
        subtext: "Active adult lifestyle",
        icon: "🌅",
        nextQuestionId: 'home-size',
        qualificationScore: 15,
        tags: ['senior', '55-plus']
      },
      {
        id: 'pet-friendly',
        text: "Pet-friendly is a must",
        subtext: "I have fur babies",
        icon: "🐕",
        nextQuestionId: 'home-size',
        qualificationScore: 10,
        tags: ['pet-owner']
      }
    ]
  },

  // =============================================
  // LAND EDUCATION BRANCH
  // =============================================
  'land-education': {
    id: 'land-education',
    type: 'transition',
    headline: "Let me break down your options, {{firstName}}...",
    subheadline: "You can buy land and place a home on it (more freedom, but more upfront work), go into a mobile home community (lower barrier, monthly lot rent), or sometimes find land/home packages. Each has pros and cons depending on your situation.",
    nextQuestionId: 'land-preference-after-education'
  },

  'land-preference-after-education': {
    id: 'land-preference-after-education',
    type: 'question',
    category: 'situation',
    headline: "Based on that, what sounds more appealing?",
    answers: [
      {
        id: 'prefer-own-land',
        text: "I'd rather own my land",
        subtext: "More control, build equity",
        icon: "🏞️",
        nextQuestionId: 'land-with-home',
        qualificationScore: 15,
        tags: ['prefers-land-ownership']
      },
      {
        id: 'prefer-community',
        text: "Community living sounds easier",
        subtext: "Less hassle, amenities",
        icon: "🏘️",
        nextQuestionId: 'community-preferences',
        qualificationScore: 10,
        tags: ['prefers-community']
      },
      {
        id: 'still-unsure',
        text: "I'd like to explore both",
        subtext: "Keep my options open",
        icon: "⚖️",
        nextQuestionId: 'home-size',
        qualificationScore: 10,
        tags: ['open-to-both']
      }
    ]
  },

  // =============================================
  // HOME REQUIREMENTS
  // =============================================
  'home-size': {
    id: 'home-size',
    type: 'question',
    category: 'situation',
    headline: "Now let's talk about the home itself!",
    subheadline: "How many bedrooms do you need?",
    answers: [
      {
        id: '1-2-bed',
        text: "1-2 bedrooms",
        subtext: "Just me or a small household",
        icon: "🛏️",
        nextQuestionId: 'home-style',
        qualificationScore: 10,
        tags: ['small-home', '1-2-bed']
      },
      {
        id: '3-bed',
        text: "3 bedrooms",
        subtext: "Room for family or guests",
        icon: "🛏️🛏️",
        nextQuestionId: 'home-style',
        qualificationScore: 15,
        tags: ['medium-home', '3-bed']
      },
      {
        id: '4-plus-bed',
        text: "4+ bedrooms",
        subtext: "Larger family or need space",
        icon: "🏠",
        nextQuestionId: 'home-style',
        qualificationScore: 15,
        tags: ['large-home', '4-plus-bed']
      }
    ]
  },

  'home-style': {
    id: 'home-style',
    type: 'question',
    category: 'solution',
    headline: "What style of home are you drawn to?",
    subheadline: "This affects both price and options available.",
    answers: [
      {
        id: 'single-wide',
        text: "Single-wide",
        subtext: "Efficient, affordable, fits more lots",
        icon: "📏",
        nextQuestionId: 'new-vs-used',
        qualificationScore: 10,
        tags: ['single-wide']
      },
      {
        id: 'double-wide',
        text: "Double-wide",
        subtext: "More space, feels like traditional home",
        icon: "📐",
        nextQuestionId: 'new-vs-used',
        qualificationScore: 15,
        tags: ['double-wide']
      },
      {
        id: 'not-sure-style',
        text: "Not sure - what do you recommend?",
        subtext: "Help me decide",
        icon: "🤷",
        nextQuestionId: 'new-vs-used',
        qualificationScore: 10,
        tags: ['needs-guidance']
      }
    ]
  },

  'new-vs-used': {
    id: 'new-vs-used',
    type: 'question',
    category: 'solution',
    headline: "Are you thinking new or used?",
    subheadline: "Both have their advantages!",
    answers: [
      {
        id: 'new-only',
        text: "New - I want everything fresh",
        subtext: "Latest features, warranty, peace of mind",
        icon: "✨",
        nextQuestionId: 'payment-method',
        qualificationScore: 20,
        tags: ['new-home', 'higher-budget']
      },
      {
        id: 'used-ok',
        text: "Used is fine if it's in good shape",
        subtext: "Value matters more than new",
        icon: "🏷️",
        nextQuestionId: 'payment-method',
        qualificationScore: 15,
        tags: ['used-ok', 'value-focused']
      },
      {
        id: 'open-to-both',
        text: "Open to both - show me options",
        subtext: "Depends on the deal",
        icon: "⚖️",
        nextQuestionId: 'payment-method',
        qualificationScore: 15,
        tags: ['flexible-condition']
      }
    ]
  },

  // =============================================
  // PAYMENT & FINANCING - Critical Qualification
  // =============================================
  'payment-method': {
    id: 'payment-method',
    type: 'question',
    category: 'qualification',
    headline: "Let's talk about the money side, {{firstName}}.",
    subheadline: "How are you planning to handle the purchase?",
    answers: [
      {
        id: 'cash',
        text: "I'm paying cash",
        subtext: "Have funds ready to go",
        icon: "💵",
        nextQuestionId: 'cash-budget',
        qualificationScore: 30,
        tags: ['cash-buyer', 'hot-lead']
      },
      {
        id: 'finance',
        text: "I'll need financing",
        subtext: "Looking for payment options",
        icon: "📋",
        nextQuestionId: 'credit-situation',
        qualificationScore: 15,
        tags: ['finance-buyer']
      },
      {
        id: 'combo',
        text: "Cash down payment + financing",
        subtext: "Combination approach",
        icon: "💰",
        nextQuestionId: 'down-payment-amount',
        qualificationScore: 20,
        tags: ['combo-buyer', 'has-down-payment']
      },
      {
        id: 'not-sure-payment',
        text: "I'm not sure what I can do",
        subtext: "Need guidance on options",
        icon: "❓",
        nextQuestionId: 'credit-situation',
        qualificationScore: 5,
        tags: ['uncertain-payment']
      }
    ]
  },

  // =============================================
  // CASH BUYER BRANCH
  // =============================================
  'cash-budget': {
    id: 'cash-budget',
    type: 'question',
    category: 'qualification',
    headline: "That's great! Cash gives you negotiating power.",
    subheadline: "What budget range are you working with?",
    answers: [
      {
        id: 'under-50k',
        text: "Under $50,000",
        subtext: "Looking for value",
        icon: "💵",
        nextQuestionId: 'contact-capture',
        qualificationScore: 10,
        tags: ['budget-under-50k']
      },
      {
        id: '50-100k',
        text: "$50,000 - $100,000",
        subtext: "Mid-range options",
        icon: "💵💵",
        nextQuestionId: 'contact-capture',
        qualificationScore: 20,
        tags: ['budget-50-100k']
      },
      {
        id: '100-150k',
        text: "$100,000 - $150,000",
        subtext: "Nice options available",
        icon: "💵💵💵",
        nextQuestionId: 'contact-capture',
        qualificationScore: 25,
        tags: ['budget-100-150k']
      },
      {
        id: 'over-150k',
        text: "$150,000+",
        subtext: "Premium homes & land packages",
        icon: "🏆",
        nextQuestionId: 'contact-capture',
        qualificationScore: 30,
        tags: ['budget-over-150k', 'premium-buyer']
      }
    ]
  },

  // =============================================
  // FINANCING BRANCH
  // =============================================
  'credit-situation': {
    id: 'credit-situation',
    type: 'question',
    category: 'qualification',
    headline: "We work with multiple lenders.",
    subheadline: "How would you describe your credit situation?",
    answers: [
      {
        id: 'credit-excellent',
        text: "Excellent (720+)",
        icon: "⭐",
        nextQuestionId: 'monthly-budget',
        qualificationScore: 25,
        tags: ['excellent-credit']
      },
      {
        id: 'credit-good',
        text: "Good (680-719)",
        icon: "👍",
        nextQuestionId: 'monthly-budget',
        qualificationScore: 20,
        tags: ['good-credit']
      },
      {
        id: 'credit-fair',
        text: "Fair (620-679)",
        icon: "📊",
        nextQuestionId: 'monthly-budget',
        qualificationScore: 15,
        tags: ['fair-credit']
      },
      {
        id: 'credit-challenging',
        text: "Below 620",
        icon: "📋",
        nextQuestionId: 'credit-improvement',
        qualificationScore: 5,
        tags: ['challenging-credit']
      },
      {
        id: 'credit-unsure',
        text: "I'm not sure",
        subtext: "Haven't checked recently",
        icon: "🤔",
        nextQuestionId: 'monthly-budget',
        qualificationScore: 10,
        tags: ['unknown-credit']
      }
    ]
  },

  'credit-improvement': {
    id: 'credit-improvement',
    type: 'question',
    category: 'qualification',
    headline: "Thanks for sharing!",
    subheadline: "Tell us more about your situation.",
    answers: [
      {
        id: 'improving-credit',
        text: "I'm working on my credit",
        icon: "📈",
        nextQuestionId: 'monthly-budget',
        qualificationScore: 10,
        tags: ['improving-credit']
      },
      {
        id: 'need-help-credit',
        text: "I could use some guidance",
        icon: "📋",
        nextQuestionId: 'monthly-budget',
        qualificationScore: 5,
        tags: ['needs-credit-help']
      },
      {
        id: 'cosigner',
        text: "I might have a co-signer",
        subtext: "Someone to help qualify",
        icon: "🤝",
        nextQuestionId: 'monthly-budget',
        qualificationScore: 15,
        tags: ['has-cosigner']
      }
    ]
  },

  'monthly-budget': {
    id: 'monthly-budget',
    type: 'question',
    category: 'qualification',
    headline: "What monthly payment range works for you?",
    subheadline: "Being realistic here helps us find the right fit.",
    answers: [
      {
        id: 'under-500',
        text: "Under $500/month",
        subtext: "Keeping it lean",
        icon: "💵",
        nextQuestionId: 'down-payment-amount',
        qualificationScore: 10,
        tags: ['monthly-under-500']
      },
      {
        id: '500-800',
        text: "$500 - $800/month",
        subtext: "Comfortable range",
        icon: "💵💵",
        nextQuestionId: 'down-payment-amount',
        qualificationScore: 15,
        tags: ['monthly-500-800']
      },
      {
        id: '800-1200',
        text: "$800 - $1,200/month",
        subtext: "More home for the money",
        icon: "💵💵💵",
        nextQuestionId: 'down-payment-amount',
        qualificationScore: 20,
        tags: ['monthly-800-1200']
      },
      {
        id: 'over-1200',
        text: "$1,200+/month",
        subtext: "Premium options",
        icon: "🏆",
        nextQuestionId: 'down-payment-amount',
        qualificationScore: 25,
        tags: ['monthly-over-1200']
      }
    ]
  },

  'down-payment-amount': {
    id: 'down-payment-amount',
    type: 'question',
    category: 'qualification',
    headline: "Do you have a down payment ready?",
    subheadline: "This helps us understand your options.",
    answers: [
      {
        id: 'dp-none',
        text: "No down payment right now",
        icon: "🔍",
        nextQuestionId: 'contact-capture',
        qualificationScore: 5,
        tags: ['no-down-payment']
      },
      {
        id: 'dp-small',
        text: "Under $5,000",
        icon: "💵",
        nextQuestionId: 'contact-capture',
        qualificationScore: 10,
        tags: ['small-down-payment']
      },
      {
        id: 'dp-moderate',
        text: "$5,000 - $15,000",
        icon: "💵💵",
        nextQuestionId: 'contact-capture',
        qualificationScore: 20,
        tags: ['moderate-down-payment']
      },
      {
        id: 'dp-strong',
        text: "$15,000+",
        icon: "💵💵💵",
        nextQuestionId: 'contact-capture',
        qualificationScore: 25,
        tags: ['strong-down-payment']
      }
    ]
  },

  // =============================================
  // FINAL LEAD CAPTURE
  // =============================================
  'contact-capture': {
    id: 'contact-capture',
    type: 'lead-capture',
    headline: "Awesome, {{firstName}}! I've got a clear picture of what you're looking for.",
    subheadline: "Let me get your contact info so we can discuss your personalized options.",
    leadFields: ['lastName', 'email', 'phone'],
    nextQuestionId: 'final-question'
  },

  'final-question': {
    id: 'final-question',
    type: 'question',
    category: 'qualification',
    headline: "Last thing - what's the best way to reach you?",
    subheadline: "We want to connect in the way that works best for you.",
    answers: [
      {
        id: 'call-me',
        text: "Call me - I'm ready to talk",
        subtext: "Let's have a real conversation",
        icon: "📞",
        nextQuestionId: 'result-hot',
        qualificationScore: 25,
        tags: ['prefers-call', 'ready-to-talk']
      },
      {
        id: 'text-me',
        text: "Text me first",
        subtext: "I'll respond when I can",
        icon: "💬",
        nextQuestionId: 'result-warm',
        qualificationScore: 15,
        tags: ['prefers-text']
      },
      {
        id: 'email-me',
        text: "Email works best",
        subtext: "Send me information",
        icon: "📧",
        nextQuestionId: 'result-warm',
        qualificationScore: 10,
        tags: ['prefers-email']
      }
    ]
  },

  // =============================================
  // RESULTS SCREENS
  // =============================================
  'result-hot': {
    id: 'result-hot',
    type: 'result',
    headline: "You're all set, {{firstName}}!",
    subheadline: "Based on everything you've shared, we have some great options for you. One of our mobile home specialists will give you a call shortly to discuss the next steps. Get ready to find your perfect home!"
  },

  'result-warm': {
    id: 'result-warm',
    type: 'result',
    headline: "Thanks for sharing, {{firstName}}!",
    subheadline: "We've captured all your preferences and a member of our team will reach out soon with personalized options. Keep an eye on your inbox (or phone) - exciting things are coming your way!"
  }
};

// Helper function to calculate lead qualification tier
export function getQualificationTier(score: number): {
  tier: 'hot' | 'warm' | 'cold' | 'nurture';
  label: string;
  description: string;
} {
  if (score >= 150) {
    return {
      tier: 'hot',
      label: 'Hot Lead',
      description: 'High intent, ready to buy, reach out immediately'
    };
  } else if (score >= 100) {
    return {
      tier: 'warm',
      label: 'Warm Lead',
      description: 'Good potential, follow up within 24 hours'
    };
  } else if (score >= 50) {
    return {
      tier: 'cold',
      label: 'Cold Lead',
      description: 'Early stage, add to nurture sequence'
    };
  } else {
    return {
      tier: 'nurture',
      label: 'Nurture',
      description: 'Low intent, long-term follow up'
    };
  }
}

// Get all question IDs for a given path
export function getQuestionById(id: string): Question | undefined {
  return funnelQuestions[id];
}

// Progress percentages for each question - provides smooth progress regardless of path taken
export const questionProgress: Record<string, number> = {
  // Opening - Build Connection (0-20%)
  'start': 5,
  'motivation': 10,
  'timeline': 18,

  // First Lead Capture (20-25%)
  'first-name-capture': 25,

  // Land Situation - Major Branching (25-40%)
  'land-situation': 30,
  'land-utilities': 35,
  'land-work-needed': 38,
  'land-with-home': 35,
  'acreage-preference': 38,
  'community-awareness': 35,
  'lot-rent-education': 38,
  'community-preferences': 40,
  'land-education': 35,
  'land-preference-after-education': 40,

  // Home Requirements (40-60%)
  'home-size': 45,
  'home-style': 52,
  'new-vs-used': 60,

  // Payment & Financing (60-85%)
  'payment-method': 68,
  'cash-budget': 78,
  'credit-situation': 75,
  'credit-improvement': 78,
  'monthly-budget': 80,
  'down-payment-amount': 85,

  // Final Lead Capture (85-100%)
  'contact-capture': 90,
  'final-question': 95,
  'result-hot': 100,
  'result-warm': 100
};

// Get progress percentage for a given question ID
export function getProgressForQuestion(questionId: string): number {
  return questionProgress[questionId] ?? 0;
}
