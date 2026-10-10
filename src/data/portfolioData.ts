import { 
  PortfolioDataSchema, 
  PortfolioData, 
  Project, 
  SkillCategory, 
  EducationItem,
  PipelineStep
} from '../schemas/portfolioSchema';

export type { Project, SkillCategory, EducationItem, PipelineStep, PortfolioData };

const rawPortfolioData = {
  personal: {
    name: 'MOHAMMED ABDUL KHALEEL',
    role: 'AI Engineer',
    specialization: 'LLM Applications | RAG & Agentic Systems',
    phone: '+91 7995737203',
    email: 'makhaleelma@gmail.com',
    github: 'https://github.com/khaleel-31',
    githubUsername: 'khaleel-31',
    location: 'Hyderabad, India (Open to Remote)',
    status: 'Available for AI & LLM Engineering Roles',
    summary:
      'AI Engineer with a Computer Science background and hands-on experience developing LLM-powered applications, multi-agent systems, Retrieval-Augmented Generation (RAG) pipelines, and natural-language-to-query systems. Experienced in building stateful AI workflows with LangGraph, integrating LLMs with structured and unstructured data, implementing observability and session persistence, and developing backend services using Python and FastAPI. Familiar with AI system validation, query guardrails, knowledge graphs, and cloud deployment. Seeking to build reliable, scalable, and production-oriented AI applications that address real-world business problems.'
  },
  
  metrics: [
    { label: 'Core Expertise', value: 'LangGraph & RAG' },
    { label: 'Agent Workflows', value: 'Multi-Agent State Systems' },
    { label: 'Observability', value: 'LangSmith & SSE Streaming' },
    { label: 'Query Guardrails', value: 'Schema-Aware & AST Validated' }
  ],

  projects: [
    {
      id: 'datahek-oss',
      title: 'DataHek OSS — Conversational Data Platform',
      subtitle: 'Open-Source Conversational Data Platform & NL-to-SQL Engine',
      category: 'NL-to-Query & DB',
      technologies: [
        'Python',
        'FastAPI',
        'LLMs',
        'Model Context Protocol (MCP)',
        'Agent Skills',
        'PostgreSQL',
        'Redis',
        'Neo4j',
        'ClickHouse',
        'Infisical'
      ],
      summary:
        'Contributed to an open-source enterprise AI data platform that translates natural-language questions into deterministic, validated, read-only SQL queries against live databases.',
      highlights: [
        'Worked on the end-to-end agent pipeline, including schema discovery, LLM-based query planning, deterministic validation, guardrails, auditing, data masking, streaming, and retry recovery.',
        'Contributed to a Neo4j-based schema knowledge graph incorporating taxonomy, ontology, topology, and data granularity to provide structured context for query generation and reasoning.',
        'Worked on provider-agnostic Logical Query Plans (LQPs) supporting database-specific validation and query execution across PostgreSQL and ClickHouse connectors.',
        'Implemented real-time Server-Sent Events (SSE) for pipeline progress and worked on PostgreSQL persistence, Redis configuration, and Infisical-based secrets management.'
      ],
      architectureOverview:
        'User Query -> Semantic Schema Discovery -> Neo4j Knowledge Graph Context Injection -> LLM Query Plan Generation -> Abstract Syntax Tree (AST) & Guardrail Validation -> Safe Read-Only Execution (Postgres/ClickHouse) -> Real-time SSE Stream to Client.',
      pipelineSteps: [
        {
          step: '01',
          title: 'Schema Discovery & Topology',
          description: 'Extracts relevant table metadata and foreign-key graphs',
          detail: 'Retrieves targeted tables, column types, and relational boundaries without saturating context window.'
        },
        {
          step: '02',
          title: 'Neo4j Knowledge Graph Enrichment',
          description: 'Maps semantic ontology, business logic, and metrics taxonomy',
          detail: 'Traverses knowledge graph nodes to disambiguate synonyms and map business definitions to schema fields.'
        },
        {
          step: '03',
          title: 'Logical Query Planning (LQP)',
          description: 'Constructs database-agnostic query representation',
          detail: 'Generates an intermediate LQP ensuring uniform optimization across PostgreSQL and ClickHouse.'
        },
        {
          step: '04',
          title: 'Deterministic Guardrails & AST Masking',
          description: 'Enforces strict read-only execution and PII protection',
          detail: 'Parses AST to verify zero mutation statements (DROP, UPDATE, DELETE) and injects automatic data-masking filters.'
        },
        {
          step: '05',
          title: 'Execution & SSE Streaming',
          description: 'Executes against live replica and streams progress via SSE',
          detail: 'Streams step-by-step reasoning tokens and execution logs to client while persisting session state in PostgreSQL & Redis.'
        }
      ]
    },
    {
      id: 'rag-interview-agent',
      title: 'Adaptive RAG Interview Agent',
      subtitle: 'Stateful Multi-Agent Adaptive System with ChromaDB & Groq',
      category: 'Multi-Agent',
      technologies: [
        'Python',
        'LangGraph',
        'Groq',
        'Llama 3.3 70B',
        'ChromaDB',
        'LangSmith',
        'Streamlit'
      ],
      githubUrl: 'https://github.com/khaleel-31/RAG-Interview-Agent',
      summary:
        'Designed and developed a multi-agent interview system using LangGraph to orchestrate Researcher, Interviewer, and Evaluator nodes with adaptive difficulty and session persistence.',
      highlights: [
        'Orchestrated a stateful multi-agent system with LangGraph dividing responsibilities into specialized Researcher, Interviewer, and Evaluator nodes.',
        'Built a Retrieval-Augmented Generation (RAG) pipeline using ChromaDB to retrieve relevant context and support dynamic, adaptive interview question generation.',
        'Implemented adaptive difficulty calibration that continuously adjusts question complexity based on candidate responses and evaluation scoring rubrics.',
        'Integrated Groq-hosted Llama 3.3 70B for ultra-fast, low-latency language generation and response synthesis.',
        'Integrated LangSmith tracing to inspect agent execution, troubleshoot API integration bottlenecks, and monitor workflow observability in production.',
        'Engineered session persistence using LangGraph checkpointers to preserve conversation state, candidate scores, and interview history across browser refreshes.',
        'Resolved SQLite runtime compatibility issues in Streamlit Cloud deployment using a custom pysqlite3 compatibility patch.'
      ],
      architectureOverview:
        'Candidate Input -> State Graph (LangGraph) -> Researcher Node (ChromaDB query) -> Interviewer Node (Groq Llama 3.3 70B) -> Evaluator Node (Rubric scoring & dynamic difficulty adjustment) -> LangGraph Checkpointer (State Memory) -> LangSmith Tracing.',
      pipelineSteps: [
        {
          step: '01',
          title: 'Researcher Node',
          description: 'ChromaDB semantic retrieval',
          detail: 'Retrieves topic depth, real-world scenario questions, and reference concepts matching the target tech stack.'
        },
        {
          step: '02',
          title: 'Interviewer Node',
          description: 'Adaptive Question Synthesis via Groq Llama 3.3 70B',
          detail: 'Synthesizes targeted questions tailored to the candidate profile and current calibrated difficulty level.'
        },
        {
          step: '03',
          title: 'Evaluator Node',
          description: 'Scoring Rubric & Difficulty Calibration',
          detail: 'Assesses accuracy, conceptual clarity, and completeness; dynamically adjusts the difficulty tier for subsequent questions.'
        },
        {
          step: '04',
          title: 'State Checkpointer',
          description: 'Persistent conversation state',
          detail: 'Commits state snapshot to LangGraph checkpointer memory, ensuring resilience against page refreshes and disconnects.'
        }
      ]
    },
    {
      id: 'genai-mongodb-query-bot',
      title: 'Generative AI Chatbot for Natural-Language MongoDB Queries',
      subtitle: 'Dynamic Aggregation Pipeline Generator & Conversational Retrieval',
      category: 'NL-to-Query & DB',
      technologies: [
        'Python',
        'Flask',
        'OpenAI API',
        'MongoDB',
        'PyMongo',
        'AWS EC2'
      ],
      summary:
        'Developed an LLM-powered chatbot that converts natural-language questions into multi-stage MongoDB aggregation pipelines for dynamic data retrieval and automated contextual synthesis.',
      highlights: [
        'Developed an LLM-powered chatbot that converts complex natural-language questions into multi-stage MongoDB aggregation pipelines ($match, $group, $sort, $project).',
        'Integrated generated database queries with MongoDB execution to retrieve structured documents in response to ad-hoc user requests.',
        'Transformed raw JSON database query results into contextual, human-readable conversational responses to simplify access to database insights.',
        'Built a modular Flask backend connecting the language model, query generation workflow, and MongoDB data access layer.',
        'Containerized and deployed the complete application stack on AWS EC2.'
      ],
      architectureOverview:
        'User Query -> Flask REST API -> Schema Context Prompt -> LLM Aggregation Generator -> PyMongo Execution Layer -> MongoDB Cluster -> Response Synthesizer -> Conversational UI on AWS EC2.',
      pipelineSteps: [
        {
          step: '01',
          title: 'Natural-Language Intent Parsing',
          description: 'Analyzes user business intent and filter criteria',
          detail: 'Extracts entities, date ranges, metrics, and grouping attributes from unstructured user prompt.'
        },
        {
          step: '02',
          title: 'Aggregation Pipeline Synthesis',
          description: 'Generates valid MongoDB pipeline stages',
          detail: 'Produces properly typed JSON pipelines using $match, $group, $lookup, and $project operators.'
        },
        {
          step: '03',
          title: 'PyMongo Execution & Safeguards',
          description: 'Validates and executes against MongoDB collection',
          detail: 'Runs query in read-only mode with strict timeout limits and error boundary handling.'
        },
        {
          step: '04',
          title: 'Contextual Synthesis',
          description: 'Synthesizes conversational insights from raw query documents',
          detail: 'Translates raw database documents into clear, human-digestible executive summaries and tables.'
        }
      ]
    }
  ] as Project[],

  skillsData: [
    {
      name: 'Programming & Core',
      slug: 'programming',
      skills: ['Python', 'SQL', 'Algorithms & Data Structures', 'Object-Oriented Design', 'Asynchronous Programming']
    },
    {
      name: 'LLM & Agent Engineering',
      slug: 'llm-agents',
      skills: [
        'Large Language Models (LLMs)',
        'LangChain',
        'LangGraph',
        'LangSmith',
        'Multi-Agent Systems',
        'Agentic Workflows',
        'Prompt Engineering',
        'Model Context Protocol (MCP)',
        'Agent Skills',
        'OpenAI API',
        'Claude API',
        'Groq'
      ]
    },
    {
      name: 'RAG & Knowledge Systems',
      slug: 'rag-knowledge',
      skills: [
        'Retrieval-Augmented Generation (RAG)',
        'ChromaDB',
        'Embeddings',
        'Semantic Retrieval',
        'Knowledge Graphs',
        'Neo4j',
        'Schema-Aware Retrieval',
        'Chunking Strategies',
        'Vector Similarity'
      ]
    },
    {
      name: 'AI/ML & NLP',
      slug: 'ai-ml',
      skills: [
        'Machine Learning',
        'Deep Learning',
        'Natural Language Processing (NLP)',
        'TensorFlow',
        'Keras',
        'PyTorch',
        'NLTK',
        'spaCy',
        'Supervised Fine-Tuning (SFT)',
        'Model Distillation'
      ]
    },
    {
      name: 'Backend Engineering',
      slug: 'backend',
      skills: [
        'FastAPI',
        'Flask',
        'REST APIs',
        'Server-Sent Events (SSE)',
        'API Integration',
        'Asynchronous Workflows',
        'Pydantic Data Models'
      ]
    },
    {
      name: 'Databases & Data Systems',
      slug: 'databases',
      skills: [
        'PostgreSQL',
        'MongoDB',
        'PyMongo',
        'Redis',
        'Neo4j',
        'ChromaDB',
        'ClickHouse',
        'SQL Query Generation',
        'Logical Query Plans (LQPs)'
      ]
    },
    {
      name: 'MLOps, Cloud & Observability',
      slug: 'mlops-cloud',
      skills: [
        'Docker',
        'MLflow',
        'DVC',
        'Git & GitHub',
        'CI/CD',
        'LangSmith Tracing',
        'Prometheus',
        'Grafana',
        'Kubernetes',
        'AWS EC2',
        'Streamlit Cloud',
        'Infisical (Secrets Management)'
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      degree: "Master's Studies — Business Analytics",
      institution: 'Southern New Hampshire University',
      location: 'United States',
      duration: '2022 – 2024',
      description:
        'Graduate focus on advanced data modeling, business intelligence, predictive analytics, enterprise data architecture, and applied statistical computing.'
    },
    {
      degree: 'Bachelor of Engineering — Computer Science Engineering',
      institution: 'Osmania University',
      location: 'Hyderabad, India',
      duration: '2017 – 2021',
      description:
        'Solid foundation in algorithms, data structures, operating systems, database management systems, artificial intelligence, and software engineering principles.'
    }
  ]
};

// Strict runtime validation using Zod
export const PORTFOLIO_DATA: PortfolioData = PortfolioDataSchema.parse(rawPortfolioData);
