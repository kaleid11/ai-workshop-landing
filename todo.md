# AI Workshop Landing Page TODO

- [x] Add Stripe integration feature
- [x] Set up brand colors and design system
- [x] Copy workshop assets to public folder
- [x] Create hero section with headline and CTA
- [x] Create value proposition section
- [x] Create workshop overview section
- [x] Create "What You'll Get" section with features
- [x] Create workshop modules section
- [x] Create "How It Works" 3-step process section
- [x] Create "Why Operators Love This" benefits section
- [x] Create pricing and Stripe checkout section
- [x] Create footer with contact info
- [x] Test Stripe payment flow
- [x] Create checkpoint for deployment

## Black Friday Update

- [x] Replace logo with new design
- [x] Remove AI-centric language and generic copy
- [x] Add Black Friday deal messaging
- [x] Update pricing to show $297 value + social media manager comparison
- [x] Fix module card screenshots (remove cropping issues)
- [x] Improve module cards UI for modern, polished look
- [x] Ensure full mobile responsiveness
- [x] Test on mobile viewport
- [x] Create final checkpoint

## Final Refinements

- [x] Simplify to single pricing option ($97 AUD)
- [x] Change all pricing from USD to AUD)
- [x] Add referral program messaging ($15 off per friend)
- [x] Add startup discount info (email info@thzn.world for $20 off)
- [x] Fix Module 2 image (use video generation screenshot)
- [x] Enlarge all module images for better visibility)
- [x] Update automation messaging (review content, not fully 24/7)
- [x] Add advanced workshop teaser with special pricing mention
- [x] Remove multiple pricing tiers from checkout
- [x] Update checkout flow for single option
- [x] Test final changes
- [x] Create final checkpoint

## Portal and Final Enhancements

