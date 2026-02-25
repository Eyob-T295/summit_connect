
export enum PriceRange {
  THREE_TO_TEN = '3k - 10k',
  TEN_TO_THIRTY = '10k - 30k',
  THIRTY_TO_FIFTY = '30k - 50k',
}

export enum SalesClosingMethod {
  BOOKED_CALLS = 'Booked sales calls',
  DMS_CHAT = 'DMs / Chat',
  INBOUND_ONLY = 'Inbound only',
  OTHER = 'Other'
}

export enum SettingBreakdown {
  SLOW_FOLLOWUP = 'Missed or slow lead follow-up',
  UNQUALIFIED = 'Unqualified prospects booking calls',
  NOSHOWS = 'No-shows',
  TURNOVER = 'Setter turnover or inconsistency',
  NO_SYSTEM = 'No clear system or tracking'
}

export enum LeadFlowStatus {
  YES_50_PLUS = 'Yes (50+ leads/month)',
  INCONSISTENT = 'Some leads, inconsistent',
  NO_FLOW = 'No consistent lead flow'
}

export enum LeadGenMethod {
  PAID_ADS = 'Paid ads (Meta, Google, YouTube, etc.)',
  ORGANIC = 'Organic content (YouTube, Instagram, TikTok, SEO)',
  REFERRALS = 'Referrals / partnerships',
  EMAIL_SMS = 'Email or SMS list',
  OUTBOUND = 'Outbound / cold outreach',
  MULTIPLE = 'Multiple channels',
  NONE = 'No consistent lead source yet'
}

export enum ServiceCategory {
  APPOINTMENT_SETTING = 'Appointment Setting',
  TELEMARKETING_LEAD_GEN = 'Telemarketing & Lead Generation',
  COLD_CALLING = 'Cold Calling',
  CUSTOMER_SUPPORT = 'Customer Support (Inbound/Outbound)',
  OMNICHANNEL_SUPPORT = 'Phone, Chat & Email Support',
  ADMIN_SUPPORT = 'Administrative Support',
  VIRTUAL_ASSISTANT = 'Virtual Assistant (Full/Part Time)',
  OTHER = 'Other'
}

export enum RevenueBracket {
  ZERO_TO_100K = '0 - 100k',
  HUNDRED_TO_250K = '100k - 250k',
  TWOHUNDRED_TO_500K = '250k - 500k',
  FIVEHUNDRED_TO_1M = '500k - 1M+',
}

export enum LeadStatus {
  AUDIT_SUBMITTED = 'Audit Submitted',
  QUALIFIED = 'Qualified',
  CALL_BOOKED = 'Call Booked',
  COMPLETED = 'Completed',
  NO_SHOW = 'No Show',
  DISQUALIFIED = 'Disqualified'
}

export interface LeadForm {
  fullName: string;
  email: string;
  phone: string;
  priceRange: PriceRange;
  closingMethods: SalesClosingMethod[];
  breakdowns: SettingBreakdown[];
  leadCapacity: LeadFlowStatus;
  genMethods: LeadGenMethod[];
  canInvest: string;
}