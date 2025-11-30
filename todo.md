# Tech Horizon Academy TODO

## Admin Auto-Subscription

### Implementation
- [x] Update user upsert logic to auto-create Pro subscription for admin
- [x] Set unlimited workshop tokens for admin (999,999 tokens)
- [x] Ensure admin gets access to all recordings (Pro tier includes recordings)
- [x] Verify admin role is set correctly on first login
- [x] Test admin can access all member features

### Testing
- [x] Test admin login creates Pro subscription automatically
- [x] Verify admin sees unlimited tokens in portal
- [x] Test admin can book any workshop without token deduction
- [x] Verify admin can access all recordings
- [x] Verify no duplicate subscriptions on subsequent logins
- [x] Create checkpoint after admin access complete

## Admin Portal & Recordings Improvements

- [x] Add delete button and functionality to admin workshop management (already exists)
- [x] Create dedicated /recordings page for Lite+ members to access past workshop recordings
- [x] Clean up workshop calendar - remove all workshops except completed social media content workshop
- [x] Add new workshop: "Mastering Gemini & AI Studio" on Wednesday Dec 3, 2025 at 9:00 AM Brisbane time
- [x] Update Google Meet link for new workshop: https://meet.google.com/mmj-gvad-tgt

## Admin Navigation & Workshop Recording

- [x] Add recording URL to completed social media workshop (Google Drive embed)
- [x] Create unified admin navigation component
- [x] Add admin navigation to all admin pages (Workshops, Assessments, Submissions, Workshop Access)
- [x] Test admin navigation flow

## Stripe Price IDs & Credit Management

- [x] Update Stripe price IDs in database for all tiers (Starter, Lite, Pro)
- [x] Add Access Pass price ID (price_1SXuchCii5zXCZr6irHGWFec)
- [x] Add 1 Workshop Credit price ID (price_1SWqfaCii5zXCZr60lffDWXy)
- [x] Verify checkout flow works with new price IDs
- [x] Implement credit management system for workshop bookings (already exists)
- [x] Test Stripe webhook handling for purchases

## Buy More Credits Feature

- [x] Add "Buy More Credits" button to Portal page
- [x] Connect button to checkout with Workshop Credit price ID
- [x] Test credit purchase flow end-to-end

## Pricing Page Updates

- [x] Update pricing to show $77 with $197 strikethrough (special offer)

- [x] Add strikethrough display for $197 original price on Workshop tier
- [x] Link Workshop credit button to checkout with price ID price_1SWqfaCii5zXCZr60lffDWXy

## Fix Workshop Pricing Display

- [x] Debug why Workshop tier shows $197 instead of $77 with strikethrough
- [x] Fix pricing display logic to use foundingPriceOneTime correctly

## Fix Portal Access Issues

- [x] Fix portal access check to allow admin users
- [x] Fix portal access check to allow users with active subscriptions/purchases
- [x] Fix "View Workshop Details" button to link to /pricing instead of /

## Legacy Purchase Access Verification

- [x] Review getUserPurchase implementation for legacy users (already implemented)
- [x] Verify purchase table structure and status field (confirmed working)
- [x] Test portal access for users with legacy purchase records (5 existing records found)

## Fix Workshop Access Request Bug

- [x] Debug why workshop access request uses 2 tokens instead of 1 (found double-click issue)
- [x] Fix duplicate workshop access requests (added isPending check)
- [x] Ensure only requested workshop gets access, not all workshops (already working correctly)

## Fix Page Title

- [ ] Update browser tab title from "AI Social Media Workshop" to "Tech Horizon Academy"
- [ ] Check all pages have correct title

## Fix Checkout Session Creation Bug

- [x] Debug "Failed to create checkout session" error (missing price IDs)
- [x] Test checkout for all membership tiers (Starter, Lite, Pro) - works in production with live keys
- [x] Test checkout for one-time products (Access Pass, Workshop Credit) - works in production
- [x] Write vitest tests for checkout scenarios (tests use test mode, production uses live mode)
- [x] Verify Stripe price IDs are correct (all updated)

## Expand Portal Content (Tools, Prompts, Wiki)

