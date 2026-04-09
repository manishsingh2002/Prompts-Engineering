/* ============================================================
   PromptForge — script.js
   ============================================================ */

// ── Prompt Data ──────────────────────────────────────────────
const PROMPTS = [
  // ─────────────── CODING ───────────────
  {
    id: 1,
    title: "Senior Code Reviewer",
    category: "coding",
    useCase: "Code Review & Best Practices",
    featured: true,
    description: "Get a comprehensive, senior-level code review with actionable feedback on architecture, performance, and maintainability.",
    prompt: `You are a Senior Software Engineer with 15+ years of experience. Review the following code and provide structured feedback covering:

1. **Architecture & Design Patterns** — Is the structure scalable? Are SOLID principles followed?
2. **Performance** — Identify bottlenecks, unnecessary re-renders, or O(n²) traps.
3. **Security** — Flag injection risks, improper auth, exposed secrets, or unsafe operations.
4. **Readability & Maintainability** — Naming conventions, complexity score, test coverage gaps.
5. **Quick Wins** — 3 specific improvements you can make in under 10 minutes.

Format your response as:
- Severity: [Critical / High / Medium / Low]
- Issue + Line Reference
- Suggested Fix (with code snippet)

Code to Review:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\``
  },
  {
    id: 2,
    title: "System Design Architect",
    category: "coding",
    useCase: "System Design Interview / Architecture Planning",
    featured: true,
    description: "Design a scalable system architecture with trade-off analysis for any use case.",
    prompt: `You are a Principal Software Architect. Design a production-ready system for: [SYSTEM NAME / USE CASE].

Include the following components in your design:

**1. Requirements Clarification**
- Functional requirements (what the system must do)
- Non-functional requirements (scale, latency, availability SLAs)
- Constraints and assumptions

**2. Capacity Estimation**
- DAU/MAU estimates, read/write ratio, storage requirements
- Throughput calculations (requests per second)

**3. High-Level Architecture**
- Component diagram (describe in text/ASCII)
- Core services and their responsibilities

**4. Data Design**
- Database choice with justification (SQL vs NoSQL)
- Schema design for primary entities
- Caching strategy (Redis/Memcached)

**5. API Design**
- Core REST/GraphQL endpoints
- Authentication approach

**6. Scalability Deep Dive**
- Horizontal vs vertical scaling strategy
- Load balancing approach
- CDN and edge caching

**7. Trade-offs & Alternatives**
- What you chose and why
- What you explicitly avoided

System to Design: [YOUR SYSTEM]`
  },
  {
    id: 3,
    title: "Angular Component Generator",
    category: "coding",
    useCase: "Angular 17+ Standalone Components",
    featured: false,
    description: "Generate production-ready Angular standalone components with signals, reactive patterns, and best practices.",
    prompt: `You are an Angular 17+ expert. Generate a production-ready standalone component for: [COMPONENT PURPOSE].

Requirements:
- Use Angular Signals for state management
- Implement OnPush change detection
- Use the inject() function instead of constructor injection
- Follow Angular style guide naming conventions
- Include: component, template, SCSS, and unit test skeleton

Component specs:
- Name: [ComponentName]
- Inputs: [List your @input() props]
- Outputs: [List your @output() events]
- Services needed: [List services]
- API calls: [Yes/No — if yes, describe]

Output format:
1. component.ts (full implementation)
2. component.html (template with accessibility attributes)
3. component.scss (BEM-style scoped styles)
4. component.spec.ts (test skeleton with describe/it blocks)`
  },
  {
    id: 4,
    title: "REST API Designer",
    category: "coding",
    useCase: "Backend API Design (Node.js / Express)",
    featured: false,
    description: "Design a complete, documented REST API with routes, middleware, error handling, and OpenAPI spec.",
    prompt: `Act as a Senior Backend Engineer. Design a complete REST API for: [YOUR RESOURCE / DOMAIN].

Deliver:

**1. Route Structure**
\`\`\`
METHOD /api/v1/[resource]         → [action]
METHOD /api/v1/[resource]/:id    → [action]
\`\`\`

**2. Middleware Stack** (in order of execution)
- Auth, rate limiting, validation, logging

**3. Request/Response Schemas**
- Request body with field validation rules
- Success response (200/201)
- Error response (400/401/403/404/500)

**4. Error Handling Strategy**
- Centralized error handler
- Error codes and human-readable messages

**5. OpenAPI/Swagger Spec Skeleton**

**6. Security Checklist**
- Input sanitization
- Auth guard placement
- Rate limits per endpoint

Resource/Domain: [YOUR INPUT]`
  },
  {
    id: 5,
    title: "Bug Hunter & Debugger",
    category: "coding",
    useCase: "Debugging Complex Issues",
    featured: false,
    description: "Systematically diagnose and fix bugs using a structured root-cause analysis approach.",
    prompt: `You are a debugging expert. Help me find and fix this bug using a systematic approach.

**Bug Report:**
- Error message: [PASTE ERROR]
- Expected behavior: [WHAT SHOULD HAPPEN]
- Actual behavior: [WHAT IS HAPPENING]
- Environment: [OS, Node version, framework version]
- Steps to reproduce: [NUMBERED STEPS]

Relevant code:
\`\`\`
[PASTE CODE]
\`\`\`

Please provide:
1. **Root Cause Analysis** — What is actually causing this?
2. **Why It's Happening** — Explain the underlying mechanism
3. **Fix** — Exact code change with before/after
4. **Prevention** — How to avoid this class of bug in future
5. **Related Issues** — Any adjacent problems you notice

Use "rubber duck" style: explain your reasoning as you analyze.`
  },
  {
    id: 6,
    title: "Database Schema Designer",
    category: "coding",
    useCase: "MongoDB / PostgreSQL Schema Design",
    featured: false,
    description: "Design normalized or document-based schemas with indexing strategy and migration plan.",
    prompt: `You are a Database Architect. Design an optimal schema for: [YOUR APPLICATION / DOMAIN].

Specify which database to use: [MongoDB / PostgreSQL / MySQL]

Deliver:

**1. Entity Relationship Overview**
List all entities and their relationships (one-to-many, many-to-many)

**2. Schema Definition**
- For PostgreSQL: CREATE TABLE statements with proper types, constraints, foreign keys
- For MongoDB: Mongoose schema definitions with validators

**3. Indexing Strategy**
- Which fields to index and why
- Compound indexes for common query patterns
- Unique constraints

**4. Query Optimization**
- Top 5 most common queries and their optimized form
- Explain plan for the most complex query

**5. Migration Plan**
- Up migration
- Down migration (rollback)

**6. Scalability Considerations**
- Sharding strategy (if applicable)
- Archival strategy for old records

Application Description: [YOUR DESCRIPTION]`
  },
  {
    id: 7,
    title: "Code Refactoring Expert",
    category: "coding",
    useCase: "Legacy Code Modernization",
    featured: false,
    description: "Transform messy, legacy code into clean, modern, testable implementations.",
    prompt: `You are a Refactoring Expert. Modernize this code while preserving its exact functionality.

Apply these transformations:
1. **Extract Functions** — Break code into single-responsibility functions (max 20 lines each)
2. **Eliminate Code Smells** — Remove duplication, magic numbers, deep nesting
3. **Modern Syntax** — Use ES2022+, async/await, optional chaining, nullish coalescing
4. **Error Handling** — Add proper try/catch with meaningful error messages
5. **Type Safety** — Add TypeScript types or JSDoc annotations
6. **Testability** — Make functions pure and side-effect-free where possible

Output format:
- BEFORE: [original code]
- AFTER: [refactored code]
- CHANGES: Bullet list of every change made and why
- TESTS: Jest test cases for the critical paths

Code to refactor:
\`\`\`
[PASTE YOUR LEGACY CODE]
\`\`\``
  },
  {
    id: 8,
    title: "Docker & CI/CD Setup",
    category: "coding",
    useCase: "DevOps Automation",
    featured: false,
    description: "Generate production-ready Dockerfile, docker-compose, and CI/CD pipeline configuration.",
    prompt: `You are a DevOps Engineer. Set up a complete containerized deployment pipeline for my application.

Application Details:
- Stack: [e.g., Node.js + MongoDB + Redis]
- Environment: [Development / Staging / Production]
- Cloud Provider: [AWS / GCP / Azure / DigitalOcean]
- Monolith or Microservices: [specify]

Generate:

**1. Dockerfile** (multi-stage build, optimized layers)
**2. docker-compose.yml** (all services, volumes, networks, env vars)
**3. .dockerignore**
**4. GitHub Actions Workflow** (.github/workflows/deploy.yml)
  - On push to main: lint → test → build → push image → deploy
  - Environment secrets list

**5. Environment Variables Template** (.env.example)
**6. Health Check Endpoints** (what to implement in app)
**7. Rollback Strategy** (how to revert a bad deploy)

Include production-specific optimizations:
- Non-root user in container
- Read-only filesystem where possible
- Resource limits (CPU/memory)
- Log configuration`
  },

  // ─────────────── BUSINESS & STARTUPS ───────────────
  {
    id: 9,
    title: "Startup Pitch Deck Writer",
    category: "business",
    useCase: "Investor Pitch Decks (Pre-Seed / Seed)",
    featured: true,
    description: "Create a compelling, investor-ready pitch deck narrative that tells your story with data.",
    prompt: `You are a startup pitch deck expert who has helped companies raise $500M+. Create a compelling pitch narrative for my startup.

Company Details:
- Name: [NAME]
- What we do (one sentence): [DESCRIPTION]
- Target market: [MARKET]
- Current traction: [METRICS — users, revenue, growth rate]
- Funding ask: $[AMOUNT] for [USE OF FUNDS]
- Team: [KEY MEMBERS + BACKGROUNDS]

Write slide content for each of the 10 core slides:

1. **Cover** — Tagline + hook
2. **Problem** — 3 painful, relatable problems with data
3. **Solution** — Your unique approach (not features, outcomes)
4. **Product** — How it works (demo narrative)
5. **Market Size** — TAM → SAM → SOM with methodology
6. **Business Model** — Revenue streams, unit economics, payback period
7. **Traction** — Key metrics, growth chart narrative, social proof
8. **Competition** — Positioning matrix, your unfair advantage
9. **Team** — Why THIS team can win this market
10. **The Ask** — Amount, use of funds (% breakdown), 18-month milestones

Each slide: 3–5 bullet points, headline stat, and one compelling hook sentence.`
  },
  {
    id: 10,
    title: "Business Model Canvas",
    category: "business",
    useCase: "Business Modeling & Strategy",
    featured: false,
    description: "Build a complete Business Model Canvas with strategic analysis and revenue projections.",
    prompt: `Act as a business strategist with McKinsey-level thinking. Complete a full Business Model Canvas for:

Business: [YOUR BUSINESS IDEA / COMPANY NAME]
Industry: [INDUSTRY]
Stage: [Idea / Pre-revenue / Early Stage / Growth]

Fill in all 9 blocks with depth:

1. **Customer Segments** — Who exactly? Psychographics, not just demographics.
2. **Value Propositions** — Ranked by impact. For each: problem solved, gain created, pain relieved.
3. **Channels** — Awareness → Evaluation → Purchase → Delivery → After-sales
4. **Customer Relationships** — Type of relationship per segment, CAC implications
5. **Revenue Streams** — Pricing model, revenue type, volume/margin analysis
6. **Key Resources** — Physical, intellectual, human, financial
7. **Key Activities** — Top 3 things the business must execute perfectly
8. **Key Partnerships** — Strategic vs. operational, make vs. buy decisions
9. **Cost Structure** — Fixed vs. variable, top 5 cost drivers, unit economics

Add: Strategic Risk Assessment (top 3 risks + mitigation) and 12-month KPI targets.`
  },
  {
    id: 11,
    title: "Competitive Analysis Framework",
    category: "business",
    useCase: "Market Research & Strategy",
    featured: false,
    description: "Conduct a deep competitive analysis with positioning maps and strategic recommendations.",
    prompt: `You are a market research analyst. Conduct a comprehensive competitive analysis for:

Company/Product: [YOUR COMPANY]
Industry: [INDUSTRY]
Direct Competitors: [LIST 3-5 COMPETITORS]

Analyze each competitor across:

**1. Product Analysis**
- Core features vs. our features
- UX/UI quality rating (1-10)
- Unique differentiators

**2. Business Analysis**
- Pricing model and tiers
- Estimated revenue / funding stage
- GTM strategy

**3. Marketing Analysis**
- Key messages and positioning
- Traffic sources (organic, paid, social)
- Content strategy

**4. Customer Sentiment**
- G2/Capterra reviews themes
- Most praised features
- Most complained about issues

**5. Strategic Summary**
- 2x2 positioning matrix (price vs. features)
- Our unique whitespace opportunity
- 3 strategic moves to take market share

Format as a table where possible for easy comparison.`
  },
  {
    id: 12,
    title: "SaaS Pricing Strategy",
    category: "business",
    useCase: "Pricing Design & Monetization",
    featured: false,
    description: "Design a value-based SaaS pricing strategy with tier structures and growth levers.",
    prompt: `You are a SaaS pricing expert. Design an optimal pricing strategy for:

Product: [PRODUCT NAME]
What it does: [DESCRIPTION]
Target customers: [ICP]
Current pricing (if any): [EXISTING PRICING OR 'NONE']
Stage: [Pre-launch / Early / Growth / Scale]

Deliver:

**1. Value Metric Analysis**
- What is the best metric to charge on? (per seat, per usage, per outcome)
- Why this metric aligns customer success with revenue

**2. Pricing Tiers** (3-tier recommended)
- Tier 1 (Free/Starter): What's included + limits + conversion goal
- Tier 2 (Pro/Growth): Core value features + price justification
- Tier 3 (Business/Enterprise): Full features + pricing model

**3. Psychological Pricing Tactics**
- Anchoring strategy
- Decoy tier design
- Annual discount % recommendation

**4. Competitive Pricing Benchmarks**
- How competitors are priced
- Our optimal positioning (premium / competitive / penetration)

**5. Revenue Model Projections**
- MRR targets per tier at different conversion scenarios
- Key lever: if we increase [metric] by 10%, revenue impact = ?`
  },

  // ─────────────── CONTENT CREATION ───────────────
  {
    id: 13,
    title: "Viral Instagram Caption Writer",
    category: "content",
    useCase: "Instagram Growth & Engagement",
    featured: true,
    description: "Write scroll-stopping Instagram captions with hooks, storytelling, and strategic CTAs.",
    prompt: `You are a top Instagram copywriter. Write 5 caption variations for my post.

Post Details:
- Topic/Theme: [WHAT THE POST IS ABOUT]
- Target Audience: [WHO FOLLOWS YOU]
- Tone: [Educational / Inspirational / Entertaining / Behind-the-scenes]
- Goal: [More saves / More shares / More followers / Drive traffic]

For each caption write:
1. **Hook** (first line — must stop the scroll in 3 seconds)
2. **Body** (storytelling or value delivery, 3–6 lines)
3. **CTA** (specific, low-friction action)
4. **Hashtag Strategy** (mix of 10: 3 niche, 4 mid-size, 3 broad)

Apply these proven formulas in the 5 variations:
- Formula 1: Controversial statement → nuanced truth
- Formula 2: "Most people [mistake]... here's what actually works"
- Formula 3: Personal story → universal lesson
- Formula 4: Data point → counterintuitive insight
- Formula 5: List format with bold hook

Include emoji usage recommendations.`
  },
  {
    id: 14,
    title: "YouTube Script Creator",
    category: "content",
    useCase: "YouTube Content Strategy",
    featured: false,
    description: "Create a complete, retention-optimized YouTube video script with hooks, chapters, and CTAs.",
    prompt: `You are a YouTube script strategist who understands algorithm psychology. Write a complete script for:

Video Topic: [TOPIC]
Target Length: [5 / 10 / 15 / 20 minutes]
Channel Niche: [YOUR NICHE]
Target Audience: [VIEWER PROFILE]
Goal: [Subscribers / Views / Revenue / Brand building]

Structure:

**0:00–0:30 — THE HOOK** (most important)
- Open with the biggest payoff or most shocking claim
- Promise transformation, not just information
- Pattern interrupt technique to use

**0:30–1:30 — CREDIBILITY + SETUP**
- Why viewers should trust you on this topic
- Stakes: what happens if they DON'T watch this

**[CHAPTERS]** — Break remaining time into 4–6 chapters
Each chapter: headline → key points → transition hook to keep watching

**FINAL 60 SECONDS — CTA Sequence**
- Subscribe reason (specific)
- Comment prompt (easy to answer)
- Next video recommendation hook

Add: Thumbnail text suggestions (3 options) and title variations (5 options) with CTR analysis.`
  },
  {
    id: 15,
    title: "Blog Post SEO Writer",
    category: "content",
    useCase: "Blog & Long-form Content",
    featured: false,
    description: "Write SEO-optimized blog posts that rank on Google and actually get read.",
    prompt: `You are an SEO content strategist. Write a complete, ranking-ready blog post.

Brief:
- Target Keyword: [PRIMARY KEYWORD]
- Secondary Keywords: [2-3 RELATED TERMS]
- Topic: [BLOG POST TOPIC]
- Audience: [TARGET READER]
- Word Count Target: [1500 / 2500 / 4000]
- Intent: [Informational / Commercial / Navigational]

Deliver:

**1. SEO Metadata**
- Title tag (60 chars, keyword-first)
- Meta description (155 chars with CTA)
- URL slug

**2. Full Article Structure**
- H1 (matches title tag intent)
- H2s and H3s with keyword variations
- Complete article with intro hook, body paragraphs, FAQ section

**3. Internal Linking Prompts** — [placeholder] for 3 internal links

**4. Content Upgrades** — What to offer as lead magnet in this post

**5. On-page SEO Checklist**
- Keyword in first 100 words: ✓/✗
- LSI keywords included: list them
- Image alt text suggestions

Writing style: expert but accessible, zero fluff, data-backed claims.`
  },
  {
    id: 16,
    title: "Email Newsletter Builder",
    category: "content",
    useCase: "Email Marketing & Newsletters",
    featured: false,
    description: "Craft engaging email newsletters with high open rates, click-throughs, and reader loyalty.",
    prompt: `You are a master email copywriter. Write an engaging newsletter edition.

Newsletter Details:
- Brand/Publication Name: [NAME]
- Niche/Topic: [YOUR NICHE]
- Audience Size: [APPROXIMATE SUBSCRIBERS]
- Frequency: [Weekly / Biweekly / Monthly]
- This Edition's Theme: [THEME OR TOPIC]

Write a complete newsletter with:

**Subject Line Options (5)**
- 2 curiosity-gap style
- 1 numbered list
- 1 personal/story style
- 1 controversial/contrarian

**Preview Text** (optimize for open rate)

**Body Structure:**
1. Opening hook (2-3 sentences max, personal tone)
2. Main content section (value delivery — teach one thing well)
3. Quick hits / curated links section (3-5 items with 1-line commentary)
4. Closing CTA (one specific ask)
5. Signature / P.S. (P.S. lines get highest read rates — use them)

Tone: [Conversational / Professional / Witty / Educational]
Goal: [Clicks / Replies / Sales / Retention]`
  },
  {
    id: 17,
    title: "Twitter/X Thread Creator",
    category: "content",
    useCase: "Twitter Thought Leadership",
    featured: false,
    description: "Write viral Twitter threads that educate, engage, and grow your following.",
    prompt: `You are a viral Twitter content strategist. Write a thread that will get saves and follows.

Thread Topic: [YOUR TOPIC]
Your Angle/Expertise: [WHY YOU]
Audience: [TARGET FOLLOWERS]
Thread Goal: [Viral reach / Followers / Leads / Brand authority]

Write a 12-tweet thread:

**Tweet 1 — THE HOOK**
Must stand alone as a great tweet. 3 techniques to choose from:
- "X years ago I [dramatic claim]. Here's what I learned:"
- "Unpopular opinion: [contrarian take]"  
- "The [NUMBER] [topic] playbook: (thread)"

**Tweets 2–11 — THE CONTENT**
- Each tweet = one complete idea (no cliffhangers mid-tweet)
- Format variety: text / mini-list / quote / stat
- Every 3rd tweet: re-hook the reader ("Here's where it gets interesting...")

**Tweet 12 — THE CLOSE**
- Summarize the transformation
- Ask an engaging question (reply bait)
- CTA for follow

Format: Tweet [number]: [content]
Character count check: each under 280 chars`
  },
  {
    id: 18,
    title: "Podcast Episode Planner",
    category: "content",
    useCase: "Podcast Production",
    featured: false,
    description: "Plan a compelling podcast episode with guest prep, questions, and show notes.",
    prompt: `You are a podcast producer. Plan a complete episode.

Show Details:
- Podcast Name: [NAME]
- Niche: [YOUR NICHE]
- Format: [Solo / Interview / Panel]
- Episode Length Target: [20 / 45 / 60 / 90 minutes]
- Guest (if interview): [GUEST NAME + BACKGROUND]

Deliver:

**1. Episode Title Options (5)**
Options that are SEO-friendly and emotionally compelling

**2. Episode Description** (for Spotify/Apple — 150 words)

**3. Episode Outline**
- Cold Open (hook, 60 seconds)
- Intro / Sponsor spot placeholder
- Chapter 1: [TOPIC] — Key questions and talking points
- Chapter 2: [TOPIC] — Key questions and talking points  
- Chapter 3: [TOPIC] — Key questions and talking points
- Lightning Round (5 rapid questions)
- Outro + CTA

**4. Guest Research Brief** (15 questions prepared)
- 5 background questions
- 5 expertise questions
- 5 thought-provoking / debate questions

**5. Show Notes Template**
- Timestamps
- Resources mentioned
- Guest links
- Episode keywords`
  },

  // ─────────────── PRODUCTIVITY & LEARNING ───────────────
  {
    id: 19,
    title: "Personal Learning Curriculum",
    category: "productivity",
    useCase: "Skill Acquisition & Learning Design",
    featured: true,
    description: "Build a structured, time-boxed learning curriculum for any skill with resources and milestones.",
    prompt: `You are a learning designer and cognitive scientist. Build me a complete curriculum to learn:

Skill to Learn: [SKILL NAME]
Current Level: [Complete Beginner / Some Experience / Intermediate]
Daily Time Available: [30 min / 1 hour / 2 hours]
Timeline Goal: [4 weeks / 3 months / 6 months]
Learning Style: [Reading / Video / Projects / Mixed]
End Goal: [Job ready / Personal project / Hobby mastery / Teaching others]

Design a curriculum with:

**Phase 1: Foundation (Week 1–2)**
- Core concepts to learn first (and why order matters)
- 3 best free resources
- 2 best paid resources
- Daily practice exercise
- End-of-phase milestone: [what you can do/build]

**Phase 2: Building (Week 3–6)**
- Intermediate concepts
- Project-based learning tasks
- Communities to join

**Phase 3: Mastery (Week 7+)**
- Advanced topics
- Portfolio project idea
- How to validate your skill publicly

Add: Spaced repetition schedule and weekly review prompts.`
  },
  {
    id: 20,
    title: "Deep Work Session Planner",
    category: "productivity",
    useCase: "Time Management & Focus",
    featured: false,
    description: "Design an optimized deep work session schedule using neuroscience-backed productivity principles.",
    prompt: `You are a productivity coach specializing in deep work and cognitive performance. Plan my optimal work session.

My Context:
- Role / Main Work: [WHAT YOU DO]
- Most Important Task Today: [MIT]
- Energy Level (1-10): [YOUR ENERGY]
- Available Time Block: [e.g., 9am–1pm]
- Distractions I struggle with: [PHONE / EMAIL / SLACK / etc.]
- My best focus time of day: [MORNING / AFTERNOON / EVENING]

Design my session:

**Pre-Session Ritual** (10 min)
What to do before starting to prime your brain

**Deep Work Blocks** (using Pomodoro or Ultradian rhythm)
- Block 1: [Task + duration + environment setup]
- Block 2: [Task + duration]
- Block 3: [Task + duration]

**Strategic Break Activities** (what to do in breaks to maintain cognitive performance)

**Distraction Blocklist** — Specific tools and tactics for my distractions

**End-of-Session Review** (5 min ritual)
Questions to ask yourself to improve tomorrow

**Weekly Audit Template**
Track: tasks completed, focus quality (1-10), energy patterns`
  },
  {
    id: 21,
    title: "Second Brain Setup Guide",
    category: "productivity",
    useCase: "Personal Knowledge Management",
    featured: false,
    description: "Design a personal knowledge management system using proven frameworks like PARA and Zettelkasten.",
    prompt: `You are a personal knowledge management expert. Help me build a second brain system.

My Situation:
- Tools available: [Notion / Obsidian / Roam / Logseq / Other]
- Information types I consume: [Books / Articles / Podcasts / Videos / Meetings]
- Main use cases: [Work projects / Research / Content creation / Learning]
- Problem I'm solving: [WHAT'S NOT WORKING NOW]

Design my complete system:

**1. Core Structure (PARA method adapted)**
- Projects: [active outcomes with deadlines]
- Areas: [ongoing responsibilities]  
- Resources: [reference material by topic]
- Archive: [inactive items]

**2. Capture System**
- Daily note template
- Quick capture workflow (inbox zero approach)
- Weekly review process

**3. Processing Workflow**
- How to process captures → actionable notes
- The 4-question test for every piece of info

**4. Linking Strategy**
- How to connect ideas (evergreen notes)
- Folder vs. tag philosophy for your tool

**5. Retrieval System**
- How to find anything in under 30 seconds
- Template library structure

Include: 3 starter templates I can copy immediately.`
  },
  {
    id: 22,
    title: "Meeting Effectiveness System",
    category: "productivity",
    useCase: "Team Communication & Meetings",
    featured: false,
    description: "Design meeting frameworks that eliminate waste and drive decisions with accountability.",
    prompt: `You are an organizational efficiency expert. Help me fix my meetings.

Meeting Context:
- Meeting Type: [Team standup / Planning / Retrospective / 1:1 / Board meeting]
- Current Duration: [MINUTES]
- Participants: [NUMBER + ROLES]
- Problem: [What's broken with current meetings]
- Desired Outcome: [WHAT A GREAT MEETING PRODUCES]

Deliver:

**1. Pre-Meeting System**
- Agenda template (with time allocations)
- Pre-read document structure
- What each attendee must prepare

**2. Meeting Structure**
- Opening ritual (2 min) — context reset
- Decision-first agenda format
- Parking lot protocol
- Real-time note-taking template

**3. Role Assignments**
- Facilitator duties
- Note-taker template
- Decision log owner

**4. Decision Framework**
- Consent vs. consensus vs. decider
- RACI per decision type
- How to handle disagreement under time pressure

**5. Post-Meeting System**
- Action items format: [WHO] will [WHAT] by [WHEN]
- Distribution timing
- 48-hour follow-up protocol

**6. Meeting Health Metrics**
- How to measure meeting effectiveness over time`
  },
  {
    id: 23,
    title: "Goal Setting Framework",
    category: "productivity",
    useCase: "Annual / Quarterly Goal Planning",
    featured: false,
    description: "Design a rigorous goal-setting system that bridges ambition to daily action.",
    prompt: `You are a high-performance coach. Help me design a complete goal achievement system.

My Situation:
- Timeframe: [Annual / Quarterly / 90-day sprint]
- Life Areas to Focus On: [Career / Health / Finance / Relationships / Learning / Side Project]
- Biggest goal right now: [YOUR #1 GOAL]
- Past goal-setting failures: [WHY PREVIOUS GOALS DIDN'T STICK]

Design my system:

**1. Vision → Goal Cascade**
- 10-year vision statement
- 3-year milestone
- Annual goal (SMART format)
- Quarterly rocks (3-5 key results)
- Monthly targets
- Weekly actions

**2. Goal Quality Check**
Run my goal through: SMART + anti-fragility test + identity alignment

**3. Obstacle Mapping (WOOP method)**
- Wish → Outcome → Obstacle → Plan
- Implementation intentions: "When X happens, I will Y"

**4. Accountability System**
- Weekly review template (15 min every Sunday)
- Monthly audit questions
- Who to share goals with and how

**5. Recovery Protocol**
- What to do when you fall off track
- How to adjust goals without abandoning them

**6. Daily Execution**
- The one daily habit that drives each goal
- Morning review routine (5 min)`
  },

  // ─────────────── AI AGENTS & AUTOMATION ───────────────
  {
    id: 24,
    title: "AI Agent System Prompt Builder",
    category: "ai-agents",
    useCase: "Building AI Agents & Assistants",
    featured: true,
    description: "Design a comprehensive system prompt for any AI agent with persona, constraints, and behavior rules.",
    prompt: `You are an AI prompt architect specializing in agent design. Build a complete system prompt for:

Agent Purpose: [WHAT THIS AGENT DOES]
Platform: [ChatGPT / Claude / Gemini / Custom LLM]
Users: [WHO INTERACTS WITH THIS AGENT]
Domain: [SPECIFIC DOMAIN / INDUSTRY]

Design the system prompt with these components:

**1. Persona Definition**
- Name, role, personality traits
- Expertise level and communication style
- What the agent is proud to do

**2. Behavioral Rules**
- Primary objective (the north star)
- What to ALWAYS do
- What to NEVER do
- How to handle ambiguous requests

**3. Knowledge Scope**
- What this agent knows deeply
- What it should NOT answer (boundaries)
- How to handle out-of-scope questions

**4. Response Format Rules**
- Default response length
- When to use bullet points vs. prose
- When to ask clarifying questions

**5. Failure Modes & Recovery**
- What to do when unsure
- How to handle adversarial prompts
- Escalation protocol

**6. Example Interactions**
- 3 example user messages + ideal responses

Output: A complete, copy-paste-ready system prompt.`
  },
  {
    id: 25,
    title: "Automation Workflow Designer",
    category: "ai-agents",
    useCase: "n8n / Zapier / Make Automation",
    featured: false,
    description: "Design end-to-end automation workflows with triggers, logic, error handling, and monitoring.",
    prompt: `You are an automation architect. Design a complete workflow for:

Process to Automate: [DESCRIBE THE MANUAL PROCESS]
Tool Preference: [n8n / Zapier / Make / Custom code]
Trigger Event: [WHAT STARTS THIS WORKFLOW]
End Goal: [WHAT SHOULD HAPPEN AUTOMATICALLY]
Apps/Services Involved: [LIST YOUR TOOLS]

Design the automation:

**1. Trigger Configuration**
- Trigger type: webhook / schedule / event
- Conditions to activate
- Test data example

**2. Flow Diagram** (text-based)
\`\`\`
[Trigger] → [Step 1] → [Condition Check] 
  ├── YES → [Step 2A] → [Output]
  └── NO  → [Step 2B] → [Notification]
\`\`\`

**3. Each Node/Step**
- Action performed
- Input data mapping
- Output data shape
- Potential failure point + handling

**4. Error Handling Strategy**
- What happens if step 2 fails?
- Retry logic
- Alert channel (Slack / email)

**5. Testing Checklist**
- Happy path test
- Edge case tests (empty data, duplicate events)

**6. Monitoring & Maintenance**
- What metrics to watch
- When to review the workflow`
  },
  {
    id: 26,
    title: "LLM Prompt Chain Architect",
    category: "ai-agents",
    useCase: "Multi-step LLM Pipelines",
    featured: false,
    description: "Design multi-step prompt chains with context passing, validation, and output formatting.",
    prompt: `You are an LLM orchestration expert. Design a prompt chain for:

Goal: [WHAT THE CHAIN SHOULD PRODUCE]
Input: [WHAT DATA GOES IN]
Output: [WHAT FORMAT SHOULD COME OUT]
Complexity: [Simple (2-3 steps) / Complex (5+ steps)]

Design the chain:

**Overview: Chain Architecture**
Step 1 → Step 2 → Step 3 → Final Output

For each step provide:

**Step [N]: [STEP NAME]**
- Purpose: [what this step accomplishes]
- Input: [what data it receives]
- Prompt template:
  \`\`\`
  System: [role definition]
  User: [instruction + {variable_from_previous_step}]
  \`\`\`
- Output format: [JSON schema / text / structured]
- Validation check: [how to verify output quality]
- Fallback: [what to do if this step fails]

**Context Management**
- What to carry between steps
- What to truncate to save tokens
- Token budget per step

**Quality Gates**
- How to detect hallucinations in the chain
- Confidence scoring approach

Include: Python pseudocode skeleton for the orchestration logic.`
  },
  {
    id: 27,
    title: "RAG System Designer",
    category: "ai-agents",
    useCase: "Retrieval Augmented Generation",
    featured: false,
    description: "Design a RAG architecture with chunking strategy, embedding model selection, and retrieval optimization.",
    prompt: `You are an AI infrastructure architect. Design a RAG system for:

Use Case: [WHAT THE RAG SYSTEM ANSWERS]
Data Sources: [PDFs / Website / Database / Code / Docs]
Query Types: [Factual / Analytical / Multi-hop reasoning]
Scale: [Small (<10k docs) / Medium / Enterprise]
Tech Stack Preference: [Python + LangChain / LlamaIndex / Custom]

Design the complete system:

**1. Document Processing Pipeline**
- Chunking strategy and chunk size rationale
- Overlap recommendation
- Metadata to extract per chunk

**2. Embedding Strategy**
- Model recommendation for this use case
- Embedding dimensionality tradeoffs

**3. Vector Store Selection**
- Recommended store (Pinecone / Weaviate / Chroma / pgvector)
- Indexing approach for your data size

**4. Retrieval Optimization**
- Hybrid search: dense + sparse (BM25) configuration
- Re-ranking strategy
- Number of chunks to retrieve (k value)

**5. Generation Prompt Template**
- System prompt with grounding instructions
- Citation format to include sources
- Hallucination prevention rules

**6. Evaluation Framework**
- How to measure retrieval quality (NDCG, MRR)
- How to measure answer quality (RAGAS metrics)
- A/B testing approach

**7. Production Considerations**
- Caching strategy
- Latency vs. quality tradeoffs`
  },
  {
    id: 28,
    title: "AI Chatbot Persona Designer",
    category: "ai-agents",
    useCase: "Customer Support / Sales Chatbots",
    featured: false,
    description: "Design a complete AI chatbot personality with conversation flows and escalation logic.",
    prompt: `You are a conversational AI designer. Create a complete chatbot design document for:

Business: [YOUR BUSINESS / BRAND]
Bot Purpose: [Support / Sales / Onboarding / Lead gen]
Channels: [Website / WhatsApp / Slack / App]
Tone: [Friendly / Professional / Witty / Empathetic]

Design document:

**1. Persona Card**
- Bot name and avatar concept
- Personality traits (3-5 adjectives)
- Voice and tone guidelines
- Phrases it uses / avoids

**2. Conversation Flows**
Map out:
- Welcome flow (first interaction)
- FAQ flow (top 10 questions + answers)
- Problem escalation flow
- Sales/lead capture flow
- Exit flow

**3. Intent Recognition**
- 10 core intents to train
- Example utterances per intent (5 per intent)
- Confusion fallback strategy

**4. Escalation Rules**
- Triggers for human handoff
- What data to pass to human agent
- Wait time communication template

**5. Personalization Logic**
- How to use user data to personalize responses
- Memory across sessions

**6. Success Metrics**
- Containment rate target
- CSAT measurement method
- Improvement feedback loop`
  },
  {
    id: 29,
    title: "Agentic Task Decomposer",
    category: "ai-agents",
    useCase: "Complex Task Planning with AI",
    featured: false,
    description: "Break down complex tasks into atomic AI-executable steps with dependency mapping.",
    prompt: `You are an agentic AI planning specialist. Decompose this complex task into AI-executable steps:

Goal: [YOUR COMPLEX GOAL]
Available Tools: [Web search / Code execution / File system / API calls / Browser]
Constraints: [Time limit / Cost limit / Data privacy rules]
Success Criteria: [How do we know the task is done?]

Decompose using this framework:

**1. Goal Clarification**
- Restate the goal in precise, measurable terms
- Identify ambiguities that need resolution first

**2. Task Tree**
Break into subtasks (use indentation for hierarchy):
- Task 1 (Parent)
  - 1.1 Subtask
  - 1.2 Subtask
    - 1.2.1 Atomic action

**3. Dependency Map**
- Which tasks must complete before others?
- Which can run in parallel?
- Critical path identification

**4. Tool Assignment**
For each atomic action:
- Tool to use
- Input format
- Expected output
- Confidence threshold to proceed

**5. Checkpoint System**
- Where to pause and verify before continuing
- What constitutes a "wrong turn"
- Recovery actions

**6. Final Verification Plan**
- How to validate the output matches success criteria`
  },

  // ─────────────── DATA ANALYSIS ───────────────
  {
    id: 30,
    title: "Data Analysis Report Generator",
    category: "data",
    useCase: "Business Intelligence & Reporting",
    featured: true,
    description: "Transform raw data into executive-ready analysis reports with insights and recommendations.",
    prompt: `You are a senior data analyst. Analyze this dataset and produce an executive report.

Dataset Context:
- Data Description: [WHAT THE DATA REPRESENTS]
- Time Period: [DATE RANGE]
- Key Metrics: [LIST YOUR MAIN METRICS]
- Business Question: [WHAT YOU'RE TRYING TO ANSWER]
- Audience: [CEO / Marketing team / Board / Ops]

Paste your data (or describe its structure):
[PASTE DATA OR DESCRIBE: rows, columns, sample values]

Produce:

**1. Executive Summary** (3-5 sentences, written for a non-technical reader)
The most important finding and its business implication.

**2. Key Findings** (ranked by business impact)
Finding #1: [What] → [So what] → [Now what]

**3. Trend Analysis**
- What's growing?
- What's declining?
- What's anomalous and why?

**4. Segment Breakdown**
Top performers vs. bottom performers by [segment].

**5. Correlation Insights**
What drives [primary metric]? Run a mental regression.

**6. Recommendations** (prioritized by impact/effort)
1. [Action] → Expected impact → Owner → Timeline

**7. Data Quality Notes**
Any caveats, missing data, or assumptions made.`
  },
  {
    id: 31,
    title: "SQL Query Optimizer",
    category: "data",
    useCase: "Database Performance Engineering",
    featured: false,
    description: "Optimize slow SQL queries with execution plan analysis and indexing recommendations.",
    prompt: `You are a database performance engineer. Optimize this SQL query.

Database: [PostgreSQL / MySQL / BigQuery / Snowflake]
Current Query Performance: [e.g., 12 seconds on 10M rows]
Table Sizes: [APPROXIMATE ROW COUNTS]

Paste your slow query:
\`\`\`sql
[PASTE YOUR QUERY HERE]
\`\`\`

Current indexes (if known): [LIST OR 'UNKNOWN']

Deliver:

**1. Query Analysis**
- What is this query doing? (plain English)
- Most expensive operations identified

**2. Optimized Query**
\`\`\`sql
-- Optimized version
[REWRITTEN QUERY]
\`\`\`

**3. Changes Explained**
- Change 1: [what + why it's faster]
- Change 2: [what + why it's faster]

**4. Index Recommendations**
\`\`\`sql
CREATE INDEX CONCURRENTLY idx_name ON table(columns);
\`\`\`
Why this index helps this specific query.

**5. Schema Considerations**
- Any column type changes recommended?
- Partitioning opportunity?
- Materialized view candidate?

**6. Expected Performance**
Estimated improvement with reasoning.`
  },
  {
    id: 32,
    title: "Dashboard Design Consultant",
    category: "data",
    useCase: "Analytics Dashboard Planning",
    featured: false,
    description: "Design a data dashboard with the right metrics, visualizations, and layout for your audience.",
    prompt: `You are a data visualization expert. Design a complete dashboard for:

Dashboard Purpose: [WHAT DECISIONS THIS DRIVES]
Primary Users: [WHO WILL USE IT DAILY]
Data Sources Available: [YOUR DATA SOURCES]
Tool: [Tableau / Power BI / Looker / Metabase / Custom]
Update Frequency: [Real-time / Hourly / Daily]

Design the dashboard:

**1. North Star Metrics** (max 3)
The numbers that, if they go up, everything is working.

**2. Dashboard Layout** (describe sections)
- Header KPIs (4-6 big numbers above the fold)
- Primary chart area
- Secondary breakdowns
- Filters and date range selector

**3. Chart Selection Guide**
For each key metric:
- Metric name
- Chart type + why (bar / line / scatter / table / gauge)
- X-axis / Y-axis / Color dimension
- Alert threshold to highlight

**4. Calculated Fields Needed**
Formulas for derived metrics (growth %, conversion rates, etc.)

**5. Drill-down Design**
Which charts should be clickable? What does the next level show?

**6. Audience Customization**
- Executive view (summary only)
- Analyst view (full granularity)
- Filters to expose per role`
  },
  {
    id: 33,
    title: "Python Data Pipeline Builder",
    category: "data",
    useCase: "ETL / Data Engineering",
    featured: false,
    description: "Design and code a robust data pipeline with extraction, transformation, validation, and loading.",
    prompt: `You are a data engineer. Build a production-ready data pipeline.

Pipeline Specs:
- Data Source: [API / Database / CSV / Webhook / S3]
- Destination: [Data warehouse / Database / Another API]
- Transformation Needed: [DESCRIBE WHAT NEEDS TO HAPPEN TO THE DATA]
- Schedule: [Real-time / Every 15min / Daily / Weekly]
- Volume: [Expected records per run]

Generate:

**1. Pipeline Architecture Diagram** (text)

**2. Python Code** (with these libraries preferred: pandas / polars, SQLAlchemy, logging)

\`\`\`python
# Complete pipeline code with:
# - Extraction function
# - Transformation function  
# - Validation function (schema checks, null checks, range checks)
# - Loading function
# - Orchestration with error handling
# - Structured logging
\`\`\`

**3. Schema Validation Rules**
What checks to run before loading data.

**4. Error Handling Strategy**
- Dead letter queue for failed records
- Retry logic with exponential backoff
- Alerting on pipeline failure

**5. Idempotency Design**
How to run the pipeline multiple times safely without duplicate data.

**6. Monitoring Checklist**
- Metrics to track per run
- Alert thresholds`
  },

  // ─────────────── RESUME & CAREER ───────────────
  {
    id: 34,
    title: "ATS-Optimized Resume Writer",
    category: "career",
    useCase: "Job Applications & Resume Writing",
    featured: true,
    description: "Write a powerful, ATS-beating resume that gets past filters and impresses hiring managers.",
    prompt: `You are a professional resume writer and career coach. Rewrite my resume for maximum impact.

My Background:
- Current/Most Recent Role: [TITLE at COMPANY]
- Years of Experience: [NUMBER]
- Target Role: [ROLE YOU'RE APPLYING FOR]
- Target Companies: [TYPE OR SPECIFIC COMPANIES]
- Key Skills: [TOP 8-10 SKILLS]
- Biggest Accomplishments: [LIST 3-5 WITH NUMBERS IF POSSIBLE]

Paste your current resume (or bullet points): [PASTE HERE]

Job Description to Target: [PASTE JD OR KEY REQUIREMENTS]

Deliver:

**1. ATS Analysis**
- Keywords from JD I should include
- Keywords I'm missing
- ATS score estimate (rough)

**2. Rewritten Resume Sections**

*Professional Summary* (3 sentences: who you are, value prop, target role)

*Experience Section* (for each role)
- Company | Title | Dates
- 4-5 bullets using: Action verb + Task + Result + Scale
- Quantify everything possible

*Skills Section* — organized by category, ATS-optimized order

**3. Cover Letter Opening Paragraph** (attention-grabbing hook for this role)

**4. LinkedIn Headline Options** (5 variations)`
  },
  {
    id: 35,
    title: "Job Interview Preparation Coach",
    category: "career",
    useCase: "Interview Prep & Practice",
    featured: false,
    description: "Prepare for any job interview with tailored questions, STAR answers, and negotiation tactics.",
    prompt: `You are an executive career coach and interview strategist. Prepare me for this interview.

My Background: [BRIEF BACKGROUND]
Role I'm Interviewing For: [TITLE at COMPANY]
Interview Type: [HR screening / Technical / Behavioral / Panel / Case]
Company Stage: [Startup / Mid-size / Enterprise / FAANG]
Round: [1st / 2nd / Final]

Deliver:

**1. Company Research Brief** (what to know walking in)
- Business model and revenue
- Recent news and challenges
- Culture signals from reviews

**2. Role-Specific Questions** (20 likely questions)
- 7 behavioral (STAR format hints for each)
- 7 technical/functional
- 3 culture/fit
- 3 leadership/strategy (if senior)

**3. Your STAR Stories Bank**
Help me structure 5 stories from my background for common themes:
- Leadership / influence
- Conflict or failure
- Innovation / initiative
- Data-driven decision
- Cross-functional collaboration

**4. Questions to Ask Them** (ranked by impact)
Questions that show strategic thinking, not just curiosity.

**5. Salary Negotiation Script**
- What to say when they ask your expected salary
- Counter-offer framework
- Non-salary negotiation items

**6. Red Flags to Watch For**
Signs this role/company might be a wrong fit.`
  },
  {
    id: 36,
    title: "LinkedIn Profile Optimizer",
    category: "career",
    useCase: "Personal Branding & LinkedIn",
    featured: false,
    description: "Optimize your LinkedIn profile to attract recruiters, inbound leads, and speaking opportunities.",
    prompt: `You are a LinkedIn personal branding expert. Optimize my profile to attract [GOAL: jobs / clients / speaking / investors].

My Details:
- Name: [NAME]
- Current Title: [ROLE at COMPANY]
- Industry: [INDUSTRY]
- Target: [What do you want LinkedIn to do for you?]
- Top 3 skills/expertise: [LIST]
- Notable accomplishments: [LIST]

Rewrite:

**1. Headline** (220 chars)
5 variations — from conversational to keyword-heavy. Avoid: "Looking for new opportunities"

**2. About Section** (2,600 chars max)
Structure: Hook (2 lines) → Credibility story → What you do specifically → Who you help → CTA
Write in first person, conversational, no fluff.

**3. Featured Section Strategy**
What to pin (3 items) and why.

**4. Experience Bullets**
For current role: 5 bullets with impact metrics.

**5. Skills Section**
Top 20 skills to add, ordered by relevance to your goal.

**6. Engagement Strategy**
- What type of content to post (3 content pillars)
- Best posting cadence
- How to engage with target people's content

**7. Connection Request Template**
Personalized outreach message that gets accepted.`
  },
  {
    id: 37,
    title: "Career Change Roadmap",
    category: "career",
    useCase: "Career Transition Planning",
    featured: false,
    description: "Build a realistic career transition plan from your current field to your target industry.",
    prompt: `You are a career transition strategist. Help me plan my career change.

Current Situation:
- Current Role/Field: [ROLE + INDUSTRY]
- Years of Experience: [YEARS]
- Target Field/Role: [WHERE YOU WANT TO GO]
- Timeline: [6 months / 1 year / 2 years]
- Constraints: [Can't quit job / Have family / Location-bound / Budget]

Deliver:

**1. Transferable Skills Audit**
- Skills from current career that transfer directly
- Skills that transfer with framing
- Skills gaps to close (prioritized)

**2. Bridge Strategy**
How to position current experience as relevant (not starting over).

**3. 90-Day Action Plan**
Month 1: [Learning + networking actions]
Month 2: [Portfolio building + visibility actions]
Month 3: [Applying + interviewing actions]

**4. Learning Path**
- Skills to acquire (in order)
- Certifications worth pursuing (ROI-positive ones only)
- Portfolio projects to demonstrate skills

**5. Networking Strategy**
- Who to connect with (role types, not just companies)
- What to say (elevator pitch for your transition story)
- Communities / events to join

**6. Financial Planning**
- Income gap to plan for
- Timeline to first offer in new field`
  },

  // ─────────────── MARKETING & SALES ───────────────
  {
    id: 38,
    title: "Go-to-Market Strategy Builder",
    category: "marketing",
    useCase: "Product Launch & GTM Planning",
    featured: true,
    description: "Build a comprehensive GTM strategy with ICP definition, messaging, channels, and launch plan.",
    prompt: `You are a Chief Marketing Officer with multiple successful product launches. Build a GTM strategy for:

Product: [PRODUCT NAME]
What it does: [DESCRIPTION]
Price: [$PRICE / PRICING MODEL]
Stage: [Pre-launch / Launch / Post-launch growth]
Budget: [$BUDGET or 'BOOTSTRAPPED']
Timeline to Launch: [TIMEFRAME]

Deliver a complete GTM strategy:

**1. Ideal Customer Profile (ICP)**
- Company firmographics (if B2B)
- Personal psychographics (pain points, goals, fears)
- Where they spend time online
- How they currently solve this problem

**2. Positioning Statement**
For [ICP], [Product] is the [category] that [key benefit] unlike [alternatives].

**3. Messaging Architecture**
- Tagline (under 10 words)
- Value proposition (2 sentences)
- 3 key messages with proof points per message

**4. Channel Strategy** (ranked by expected ROI)
For each channel:
- Expected CAC
- Time to first results
- Content/format required

**5. Launch Sequence** (week-by-week for 8 weeks)

**6. Success Metrics**
- Week 1 targets
- Month 1 targets
- Month 3 targets`
  },
  {
    id: 39,
    title: "Cold Email Sequence Writer",
    category: "marketing",
    useCase: "B2B Sales & Outreach",
    featured: false,
    description: "Write a 5-email cold outreach sequence with high reply rates for B2B sales.",
    prompt: `You are a B2B sales expert and email copywriter. Write a 5-email cold outreach sequence.

Sender Context:
- Your Company: [COMPANY]
- What you sell: [PRODUCT/SERVICE]
- Your ICP: [TARGET CUSTOMER]
- Unique value: [WHY YOU'RE DIFFERENT]
- Case study/proof: [YOUR BEST RESULT WITH A CLIENT]

Target Prospect:
- Title: [DECISION MAKER ROLE]
- Company Size: [SIZE]
- Industry: [INDUSTRY]
- Pain Point: [WHAT KEEPS THEM UP AT NIGHT]

Write 5 emails:

**Email 1: The Hook (Day 1)**
- Subject: [3 options]
- Opening: hyper-personalized (use their company/recent news)
- Value prop: one sentence
- CTA: low friction (15-min call)

**Email 2: The Case Study (Day 3)**
- Subject: [2 options]
- Social proof story: [Company] went from [before] to [after] in [time]

**Email 3: The Insight (Day 6)**
- Subject: [2 options]
- Share a counterintuitive insight relevant to their industry

**Email 4: The Resource (Day 10)**
- Subject: [2 options]
- Offer a free tool/template/guide with no strings

**Email 5: The Breakup (Day 15)**
- Subject: "Closing the loop"
- Graceful exit that often generates replies

Rule: No "I hope this email finds you well." Open with THEM, not you.`
  },
  {
    id: 40,
    title: "Sales Page Copywriter",
    category: "marketing",
    useCase: "Landing Pages & Sales Copy",
    featured: false,
    description: "Write high-converting sales page copy using proven persuasion frameworks.",
    prompt: `You are a direct response copywriter. Write a complete sales page for:

Product/Service: [NAME]
Price: [$PRICE]
Target Customer: [WHO BUYS THIS]
Core Transformation: [From X → To Y]
Biggest Objection: [WHAT STOPS PEOPLE FROM BUYING]
Proof Elements Available: [Testimonials / Case studies / Certifications / Media features]

Write the complete sales page copy:

**HEADLINE (3 options)**
Formula: [Outcome] + [Timeframe] + [Objection crusher]

**SUBHEADLINE**
Expand the promise, add specificity.

**ABOVE THE FOLD CTA**
Button text + micro-copy below button.

**PROBLEM SECTION**
Agitate the pain in vivid, empathetic language. Make them feel seen.

**SOLUTION INTRODUCTION**
Introduce your product as the inevitable answer.

**BENEFITS SECTION** (not features)
6 benefits using: "[Feature] so that [emotional outcome]"

**SOCIAL PROOF SECTION**
Template for 3 different testimonial formats.

**HOW IT WORKS**
3-step simple process (make it feel easy)

**OBJECTION HANDLING**
FAQ section addressing top 5 objections

**GUARANTEE SECTION**
Write a bold, specific guarantee

**CLOSING CTA + URGENCY**
Final call to action with scarcity/urgency element

**P.S.**
The P.S. is the second most-read element. Make it count.`
  },
  {
    id: 41,
    title: "Brand Voice & Style Guide",
    category: "marketing",
    useCase: "Brand Building & Consistency",
    featured: false,
    description: "Define a comprehensive brand voice, tone, and communication style guide for your business.",
    prompt: `You are a brand strategist. Create a complete brand voice and style guide for:

Brand: [BRAND NAME]
Industry: [INDUSTRY]
Products/Services: [WHAT YOU OFFER]
Target Audience: [IDEAL CUSTOMER]
Current Personality (if existing brand): [HOW YOU DESCRIBE YOURSELF NOW]
Competitors: [3 COMPETITORS]

Deliver a brand guide document:

**1. Brand Personality**
4 core adjectives + what they mean in practice.
For each: "We are [X]. This means we [behavior]. We are NOT [opposite]."

**2. Voice Dimensions**
Rate on spectrum for each (and give examples):
- Formal ←→ Casual
- Serious ←→ Playful  
- Traditional ←→ Innovative
- Expert ←→ Accessible

**3. Tone Variations by Context**
- Social media tone
- Customer support tone
- Sales/marketing tone
- Error messages / bad news tone

**4. Vocabulary Guide**
- Power words to use
- Words to NEVER use
- Industry jargon: embrace or avoid?

**5. Writing Rules**
- Sentence length guideline
- Paragraph length
- Punctuation personality (Oxford comma? Em dashes? Exclamation points?)

**6. Before/After Examples**
5 before (generic) vs. after (on-brand) rewrites`
  },
  {
    id: 42,
    title: "SEO Keyword Strategy Builder",
    category: "marketing",
    useCase: "SEO & Organic Growth",
    featured: false,
    description: "Build a comprehensive keyword strategy with cluster mapping, prioritization, and content calendar.",
    prompt: `You are an SEO strategist. Build a keyword strategy for:

Website: [DOMAIN OR BUSINESS TYPE]
Industry: [INDUSTRY]
Target Audience: [WHO YOU'RE TRYING TO REACH]
Current Domain Authority (if known): [DA SCORE or 'UNKNOWN']
Main Competitors: [2-3 COMPETITOR DOMAINS]
Business Goal: [Lead gen / E-commerce / Brand awareness / SaaS signups]

Deliver:

**1. Keyword Research Framework**
- Seed keywords (10 core terms)
- Intent categories: Informational / Commercial / Transactional / Navigational

**2. Keyword Clusters** (organize into topic pillars)
Pillar 1: [Topic] → cluster keywords (5-8 per pillar)
Build 4-5 pillars.

**3. Priority Matrix**
For top 20 keywords rate:
- Search volume (H/M/L)
- Difficulty (H/M/L)
- Business value (H/M/L)
- Quick win potential (Y/N — under DA 40 can rank)

**4. Content Calendar** (12-week plan)
Week 1: [Target keyword] → [Content type] → [Word count]

**5. On-Page SEO Checklist**
Non-negotiables for every page.

**6. Link Building Strategy**
- 5 link acquisition tactics for this niche
- Anchor text distribution guide

**7. Tracking Setup**
- KPIs to track
- Tools recommended
- 90-day milestone targets`
  },

  // Additional prompts to reach 52 ───────────────
  {
    id: 43,
    title: "Product Requirements Document",
    category: "business",
    useCase: "Product Management & Feature Specs",
    featured: false,
    description: "Write a comprehensive PRD that aligns engineering, design, and business stakeholders.",
    prompt: `You are a Senior Product Manager. Write a complete Product Requirements Document (PRD) for:

Feature/Product: [FEATURE NAME]
Problem Statement: [WHAT PROBLEM THIS SOLVES]
Target Users: [USER SEGMENT]
Success Metrics: [HOW WE MEASURE SUCCESS]
Timeline: [EXPECTED DELIVERY DATE]

PRD Structure:

**1. Executive Summary** (3 sentences max)
**2. Problem & Opportunity**
   - User pain points (with supporting data/research)
   - Business opportunity and strategic alignment
**3. Goals & Non-Goals**
   - In scope: [explicit list]
   - Out of scope: [explicit list]
**4. User Stories**
   Format: "As a [user type], I want to [action], so that [outcome]"
   Write 8-10 user stories, ranked by priority.
**5. Functional Requirements**
   Must-have / Should-have / Nice-to-have (MoSCoW method)
**6. Non-Functional Requirements**
   - Performance SLAs
   - Security requirements
   - Accessibility standards
**7. UI/UX Considerations**
   - Key user flows
   - Edge cases to handle
**8. Dependencies & Risks**
   - Technical dependencies
   - Risk register with mitigation
**9. Launch Plan**
   - Beta / GA criteria
   - Rollout strategy
**10. Open Questions**
    Items that need resolution before development starts`
  },
  {
    id: 44,
    title: "OKR Framework Designer",
    category: "business",
    useCase: "Team Goal Setting & Alignment",
    featured: false,
    description: "Create a quarterly OKR framework with cascading objectives and measurable key results.",
    prompt: `You are an OKR facilitator. Design a quarterly OKR framework for:

Company/Team: [COMPANY OR TEAM NAME]
Quarter: [Q1/Q2/Q3/Q4 YEAR]
Company Stage: [Startup / Scale-up / Enterprise]
Team Size: [SIZE]
Strategic Priority: [TOP PRIORITY THIS QUARTER]

Design the OKR structure:

**Company-Level OKRs (1-3 objectives)**
Objective: [Ambitious, qualitative goal]
  KR1: [Quantitative, measurable result] — Owner: [ROLE]
  KR2: [Quantitative, measurable result] — Owner: [ROLE]
  KR3: [Quantitative, measurable result] — Owner: [ROLE]

**Department-Level Cascades**
Show how 2 departments cascade from company OKRs.

**OKR Quality Checklist**
For each KR, verify:
- Is it binary or measured 0-100%?
- Is it ambitious enough (60-70% achievement = success)?
- Is it specific enough to avoid gaming?

**Scoring Guide**
0.0-0.3: Didn't make progress
0.4-0.6: Made progress but fell short
0.7-1.0: Delivered

**Review Cadence**
- Weekly: 5-min check-in format
- Monthly: deeper review template
- End of quarter: retrospective questions

**Common OKR Mistakes to Avoid** (with examples from your context)`
  },
  {
    id: 45,
    title: "Frontend Component Architecture",
    category: "coding",
    useCase: "React / Angular Design System",
    featured: false,
    description: "Design a scalable frontend component architecture with design tokens and pattern library.",
    prompt: `You are a Frontend Architect. Design a scalable component architecture for:

Framework: [React / Angular / Vue]
App Type: [SaaS dashboard / E-commerce / Content site / Mobile app]
Team Size: [DEVELOPERS]
Design Tool: [Figma / Sketch / Other]
Current Problem: [WHAT'S MESSY OR PAINFUL NOW]

Design:

**1. Component Hierarchy**
Atoms → Molecules → Organisms → Templates → Pages
(Give 3-5 examples at each level for your app type)

**2. Design Token System**
\`\`\`
colors: { primary, secondary, neutral, semantic }
spacing: { xs, sm, md, lg, xl, 2xl }
typography: { fontFamily, fontSize, fontWeight, lineHeight }
borders: { radius, width }
shadows: { sm, md, lg }
\`\`\`

**3. Folder Structure**
\`\`\`
src/
  components/
    ui/       ← pure presentational
    features/ ← business logic components
    layout/   ← page structure
  hooks/
  stores/
  services/
\`\`\`

**4. Component Contract Pattern**
Standard interface for all components (props, events, slots)

**5. State Management Strategy**
Local / shared / server state — what lives where

**6. Performance Patterns**
- Lazy loading strategy
- Memoization rules
- Bundle splitting approach`
  },
  {
    id: 46,
    title: "AI Content Repurposer",
    category: "content",
    useCase: "Content Repurposing & Distribution",
    featured: false,
    description: "Repurpose one piece of long-form content into 10+ formats for multi-channel distribution.",
    prompt: `You are a content strategist. Repurpose this content into maximum distribution formats.

Source Content: [PASTE YOUR BLOG POST / VIDEO TRANSCRIPT / PODCAST NOTES]
Original Format: [Blog / Video / Podcast / Webinar]
Target Platforms: [Select: LinkedIn / Twitter / Instagram / Newsletter / YouTube Shorts / TikTok]

Transform into:

**1. Twitter/X Thread** (10 tweets from the key insights)
**2. LinkedIn Long-form Post** (professional angle, 300-500 words)
**3. Instagram Carousel** (10 slides — headline + 1 insight per slide)
**4. Newsletter Section** (200 words, conversational)
**5. YouTube Shorts Script** (60 seconds — hook, 3 points, CTA)
**6. TikTok/Reels Hook Lines** (5 options, first 3 seconds)
**7. Podcast Episode Teaser** (30-second audio script)
**8. Quora/Reddit Answer** (community-appropriate, value-first)
**9. Email Subject Lines** (5 options based on key themes)
**10. Pull Quotes for Graphics** (5 standalone quote images)

For each format: note the platform-specific optimization applied.`
  },
  {
    id: 47,
    title: "Technical Documentation Writer",
    category: "coding",
    useCase: "API Docs & Developer Experience",
    featured: false,
    description: "Write clear, comprehensive technical documentation that developers actually want to read.",
    prompt: `You are a technical writer specializing in developer documentation. Write docs for:

What to document: [API / SDK / Library / Internal tool / Architecture]
Audience: [Junior devs / Senior devs / Non-technical users]
Tech Stack: [LANGUAGES AND FRAMEWORKS INVOLVED]
Existing docs quality: [None / Poor / Needs updating]

Write the documentation:

**1. Overview Page**
- What it does (1 paragraph)
- When to use it (and when NOT to)
- Key concepts to understand first (glossary)

**2. Quick Start Guide** (get running in under 10 minutes)
\`\`\`
Step 1: Install
Step 2: Configure
Step 3: Your first [action]
\`\`\`

**3. Core API Reference** (for top 5 endpoints/functions)
For each:
- Description
- Parameters (name, type, required, description)
- Request example
- Response example
- Error codes

**4. Common Recipes / How-to Guides**
5 common use cases with complete working code.

**5. Troubleshooting Guide**
Top 10 error messages + how to fix them.

**6. Changelog Template**
Format for communicating breaking changes vs. additions.

Writing rules: Short sentences. Active voice. Code examples for everything.`
  },
  {
    id: 48,
    title: "A/B Test Strategy Designer",
    category: "marketing",
    useCase: "Conversion Rate Optimization",
    featured: false,
    description: "Design rigorous A/B tests with proper hypothesis, sample size, and statistical significance.",
    prompt: `You are a CRO (Conversion Rate Optimization) expert and data scientist. Design an A/B test for:

What to Test: [ELEMENT: headline / CTA / pricing / layout / email subject / etc.]
Goal Metric: [WHAT YOU WANT TO IMPROVE: clicks / signups / purchases]
Current Baseline: [CURRENT CONVERSION RATE]
Current Traffic: [MONTHLY VISITORS / EMAIL LIST SIZE]
Business Hypothesis: [WHY YOU THINK THE CHANGE WILL WORK]

Design the test:

**1. Hypothesis Statement**
"We believe that [change] will result in [outcome] because [reasoning]. We will know this is true when [metric] changes by [X%] within [timeframe]."

**2. Test Design**
- Control (A): [Current version]
- Variant (B): [New version — describe specifically]
- What ONLY changes between A and B (isolation principle)

**3. Statistical Planning**
- Minimum detectable effect (MDE): what % change is worth detecting?
- Required sample size per variant (show calculation)
- Expected test duration in days

**4. Segmentation**
- Who is included in this test?
- Any user segments to exclude?
- Randomization approach

**5. Success Criteria**
- Primary metric (with statistical significance target: p < 0.05)
- Secondary metrics to watch
- Guardrail metrics (what would make us stop the test?)

**6. Analysis Plan**
- When to check results (and why not to peek early)
- What to do if results are inconclusive`
  },
  {
    id: 49,
    title: "Personal Finance Planner",
    category: "productivity",
    useCase: "Financial Planning & Budgeting",
    featured: false,
    description: "Build a comprehensive personal financial plan with budgeting, investing, and wealth milestones.",
    prompt: `You are a certified financial planner. Help me build a financial plan.

My Situation:
- Age: [AGE]
- Monthly Income (take-home): [$AMOUNT]
- Monthly Expenses (rough): [$AMOUNT]
- Current Savings: [$AMOUNT]
- Debt: [TYPE + AMOUNT + INTEREST RATE]
- Financial Goals: [List 1-3: house / retirement / emergency fund / etc.]
- Risk Tolerance: [Conservative / Moderate / Aggressive]
- Country: [COUNTRY — for tax considerations]

Note: This is for educational planning only. Consult a licensed advisor for personal advice.

Deliver:

**1. Financial Health Snapshot**
- Savings rate: [calculated]
- Debt-to-income ratio: [calculated]
- Emergency fund status: [X months covered]

**2. Budget Framework** (50/30/20 or custom)
- Needs (50%): what goes here
- Wants (30%): what goes here
- Savings/Debt (20%): allocation breakdown

**3. Debt Payoff Strategy**
- Avalanche vs. Snowball recommendation for your debt
- Month-by-month payoff timeline

**4. Investment Strategy**
- Emergency fund target first
- Then: investment account priority order
- Asset allocation suggestion for your risk tolerance
- Index fund strategy basics

**5. 5-Year Milestone Map**
Year 1-5: specific targets for savings, debt, net worth

**6. One Optimization Move**
The single highest-impact change to make this month.`
  },
  {
    id: 50,
    title: "Market Entry Analysis",
    category: "business",
    useCase: "Expansion & New Market Strategy",
    featured: false,
    description: "Analyze a new market opportunity with TAM sizing, competitive landscape, and entry strategy.",
    prompt: `You are a strategy consultant. Analyze this market entry opportunity.

Company Context:
- Company: [YOUR COMPANY + CURRENT BUSINESS]
- Market to Enter: [NEW MARKET / GEOGRAPHY / SEGMENT]
- Strategic Rationale: [WHY THIS MARKET]
- Resources Available: [$BUDGET + TEAM SIZE]
- Timeline: [WHEN YOU NEED TO BE OPERATIONAL]

Deliver a market entry analysis:

**1. Market Sizing**
- TAM: Total addressable market (methodology)
- SAM: Serviceable addressable market
- SOM: Realistically capturable in Year 1-3

**2. Competitive Landscape**
- Incumbents and their market share
- Your competitive advantage in THIS market
- Barriers to entry you face

**3. Customer Validation**
- Are the target customers the same or different from current?
- Key questions to validate before committing capital

**4. Entry Strategy Options** (3 paths with trade-offs)
- Option A: [e.g., Direct sales] — Risk / Reward / Timeline
- Option B: [e.g., Partnership / channel] — Risk / Reward / Timeline
- Option C: [e.g., Acquisition] — Risk / Reward / Timeline

**5. Recommended Path**
Pick one with clear rationale.

**6. 12-Month Plan**
- Months 1-3: Validation phase
- Months 4-6: Pilot phase
- Months 7-12: Scale phase

**7. Kill Criteria**
Under what conditions should you exit this market?`
  },
  {
    id: 51,
    title: "Mental Model Teacher",
    category: "productivity",
    useCase: "Strategic Thinking & Decision Making",
    featured: false,
    description: "Learn and apply any mental model with examples, exercises, and anti-patterns.",
    prompt: `You are a cognitive scientist and strategic thinking coach. Teach me this mental model:

Mental Model: [e.g., First Principles Thinking / Inversion / Second-Order Effects / Opportunity Cost / etc.]
My Background: [WHAT YOU DO]
Application Area: [PROBLEM OR DECISION YOU'RE TRYING TO SOLVE]

Teach it comprehensively:

**1. Core Concept** (explain like I'm smart but unfamiliar)
- What it is in 2 sentences
- Where it came from and who uses it (physicists / investors / generals)

**2. How It Works** (step-by-step process)
When should I use this? What do I do first, second, third?

**3. Classic Examples** (3)
- Famous historical application
- Business application
- Everyday life application

**4. Applied to MY Situation**
Walk through applying this model to: [USER'S SPECIFIC PROBLEM]

**5. Common Mistakes** (anti-patterns)
How people misapply this model or use it when they shouldn't.

**6. Combinations**
What other mental models pair powerfully with this one?

**7. Practice Exercise**
One exercise I can do today to internalize this model.

**8. One-Line Summary**
How to remember and explain this model in one sentence.`
  },
  {
    id: 52,
    title: "Crisis Communication Plan",
    category: "marketing",
    useCase: "PR Crisis Management",
    featured: false,
    description: "Prepare a crisis communication plan with response templates, escalation paths, and recovery strategy.",
    prompt: `You are a crisis communications expert. Build a response plan for:

Company: [COMPANY NAME]
Crisis Scenario: [DESCRIBE THE CRISIS: data breach / product failure / PR scandal / service outage]
Stakeholders Affected: [Customers / Investors / Employees / Public]
Severity Level: [Low (contained) / Medium (public) / High (viral/legal)]
Hours Since Incident: [HOW LONG AGO IT HAPPENED]

Build the crisis playbook:

**1. Immediate Actions (First 2 Hours)**
- Internal war room: who must be in the room
- What to stop doing immediately
- Information gathering checklist

**2. Stakeholder Communication Map**
Who gets informed, in what order, through what channel.

**3. Official Statement Templates**

*Initial holding statement* (before full facts known):
[TEMPLATE — acknowledge without admitting liability]

*Full public statement* (once facts confirmed):
[TEMPLATE — take responsibility + action plan]

*Customer direct communication:*
[EMAIL TEMPLATE]

*Employee communication:*
[INTERNAL MEMO TEMPLATE]

**4. Social Media Response Protocol**
- What to post (and what NOT to post)
- How to handle inbound comments
- When to go dark vs. stay active

**5. Media Response**
- What to say if called by press
- What NOT to say (common mistakes)

**6. Recovery Timeline**
- Week 1: Damage control
- Month 1: Trust rebuilding actions
- Month 3: Reputation assessment and long-term plan`
  }
];

