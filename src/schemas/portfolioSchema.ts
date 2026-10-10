import { z } from 'zod';

export const PipelineStepSchema = z.object({
  step: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  detail: z.string().min(1),
});

export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  category: z.enum(['Multi-Agent', 'RAG & Knowledge Graphs', 'NL-to-Query & DB']),
  technologies: z.array(z.string()).min(1),
  githubUrl: z.string().url().optional(),
  summary: z.string().min(10),
  highlights: z.array(z.string().min(5)).min(1),
  architectureOverview: z.string().min(10),
  pipelineSteps: z.array(PipelineStepSchema).optional(),
});

export const SkillCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  skills: z.array(z.string()).min(1),
});

export const EducationItemSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(10),
});

export const ContactInquirySchema = z.object({
  inquiryType: z.enum(['interview', 'consulting', 'general']),
  senderName: z.string().min(2, 'Name must be at least 2 characters').max(80),
  senderOrg: z.string().max(100).optional(),
  customNote: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const SimulatedQuerySchema = z.object({
  query: z.string().min(3),
  databaseTarget: z.enum(['PostgreSQL', 'ClickHouse', 'MongoDB']),
  allowDestructive: z.boolean().default(false),
});

export const LangGraphStateSchema = z.object({
  threadId: z.string(),
  activeNode: z.enum(['idle', 'researcher', 'interviewer', 'evaluator', 'checkpoint']),
  score: z.number().min(0).max(100),
  difficulty: z.enum(['Intermediate', 'Advanced', 'Mastery']),
});

export const PortfolioDataSchema = z.object({
  personal: z.object({
    name: z.string(),
    role: z.string(),
    specialization: z.string(),
    phone: z.string(),
    email: z.string().email(),
    github: z.string().url(),
    githubUsername: z.string(),
    location: z.string(),
    status: z.string(),
    summary: z.string(),
  }),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  projects: z.array(ProjectSchema),
  skillsData: z.array(SkillCategorySchema),
  education: z.array(EducationItemSchema),
});

export type PipelineStep = z.infer<typeof PipelineStepSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type ContactInquiry = z.infer<typeof ContactInquirySchema>;
export type PortfolioData = z.infer<typeof PortfolioDataSchema>;
