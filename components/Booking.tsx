
import React, { useState, useEffect, useRef } from 'react';
import { 
  PriceRange, 
  SalesClosingMethod, 
  SettingBreakdown, 
  LeadFlowStatus, 
  LeadGenMethod, 
  LeadForm,
  LeadStatus
} from '../types';
import PopButton from './PopButton';

const BOOKING_QUOTES = [
  "A Standard Above the Rest.",
  "An Extension of Your Team.",
  "Elite Talent. Global Scale.",
  "Your Growth, Our Precision.",
  "Seamless Operational Excellence."
];

const Booking: React.FC = () => {
  const [step, setStep] = useState<'form' | 'scheduler' | 'confirmation'>('form');
  const containerRef = useRef<HTMLDivElement>(null);
  const CALENDLY_URL = 'https://calendly.com/eyobtefera295/30min';
  
  // Date/Time Selection State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewDate, setViewDate] = useState<Date>(new Date()); // Controls the calendar view month
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);
  
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

  useEffect(() => {
    if (containerRef.current) {
      const yOffset = -100;
      const y = containerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [step]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % BOOKING_QUOTES.length);
        setQuoteFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(quoteInterval);
  }, []);

  const toggleArrayItem = <T,>(arr: T[], item: T) => {
    return arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
  };

  const validate = () => {
    const errs: string[] = [];
    if (!form.fullName || !form.email || !form.phone) errs.push("Contact details are required.");
    if (form.closingMethods.length === 0) errs.push("Select at least one closing method.");
    if (form.breakdowns.length === 0) errs.push("Select your biggest breakdown.");
    if (form.genMethods.length === 0) errs.push("Select your lead generation sources.");
    if (!form.canInvest) errs.push("Please indicate your ability to invest.");
    setErrors(errs);
    return errs.length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // If no time selected yet, move user to scheduler to pick a slot
    if (!selectedTime) {
      setStep('scheduler');
      setSubmitting(false);
      return;
    }

    // Persist booking intent with the date/time the user chose on our site
    const pending = {
      id: `SC-${Math.floor(Math.random() * 900) + 100}`,
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      status: LeadStatus.CALL_BOOKED,
      auditAt: new Date().toISOString(),
      bookedAt: `${selectedDate.toLocaleDateString()} ${selectedTime}`,
      price: form.priceRange,
      breakdown: form.breakdowns[0] || '',
      flow: form.leadCapacity,
      closing: form.closingMethods[0] || '',
      canInvest: form.canInvest === 'Yes',
      genMethods: form.genMethods,
      notes: 'Scheduled via Calendly'
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('summit_leads') || '[]');
      localStorage.setItem('summit_leads', JSON.stringify([pending, ...existingLeads]));
      // Mark that Calendly flow was initiated so returning users see confirmation
      localStorage.setItem('summit_calendly_booked', JSON.stringify(pending));
    } catch (e) {}

    try { window.open(CALENDLY_URL, '_blank'); } catch (err) {}
    // Show confirmation based on the date/time chosen on our site
    setTimeout(() => {
      setStep('confirmation');
      setSubmitting(false);
    }, 400);
  };

  // On mount, if a Calendly booking record exists in localStorage, show confirmation
  useEffect(() => {
    try {
      const search = window.location.search;
      const params = new URLSearchParams(search);

      // Support two patterns:
      // 1) calendly_data=<urlencoded JSON>  => { name,email,phone,bookedAt }
      // 2) calendly_date=YYYY-MM-DD & calendly_time=HH:MM (24h or AM/PM)
      let bookedRecord: any = null;

      if (params.has('calendly_data')) {
        try {
          const raw = decodeURIComponent(params.get('calendly_data') || '');
          bookedRecord = JSON.parse(raw);
        } catch (e) { bookedRecord = null; }
      } else if (params.has('calendly_date')) {
        const d = params.get('calendly_date');
        const t = params.get('calendly_time') || '';
        bookedRecord = {
          name: params.get('name') || form.fullName,
          email: params.get('email') || form.email,
          phone: params.get('phone') || form.phone,
          bookedAt: t ? `${d} ${t}` : d
        };
      }

      // If a redirect from Calendly provided details, persist them
      if (bookedRecord && bookedRecord.email) {
        try {
          localStorage.setItem('summit_calendly_booked', JSON.stringify(bookedRecord));
          const existingLeads = JSON.parse(localStorage.getItem('summit_leads') || '[]');
          const lead = {
            id: bookedRecord.id || `SC-${Math.floor(Math.random() * 900) + 100}`,
            name: bookedRecord.name || form.fullName,
            email: bookedRecord.email,
            phone: bookedRecord.phone || form.phone,
            status: LeadStatus.CALL_BOOKED,
            auditAt: new Date().toISOString(),
            bookedAt: bookedRecord.bookedAt || 'Booked via Calendly',
            price: form.priceRange,
            breakdown: form.breakdowns[0] || '',
            flow: form.leadCapacity,
            closing: form.closingMethods[0] || '',
            canInvest: form.canInvest === 'Yes',
            genMethods: form.genMethods,
            notes: 'Scheduled via Calendly (redirect)'
          };
          localStorage.setItem('summit_leads', JSON.stringify([lead, ...existingLeads]));
        } catch (e) {}
      }

      const stored = localStorage.getItem('summit_calendly_booked');
      if (stored) {
        const data = JSON.parse(stored);
        if (data && data.email) {
          setForm(prev => ({ ...prev, fullName: data.name || prev.fullName, email: data.email || prev.email, phone: data.phone || prev.phone }));
          // If bookedAt contains a full datetime, try to populate selectedDate/selectedTime
          if (data.bookedAt && typeof data.bookedAt === 'string' && data.bookedAt !== 'Booked via Calendly') {
            // Try ISO parse first
            const iso = new Date(data.bookedAt);
            if (!isNaN(iso.getTime())) {
              setSelectedDate(iso);
              // Format time
              const h = iso.getHours() % 12 || 12;
              const min = iso.getMinutes().toString().padStart(2, '0');
              const ampm = iso.getHours() >= 12 ? 'PM' : 'AM';
              setSelectedTime(`${h}:${min} ${ampm}`);
            } else {
              // Fallback: try to parse strings like 'YYYY-MM-DD HH:MM' or 'MM/DD/YYYY HH:MM AM/PM'
              const parts = data.bookedAt.split(' ');
              const datePart = parts[0];
              const timePart = parts.slice(1).join(' ');
              const parsed = new Date(datePart + 'T' + (timePart || '00:00'));
              if (!isNaN(parsed.getTime())) {
                setSelectedDate(parsed);
                if (timePart) setSelectedTime(timePart);
              }
            }
          }
          setStep('confirmation');
        }
      }
    } catch (e) {}
  }, []);

  const handleFinalBooking = () => {
    if (!selectedTime) return;
    setSubmitting(true);

    // Finalize lead record with booking data
    const finalRecord = {
      id: `SC-${Math.floor(Math.random() * 900) + 100}`,
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      status: LeadStatus.CALL_BOOKED,
      auditAt: new Date().toISOString(),
      bookedAt: `${selectedDate.toDateString()} at ${selectedTime}`,
      price: form.priceRange,
      breakdown: form.breakdowns[0],
      flow: form.leadCapacity,
      closing: form.closingMethods[0],
      canInvest: form.canInvest === 'Yes',
      genMethods: form.genMethods,
      notes: 'Strategy Session confirmed via scheduler.'
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('summit_leads') || '[]');
      localStorage.setItem('summit_leads', JSON.stringify([finalRecord, ...existingLeads]));
    } catch (e) {}

    setTimeout(() => {
      setStep('confirmation');
      setSubmitting(false);
    }, 1200);
  };

  const handleClearBooking = () => {
    try { localStorage.removeItem('summit_calendly_booked'); } catch (e) {}
    setStep('form');
    setSelectedTime('');
  };

  const handleReturnToHQ = () => {
    try { localStorage.removeItem('summit_calendly_booked'); } catch (e) {}
    window.location.hash = '#/';
  };

  // Calendar Logic
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const changeMonth = (offset: number) => {
    const nextView = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(nextView);
  };

  const changeYear = (offset: number) => {
    const nextView = new Date(viewDate.getFullYear() + offset, viewDate.getMonth(), 1);
    setViewDate(nextView);
  };

  const renderCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0,0,0,0);

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`pad-${i}`} className="aspect-square"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const current = new Date(year, month, d);
      const isSelected = current.toDateString() === selectedDate.toDateString();
      const isPast = current < today;
      const isWeekend = current.getDay() === 0 || current.getDay() === 6;

      days.push(
        <button
          key={d}
          type="button"
          disabled={isPast}
          onClick={() => setSelectedDate(current)}
          className={`relative aspect-square rounded-xl md:rounded-2xl border-2 flex items-center justify-center font-black text-sm transition-all
            ${isSelected ? 'bg-blue-600 border-white text-white shadow-xl scale-110 z-10' : 
              isPast ? 'opacity-10 grayscale border-transparent cursor-not-allowed' : 
              isWeekend ? 'bg-white/5 border-white/5 text-white/30 hover:border-white/20' : 
              'bg-white/5 border-white/10 text-white hover:border-white/40'}`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let min of ["00", "30"]) {
        if (hour === 20 && min === "30") break;
        const h = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? "PM" : "AM";
        slots.push(`${h}:${min} ${ampm}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div id="booking-system" className="relative scroll-mt-32" ref={containerRef}>
      {step !== 'confirmation' && (
        <div className="text-center mb-12 px-4">
          <h2 className="text-slate-900 text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-tight">
            Qualify Your Business <br/> <span className="text-[#003c95]">for a Strategy Session.</span>
          </h2>
          <p className={`text-slate-400 text-sm md:text-lg max-w-xl mx-auto italic font-medium transition-opacity duration-500 ${quoteFade ? 'opacity-100' : 'opacity-0'}`}>
            "{BOOKING_QUOTES[quoteIndex]}"
          </p>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 pb-20">
        {step === 'form' ? (
          <div className="bg-white p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-slate-100 animate-reveal">
            <form onSubmit={handleFormSubmit} className="space-y-12 md:space-y-16">
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#003c95] flex items-center justify-center font-black text-xs shrink-0">1</span>
                  <label className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tight">What is the price range of the offer you sell?</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.values(PriceRange).map(v => (
                    <button key={v} type="button" onClick={() => setForm({...form, priceRange: v})} className={`py-4 px-6 rounded-2xl font-black text-[11px] uppercase tracking-widest border-2 transition-all ${form.priceRange === v ? 'border-[#003c95] bg-[#003c95] text-white shadow-lg' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#003c95] flex items-center justify-center font-black text-xs shrink-0">2</span>
                  <label className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tight">How are sales currently closed in your business? (Select all)</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.values(SalesClosingMethod).map(v => (
                    <button key={v} type="button" onClick={() => setForm({...form, closingMethods: toggleArrayItem(form.closingMethods, v)})} className={`flex items-center gap-4 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all text-left ${form.closingMethods.includes(v) ? 'border-[#003c95] text-[#003c95] bg-blue-50/50' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded border-2 shrink-0 ${form.closingMethods.includes(v) ? 'bg-[#003c95] border-[#003c95]' : 'border-slate-300'}`}></div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#003c95] flex items-center justify-center font-black text-xs shrink-0">3</span>
                  <label className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tight">Biggest breakdown in appointment setting right now? (Select all)</label>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {Object.values(SettingBreakdown).map(v => (
                    <button key={v} type="button" onClick={() => setForm({...form, breakdowns: toggleArrayItem(form.breakdowns, v)})} className={`flex items-center gap-4 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all text-left ${form.breakdowns.includes(v) ? 'border-red-200 bg-red-50 text-red-600' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${form.breakdowns.includes(v) ? 'bg-red-500 border-red-500' : 'border-slate-300'}`}></div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#003c95] flex items-center justify-center font-black text-xs shrink-0">4</span>
                  <label className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tight">Generate enough leads to support appointment setting?</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.values(LeadFlowStatus).map(v => (
                    <button key={v} type="button" onClick={() => setForm({...form, leadCapacity: v})} className={`py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${form.leadCapacity === v ? 'border-[#003c95] bg-[#003c95] text-white' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#003c95] flex items-center justify-center font-black text-xs shrink-0">5</span>
                  <label className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tight">How do you currently generate leads? (Select all)</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.values(LeadGenMethod).map(v => (
                    <button key={v} type="button" onClick={() => setForm({...form, genMethods: toggleArrayItem(form.genMethods, v)})} className={`flex items-center gap-4 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all text-left ${form.genMethods.includes(v) ? 'border-[#003c95] text-[#003c95] bg-blue-50/50' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded border-2 shrink-0 ${form.genMethods.includes(v) ? 'bg-[#003c95] border-[#003c95]' : 'border-slate-300'}`}></div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#003c95] flex items-center justify-center font-black text-xs shrink-0">6</span>
                  <label className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tight">Are you able to invest in fixing this IF our offer made sense?</label>
                </div>
                <div className="flex gap-4">
                  {['Yes', 'No'].map(v => (
                    <button key={v} type="button" onClick={() => setForm({...form, canInvest: v})} className={`flex-grow py-5 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${form.canInvest === v ? 'border-[#003c95] bg-[#003c95] text-white shadow-xl' : 'border-slate-50 bg-slate-50 text-slate-400'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-12 md:pt-16 border-t border-slate-100 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 p-4 rounded-xl font-bold border-2 border-transparent focus:bg-white focus:border-[#003c95] outline-none" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Work Email</label>
                    <input type="email" className="w-full bg-slate-50 p-4 rounded-xl font-bold border-2 border-transparent focus:bg-white focus:border-[#003c95] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</label>
                    <input type="tel" className="w-full bg-slate-50 p-4 rounded-xl font-bold border-2 border-transparent focus:bg-white focus:border-[#003c95] outline-none" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+XX XXX XXX XXXX" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full bg-slate-50 p-4 rounded-xl font-bold border-2 border-transparent focus:bg-white focus:border-[#003c95] outline-none"
                      value={selectedDate.toISOString().slice(0,10)}
                      onChange={e => setSelectedDate(new Date(e.target.value + 'T00:00'))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preferred Time</label>
                    <select
                      value={selectedTime}
                      onChange={e => setSelectedTime(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border-2 border-transparent text-slate-700 rounded-xl p-4 font-black text-xs uppercase tracking-[0.1em] outline-none focus:border-[#003c95] transition-all"
                    >
                      <option value="">-- Choose a time --</option>
                      {timeSlots.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden md:block"></div>
                </div>

                <div className="flex flex-col items-center gap-8">
                  {errors.length > 0 && <div className="text-red-500 text-xs font-bold uppercase tracking-widest">Complete all required fields</div>}
                  <PopButton type="submit" className={`w-full md:w-auto px-16 py-6 bg-[#003c95] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl ${submitting ? 'opacity-50' : ''}`}>
                    {submitting ? 'Authenticating...' : 'Proceed to Booking'}
                  </PopButton>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Your information is encrypted and only used for meeting preparation.</p>
                </div>
              </div>
            </form>
          </div>
        ) : step === 'scheduler' ? (
          /* STEP 2: ADVANCED MONTHLY SCHEDULER */
          <div className="bg-[#001e4d] text-white p-6 md:p-16 rounded-[2.5rem] md:rounded-[4.5rem] shadow-2xl border border-white/10 animate-reveal">
             <div className="flex flex-col items-center text-center mb-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/30">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/></svg>
                </div>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 leading-tight">Secure Your Strategy Audit</h3>
                <p className="text-blue-200/60 font-medium max-w-sm text-xs md:text-sm">Select a date and time slot for your team deployment audit.</p>
             </div>

             <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-8">
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-tight">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => changeYear(-1)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">«</button>
                        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">‹</button>
                        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">›</button>
                        <button onClick={() => changeYear(1)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">»</button>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-7 gap-2 md:gap-3">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="text-center text-[8px] font-black uppercase text-blue-400/50 tracking-widest mb-2">{d}</div>
                      ))}
                      {renderCalendarDays()}
                   </div>
                </div>

                <div className="lg:col-span-4 border-l border-white/5 lg:pl-10 space-y-8">
                   <div className="space-y-4">
                     <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">02. Choose Time Slot</h4>
                     <div className="relative group">
                        <select 
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full appearance-none bg-white/5 border-2 border-white/10 text-white rounded-2xl p-5 font-black text-xs uppercase tracking-[0.1em] outline-none focus:border-blue-500 transition-all cursor-pointer"
                        >
                          <option value="" className="bg-[#001e4d] text-white/50">-- Select Availability --</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="bg-[#001e4d] text-white py-4">{time}</option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                     </div>
                     <p className="text-[9px] text-white/30 font-medium tracking-wide">Showing all available slots from 8:00 AM to 8:00 PM.</p>
                   </div>

                   <div className="p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20">
                     <p className="text-[9px] font-black uppercase text-blue-400 mb-2">Selected Session</p>
                     <p className="text-sm font-black text-white">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                     <p className="text-xl font-black text-blue-400 mt-1">{selectedTime || 'Pending Time...'}</p>
                   </div>
                </div>
             </div>

             <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                <button onClick={() => setStep('form')} className="text-white/40 hover:text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-3 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                  Back to Checklist
                </button>

                <PopButton 
                  onClick={handleFinalBooking}
                  className={`w-full md:w-auto px-16 py-7 bg-white text-[#001e4d] rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all ${(!selectedTime || submitting) ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:scale-105 hover:bg-blue-50'}`}
                  showArrow={false}
                >
                  {submitting ? 'Confirming...' : 'Confirm Deployment'} <span className="ml-3">→</span>
                </PopButton>
             </div>
          </div>
        ) : (
          /* STEP 3: CONFIRMATION SCREEN */
          <div className="bg-white p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.1)] border border-slate-100 text-center animate-reveal relative overflow-hidden">
             {/* Decorative Background for Confirmation */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
             
             <div className="relative z-10">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-10 shadow-xl shadow-green-100/50">
                  <svg className="w-12 h-12 animate-bounce-short" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-4 block">Operation Initialized</span>
                <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">YOUR SESSION IS <br/><span className="text-blue-600">CONFIRMED.</span></h3>
                
                <div className="max-w-md mx-auto bg-slate-50 p-8 rounded-[2rem] border border-slate-100 mb-12">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Strategic Audit Appointment</p>
                   <p className="text-xl font-black text-slate-900 mb-1">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                   <p className="text-3xl font-black text-blue-600">{selectedTime}</p>
                </div>
                
                <p className="text-slate-500 max-w-sm mx-auto text-base font-medium leading-relaxed mb-12">
                   Check your email (<strong>{form.email}</strong>) for your calendar invite and session preparation documents.
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                   <PopButton 
                     onClick={handleReturnToHQ}
                     className="px-16 py-6 bg-[#001e4d] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl"
                   >
                     Return to HQ
                   </PopButton>
                   {/* <button onClick={handleClearBooking} className="px-10 py-6 text-red-500 hover:text-red-700 font-black uppercase text-[10px] tracking-widest transition-colors">
                     Clear Booking
                   </button> */}
                   <button className="px-10 py-6 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors">
                     Add to Calendar
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes bounce-short { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-bounce-short { animation: bounce-short 2s infinite ease-in-out; }
        select::-webkit-scrollbar { width: 6px; }
        select::-webkit-scrollbar-track { background: transparent; }
        select::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Booking;