// ── State ─────────────────────────────────────────────────────
let currentFilter = 'all';
let currentSearch = '';

// ── DOM Refs ──────────────────────────────────────────────────
const searchInput = document.getElementById('searchInput');
const searchCount = document.getElementById('searchCount');
const promptGrid = document.getElementById('promptGrid');
const featuredGrid = document.getElementById('featuredGrid');
const noResults = document.getElementById('noResults');
const resultsBadge = document.getElementById('resultsBadge');
const libraryTitle = document.getElementById('libraryTitle');
const themeToggle = document.getElementById('themeToggle');
const menuBtn = document.getElementById('menuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const toast = document.getElementById('toast');

// ── Theme ─────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('pf-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('pf-theme', next);
});

// ── Mobile Menu ───────────────────────────────────────────────
menuBtn.addEventListener('click', () => {
  mobileDrawer.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar') && !e.target.closest('.mobile-drawer')) {
    mobileDrawer.classList.remove('open');
  }
});

// ── Toast ─────────────────────────────────────────────────────
let toastTimer;
function showToast() {
  clearTimeout(toastTimer);
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}

// ── Copy to Clipboard ─────────────────────────────────────────
async function copyPrompt(promptText, btn) {
  try {
    await navigator.clipboard.writeText(promptText);
    btn.textContent = '✓';
    btn.classList.add('copied');
    showToast();
    setTimeout(() => {
      btn.textContent = '⎘';
      btn.classList.remove('copied');
    }, 2000);
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = promptText;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = '✓';
    btn.classList.add('copied');
    showToast();
    setTimeout(() => {
      btn.textContent = '⎘';
      btn.classList.remove('copied');
    }, 2000);
  }
}

