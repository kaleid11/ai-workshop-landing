import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Search, Download, ExternalLink, Loader2, BookOpen, Video } from "lucide-react";
import { Link } from "wouter";

interface WikiGuide {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  downloadUrl?: string;
  externalLink?: string;
  icon: string;
}

const WIKI_GUIDES: WikiGuide[] = [
  {
    id: "gemini-4-part-formula",
    title: "Gemini 4-Part Prompt Formula",
    description: "Master the Persona-Task-Context-Format framework for powerful AI prompts",
    category: "Prompting",
    content: `# Gemini 4-Part Prompt Formula

## The Framework

Every powerful Gemini prompt follows this structure:

### 1. **Persona** - Who should the AI be?
Define the role or expertise level.

**Examples:**
- "You are a social media marketing expert with 10 years of B2B SaaS experience"
- "You are a psychological PhD and content strategist"
- "You are a premium wellness brand consultant"

### 2. **Task** - What should it do?
Be specific about the action.

**Examples:**
- "Create 5 Instagram captions"
- "Create a 30-day content calendar where I post 3 days a week"
- "Generate 10 LinkedIn post ideas for HR directors"

### 3. **Context** - What's the situation?
Provide background, constraints, and brand voice.

**Examples:**
- "Target audience: HR directors at 100-1000 employee companies"
- "Brand voice: Professional but conversational, data-driven"
- "Budget: $5K/month, focus on employee retention"

**Pro Tip:** Use the Brand Alignment GEM to generate your context automatically!

### 4. **Format** - How should it present results?
Specify output structure.

**Examples:**
- "Format as numbered list with headline, body, CTA, and 3 hashtags"
- "Include/exclude emojis"
- "150-200 words per post"

## Complete Example

\`\`\`
You are a social media marketing expert with 10 years of B2B SaaS experience.

Create 5 LinkedIn post ideas for a B2B SaaS company that sells employee retention software.

Target audience: HR directors at 100-1000 employee companies.
Brand voice: Professional, data-driven, empathetic.
Focus: Reducing turnover and improving company culture.

Format each post as:
- Headline (under 100 characters)
- Body text (150-200 words)
- Call-to-action
- 3 relevant hashtags

Make posts educational, not salesy.
\`\`\`

## Quick Tips

1. **Be Specific** - Vague prompts = vague results
2. **Use Examples** - Show what good looks like
3. **Iterate** - Refine based on results
4. **Test Variations** - Try different phrasings
5. **Save Templates** - Create reusable prompts
6. **Combine Prompts** - Use output as input for next prompt
`,
    icon: "⚡",
  },
  {
    id: "gemini-deep-thinking",
    title: "Gemini Deep Thinking Mode",
    description: "Use Gemini's advanced reasoning for complex problems and creative tasks",
    category: "Gemini Features",
    content: `# Gemini Deep Thinking Mode

## What is Deep Thinking?

Gemini's "Thinking" mode (also called Deep Thinking) is an advanced reasoning model that:
- Takes longer to respond (10-30 seconds)
- Shows its reasoning process
- Produces higher quality, more thoughtful outputs
- Best for complex problems and creative tasks

## When to Use Deep Thinking

✅ **Use Deep Thinking for:**
- Complex strategy development
- Multi-step problem solving
- Creative content that needs depth
- Technical analysis
- Long-form content creation
- Business planning

❌ **Don't use Deep Thinking for:**
- Simple questions
- Quick edits
- Formatting tasks
- Basic information lookup

## How to Enable

1. Open Gemini Advanced
2. Look for the "Thinking" toggle at the top
3. Turn it ON before sending your prompt
4. Wait for the extended response time

## Best Practices

1. **Give it complex problems** - Don't waste Deep Thinking on simple tasks
2. **Be patient** - Quality takes time
3. **Review the reasoning** - Learn from how it thinks
4. **Combine with 4-part formula** - Structure still matters

## Example Use Cases

### Business Strategy
\`\`\`
Analyze my business model and identify 3 growth opportunities.
Include market analysis, competitive positioning, and implementation roadmap.
\`\`\`

### Content Strategy
\`\`\`
Create a 90-day content strategy for LinkedIn that positions me as a thought leader.
Include content pillars, posting frequency, and engagement tactics.
\`\`\`

### Problem Solving
\`\`\`
I'm struggling with low engagement on social media despite posting daily.
Analyze potential causes and provide a step-by-step solution.
\`\`\`
`,
    icon: "🧠",
  },
  {
    id: "gemini-mini-apps",
    title: "Creating Mini Apps with Gemini",
    description: "Build interactive tools and calculators directly in Gemini",
    category: "Gemini Features",
    content: `# Creating Mini Apps with Gemini

## What are Mini Apps?

Mini Apps are interactive tools you can create directly in Gemini using simple prompts. They run in your browser and don't require coding knowledge.

## Types of Mini Apps

1. **Calculators** - ROI calculators, pricing tools, budget planners
2. **Generators** - Content generators, name generators, idea generators
3. **Analyzers** - Text analyzers, sentiment analyzers, keyword extractors
4. **Planners** - Content calendars, project timelines, goal trackers
5. **Quizzes** - Lead magnets, assessments, personality tests

## How to Create a Mini App

Use this prompt template:

\`\`\`
Create an interactive mini app that [describes what it does].

Features:
- [Feature 1]
- [Feature 2]
- [Feature 3]

Make it visually appealing with a modern design.
\`\`\`

## Example: ROI Calculator

\`\`\`
Create an interactive ROI calculator mini app for social media automation.

Features:
- Input: Hours spent per week on social media
- Input: Hourly rate
- Input: Number of posts per week
- Output: Annual time savings
- Output: Annual cost savings
- Output: ROI percentage

Make it visually appealing with a modern design and clear labels.
\`\`\`

## Example: Content Calendar Generator

\`\`\`
Create an interactive content calendar generator.

Features:
- Select number of posts per week
- Choose content pillars (3-5 topics)
- Set posting days
- Generate 30-day calendar with post ideas
- Export as CSV

Make it visually appealing with color-coded content pillars.
\`\`\`

## Pro Tips

1. **Start simple** - Add features incrementally
2. **Test immediately** - Gemini generates working code
3. **Iterate** - Ask for changes: "Make the buttons bigger" or "Add a dark mode"
4. **Save the code** - Copy HTML to reuse later
5. **Share with team** - Mini apps work in any browser

## Common Use Cases

- **Lead magnets** - Quizzes and assessments
- **Client tools** - ROI calculators and planners
- **Internal tools** - Project trackers and dashboards
- **Content tools** - Generators and analyzers
`,
    icon: "🛠️",
  },
  {
    id: "gemini-guide",
    title: "Gemini Mastery Guide",
    description: "Complete beginner-friendly guide to using Gemini for social media automation",
    category: "Tools",
    content: `# Gemini Mastery Guide

## The 4-Part Prompt Formula

Every powerful prompt follows this structure:

### 1. **Persona** - Who are you?
Define the role or expertise level you want the AI to adopt.
- Example: "You are a social media marketing expert with 10 years of experience"

### 2. **Task** - What should it do?
Be specific about the action you want.
- Example: "Create 5 LinkedIn post ideas for a B2B SaaS company"

### 3. **Context** - What's the situation?
Provide background information and constraints.
- Example: "Our target audience is HR directors, our budget is $5K/month, we focus on employee retention"

### 4. **Format** - How should it present it?
Specify the output structure.
- Example: "Format as a numbered list with headline, body text, and hashtags for each post"

## Quick Tips

1. **Be specific** - Vague prompts = vague results
2. **Use examples** - Show what good looks like
3. **Iterate** - Refine based on results
4. **Test variations** - Try different phrasings
5. **Save templates** - Create reusable prompt templates

## Google Workspace Integration

Gemini integrates seamlessly with:
- **Gmail** - Draft emails, summarize threads
- **Docs** - Help write, edit, and organize documents
- **Sheets** - Analyze data, create formulas
- **Slides** - Generate content and design ideas

## Next Steps

1. Sign up for Gemini Advanced at google.com/gemini
2. Try the Brand Alignment GEM to define your voice
3. Practice the 4-part formula with your own content
4. Save your best prompts for reuse
`,
    icon: "✨",
  },
  {
    id: "viralwave-workflows",
    title: "ViralWave Complete Workflows",
    description: "Step-by-step workflows for automated social media content creation",
    category: "Tools",
    content: `# ViralWave Complete Workflows

## Getting Started

ViralWave Studio is your AI-powered content creation and scheduling platform.

### Initial Setup (5 minutes)

1. **Sign up** at viralwavestudio.com?via=huxley17
2. **Connect accounts** - Instagram, LinkedIn, Twitter, TikTok
3. **Upload Brand Alignment Doc** - Paste your brand voice from the GEM
4. **Set posting schedule** - Choose days and times
5. **Define content pillars** - 3-5 main topics

## Workflow 1: Brand Authority Posts

### What You Need:
- 3-5 high-quality photos of yourself (1000x1000px minimum)
- Brand Alignment Doc from Gemini GEM

### Steps:

1. **Upload Photos** to Brand Authority feature
2. **Generate Post Ideas** using AI
3. **Select Best Ideas** (3-5 posts)
4. **Customize Captions** with your voice
5. **Generate Custom Images** featuring you
6. **Schedule Posts** across platforms

### Pro Tips:
- Use professional headshots + casual photos
- Mix action shots and talking head shots
- Avoid heavily filtered images
- High resolution = better AI results

## Workflow 2: Content Calendar Creation

### Steps:

1. **Open Calendar View**
2. **Set Frequency** (e.g., 3 posts/week)
3. **Choose Content Pillars**
   - Educational (40%)
   - Behind-the-scenes (30%)
   - Promotional (20%)
   - Engagement (10%)
4. **Generate 30 Days** of content
5. **Review and Edit** each post
6. **Schedule All** with one click

## Workflow 3: Rapid Post Creation

### For Quick Posts (5 minutes):

1. **Open Post Generator**
2. **Paste Context** (event, news, idea)
3. **Select Platform** (Instagram, LinkedIn, etc.)
4. **Generate 5 Variations**
5. **Pick Best One**
6. **Edit if Needed**
7. **Post Immediately** or Schedule

## Workflow 4: Multi-Platform Distribution

### Same Content, Multiple Platforms:

1. **Create Master Post** in ViralWave
2. **Adapt for Each Platform:**
   - **LinkedIn:** Professional tone, longer form
   - **Instagram:** Visual focus, emojis, hashtags
   - **Twitter:** Concise, thread-friendly
   - **TikTok:** Casual, trending sounds
3. **Schedule All** at optimal times
4. **Track Performance** across platforms

## Best Practices

1. **Batch Content** - Create 1 week at a time
2. **Review Before Posting** - AI needs human touch
3. **Engage Within 1 Hour** - Respond to comments quickly
4. **Analyze Weekly** - What's working?
5. **Adjust Strategy** - Double down on winners

## Common Mistakes to Avoid

❌ **Don't:**
- Post without reviewing
- Ignore engagement
- Use same content across all platforms
- Forget to add personality
- Schedule too far in advance

✅ **Do:**
- Add personal touches
- Respond to comments
- Adapt content per platform
- Test different times
- Monitor analytics


## Getting Started

ViralWave Studio is your AI-powered content creation platform for social media.

### Step 1: Set Up Your Brand Profile
- Add your brand name, industry, and target audience
- Upload your logo and brand colors
- Write your brand voice guidelines

### Step 2: Connect Your Social Accounts
- Link Instagram, TikTok, LinkedIn, Twitter
- Set posting schedules and frequency
- Define content pillars

### Step 3: Generate Content
- Use AI to generate post ideas
- Customize with your brand voice
- Schedule posts in advance

## Best Practices

1. **Consistency** - Post regularly on a schedule
2. **Engagement** - Respond to comments within 24 hours
3. **Analytics** - Review performance weekly
4. **Variation** - Mix content types (video, carousel, reels)
5. **Authenticity** - Add personal touches to AI content

## Content Pillars

Define 3-5 main topics for your content:
- Educational content
- Behind-the-scenes
- Customer stories
- Product/service updates
- Industry insights

## Troubleshooting

**Content doesn't match my brand?**
- Refine your brand voice guidelines
- Provide more specific examples
- Adjust tone and style settings

**Posts not getting engagement?**
- Check posting times (test different times)
- Review hashtag strategy
- Analyze competitor content
- Vary content types
`,
    icon: "🚀",
  },
  {
    id: "captions-guide",
    title: "Captions.ai Video Editing",
    description: "Master video editing, auto-captions, and AI avatar features",
    category: "Tools",
    content: `# Captions.ai Video Editing Guide

## Getting Started with Captions.ai

Captions.ai is your all-in-one video editing platform with AI-powered features.

### Key Features

1. **Auto-Captions** - Automatically generate captions in 100+ languages
2. **AI Avatars** - Create videos with AI-generated presenters
3. **Video Editing** - Cut, trim, add effects, and transitions
4. **Subtitle Styling** - Customize fonts, colors, and animations
5. **Multi-Language** - Translate and caption in multiple languages

## Step-by-Step: Creating Your First Video

### 1. Upload or Record
- Upload existing video files
- Record directly in the platform
- Supported formats: MP4, MOV, WebM

### 2. Generate Captions
- Click "Auto-Caption"
- Select language
- Review and edit captions
- Adjust timing if needed

### 3. Style Your Captions
- Choose font and size
- Add background colors
- Set animation effects
- Position on screen

### 4. Add AI Avatar (Optional)
- Select avatar style
- Write your script
- Generate AI voiceover
- Sync with video

### 5. Export and Share
- Choose resolution (720p, 1080p, 4K)
- Select format (MP4, WebM)
- Download or share directly

## Pro Tips

1. **Captions increase engagement** - 80% of viewers watch with sound off
2. **Keep text readable** - Use high contrast colors
3. **Sync timing** - Ensure captions match speech
4. **Test on mobile** - Most views are on phones
5. **Use templates** - Save time with preset styles

## Best Practices

- Keep captions concise (5-10 words per line)
- Use speaker names for clarity
- Add visual effects to emphasize key points
- Test audio quality before uploading
- Keep videos under 60 seconds for social media
`,
    icon: "🎬",
  },
  {
    id: "ai-content-calendar",
    title: "Building Your AI Content Calendar",
    description: "Step-by-step guide for planning and scheduling content with AI assistance",
    category: "Content Strategy",
    content: `# Building Your AI Content Calendar

## Why You Need a Content Calendar

A content calendar helps you:
- **Stay Consistent** - Post regularly without scrambling
- **Plan Ahead** - Align content with business goals
- **Save Time** - Batch create content in advance
- **Track Performance** - See what works over time
- **Maintain Quality** - Review and refine before posting

## The 30-Day Content Calendar Framework

### Step 1: Define Your Content Pillars (3-5 Topics)

Choose topics that align with your business and audience interests.

**Example for a Social Media Agency:**
1. **AI Tools & Automation** (30%)
2. **Content Strategy Tips** (25%)
3. **Client Success Stories** (20%)
4. **Behind-the-Scenes** (15%)
5. **Industry News & Trends** (10%)

### Step 2: Set Your Posting Frequency

**Recommended Starting Point:**
- **LinkedIn:** 3-5x per week
- **Instagram:** 4-7x per week (mix of posts, reels, stories)
- **TikTok:** 3-5x per week
- **Twitter:** 1-3x per day

### Step 3: Use Gemini to Generate Ideas

**Prompt Template:**
\`\`\`
You are a social media content strategist.

Create a 30-day content calendar for [YOUR BUSINESS].

Content Pillars:
- [Pillar 1]: [Percentage]
- [Pillar 2]: [Percentage]
- [Pillar 3]: [Percentage]

Posting Frequency: [X posts per week]
Platforms: [LinkedIn, Instagram, etc.]

Format as a table with:
- Date
- Content Pillar
- Post Topic
- Content Type (carousel, reel, text post)
- Hook/Headline
\`\`\`

### Step 4: Batch Create Content

**Weekly Batching Schedule:**
- **Monday:** Plan next week's topics
- **Tuesday:** Write captions and scripts
- **Wednesday:** Create visuals/videos
- **Thursday:** Schedule all posts
- **Friday:** Review analytics and adjust

### Step 5: Use ViralWave for Scheduling

1. **Import Calendar** - Add all topics to ViralWave
2. **Generate Drafts** - Use AI to create initial versions
3. **Customize** - Add personal touches and brand voice
4. **Schedule** - Set optimal posting times
5. **Review Queue** - Check upcoming posts

## Content Mix Formula

### The 80/20 Rule:
- **80% Value** - Educational, entertaining, inspiring
- **20% Promotional** - Products, services, offers

### Content Type Mix:
- **40% Educational** - Tips, tutorials, how-tos
- **30% Engagement** - Questions, polls, discussions
- **20% Storytelling** - Case studies, behind-the-scenes
- **10% Promotional** - Offers, product launches

## Monthly Content Calendar Template

### Week 1: Introduction & Education
- **Monday:** Industry tip (Educational)
- **Wednesday:** Behind-the-scenes (Storytelling)
- **Friday:** Client win (Social proof)

### Week 2: Engagement & Community
- **Monday:** Ask a question (Engagement)
- **Wednesday:** Share a tool/resource (Educational)
- **Friday:** Trending topic commentary (Thought leadership)

### Week 3: Deep Dive & Value
- **Monday:** Tutorial or how-to (Educational)
- **Wednesday:** Case study (Storytelling)
- **Friday:** Industry news analysis (Thought leadership)

### Week 4: Promotion & Recap
- **Monday:** Product/service highlight (Promotional)
- **Wednesday:** Month recap (Engagement)
- **Friday:** Teaser for next month (Anticipation)

## AI Tools for Content Calendar Management

1. **Gemini** - Generate ideas and outlines
2. **ViralWave** - Schedule and publish
3. **Notion/Airtable** - Track calendar and performance
4. **Canva** - Design visuals
5. **Captions.ai** - Create videos

## Best Practices

✅ **Do:**
- Plan 2-4 weeks ahead
- Leave room for spontaneous posts
- Review and adjust monthly
- Track what performs best
- Repurpose top content

❌ **Don't:**
- Schedule too far in advance (max 4 weeks)
- Ignore trending topics
- Post without reviewing
- Forget to engage with comments
- Use same content across all platforms

## Measuring Success

### Key Metrics to Track:
- **Engagement Rate** - Likes, comments, shares
- **Reach** - How many people see your content
- **Click-Through Rate** - Link clicks
- **Follower Growth** - New followers per week
- **Best Performing Topics** - Which pillars work best

### Monthly Review Questions:
1. Which content pillar performed best?
2. What posting times got most engagement?
3. Which content types (reels, carousels, text) worked?
4. What topics should we do more of?
5. What should we stop doing?

## Getting Started Checklist

- [ ] Define 3-5 content pillars
- [ ] Set posting frequency per platform
- [ ] Generate 30-day topic ideas with Gemini
- [ ] Create content calendar spreadsheet
- [ ] Batch create Week 1 content
- [ ] Schedule posts in ViralWave
- [ ] Set weekly review reminder
`,
    icon: "📅",
  },
  {
    id: "automating-workflows",
    title: "Automating Social Media Workflows",
    description: "Complete automation workflows using AI tools to save 10+ hours per week",
    category: "Automation",
    content: `# Automating Social Media Workflows

## The 10-Hour Time Savings Blueprint

By automating your social media workflows, you can save **10+ hours per week** and focus on strategy and growth.

## Workflow 1: Content Idea to Published Post (15 minutes)

### Manual Process (2 hours):
1. Brainstorm topic ideas
2. Research and outline
3. Write caption
4. Create visual
5. Edit and refine
6. Post manually

### Automated Process (15 minutes):

**Step 1: Generate Ideas (2 min)**
- Use **Lead Gen GPT** or **Atlas Prompt Engineer**
- Input: Your content pillar
- Output: 10 post ideas

**Step 2: Create Content (5 min)**
- Use **ViralWave** AI generator
- Input: Selected idea + brand voice
- Output: Caption, hashtags, CTA

**Step 3: Create Visual (5 min)**
- Use **Leonardo.ai** for images
- Use **Captions.ai** for videos
- Input: Post topic
- Output: Branded visual

**Step 4: Schedule (3 min)**
- Add to **ViralWave** calendar
- Set optimal posting time
- Review and publish

## Workflow 2: Weekly Content Batch (1 hour for 15 posts)

### The Sunday Batch System:

**9:00 AM - Topic Generation (15 min)**
\`\`\`
Prompt for Gemini:
"Generate 15 social media post topics for this week.
Content pillars: [Your pillars]
Target audience: [Your audience]
Format: Table with Date, Topic, Platform, Content Type"
\`\`\`

**9:15 AM - Caption Writing (20 min)**
- Use **ViralWave** bulk generator
- Input all 15 topics
- Generate first drafts
- Quick review and edits

**9:35 AM - Visual Creation (20 min)**
- Use **Canva** templates
- Use **Leonardo.ai** for unique images
- Batch export all visuals

**9:55 AM - Scheduling (5 min)**
- Upload to **ViralWave**
- Set posting times
- Review queue
- Done for the week!

## Workflow 3: Video Content Automation

### From Script to Published Video (20 minutes)

**Step 1: Script Generation (5 min)**
\`\`\`
Gemini Prompt:
"Write a 60-second video script about [topic].
Target audience: [audience]
Tone: [professional/casual/funny]
Include: Hook, 3 key points, CTA"
\`\`\`

**Step 2: Video Creation (10 min)**
- Record yourself or use **Captions.ai** AI avatar
- Upload to **Captions.ai**
- Auto-generate captions
- Add B-roll and effects

**Step 3: Multi-Platform Export (5 min)**
- Export for TikTok (9:16)
- Export for Instagram Reels (9:16)
- Export for LinkedIn (1:1 or 16:9)
- Schedule in **ViralWave**

## Workflow 4: Engagement Automation

### Daily Engagement Routine (15 minutes)

**Morning (5 min):**
- Check **ViralWave** analytics
- Respond to comments
- Like and reply to mentions

**Afternoon (5 min):**
- Engage with 10 target accounts
- Comment on relevant posts
- Share valuable content

**Evening (5 min):**
- Review day's performance
- Adjust next day's schedule if needed
- Plan tomorrow's engagement targets

## Workflow 5: Repurposing Content

### One Piece of Content → 10 Posts

**Start with:** 1 blog post, podcast episode, or video

**Create:**
1. **LinkedIn Article** - Full long-form
2. **LinkedIn Carousel** - Key takeaways
3. **Instagram Carousel** - Visual summary
4. **Instagram Reel** - 60-second highlight
5. **TikTok Video** - Trending format
6. **Twitter Thread** - 10-tweet breakdown
7. **Instagram Story** - Behind-the-scenes
8. **LinkedIn Text Post** - Key insight
9. **Email Newsletter** - Deep dive
10. **Pinterest Pin** - Infographic

**Tools:**
- **Gemini** - Repurpose content formats
- **ViralWave** - Schedule across platforms
- **Canva** - Create visuals
- **Captions.ai** - Edit videos

## Automation Stack

### Essential Tools:
1. **Gemini Advanced** - Content generation
2. **ViralWave Studio** - Scheduling and publishing
3. **Leonardo.ai** - Image creation
4. **Captions.ai** - Video editing
5. **Klipy.ai** - CRM and lead tracking

### Optional Tools:
- **Fireflies.ai** - Meeting transcription
- **NotebookLM** - Research and insights
- **Perplexity** - Deep research

## Time Savings Breakdown

### Before Automation (20 hours/week):
- Content ideation: 3 hours
- Writing captions: 5 hours
- Creating visuals: 6 hours
- Scheduling posts: 2 hours
- Engagement: 4 hours

### After Automation (10 hours/week):
- Content ideation: 1 hour (AI-assisted)
- Writing captions: 2 hours (AI drafts + editing)
- Creating visuals: 3 hours (AI tools + templates)
- Scheduling posts: 1 hour (bulk scheduling)
- Engagement: 3 hours (focused strategy)

**Total Savings: 10 hours per week = 520 hours per year**

## Getting Started Action Plan

### Week 1: Setup
- [ ] Sign up for Gemini Advanced
- [ ] Create ViralWave account
- [ ] Set up brand voice in all tools
- [ ] Create content pillar document

### Week 2: Test Workflows
- [ ] Try Workflow 1 (single post)
- [ ] Try Workflow 2 (weekly batch)
- [ ] Measure time spent
- [ ] Refine process

### Week 3: Scale
- [ ] Implement all workflows
- [ ] Create templates and prompts
- [ ] Schedule 2 weeks ahead
- [ ] Track results

### Week 4: Optimize
- [ ] Review analytics
- [ ] Identify best-performing content
- [ ] Adjust workflows
- [ ] Document your system

## Common Mistakes to Avoid

❌ **Don't:**
- Automate without reviewing
- Use AI content without editing
- Ignore engagement
- Schedule too far in advance
- Forget to track results

✅ **Do:**
- Review all AI-generated content
- Add personal touches
- Respond to comments quickly
- Test different approaches
- Measure and optimize
`,
    icon: "⚙️",
  },
  {
    id: "advanced-prompt-engineering",
    title: "Advanced Prompt Engineering",
    description: "Master advanced techniques for crafting powerful prompts for business, security, and marketing",
    category: "Prompting",
    content: `# Advanced Prompt Engineering

## Beyond the Basics

Once you've mastered the 4-part formula (Persona-Task-Context-Format), it's time to level up with advanced techniques.

## Technique 1: Chain-of-Thought Prompting

### What It Is:
Ask the AI to "think step-by-step" before answering.

### Why It Works:
Forces the AI to reason through complex problems systematically.

### Example:
\`\`\`
You are a business strategy consultant.

Analyze whether my company should expand into the Australian market.

Think step-by-step:
1. Assess market size and demand
2. Evaluate competition
3. Calculate costs and ROI
4. Identify risks
5. Provide recommendation

Company details: [Your details]
\`\`\`

## Technique 2: Few-Shot Learning

### What It Is:
Provide 2-3 examples of desired output before asking for new content.

### Why It Works:
Shows the AI exactly what "good" looks like.

### Example:
\`\`\`
You are a LinkedIn content creator.

Create LinkedIn posts in this style:

Example 1:
"3 lessons from losing my first client:

1. Don't overpromise
2. Set clear expectations
3. Communicate early and often

What I learned: Honesty beats hype every time."

Example 2:
"Most businesses fail at social media because:

❌ They post without strategy
✅ They should plan content pillars first

Start with 3 topics your audience cares about."

Now create 5 posts about [YOUR TOPIC] in this style.
\`\`\`

## Technique 3: Perspective-Transition Prompting

### What It Is:
Ask AI to answer from multiple perspectives, then synthesize.

### Why It Works:
Reduces bias and increases depth.

### Example:
\`\`\`
[YOUR QUESTION]

Answer as a well-informed 1st-person deep search of the web.
Then critique as a 3rd-person analyst (expert on the matter).
Finally, merge both to share your conclusion.
\`\`\`

## Technique 4: Constraint-Based Prompting

### What It Is:
Add specific constraints to force creativity.

### Why It Works:
Limitations spark innovation.

### Example:
\`\`\`
Create a LinkedIn post about AI automation.

Constraints:
- Exactly 150 words
- No buzzwords ("synergy", "leverage", "disrupt")
- Include 1 surprising statistic
- End with a question
- Use simple 6th-grade language
\`\`\`

## Technique 5: Iterative Refinement

### What It Is:
Use AI output as input for the next prompt.

### Why It Works:
Builds on previous context for better results.

### Example:
\`\`\`
Prompt 1: "Generate 10 blog post ideas about social media automation"

Prompt 2: "Expand idea #3 into a detailed outline"

Prompt 3: "Write the introduction section from the outline"

Prompt 4: "Make the introduction more conversational and add a hook"
\`\`\`

## Technique 6: Role-Playing Scenarios

### What It Is:
Create a specific scenario for the AI to respond to.

### Why It Works:
Adds context and realism.

### Example:
\`\`\`
You are a sales consultant.

A potential client just said: "Your price is too high compared to competitors."

Provide 3 different responses:
1. Value-based response
2. Comparison-based response
3. Question-based response

For each, explain why it works.
\`\`\`

## Technique 7: Negative Prompting

### What It Is:
Tell the AI what NOT to do.

### Why It Works:
Prevents common mistakes.

### Example:
\`\`\`
Write a professional email to a client.

DO NOT:
- Use corporate jargon
- Make it longer than 100 words
- Sound overly formal
- Include multiple CTAs

DO:
- Be conversational
- Get to the point quickly
- Include one clear next step
\`\`\`

## Technique 8: Meta-Prompting

### What It Is:
Ask the AI to improve your prompt.

### Why It Works:
Leverages AI to optimize your prompts.

### Example:
\`\`\`
I want to create LinkedIn posts about AI tools.

Here's my current prompt:
"Write 5 LinkedIn posts about AI tools"

Improve this prompt to get better results.
Then use the improved prompt to generate the posts.
\`\`\`

## Business Use Cases

### Marketing:
\`\`\`
You are a conversion copywriter.

Rewrite this landing page headline to increase conversions.

Current: "We help businesses grow"

Target audience: B2B SaaS companies with 10-50 employees
Pain point: Struggling to generate leads
Desired outcome: 2x more demo bookings

Provide 10 variations.
For each, explain the psychological trigger used.
\`\`\`

### Sales:
\`\`\`
You are a B2B sales strategist.

Create a cold outreach sequence for [PRODUCT].

Sequence:
- Email 1: Problem awareness (Day 1)
- Email 2: Solution introduction (Day 3)
- Email 3: Social proof (Day 7)
- Email 4: Limited offer (Day 10)

Target: HR Directors at 100-1000 employee companies
Tone: Professional but conversational
Goal: Book 15-minute discovery call
\`\`\`

### Security:
\`\`\`
You are a cybersecurity consultant.

Audit this business for security vulnerabilities.

Business details:
- 25 employees
- Remote-first
- Uses Google Workspace
- No dedicated IT team
- Handles customer data

Provide:
1. Top 5 security risks
2. Priority ranking (High/Medium/Low)
3. Specific actions to mitigate each risk
4. Estimated cost and time for each
\`\`\`

## Prompt Templates Library

### Content Creation:
\`\`\`
You are a [ROLE].

Create [NUMBER] [CONTENT TYPE] about [TOPIC].

Target audience: [AUDIENCE]
Brand voice: [VOICE]
Goal: [OUTCOME]

Format:
- [STRUCTURE]

Examples of good [CONTENT TYPE]:
[EXAMPLE 1]
[EXAMPLE 2]
\`\`\`

### Problem Solving:
\`\`\`
You are a [EXPERT ROLE].

I'm facing this problem: [PROBLEM]

Context:
- [CONSTRAINT 1]
- [CONSTRAINT 2]
- [CONSTRAINT 3]

Think step-by-step:
1. Identify root cause
2. Generate 3 solutions
3. Compare pros/cons
4. Recommend best approach
5. Provide implementation steps
\`\`\`

### Analysis:
\`\`\`
You are a [ANALYST ROLE].

Analyze [SUBJECT] and provide insights.

Data: [DATA/CONTEXT]

Provide:
1. Key findings (3-5 points)
2. Patterns and trends
3. Recommendations
4. Potential risks
5. Next steps

Format as executive summary.
\`\`\`

## Best Practices

✅ **Do:**
- Be specific and detailed
- Provide context and examples
- Iterate and refine
- Test different approaches
- Save successful prompts
- Use constraints creatively

❌ **Don't:**
- Be vague or generic
- Assume AI knows your context
- Accept first output
- Use same prompt for everything
- Forget to specify format
- Ignore negative examples

## Measuring Prompt Quality

### Good Prompt Checklist:
- [ ] Clear role/persona defined
- [ ] Specific task stated
- [ ] Sufficient context provided
- [ ] Output format specified
- [ ] Constraints included
- [ ] Examples given (if needed)
- [ ] Success criteria clear

## Resources

### Tools:
- **Atlas Prompt Engineer GPT** - Optimize your prompts
- **Lead Gen GPT** - B2B lead generation prompts
- **Brand Alignment GEM** - Generate brand context

### Further Learning:
- Google's Prompt Engineering Guide (PDF)
- OpenAI Prompt Engineering Documentation
- Anthropic's Prompt Library

## Practice Exercises

### Exercise 1: Improve This Prompt
**Before:** "Write a blog post about marketing"

**After:** [Your improved version]

### Exercise 2: Create a Chain-of-Thought Prompt
Topic: Should my business invest in AI automation?

### Exercise 3: Build a Few-Shot Prompt
Create 3 examples of your best social media posts, then ask AI to generate more.

## Getting Started

1. **Start Simple** - Master the 4-part formula first
2. **Experiment** - Try one advanced technique per week
3. **Document** - Save prompts that work
4. **Iterate** - Refine based on results
5. **Share** - Learn from others' prompts
`,
    icon: "🧠",
  },
];

