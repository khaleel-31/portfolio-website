import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Search, CheckCircle, Terminal, Layers } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = PORTFOLIO_DATA.skillsData.filter((cat) => {
    if (selectedCategory !== 'all' && cat.slug !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const hasCatName = cat.name.toLowerCase().includes(q);
      const hasSkill = cat.skills.some(s => s.toLowerCase().includes(q));
      return hasCatName || hasSkill;
    }
    return true;
  });

  return (
    <section id="skills" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <Cpu className="w-4 h-4" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Engineering Arsenal
          </h2>
          <p className="mt-3 text-zinc-400 text-base">
            Systematic competency matrix across agentic orchestration, semantic search, 
            machine learning, high-performance backends, and MLOps tooling.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800/80">
          {/* Category Tabs (functional segmented buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Skills
            </button>
            {PORTFOLIO_DATA.skillsData.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-500 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. LangGraph)..."
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const visibleSkills = searchQuery.trim()
              ? cat.skills.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
              : cat.skills;

            if (visibleSkills.length === 0) return null;

            return (
              <div
                key={cat.slug}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800/80">
                    <h3 className="font-semibold text-sm text-zinc-200 tracking-tight font-mono">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {visibleSkills.length} tools
                    </span>
                  </div>

                  {/* Anti-Slop Zero Pill: Render skills with clean typographic separators and crisp layout */}
                  <div className="space-y-2">
                    {visibleSkills.map((skill) => (
                      <div 
                        key={skill}
                        className="flex items-center justify-between text-xs font-mono text-zinc-300 py-1 hover:text-emerald-300 transition-colors group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {skill}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-mono">
                          verified
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Domain Category</span>
                  <span className="text-emerald-400/80">Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
