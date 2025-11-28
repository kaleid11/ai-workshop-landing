-- Business Model Canvas Framework
INSERT INTO businessFrameworks (
  name,
  slug,
  description,
  category,
  content,
  components,
  prompts,
  examples,
  expectedOutcome,
  timeToImplement,
  difficulty,
  requiredTier,
  icon
) VALUES (
  'Business Model Canvas',
  'business-model-canvas',
  'The Business Model Canvas is a strategic management template for developing new business models or documenting existing ones. Created by Alexander Osterwalder, it visualizes the 9 key building blocks that form the foundation of every successful business.',
  'Strategy',
  '# Business Model Canvas

## Overview

The Business Model Canvas helps you visualize, design, and innovate your business model. It''s used by millions of entrepreneurs and enterprises worldwide to map out their business strategy on a single page.

## The 9 Building Blocks

### 1. Customer Segments (Who)
Define the different groups of people or organizations your business aims to reach and serve.

**Key Questions:**
- Who are your most important customers?
- What are their needs, behaviors, and characteristics?
- How do you segment them?

### 2. Value Propositions (What)
Describe the bundle of products and services that create value for your customer segments.

**Key Questions:**
- What value do you deliver to customers?
- Which customer problems are you solving?
- What makes you different from competitors?

### 3. Channels (How to Reach)
Explain how your company communicates with and reaches its customer segments to deliver value.

**Key Questions:**
- Through which channels do customers want to be reached?
- How are you reaching them now?
- Which channels work best and are most cost-efficient?

### 4. Customer Relationships (How to Keep)
Describe the types of relationships you establish with specific customer segments.

**Key Questions:**
- What type of relationship does each segment expect?
- How costly are these relationships?
- How do they integrate with your business model?

### 5. Revenue Streams (Income)
Represent the cash your company generates from each customer segment.

**Key Questions:**
- For what value are customers willing to pay?
- What and how do they currently pay?
- What is your pricing strategy?

### 6. Key Resources (What You Need)
Describe the most important assets required to make your business model work.

**Key Questions:**
- What key resources do your value propositions require?
- What about distribution channels and customer relationships?
- What resources do you need for revenue streams?

### 7. Key Activities (What You Do)
Describe the most important things your company must do to make the business model work.

**Key Questions:**
- What key activities do your value propositions require?
- What about distribution channels and customer relationships?
- What activities are needed for revenue streams?

### 8. Key Partnerships (Who Helps)
Describe the network of suppliers and partners that make the business model work.

**Key Questions:**
- Who are your key partners/suppliers?
- What key resources do you acquire from partners?
- What key activities do partners perform?

### 9. Cost Structure (Expenses)
Describe all costs incurred to operate your business model.

**Key Questions:**
- What are the most important costs in your business?
- Which key resources and activities are most expensive?
- Is your business cost-driven or value-driven?

## How to Use This Framework

1. **Start with Customer Segments** - Understand who you serve
2. **Define Value Propositions** - Clarify what you offer
3. **Map Channels & Relationships** - Plan how you reach and keep customers
4. **Identify Revenue Streams** - Understand how you make money
5. **List Key Resources & Activities** - Know what you need and do
6. **Define Key Partnerships** - Identify who helps you succeed
7. **Calculate Cost Structure** - Understand your expenses

## AI Integration Tips

Use AI to:
- Generate customer personas for each segment
- Brainstorm unique value propositions
- Analyze competitor business models
- Calculate financial projections
- Create marketing channel strategies
- Optimize pricing models',
  '["Customer Segments", "Value Propositions", "Channels", "Customer Relationships", "Revenue Streams", "Key Resources", "Key Activities", "Key Partnerships", "Cost Structure"]',
  '[
    {
      "component": "Customer Segments",
      "prompt": "You are a business strategist specializing in customer segmentation.\n\nAnalyze my business and help me identify distinct customer segments.\n\nBusiness Description: [YOUR BUSINESS]\nIndustry: [YOUR INDUSTRY]\nCurrent Customers: [DESCRIBE CURRENT CUSTOMERS]\n\nFor each segment, provide:\n1. Segment name and size estimate\n2. Demographics and psychographics\n3. Key needs and pain points\n4. Buying behavior and decision criteria\n5. Willingness to pay\n\nFormat as a table with clear distinctions between segments."
    },
    {
      "component": "Value Propositions",
      "prompt": "You are a product strategist expert in value proposition design.\n\nHelp me craft compelling value propositions for each customer segment.\n\nCustomer Segment: [SEGMENT NAME]\nTheir Main Problem: [PROBLEM]\nOur Solution: [YOUR SOLUTION]\nCompetitors: [LIST COMPETITORS]\n\nCreate:\n1. A clear value proposition statement (1-2 sentences)\n2. 3-5 key benefits that matter to this segment\n3. Quantifiable outcomes (time saved, money saved, revenue increased)\n4. Emotional benefits\n5. Differentiation from competitors\n\nMake it customer-focused, not product-focused."
    },
    {
      "component": "Channels",
      "prompt": "You are a marketing channel strategist.\n\nRecommend the best channels to reach my target customers.\n\nCustomer Segment: [SEGMENT]\nBudget: [YOUR BUDGET]\nCurrent Channels: [LIST CURRENT CHANNELS]\nGoals: [ACQUISITION/RETENTION/BOTH]\n\nFor each recommended channel, provide:\n1. Channel name and type (owned/paid/earned)\n2. Why it works for this segment\n3. Expected cost per acquisition\n4. Implementation complexity (1-5)\n5. Timeline to see results\n6. Key metrics to track\n\nPrioritize channels by ROI potential."
    },
    {
      "component": "Customer Relationships",
      "prompt": "You are a customer success expert.\n\nDesign a customer relationship strategy that maximizes lifetime value.\n\nCustomer Segment: [SEGMENT]\nProduct/Service: [YOUR OFFERING]\nCurrent Churn Rate: [X%]\nTarget LTV: [AMOUNT]\n\nCreate a relationship strategy including:\n1. Onboarding process (first 30 days)\n2. Ongoing engagement tactics\n3. Retention mechanisms\n4. Upsell/cross-sell opportunities\n5. Community building initiatives\n6. Support model (self-service, assisted, dedicated)\n\nBalance automation with human touch based on segment value."
    },
    {
      "component": "Revenue Streams",
      "prompt": "You are a pricing strategist and revenue optimization expert.\n\nDesign optimal revenue streams for my business model.\n\nProduct/Service: [YOUR OFFERING]\nTarget Customer: [SEGMENT]\nCompetitor Pricing: [RANGE]\nCost to Deliver: [AMOUNT]\nTarget Margin: [X%]\n\nRecommend:\n1. Primary revenue model (subscription, one-time, usage-based, freemium, etc.)\n2. Pricing tiers with features and price points\n3. Upsell and cross-sell opportunities\n4. Volume discounts or enterprise pricing\n5. Payment terms and billing frequency\n6. First-year revenue projection\n\nJustify each pricing decision with market data or psychology."
    },
    {
      "component": "Key Resources",
      "prompt": "You are an operations consultant.\n\nIdentify the critical resources needed to execute my business model.\n\nBusiness Model: [BRIEF DESCRIPTION]\nValue Proposition: [YOUR VALUE PROP]\nTarget Scale: [CUSTOMERS/REVENUE IN 12 MONTHS]\n\nCategorize resources into:\n\n**Physical Resources:**\n- Equipment, facilities, infrastructure needed\n\n**Intellectual Resources:**\n- Patents, data, proprietary knowledge\n\n**Human Resources:**\n- Key roles and team structure\n- Skills and expertise required\n\n**Financial Resources:**\n- Startup capital needed\n- Working capital requirements\n\nFor each resource, specify: Must-have vs. nice-to-have, cost, and acquisition timeline."
    },
    {
      "component": "Key Activities",
      "prompt": "You are a business process consultant.\n\nMap out the key activities required to deliver value and generate revenue.\n\nBusiness Model: [YOUR MODEL]\nValue Proposition: [YOUR VALUE PROP]\nRevenue Streams: [YOUR REVENUE STREAMS]\n\nIdentify activities in these categories:\n\n**Production Activities:**\n- What you create/manufacture/deliver\n\n**Problem-Solving Activities:**\n- How you solve customer problems\n\n**Platform/Network Activities:**\n- How you maintain and grow your platform\n\n**Marketing & Sales Activities:**\n- How you acquire and convert customers\n\nFor each activity:\n1. Frequency (daily, weekly, monthly)\n2. Time investment\n3. Who performs it (in-house vs. outsourced)\n4. Automation potential (1-5)\n5. Impact on value delivery (1-5)"
    },
    {
      "component": "Key Partnerships",
      "prompt": "You are a strategic partnerships advisor.\n\nIdentify strategic partnerships that will accelerate growth and reduce risk.\n\nBusiness Model: [YOUR MODEL]\nKey Resources Needed: [LIST]\nKey Activities: [LIST]\nGaps/Weaknesses: [DESCRIBE]\n\nRecommend partnerships in these categories:\n\n**Strategic Alliances:**\n- Non-competitors who serve the same customers\n\n**Joint Ventures:**\n- Shared investment opportunities\n\n**Supplier Relationships:**\n- Critical suppliers and terms\n\n**Technology Partners:**\n- Platform integrations and APIs\n\nFor each partnership:\n1. Partner type and name (if known)\n2. What they provide\n3. What you provide in return\n4. Expected value/cost savings\n5. Risk mitigation benefit\n6. Exclusivity considerations"
    },
    {
      "component": "Cost Structure",
      "prompt": "You are a financial analyst and CFO advisor.\n\nBuild a comprehensive cost structure for my business model.\n\nBusiness Model: [YOUR MODEL]\nKey Resources: [LIST]\nKey Activities: [LIST]\nKey Partnerships: [LIST]\nTarget Revenue (Year 1): [AMOUNT]\n\nBreak down costs into:\n\n**Fixed Costs:**\n- Salaries and benefits\n- Rent and utilities\n- Software subscriptions\n- Insurance and legal\n\n**Variable Costs:**\n- Cost of goods sold\n- Marketing and advertising\n- Transaction fees\n- Customer support\n\n**One-Time Costs:**\n- Setup and launch\n- Equipment and infrastructure\n- Legal and incorporation\n\nFor each cost:\n1. Monthly/annual amount\n2. Percentage of total costs\n3. Optimization opportunities\n4. Scaling behavior (does it grow with revenue?)\n\nCalculate:\n- Break-even point\n- Burn rate (if pre-revenue)\n- Target profit margin"
    }
  ]',
  '[
    {
      "type": "SaaS Business",
      "segments": "SMBs, Enterprise, Freelancers",
      "value": "Automation that saves 10 hours/week",
      "revenue": "Subscription ($49-$499/mo)",
      "channels": "Content marketing, SEO, partnerships"
    },
    {
      "type": "E-commerce",
      "segments": "Millennials, Gen Z, Gift buyers",
      "value": "Unique handcrafted products",
      "revenue": "Product sales + subscription box",
      "channels": "Instagram, TikTok, influencer marketing"
    },
    {
      "type": "Consulting",
      "segments": "Startups, Scale-ups",
      "value": "Expert guidance to avoid costly mistakes",
      "revenue": "Hourly, project-based, retainer",
      "channels": "Referrals, LinkedIn, speaking engagements"
    }
  ]',
  'Complete business model mapped on one page, clarity on all 9 components, validated assumptions, identified gaps and opportunities, actionable next steps for each building block',
  '2-4 hours for initial canvas, ongoing refinement',
  'beginner',
  'free',
  '🎯'
);

