import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Workflow, 
  CheckCircle, 
  Database, 
  Cpu, 
  GitBranch, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'datahek' | 'langgraph'>('datahek');

  // DataHek Pipeline Simulation State
  const sampleQueries = [
    {
      label: 'Analytics: High-Value Churn Risk',
      query: 'Find top 5 customers with churn_probability > 0.35 and lifetime_revenue > 5000',
      expectedOutcome: 'safe',
      sql: 'SELECT c.id, c.name, c.email_masked, a.churn_probability, SUM(o.amount) as lifetime_revenue\nFROM customers c\nJOIN account_analytics a ON c.id = a.customer_id\nJOIN orders o ON c.id = o.customer_id\nWHERE a.churn_probability > 0.35\nGROUP BY c.id, c.name, c.email_masked, a.churn_probability\nHAVING SUM(o.amount) > 5000\nORDER BY a.churn_probability DESC\nLIMIT 5;',
      lqp: 'LQP: Project(c.id, c.name, a.churn_prob, revenue) -> Filter(churn_prob > 0.35) -> Aggregate(SUM(amount) > 5000) -> Join(customers, analytics, orders)'
    },
    {
      label: 'Performance: Regional SSE Latency',
      query: 'Calculate average query latency and token throughput grouped by connector provider',
      expectedOutcome: 'safe',
      sql: 'SELECT connector_type, AVG(query_latency_ms) as avg_latency_ms, AVG(token_throughput) as avg_tokens_sec\nFROM execution_audit_logs\nWHERE timestamp >= NOW() - INTERVAL 7 DAY\nGROUP BY connector_type\nORDER BY avg_latency_ms ASC;',
      lqp: 'LQP: Project(connector, avg_latency, avg_throughput) -> Filter(timestamp >= now-7d) -> AggregateBy(connector_type)'
    },
    {
      label: 'Malicious / Destructive Injection Test',
      query: 'DROP TABLE customers; SELECT * FROM audit_credentials;',
      expectedOutcome: 'blocked',
      sql: '-- BLOCKED BY AST GUARDRAIL: Statement contains DDL mutation [DROP TABLE]',
      lqp: 'LQP: REJECTED AT DETERMINISTIC PARSER LEVEL'
    }
  ];

  const [selectedDataHekIndex, setSelectedDataHekIndex] = useState(0);
  const [isRunningDataHek, setIsRunningDataHek] = useState(false);
  const [dataHekStage, setDataHekStage] = useState<number>(5); // default completed
  const [dataHekLogs, setDataHekLogs] = useState<string[]>([
    '[INIT] Connecting to DataHek OSS Orchestrator...',
    '[SCHEMA] Discovered tables: customers, account_analytics, orders',
    '[NEO4J] Traversed knowledge graph: verified entity relationships & metric taxonomy',
    '[LQP] Generated Provider-Agnostic Logical Query Plan',
    '[GUARDRAIL] AST Validation Passed: Pure Read-Only SELECT detected. Zero DDL/DML mutations.',
    '[MASKING] PII Mask applied on email -> email_masked',
    '[SSE] Streaming SQL execution results via Server-Sent Events (200 OK).'
  ]);

  const runDataHekSimulation = (index: number) => {
    setSelectedDataHekIndex(index);
    setIsRunningDataHek(true);
    setDataHekStage(0);
    setDataHekLogs(['[INIT] Initializing pipeline for user request...']);

    const queryData = sampleQueries[index];

    setTimeout(() => {
      setDataHekStage(1);
      setDataHekLogs(prev => [...prev, '[SCHEMA] Scanning schema catalog & foreign key boundaries...']);
    }, 400);

    setTimeout(() => {
      setDataHekStage(2);
      setDataHekLogs(prev => [...prev, '[NEO4J] Resolving business ontology & graph taxonomy in Neo4j...']);
    }, 900);

    setTimeout(() => {
      setDataHekStage(3);
      if (queryData.expectedOutcome === 'blocked') {
        setDataHekLogs(prev => [
          ...prev, 
          '[GUARDRAIL ALERT] AST Parse Error: Mutation syntax detected!',
          '[SECURITY] Denied execution: Destructive statement DROP TABLE violation. Guardrail triggered!'
        ]);
        setDataHekStage(4);
        setIsRunningDataHek(false);
      } else {
        setDataHekLogs(prev => [...prev, '[LQP] Synthesizing optimized Logical Query Plan (PostgreSQL connector)...']);
        setTimeout(() => {
          setDataHekStage(4);
          setDataHekLogs(prev => [...prev, '[GUARDRAIL] Verified: Read-only safe AST verified. Applied PII masking rules.']);
          setTimeout(() => {
            setDataHekStage(5);
            setDataHekLogs(prev => [...prev, '[SSE STREAM] Emitted 5 records via live Server-Sent Events stream.']);
            setIsRunningDataHek(false);
          }, 600);
        }, 500);
      }
    }, 1400);
  };

  // LangGraph Adaptive RAG State
  const [langGraphStep, setLangGraphStep] = useState<'idle' | 'researcher' | 'interviewer' | 'evaluator' | 'checkpoint'>('checkpoint');
  const [candidateAnswer, setCandidateAnswer] = useState<'strong' | 'average' | 'poor'>('strong');
  const [currentScore, setCurrentScore] = useState(88);
  const [difficultyLevel, setDifficultyLevel] = useState<'Intermediate' | 'Advanced' | 'Mastery'>('Advanced');

  const runLangGraphCycle = (answerQuality: 'strong' | 'average' | 'poor') => {
    setCandidateAnswer(answerQuality);
    setLangGraphStep('researcher');

    setTimeout(() => {
      setLangGraphStep('interviewer');
      setTimeout(() => {
        setLangGraphStep('evaluator');
        setTimeout(() => {
          setLangGraphStep('checkpoint');
          if (answerQuality === 'strong') {
            setCurrentScore(prev => Math.min(98, prev + 5));
            setDifficultyLevel('Mastery');
          } else if (answerQuality === 'average') {
            setCurrentScore(prev => prev);
            setDifficultyLevel('Advanced');
          } else {
            setCurrentScore(prev => Math.max(55, prev - 8));
            setDifficultyLevel('Intermediate');
          }
        }, 600);
      }, 700);
    }, 600);
  };

  return (
    <section id="architecture" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <Workflow className="w-4 h-4" />
              <span>Interactive Architecture Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Live Agentic Pipeline Simulation
            </h2>
            <p className="mt-3 text-zinc-400 text-base">
              Experience the internal state transitions, AST safety guardrails, 
              and multi-agent orchestration flows built by Mohammed Abdul Khaleel.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start">
            <button
              onClick={() => setActiveTab('datahek')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'datahek'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              DataHek NL-to-SQL + Guardrails
            </button>
            <button
              onClick={() => setActiveTab('langgraph')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'langgraph'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              LangGraph Adaptive Multi-Agent
            </button>
          </div>
        </div>

        {/* TAB 1: DATAHEK NL-TO-SQL SIMULATOR */}
        {activeTab === 'datahek' && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 space-y-8">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Select Test Natural-Language Input:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sampleQueries.map((item, idx) => (
                  <button
                    key={idx}
                    disabled={isRunningDataHek}
                    onClick={() => runDataHekSimulation(idx)}
                    className={`text-left p-3.5 rounded-xl border transition-all text-xs font-mono ${
                      selectedDataHekIndex === idx
                        ? 'border-emerald-500/80 bg-zinc-800/90 text-white shadow-lg shadow-emerald-500/10'
                        : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-zinc-200">{item.label}</span>
                      {item.expectedOutcome === 'blocked' ? (
                        <span className="text-[10px] text-red-400 border border-red-500/30 bg-red-950/40 px-1.5 py-0.5 rounded">
                          Injection Test
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                          Validated Query
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate">"{item.query}"</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline Stage Visualizer */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-zinc-400 uppercase tracking-wider">Pipeline Execution Nodes</span>
                <span className="text-emerald-400 font-semibold">
                  {isRunningDataHek ? 'Processing Graph...' : 'Ready / Complete'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                {[
                  { name: '1. Discovery', desc: 'Schema Catalog' },
                  { name: '2. Neo4j Graph', desc: 'Semantic Context' },
                  { name: '3. LQP Engine', desc: 'Logical Plan' },
                  { name: '4. AST Guardrail', desc: 'Deterministic Safety' },
                  { name: '5. SSE Stream', desc: 'Live Execution' }
                ].map((stage, sIdx) => {
                  const isCurrent = dataHekStage === sIdx + 1 && isRunningDataHek;
                  const isDone = dataHekStage >= sIdx + 1;
                  const isBlocked = sampleQueries[selectedDataHekIndex].expectedOutcome === 'blocked' && sIdx === 3;

                  return (
                    <div
                      key={sIdx}
                      className={`p-3 rounded-lg border transition-all ${
                        isBlocked
                          ? 'border-red-500/80 bg-red-950/30 text-red-300'
                          : isCurrent
                          ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 animate-pulse'
                          : isDone
                          ? 'border-zinc-700 bg-zinc-800/80 text-zinc-200'
                          : 'border-zinc-800 bg-zinc-900/30 text-zinc-400'
                      }`}
                    >
                      <div className="font-semibold text-[11px]">{stage.name}</div>
                      <div className="text-[10px] opacity-75">{stage.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Console Output & Generated SQL */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 font-mono text-xs">
              {/* Left: Real-time Terminal Log */}
              <div className="lg:col-span-6 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between text-zinc-400 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Orchestrator Execution Logs</span>
                  </div>
                  <span className="text-zinc-400">SSE Event Bus</span>
                </div>
                <div className="p-4 space-y-1.5 h-56 overflow-y-auto text-zinc-300 text-[11px] leading-relaxed">
                  {dataHekLogs.map((log, lIdx) => (
                    <div 
                      key={lIdx}
                      className={
                        log.includes('[GUARDRAIL ALERT]') || log.includes('[SECURITY]')
                          ? 'text-red-400 font-semibold'
                          : log.includes('[GUARDRAIL]')
                          ? 'text-emerald-400'
                          : log.includes('[NEO4J]')
                          ? 'text-cyan-400'
                          : 'text-zinc-300'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: AST Guardrail & Validated SQL Output */}
              <div className="lg:col-span-6 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col">
                <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between text-zinc-400 text-[11px]">
                  <div className="flex items-center gap-2">
                    {sampleQueries[selectedDataHekIndex].expectedOutcome === 'blocked' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span>Synthesized & Validated SQL Statement</span>
                  </div>
                  <span className="text-zinc-400">PostgreSQL Target</span>
                </div>
                <div className="p-4 flex-1 h-56 overflow-y-auto text-[11px] leading-relaxed">
                  {sampleQueries[selectedDataHekIndex].expectedOutcome === 'blocked' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 text-red-400 space-y-2">
                      <ShieldAlert className="w-8 h-8 text-red-500" />
                      <div className="font-semibold text-sm">MALICIOUS MUTATION TRAPPED</div>
                      <p className="text-xs text-zinc-400 max-w-sm">
                        Deterministic AST validator discovered dangerous keyword: <code>DROP TABLE</code>.
                        Zero unvalidated SQL ever touches execution replica.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-zinc-400 text-[10px] pb-2 border-b border-zinc-800">
                        {sampleQueries[selectedDataHekIndex].lqp}
                      </div>
                      <pre className="text-emerald-300 font-mono text-[11px] whitespace-pre-wrap">
                        {sampleQueries[selectedDataHekIndex].sql}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LANGGRAPH ADAPTIVE MULTI-AGENT SIMULATOR */}
        {activeTab === 'langgraph' && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-emerald-400" />
                  LangGraph Multi-Agent Orchestration Graph
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Researcher Node (ChromaDB) → Interviewer Node (Groq Llama 3.3 70B) → Evaluator Node → Checkpointer
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-zinc-400">
                  Current Tier: <span className="text-emerald-400 font-semibold">{difficultyLevel}</span>
                </div>
                <div className="text-zinc-400">
                  Rubric Score: <span className="text-white font-semibold">{currentScore}/100</span>
                </div>
              </div>
            </div>

            {/* Visual State Graph Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
              <div 
                className={`p-4 rounded-xl border transition-all ${
                  langGraphStep === 'researcher' 
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/20' 
                    : 'border-zinc-800 bg-zinc-950 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-400 font-bold text-[10px]">NODE: RESEARCHER</span>
                  <Database className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <div className="font-semibold text-zinc-200 text-sm">ChromaDB Retrieval</div>
                <p className="text-[11px] text-zinc-400 mt-1">Queries vector store for system design interview questions.</p>
              </div>

              <div 
                className={`p-4 rounded-xl border transition-all ${
                  langGraphStep === 'interviewer' 
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/20' 
                    : 'border-zinc-800 bg-zinc-950 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-400 font-bold text-[10px]">NODE: INTERVIEWER</span>
                  <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <div className="font-semibold text-zinc-200 text-sm">Groq Llama 3.3 70B</div>
                <p className="text-[11px] text-zinc-400 mt-1">Synthesizes targeted question calibrated to candidate level.</p>
              </div>

              <div 
                className={`p-4 rounded-xl border transition-all ${
                  langGraphStep === 'evaluator' 
                    ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/20' 
                    : 'border-zinc-800 bg-zinc-950 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-400 font-bold text-[10px]">NODE: EVALUATOR</span>
                  <Activity className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <div className="font-semibold text-zinc-200 text-sm">Dynamic Calibration</div>
                <p className="text-[11px] text-zinc-400 mt-1">Calculates depth rubric & adjusts difficulty conditional branch.</p>
              </div>

              <div 
                className={`p-4 rounded-xl border transition-all ${
                  langGraphStep === 'checkpoint' 
                    ? 'border-cyan-400/80 bg-cyan-950/30 text-cyan-200 ring-2 ring-cyan-500/20' 
                    : 'border-zinc-800 bg-zinc-950 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-400 font-bold text-[10px]">CHECKPOINTER</span>
                  <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <div className="font-semibold text-zinc-200 text-sm">MemorySaver State</div>
                <p className="text-[11px] text-zinc-400 mt-1">Commits thread_id state snapshot across browser sessions.</p>
              </div>
            </div>

            {/* Test Action Trigger */}
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4 font-mono text-xs">
              <div className="text-zinc-400">
                Simulate Candidate Response to: <strong className="text-zinc-200">"Explain how to handle write amplification in distributed LSM-trees."</strong>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => runLangGraphCycle('strong')}
                  disabled={langGraphStep !== 'checkpoint' && langGraphStep !== 'idle'}
                  className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-all shadow-md active:scale-95"
                >
                  Submit Expert Answer (Levelling Up)
                </button>
                <button
                  onClick={() => runLangGraphCycle('average')}
                  disabled={langGraphStep !== 'checkpoint' && langGraphStep !== 'idle'}
                  className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all active:scale-95"
                >
                  Submit Standard Answer (Maintain Tier)
                </button>
                <button
                  onClick={() => runLangGraphCycle('poor')}
                  disabled={langGraphStep !== 'checkpoint' && langGraphStep !== 'idle'}
                  className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700 transition-all active:scale-95"
                >
                  Submit Incomplete Answer (Adaptive Remediation)
                </button>
              </div>

              {/* State Payload Output */}
              <div className="pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                <span className="text-cyan-400">LangGraph Checkpointer Snapshot:</span>{' '}
                <code>{`{ "thread_id": "mak_eval_9410", "node": "${langGraphStep}", "score": ${currentScore}, "difficulty": "${difficultyLevel}" }`}</code>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