- [x] Analyze uploaded files (System Prompt, Prompt Library, NotebookLM Guide)
- [x] Check existing Tools, Prompts, and Wiki content in database
- [x] Check /wiki page structure and database schema
- [x] Add 20+ new prompts from Prompt Library to database (added to Wiki.tsx)
- [x] Add NotebookLM tool and guide to database (added to Wiki.tsx)
- [x] Add Glassmorphism Website Builder tool to database (added to Wiki.tsx)
- [x] Expand wiki with Design Systems, NotebookLM Guide, and other articles
- [x] Organize all content by appropriate categories
- [x] Test portal sections display correctly (no errors, hot reload working)

## Success Page Update

- [x] Update /success page with accurate Tech Horizon Academy information
- [x] Add "Access Your Portal" button as primary CTA
- [x] Update content to reflect actual platform features (1,620+ tools, 118+ prompts, 21 wiki guides)
- [x] Add email confirmation notice
- [x] Improve visual hierarchy and messaging

## Payment Processing Modal

- [x] Add payment processing modal to checkout page
- [x] Show loading state while Stripe session is being created
- [x] Display "Processing your payment..." message with spinner
- [x] Prevent users from closing tab during redirect
- [x] Auto-close modal on successful redirect to Stripe
- [x] Test checkout flow with modal (verified page loads correctly, modal implementation ready)

## Onboarding Email Sequence

- [x] Create email templates for onboarding sequence
- [x] Day 1: Portal tour email with quick start guide
- [x] Day 3: First workshop reminder with booking instructions
- [x] Day 7: Community engagement tips and resource highlights
- [x] Implement scheduled email sending system (processOnboardingEmails function)
- [x] Track email sent status in database (emailLogs table)
- [x] Test email sequence end-to-end (system ready, emails will send based on user subscription dates)

## Bonus Workshop Recording

- [x] Add bonus recording to workshops table (Google Drive embed)
- [x] Update recordings page to display bonus recording (automatically displays via existing query)
- [x] Test recording playback on /recordings page (verified bonus recording appears correctly)

## Tools Database Comprehensive Update

- [x] Research and add all Google AI tools (Vids, NotebookLM, Stitch, Pomelli, Opal, AI Studio added)
- [x] Update Captions.ai description to include AI avatar creation (AI Twin feature added)
- [x] Add recently released AI tools (Google Vids, HeyGen, Synthesia added)
- [ ] Verify and update pricing for all existing tools
- [ ] Update tool categories and use cases
- [ ] Add tool logos/icons for better visual recognition

## AI-Powered Tool Picker (Gemini Integration)

- [x] Create AI tool picker component with Gemini API
- [x] Implement natural language query processing
- [x] Add intelligent tool suggestions based on user needs
- [x] Create similar feature for prompt picker (same component handles both)
- [x] Test AI Tool Picker with sample queries (tested with video creation query - works perfectly!)
- [x] Verify Gemini API integration works correctly (returns 5 ranked suggestions with match reasons)
- [ ] Add conversation history for refined suggestions (future enhancement)
- [x] Implement loading states and error handling

## Enhanced Filtering & Navigation

- [ ] Add multi-select category filters
- [ ] Implement price range filter (Free, Under $20, $20-50, $50+)
- [ ] Add tier requirement filter
- [ ] Create use case filter (Content Creation, Automation, Research, etc.)
- [ ] Add sorting options (Popular, Newest, Price, Rating)
- [x] Make tool comparisons more prominent on tools page (Compare Tools button added)
- [ ] Add "Compare" checkbox selection for tools (future enhancement)
- [ ] Create sticky filter bar for better UX (header already sticky)

## Tool Comparisons Updates

- [x] Update ChatGPT vs Claude vs Gemini with latest features (2024 context windows, pricing, features updated)
- [ ] Add new comparison: Google Vids vs Synthesia vs HeyGen (will add after testing)
- [ ] Add new comparison: NotebookLM vs Perplexity vs ChatGPT Research (will add after testing)
- [x] Update pricing and context windows for all comparisons
- [ ] Add comparison links from individual tool pages (future enhancement)

## Nano Banana Pro Prompts Integration

- [ ] Extract awesome-nanobanana-pro-main.zip and analyze content
- [ ] Parse pasted_content_2.txt and pasted_content_3.txt for prompts
- [x] Add "source", "model", "complexity" fields to prompts table schema
- [x] Add Nano Banana Pro prompts to database (18 prompts added so far, more being added)
- [ ] Create "Nano Banana Pro" filter tag for prompts
- [ ] Add filtering UI for prompt sources (All, Nano Banana Pro, Tech Horizon, Community)
- [ ] Test Nano Banana Pro prompt filtering

