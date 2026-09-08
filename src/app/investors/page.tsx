'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  FileSearch,
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Lock,
  Layers,
  Flame,
  BadgePercent,
  Briefcase,
  ChevronRight
} from 'lucide-react';

export default function InvestorsPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    phone: '',
    email: '',
    preferred_deal_type: 'Wholesale',
    target_zip_codes: '',
    capital_readiness: 'Cash / Private Capital Ready'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dealTypes = [
    { id: 'Wholesale', label: 'Wholesale / Quick Assignment', desc: 'Deeply discounted contracts ready for immediate closing' },
    { id: 'Fix & Flip', label: 'Fix & Flip / Value-Add', desc: 'Cosmetic to full rehabs with healthy ARV spreads' },
    { id: 'Buy & Hold', label: 'Buy & Hold / Rental Portfolios', desc: 'Strong cap-rate single & multifamily cash flow assets' }
  ];

  const popularZips = ['89101 (Downtown)', '89109 (Strip Corridor)', '89117 (West LV)', '89123 (South LV)', '89138 (Summerlin)', '89052 (Henderson)', '89031 (North LV)'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectDealType = (type: string) => {
    setFormData({ ...formData, preferred_deal_type: type });
  };

  const handleAddZip = (zipStr: string) => {
    const zipCode = zipStr.split(' ')[0];
    const currentZips = formData.target_zip_codes ? formData.target_zip_codes.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (!currentZips.includes(zipCode)) {
      const updated = [...currentZips, zipCode].join(', ');
      setFormData({ ...formData, target_zip_codes: updated });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          preferred_deal_type: formData.preferred_deal_type,
          target_zip_codes: formData.target_zip_codes,
          primary_goal: `${formData.preferred_deal_type} | ${formData.capital_readiness}`,
          lead_type: 'investor'
        })
      });

      const resData = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(resData.error || 'Something went wrong. Please check your submission and try again.');
      }
    } catch {
      setErrorMsg('Network error. Please call our investor relations desk directly at (725) 273-9245.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 1. HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-2 rounded-xl font-black text-lg tracking-wider shadow-md group-hover:scale-105 transition-transform">
                PLG
              </div>
              <div>
                <span className="font-extrabold text-white text-base md:text-lg block leading-tight tracking-tight">
                  Property Lifeline Group
                </span>
                <span className="text-[11px] text-emerald-400 tracking-wider uppercase font-semibold flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Investor Capital Desk
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-800 text-sm font-medium text-slate-400">
              <Link href="/" className="px-3 py-1.5 rounded-lg hover:text-slate-200 hover:bg-slate-800/60 transition">
                Homeowners Portal
              </Link>
              <span className="px-3 py-1.5 rounded-lg text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                Off-Market Buyers
              </span>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <a 
              href="tel:7252739245" 
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl font-semibold transition shadow-sm text-xs sm:text-sm"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Investor Hotline:</span>
              <span className="text-white font-bold">(725) 273-9245</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION + DUAL COLUMN INTAKE FORM */}
      <section className="relative overflow-hidden pt-10 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-7 pt-2">
            
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-transparent border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
              <Flame className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Direct Inbound Homeowner Inventory &bull; Clark County, NV</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Get Direct Access to <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Verified Off-Market Deals
                </span> <br />
                in Las Vegas
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Stop bidding against hundreds of retail buyers on the MLS or sifting through daisy-chained wholesaler lists. We source motivated sellers directly through proprietary distress signals, back-tax filings, and pre-foreclosure records across the Vegas Valley.
              </p>
            </div>

            {/* Live Pipeline Metric Chips */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-white">$42K+</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Avg. Equity Spread</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">0% Daisy Chain</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Direct-to-Seller</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-blue-400">7–14 Day</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Target Escrow Velocity</div>
              </div>
            </div>

            {/* Feature Checkpoints */}
            <div className="space-y-2.5 pt-2 text-sm text-slate-300">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Instant Deal Notifications:</strong> Filtered strictly to your target zip codes &amp; ROI criteria.</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Clean Title &amp; Liens Verified:</strong> Complete mortgage balance and Clark County tax status provided upfront.</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Proof of Direct Seller Contact:</strong> Fully executed contracts ready for assignment or direct closing.</span>
              </div>
            </div>

            {/* Testimonial / Social Proof Snippet */}
            <div className="p-4 bg-slate-900/60 border-l-2 border-emerald-500 rounded-r-xl text-xs text-slate-400 space-y-1">
              <p className="italic text-slate-300">
                &ldquo;Property Lifeline Group consistently provides authentic off-market properties in Henderson and Spring Valley with realistic ARV numbers and true seller motivation.&rdquo;
              </p>
              <div className="font-semibold text-slate-400 not-italic">
                &mdash; Principal Acquirer, Vegas Valley Capital Partners
              </div>
            </div>

          </div>

          {/* Right Column: Investor VIP Intake Form */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative">
              
              <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <BadgePercent className="w-3.5 h-3.5" />
                <span>VIP Buyer Criteria Registration</span>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-white">Buy-Box Profile Created</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Thank you, <span className="font-semibold text-emerald-400">{formData.full_name}</span>. Your criteria for <span className="text-white font-medium">{formData.preferred_deal_type}</span> deals in <span className="text-white font-medium">{formData.target_zip_codes || 'Las Vegas Valley'}</span> has been added to our priority dispatch queue.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-800/70 rounded-xl border border-slate-700/60 text-xs text-slate-300 text-left space-y-1.5">
                    <div className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">Next Steps:</div>
                    <div>1. An acquisitions manager will verify your closing parameters.</div>
                    <div>2. Off-market leads matching your target zip codes will be pushed directly to <strong>{formData.email}</strong>.</div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        full_name: '',
                        company: '',
                        phone: '',
                        email: '',
                        preferred_deal_type: 'Wholesale',
                        target_zip_codes: '',
                        capital_readiness: 'Cash / Private Capital Ready'
                      });
                    }}
                    className="text-xs text-slate-400 hover:text-white font-medium underline transition"
                  >
                    Submit additional buying entity &rarr;
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 pt-1">
                    <h2 className="text-xl font-black text-white tracking-tight">Lock In Your Buy Box</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Direct contract assignments &bull; No broker spam &bull; First-look priority
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-4 p-3 bg-red-950/60 border border-red-500/50 text-red-300 text-xs rounded-xl flex items-start space-x-2">
                      <span className="font-bold">&bull;</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Full Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input 
                            type="text" 
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Alex Morgan" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-white placeholder-slate-500 text-sm transition"
                            required 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Company / Entity
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input 
                            type="text" 
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Apex Capital Holdings LLC" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-white placeholder-slate-500 text-sm transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Direct Phone *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(725) 555-0199" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-white placeholder-slate-500 text-sm transition"
                            required 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          Work Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="alex@apexcapital.com" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-white placeholder-slate-500 text-sm transition"
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preferred Deal Type Selection */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Preferred Deal Type
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {dealTypes.map((deal) => {
                          const isSelected = formData.preferred_deal_type === deal.id;
                          return (
                            <button
                              key={deal.id}
                              type="button"
                              onClick={() => handleSelectDealType(deal.id)}
                              className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold transition flex flex-col justify-between ${
                                isSelected 
                                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-sm' 
                                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                              }`}
                            >
                              <span className="block font-bold">{deal.id}</span>
                              <span className="text-[10px] font-normal text-slate-400 line-clamp-1 mt-0.5">{deal.label.split('/')[1] || deal.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Target Zip Codes */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                          Target Zip Codes / Submarkets
                        </label>
                        <span className="text-[10px] text-slate-500">Click to add</span>
                      </div>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input 
                          type="text" 
                          name="target_zip_codes"
                          value={formData.target_zip_codes}
                          onChange={handleChange}
                          placeholder="e.g., 89101, 89117, 89123, Henderson" 
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-white placeholder-slate-500 text-sm transition"
                        />
                      </div>

                      {/* Quick Zip Suggestion Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {popularZips.map((zip) => (
                          <button
                            key={zip}
                            type="button"
                            onClick={() => handleAddZip(zip)}
                            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded-md border border-slate-700/70 transition flex items-center gap-1"
                          >
                            <span>+</span>
                            <span>{zip}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-emerald-950/50 transition flex items-center justify-center space-x-2 text-sm mt-3 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Registering Criteria...</span>
                        </>
                      ) : (
                        <>
                          <span>Access Off-Market Deal Pipeline</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center space-x-1.5 text-slate-400 text-[11px] pt-1">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>Zero spam. Leads sent exclusively based on your buy box.</span>
                    </div>

                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* 3. VALUE PROPOSITION CARDS (Direct-from-homeowner, Verified Equity, Back-Tax & Pre-Foreclosure) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5" />
            <span>Why Property Lifeline Leads Win</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Institutional-Grade Data. Direct Seller Access.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every lead delivered to our investor network is sourced through proprietary off-market funnels and vetted with Clark County public records before dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Direct-from-homeowner */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-7 shadow-xl hover:shadow-2xl transition duration-300 relative group">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Briefcase className="w-7 h-7" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                1. Direct-From-Homeowner
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Work directly with authentic motivated sellers looking for rapid cash resolutions. Bypass crowded open houses, bidding wars, and multi-layered broker markups.
              </p>
              
              <ul className="pt-3 space-y-2 text-xs text-slate-400 border-t border-slate-800/80">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>No daisy chains or re-assignment confusion</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Direct homeowner motivation and timeline confirmed</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Clear assignable contracts ready for escrow</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Verified Equity */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/80 border border-blue-500/30 rounded-2xl p-7 shadow-xl hover:shadow-2xl transition duration-300 relative group">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
              High Accuracy
            </div>

            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-7 h-7" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                2. Verified Equity &amp; Title
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Accurate equity spreads calculated against confirmed 1st and 2nd lien balances, HOA judgments, and realistic local neighborhood comps across Clark County.
              </p>

              <ul className="pt-3 space-y-2 text-xs text-slate-400 border-t border-slate-800/80">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>Senior &amp; junior mortgage balance audits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>Pre-screened against title defects &amp; probate liens</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>Realistic As-Is and ARV spread calculations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Back-Tax & Pre-Foreclosure Records */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-7 shadow-xl hover:shadow-2xl transition duration-300 relative group">
            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <FileSearch className="w-7 h-7" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                3. Back-Tax &amp; Pre-Foreclosure
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Live monitoring of Notice of Default (NOD) and Notice of Trustee Sale (NTS) filings, combined with delinquent Clark County property tax rolls to catch deals early.
              </p>

              <ul className="pt-3 space-y-2 text-xs text-slate-400 border-t border-slate-800/80">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Early-stage auction date timeline tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Clark County Assessor &amp; Recorder daily sync</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Sellers actively requesting cash buyout options</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. DEAL EXECUTION MATRIX / HOW IT WORKS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Deal Flow Velocity</div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">How Deals Reach Your Desk</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Our automated match engine pairs vetted motivated homeowner requests with registered buyers based on zip code, strategy, and capital readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative">
              <div className="text-emerald-400 font-black text-2xl">01</div>
              <h4 className="font-bold text-white text-base">Inbound Sourcing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Homeowners in mortgage distress or tax delinquency reach out to Property Lifeline Group seeking cash equity solutions.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative">
              <div className="text-blue-400 font-black text-2xl">02</div>
              <h4 className="font-bold text-white text-base">Verification &amp; Comps</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our acquisitions team audits debt obligations, estimates repair requirements, and establishes conservative after-repair values.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative">
              <div className="text-indigo-400 font-black text-2xl">03</div>
              <h4 className="font-bold text-white text-base">VIP Match Alert</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registered cash buyers whose buy box matches the deal criteria receive the deal package with inspection notes and lockbox access.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative">
              <div className="text-teal-400 font-black text-2xl">04</div>
              <h4 className="font-bold text-white text-base">7–14 Day Close</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Local title company handles escrow, wiring, and clean transfer with zero broker delays or retail financing contingencies.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INVESTOR FAQ & TRUST ACCORDION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Frequently Asked Investor Questions</h2>
          <p className="text-slate-400 text-sm">Clear answers for professional buyers and capital allocators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 space-y-2">
            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Are these direct contracts or daisy chains?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              All leads originate from our direct homeowner marketing and distress research. We do not re-blast other wholesalers&apos; deals or market properties without direct seller authorization.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 space-y-2">
            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              What title companies do you close through?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We work with top-tier investor-friendly title companies in Clark County, NV (e.g., First American Title, Stewart Title, and Nevada Title) ensuring expedited escrows.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 space-y-2">
            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              How quickly do I need to inspect and fund?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Because of imminent foreclosure or tax deadlines, most off-market contracts require proof of funds or hard money pre-approval and a 5-10 business day escrow timeline.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 space-y-2">
            <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              Is there any cost to register as a cash buyer?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              No. Registering your buy box with Property Lifeline Group is 100% free. You only pay the agreed contract price upon successful assignment or escrow closing.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM ACTION BANNER */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border-t border-slate-800 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Expand Your Las Vegas Real Estate Portfolio?
          </h3>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Speak directly with our acquisitions director to discuss custom buy-box criteria, bulk portfolio acquisitions, or creative financing structures.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a 
              href="tel:7252739245" 
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Acquisitions Desk: (725) 273-9245</span>
            </a>
            <Link 
              href="/" 
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-semibold py-3 px-6 rounded-xl transition flex items-center justify-center space-x-2 text-sm"
            >
              <span>Switch to Homeowner Portal</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-center space-y-3">
        <div className="flex items-center justify-center space-x-4 text-xs">
          <Link href="/" className="hover:text-slate-200 transition">Homeowners</Link>
          <span>&bull;</span>
          <Link href="/investors" className="text-emerald-400 font-semibold">Investors &amp; Cash Buyers</Link>
          <span>&bull;</span>
          <a href="tel:7252739245" className="hover:text-slate-200 transition">Contact: (725) 273-9245</a>
        </div>
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Property Lifeline Group &bull; Las Vegas, NV. All rights reserved. Confidential off-market real estate acquisition network.
        </p>
      </footer>

    </div>
  );
}
