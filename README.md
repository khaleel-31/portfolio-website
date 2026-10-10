# Mohammed Abdul Khaleel — AI Engineer Portfolio

A sleek, production-grade portfolio website built for **Mohammed Abdul Khaleel** (AI Engineer | LLM Applications | RAG & Agentic Systems).

## 🛠️ Tech Stack

- **Framework**: Next.js Ready / React 19 SPA
- **Type & Schema Validation**: **Zod** (`z.object`, `PortfolioDataSchema`, `ContactInquirySchema`)
- **Styling**: **Tailwind CSS** (Anti-slop typography, dark carbon palette, glassmorphism)
- **Deployment**: **Vercel** (`vercel.json` included for 1-click zero-config deployment)
- **Icons**: Lucide React
- **Animations**: Motion

---

## 🚀 Seamless Deployment to Vercel

This repository is pre-configured with `vercel.json` for seamless 1-click Vercel deployment:

### Option 1: Vercel Dashboard (Zero Config)
1. Push this repository to your GitHub account (`https://github.com/khaleel-31/portfolio`).
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel automatically detects the build command (`npm run build`) and output directory (`dist`).
5. Click **Deploy** — your portfolio is live in under 45 seconds!

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🛡️ Zod Schema Validation

All portfolio data, project models, and the direct contact drafter are validated using strict **Zod** schemas located in `src/schemas/portfolioSchema.ts`:
- `PortfolioDataSchema`: Validates personal bio, contact endpoints, metrics, project hierarchy, and education records.
- `ProjectSchema`: Validates pipeline steps, categories, and technical architecture specifications.
- `ContactInquirySchema`: Validates user inputs with real-time field error feedback before launching mail drafts.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build for production
npm run build
```