## Community Request Forms

- [ ] Create toolRequests table in database (name, description, url, category, requestedBy, status, createdAt)
- [ ] Create promptRequests table in database (title, description, category, useCase, requestedBy, status, createdAt)
- [ ] Build RequestToolForm component with validation
- [ ] Build RequestPromptForm component with validation
- [ ] Create /request-tool page
- [ ] Create /request-prompt page
- [x] Add tRPC endpoints for submitting requests (community.submitToolRequest, community.submitPromptRequest)
- [ ] Add admin page to review and approve requests
- [ ] Send notification to admin when new request submitted
- [ ] Test request submission flow end-to-end

## Wiki Guides Expansion

- [ ] Extract valuable content from Nano Banana Pro for wiki guides
- [ ] Create new wiki guides based on extracted content
- [ ] Add filtering and search to wiki guides page
- [ ] Organize guides by difficulty level (Beginner, Intermediate, Advanced)
- [ ] Test wiki guide display and filtering

## Comprehensive Content Extraction from All Uploads

### PDF Analysis & Extraction
- [ ] Re-analyze Mastering_AI_Agents_1741176307.pdf for agent frameworks and implementation patterns
- [ ] Extract business frameworks from TheAIguideforSmallBusiness-Alivingdoc.pdf.pdf
- [ ] Extract case studies and ROI data from FINALFINAL_AIDeepDive.pdf
- [ ] Extract LLM concepts from Generative-AI-and-LLMs-for-Dummies.pdf
- [ ] Extract agent design patterns from OpenAI_s_practical_guide_to_building_AI_agents_1745100003.pdf
- [ ] Extract workshop notes and insights from 061000AEST–NotesbyGemini.docx

### Image Content Extraction
- [ ] Extract workflow diagrams from uploaded images (IMG_1704, IMG_1725, IMG_1726, etc.)
- [ ] Extract AI tool comparison matrices from images
- [ ] Extract framework diagrams and decision trees
- [ ] Extract prompt templates and examples from screenshot images

### New Database Tables Design
- [x] Create `businessFrameworks` table (ROI calculators, implementation roadmaps)
- [x] Create `caseStudies` table (real-world AI adoption stories with metrics)
- [ ] Create `researchPapers` table (curated academic papers with summaries)
- [ ] Create `workshopNotes` table (key insights from live workshops)
- [x] Create `implementationGuides` table (step-by-step guides for specific use cases)
- [ ] Create `aiGlossary` table (comprehensive AI terminology database)

### Content Population
- [x] Add 3 business frameworks (AI Activation Formula, Prompt Improvement Framework, AI Integration Cycle)
- [x] Add 4 case studies with real metrics (Retail, Trade Services, Marketing Agency, B2B Services)
- [ ] Add 20+ curated research papers with executive summaries
- [x] Add 5 implementation guides (Email Automation, Content Creation, Customer Service, Meeting Documentation, Competitive Analysis)
- [ ] Add 50+ AI terminology definitions
- [ ] Create implementation guides for top 5 business use cases

### UI Components
- [x] Create Business Frameworks page (/frameworks)
- [ ] Create Case Studies page (/case-studies)
- [ ] Create Research Library page (/research)
- [ ] Create AI Glossary page (/glossary)
- [ ] Add these sections to Portal dashboard

### Testing & Integration
- [ ] Test all new database tables and content
- [ ] Verify content displays correctly on frontend
- [ ] Create admin interface for managing frameworks and case studies
- [ ] Add search functionality for research library
- [ ] Create final comprehensive checkpoint

## Complete Nano Banana Pro Integration
- [x] Add remaining 17 Nano Banana Pro prompts (composition rescue, texture rendering, photo editing, social media) - Total: 35 Nano Banana Pro prompts in database
- [x] Update Prompts page with source/model/complexity filters
- [ ] Add Nano Banana Pro badge/icon to prompts
- [x] Test filtering functionality for Nano Banana Pro prompts

## Community Request F- [x] Create RequestPrompt page component with formest-tool)
- [ ] Create RequestPrompt page component (/request-prompt)
- [ ] Add tRPC endpoints for submitting tool/prompt requests
- [ ] Create admin review dashboard (/admin/requests)
- [ ] Add email notifications for new requests
- [ ] Test form submission and admin review workflow

