import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ContactInquirySchema } from '../schemas/portfolioSchema';
import { Mail, Phone, Github, MapPin, Send, Check, Copy, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const [inquiryType, setInquiryType] = useState<'interview' | 'consulting' | 'general'>('interview');
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [sentMessage, setSentMessage] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod schema
    const validationResult = ContactInquirySchema.safeParse({
      inquiryType,
      senderName,
      senderOrg: senderOrg || undefined,
      customNote,
    });

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    setFormErrors({});

    const subject = encodeURIComponent(
      `[AI Engineer Opportunity] ${senderOrg ? `${senderOrg} - ` : ''}Inquiry for Mohammed Abdul Khaleel`
    );
    const body = encodeURIComponent(
      `Hi Khaleel,\n\nI reviewed your portfolio and engineering work on LangGraph, RAG pipelines, and conversational data platforms.\n\nInquiry Type: ${inquiryType}\nFrom: ${senderName} ${senderOrg ? `(${senderOrg})` : ''}\n\nNote:\n${customNote}\n\nBest regards,\n${senderName}`
    );

    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
    setSentMessage(true);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Let's Build Intelligent Systems
              </h2>
              <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
                Currently open to full-time AI Engineer, LLM Application Developer, 
                and Agentic Systems roles. Whether you have an open position or want to discuss 
                high-throughput RAG & LangGraph architectures, I would love to connect.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase">Email Direct</div>
                    <a 
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-zinc-200 hover:text-emerald-400 transition-colors font-semibold"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase">Phone / WhatsApp</div>
                    <a 
                      href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, '')}`}
                      className="text-zinc-200 hover:text-emerald-400 transition-colors font-semibold"
                    >
                      {PORTFOLIO_DATA.personal.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* GitHub */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px] uppercase">GitHub Repositories</div>
                    <a 
                      href={PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 hover:text-emerald-400 transition-colors font-semibold"
                    >
                      github.com/{PORTFOLIO_DATA.personal.githubUsername}
                    </a>
                  </div>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase">Base Location</div>
                  <div className="text-zinc-300 font-semibold">{PORTFOLIO_DATA.personal.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-Formatted Inquiry Drafter */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight font-mono">
                    Direct Opportunity Drafter
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Select your inquiry type to generate a structured message.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Fast Response Guaranteed
                </span>
              </div>

              <form onSubmit={handleSendDraft} className="space-y-4 text-xs font-mono">
                {/* Inquiry Type buttons */}
                <div>
                  <label className="block text-zinc-400 mb-2 uppercase tracking-wider text-[11px]">
                    Purpose of Message:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'interview', label: 'AI Engineer Hiring' },
                      { id: 'consulting', label: 'System Design / POC' },
                      { id: 'general', label: 'Technical Discussion' }
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setInquiryType(type.id as any)}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          inquiryType === type.id
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-semibold'
                            : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-zinc-400 uppercase tracking-wider text-[11px]">
                        Your Name / Role *
                      </label>
                      {formErrors.senderName && (
                        <span className="text-red-400 text-[10px] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.senderName}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => {
                        setSenderName(e.target.value);
                        if (formErrors.senderName) setFormErrors(prev => ({ ...prev, senderName: '' }));
                      }}
                      placeholder="e.g. Sarah Jenkins (Tech Lead)"
                      className={`w-full px-3.5 py-2.5 bg-zinc-950 border rounded-lg text-zinc-200 placeholder:text-zinc-600 focus:outline-none transition-colors ${
                        formErrors.senderName ? 'border-red-500' : 'border-zinc-800 focus:border-emerald-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[11px]">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={senderOrg}
                      onChange={(e) => setSenderOrg(e.target.value)}
                      placeholder="e.g. AI Startup / Enterprise Labs"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Message notes */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-zinc-400 uppercase tracking-wider text-[11px]">
                      Message / Opportunity Scope *
                    </label>
                    {formErrors.customNote && (
                      <span className="text-red-400 text-[10px] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.customNote}
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={customNote}
                    onChange={(e) => {
                      setCustomNote(e.target.value);
                      if (formErrors.customNote) setFormErrors(prev => ({ ...prev, customNote: '' }));
                    }}
                    placeholder="Provide a quick note on the role, team stack, or project requirements (min 10 characters)..."
                    className={`w-full px-3.5 py-2.5 bg-zinc-950 border rounded-lg text-zinc-200 placeholder:text-zinc-600 focus:outline-none transition-colors resize-none leading-relaxed ${
                      formErrors.customNote ? 'border-red-500' : 'border-zinc-800 focus:border-emerald-500'
                    }`}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message via Email Client</span>
                  </button>
                  {sentMessage && (
                    <p className="text-center text-emerald-400 mt-2 text-[11px]">
                      Draft opened in your email client! You can also email directly to makhaleelma@gmail.com
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
