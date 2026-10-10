import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Printer, Copy, Check, Download, ExternalLink, Mail, Phone, Github } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
MOHAMMED ABDUL KHALEEL
AI Engineer | LLM Applications | RAG & Agentic Systems
+91 7995737203 | makhaleelma@gmail.com | https://github.com/khaleel-31

PROFESSIONAL SUMMARY
${PORTFOLIO_DATA.personal.summary}

TECHNICAL SKILLS
${PORTFOLIO_DATA.skillsData.map(s => `${s.name}: ${s.skills.join(', ')}`).join('\n')}

TECHNICAL PROJECTS
${PORTFOLIO_DATA.projects.map(p => `
${p.title}
Technologies: ${p.technologies.join(', ')}
${p.highlights.map(h => `• ${h}`).join('\n')}
`).join('\n')}

EDUCATION
${PORTFOLIO_DATA.education.map(e => `${e.degree}\n${e.institution} | ${e.duration}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider">
              Curriculum Vitae / Resume Viewer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors"
              title="Copy plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-semibold transition-colors"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto font-sans bg-zinc-950 text-zinc-200 print:text-black print:bg-white text-xs sm:text-sm leading-relaxed space-y-6">
          {/* Header */}
          <div className="text-center pb-6 border-b border-zinc-800 print:border-zinc-300">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white print:text-black uppercase">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-emerald-400 print:text-emerald-700 font-mono mt-1">
              {PORTFOLIO_DATA.personal.role} | {PORTFOLIO_DATA.personal.specialization}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-400 print:text-zinc-600 font-mono mt-3">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {PORTFOLIO_DATA.personal.phone}
              </span>
              <span aria-hidden="true">|</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {PORTFOLIO_DATA.personal.email}
              </span>
              <span aria-hidden="true">|</span>
              <a 
                href={PORTFOLIO_DATA.personal.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-emerald-400 hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                github.com/khaleel-31
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-zinc-900 border-b border-zinc-800 print:border-zinc-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-zinc-300 print:text-zinc-800 text-xs sm:text-sm leading-relaxed">
              {PORTFOLIO_DATA.personal.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-zinc-900 border-b border-zinc-800 print:border-zinc-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs">
              {PORTFOLIO_DATA.skillsData.map((cat) => (
                <div key={cat.name} className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <span className="font-semibold text-zinc-200 print:text-black sm:w-48 shrink-0">
                    {cat.name}:
                  </span>
                  <span className="text-zinc-400 print:text-zinc-700">
                    {cat.skills.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-zinc-900 border-b border-zinc-800 print:border-zinc-300 pb-1 mb-3">
              Technical Projects
            </h2>
            <div className="space-y-5">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-bold text-sm text-white print:text-black">
                      {proj.title}
                    </h3>
                    {proj.githubUrl && (
                      <a 
                        href={proj.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-emerald-400 hover:underline font-mono"
                      >
                        {proj.githubUrl}
                      </a>
                    )}
                  </div>
                  <div className="text-xs text-emerald-300/80 print:text-emerald-800 font-mono">
                    Technologies: {proj.technologies.join(', ')}
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-zinc-300 print:text-zinc-800">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-zinc-900 border-b border-zinc-800 print:border-zinc-300 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.education.map((edu, eIdx) => (
                <div key={eIdx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-zinc-100 print:text-black">{edu.degree}</div>
                    <div className="text-zinc-400 print:text-zinc-600">{edu.institution}</div>
                  </div>
                  <div className="text-zinc-400 print:text-zinc-600 font-mono sm:text-right mt-1 sm:mt-0">
                    {edu.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