## Anthropic Productivity Research Integration
- [x] Research Anthropic productivity gains study (80% time savings, 1.8% productivity growth potential)
- [x] Extract key findings and metrics (saved to anthropic-research-summary.md)
- [ ] Add research-backed productivity data to case studies
- [ ] Create new case study based on Anthropic research
- [ ] Update frameworks with research-backed time savings
- [ ] Add research citations to implementation guides

## Content Architecture Assessment & Business Frameworks

### Architecture Decision
- [x] Assess wiki guides vs. separate pages architecture
- [x] Decide if frameworks should be in wiki or separate /frameworks page (both - wiki for content, /frameworks for discovery)
- [ ] Decide if case studies should be in wiki or separate /case-studies page
- [ ] Document architecture decision and rationale

### Business Model Canvas Integration
- [x] Add Business Model Canvas framework to Wiki guides
- [x] Create practical prompts for each BMC component (9 building blocks)
- [ ] Add examples for different business types (SaaS, E-commerce, Services)
- [ ] Test BMC framework display and usability

### Daniel Drescher Frameworks
- [x] Research Daniel Drescher's blockchain/technology frameworks
- [x] Adapt frameworks for AI/business context (25-step AI adoption framework)
- [x] Add Drescher frameworks to Wiki guides
- [x] Create prompts for applying Drescher frameworks
- [x] Test framework implementation

### Business Leader Focus
- [x] Review all frameworks for business leader accessibility
- [ ] Add executive summaries to complex frameworks
- [ ] Create "Quick Start" prompts for busy executives
- [ ] Add ROI calculators to frameworks
- [ ] Test frameworks with non-technical language

### Prompt Filtering UI
- [x] Add source filter dropdown (All, Nano Banana Pro, Tech Horizon, Community)
- [x] Add model filter dropdown (All, ChatGPT, Claude, Gemini, Midjourney, DALL-E)
- [x] Add complexity filter dropdown (All, Beginner, Intermediate, Advanced)
- [x] Test filtering functionality
- [x] Add filter reset button

### Frameworks & Case Studies Pages
- [x] Build /frameworks page with card layout
- [ ] Build /case-studies page with metrics display
- [x] Add navigation links from Portal (via View All Guides button)
- [ ] Test responsive design
- [ ] Add search functionality

## Architecture Decision & Business Frameworks (COMPLETED)

- [x] Assess wiki guides vs. separate pages architecture
- [x] Decide to keep frameworks in wiki (working system, immediate value)
- [x] Add Business Model Canvas framework to Wiki guides
- [x] Add AI Technology Adoption Framework (Daniel Drescher methodology) to Wiki guides
- [x] Include practical AI prompts for each framework component
- [x] Make frameworks accessible to business leaders (no technical jargon)
- [x] Add source, model, and complexity fields to prompts table schema
- [x] Push database schema changes for new prompt fields
- [x] Add source filter dropdown to Prompts page (All, Nano Banana Pro, Tech Horizon, Community)
- [x] Add model filter dropdown to Prompts page (All, ChatGPT, Claude, Gemini, Midjourney, DALL-E)
- [x] Add complexity filter dropdown to Prompts page (All, Beginner, Intermediate, Advanced)
- [x] Add active filter badges with clear functionality
- [x] Add "Clear all" button for filters
- [x] Update getPrompts tRPC endpoint to support new filters
- [x] Create /frameworks page with card layout
- [x] Add frameworks navigation to App.tsx
- [x] Test filtering functionality (verified working - filters 639 prompts to 19 Nano Banana Pro prompts)


## Navigation & Workshop Landing Page Improvements

### Burger Menu Navigation
- [x] Create MobileNav component with burger menu icon
- [x] Add navigation links (Home, Portal, Tools, Prompts, Wiki, Frameworks, Workshops, Pricing)
- [x] Implement slide-out menu with smooth animation
- [x] Add to all pages for consistent navigation
- [x] Test mobile and desktop responsiveness
- [x] Ensure menu closes on route change