export default function Wiki() {
  const { user, loading, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<WikiGuide | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(WIKI_GUIDES.map((g) => g.category)))];

  const filteredGuides = WIKI_GUIDES.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.title.localeCompare(b.title));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-purple mx-auto mb-4" />
          <p className="text-gray-600">Loading wiki...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white">
        <div className="container max-w-md text-center space-y-6 p-8">
          <img src={APP_LOGO} alt="Workshop Logo" className="w-24 h-24 mx-auto" />
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="text-white/80">
            Sign in to access the wiki and all learning resources.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full">
              Sign In to Continue
            </Button>
          </a>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Knowledge Base</h1>
                <p className="text-white/80">Learning guides and resources</p>
              </div>
            </div>
            <Link href="/portal">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                Back to Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container max-w-6xl">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-brand-purple text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-brand-purple"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Guides Grid */}
          {selectedGuide ? (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <button
                onClick={() => setSelectedGuide(null)}
                className="text-brand-purple hover:text-brand-purple/80 font-semibold mb-4"
              >
                ← Back to Guides
              </button>

              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-6xl">{selectedGuide.icon}</div>
                    <div>
                      <h1 className="text-4xl font-bold text-brand-purple mb-2">
                        {selectedGuide.title}
                      </h1>
                      <p className="text-gray-600 text-lg">{selectedGuide.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                      {selectedGuide.category}
                    </span>
                  </div>
                </div>

                {/* Workshop Recording Banner */}
                <div className="bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border-2 border-brand-purple/30 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🎥</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-brand-purple mb-2">Watch the Workshop Recording</h3>
                      <p className="text-gray-700 mb-4">
                        See this guide in action! Watch the full workshop recording where we cover this topic step-by-step.
                      </p>
                      <Link href="/portal">
                        <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                          <Video className="w-4 h-4 mr-2" />
                          Access Workshop Recordings
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Guide Content */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {selectedGuide.content}
                    </div>
                  </div>
                </div>

                {/* Download Actions */}
                <div className="bg-gradient-to-r from-orange-50 to-purple-50 border-2 border-orange-200 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📥 Download This Guide</h3>
                  <p className="text-gray-700 mb-4">
                    Save this guide as markdown to use in your AI platforms (Gemini, ChatGPT, Claude) or keep for reference.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        const element = document.createElement("a");
                        element.setAttribute(
                          "href",
                          "data:text/markdown;charset=utf-8," + encodeURIComponent(selectedGuide.content)
                        );
                        element.setAttribute("download", `${selectedGuide.id}.md`);
                        element.style.display = "none";
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                      }}
                      className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download as Markdown (.md)
                    </Button>
                    <Button
                      onClick={() => {
                        const element = document.createElement("a");
                        element.setAttribute(
                          "href",
                          "data:text/plain;charset=utf-8," + encodeURIComponent(selectedGuide.content)
                        );
                        element.setAttribute("download", `${selectedGuide.id}.txt`);
                        element.style.display = "none";
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                      }}
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download as Text (.txt)
                    </Button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                  <Link href="/portal">
                    <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple/10">
                      ← Back to Portal
                    </Button>
                  </Link>
                  <Link href="/wiki">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      Browse All Guides
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <Card
                    key={guide.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-brand-purple"
                    onClick={() => setSelectedGuide(guide)}
                  >
                    <CardHeader>
                      <div className="text-4xl mb-2">{guide.icon}</div>
                      <CardTitle className="text-brand-purple">{guide.title}</CardTitle>
                      <CardDescription className="text-gray-600">{guide.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{guide.description}</p>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGuide(guide);
                        }}
                        className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white"
                      >
                        Read Guide
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg">No guides found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(var(--brand-dark-purple))] text-white/80 py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm">
            Questions? Email:{" "}
            <a href="mailto:info@thzn.world" className="hover:text-white underline">
              info@thzn.world
            </a>
          </p>
          <p className="text-sm mt-2">© 2024 {APP_TITLE}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
