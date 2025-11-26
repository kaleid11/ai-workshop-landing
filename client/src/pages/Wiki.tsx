import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Search, Download, ExternalLink, Loader2, BookOpen } from "lucide-react";
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

              <div className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold text-brand-purple mb-2">
                  {selectedGuide.icon} {selectedGuide.title}
                </h1>
                <p className="text-gray-600 text-lg mb-8">{selectedGuide.description}</p>

                <div className="bg-gray-50 p-6 rounded-lg mb-8 whitespace-pre-wrap text-gray-700 leading-relaxed font-mono text-sm">
                  {selectedGuide.content}
                </div>

                <div className="flex gap-4">
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
                    className="bg-brand-purple hover:bg-brand-purple/90 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download as Text
                  </Button>
                  <Link href="/portal">
                    <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple/10">
                      Back to Portal
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