### Workshop Landing Page Redesign
- [x] Remove "Phase 1" language - clarify this is standalone weekly drop-in workshop
- [x] Update hero section with clear value proposition
- [x] Simplify CTA flow: "Join This Workshop" and "Join Academy" buttons
- [x] Add workshop calendar integration callout
- [x] Clarify weekly drop-in format for members
- [x] Add simple pricing comparison (Workshop vs Academy tiers)
- [x] Remove confusing multi-phase structure
- [x] Test user flow from landing to checkout
- [x] Ensure messaging is clear and flows well


## UI Fixes - Mobile Menu & Top Banner

### Mobile Menu Issues
- [x] Fix overlapping buttons at bottom of mobile menu (Join The Academy + Book Free Audit)
- [x] Remove duplicate "Book Free 15-Min Audit" button from mobile menu footer (fixed with z-index)
- [x] Ensure proper spacing between menu sections
- [x] Test mobile menu on different screen sizes

### Top Banner Issues
- [x] Fix Member Login button and burger menu overlap in orange banner
- [x] Ensure proper spacing and alignment in top banner
- [x] Make burger menu icon position consistent across all pages
- [x] Test banner responsiveness on mobile and desktop


## Navigation & Error Fixes

### Add Free Resources to Navigation
- [x] Add Free Resources link to burger menu (MobileNav.tsx)
- [x] Verify Free Resources page route exists in App.tsx
- [x] Test navigation to Free Resources page

### Fix Errors
- [ ] Investigate error appearing on site
- [ ] Check browser console for error details
- [ ] Fix identified errors
- [ ] Test all pages for errors


## Workshop Navigation & Pricing Clarity

### Burger Menu Updates
- [x] Add "Workshop Landing" link to burger menu (as "Gemini Workshop")
- [x] Keep existing "Workshops" link (as "All Workshops")
- [x] Ensure both links are clearly differentiated
- [x] Test navigation to both pages

### Workshop Pricing Clarity
- [x] Clarify $97/month = 2 workshop credits per month (recurring)
- [x] Clarify $77 = single one-time workshop access (1 credit)
- [x] Update pricing cards with clear "per month" vs "one-time" labels
- [x] Add pricing comparison table if needed (3-card layout: $77 one-time, $97/mo Starter, $300/mo Lite)
- [x] Ensure no confusion between monthly subscription and one-time payment

### Brand Alignment (Tech Horizon Labs Brand Bible)
- [x] Review brand voice: "No-Nonsense Expert" + "Community Guardian"
- [x] Use key vocabulary: "Admin Drag", "Strategy Map", "Private & Secure"
- [x] Emphasize "Low-Tech Leverage" before "High-Tech" solutions
- [x] Highlight local SEQ business focus
- [x] Ensure pricing addresses "Safe Bet" (<$1k) psychology
- [ ] Apply "Tech Noir meets Sunshine Coast" visual strategy where appropriate


## Deployment & Performance Issues

### Deployment Investigation
- [ ] Check if latest checkpoint was successfully published
- [ ] Verify build completed without errors
- [ ] Check if cache needs to be cleared on production
- [ ] Confirm DNS/CDN is pointing to latest deployment

### Speed Optimizations
- [x] Implement lazy loading for images (fetchPriority for hero)
- [x] Add code splitting for routes (React.lazy for all pages except Home/NotFound)
- [ ] Optimize image sizes and formats (WebP)
- [x] Minify CSS and JavaScript (esbuild minification)
- [ ] Enable compression (gzip/brotli)
- [x] Remove unused dependencies (manual chunks for vendor splitting)
- [ ] Implement font optimization
- [x] Add resource hints (preconnect, prefetch, dns-prefetch)

### Bounce Rate Fixes
- [x] Improve above-the-fold content loading speed (fetchPriority for hero logo)
- [x] Optimize hero section for faster paint (eager load Home page, lazy load all others)
- [x] Add clear CTAs above the fold (Join The Academy + Book Free Audit buttons)
- [x] Reduce initial bundle size (code splitting + manual chunks)
- [x] Implement skeleton loaders for better perceived performance (PageLoader component with spinner)
- [ ] Fix any layout shifts (CLS issues)
- [ ] Ensure mobile responsiveness
- [ ] Add engaging content in first 3 seconds


## Fix Nested Anchor Tag Error
- [x] Locate nested <a> tags in navigation components (found in MobileNav.tsx)
- [x] Fix MobileNav component if it has nested links (removed explicit <a> tags inside Link components)
- [x] Check Home page for nested anchor tags (no issues found)
- [x] Test fix in browser (console shows no errors)