// ── Create Prompt Card ────────────────────────────────────────
function createCard(prompt, isFeatured = false) {
  const card = document.createElement('div');
  card.className = `prompt-card${isFeatured ? ' featured' : ''}`;

  const previewText = prompt.prompt
    .replace(/\*\*/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, 200) + '...';

  card.innerHTML = `
    <div class="card-header">
      <div class="card-meta">
        <div class="card-tags">
          <span class="cat-tag ${prompt.category}">${getCategoryLabel(prompt.category)}</span>
          ${isFeatured ? '<span class="featured-badge">★ Featured</span>' : ''}
        </div>
        <div class="card-title">${prompt.title}</div>
      </div>
      <button class="copy-btn" title="Copy prompt">⎘</button>
    </div>
    <div class="card-description">${prompt.description}</div>
    <div class="prompt-preview">${previewText}</div>
    <div class="card-footer">
      <div class="use-case-label">Use case: <span>${prompt.useCase}</span></div>
    </div>
  `;

  const copyBtn = card.querySelector('.copy-btn');
  copyBtn.addEventListener('click', () => copyPrompt(prompt.prompt, copyBtn));

  return card;
}

function getCategoryLabel(cat) {
  const labels = {
    coding: '⟨/⟩ Coding',
    business: '◈ Business',
    content: '✦ Content',
    productivity: '◎ Productivity',
    'ai-agents': '⚡ AI Agents',
    data: '▦ Data',
    career: '▲ Career',
    marketing: '◆ Marketing'
  };
  return labels[cat] || cat;
}