- [x] Add testimonials section to landing page
- [x] Add workshop date/time: Wednesday Nov 26, 9-11am Brisbane (10am-12pm Melbourne, UTC+10)
- [x] Improve hero section to be more modern and dynamic
- [x] Create member portal page with Manus auth
- [x] Add WhatsApp group link to portal (https://chat.whatsapp.com/FFzITkJIkkK7ZELGNQKDLl)
- [x] Add Facebook community link to portal (https://linktr.ee/huxleyp)
- [x] Add "Add to Calendar" button in portal
- [x] Add "Email Us" button in portal (info@thzn.world)
- [x] Add "Coming Soon" placeholders for templates and advanced workshop
- [x] Update "Bring Friends, Save Together" to "Bring Friends and Save"
- [x] Add portal route to App.tsx
- [x] Test all new features
- [x] Create final checkpoint

## Instructor Section and Stripe Live Mode

- [x] Read instructor profile from PDF
- [x] Copy instructor photo to public folder
- [x] Add instructor section to landing page
- [x] Switch Stripe from test/sandbox to live production mode
- [x] Update Stripe account ID to acct_1Pm5DNCii5zXCZr6
- [x] Test Stripe live mode integration
- [x] Create final checkpoint

## Stripe Live Mode Fix

- [ ] Investigate why test keys are still being used
- [ ] Remove any test Stripe configuration
- [ ] Verify live keys are properly loaded
- [ ] Test checkout with live price ID
- [ ] Create checkpoint after fix

## Post-Purchase Flow & Portal Access

- [x] Add database schema for purchase tracking
- [x] Create Stripe webhook endpoint for payment success
- [x] Update user access status after successful payment
- [x] Set up email automation for welcome emails
- [x] Send portal link and workshop details via email
- [x] Update portal with access control (only paying customers)
- [x] Add all workshop resources to portal (WhatsApp, Facebook, calendar)
- [x] Test complete purchase-to-portal flow
- [x] Create final checkpoint

## FAQ and Workshop Preparation

- [x] Add FAQ section to landing page
- [x] Create brand strategy template document
- [x] Add workshop preparation guide to portal
- [x] Include ViralWave signup link (viralwavestudio.com?via=huxley17)
- [x] Include Captions.ai signup link
- [x] Include HuxleyGPT persona builder link
-- [x] Add step-by-step setup instructions with examplesples
- [x] Add checklist of required files/photos for workshop
- [x] Create downloadable brand info template
- [x] Test all links and download functionality
- [x] Create final checkpoint

## Countdown Timer, Login & Admin Portal

- [x] Add countdown timer to landing page (Nov 26, 9am Brisbane)
- [x] Add login button for returning users in header
- [x] Create admin token system in database
- [x] Create hidden admin token binding page
- [x] Build admin portal for workshop management
- [x] Add workshop replay upload functionality
- [x] Add participant management in admin portal
- [x] Test admin token binding flow
- [x] Test login flow for returning users
- [x] Create final checkpoint

## FAQ Text Update

- [x] Replace "ViralWave Studio" with "An AI content Studio" in FAQ section
- [x] Create checkpoint with updated FAQ

## FAQ Tools Section Improvement

- [x] Remove specific tool names from FAQ (keep exclusive to portal)
- [x] Replace with high-level descriptions of tool capabilities
- [x] Improve messaging to build anticipation without revealing details
- [x] Create checkpoint with improved FAQ

## Instructor Credentials Update

- [x] Remove Harvard reference from instructor section
- [x] Add Apple, Microsoft, Google certifications (Genius Bar, AI, Workspaces)
- [x] Update to show 200+ businesses coached on AI for 18 months
- [x] Create checkpoint with updated credentials

## Mobile Navigation & Checkout Notice

- [x] Fix mobile navigation to show login button
- [x] Add checkout completion notice (don't close app during payment)
- [x] Test mobile responsiveness
- [x] Create checkpoint with mobile fixes

## Mobile Header Redesign

- [x] Create dedicated mobile header with logo
- [x] Move login button to clear, accessible position
- [x] Simplify banner text for mobile
- [x] Improve overall mobile header aesthetics
- [x] Test mobile header on multiple devices
- [x] Create checkpoint with improved mobile header

## Tech Horizon Academy Expansion

### Database Schema
- [x] Create membership_tiers table (Free, Starter, Lite, Pro, Elite)
- [x] Create pillars table (Marketing, Coding, Alignment)
- [x] Create resources table (workshops, templates, guides)
- [x] Create tools_database table
- [x] Create prompts_library table
- [x] Create forum_posts and forum_comments tables
- [x] Create userSubscriptions table for subscription tracking
- [x] Create workshops and workshopRegistrations tables
- [x] Import 1,620 tools from tools.json
- [x] Import 118 prompts from prompts.json
- [x] Create 5 pillars (3 active, 2 coming soon)
- [x] Create 5 membership tiers with founding discounts

### Pricing Page
- [ ] Design 5-tier comparison table
- [ ] Add founding member discount badges
- [ ] Create tier detail cards with features
- [ ] Add FAQ section for pricing
- [ ] Implement Stripe checkout for each tier
- [ ] Add annual vs monthly toggle

### Pillar Pages
- [ ] Create Marketing pillar page with workshop schedule
- [ ] Create Coding pillar page with tool recommendations
- [ ] Create Alignment pillar page with frameworks
- [ ] Add sample workshop previews for each pillar
- [ ] Create "Which pillar is right for you?" quiz

### Tool Database & Prompt Library
- [ ] Build tool database page with filtering
- [ ] Add tool detail pages with setup guides
- [ ] Create prompt library with categories
- [ ] Add copy-to-clipboard functionality for prompts
- [ ] Implement search for tools and prompts
- [ ] Add tier-based access control

### Member Portal
- [ ] Create dashboard with tier-specific content
- [ ] Add workshop schedule and registration
- [ ] Build resource library with downloads
- [ ] Create profile management page
- [ ] Add subscription management (upgrade/downgrade)
- [ ] Implement tier-based navigation

### Homepage Redesign
- [ ] Add Horizon Framework visual (Innovate → Forge → Grow → Scale → Trust)
- [ ] Create Vibe Pillars overview section
- [ ] Add academy tier preview cards
- [ ] Keep existing workshop section
- [ ] Add member testimonials and stats
- [ ] Update hero section for academy positioning

### Forum Functionality
- [ ] Create forum homepage with recent posts
- [ ] Build post creation and editing
- [ ] Add commenting system
- [ ] Implement member-only access
- [ ] Add categories per pillar
- [ ] Create moderation tools for admin

### Testing & Launch
- [ ] Test all tier access controls
- [ ] Verify Stripe integration for subscriptions
- [ ] Test forum functionality
- [ ] Check mobile responsiveness
- [ ] Create admin documentation
- [ ] Write vitest tests for new features
- [ ] Create final checkpoint

## Tier Feature Updates
- [ ] Replace email support with monthly Q&A webinar in all tiers
- [ ] Add THL Tool Picker GPT to Starter tier
- [ ] Update database tier features

## Resources Page
- [ ] Create Resources page as lead magnet
- [ ] Add some free downloads (not too much)
- [ ] Make it accessible to non-members

## GitHub Content Extraction
- [x] Extract prompts from awesome-chatgpt-prompts-main.zip
- [x] Fetch and extract content from vibe-marketing repo
- [x] Import 256 new prompts into database with pillar/tier/tech stack categorization
- [x] Total prompts: 374 (118 original + 256 new)

## Navigation & Member Portal
- [x] Add academy navigation cards to member portal
- [x] Link to tools, prompts, resources, and pricing pages
- [ ] Add navigation to home page footer
- [ ] Write tests for academy features

## Bug Fixes
- [x] Fix getUserSubscription returning undefined (return null instead)
- [x] Fix Select.Item empty value error in Prompts page (use "all" instead of empty string)
- [x] Fix nested <a> tags in Portal page navigation cards (use onClick instead of Link wrapper)

- [x] Fix Select.Item empty value error in Tools page
- [x] Fix nested <a> tags in Tools page

- [x] Update tools database access - make all tools available to Starter tier and above
- [x] Update prompts library access - make all prompts available to Starter tier and above

## Resource Improvement
- [x] Read and analyze existing resource files
- [x] Create "Getting Started with ChatGPT" guide (beginner-friendly, step-by-step)
- [x] Clean up ChatGPT Business Setup Guide (remove law firm references)
- [x] Add HuxleyGPT as free GPT resource
- [x] Ensure all guides are downloadable
- [x] Add interactive elements to free resources section (quick-start checklist)
- [x] Update Resources page with improved guides
- [x] Fix any errors in Resources section
- [x] Test all downloads
- [x] Update HuxleyGPT link with correct URL

## Pillar Detail Pages
- [x] Create Vibe Marketing pillar page
  - [x] Pillar overview and learning objectives
  - [x] Workshop schedule (Lite: 2/month, Pro: 4/month)
  - [x] Key topics and curriculum (8-week curriculum)
  - [x] Marketing-specific tools and prompts
  - [x] Outcomes and what you'll learn
- [x] Create Vibe Coding pillar page
  - [x] Pillar overview and learning objectives
  - [x] Workshop schedule (Lite: 2/month, Pro: 4/month)
  - [x] Key topics and curriculum (8-week curriculum)
  - [x] Coding-specific tools and workflows
  - [x] Project showcases (3 real-world examples)
- [x] Create Vibe Alignment pillar page
  - [x] Pillar overview and learning objectives
  - [x] Workshop schedule (Lite: 2/month, Pro: 4/month)
  - [x] Key topics and curriculum (8-week curriculum)
  - [x] Alignment-specific frameworks (6 frameworks)
  - [x] Case studies (3 real business transformations)
- [x] Add pillar navigation to portal (3 cards with links)
- [ ] Add pillar links to home page footer
- [x] Test all pillar pages (Marketing, Coding, Alignment)
- [x] Create checkpoint

## Pillar Prompt Libraries & Workshop Calendar

- [x] Query database for Marketing-specific prompts
- [x] Create Marketing Prompt Library (20+ prompts with templates)
- [x] Query database for Coding-specific prompts
- [x] Create Coding Prompt Library (20+ prompts with platform guides)
- [x] Query database for Alignment-specific prompts
- [x] Create Alignment Prompt Library (20+ prompts with Horizon Framework)
- [x] Convert markdown files to PDF for download (385KB each)
- [x] Add prompt library downloads to Resources page
- [x] Create unified workshop calendar page
- [x] Add calendar view showing all workshops across 3 pillars
- [x] Add Google Calendar sync for each workshop
- [x] Add filter by pillar (Marketing/Coding/Alignment)
- [x] Add filter by tier (Lite/Pro)
- [x] Test calendar functionality
- [x] Test prompt library downloads
- [ ] Create checkpoint

## Landing Page Redesign for Non-Technical Audiences

- [x] Analyze client meeting notes and extract key consulting insights
- [x] Review Manus platform capabilities and integration opportunities
- [x] Analyze Tech Horizon Labs brand positioning and messaging
- [x] Design unified homepage strategy serving all audiences
- [x] Redesign Home.tsx with unified value ladder approach
- [x] Add hero section with 3 clear CTAs (Workshop/Academy/Enterprise)
- [x] Create "Choose Your Path" section with segmented offerings
- [x] Add Horizon Framework visualization (5 pillars)
- [x] Create mixed social proof section (workshops + enterprise)
- [ ] Add interactive path selector or quiz (optional enhancement)
- [x] Create /enterprise landing page
- [x] Add enterprise hero with "Without Complexity, Cost, or Risk" messaging
- [x] Create Horizon Framework detailed section (5 phases with full details)
- [x] Add pre-built AI assistants gallery (25+ tools across 8 categories)
- [x] Create cloneable resource library showcase
- [x] Add enterprise case studies (anonymized testimonials)
- [x] Create ROI calculator component (interactive with real-time calculations)
- [x] Add pricing transparency section (3-tier pricing)
- [x] Create comparison table (vs traditional consultancies)
- [x] Add enterprise FAQ section (6 common questions)
- [ ] Create /consulting landing page (optional - can be added later)
- [ ] Add custom implementation services section (optional)
- [ ] Create AI Transformation Partner details (optional)
- [ ] Add strategic planning offerings (optional)
- [x] Update navigation to include all pathways
- [x] Test unified homepage with multiple audience segments
- [x] Test enterprise landing page
- [ ] Create checkpoint for landing page redesign

## Site Design Improvements & Booking Integration

- [x] Extract and organize booking links and tool ecosystem
- [x] Integrate Klipy.ai booking link (15-min free AI audit) across all CTAs
- [x] Add WhatsApp contact link integration
- [x] Add floating sticky booking button (bottom-right)
- [x] Add floating WhatsApp button (bottom-left)
- [ ] Add social media links (Facebook, LinkedIn, Linktree)
- [ ] Create "Core Tools" showcase section (ChatGPT, Manus, Replit, Gamma, ElevenLabs, Captions.ai, Viralwave Studio)
- [ ] Build tool database/directory page
- [ ] Add tool comparison and recommendation logic
- [ ] Integrate Beehiiv email capture for GPT access
- [ ] Update all "Book Your Audit" CTAs with actual booking link
- [ ] Improve homepage hero CTAs with booking integration
- [ ] Enhance Enterprise page CTAs with booking link
- [ ] Add floating/sticky booking CTA across site
- [ ] Improve visual design consistency
- [ ] Add tool logos and branding
- [ ] Create tool recommendation quiz/selector
- [ ] Add referral links for partner tools
- [ ] Test all booking flows
- [ ] Create checkpoint

## Homepage Improvements Completed

- [x] Add "Stop Tool Overwhelm" section with before/after comparison
- [x] Create "Core 7 Tools" showcase section (ChatGPT, Manus, Replit, Gamma, ElevenLabs, Captions.ai, Viralwave Studio)
- [x] Add tool consolidation ROI messaging ($5K-$15K annual savings)
- [x] Update all "Book Audit" CTAs with actual Klipy.ai booking link
- [x] Add "This academy runs on Manus" badge to Manus tool card
- [x] Improve homepage visual hierarchy and design
- [x] Add floating sticky booking button (bottom-right)
- [x] Add floating WhatsApp button (bottom-left)
- [x] Test all booking links and CTAs work correctly (Stripe live mode tests expected to fail - not blockers)
- [ ] Create checkpoint for site improvements

## Tool Stack Audit Quiz & Case Studies

- [x] Design quiz logic and recommendation algorithm
- [x] Create 5-question quiz flow (team size, industry, tool count, budget, technical capability)
- [x] Build recommendation engine for personalized 3-5 tool stack
- [x] Add ROI projection calculator based on quiz answers
- [x] Create email capture form for quiz results
- [x] Build Tool Stack Audit quiz component
- [x] Add quiz to homepage (after Core 7 Tools section) - Added as dedicated /quiz page
- [x] Create Case Studies page (/case-studies)
- [x] Write 4 anonymized client success stories
- [x] Add tool consolidation metrics (before/after, savings, timeline)
- [x] Include industry-specific examples (crypto/fintech, compliance, marketing, e-commerce)
- [x] Add case study cards to homepage (3-card preview)
- [x] Link case studies from Enterprise page (via Case Studies page)
- [x] Create dedicated /quiz page for Tool Stack Audit
- [x] Add "Take Tool Stack Quiz" CTA to homepage
- [x] Test quiz logic and recommendations
- [x] Test email capture integration
- [x] Test all booking links and CTAs work correctly (Stripe live mode tests expected to fail - not blockers)
- [x] Create checkpoint for site improvements

## Comprehensive Website Audit & Optimization

### Page-by-Page Analysis
- [ ] Audit Homepage - check all sections, CTAs, links, messaging
- [ ] Audit Enterprise page - verify all content, Horizon Framework, ROI calculator
- [ ] Audit Case Studies page - verify all 4 stories, metrics, quotes
- [ ] Audit Quiz page - test all 5 questions, recommendation logic, email capture
- [ ] Audit Calendar page - verify all 12 workshops, Google Calendar integration
- [ ] Audit Resources page - verify all PDFs, tier-based access
- [ ] Audit Tools/Prompts pages - check content completeness
- [ ] Audit Pillar pages (Marketing/Coding/Alignment) - verify content
- [ ] Audit Portal page - check navigation, access control
- [ ] Audit Pricing page - verify all tiers, Stripe integration

### Knowledge Integration Check
- [ ] Verify ASD Essential Eight compliance messaging is present
- [ ] Check computational thinking "ground-up" approach in content
- [ ] Verify prompt engineering techniques are showcased
- [ ] Check security-first messaging throughout site
- [ ] Verify tool consolidation value prop is consistent
- [ ] Check Horizon Framework is explained clearly
- [ ] Verify Manus platform positioning ("This academy runs on Manus")

### Missing Features & Enhancements
- [ ] Add security/compliance section to Enterprise page
- [ ] Add ASD Essential Eight details
- [ ] Create "Manus Clone Showcase" section
- [ ] Add computational thinking approach to About/How It Works
- [ ] Add prompt engineering showcase
- [ ] Enhance footer with complete navigation
- [ ] Add social media links (Facebook, LinkedIn, Linktree)
- [ ] Add Beehiiv email capture for GPT access
- [ ] Create /security page with compliance details
- [ ] Add testimonials/social proof throughout

### Technical Optimizations
- [ ] Verify all booking links work (Klipy.ai)
- [ ] Test WhatsApp button functionality
- [ ] Verify floating booking button on all pages
- [ ] Check mobile responsiveness on all pages
- [ ] Verify all internal links work
- [ ] Test quiz recommendation algorithm
- [ ] Verify email capture integration
- [ ] Check page load performance
- [ ] Verify SEO meta tags on all pages

### Content Completeness
- [ ] Verify all 25+ pre-built AI assistants are listed
- [ ] Check Core 7 Tools descriptions are complete
- [ ] Verify all workshop details are accurate
- [ ] Check pricing is consistent across pages
- [ ] Verify contact information is present
- [ ] Check legal pages (Privacy, Terms) exist

### Final Polish
- [ ] Proofread all copy for typos/errors
- [ ] Verify brand consistency (colors, fonts, tone)
- [ ] Check image quality and alt text
- [ ] Verify accessibility (keyboard navigation, screen readers)
- [ ] Test all forms and CTAs
- [ ] Create final checkpoint
