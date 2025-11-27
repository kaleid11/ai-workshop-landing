// New Wiki Guides to Add to WIKI_GUIDES array
// Insert these before the closing ]; on line 1824

  {
    id: "notebooklm-guide",
    title: "NotebookLM Complete Guide",
    description: "Master Google's AI research assistant - upload documents, chat with your data, and use Canvas for synthesis",
    category: "AI Tools",
    content: `# NotebookLM Complete Guide

**Your Personalized AI Research Assistant**

NotebookLM allows you to upload your own documents (PDFs, Google Docs, Slides, Web URLs) and use a powerful AI model to understand, summarize, and brainstorm specifically based on *your* sources.

---

## Phase 1: Grounding the AI (The Setup)

Before you write, you must feed the brain. NotebookLM is unique because it "grounds" its answers in the documents you provide, reducing hallucinations.

1. **Create a Notebook:** Go to notebooklm.google.com and click **New Notebook**.  
2. **Add Sources:** Click the **(+)** icon on the left sidebar.  
   * *Supported:* Google Drive, PDF, Text files, Copied Text, Website URLs.  
   * *Tip:* You can upload up to 50 sources per notebook.  
3. **Review the Summary:** NotebookLM will instantly generate a summary and suggested questions based on your upload.

---

## Phase 2: Investigation (The Chat)

Use the chat box at the bottom of the screen to interrogate your data.

* **Ask Specifics:** "What does the document say about Q3 revenue?"  
* **Get Citations:** Every answer includes citation numbers. Hover over them to see the exact quote from your source document highlighted.  
* **Generate Audio:** Click the "Audio Overview" to hear two AI hosts discuss your material (great for learning on the go).

---

## Phase 3: Synthesis & Creation (Using Canvas)

This is where NotebookLM shifts from a "reader" to a "writer." The **Canvas** is a persistent workspace (usually on the right side) where you save notes and draft content.

### 1. Saving to Canvas

You don't just chat; you curate. When the AI gives you a good answer:

* Hover over the response in the chat.  
* Click the **"Save to Note"** (pin icon).  
* This saves the response as a focused card in your Canvas area.

### 2. Managing Notes

* **Group & Organize:** You can select multiple saved notes in the Canvas.  
* **Edit Manually:** Click any note to rewrite it or add your own thoughts.

### 3. AI Actions in Canvas (The Power Move)

Once you have several notes selected in the Canvas, NotebookLM offers specific **Suggested Actions** at the bottom of the screen:

* **Summarize:** Creates a master summary of all selected notes.  
* **Combine:** Merges distinct notes into one cohesive text.  
* **Critique:** The AI reviews your notes/draft and suggests improvements.  
* **Create Outline/Study Guide:** Turns your raw notes into a structured format.

---

## Comparison: Chat vs. Canvas

| Feature | The Chat (Left Side) | The Canvas (Right Side) |
| :---- | :---- | :---- |
| **Goal** | Quick answers & exploration. | Synthesis, drafting & organizing. |
| **Persistence** | Scrolls away like a standard chat. | Permanent cards and docs until deleted. |
| **AI Role** | Answering questions. | Transforming & formatting content. |

---

## 💡 Pro Tips

* **The "Notepad" Strategy:** You can create a blank note in the Canvas and paste instructions or rough ideas there. Select that note along with a source document and ask the AI to "Combine these."  
* **Audio to Text:** Generate the Audio Overview, then ask the Chat to "Summarize the conversation between the hosts." Save *that* to your Canvas for a meta-summary.  
* **Verification:** Always click the citation numbers. NotebookLM is accurate, but verifying the source context is best practice.

---

**Ready to research smarter?** Visit [notebooklm.google.com](https://notebooklm.google.com) to get started!
`,
    icon: "📚",
    externalLink: "https://notebooklm.google.com",
  },
  {
    id: "glassmorphism-website-builder",
    title: "Glassmorphism Website Builder Template",
    description: "Apple-inspired design system for creating premium one-page startup websites with glassmorphism aesthetics",
    category: "Design & Development",
    content: `# Glassmorphism Website Builder Template

**Create World-Class One-Page Websites with Apple-Inspired Design**

This template helps you build premium, modern websites using glassmorphism aesthetics following Apple's design principles: clarity, deference, and depth.

---

## Global Design Goals

* **Feel:** Premium, calm, confident; zero clutter
* **Principles:** Clarity of hierarchy, deference (UI chrome recedes), depth (layering, blur, light)
* **Accessibility:** Semantic HTML, keyboard navigable, visible focus, WCAG AA color contrast
* **Performance:** Lightweight, lazy-load embellishments, graceful degradation with \`prefers-reduced-motion\`

---

## Brand Strategy Options

Choose one strategy to guide your design:

1. **Minimal Zen Tech** — Quiet neutrals, single cool accent, short sentences, calm motion
2. **Optimistic Innovator** — Warm highlights, human photos, welcoming microcopy, playful but restrained motion
3. **Precision Pro** — Monochrome with blue accent, metric-led copy, crisp dividers, confident tone
4. **Creative Lab** — Subtle gradients on glass, expressive typography scale, exploratory micro-interactions
5. **Trust-First Enterprise** — Conservative palette, clear compliance cues, testimonial emphasis, reduced flourish

---

## Visual Language

### Color Palettes (Pick One)

* **Night Frost:** #0B0C0F / #11131A / #7AA2FF (accent) / #EDEFF6 (text high)
* **Graphite Mist:** #0E0F12 / #151721 / #64D2FF / #FFFFFF
* **Porcelain Light:** #F7F8FA / #FFFFFF / #0E1222 / #007AFF
* **Mineral Neutral:** #0D0E10 / #1A1C24 / #A1A8B3 / #39D98A
* **Deep Navy:** #0A0D14 / #0F1420 / #8E8E93 / #FF8A3D

### Typography (System-Friendly)

* SF/Inter stack (San Francisco if available → Inter → system-ui)
* SF Compact for UI, Inter for body
* Plus Jakarta Sans (if allowed) fallback to system-ui
* Work Sans headings + Inter body
* Pure system-ui everywhere (performance-first)

### Glassmorphism Rules

* Frosted panels with 6–16px blur, 8–24px radius, subtle inner highlight, 1px translucent border
* Avoid heavy opacity; keep background content subtly visible for depth
* Use glass only where it clarifies grouping—not everywhere

### Motion Principles

* Duration 200–500ms, ease-out; respect \`prefers-reduced-motion\`
* Use motion to **explain** (enter, hierarchy shifts), not decorate

---

## Tone & Voice Options

1. **Crisp & Direct** — "Do X. Save Y. Start now."
2. **Helpful Guide** — "Here's how it works. You'll be done in minutes."
3. **Analytical** — "Reduce TTV by 42%. See methodology."
4. **Warm & Human** — "Built for teams who care about craft."
5. **Challenger** — "Stop wrestling your stack. Build what matters."

---

## Section Blueprint

### 1. Navbar (Minimal, Glass, Sticky)

**Options:**
* **A1 – Invisible Chrome:** Logo text, 3 anchors, ghost CTA; hides on scroll down, shows on scroll up
* **A2 – Centered Capsule:** Pill-style tabs centered; CTA detached right
* **A3 – Edge Breadcrumb:** Thin bar; live breadcrumb updates via section observers
* **A4 – Dual Row:** Top utility (theme/lang), second row primary nav on frosted rail
* **A5 – Floating Dock (mobile):** Bottom 4-icon dock; desktop uses compact top bar

### 2. Hero (Above-the-Fold)

**Options:**
* **B1 – Product on Stage:** Bold H1, subhead, single CTA; layered device mock on glass
* **B2 – Split Focus:** Left copy; right stack of offset glass cards with subtle parallax
* **B3 – Video Canvas:** Looping muted clip; text on translucent overlay
* **B4 – Command-K:** Command palette demo feel; primary CTA triggers real command modal
* **B5 – Social Proof First:** Frosted logo chips, tight headline, primary + "See how" secondary

### 3. Problem / Value Proposition

**Options:**
* **C1 – Before/After:** Two compact glass cards (pain vs. outcome)
* **C2 – Pain Timeline:** Four steps; hover/expand details
* **C3 – Metric Shock:** Oversized KPI (e.g., "–72% setup time") with small methodology link
* **C4 – Founder's Note:** Portrait chip + 3–4 sentence honest note
* **C5 – Customer POV:** Rotating quotes; distilled value bullets below

### 4. Features (Progressive Disclosure)

**Options:**
* **D1 – Accordions:** Short titles; expand for details, images, or code
* **D2 – Flow Chain:** Sense → Decide → Act blocks; arrows show system logic
* **D3 – Workspace Mosaic:** Masonry of mini panels; hover magnifies
* **D4 – Three Pillars:** Speed / Safety / Scale; "Advanced" toggles reveal complexity
* **D5 – JTBD Tabs:** Tabs by job; URL hash sync for deep-linking

### 5. Demo / Showcase

**Options:**
* **E1 – Live Playground:** Inputs on left, output on right; copy/share config
* **E2 – Video + Steps:** Short clip with numbered captions; keyboard hints
* **E3 – Compare Split:** "Old Way" vs "Your Way" with draggable scrubber
* **E4 – Code-First:** Collapsible code sample with inline annotations
* **E5 – Guided Story:** Stepper reveals micro-wins; progress dots

---

## Implementation Hints

### Glass & Depth

* Use layered glass panels to group content; avoid full-page frost
* Add subtle top-down light source (soft shadow below glass, faint inner highlight)
* Keep borders hairline and semi-opaque; hover states lift by 2–4px with blur increase
* Prefer line icons; imagery should be crisp, sparse, and purposeful

### Accessibility & States

* Provide focus states distinct from hover
* Ensure all CTAs are readable on glass backgrounds
* Respect \`prefers-reduced-motion\`; swap animated elements for static equivalents

---

## Configuration Template

When working with AI to build your site, provide this configuration:

\`\`\`
[Brand Name]: Your Company
[Brand Strategy Option #]: 2 (Optimistic Innovator)
[Color Palette #]: Porcelain Light
[Typography Option #]: SF/Inter stack
[Tone & Voice #]: 2 (Helpful Guide)
[Navbar A#]: A2 (Centered Capsule)
[Hero B#]: B1 (Product on Stage)
[Problem/Value C#]: C1 (Before/After)
[Features D#]: D1 (Accordions)
[Demo E#]: E2 (Video + Steps)
[Pricing F#]: F1 (Three Tiers)
[Testimonials G#]: G2 (Carousel + Ratings)
[FAQ H#]: H1 (Classic Accordion)
[CTA I#]: I1 (Primary Only)
[Footer J#]: J2 (Sitemap Columns)
[Primary CTA Label]: Start Free
[Secondary CTA Label]: See How It Works
[Top KPI + Proof Note]: 72% faster setup (based on 500 customer surveys)
[Security/Trust Notes]: SOC2 Type II, 99.9% uptime
[Logos to include]: Google, Microsoft, Salesforce
\`\`\`

---

**Ready to build?** Copy this template and paste it into your favorite AI coding assistant (Claude, ChatGPT, Cursor, etc.) along with your configuration!
`,
    icon: "🎨",
  },
  {
    id: "prompt-polisher",
    title: "Prompt Polisher (Meta-Optimizer)",
    description: "Transform messy ideas into powerful, effective ChatGPT prompts with this professional prompt engineering framework",
    category: "Business Prompts",
    content: `# Prompt Polisher (Meta-Optimizer)

**Mode:** DETAIL  
**Use for:** Turning messy ideas into powerful prompts.

## The Prompt

\`\`\`
You are a professional Prompt Engineer.  
Transform my rough idea into a clear, effective ChatGPT prompt.

GOAL: [What I want ChatGPT to do]  
CONTEXT: [Who I am, my business, target audience, goals]  
OUTPUT: [Format — list, table, email, report, etc.]  
TONE: [Professional / friendly / persuasive / concise]  
CONSTRAINTS: [Word limits, exclusions, quality bar]

Return:
1️⃣ Optimized prompt (ready to paste)  
2️⃣ 1 short variant + 1 expanded variant  
3️⃣ Quick checklist to reuse or adapt later
\`\`\`

## Implementation Tip

Use this anytime before writing content, strategies, or marketing assets — it'll multiply quality across all other prompts.

## Example Usage

**Your Rough Idea:**
"I need help writing emails to customers about our new product"

**After Prompt Polisher:**
\`\`\`
You are an email marketing expert specializing in product launches.

Write 3 announcement emails for our new project management software launching next month.

CONTEXT:
- Target audience: Small business owners (5-50 employees)
- Product: Cloud-based project management tool
- Key benefit: Saves 10 hours/week on team coordination
- Brand voice: Professional but friendly, results-focused

OUTPUT FORMAT:
For each email provide:
- Subject line (under 50 characters)
- Preview text (under 90 characters)
- Email body (200-300 words)
- Clear CTA button text

TONE: Helpful and enthusiastic, avoid hype
CONSTRAINTS: No technical jargon, focus on time savings
\`\`\`

---

**Pro Tip:** Save your best-performing prompts in a document and reuse them with minor tweaks!
`,
    icon: "✨",
  },
  {
    id: "ai-use-case-finder",
    title: "AI Use-Case Finder (Quick Wins)",
    description: "Discover high-impact AI automation opportunities for your small business with this consultant-grade analysis framework",
    category: "Business Prompts",
    content: `# AI Use-Case Finder (Quick Wins)

**Mode:** BASIC  
**Use for:** Finding where AI can save time or money.

## The Prompt

\`\`\`
Act as an AI consultant for a small business.

Business type: [e.g. local café, e-commerce store, agency]  
Top 3 pain points: [List them clearly]

List 5 high-impact AI use cases.  
For each, include:
- Description (what AI does)  
- Time or cost savings  
- First action step  
- Tools to try  
- Impact × Ease score (1–5 each)
\`\`\`

## Implementation Tip

Rerun every 3 months as your operations evolve. Helps identify automation opportunities early.

## Example Output

**Business:** Local café with 3 locations

**Use Case 1: Automated Social Media Posting**
- **Description:** AI generates daily posts showcasing menu items, events, and customer photos
- **Savings:** 5 hours/week
- **First Step:** Set up Buffer + ChatGPT integration
- **Tools:** Buffer, ChatGPT, Canva
- **Impact:** 4/5 | Ease:** 5/5

**Use Case 2: Customer Feedback Analysis**
- **Description:** AI analyzes Google reviews and identifies common complaints/praises
- **Savings:** 2 hours/week + faster issue resolution
- **First Step:** Export reviews to Google Sheet, use ChatGPT for analysis
- **Tools:** ChatGPT, Google Sheets
- **Impact:** 3/5 | Ease:** 4/5

---

**Remember:** Start with the highest Impact × Ease score first!
`,
    icon: "🎯",
  },
  {
    id: "strategic-thinking-coach",
    title: "Strategic Thinking Coach (5-Step Framework)",
    description: "Structure long-term business goals into actionable 90-day roadmaps with this McKinsey-style strategic planning process",
    category: "Business Prompts",
    content: `# Strategic Thinking Coach (5-Step Framework)

**Mode:** DETAIL  
**Use for:** Structuring long-term goals into action plans.

## The Prompt

\`\`\`
You are my Strategic Thinking Coach.  
Facilitate this 5-step process for my business:

1️⃣ CLARIFY: Summarize my 12-month goal(s), constraints, and priorities.  
2️⃣ DIAGNOSE: Identify key problems and 80/20 bottlenecks.  
3️⃣ STRATEGY: Suggest 2–3 winning approaches (explain "why this wins").  
4️⃣ PLAN: Create a 90-day roadmap (monthly milestones + KPIs).  
5️⃣ MEASURE: Recommend key metrics, dashboards, and feedback cadence.

Context: [Industry, size, location, resources]  
Goals: [e.g., +30% revenue, launch new product, reduce churn]
\`\`\`

## Implementation Tip

Great to run quarterly — it aligns marketing, ops, and budget planning.

## Example Context

**Industry:** B2B SaaS (HR software)  
**Size:** 10 employees, $500K ARR  
**Location:** Remote team, US-based  
**Resources:** $50K marketing budget, 2 developers  
**Goals:** 
- Increase MRR by 30% in 12 months
- Launch mobile app by Q3
- Reduce customer churn from 8% to 5%

## What You'll Get

### 1. CLARIFY
"Your primary goal is sustainable growth through retention-first strategy. Constraints: limited dev resources, competitive market. Priority: Fix churn before scaling acquisition."

### 2. DIAGNOSE
"80/20 Analysis shows: 70% of churn happens in first 30 days. Root cause: Poor onboarding. Secondary issue: Feature gaps vs competitors."

### 3. STRATEGY
**Winning Approach #1:** "Onboarding Overhaul"
- Why it wins: Addresses root cause of churn, faster ROI than new features
- Expected impact: 3-5% churn reduction in 90 days

**Winning Approach #2:** "Mobile-First Engagement"
- Why it wins: Increases daily usage, creates switching costs
- Expected impact: +15% user engagement, supports retention

### 4. PLAN (90-Day Roadmap)
**Month 1:**
- Milestone: Complete onboarding audit
- KPI: Interview 20 churned customers
- Owner: Customer Success Lead

**Month 2:**
- Milestone: Launch new onboarding flow
- KPI: 50% of new users complete setup
- Owner: Product Manager

**Month 3:**
- Milestone: Mobile app beta release
- KPI: 100 beta testers, 4+ star rating
- Owner: CTO

### 5. MEASURE
**Key Metrics:**
- Weekly: Onboarding completion rate
- Monthly: Net churn rate, NPS score
- Quarterly: MRR growth, CAC payback period

**Dashboard:** Google Data Studio with Stripe + Mixpanel integration  
**Feedback Cadence:** Weekly team sync, monthly board update

---

**Pro Tip:** Print the 90-day roadmap and review it every Monday morning!
`,
    icon: "🧠",
  },
  {
    id: "growth-operator-audit",
    title: "Growth Operator Audit (Pocket McKinsey)",
    description: "Get a comprehensive growth analysis with ICE-scored opportunities and a 90-day execution roadmap",
    category: "Business Prompts",
    content: `# Growth Operator Audit (Pocket McKinsey)

**Mode:** DETAIL  
**Use for:** Deep business growth analysis.

## The Prompt

\`\`\`
You are my Growth Operator.  
Perform a 2-part growth audit.

PART A — GROWTH DIAGNOSTIC
Analyze:
- Market position, ICPs, and value prop
- Offer, pricing, messaging, funnel, and retention
- Competitors (3–5 examples)

Deliver:
• Strengths and Gaps table  
• Top 5 growth levers with ICE scores (Impact, Confidence, Effort)

PART B — 90-DAY GROWTH ROADMAP
Include:
• 3 workstreams (Acquisition, Conversion, Retention)  
• Weekly milestones + owner roles  
• 3 success metrics per workstream  
• 1 pre-mortem: "Why it might fail and what to monitor"

Context: [Business, goals, budget, metrics if available]
\`\`\`

## Implementation Tip

Use this as a quarterly growth review. Keep the "audit table" in a Google Sheet.

## Example Output Structure

### PART A: Strengths & Gaps

| Area | Strength | Gap | Priority |
|------|----------|-----|----------|
| **Value Prop** | Clear ROI messaging | Weak differentiation vs Competitor A | HIGH |
| **Pricing** | Competitive entry tier | No annual discount | MEDIUM |
| **Funnel** | High demo-to-trial conversion (45%) | Low trial-to-paid (12%) | HIGH |
| **Retention** | Strong NPS (52) | High churn in month 2-3 | HIGH |

### Top 5 Growth Levers (ICE Scores)

1. **Fix Trial-to-Paid Conversion** - I:9, C:8, E:6 = **7.7**
2. **Launch Referral Program** - I:7, C:7, E:8 = **7.3**
3. **Optimize Pricing Page** - I:6, C:9, E:9 = **8.0**
4. **Add Annual Plans** - I:8, C:9, E:7 = **8.0**
5. **Improve Onboarding** - I:9, C:7, E:5 = **7.0**

### PART B: 90-Day Roadmap

**Workstream 1: ACQUISITION**
- Week 1-2: Launch referral program beta
- Week 3-4: A/B test landing page headlines
- Week 5-8: Scale top-performing ad campaigns
- **Metrics:** CAC, Demo requests, MQL-to-SQL rate
- **Owner:** Marketing Lead

**Workstream 2: CONVERSION**
- Week 1-2: Redesign pricing page
- Week 3-4: Add social proof to trial signup
- Week 5-8: Implement exit-intent offers
- **Metrics:** Trial signup rate, Trial-to-paid %, Time to first value
- **Owner:** Product Manager

**Workstream 3: RETENTION**
- Week 1-2: Map customer journey, identify drop-off points
- Week 3-4: Launch email onboarding sequence
- Week 5-8: Add in-app success milestones
- **Metrics:** Day 30 retention, Feature adoption rate, Churn rate
- **Owner:** Customer Success Lead

### Pre-Mortem: Why It Might Fail

**Risk #1:** "Team bandwidth - too many initiatives at once"
- **Monitor:** Weekly sprint velocity, burnout signals
- **Mitigation:** Cut scope if velocity drops 20%

**Risk #2:** "Referral program doesn't gain traction"
- **Monitor:** Referral signups per week
- **Mitigation:** Increase incentive or pivot to partner program

**Risk #3:** "Pricing changes hurt revenue short-term"
- **Monitor:** MRR growth rate, customer feedback
- **Mitigation:** Grandfather existing customers, A/B test first

---

**Remember:** Focus beats perfection. Execute one workstream well rather than three poorly!
`,
    icon: "📊",
  },
  {
    id: "30-day-action-plan",
    title: "30-Day Action Plan (Tactical Focus)",
    description: "Break big goals into realistic weekly actions with built-in reflection checkpoints for solopreneurs and small teams",
    category: "Business Prompts",
    content: `# 30-Day Action Plan (Tactical Focus)

**Mode:** BASIC  
**Use for:** Breaking a goal into realistic weekly actions.

## The Prompt

\`\`\`
You are my Business Action Planner.

Goal: [Main target for 30 days]  
Constraints: [Budget, time, staff, tools]

Create a simple 30-day plan:
• Weekly actions (≤5 per week)  
• Low-cost / no-code tools  
• Success metric for each week  
• "Stop / Keep / Start" reflection for mid-month review
\`\`\`

## Implementation Tip

Paste into a new chat weekly to update based on results. Great for solopreneurs or small teams.

## Example

**Goal:** Launch email newsletter and get 100 subscribers in 30 days

**Constraints:**
- Budget: $50/month
- Time: 5 hours/week
- Staff: Just me (solopreneur)
- Tools: Prefer free/low-cost options

## Sample Output

### Week 1: Foundation
**Actions:**
1. Choose email platform (Mailchimp free tier or Substack)
2. Design simple template (use Canva free templates)
3. Write welcome email + 2 content emails
4. Set up signup form on website
5. Create lead magnet (1-page PDF guide)

**Tools:** Mailchimp (free), Canva (free), Google Docs  
**Success Metric:** Email platform set up + 3 emails written  
**Time:** ~5 hours

### Week 2: Launch & Promote
**Actions:**
1. Send announcement to existing contacts (email, LinkedIn, social)
2. Post about newsletter 3x on social media
3. Add signup CTA to email signature
4. Join 2 relevant online communities, share value + mention newsletter
5. Ask 5 friends to share with their networks

**Tools:** Social media, email, Slack/Discord communities  
**Success Metric:** 25 subscribers  
**Time:** ~5 hours

### Week 3: Content & Engagement
**Actions:**
1. Send first newsletter to subscribers
2. Reply to every subscriber response personally
3. Create 1 piece of content related to newsletter topic (blog/video)
4. Guest post or comment on 3 relevant blogs/newsletters
5. Run simple giveaway (share newsletter = entry)

**Tools:** Email platform, social media, Google Forms (for giveaway)  
**Success Metric:** 50 subscribers + 30% open rate  
**Time:** ~6 hours

### Week 4: Scale & Optimize
**Actions:**
1. Send second newsletter
2. Analyze what content performed best (opens, clicks)
3. Create referral incentive ("Share and get X")
4. Reach out to 3 potential collaborators for cross-promotion
5. Set up automated welcome sequence

**Tools:** Email analytics, referral tracking  
**Success Metric:** 100 subscribers + 1 collaboration lined up  
**Time:** ~5 hours

---

### Mid-Month Reflection (After Week 2)

**STOP:**
- Posting on platforms where engagement is zero
- Overthinking email design (simple text performs better)

**KEEP:**
- Personal replies to subscribers (builds loyalty)
- Consistent posting schedule

**START:**
- Asking subscribers what they want to read about
- Testing different CTAs in social posts

---

**Pro Tip:** Set a recurring calendar reminder every Sunday to review progress and adjust next week's actions!
`,
    icon: "📅",
  },
  {
    id: "customer-service-reply-wizard",
    title: "Customer Service Reply Wizard",
    description: "Generate empathetic, on-brand customer support responses that turn complaints into loyalty opportunities",
    category: "Business Prompts",
    content: `# Customer Service Reply Wizard

**Mode:** BASIC  
**Use for:** Drafting customer support emails fast.

## The Prompt

\`\`\`
You are a Customer Service Expert.

Customer message: [Paste their email/message]  
Issue type: [Refund / Bug / Complaint / Question]  
Brand tone: [Friendly / Professional / Casual]

Write a reply that:
1. Acknowledges their concern  
2. Explains the solution or next steps  
3. Ends with a goodwill gesture (if appropriate)  
4. Stays under 150 words

Include 2 versions: Standard + Empathetic Upgrade
\`\`\`

## Implementation Tip

Save your best replies as templates. Train your team by showing AI vs human edits.

## Example

**Customer Message:**
"I've been waiting 3 days for a response about my refund. This is unacceptable. I want my money back NOW or I'm disputing the charge."

**Issue Type:** Refund  
**Brand Tone:** Professional but warm

### Standard Version

"Hi [Name],

I sincerely apologize for the delay in processing your refund. I can see your request was submitted on [date], and it should have been handled within 24 hours.

I've personally escalated this to our finance team, and your refund of $[amount] will be processed today. You should see it in your account within 3-5 business days.

As an apology for the inconvenience, I've added a $20 credit to your account for your next purchase.

Thank you for your patience.

Best,  
[Your Name]"

### Empathetic Upgrade

"Hi [Name],

You're absolutely right to be frustrated — 3 days is far too long, and I'm genuinely sorry we dropped the ball here.

I've just personally processed your refund of $[amount]. You'll see it in 3-5 business days, but I'm monitoring it to make sure there are no further delays.

I've also added a $20 credit to your account. I know that doesn't fix the wait, but I hope it shows we value your business and want to make this right.

If anything else comes up, reply directly to this email — it comes straight to me.

Thanks for giving us a chance to fix this.

Best,  
[Your Name]"

---

**Pro Tip:** The "Empathetic Upgrade" version wins back customers 3x more often. Use it for high-value customers or serious complaints!
`,
    icon: "💬",
  },
  {
    id: "ideal-customer-profiler",
    title: "Ideal Customer Profiler (ICP Builder)",
    description: "Create data-driven customer personas with psychographics, pain points, and messaging angles for targeted marketing",
    category: "Business Prompts",
    content: `# Ideal Customer Profiler (ICP Builder)

**Mode:** DETAIL  
**Use for:** Building customer personas for marketing.

## The Prompt

\`\`\`
You are a Market Research Analyst.

Product/Service: [What you sell]  
Current customers (if any): [Demographics, behaviors, feedback]

Create 2–3 Ideal Customer Profiles (ICPs).  
For each, include:
• Demographics (age, location, income, job title)  
• Psychographics (values, fears, aspirations)  
• Pain points (what keeps them up at night)  
• Buying triggers (what makes them say "yes")  
• Preferred channels (where they hang out online)  
• Messaging angle (how to speak to them)

Format as a table for easy reference.
\`\`\`

## Implementation Tip

Use these ICPs to guide ad targeting, content topics, and sales scripts.

## Example Output

**Product:** Project management software for small businesses

### ICP #1: "Overwhelmed Owner Olivia"

| Attribute | Details |
|-----------|---------|
| **Demographics** | 35-50, small business owner, 5-20 employees, $100K-500K revenue, service-based business |
| **Psychographics** | Values efficiency and work-life balance, fears losing control, aspires to scale without burnout |
| **Pain Points** | "I'm drowning in Slack messages, emails, and spreadsheets. I don't know what's happening with projects." |
| **Buying Triggers** | Missed deadline, team confusion, realization that chaos is costing money |
| **Preferred Channels** | LinkedIn, business podcasts, small business Facebook groups |
| **Messaging Angle** | "Get your time back. See every project in one place, no more chasing updates." |

### ICP #2: "Scaling Startup Sam"

| Attribute | Details |
|-----------|---------|
| **Demographics** | 28-40, startup founder/COO, 10-50 employees, $500K-5M revenue, tech/SaaS |
| **Psychographics** | Values speed and data, fears inefficiency killing growth, aspires to unicorn status |
| **Pain Points** | "We're growing fast but our tools don't talk to each other. We need something that scales." |
| **Buying Triggers** | Funding round, new hires, integration headaches with current tools |
| **Preferred Channels** | Product Hunt, Y Combinator forums, Twitter, tech newsletters |
| **Messaging Angle** | "Built for fast-growing teams. Integrates with everything, scales to 1000+ projects." |

### ICP #3: "Agency Admin Amy"

| Attribute | Details |
|-----------|---------|
| **Demographics** | 30-45, operations manager at creative agency, 15-100 employees, $1M-10M revenue |
| **Psychographics** | Values client satisfaction and team happiness, fears scope creep and burnout, aspires to be seen as strategic partner |
| **Pain Points** | "Clients keep asking for status updates. My team is buried in admin work instead of creative work." |
| **Buying Triggers** | Client complaint, team turnover, realization that manual tracking is killing margins |
| **Preferred Channels** | Agency-focused LinkedIn groups, industry conferences, referrals |
| **Messaging Angle** | "Impress clients with real-time dashboards. Free your team from status update emails." |

---

**How to Use These ICPs:**

1. **Ad Targeting:** Use demographics to set up Facebook/LinkedIn ads
2. **Content Creation:** Write blog posts addressing each ICP's pain points
3. **Sales Calls:** Reference their specific triggers and fears
4. **Product Development:** Prioritize features each ICP needs most

**Pro Tip:** Interview 5-10 real customers and update these profiles quarterly!
`,
    icon: "🎯",
  },
  {
    id: "brand-tone-architect",
    title: "Brand Tone Architect (Voice Guide)",
    description: "Define your brand's unique voice with clear do's/don'ts and reusable examples for consistent messaging across all channels",
    category: "Business Prompts",
    content: `# Brand Tone Architect (Voice Guide)

**Mode:** DETAIL  
**Use for:** Defining your brand voice.

## The Prompt

\`\`\`
You are a Brand Strategist.

Company: [Name and what you do]  
Target audience: [Who you serve]  
Brand personality: [3–5 adjectives]  
Competitors to differentiate from: [List 2–3]

Create a Brand Tone Guide with:
1. Core voice attributes (with definitions)  
2. Do's and Don'ts table  
3. 5 example phrases (good vs bad)  
4. Tone adjustments for different contexts (social, email, ads, support)

Make it actionable for a team to follow.
\`\`\`

## Implementation Tip

Share this with everyone who creates content — from social media to customer support.

## Example Output

**Company:** EcoClean (Eco-friendly cleaning products)  
**Target Audience:** Environmentally conscious millennials, parents  
**Brand Personality:** Honest, Warm, Empowering, Down-to-earth, Optimistic  
**Competitors:** Method (too trendy), Seventh Generation (too serious)

---

### Core Voice Attributes

1. **Honest** - We tell it like it is. No greenwashing, no exaggeration.
2. **Warm** - We're a friend, not a corporation. Conversational and approachable.
3. **Empowering** - We help you make better choices without judgment.
4. **Down-to-earth** - Simple language, no jargon or pretension.
5. **Optimistic** - Positive about change, not preachy or doom-and-gloom.

---

### Do's and Don'ts

| DO | DON'T |
|----|-------|
| Use "we" and "you" (conversational) | Use "one" or "consumers" (corporate) |
| Explain why it matters | Just list features |
| Celebrate small wins | Guilt-trip or shame |
| Use simple, everyday words | Use scientific jargon or buzzwords |
| Show real people and stories | Use stock photos or fake testimonials |

---

### Example Phrases: Good vs Bad

**Topic: Product Benefits**
- ❌ BAD: "Our enzymatic formula delivers superior cleaning efficacy"
- ✅ GOOD: "Tough on stains, gentle on the planet"

**Topic: Call-to-Action**
- ❌ BAD: "Purchase now to optimize your household sustainability"
- ✅ GOOD: "Make the switch today — your home (and Earth) will thank you"

**Topic: Customer Support**
- ❌ BAD: "We apologize for any inconvenience this may have caused"
- ✅ GOOD: "We're sorry we let you down. Here's how we'll make it right"

**Topic: Social Media**
- ❌ BAD: "Did you know our products are 99.9% biodegradable?"
- ✅ GOOD: "Small swaps, big impact. What's one thing you changed this week?"

**Topic: About Us**
- ❌ BAD: "EcoClean is a market-leading provider of sustainable cleaning solutions"
- ✅ GOOD: "We started EcoClean because we were tired of choosing between clean homes and a clean planet"

---

### Tone Adjustments by Context

| Context | Tone Shift | Example |
|---------|------------|---------|
| **Social Media** | More playful, emoji-friendly | "Spilled coffee on your favorite shirt? 😱 We've got you covered (literally)" |
| **Email Newsletter** | Informative but warm | "Hey friend! Here's what we've been up to this month..." |
| **Ads** | Direct, benefit-focused | "Clean your home without the chemicals. Try EcoClean risk-free." |
| **Customer Support** | Empathetic, solution-oriented | "That's frustrating — let's fix this together" |
| **Website Copy** | Clear, confident, welcoming | "Cleaning products that work as hard as you do — without the toxic stuff" |

---

**How to Use This Guide:**

1. **Before posting:** Ask "Does this sound like us?"
2. **When stuck:** Pick a phrase from the "Good" examples and adapt it
3. **Team training:** Have new hires rewrite 3 competitor posts in your voice
4. **Quarterly review:** Read 10 random pieces of content and score them 1-5 on voice consistency

**Pro Tip:** Print this guide and keep it visible at every desk. Voice consistency builds brand recognition!
`,
    icon: "🎤",
  },
  {
    id: "content-repurposing-engine",
    title: "Content Repurposing Engine (1→10 Assets)",
    description: "Transform one piece of content into 10+ formats across platforms with this systematic repurposing framework",
    category: "Business Prompts",
    content: `# Content Repurposing Engine (1→10 Assets)

**Mode:** DETAIL  
**Use for:** Turning one asset into many.

## The Prompt

\`\`\`
You are a Content Strategist.

Original content: [Paste blog post, video transcript, or podcast notes]  
Target platforms: [LinkedIn, Twitter, Instagram, email, etc.]

Create a repurposing plan with:
• 10 derivative assets (formats + platforms)  
• Hook/headline for each  
• Estimated time to create  
• Best posting time/day

Prioritize by ROI (reach × engagement ÷ effort).
\`\`\`

## Implementation Tip

Batch-create content monthly. Use tools like Canva (graphics), Descript (video), and Buffer (scheduling).

## Example

**Original Content:** 2000-word blog post titled "How to Reduce Customer Churn by 30% in 90 Days"

**Target Platforms:** LinkedIn, Twitter, Instagram, Email, YouTube

---

### Repurposing Plan (Sorted by ROI)

#### 1. LinkedIn Carousel Post
**Format:** 8-slide carousel  
**Hook:** "We cut churn by 32% in 90 days. Here's the exact playbook 👇"  
**Content:** One key insight per slide with data points  
**Time to Create:** 30 minutes (Canva template)  
**Best Time:** Tuesday 9 AM  
**ROI Score:** 9/10 (High reach, high engagement, medium effort)

#### 2. Twitter Thread
**Format:** 10-tweet thread  
**Hook:** "Most SaaS companies focus on acquisition. We focused on retention and grew faster. Here's how:"  
**Content:** One tactic per tweet with results  
**Time to Create:** 20 minutes  
**Best Time:** Wednesday 11 AM  
**ROI Score:** 8/10 (High reach, medium engagement, low effort)

#### 3. Email Newsletter Feature
**Format:** 500-word summary + CTA to full post  
**Hook:** "This week: The churn-reduction playbook that saved us $120K"  
**Content:** Top 3 tactics + case study  
**Time to Create:** 15 minutes  
**Best Time:** Thursday 8 AM  
**ROI Score:** 9/10 (Owned audience, high engagement, low effort)

#### 4. Instagram Reel/Story Series
**Format:** 5 x 15-second videos  
**Hook:** "Losing customers? Try this 👇"  
**Content:** One quick tip per video with text overlay  
**Time to Create:** 45 minutes (filming + editing)  
**Best Time:** Daily at 6 PM  
**ROI Score:** 7/10 (High reach, medium engagement, high effort)

#### 5. YouTube Short
**Format:** 60-second vertical video  
**Hook:** "The #1 reason customers leave (and how to fix it)"  
**Content:** Problem + solution + CTA  
**Time to Create:** 30 minutes  
**Best Time:** Friday 5 PM  
**ROI Score:** 8/10 (Growing platform, high reach, medium effort)

#### 6. LinkedIn Text Post (Micro-Version)
**Format:** 150-word post  
**Hook:** "We reduced churn by 32% without spending a dollar on ads"  
**Content:** 3 bullet points + link to full post  
**Time to Create:** 10 minutes  
**Best Time:** Monday 8 AM  
**ROI Score:** 8/10 (Quick wins, high reach, very low effort)

#### 7. Infographic
**Format:** One-page visual summary  
**Hook:** "The 90-Day Churn Reduction Roadmap"  
**Content:** Timeline with key actions and results  
**Time to Create:** 40 minutes (Canva)  
**Best Time:** Share across all platforms  
**ROI Score:** 7/10 (Evergreen, shareable, medium effort)

#### 8. Podcast Talking Points
**Format:** 5-minute segment script  
**Hook:** "Today I'm sharing our exact churn-reduction playbook"  
**Content:** Story format with 3 key lessons  
**Time to Create:** 20 minutes  
**Best Time:** Record for next episode  
**ROI Score:** 6/10 (Niche audience, high engagement, low effort)

#### 9. Quote Graphics (3x)
**Format:** 3 standalone quote images  
**Hook Examples:**  
- "Retention is the new acquisition"  
- "We saved $120K by fixing onboarding"  
- "Churn isn't a pricing problem, it's a value problem"  
**Time to Create:** 15 minutes total  
**Best Time:** Sprinkle across platforms  
**ROI Score:** 6/10 (Low effort, medium reach, low engagement)

#### 10. LinkedIn Poll
**Format:** 4-option poll  
**Hook:** "What's your #1 churn challenge?"  
**Options:** Onboarding / Pricing / Support / Product fit  
**Content:** Comment with link to full post  
**Time to Create:** 5 minutes  
**Best Time:** Wednesday 10 AM  
**ROI Score:** 7/10 (High engagement, builds audience, very low effort)

---

### Execution Timeline

**Week 1:**
- Day 1: Create LinkedIn carousel + Twitter thread
- Day 2: Write email newsletter feature
- Day 3: Design infographic

**Week 2:**
- Day 1: Film Instagram Reels/Stories
- Day 2: Create YouTube Short
- Day 3: Design quote graphics

**Week 3:**
- Schedule all posts across platforms
- Monitor performance and adjust

---

**Pro Tip:** The first 3 assets (LinkedIn carousel, Twitter thread, email) give you 80% of the results with 20% of the effort. Start there!
`,
    icon: "🔄",
  },
