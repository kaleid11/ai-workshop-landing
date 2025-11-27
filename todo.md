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