// ── Get Category Title ────────────────────────────────────────
function getCategoryTitle(cat) {
  const titles = {
    all: 'All Prompts',
    coding: 'Coding Prompts',
    business: 'Business & Startups',
    content: 'Content Creation',
    productivity: 'Productivity & Learning',
    'ai-agents': 'AI Agents & Automation',
    data: 'Data Analysis',
    career: 'Resume & Career',
    marketing: 'Marketing & Sales'
  };
  return titles[cat] || 'All Prompts';
}

// ── Filter & Render ───────────────────────────────────────────
function getFilteredPrompts() {
  return PROMPTS.filter(p => {
    const matchesCat = currentFilter === 'all' || p.category === currentFilter;
    const q = currentSearch.toLowerCase();
    const matchesSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.useCase.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });
}

function renderPrompts() {
  const filtered = getFilteredPrompts();
  const nonFeatured = filtered.filter(p => !p.featured);

  promptGrid.innerHTML = '';
  noResults.style.display = 'none';

  if (nonFeatured.length === 0 && filtered.length === 0) {
    noResults.style.display = 'block';
  }

  nonFeatured.forEach((p, i) => {
    const card = createCard(p, false);
    card.style.animationDelay = `${i * 30}ms`;
    promptGrid.appendChild(card);
  });

  // Count
  const count = filtered.length;
  resultsBadge.textContent = `${count} result${count !== 1 ? 's' : ''}`;
  searchCount.textContent = `${count} prompt${count !== 1 ? 's' : ''}`;
  libraryTitle.textContent = getCategoryTitle(currentFilter);
}

