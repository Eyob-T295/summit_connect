
import { ServiceCategory } from './types';

export const CORE_SERVICES = [
  {
    title: "Appointment Setting & Follow-ups",
    desc: "We fill your calendar with high-intent meetings and handle the persistent follow-up sequences required to close.",
    icon: "calendar"
  },
  {
    title: "Outbound & Inbound Support",
    desc: "Elite calling operations for both proactive outreach and responsive customer support that protects your brand.",
    icon: "phone"
  },
  {
    title: "Omnichannel & VA Services",
    desc: "Seamless integration across phone, chat, and email, supported by dedicated virtual assistant talent.",
    icon: "users"
  },
  {
    title: "Fully Managed Operations",
    desc: "We take the entire management burden off your plate. From hiring to daily operations, everything is handled by us.",
    icon: "briefcase"
  },
  {
    title: "QA & Performance Reporting",
    desc: "Absolute transparency with live quality assurance, rigorous KPI tracking, and detailed performance analytics.",
    icon: "target"
  }
];

export const PRICING_PLANS = [
  {
    name: "Growth Tier",
    price: "$1,850",
    description: "Perfect for startups and small businesses testing outreach.",
    features: [
      "1 Dedicated Specialist",
      "Full Management & QA",
      "Real-time KPI Dashboard",
      "CRM Data Synchronization",
      "Weekly Performance Reviews"
    ]
  },
  {
    name: "Standard Elite",
    price: "$3,600",
    description: "Our most popular 'Standard Above' package for scaling fast.",
    features: [
      "2 Dedicated Specialists",
      "Advanced Call Monitoring",
      "Custom Script Engineering",
      "Daily Performance Syncs",
      "Lead Enrichment Included",
      "Dedicated Team Lead"
    ],
    recommended: true
  },
  {
    name: "Enterprise Solutions",
    price: "Custom",
    description: "Fully customized call-center units for global dominance.",
    features: [
      "Unlimited Dialing Capacity",
      "Multi-channel Integration",
      "24/7 Availability Coverage",
      "Dedicated Project Director",
      "Full Compliance Suite",
      "Customized API Reporting"
    ]
  }
];