-- Daniel Drescher Technology Adoption Framework (adapted for AI)
INSERT INTO businessFrameworks (
  name,
  slug,
  description,
  category,
  content,
  components,
  prompts,
  examples,
  expectedOutcome,
  timeToImplement,
  difficulty,
  requiredTier,
  icon
) VALUES (
  'AI Technology Adoption Framework',
  'ai-technology-adoption-framework',
  'Adapted from Daniel Drescher''s blockchain adoption methodology, this framework provides a structured 25-step approach to understanding, evaluating, and implementing AI technologies in your business. Perfect for non-technical leaders who need to make informed decisions about AI adoption.',
  'Innovation',
  '# AI Technology Adoption Framework

## Overview

Based on Daniel Drescher''s systematic approach to technology adoption, this framework breaks down AI implementation into 25 manageable steps. No technical jargon—just practical guidance for business leaders.

## Phase 1: Understanding AI Fundamentals (Steps 1-5)

### Step 1: What is AI?
Understand AI as a tool that learns from data to make predictions or decisions.

### Step 2: Types of AI
- **Generative AI**: Creates content (text, images, video)
- **Predictive AI**: Forecasts outcomes
- **Analytical AI**: Finds patterns in data
- **Automation AI**: Performs repetitive tasks

### Step 3: How AI Learns
- Supervised learning (with examples)
- Unsupervised learning (finding patterns)
- Reinforcement learning (trial and error)

### Step 4: AI Capabilities vs. Limitations
**Can do:** Pattern recognition, content generation, data analysis, automation
**Cannot do:** True reasoning, ethical judgment, creative strategy

### Step 5: AI in Your Industry
Research how competitors and leaders are using AI.

## Phase 2: Assessing Your Readiness (Steps 6-10)

### Step 6: Data Audit
What data do you have? Is it organized? Is it accessible?

### Step 7: Process Mapping
Which processes are repetitive, time-consuming, or error-prone?

### Step 8: Team Skills Assessment
Who on your team understands AI? Who is willing to learn?

### Step 9: Budget Reality Check
What can you afford? (Hint: Start small—$100-500/month)

### Step 10: Risk Assessment
What could go wrong? Data privacy? Job displacement? Quality issues?

## Phase 3: Identifying Use Cases (Steps 11-15)

### Step 11: Quick Wins
Find tasks that are:
- Repetitive
- Time-consuming
- Low-risk if AI makes mistakes
- High-impact if improved

### Step 12: Customer-Facing Opportunities
- Chatbots for support
- Personalized recommendations
- Automated email responses

### Step 13: Internal Operations
- Meeting notes and summaries
- Data analysis and reporting
- Content creation
- Research and competitive intelligence

### Step 14: Strategic Applications
- Market trend analysis
- Product development insights
- Pricing optimization
- Workforce planning

### Step 15: Prioritization Matrix
Score each use case on:
- Impact (1-5)
- Effort (1-5)
- Risk (1-5)

Start with high-impact, low-effort, low-risk.

## Phase 4: Pilot Implementation (Steps 16-20)

### Step 16: Choose Your First Tool
Based on your top use case, select one AI tool. (See Tools Database)

### Step 17: Set Success Metrics
Define what success looks like:
- Time saved
- Cost reduced
- Quality improved
- Revenue increased

### Step 18: Train Your Team
- 1-2 hour training session
- Hands-on practice
- Documentation and templates

### Step 19: Run 30-Day Pilot
- Use the tool daily
- Track metrics
- Gather feedback
- Document issues

### Step 20: Evaluate Results
Did you hit your success metrics? What worked? What didn''t?

## Phase 5: Scaling & Optimization (Steps 21-25)

### Step 21: Refine Your Process
Based on pilot learnings, optimize workflows.

### Step 22: Expand to More Users
Roll out to additional team members with training.

### Step 23: Add More Use Cases
Implement your next 2-3 prioritized use cases.

### Step 24: Integrate Systems
Connect AI tools to your existing software (CRM, project management, etc.)

### Step 25: Continuous Improvement
- Monthly review of AI usage
- Quarterly evaluation of new tools
- Annual strategy refresh

## Decision Framework

At each step, ask:
1. **Does this align with business goals?**
2. **Do we have the resources (time, money, skills)?**
3. **What''s the worst-case scenario?**
4. **Can we reverse this decision if needed?**
5. **What will we learn from this?**

## Common Pitfalls to Avoid

1. **Trying to do everything at once** - Start with one use case
2. **Choosing tools before defining problems** - Problem first, tool second
3. **Underestimating training needs** - Budget time for learning
4. **Ignoring data quality** - Garbage in, garbage out
5. **No clear success metrics** - You can''t improve what you don''t measure

## AI Integration Checklist

- [ ] Understand AI basics (Phase 1)
- [ ] Assess organizational readiness (Phase 2)
- [ ] Identify and prioritize use cases (Phase 3)
- [ ] Run pilot with clear metrics (Phase 4)
- [ ] Scale successful implementations (Phase 5)
- [ ] Establish continuous improvement process',
  '["Understanding", "Assessment", "Use Case Identification", "Pilot Implementation", "Scaling", "Optimization"]',
  '[
    {
      "component": "Understanding AI",
      "prompt": "You are an AI educator who explains complex concepts simply.\n\nExplain how AI could be used in [MY INDUSTRY] in terms a 12-year-old could understand.\n\nIndustry: [YOUR INDUSTRY]\nCurrent Challenges: [LIST 3-5 CHALLENGES]\n\nProvide:\n1. Simple explanation of AI (no jargon)\n2. 3 real-world examples in this industry\n3. What AI can and cannot do\n4. Common misconceptions to avoid\n\nUse analogies and stories, not technical terms."
    },
    {
      "component": "Readiness Assessment",
      "prompt": "You are a business consultant specializing in AI readiness.\n\nAssess my organization''s readiness for AI adoption.\n\nCompany Size: [NUMBER OF EMPLOYEES]\nIndustry: [YOUR INDUSTRY]\nCurrent Tech Stack: [LIST SOFTWARE YOU USE]\nData Situation: [DESCRIBE YOUR DATA]\nTeam Tech Skills: [BEGINNER/INTERMEDIATE/ADVANCED]\nBudget: [MONTHLY AMOUNT]\n\nEvaluate:\n1. Data readiness (1-10 score + explanation)\n2. Team readiness (1-10 score + explanation)\n3. Process readiness (1-10 score + explanation)\n4. Budget readiness (1-10 score + explanation)\n5. Overall readiness score\n6. Top 3 gaps to address before AI adoption\n7. Recommended timeline to get ready"
    },
    {
      "component": "Use Case Identification",
      "prompt": "You are an AI strategy consultant.\n\nIdentify the top 5 AI use cases for my business, ranked by impact and feasibility.\n\nBusiness Description: [YOUR BUSINESS]\nCurrent Pain Points: [LIST]\nTeam Size: [NUMBER]\nMonthly Budget for AI: [AMOUNT]\nTech Comfort Level: [BEGINNER/INTERMEDIATE/ADVANCED]\n\nFor each use case, provide:\n1. Use case name\n2. Problem it solves\n3. Expected impact (time/cost saved)\n4. Implementation difficulty (1-5)\n5. Estimated cost (monthly)\n6. Recommended tool(s)\n7. Success metrics\n8. Implementation timeline\n\nFormat as a prioritized table with Quick Wins highlighted."
    },
    {
      "component": "Pilot Planning",
      "prompt": "You are a project manager specializing in AI pilots.\n\nCreate a detailed 30-day pilot plan for implementing AI.\n\nUse Case: [YOUR CHOSEN USE CASE]\nTool: [SELECTED AI TOOL]\nTeam Members: [NUMBER AND ROLES]\nSuccess Metrics: [YOUR METRICS]\n\nCreate a week-by-week plan:\n\n**Week 1: Setup & Training**\n- Day-by-day tasks\n- Who does what\n- Training materials needed\n\n**Week 2-3: Active Use**\n- Daily usage goals\n- Data collection process\n- Check-in schedule\n\n**Week 4: Evaluation**\n- Metrics review\n- Feedback collection\n- Go/no-go decision criteria\n\nInclude:\n- Risk mitigation strategies\n- Communication plan\n- Budget breakdown\n- Success criteria"
    },
    {
      "component": "Scaling Strategy",
      "prompt": "You are a change management consultant.\n\nCreate a scaling plan to expand AI usage across the organization.\n\nSuccessful Pilot: [DESCRIBE PILOT RESULTS]\nOrganization Size: [NUMBER OF EMPLOYEES]\nDepartments: [LIST DEPARTMENTS]\nBudget: [AMOUNT]\nTimeframe: [3/6/12 MONTHS]\n\nDevelop:\n\n**Phase 1: Expand to Early Adopters**\n- Which teams/individuals first?\n- Training approach\n- Support structure\n\n**Phase 2: Department Rollout**\n- Department prioritization\n- Customization needs\n- Change management tactics\n\n**Phase 3: Organization-Wide**\n- Communication strategy\n- Training program\n- Support and governance\n\n**Success Metrics:**\n- Adoption rate targets\n- ROI milestones\n- Quality benchmarks\n\n**Risk Management:**\n- Resistance handling\n- Technical issues\n- Budget overruns"
    },
    {
      "component": "Continuous Optimization",
      "prompt": "You are an AI operations consultant.\n\nDesign a continuous improvement process for our AI implementations.\n\nCurrent AI Tools: [LIST TOOLS AND USE CASES]\nTeam Size: [NUMBER]\nMonthly AI Spend: [AMOUNT]\nKey Metrics: [LIST CURRENT METRICS]\n\nCreate:\n\n**Monthly Review Process:**\n- Metrics to track\n- Review meeting agenda\n- Decision framework for adjustments\n\n**Quarterly Evaluation:**\n- Tool effectiveness assessment\n- New tool evaluation criteria\n- Budget reallocation process\n\n**Annual Strategy Refresh:**\n- Industry trend analysis\n- Competitive benchmarking\n- Strategic planning framework\n\n**Optimization Opportunities:**\n- Workflow improvements\n- Tool consolidation\n- Training updates\n- Integration enhancements\n\nInclude templates for each review type."
    }
  ]',
  '[
    {
      "industry": "Professional Services",
      "use_case": "Automated meeting notes and client summaries",
      "tool": "Gemini + NotebookLM",
      "result": "8 hours/week saved, 100% client meeting documentation"
    },
    {
      "industry": "E-commerce",
      "use_case": "Product description generation",
      "tool": "ChatGPT + Shopify integration",
      "result": "90% faster product listings, improved SEO"
    },
    {
      "industry": "Real Estate",
      "use_case": "Property listing descriptions and social posts",
      "tool": "Claude + Canva",
      "result": "5 hours/week saved, 40% more listings"
    }
  ]',
  'Structured roadmap for AI adoption, clear understanding of capabilities and limitations, validated use cases with ROI projections, successful pilot implementation, scaling plan with risk mitigation',
  '6-12 weeks for full framework implementation',
  'intermediate',
  'starter',
  '🚀'
);
