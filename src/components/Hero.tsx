import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  ArrowRight, 
  Terminal, 
  Copy, 
  Check, 
  FileText, 
  Sparkles, 
  GitBranch, 
  Database, 
  ShieldCheck, 
  Workflow,
  ExternalLink
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  onExploreSandbox: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onExploreSandbox }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-zinc-950">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Elevator Pitch Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-emerald-400 font-medium">AVAILABLE FOR WORK</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">Hyderabad / Remote</span>
            </div>

            {/* Name and Titles */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Mohammed Abdul <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Khaleel
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-300 font-mono flex flex-wrap items-center gap-2">
                <span>AI Engineer</span>
                <span className="text-zinc-600">·</span>
                <span className="text-emerald-400">LLM Applications</span>
                <span className="text-zinc-600">·</span>
                <span>RAG & Agentic Systems</span>
              </p>
            </div>

            {/* Summary description */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl">
              Specialized in engineering production-grade, stateful AI workflows with{' '}
              <strong className="text-zinc-200 font-semibold">LangGraph</strong>, schema-aware{' '}
              <strong className="text-zinc-200 font-semibold">NL-to-Query systems</strong>, and high-precision{' '}
              <strong className="text-zinc-200 font-semibold">RAG architectures</strong> backed by Neo4j knowledge graphs,
              vector databases, deterministic guardrails, and resilient FastAPI backends.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.98]"
              >
                <span>Explore Technical Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onExploreSandbox}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 hover:border-zinc-600 text-sm font-medium transition-all active:scale-[0.98]"
              >
                <Workflow className="w-4 h-4 text-emerald-400" />
                <span>Test Agent Sandbox</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 text-sm font-mono transition-all"
                title="Copy Email"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-400" />
                    <span>makhaleelma@gmail.com</span>
                  </>
                )}
              </button>
            </div>

            {/* Architectural Highlights / Pillars */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Multi-Agent</div>
                <div className="text-sm font-semibold text-zinc-200 mt-0.5">LangGraph State</div>
              </div>
              <div>
                <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Knowledge Graphs</div>
                <div className="text-sm font-semibold text-zinc-200 mt-0.5">Neo4j Ontologies</div>
              </div>
              <div>
                <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Query Guardrails</div>
                <div className="text-sm font-semibold text-zinc-200 mt-0.5">Deterministic AST</div>
              </div>
              <div>
                <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Observability</div>
                <div className="text-sm font-semibold text-zinc-200 mt-0.5">LangSmith Tracing</div>
              </div>
            </div>
          </div>

          {/* Code / Architecture Interactive Preview Card Column */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-2xl shadow-black/80 overflow-hidden font-mono text-xs">
              {/* Window Title Bar */}
              <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-zinc-400 text-[11px]">agent_graph_workflow.py</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  LangGraph Checkpointer: ACTIVE
                </span>
              </div>

              {/* Code simulation */}
              <div className="p-4 space-y-2 text-zinc-300 overflow-x-auto leading-relaxed">
                <p className="text-zinc-400"># Stateful Adaptive RAG & Query Pipeline</p>
                <p>
                  <span className="text-purple-400">from</span> langgraph.graph <span className="text-purple-400">import</span> StateGraph, END
                </p>
                <p>
                  <span className="text-purple-400">from</span> langchain_community.vectorstores <span className="text-purple-400">import</span> Chroma
                </p>
                <p>
                  <span className="text-purple-400">from</span> groq <span className="text-purple-400">import</span> Groq
                </p>
                <div className="my-2 border-t border-zinc-800/80" />
                <p>
                  workflow = <span className="text-blue-400">StateGraph</span>(InterviewState)
                </p>
                <p className="pl-2">
                  workflow.<span className="text-emerald-400">add_node</span>(<span className="text-amber-300">"researcher"</span>, retrieve_chroma_context)
                </p>
                <p className="pl-2">
                  workflow.<span className="text-emerald-400">add_node</span>(<span className="text-amber-300">"interviewer"</span>, synthesize_adaptive_question)
                </p>
                <p className="pl-2">
                  workflow.<span className="text-emerald-400">add_node</span>(<span className="text-amber-300">"evaluator"</span>, evaluate_and_calibrate)
                </p>
                <div className="my-2 border-t border-zinc-800/80" />
                <p className="text-zinc-400"># Deterministic Routing & Guardrails</p>
                <p className="pl-2">
                  workflow.<span className="text-emerald-400">add_conditional_edges</span>(
                </p>
                <p className="pl-6">
                  <span className="text-amber-300">"evaluator"</span>,
                </p>
                <p className="pl-6">
                  should_adjust_difficulty, <span className="text-zinc-400"># [Increase | Maintain | Remediate]</span>
                </p>
                <p className="pl-6">
                  {`{"continue": "researcher", "complete": END}`}
                </p>
                <p className="pl-2">
                  )
                </p>
                <p className="text-emerald-400/90 pt-1">
                  app = workflow.<span className="text-blue-400">compile</span>(checkpointer=MemorySaver())
                </p>
              </div>

              {/* Execution Status Bar */}
              <div className="px-4 py-2.5 bg-zinc-950/90 border-t border-zinc-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AST Safety: Read-Only Enforced</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-mono">
                  <span>Latency: 42ms (Groq)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
