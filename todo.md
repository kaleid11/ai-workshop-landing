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
