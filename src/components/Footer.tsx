import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Github, Mail, Phone, FileText, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-xs font-mono text-zinc-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-semibold text-emerald-400">
              AK
            </div>
            <div>
              <div className="font-semibold text-zinc-300">
                {PORTFOLIO_DATA.personal.name}
              </div>
              <div className="text-[11px] text-zinc-500">
                {PORTFOLIO_DATA.personal.specialization}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="hover:text-zinc-300 transition-colors"
            >
              Email
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-zinc-300 transition-colors"
            >
              Resume
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span>Tech Stack:</span>
            <span className="text-emerald-400">Next.js Architecture</span>
            <span className="text-zinc-700">·</span>
            <span className="text-cyan-400">Zod Schema Validation</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-300">Tailwind CSS</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-400">Seamless Vercel Deployment</span>
          </div>
          <div className="text-zinc-600">
            © {new Date().getFullYear()} Mohammed Abdul Khaleel. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
