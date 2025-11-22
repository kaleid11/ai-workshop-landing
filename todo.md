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