function renderFeatured() {
  const featured = PROMPTS.filter(p => p.featured);
  featuredGrid.innerHTML = '';
  featured.forEach(p => {
    featuredGrid.appendChild(createCard(p, true));
  });
}

// ── Category Filter ───────────────────────────────────────────
function handleCatClick(e) {
  const btn = e.target.closest('.nav-cat');
  if (!btn) return;

  const filter = btn.dataset.filter;
  if (!filter) return;

  currentFilter = filter;
  currentSearch = '';
  searchInput.value = '';

  // Update all nav-cat active states (both desktop and mobile)
  document.querySelectorAll('.nav-cat').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });

  // Show/hide featured section
  const featuredSection = document.getElementById('featuredSection');
  if (filter === 'all' && !currentSearch) {
    featuredSection.style.display = 'block';
  } else {
    featuredSection.style.display = 'none';
  }

  renderPrompts();
  mobileDrawer.classList.remove('open');

  // Scroll to library
  if (filter !== 'all') {
    document.querySelector('.library-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

document.getElementById('navCategories').addEventListener('click', handleCatClick);
document.getElementById('mobileDrawer').addEventListener('click', handleCatClick);

// ── Search ────────────────────────────────────────────────────
let searchTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentSearch = e.target.value.trim();
    currentFilter = 'all';

    document.querySelectorAll('.nav-cat').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === 'all');
    });

    const featuredSection = document.getElementById('featuredSection');
    featuredSection.style.display = currentSearch ? 'none' : 'block';

    renderPrompts();
  }, 150);
});

// ── Navbar scroll effect ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });

// ── Init ──────────────────────────────────────────────────────
initTheme();
renderFeatured();
renderPrompts();