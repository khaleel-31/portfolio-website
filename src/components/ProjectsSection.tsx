import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { 
  Github, 
  ExternalLink, 
  ChevronRight, 
  Layers, 
  Terminal, 
  Database, 
  Network, 
  ShieldCheck, 
  Workflow, 
  Code2,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('datahek-oss');
  const [expandedPipelines, setExpandedPipelines] = useState<Record<string, boolean>>({
    'datahek-oss': true,
    'rag-interview-agent': false,
    'genai-mongodb-query-bot': false
  });

  const togglePipeline = (id: string) => {
    setExpandedPipelines(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="projects" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <Cpu className="w-4 h-4" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Technical Projects & Systems
          </h2>
          <p className="mt-3 text-zinc-400 text-base sm:text-lg">
            Production-oriented architectures spanning multi-agent state machines, 
            enterprise RAG knowledge graphs, deterministic query guardrails, and cloud services.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-12">
          {PORTFOLIO_DATA.projects.map((project, index) => {
            const isPipelineExpanded = expandedPipelines[project.id];

            return (
              <div 
                key={project.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 transition-all overflow-hidden shadow-xl"
              >
                {/* Project Header Bar */}
                <div className="p-6 sm:p-8 border-b border-zinc-800/80 bg-zinc-900/40">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      {/* Quiet metadata line (No pills rule) */}
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                        <span className="text-emerald-400">PROJECT {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                        {project.githubUrl && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-zinc-300">Open Source</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-400 mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* External links */}
                    <div className="flex items-center gap-3 self-start lg:self-center">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono border border-zinc-700 transition-colors"
                        >
                          <Github className="w-4 h-4 text-emerald-400" />
                          <span>View on GitHub</span>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-zinc-400">
                          Production System
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tech stack line - clean typography with separators */}
                  <div className="mt-5 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-zinc-300">
                    <span className="text-zinc-400 uppercase tracking-wider font-semibold mr-1">Stack:</span>
                    {project.technologies.map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="text-emerald-300/90 hover:text-emerald-200 transition-colors">
                          {tech}
                        </span>
                        {i < project.technologies.length - 1 && (
                          <span className="text-zinc-600">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Summary */}
                  <p className="text-base text-zinc-300 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Engineering Contributions & Highlights */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      Key Engineering Contributions
                    </h4>
                    <ul className="space-y-2.5">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture Diagram Ribbon */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                        <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                        System Flow Pipeline
                      </div>
                      <button
                        onClick={() => togglePipeline(project.id)}
                        className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                      >
                        {isPipelineExpanded ? 'Hide Steps' : 'Inspect Pipeline Breakdown'}
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isPipelineExpanded ? 'rotate-90' : ''}`} />
                      </button>
                    </div>

                    <div className="font-mono text-xs text-zinc-400 bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 overflow-x-auto leading-relaxed">
                      <span className="text-cyan-400">flow:</span> {project.architectureOverview}
                    </div>

                    {/* Expandable Step-by-Step Pipeline breakdown */}
                    {isPipelineExpanded && project.pipelineSteps && (
                      <div className="mt-4 pt-4 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {project.pipelineSteps.map((step) => (
                          <div 
                            key={step.step}
                            className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between font-mono">
                              <span className="text-emerald-400 font-bold">STAGE {step.step}</span>
                            </div>
                            <div className="font-semibold text-zinc-200">{step.title}</div>
                            <p className="text-zinc-400 text-[11px] leading-snug">{step.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
