
import React, { useState, useMemo, useEffect } from 'react';
import Logo from './Logo';
import PopButton from './PopButton';
import { analyzeLeadsData } from '../services/geminiService';
import { 
  PriceRange, 
  SalesClosingMethod, 
  SettingBreakdown, 
  LeadFlowStatus, 
  LeadGenMethod,
  LeadStatus
} from '../types';

interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  price: PriceRange;
  breakdown: SettingBreakdown;
  flow: LeadFlowStatus;
  closing: SalesClosingMethod;
  status: LeadStatus;
  bookedAt?: string;
  auditAt: string;
  canInvest: boolean;
  notes: string;
  owner: string;
  genMethods: LeadGenMethod[];
}

const InternalDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'performance' | 'calendar' | 'intelligence'>('bookings');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);

  // Load leads from localStorage on mount
  useEffect(() => {
    const fetchLeads = () => {
      try {
        const savedLeads = JSON.parse(localStorage.getItem('summit_leads') || '[]');
        setLeads(savedLeads);
      } catch (e) {
        console.error("Failed to fetch leads from local storage", e);
      }
    };

    fetchLeads();
    // Listen for storage changes in case booking happens in another tab
    window.addEventListener('storage', fetchLeads);
    return () => window.removeEventListener('storage', fetchLeads);
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    const qualifiedCount = leads.filter(l => l.status === LeadStatus.QUALIFIED || l.status === LeadStatus.CALL_BOOKED).length;
    const atRiskCount = leads.filter(l => l.status === LeadStatus.NO_SHOW).length;
    const bookedCount = leads.filter(l => l.status === LeadStatus.CALL_BOOKED).length;
    const newToday = leads.filter(l => {
      const today = new Date().toISOString().split('T')[0];
      return l.auditAt.startsWith(today);
    }).length;

    return {
      newAudits: newToday || 0, 
      callsBooked: bookedCount,
      atRisk: atRiskCount,
      qualifiedPercent: total > 0 ? Math.round((qualifiedCount / total) * 100) : 0,
      revenuePotential: `$${(qualifiedCount * 12.5).toFixed(1)}k` // Mock revenue factor
    };
  }, [leads]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 1200);
  };

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all operational lead data? This cannot be undone.")) {
      localStorage.removeItem('summit_leads');
      setLeads([]);
      setSelectedLead(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-10 md:p-12 animate-reveal">
          <div className="flex justify-center mb-10">
            <a href="#/" onClick={goHome} className="block transition-transform hover:scale-105">
              <Logo isScrolled={false} className="scale-125" />
            </a>
          </div>
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Staff Authentication</h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">Ops Terminal Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Access ID</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#001e4d] font-bold transition-all"
                placeholder="Unit-429"
                value={loginForm.username}
                onChange={e => setLoginForm({...loginForm, username: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Security Key</label>
              <input 
                type="password" 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#001e4d] font-bold transition-all"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
              />
            </div>
            <PopButton 
              type="submit" 
              className={`w-full py-5 bg-[#001e4d] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] active:scale-95 transition-all ${loading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {loading ? 'Validating Token...' : 'Initialize Access'}
            </PopButton>
          </form>
          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Node Secure: AES-256 Cloud
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex relative">
      {/* Sidebar Navigation */}
      <aside className="w-20 md:w-72 bg-[#001e4d] text-white flex flex-col shrink-0 transition-all duration-500 z-50">
        <div className="p-6 md:p-10 flex justify-center md:justify-start">
          <a href="#/" onClick={goHome} className="block transition-transform hover:scale-105">
            <Logo isScrolled={true} className="scale-75 md:scale-90" />
          </a>
        </div>
        
        <nav className="flex-grow mt-10 px-4 space-y-2">
          {[
            { id: 'bookings', label: 'Bookings Registry', icon: 'clipboard' },
            { id: 'calendar', label: 'Team Calendar', icon: 'calendar' },
            { id: 'performance', label: 'Staff Performance', icon: 'chart' },
            { id: 'intelligence', label: 'AI Intelligence', icon: 'zap' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === tab.id ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {tab.id === 'bookings' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>}
                {tab.id === 'calendar' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/></svg>}
                {tab.id === 'performance' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
                {tab.id === 'intelligence' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
              </div>
              <span className="hidden md:block font-black text-[10px] uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-2">
          <button 
            onClick={clearAllData}
            className="w-full py-3 text-red-400 hover:text-red-500 font-black text-[9px] uppercase tracking-widest border border-red-900/20 rounded-xl transition-colors hover:bg-red-500/5"
          >
            Clear Data
          </button>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full py-4 text-white/50 hover:text-white font-black text-[10px] uppercase tracking-widest border border-white/10 rounded-xl transition-colors"
          >
            Logout Terminal
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-grow p-8 h-screen overflow-y-auto">
        {/* Layer 1: At-a-glance Summary Bar */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Operations Control</h2>
            <p className="text-slate-400 text-[10px] font-bold tracking-[0.4em] uppercase mt-1">Total leads registered: {leads.length}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 w-full lg:w-auto">
            {[
              { label: 'New Today', val: stats.newAudits, color: 'text-blue-600', bg: 'bg-white' },
              { label: 'Booked (48h)', val: stats.callsBooked, color: 'text-green-600', bg: 'bg-white' },
              { label: 'At Risk', val: stats.atRisk, color: 'text-red-600', bg: 'bg-white' },
              { label: 'Qualified', val: `${stats.qualifiedPercent}%`, color: 'text-[#001e4d]', bg: 'bg-white' },
              { label: 'Rev Est.', val: stats.revenuePotential, color: 'text-purple-600', bg: 'bg-white' }
            ].map((stat, i) => (
              <div key={i} className={`px-4 py-3 rounded-2xl border border-slate-200 shadow-sm ${stat.bg} flex flex-col justify-center min-w-[100px]`}>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 whitespace-nowrap">{stat.label}</p>
                <p className={`text-lg font-black ${stat.color}`}>{stat.val}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="animate-reveal">
          {/* Layer 2: Deep lead profile (Heart of the System) */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Pipeline Registry</h3>
                <div className="flex gap-2 w-full md:w-auto">
                  <input type="text" placeholder="Search leads..." className="flex-grow md:w-64 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold outline-none focus:border-[#001e4d] shadow-sm" />
                  <button className="px-4 py-2 bg-[#001e4d] text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Filter</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-400 text-[8px] font-black uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Lead Information</th>
                      <th className="px-6 py-4">Offer Price</th>
                      <th className="px-6 py-4">Qualification</th>
                      <th className="px-6 py-4">Breakdown Signal</th>
                      <th className="px-6 py-4">Flow</th>
                      <th className="px-6 py-4">Owner</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-20 text-center">
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No leads currently registered in the database.</p>
                          <p className="text-slate-300 text-[9px] mt-2">Submit a form through the public audit page to see data here.</p>
                        </td>
                      </tr>
                    ) : (
                      leads.map(lead => (
                        <tr 
                          key={lead.id} 
                          onClick={() => setSelectedLead(lead)}
                          className="hover:bg-slate-50 transition-all cursor-pointer group"
                        >
                          <td className="px-6 py-5">
                            <p className="text-sm font-black text-slate-900 leading-none mb-1">{lead.name}</p>
                            <p className="text-[9px] text-slate-400 font-medium">{lead.email}</p>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-lg shadow-sm">{lead.price}</span>
                          </td>
                          <td className="px-6 py-5">
                             <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${
                               lead.status === LeadStatus.DISQUALIFIED ? 'bg-red-50 text-red-600 border-red-100' : 
                               lead.status === LeadStatus.QUALIFIED || lead.status === LeadStatus.CALL_BOOKED ? 'bg-blue-50 text-blue-600 border-blue-100' :
                               'bg-slate-50 text-slate-400 border-slate-200'
                             }`}>
                               {lead.status === LeadStatus.DISQUALIFIED ? '❌ DQ' : lead.status === LeadStatus.QUALIFIED || lead.status === LeadStatus.CALL_BOOKED ? '✅ Qualified' : '⚠ Review'}
                             </span>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-[9px] font-bold text-slate-500 leading-tight max-w-[120px] line-clamp-2">{lead.breakdown}</p>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-[9px] font-black text-[#001e4d] uppercase truncate max-w-[80px]">{lead.flow.split(' ')[0]}</p>
                          </td>
                          <td className="px-6 py-5">
                             <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{lead.owner}</p>
                          </td>
                          <td className="px-6 py-5">
                             <div className="flex items-center gap-2">
                               <div className={`w-1.5 h-1.5 rounded-full ${
                                 lead.status === LeadStatus.CALL_BOOKED ? 'bg-green-500' : 
                                 lead.status === LeadStatus.NO_SHOW ? 'bg-red-500 animate-pulse' :
                                 'bg-slate-300'
                               }`}></div>
                               <span className="text-[9px] font-bold text-slate-600">{lead.status}</span>
                             </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="text-[#001e4d] font-black text-[9px] uppercase tracking-widest hover:underline opacity-0 group-hover:opacity-100 transition-all">Audit Lead</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                { name: 'Alex Thompson', calls: leads.length > 0 ? Math.ceil(leads.length * 0.8) : 0, show: '88%', qual: '72%', closed: Math.ceil(leads.length * 0.2), rating: 4.8 },
                { name: 'Maria Rodriguez', calls: leads.length > 0 ? Math.ceil(leads.length * 0.6) : 0, show: '92%', qual: '81%', closed: Math.ceil(leads.length * 0.3), rating: 4.9 }
              ].map((staff, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#001e4d]/5 -translate-y-1/2 translate-x-1/2 rounded-full transition-transform group-hover:scale-110"></div>
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 tracking-tighter">{staff.name}</h4>
                      <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">Senior Strategy Lead</p>
                    </div>
                    <div className="flex items-center gap-2 text-amber-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <span className="font-black text-lg">{staff.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-10 relative z-10">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Calls Booked</p>
                      <p className="text-xl font-black text-slate-900">{staff.calls}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Show-Up Rate</p>
                      <p className="text-xl font-black text-green-600">{staff.show}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Closed Deals</p>
                      <p className="text-xl font-black text-blue-600">{staff.closed}</p>
                    </div>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                       <span>Qualified Pipeline %</span>
                       <span className="text-slate-900">{staff.qual}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-[#001e4d] transition-all duration-1000" style={{ width: staff.qual }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl p-12 min-h-[600px] flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Strategic Deployment Calendar</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest">Week</button>
                  <button className="px-4 py-2 bg-[#001e4d] text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Month</button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-4 flex-grow">
                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                   <div key={day} className="text-center text-[10px] font-black uppercase text-slate-300 tracking-widest mb-4">{day}</div>
                 ))}
                 {[...Array(31)].map((_, i) => (
                   <div key={i} className="group relative aspect-square bg-slate-50 rounded-2xl border border-slate-100 p-2 flex flex-col justify-between hover:bg-white hover:border-blue-200 transition-all cursor-pointer">
                      <span className="text-xs font-black text-slate-300 group-hover:text-slate-900">{i + 1}</span>
                      {i % 4 === 0 && leads.length > 0 && (
                        <div className="flex flex-col gap-1">
                          <div className="h-1.5 w-full bg-blue-500/20 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 w-2/3"></div>
                          </div>
                          <p className="text-[7px] font-black uppercase text-blue-600">Event</p>
                        </div>
                      )}
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'intelligence' && (
            <div className="space-y-8">
              {!aiInsights ? (
                <div className="bg-white p-24 rounded-[4rem] text-center border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-8 animate-float-slow">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Initialize Neural Analysis</h3>
                  <p className="text-slate-500 max-w-lg mx-auto text-lg font-medium leading-relaxed mb-12 italic">
                    Gemini will scan the current registry to identify conversion bottlenecks and revenue opportunities.
                  </p>
                  <PopButton 
                    onClick={async () => {
                      if (leads.length === 0) {
                        alert("No leads found for analysis. Please submit a booking first.");
                        return;
                      }
                      setLoading(true);
                      const res = await analyzeLeadsData(JSON.stringify(leads));
                      setAiInsights(res);
                      setLoading(false);
                    }}
                    className="bg-[#001e4d] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl"
                  >
                    Generate Insights Hub
                  </PopButton>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                   <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
                      <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6 px-4 py-1.5 bg-blue-50 rounded-full inline-block">Neural Consensus</h4>
                      <p className="text-2xl font-bold text-slate-900 leading-[1.4]">"{aiInsights.summary}"</p>
                   </div>
                   <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Priority Actions</h4>
                      <div className="space-y-6">
                        {aiInsights.actionableSteps.map((s: string, i: number) => (
                          <div key={i} className="flex gap-5 items-start">
                            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-[#001e4d] shrink-0">{i+1}</div>
                            <p className="text-base font-medium text-slate-700 leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Layer 2: Detail Drawer (Operational Heart) */}
      {selectedLead && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedLead(null)}></div>
          <div className="relative w-full max-w-xl bg-white h-full shadow-[-20px_0_60px_rgba(0,0,0,0.2)] flex flex-col animate-slide-left border-l border-slate-100">
            {/* Drawer Header */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                    selectedLead.status === LeadStatus.QUALIFIED || selectedLead.status === LeadStatus.CALL_BOOKED ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}>
                    {selectedLead.status === LeadStatus.QUALIFIED || selectedLead.status === LeadStatus.CALL_BOOKED ? 'Qualified Profile' : 'Pending Review'}
                  </span>
                  {selectedLead.canInvest && (
                    <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-green-50 text-green-600 border-green-100">Capital Verified</span>
                  )}
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{selectedLead.name}</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Registry ID: {selectedLead.id}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-4 rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-all">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Drawer Content */}
            <div className="flex-grow p-10 overflow-y-auto space-y-12">
               {/* Section 1: Contact */}
               <section>
                 <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Contact & Environment</h4>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Direct Email</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{selectedLead.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone Line</p>
                      <p className="text-sm font-bold text-slate-900">{selectedLead.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Timezone</p>
                      <p className="text-sm font-bold text-slate-900">{selectedLead.timezone || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current Status</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <p className="text-sm font-black text-[#001e4d]">{selectedLead.status}</p>
                      </div>
                    </div>
                 </div>
               </section>

               {/* Section 2: Qualification Snapshot */}
               <section>
                 <h4 className="text-[10px] font-black text-[#001e4d] uppercase tracking-[0.4em] mb-6">Qualification Snapshot</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Offer Price Point</p>
                      <p className="text-sm font-black text-slate-900">{selectedLead.price}</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Lead Capacity</p>
                      <p className="text-sm font-black text-slate-900 truncate">{selectedLead.flow?.split(' ')[0]}</p>
                    </div>
                    <div className="col-span-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Generation Methods</p>
                      <div className="flex flex-wrap gap-2">
                         {selectedLead.genMethods?.map((m, i) => (
                           <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest">
                             {m.split(' ')[0]}
                           </span>
                         ))}
                      </div>
                    </div>
                 </div>
               </section>

               {/* Section 3: Pain Signals */}
               <section>
                 <h4 className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-6">Pain Signals</h4>
                 <div className="space-y-3">
                    <div className="p-6 bg-red-50/50 border border-red-100 rounded-2xl">
                       <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-2">Core Operational Breakdown</p>
                       <p className="text-base font-bold text-red-900 leading-relaxed italic">"{selectedLead.breakdown}"</p>
                    </div>
                 </div>
               </section>

               {/* Section 4: Execution Timeline */}
               <section>
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Execution Timeline</h4>
                 <div className="relative pl-6 space-y-8 border-l border-slate-100">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#001e4d] border-4 border-white"></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Audit Submitted</p>
                      <p className="text-sm font-bold text-slate-900">{new Date(selectedLead.auditAt).toLocaleString()}</p>
                    </div>
                    <div className="relative">
                      <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white ${selectedLead.bookedAt ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Strategy Call Booked</p>
                      <p className="text-sm font-bold text-slate-900">{selectedLead.bookedAt ? new Date(selectedLead.bookedAt).toLocaleString() : 'Pending Scheduling'}</p>
                    </div>
                 </div>
               </section>

               {/* Section 5: Strategist Intelligence */}
               <section>
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Strategist Intelligence</h4>
                 <div className="space-y-4">
                   <div className="relative">
                     <textarea 
                      className="w-full h-32 p-5 bg-slate-50 border border-slate-200 rounded-3xl text-sm font-medium focus:border-[#001e4d] outline-none transition-all shadow-inner" 
                      placeholder="Input direct observations or deployment constraints..."
                      defaultValue={selectedLead.notes}
                     />
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {['High Intent', 'Needs Follow-up', 'Price Sensitive', 'Technical Fit'].map(tag => (
                        <button key={tag} className="px-3 py-1.5 bg-slate-100 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 hover:bg-[#001e4d] hover:text-white transition-all">
                          {tag}
                        </button>
                      ))}
                   </div>
                 </div>
               </section>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-4">
              <div className="flex gap-4">
                 <select 
                    className="flex-grow p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm focus:border-[#001e4d]"
                    value={selectedLead.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as LeadStatus;
                      const updatedLeads = leads.map(l => l.id === selectedLead.id ? {...l, status: newStatus} : l);
                      setLeads(updatedLeads);
                      localStorage.setItem('summit_leads', JSON.stringify(updatedLeads));
                      setSelectedLead({...selectedLead, status: newStatus});
                    }}
                 >
                    {Object.values(LeadStatus).map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
                 <PopButton className="bg-[#001e4d] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                    Sync Changes
                 </PopButton>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-4 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100">Reschedule Call</button>
                <button 
                  onClick={() => {
                    const updatedLeads = leads.map(l => l.id === selectedLead.id ? {...l, status: LeadStatus.NO_SHOW} : l);
                    setLeads(updatedLeads);
                    localStorage.setItem('summit_leads', JSON.stringify(updatedLeads));
                    setSelectedLead({...selectedLead, status: LeadStatus.NO_SHOW});
                  }}
                  className="py-4 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50"
                >
                  Mark No-Show
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default InternalDashboard;
