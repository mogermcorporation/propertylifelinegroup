'use client';

import React, { useState } from 'react';
import { Phone, Shield, CheckCircle, Lock, ArrowRight, HeartHandshake, Home, FileText, Loader2 } from 'lucide-react';

export default function Page() {
  const [formData, setFormData] = useState({
    full_name: '',
    property_address: '',
    phone: '',
    email: '',
    primary_goal: 'I want to explore staying in my home'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(resData.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try calling us directly at (725) 273-9245.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HEADER BAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-900 text-white p-2 rounded-lg font-bold text-xl tracking-wider">
              PLG
            </div>
            <div>
              <span className="font-bold text-slate-900 text-lg block leading-tight">Property Lifeline</span>
              <span className="text-xs text-slate-500 tracking-wide uppercase font-semibold">Group</span>
            </div>
          </div>
          <a 
            href="tel:7252739245" 
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-semibold transition shadow-sm text-sm md:text-base"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>(725) 273-9245</span>
          </a>
        </div>
      </header>

      {/* 2. HERO BANNER + INTAKE FORM */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Headline Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-800/60 border border-blue-500/30 px-3 py-1 rounded-full text-blue-200 text-xs md:text-sm font-medium">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>100% Confidential &amp; Judgment-Free Guidance</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
              Facing Mortgage Stress or Back Taxes? <span className="text-blue-400">You Have Options.</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
              Life throws curveballs. We help local homeowners navigate housing friction—whether that means restructuring to stay in your home or cashing out equity for a clean fresh start.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs md:text-sm text-slate-300">
              <span className="flex items-center space-x-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> <span>No Retail Commissions</span></span>
              <span className="flex items-center space-x-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> <span>Zero Out-of-Pocket Fees</span></span>
            </div>
          </div>

          {/* Lead Form Box */}
          <div className="lg:col-span-5 bg-white text-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-100">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Request Received</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Thank you, {formData.full_name.split(' ')[0] || 'there'}. An advisor from Property Lifeline Group will reach out discretely to review your options.
                </p>
                <div className="pt-2">
                  <a href="tel:7252739245" className="text-xs text-blue-900 font-bold hover:underline block">
                    Need immediate assistance? Call (725) 273-9245 →
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Explore Your Housing Options</h2>
                  <p className="text-xs text-slate-500 mt-1">Free equity assessment. No obligation to act.</p>
                </div>

                {errorMsg && (
                  <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {errorMsg}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 placeholder-slate-400 text-sm"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Property Address</label>
                    <input 
                      type="text" 
                      name="property_address"
                      value={formData.property_address}
                      onChange={handleChange}
                      placeholder="123 Main St, Las Vegas, NV" 
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 placeholder-slate-400 text-sm"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Direct Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(725) 000-0000" 
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 placeholder-slate-400 text-sm"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Best Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com" 
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800 placeholder-slate-400 text-sm"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">What is your primary goal?</label>
                    <select 
                      name="primary_goal"
                      value={formData.primary_goal}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-700 text-sm bg-white"
                    >
                      <option value="I want to explore staying in my home">I want to explore staying in my home</option>
                      <option value="I want to see how much cash equity I can walk with">I want to see how much cash equity I can walk with</option>
                      <option value="I just need guidance on my options &amp; timeline">I just need guidance on my options &amp; timeline</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-sm mt-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Get My Confidential Options Report</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs pt-1">
                    <Lock className="w-3 h-3" />
                    <span>Your privacy is 100% protected. Never shared.</span>
                  </div>
                </form>
              </>
            )}
          </div>

        </div>
      </section>

      {/* 3. DIGNITY & PHILOSOPHY BANNER */}
      <section className="bg-slate-100 border-y border-slate-200 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <HeartHandshake className="w-8 h-8 text-blue-900 mx-auto" />
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">A Hardship Is A Circumstance, Not A Character Flaw.</h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Medical costs, job transitions, rising insurance, or unexpected rate spikes hit millions of good families every year. We don&apos;t do pressure tactics or predatory sales. We deliver clarity, choices, and respect.
          </p>
        </div>
      </section>

      {/* 4. THE 3-OPTION FRAMEWORK */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">The 3-Option Lifeline Advantage</h2>
          <p className="text-slate-600 text-sm md:text-base">We don&apos;t force a one-size-fits-all sale. We lay out all three paths so you decide what fits your family.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Option 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">1. Restructure &amp; Stay</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              If your main goal is keeping your home, we provide guidance on lender loan modifications, forbearance, and workout options to stabilize your payments.
            </p>
          </div>

          {/* Option 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">2. Strategic Listing</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              If you have adequate time and built-up equity, we connect you with preferred local agents to market the home on the open market for full retail price.
            </p>
          </div>

          {/* Option 3 */}
          <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md transition space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
              Most Direct
            </div>
            <div className="w-12 h-12 bg-blue-900 text-white rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">3. Clean Equity Exit</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              An as-is direct buyout. No repairs, no open houses, and no closing fees. Close on your exact schedule (7–14 days) and walk away with your equity intact.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-slate-900 text-white py-10 px-4 border-t border-slate-800 text-center space-y-4">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Property Lifeline Group. All rights reserved. Confidentiality guaranteed.
        </p>
      </footer>

    </div>
  );
}
