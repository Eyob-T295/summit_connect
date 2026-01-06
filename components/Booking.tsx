
import React, { useState } from 'react';
import { 
  PriceRange, 
  SalesClosingMethod, 
  SettingBreakdown, 
  LeadFlowStatus, 
  LeadGenMethod, 
  LeadForm,
  LeadStatus
} from '../types';
import RotatingQuote from './RotatingQuote';
import PopButton from './PopButton';

const Booking: React.FC = () => {
  const [step, setStep] = useState<'form' | 'calendly'>('form');
  const [form, setForm] = useState<LeadForm>({
    fullName: '',
    email: '',
    phone: '',
    priceRange: PriceRange.THREE_TO_TEN,
    closingMethods: [],
    breakdowns: [],
    leadCapacity: LeadFlowStatus.YES_50_PLUS,
    genMethods: [],
    canInvest: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const toggleArrayItem = <T,>(arr: T[], item: T) => {
    return arr.includes(item) 
      ? arr.filter(i => i !== item) 
      : [...arr, item];
  };

  const validate = () => {
    const errs: string[] = [];
    if (!form.fullName || !form.email || !form.phone) errs.push("Basic contact details are required.");
    if (form.closingMethods.length === 0) errs.push("Please select at least one sales closing method.");
    if (form.breakdowns.length === 0) errs.push("Please select your biggest appointment setting breakdown.");
    if (form.genMethods.length === 0) errs.push("Please select your lead generation sources.");
    if (!form.canInvest) errs.push("Please indicate your ability to invest.");
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    
    // Create new lead record for persistence
    const newLead = {
      id: `SC-${Math.floor(Math.random() * 900) + 100}`,
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      timezone: 'Auto-detected',
      price: form.priceRange,
      breakdown: form.breakdowns[0],
      flow: form.leadCapacity,
      closing: form.closingMethods[0],
      status: LeadStatus.AUDIT_SUBMITTED,
      auditAt: new Date().toISOString(),
      canInvest: form.canInvest === 'Yes',
      notes: 'Submitted via website audit form.',
      owner: 'Unassigned',
      genMethods: form.genMethods
    };

    // Store in localStorage for the Dashboard to pick up
    try {
      const existingLeads = JSON.parse(localStorage.getItem('summit_leads') || '[]');
      localStorage.setItem('summit_leads', JSON.stringify([newLead, ...existingLeads]));
    } catch (e) {
      console.error("Failed to save lead data", e);
    }

    setTimeout(() => {
      setStep('calendly');
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div id="booking-system" className="relative">
      <div className="text-center mb-16">
        <h2 className="text-slate-900 text-5xl font-black mb-6 tracking-tight">Requirement Checklist</h2>
        <RotatingQuote className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed italic" />
      </div>

      <div className="max-w-4xl mx-auto">
        {step === 'form' ? (
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100">
            <h3 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4 leading-tight">
              <span className="w-12 h-12 bg-[#003c95] rounded-full flex items-center justify-center text-white text-xl flex-shrink-0 shadow-lg shadow-blue-200">1</span>
              <span>Qualify Your Business <br className="hidden md:block" /> for a Strategy Session.</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-16">
              {errors.length > 0 && (
                <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-3xl text-sm font-bold animate-shake">
                  {errors.map((e, i) => <p key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> {e}</p>)}
                </div>
              )}

              {/* 1. Price Range */}
              <div className="space-y-6">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-[#003c95] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">1</span>
                  What is the price range of the offer you sell?
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.values(PriceRange).map(v => (
                    <button
                      key={v} type="button"
                      onClick={() => setForm({...form, priceRange: v})}
                      className={`py-4 px-6 rounded-2xl font-bold border-2 transition-all ${form.priceRange === v ? 'border-[#003c95] bg-[#003c95] text-white' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-blue-100'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Sales Closing Methods */}
              <div className="space-y-6">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-[#003c95] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">2</span>
                  How are sales currently closed in your business? (Select all)
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.values(SalesClosingMethod).map(v => (
                    <button
                      key={v} type="button"
                      onClick={() => setForm({...form, closingMethods: toggleArrayItem(form.closingMethods, v)})}
                      className={`flex items-center gap-4 py-4 px-6 rounded-2xl font-bold border-2 transition-all text-left ${form.closingMethods.includes(v) ? 'border-[#003c95] bg-blue-50 text-[#003c95]' : 'border-slate-50 bg-slate-50 text-slate-400'}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.closingMethods.includes(v) ? 'bg-[#003c95] border-[#003c95]' : 'border-slate-300'}`}>
                        {form.closingMethods.includes(v) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Setting Breakdowns */}
              <div className="space-y-6">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-[#003c95] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">3</span>
                  Biggest breakdown in appointment setting right now? (Select all)
                </label>
                <div className="space-y-3">
                  {Object.values(SettingBreakdown).map(v => (
                    <button
                      key={v} type="button"
                      onClick={() => setForm({...form, breakdowns: toggleArrayItem(form.breakdowns, v)})}
                      className={`flex items-center gap-4 py-4 px-6 rounded-2xl font-bold border-2 transition-all text-left w-full ${form.breakdowns.includes(v) ? 'border-red-200 bg-red-50/30 text-red-900' : 'border-slate-50 bg-slate-50 text-slate-500'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.breakdowns.includes(v) ? 'bg-red-500 border-red-500' : 'border-slate-300'}`}>
                        {form.breakdowns.includes(v) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Lead Capacity */}
              <div className="space-y-6">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-[#003c95] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">4</span>
                  Generate enough leads to support appointment setting?
                </label>
                <div className="space-y-3">
                  {Object.values(LeadFlowStatus).map(v => (
                    <button
                      key={v} type="button"
                      onClick={() => setForm({...form, leadCapacity: v})}
                      className={`flex items-center gap-4 py-4 px-6 rounded-2xl font-bold border-2 transition-all text-left w-full ${form.leadCapacity === v ? 'border-[#003c95] bg-blue-50 text-[#003c95]' : 'border-slate-50 bg-slate-50 text-slate-500'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.leadCapacity === v ? 'border-[#003c95] bg-[#003c95]' : 'border-slate-300'}`}>
                        <div className={`w-2 h-2 rounded-full bg-white transition-transform ${form.leadCapacity === v ? 'scale-100' : 'scale-0'}`}></div>
                      </div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Lead Gen Methods */}
              <div className="space-y-6">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-[#003c95] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">5</span>
                  How do you currently generate leads? (Select all)
                </label>
                <div className="grid md:grid-cols-1 gap-3">
                  {Object.values(LeadGenMethod).map(v => (
                    <button
                      key={v} type="button"
                      onClick={() => setForm({...form, genMethods: toggleArrayItem(form.genMethods, v)})}
                      className={`flex items-center gap-4 py-4 px-6 rounded-2xl font-bold border-2 transition-all text-left ${form.genMethods.includes(v) ? 'border-[#003c95] bg-blue-50 text-[#003c95]' : 'border-slate-50 bg-slate-50 text-slate-500'}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.genMethods.includes(v) ? 'bg-[#003c95] border-[#003c95]' : 'border-slate-300'}`}>
                        {form.genMethods.includes(v) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Investment Ability */}
              <div className="space-y-6">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-[#003c95] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">6</span>
                  Are you able to invest in fixing this IF our offer made sense?
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(v => (
                    <button
                      key={v} type="button"
                      onClick={() => setForm({...form, canInvest: v})}
                      className={`flex-1 py-4 px-6 rounded-2xl font-black border-2 transition-all ${form.canInvest === v ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-blue-100'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* 7. Final Contact Details */}
              <div className="pt-12 border-t-2 border-slate-50 space-y-10">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Full Name</label>
                    <input
                      type="text" required placeholder="John Doe"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#003c95] outline-none transition-all font-bold"
                      value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Work Email</label>
                    <input
                      type="email" required placeholder="john@company.com"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#003c95] outline-none transition-all font-bold"
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Phone</label>
                    <input
                      type="tel" required placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#003c95] outline-none transition-all font-bold"
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <PopButton
                    type="submit"
                    className={`w-full bg-[#003c95] text-white font-black py-7 rounded-[2.5rem] hover:bg-[#00265e] transition-all shadow-2xl shadow-blue-100 text-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-4 group ${submitting ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {submitting ? 'Processing Audit...' : 'Proceed to Booking'}
                    <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </PopButton>
                  <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                    Your information is encrypted and only used for meeting preparation.
                  </p>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="animate-reveal">
            <div className="bg-[#003c95] p-10 rounded-t-[3.5rem] text-white flex items-center justify-between border-b border-white/10 shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#003c95] shadow-xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black">Audit Complete</h3>
                  <p className="text-white/60 font-bold uppercase tracking-widest text-xs mt-1">Ready for Strategy Session</p>
                </div>
              </div>
              <button 
                onClick={() => setStep('form')}
                className="text-xs font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10"
              >
                Reset Audit
              </button>
            </div>
            <div className="bg-white rounded-b-[3.5rem] shadow-2xl border-x border-b border-slate-100 overflow-hidden min-h-[700px] flex flex-col items-center justify-center p-12">
               <div className="text-center max-w-lg">
                 <div className="w-24 h-24 bg-blue-50 text-[#003c95] rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                 </div>
                 <h4 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Schedule Your Zoom Call</h4>
                 <p className="text-slate-500 mb-10 text-xl font-medium leading-relaxed">
                   Great job! Your profile matches our elite partnership criteria. Pick a time below to finalize your 90-day scale strategy.
                 </p>
                 <button 
                  onClick={() => alert("Launching Calendly Widget...")}
                  className="bg-[#003c95] text-white font-black px-12 py-5 rounded-3xl hover:bg-[#00265e] transition-all text-xl uppercase tracking-widest shadow-2xl shadow-blue-100 active:scale-95"
                 >
                   Open Scheduler
                 </button>
                 <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">Available Slots: Next 48 Hours</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
