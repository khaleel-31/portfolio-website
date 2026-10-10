import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Terminal, 
  FileText, 
  Github, 
  Mail, 
  Menu, 
  X, 
  Layers, 
  Cpu, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Agent Sandbox', href: '#architecture' },
    { name: 'Technical Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#" 
          className="flex items-center gap-3 group text-zinc-100 hover:text-white transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono font-semibold text-emerald-400 group-hover:border-emerald-500/50 group-hover:bg-zinc-800 transition-all shadow-inner">
            <span className="text-sm">AK</span>
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight flex items-center gap-2">
              <span>Mohammed Abdul Khaleel</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI Engineer
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono tracking-wide hidden sm:block">
              LLMs · LangGraph · RAG · FastAgent
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-zinc-100 transition-colors py-1 hover:border-b hover:border-emerald-500/50"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg border border-transparent hover:border-zinc-800 transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 rounded-lg transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all font-sans font-semibold shadow-sm shadow-emerald-500/20"
          >
            <span>Let's Talk</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1 text-xs text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-md sm:hidden"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg border border-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 border-b border-zinc-800 px-4 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-emerald-400 py-1.5 border-b border-zinc-900"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 flex items-center gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                View Full Resume
              </button>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-300 bg-zinc-900 border border-zinc-700 rounded-lg"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
