import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Search, Download, ExternalLink, Loader2, BookOpen, Video } from "lucide-react";
import { WikiGuideRenderer } from "@/components/WikiGuideRenderer";
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
  {
    id: "manus-mastery",
    title: "Manus Mastery: AI Automation Platform",
    description: "Your complete guide to building workflows and automating business processes with Manus",
    category: "Essential Tools",
    content: `# Manus Mastery

## What is Manus?

Manus is the AI-powered automation platform that runs this entire Tech Horizon Academy. It's your operations center for connecting tools, building workflows, and automating repetitive tasks—no code required.

## Why Manus?

**Key Benefits:**
- No-code AI automation
- Connect 1000+ apps and services  
- Build intelligent AI agents
- Enterprise-grade security
- Real-time collaboration

**Use Cases:**
- Marketing automation (social media, content generation)
- Sales workflows (lead enrichment, email sequences)
- Customer support (AI chatbots, ticket routing)
- Data processing (web scraping, reports)
- Business operations (invoices, documents)

## Getting Started

### Step 1: Create Your Account
Visit https://manus.im/invitation/XYJX3HZH1Q1JDVD and sign up with email or Google.

### Step 2: Complete the Tutorial
Manus provides an interactive onboarding that teaches you the basics in 10 minutes.

### Step 3: Explore Templates
Browse the template library for pre-built workflows you can customize.

## Core Concepts

### Workflows
Sequences of actions that run automatically:
- **Scheduled** - Run at specific times
- **Event-Driven** - Triggered by external events
- **Manual** - Run on demand
- **Webhook** - Triggered by HTTP requests

### AI Agents
Intelligent assistants that make decisions:
- Natural language understanding
- Context-aware responses
- Multi-step reasoning
- Tool usage and memory

### Integrations
Connect to your existing tools:
- Google Workspace (Gmail, Drive, Sheets, Calendar)
- Slack, Stripe, Airtable, OpenAI
- Zapier (5000+ app connections)

## Common Workflows

**Content Calendar Automation:**
1. Generate post ideas with AI weekly
2. Create images with DALL-E
3. Save to content calendar
4. Schedule posts automatically
5. Notify team in Slack

**Lead Enrichment Pipeline:**
1. New lead triggers workflow
2. Search for company info
3. Find decision-makers
4. Score lead quality
5. Assign to sales rep
6. Send personalized email

**Customer Support Bot:**
1. New ticket triggers workflow
2. Analyze ticket content
3. Search knowledge base
4. Generate response draft
5. Route to appropriate team
6. Send confirmation

## Best Practices

✅ **Do:**
- Start with simple workflows
- Test thoroughly before deploying
- Document your workflows
- Use error handling
- Monitor performance regularly

❌ **Don't:**
- Over-complicate workflows
- Ignore error handling
- Hard-code values (use variables)
- Skip testing
- Forget security for sensitive data

## Resources

- Documentation: https://docs.manus.im
- Template Library: https://manus.im/templates
- Community Forum: https://community.manus.im
- YouTube Tutorials: https://youtube.com/@manusai

## Getting Help

1. Check documentation (most answers are there)
2. Search community forum
3. Contact support: support@manus.im
4. Book consultation with Manus experts

## Next Steps

1. Sign up at https://manus.im/invitation/XYJX3HZH1Q1JDVD
2. Complete the onboarding tutorial
3. Browse and customize templates
4. Build your first workflow
5. Join the community
6. Explore integrations
7. Scale up as you grow

**Ready to automate?** Get started with Manus today!
`,
    icon: "🤖",
  },
  {
    id: "google-workspace-setup",
    title: "Google Workspace Setup Guide",
    description: "Professional email, storage, and collaboration tools for your business",
    category: "Essential Tools",
    content: `# Google Workspace Setup Guide

## What is Google Workspace?

Google Workspace (formerly G Suite) is your business foundation: professional email, cloud storage, documents, spreadsheets, and calendar—all in one place.

**Every business needs Google Workspace. It's non-negotiable.**

## Why Google Workspace?

**Key Benefits:**
- Professional email (yourname@yourdomain.com)
- 30GB to unlimited storage
- Real-time collaboration
- Enterprise security (2FA, encryption)
- Mobile access from anywhere
- AI-powered features

**Business Impact:**
- Save 10+ hours/week on email and documents
- Reduce tool costs by $200-500/month
- Improve team collaboration
- Increase security

## Getting Started (Get 10% Off!)

### Step 1: Sign Up
Visit https://referworkspace.app.goo.gl/s6pi to get 10% off your first year.

### Step 2: Choose Your Plan

**Business Starter ($6/user/month)**
- 30GB storage per user
- Custom email
- Video meetings (100 participants)

**Business Standard ($12/user/month) ⭐ Recommended**
- 2TB storage per user
- Video meetings (150 participants)
- Recording and attendance tracking

**Business Plus ($18/user/month)**
- 5TB storage per user
- Video meetings (500 participants)
- Advanced security and compliance

### Step 3: Set Up Your Domain

**If you have a domain:**
1. Verify domain ownership
2. Update MX records for email
3. Add SPF, DKIM, DMARC for security
4. Wait 24-48 hours for propagation

**Need a domain?**
Buy through Google Domains ($12-15/year) for automatic configuration.

## Core Tools

### Gmail (Email)
**Essential Features:**
- Smart Compose (AI writing)
- Labels and filters (auto-organize)
- Schedule send (optimal timing)
- Confidential mode (expiring emails)
- Keyboard shortcuts (2x faster)

**Best Practices:**
- Aim for Inbox Zero daily
- Use labels instead of folders
- Set up filters for auto-categorization
- Unsubscribe from noise
- Archive (don't delete) for searchability

### Google Drive (Storage)
**Organization Strategy:**
- 01-Active Projects
- 02-Clients
- 03-Marketing
- 04-Operations
- 05-Archive
- 06-Personal

**Best Practices:**
- Use Shared Drives for teams
- Enable version history
- Set up offline access
- Use consistent file naming
- Regular cleanup and archiving

### Google Docs (Documents)
**Collaboration Features:**
- Real-time editing (multiple people)
- Suggesting mode (track changes)
- Comments (discuss sections)
- Version history (restore previous)
- Smart Compose (AI assistance)

### Google Sheets (Spreadsheets)
**Common Use Cases:**
- Financial tracking (budgets, revenue)
- Project management (tasks, timelines)
- Data analysis (reports, dashboards)
- CRM (customer tracking)
- Content calendar (planning)

### Google Calendar (Scheduling)
**Setup:**
- Create multiple calendars (Work, Personal)
- Color-code for visual organization
- Set working hours and focus time
- Enable email and mobile notifications
- Share calendars for team visibility

**Best Practices:**
- Time blocking for deep work
- 15-minute buffers between meetings
- Recurring events for reviews
- Appointment slots for bookings

## Security Best Practices

✅ **Must-Do:**
1. Enable 2-Factor Authentication (all users)
2. Set strong passwords (12+ characters)
3. Review third-party app access
4. Use Admin Console for management
5. Enable Advanced Protection for high-risk users
6. Regular security audits

❌ **Never:**
- Share passwords
- Use public WiFi without VPN
- Click suspicious email links
- Grant unnecessary admin access
- Ignore security alerts

## Essential Integrations

**Add-Ons:**
- Manus (workflow automation)
- Slack (team communication)
- Asana/Trello (project management)
- DocuSign (electronic signatures)

**Chrome Extensions:**
- Checker Plus for Gmail
- Save to Google Drive
- Google Calendar quick access
- Grammarly (writing assistant)

## Troubleshooting

**Emails Not Sending:**
- Check MX records
- Verify SPF/DKIM/DMARC
- Check spam folder
- Confirm user has license

**Storage Full:**
- Empty trash
- Delete large files
- Archive old emails
- Upgrade plan

## Resources

- Learning Center: https://support.google.com/a/users
- YouTube Tutorials: https://youtube.com/googleworkspace
- Admin Help: https://support.google.com/a
- Community Forum: https://community.google.com/workspace

## Next Steps

1. Sign up with our referral link (10% off)
2. Complete domain and email setup
3. Configure security (2FA, admin controls)
4. Train your team on best practices
5. Integrate with Manus and other tools
6. Optimize workflows and automate tasks

**Ready to upgrade your business?** Get Google Workspace today!
`,
    icon: "📧",
  },
  {
    id: "chatgpt-claude-guide",
    title: "ChatGPT & Claude: Choosing Your AI Assistant",
    description: "Complete comparison and usage guide for the two leading AI assistants",
    category: "Essential Tools",
    content: `# ChatGPT & Claude Guide

## The AI Assistant Landscape

ChatGPT and Claude are the two leading AI assistants for business. Both are powerful, but they have different strengths.

**You don't need both—pick one and master it.**

## ChatGPT vs Claude

### ChatGPT (OpenAI)
**Best For:**
- Content creation (blogs, social media, marketing)
- Code generation (Python, JavaScript, web dev)
- Data analysis (CSV files, spreadsheets, charts)
- Image generation (DALL-E integration)
- Custom GPTs (specialized assistants)

**Strengths:**
- Larger user base and community
- More integrations and plugins
- Better for creative tasks
- Image generation included
- Custom GPTs (reusable assistants)

**Pricing:**
- Free: GPT-3.5, limited features
- Plus ($20/month): GPT-4, DALL-E, custom GPTs
- Team ($25/user/month): Collaboration
- Enterprise: Custom pricing

### Claude (Anthropic)
**Best For:**
- Long documents (200K token context)
- Research and analysis (deep reasoning)
- Technical writing (documentation, reports)
- Code review (analyzing code)
- Ethical AI (cautious responses)

**Strengths:**
- Longer context (can process entire books)
- Better at complex instructions
- More nuanced responses
- Excellent for research
- Strong ethical guardrails

**Pricing:**
- Free: Claude 3 Sonnet, limited usage
- Pro ($20/month): Claude 3 Opus, 5x usage
- Team ($25/user/month): Collaboration
- Enterprise: Custom pricing

## Our Recommendation

### Choose ChatGPT if:
- You need image generation
- You want custom GPTs
- Content creation is your primary use
- You prefer a larger ecosystem

### Choose Claude if:
- You work with long documents
- You need deep analysis
- Research and technical writing are priorities
- You value thoughtful, nuanced responses

**Most businesses choose ChatGPT** for the broader feature set.

## Getting Started with ChatGPT

### Step 1: Sign Up
1. Visit https://chat.openai.com
2. Create account (email or Google)
3. Upgrade to Plus ($20/month) - Recommended
4. Complete onboarding

### Step 2: Set Custom Instructions

Tell ChatGPT about you and how to respond:

**What to include:**
- Your business and industry
- Target audience
- Brand voice
- Key focus areas

**How you want responses:**
- Be concise and actionable
- Use bullet points
- Provide specific examples
- Include relevant statistics
- Avoid jargon

## Essential Use Cases

### 1. Content Creation
**Blog Posts:**
Ask for 1000-word posts on specific topics with your target audience, tone, statistics, examples, and clear structure.

**Social Media:**
Request multiple posts with hooks, word counts, engagement questions, and relevant hashtags.

### 2. Data Analysis
Upload CSV files and ask for:
- Top customers by revenue
- Month-over-month growth
- Seasonal trends
- Summary charts
- Actionable recommendations

### 3. Code Generation
Request scripts with specific functionality, error handling, and comments.

### 4. Research & Summarization
Upload long documents and ask for:
- Key trends
- Competitor analysis
- Pain points
- Opportunities
- Executive summaries

## Custom GPTs (Plus/Team)

Specialized assistants you can create and reuse.

### Our Custom GPTs:

**Lead Gen GPT** - B2B lead generation
https://chatgpt.com/g/g-68f4618407a08191898be9e84f044326-lead-gen-gpt

**Atlas - Prompt Engineer** - Optimize prompts
https://chatgpt.com/g/g-68e45c22996c8191ac1a48482ee988ff-atlas-the-prompt-engineer

**HuxleyGPT** - Brand persona builder
https://chatgpt.com/g/g-huxleygpt

### Create Your Own GPT:
1. Click "Explore GPTs" in sidebar
2. Click "Create a GPT"
3. Describe what you want
4. Test and refine
5. Publish (private, shared, or public)

**Example GPTs:**
- Sales Email Writer
- Meeting Summarizer
- Content Repurposer
- Code Reviewer

## Best Practices

✅ **Do:**
- Be specific with prompts
- Provide context (background, audience, goals)
- Iterate and refine outputs
- Use examples to show what you want
- Save effective prompts
- Fact-check important claims

❌ **Don't:**
- Assume AI knows your context
- Accept first output without refinement
- Use for critical decisions alone
- Share sensitive/confidential data
- Ignore AI limitations and biases

## Advanced Techniques

### Chain-of-Thought Prompting
Ask AI to think step-by-step through complex problems.

### Few-Shot Learning
Provide 2-3 examples of desired output, then ask for more.

### Role-Playing
Ask AI to adopt a specific persona (CFO, marketing director, etc.).

## Integrations

**Connect ChatGPT:**
- Manus (automate in workflows)
- Zapier (5000+ apps)
- Make (visual automation)
- API (custom integrations)

**Browser Extensions:**
- ChatGPT Writer (email assistance)
- WebChatGPT (real-time search)
- ChatGPT for Google (search enhancement)

## Troubleshooting

**"I'm at capacity"**
- Upgrade to Plus for priority access
- Try off-peak hours
- Use GPT-3.5 instead of GPT-4

**Inaccurate Responses:**
- Provide more context
- Ask for sources
- Fact-check important claims
- Use web browsing mode

**Generic Outputs:**
- Be more specific in prompts
- Provide examples
- Use custom instructions
- Iterate and refine

## Resources

- OpenAI Documentation: https://platform.openai.com/docs
- Prompt Engineering Guide: https://platform.openai.com/docs/guides/prompt-engineering
- Community Forum: https://community.openai.com
- Reddit r/ChatGPT: https://reddit.com/r/ChatGPT

## Next Steps

1. Create ChatGPT account
2. Upgrade to Plus ($20/month)
3. Set custom instructions
4. Try our custom GPTs (Lead Gen, Atlas, HuxleyGPT)
5. Build your prompt library
6. Integrate with Manus
7. Join the community

**Ready to master AI?** Get started with ChatGPT today!
`,
    icon: "⚡",
  },
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
  {
    id: "business-model-canvas",
    title: "Business Model Canvas Framework",
    description: "Map your entire business model on one page using the 9 building blocks framework. Includes AI prompts for each component.",
    category: "Business Strategy",
    content: `# Business Model Canvas Framework

## Overview

The Business Model Canvas is a strategic management template for developing new business models or documenting existing ones. Created by Alexander Osterwalder, it visualizes the 9 key building blocks that form the foundation of every successful business.

This framework is used by millions of entrepreneurs and enterprises worldwide to map out their business strategy on a single page.

## The 9 Building Blocks

### 1. Customer Segments (Who)
Define the different groups of people or organizations your business aims to reach and serve.

**Key Questions:**
- Who are your most important customers?
- What are their needs, behaviors, and characteristics?
- How do you segment them?

**AI Prompt:**
\`\`\`
You are a business strategist specializing in customer segmentation.

Analyze my business and help me identify distinct customer segments.

Business Description: [YOUR BUSINESS]
Industry: [YOUR INDUSTRY]
Current Customers: [DESCRIBE CURRENT CUSTOMERS]

For each segment, provide:
1. Segment name and size estimate
2. Demographics and psychographics
3. Key needs and pain points
4. Buying behavior and decision criteria
5. Willingness to pay

Format as a table with clear distinctions between segments.
\`\`\`

### 2. Value Propositions (What)
Describe the bundle of products and services that create value for your customer segments.

**Key Questions:**
- What value do you deliver to customers?
- Which customer problems are you solving?
- What makes you different from competitors?

**AI Prompt:**
\`\`\`
You are a product strategist expert in value proposition design.

Help me craft compelling value propositions for each customer segment.

Customer Segment: [SEGMENT NAME]
Their Main Problem: [PROBLEM]
Our Solution: [YOUR SOLUTION]
Competitors: [LIST COMPETITORS]

Create:
1. A clear value proposition statement (1-2 sentences)
2. 3-5 key benefits that matter to this segment
3. Quantifiable outcomes (time saved, money saved, revenue increased)
4. Emotional benefits
5. Differentiation from competitors

Make it customer-focused, not product-focused.
\`\`\`

### 3. Channels (How to Reach)
Explain how your company communicates with and reaches its customer segments to deliver value.

**Key Questions:**
- Through which channels do customers want to be reached?
- How are you reaching them now?
- Which channels work best and are most cost-efficient?

**AI Prompt:**
\`\`\`
You are a marketing channel strategist.

Recommend the best channels to reach my target customers.

Customer Segment: [SEGMENT]
Budget: [YOUR BUDGET]
Current Channels: [LIST CURRENT CHANNELS]
Goals: [ACQUISITION/RETENTION/BOTH]

For each recommended channel, provide:
1. Channel name and type (owned/paid/earned)
2. Why it works for this segment
3. Expected cost per acquisition
4. Implementation complexity (1-5)
5. Timeline to see results
6. Key metrics to track

Prioritize channels by ROI potential.
\`\`\`

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

**AI Prompt:**
\`\`\`
You are a pricing strategist and revenue optimization expert.

Design optimal revenue streams for my business model.

Product/Service: [YOUR OFFERING]
Target Customer: [SEGMENT]
Competitor Pricing: [RANGE]
Cost to Deliver: [AMOUNT]
Target Margin: [X%]

Recommend:
1. Primary revenue model (subscription, one-time, usage-based, freemium, etc.)
2. Pricing tiers with features and price points
3. Upsell and cross-sell opportunities
4. Volume discounts or enterprise pricing
5. Payment terms and billing frequency
6. First-year revenue projection

Justify each pricing decision with market data or psychology.
\`\`\`

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

## Real-World Examples

### SaaS Business
- **Segments:** SMBs, Enterprise, Freelancers
- **Value:** Automation that saves 10 hours/week
- **Revenue:** Subscription ($49-$499/mo)
- **Channels:** Content marketing, SEO, partnerships

### E-commerce
- **Segments:** Millennials, Gen Z, Gift buyers
- **Value:** Unique handcrafted products
- **Revenue:** Product sales + subscription box
- **Channels:** Instagram, TikTok, influencer marketing

### Consulting
- **Segments:** Startups, Scale-ups
- **Value:** Expert guidance to avoid costly mistakes
- **Revenue:** Hourly, project-based, retainer
- **Channels:** Referrals, LinkedIn, speaking engagements

## AI Integration Tips

Use AI to:
- Generate customer personas for each segment
- Brainstorm unique value propositions
- Analyze competitor business models
- Calculate financial projections
- Create marketing channel strategies
- Optimize pricing models

## Expected Outcomes

✅ Complete business model mapped on one page  
✅ Clarity on all 9 components  
✅ Validated assumptions  
✅ Identified gaps and opportunities  
✅ Actionable next steps for each building block

**Time Investment:** 2-4 hours for initial canvas, ongoing refinement

**Difficulty:** Beginner-friendly
`,
    icon: "🎯",
  },
  {
    id: "ai-adoption-framework",
    title: "AI Technology Adoption Framework (25 Steps)",
    description: "A structured approach to understanding, evaluating, and implementing AI in your business. Based on Daniel Drescher's technology adoption methodology.",
    category: "Business Strategy",
    content: `# AI Technology Adoption Framework

## Overview

Adapted from Daniel Drescher's systematic approach to technology adoption, this framework breaks down AI implementation into 25 manageable steps. No technical jargon—just practical guidance for business leaders who need to make informed decisions about AI.

**Perfect for:** Non-technical business leaders, entrepreneurs, and decision-makers

## Phase 1: Understanding AI Fundamentals (Steps 1-5)

### Step 1: What is AI?
Understand AI as a tool that learns from data to make predictions or decisions.

**Think of it like:** A very fast pattern-matching assistant that gets better with practice.

### Step 2: Types of AI
- **Generative AI**: Creates content (text, images, video) - *Example: ChatGPT, Midjourney*
- **Predictive AI**: Forecasts outcomes - *Example: Sales forecasting, demand prediction*
- **Analytical AI**: Finds patterns in data - *Example: Customer segmentation*
- **Automation AI**: Performs repetitive tasks - *Example: Email responses, data entry*

### Step 3: How AI Learns
- **Supervised learning** - Learning from examples you provide
- **Unsupervised learning** - Finding patterns on its own
- **Reinforcement learning** - Learning through trial and error

### Step 4: AI Capabilities vs. Limitations

**✅ AI CAN:**
- Recognize patterns in large datasets
- Generate content based on examples
- Automate repetitive tasks
- Analyze data faster than humans
- Make predictions based on historical data

**❌ AI CANNOT:**
- Truly reason or understand context like humans
- Make ethical judgments
- Be creative in the human sense
- Replace strategic thinking
- Work well without good data

### Step 5: AI in Your Industry
Research how competitors and industry leaders are using AI.

**AI Prompt:**
\`\`\`
You are an AI industry analyst.

Research and summarize how AI is being used in [YOUR INDUSTRY].

Industry: [YOUR INDUSTRY]
Company Size: [YOUR SIZE]

Provide:
1. Top 5 AI use cases in this industry
2. Companies leading AI adoption
3. Typical ROI and time savings
4. Common implementation challenges
5. Recommended starting points for my company size

Format as an executive summary.
\`\`\`

## Phase 2: Assessing Your Readiness (Steps 6-10)

### Step 6: Data Audit
**Questions to ask:**
- What data do you have?
- Is it organized?
- Is it accessible?
- Is it accurate?

**AI Prompt:**
\`\`\`
You are a data consultant.

Help me audit my business data for AI readiness.

Data we have:
- [LIST YOUR DATA SOURCES]

Data we don't have:
- [LIST GAPS]

Evaluate:
1. Data quality score (1-10)
2. Data accessibility score (1-10)
3. Critical gaps for AI implementation
4. Quick wins to improve data readiness
5. 30-day action plan
\`\`\`

### Step 7: Process Mapping
Identify processes that are:
- ✅ Repetitive
- ✅ Time-consuming
- ✅ Error-prone
- ✅ Rule-based

These are prime candidates for AI automation.

### Step 8: Team Skills Assessment
**Questions:**
- Who on your team understands AI?
- Who is willing to learn?
- Who is resistant to change?
- What training is needed?

### Step 9: Budget Reality Check
**Good news:** You can start small!

- **$100-500/month:** Basic AI tools (ChatGPT Plus, Gemini, basic automation)
- **$500-2000/month:** Multiple tools + some custom integration
- **$2000+/month:** Advanced tools + dedicated AI resources

### Step 10: Risk Assessment
**What could go wrong?**
- Data privacy concerns
- Job displacement fears
- Quality issues
- Vendor lock-in
- Over-reliance on AI

**Mitigation strategies for each risk**

## Phase 3: Identifying Use Cases (Steps 11-15)

### Step 11: Quick Wins
Find tasks that are:
- Repetitive ✅
- Time-consuming ✅
- Low-risk if AI makes mistakes ✅
- High-impact if improved ✅

**Examples:**
- Meeting notes and summaries
- Email drafting
- Social media content
- Data entry
- Report generation

### Step 12: Customer-Facing Opportunities
- Chatbots for support
- Personalized recommendations
- Automated email responses
- Content personalization

### Step 13: Internal Operations
- Meeting notes and summaries
- Data analysis and reporting
- Content creation
- Research and competitive intelligence
- HR screening and onboarding

### Step 14: Strategic Applications
- Market trend analysis
- Product development insights
- Pricing optimization
- Workforce planning
- Risk assessment

### Step 15: Prioritization Matrix

**AI Prompt:**
\`\`\`
You are an AI strategy consultant.

Help me prioritize AI use cases for my business.

Business: [YOUR BUSINESS]
Team Size: [NUMBER]
Budget: [MONTHLY AMOUNT]

Potential use cases:
1. [USE CASE 1]
2. [USE CASE 2]
3. [USE CASE 3]
4. [USE CASE 4]
5. [USE CASE 5]

For each, score:
- Impact (1-5)
- Effort (1-5)
- Risk (1-5)
- Cost (1-5)

Calculate priority score: (Impact × 2) - (Effort + Risk + Cost)

Rank from highest to lowest priority.
Highlight top 3 "Quick Wins" (high impact, low effort, low risk).
\`\`\`

## Phase 4: Pilot Implementation (Steps 16-20)

### Step 16: Choose Your First Tool
Based on your top use case, select ONE AI tool to start.

**Don't try to do everything at once!**

### Step 17: Set Success Metrics
Define what success looks like:
- ⏱️ Time saved (hours per week)
- 💰 Cost reduced ($ per month)
- 📈 Quality improved (error rate, customer satisfaction)
- 💵 Revenue increased ($ per month)

### Step 18: Train Your Team
- 1-2 hour training session
- Hands-on practice
- Documentation and templates
- Q&A and troubleshooting

### Step 19: Run 30-Day Pilot
**Week 1:** Setup and initial training  
**Week 2-3:** Daily use and data collection  
**Week 4:** Evaluation and decision

**During pilot:**
- Use the tool daily
- Track metrics
- Gather feedback
- Document issues

### Step 20: Evaluate Results
**Questions to answer:**
- Did we hit our success metrics?
- What worked well?
- What didn't work?
- Should we continue, adjust, or stop?

## Phase 5: Scaling & Optimization (Steps 21-25)

### Step 21: Refine Your Process
Based on pilot learnings, optimize workflows.

### Step 22: Expand to More Users
Roll out to additional team members with proper training.

### Step 23: Add More Use Cases
Implement your next 2-3 prioritized use cases.

### Step 24: Integrate Systems
Connect AI tools to your existing software (CRM, project management, etc.)

### Step 25: Continuous Improvement
- **Monthly:** Review AI usage and metrics
- **Quarterly:** Evaluate new tools and opportunities
- **Annually:** Refresh AI strategy

## Decision Framework

At each step, ask:

1. **Does this align with business goals?**
2. **Do we have the resources (time, money, skills)?**
3. **What's the worst-case scenario?**
4. **Can we reverse this decision if needed?**
5. **What will we learn from this?**

## Common Pitfalls to Avoid

❌ **Trying to do everything at once** → Start with one use case  
❌ **Choosing tools before defining problems** → Problem first, tool second  
❌ **Underestimating training needs** → Budget time for learning  
❌ **Ignoring data quality** → Garbage in, garbage out  
❌ **No clear success metrics** → You can't improve what you don't measure  
❌ **Expecting perfection immediately** → AI improves over time  
❌ **Not involving the team** → Change management is critical

## Real-World Examples

### Professional Services Firm
- **Use Case:** Automated meeting notes and client summaries
- **Tool:** Gemini + NotebookLM
- **Result:** 8 hours/week saved, 100% meeting documentation
- **Timeline:** 2 weeks to full adoption

### E-commerce Business
- **Use Case:** Product description generation
- **Tool:** ChatGPT + Shopify integration
- **Result:** 90% faster product listings, improved SEO
- **Timeline:** 4 weeks to full rollout

### Real Estate Agency
- **Use Case:** Property listing descriptions and social posts
- **Tool:** Claude + Canva
- **Result:** 5 hours/week saved, 40% more listings
- **Timeline:** 3 weeks to team adoption

## AI Integration Checklist

- [ ] Understand AI basics (Phase 1)
- [ ] Assess organizational readiness (Phase 2)
- [ ] Identify and prioritize use cases (Phase 3)
- [ ] Run pilot with clear metrics (Phase 4)
- [ ] Scale successful implementations (Phase 5)
- [ ] Establish continuous improvement process

## Expected Outcomes

✅ Structured roadmap for AI adoption  
✅ Clear understanding of capabilities and limitations  
✅ Validated use cases with ROI projections  
✅ Successful pilot implementation  
✅ Scaling plan with risk mitigation  
✅ Team buy-in and training

**Time Investment:** 6-12 weeks for full framework implementation

**Difficulty:** Intermediate (requires commitment and change management)
`,
    icon: "🚀",
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

                {/* Rendered Guide Content with Workshop CTA */}
                <WikiGuideRenderer content={selectedGuide.content} showRecordingCTA={true} />

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
