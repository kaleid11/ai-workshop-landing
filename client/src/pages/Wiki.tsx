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
    id: "viralwave-guide",
    title: "ViralWave Studio Essentials",
    description: "Learn how to use ViralWave for automated content generation and scheduling",
    category: "Tools",
    content: `# ViralWave Studio Essentials

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
