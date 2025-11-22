# ChatGPT Business Setup Guide
## Complete Implementation Guide for Small & Medium Businesses

**Author:** Tech Horizon Academy  
**Last Updated:** November 2025  
**Time to Complete:** 45-60 minutes  
**Difficulty:** Intermediate

---

## Purpose of This Setup

This guide will help you safely implement ChatGPT across your business to:

- Enable your team to use AI for daily tasks (drafting, research, analysis)
- Start small with key users, then expand once basics are working smoothly
- Keep everything compliant, secure, and easy for your team to use
- Establish best practices and workflows that scale

---

## Part 1: Plan & Licensing

### 1.1 Choosing Your Plan

Start with a plan that matches your team size and security requirements.

| Plan | Price (AUD) | Best For | Key Features |
|------|-------------|----------|--------------|
| **Plus** | $30/user/month | 1-2 users | GPT-4o, priority access, 80+ queries/3 hours |
| **Team** | $40/user/month | 3-10 users | Everything in Plus + shared workspace, admin controls, no training on your data |
| **Enterprise** | Custom pricing | 10+ users | Everything in Team + SSO, advanced security, dedicated support |

**Our Recommendation:**
- **Solo/2 people:** Start with Plus
- **3-10 people:** Team plan for workspace management
- **10+ people:** Enterprise for compliance and security controls

### 1.2 Why the Business/Team Plan

The Team plan provides:

- **SOC 2 compliance** and stronger data controls
- **No training on your data** - your conversations stay private
- **Shared workspace** - collaborate and share custom GPTs
- **Admin controls** - manage who has access and monitor usage
- **Priority access** - faster responses during peak times

**Important:** Even with business plans, ChatGPT can still "hallucinate" (make up information). All outputs must be reviewed by humans before use in critical business decisions.

### 1.3 Usage Limits

- Each request to GPT-4o counts as one query, regardless of document size
- The system will notify you as you approach your limit
- Limits reset daily
- For heavy usage, consider Enterprise plan or use strategically (focus on high-value tasks)

---

## Part 2: Create & Upgrade Your Workspace

### Step-by-Step Setup

1. **Sign in to ChatGPT** with your business email address
2. **Go to Settings** → Billing / Plan
3. **Click Upgrade** and choose Team or Enterprise
4. **Set number of seats** (start with 3-5 users for testing)
5. **Enter billing details:**
   - Business name
   - ABN / business registration number
   - Card holder name and payment details
6. **Confirm subscription**

Once complete, you'll land in the workspace admin area where you can manage users and settings.

---

## Part 3: Add and Manage Users

### 3.1 Initial Users

Start with a pilot group:
- Business owner / director
- 1-2 key team members who will champion AI adoption
- Optional: 1 technical/IT person if available

### 3.2 Inviting Users

1. In workspace admin panel, go to **Members / Users**
2. Click **Invite by email**
3. Add user emails (use business domain emails for better security)
4. Send invitations
5. Users receive email with join link:
   - They click the link
   - Sign in or create ChatGPT account with their work email
   - They're added to your workspace

### 3.3 Approvals & Access Control

**Configure workspace settings:**
- Allow anyone with your business domain email to request access
- Admin must approve new join requests
- Assign at least one backup admin to help manage invites

**User Roles:**
- **Owner:** Full control (billing, settings, users)
- **Admin:** Manage users and settings (no billing access)
- **Member:** Standard access to workspace features

---

## Part 4: Security, Privacy & MFA

### 4.1 Data Protection Basics

ChatGPT Team/Enterprise handles data similarly to Microsoft 365 or Google Workspace:

- **Encryption:** Data encrypted in transit (TLS) and at rest
- **No training:** Your conversations are NOT used to train ChatGPT models
- **Privacy:** PII is redacted before any analysis
- **Retention:** You control chat history settings

**Your Responsibilities:**
- Review all AI outputs before using them
- Don't share sensitive customer data unnecessarily
- Use redaction for confidential information
- Follow your industry's compliance requirements

### 4.2 Multi-Factor Authentication (MFA)

**Enable MFA for all users:**

1. Go to **Settings** → **Security**
2. Click **Enable Two-Factor Authentication**
3. Download an authenticator app:
   - Google Authenticator (iOS/Android)
   - Microsoft Authenticator (iOS/Android)
   - Authy (iOS/Android/Desktop)
4. Scan QR code with authenticator app
5. Enter 6-digit code to confirm
6. **Save backup codes** in secure location (password manager or encrypted file)

**Why MFA Matters:** Without 2FA, anyone with a stolen password can access your entire ChatGPT history, including business strategies, customer information, and confidential plans.

### 4.3 Security Best Practices

**DO:**
- Use strong, unique passwords
- Enable MFA for all users
- Review chat history regularly
- Delete sensitive conversations after use
- Train team on what NOT to share

**DON'T:**
- Share passwords between team members
- Put credit card numbers or payment details in ChatGPT
- Share API keys or system passwords
- Upload confidential client contracts without redaction
- Use personal accounts for business work

---

## Part 5: Connectors & Integrations

These are powerful but optional. Set up after core rollout is stable.

### 5.1 Microsoft 365 Integration

**Outlook Email Connector:**
- Purpose: Search your emails directly from ChatGPT
- Example: "Search my emails for recent correspondence about [project name]"
- Setup: Requires admin approval in Microsoft 365
- **Note:** If approval fails, revisit later with IT provider

**SharePoint / OneDrive:**
- Purpose: Access company documents and templates
- Use case: "Find our standard contract template and customize it for [client]"
- Setup: Connect SharePoint sites (not individual OneDrive accounts)
- **Best practice:** Create dedicated SharePoint folder for AI-accessible templates

### 5.2 Google Workspace Integration

**Gmail Connector:**
- Similar to Outlook integration
- Search and summarize email threads
- Draft responses based on email context

**Google Drive:**
- Access shared company documents
- Search across Drive for specific information
- Generate documents based on Drive templates

### 5.3 CRM / Practice Management Software

**Common CRMs with AI Integration:**
- HubSpot
- Salesforce
- Pipedrive
- Zoho CRM

**Setup Approach:**
1. Check if your CRM has an API
2. If yes, use custom GPT or Zapier to connect
3. If no, export data to SharePoint/Drive for ChatGPT access

---

## Part 6: Personalization & Brand Alignment

### 6.1 Custom Instructions

Set up Custom Instructions for each user to maintain consistent tone and quality.

**Navigate to:** Settings → Personalization → Custom Instructions

**Template for Custom Instructions:**

```
WHAT WOULD YOU LIKE CHATGPT TO KNOW ABOUT YOU:
- Role: [Your job title] at [Company name]
- Industry: [Your industry]
- Location: Australia
- Company size: [Number of employees]
- Target audience: [Who you serve]

COMPANY VALUES:
- [Value 1, e.g., "Customer-first approach"]
- [Value 2, e.g., "Clear, jargon-free communication"]
- [Value 3, e.g., "Innovation with integrity"]

HOW WOULD YOU LIKE CHATGPT TO RESPOND:
- Tone: Professional, clear, and actionable
- Style: Australian English spelling and terminology
- Format: Use headings, bullet points, and tables for clarity
- Length: Concise but complete - no fluff
- Avoid: Jargon, overly formal language, American spelling
```

### 6.2 Brand Inputs

**Gather these materials for AI training:**
- Company letterhead and email signatures
- Standard email templates
- Example client communications
- Brand guidelines (tone, voice, style)
- Common document types (proposals, contracts, reports)

**How to Use:**
- Upload as reference documents when creating custom GPTs
- Paste examples in prompts to show desired style
- Build a "brand voice" library in your workspace

---

## Part 7: High-Value Use Cases

### 7.1 Start with Low-Risk, High-Impact Tasks

**Content Creation:**
- Draft blog posts and social media content
- Create email newsletters
- Write product descriptions
- Generate marketing copy

**Customer Communication:**
- Draft customer emails and responses
- Create FAQ documents
- Write help center articles
- Personalize outreach messages

**Internal Operations:**
- Summarize meeting notes
- Create project timelines
- Draft standard operating procedures (SOPs)
- Generate training materials

**Research & Analysis:**
- Competitive analysis
- Market research summaries
- Industry trend reports
- Customer feedback analysis

### 7.2 Always Review AI Outputs

**ChatGPT will make mistakes.** All outputs must be:

- **Fact-checked** against authoritative sources
- **Edited** for accuracy and brand voice
- **Reviewed** by subject matter experts
- **Tested** before sending to customers or publishing

**Red Flags to Watch For:**
- Made-up statistics or data
- Non-existent sources or citations
- Overly confident statements about uncertain topics
- Generic advice that doesn't fit your specific situation

---

## Part 8: Custom GPTs

Once your team is comfortable with basic ChatGPT, build custom GPTs for specific workflows.

### 8.1 What Are Custom GPTs?

Custom GPTs are specialized versions of ChatGPT trained on:
- Your specific instructions
- Your company documents
- Your brand voice and style
- Your common workflows

**Benefits:**
- Consistent outputs across team members
- Faster results (no need to re-explain context every time)
- Shareable within your workspace
- Easier onboarding for new team members

### 8.2 Example Custom GPTs for Business

**1. Email Drafter GPT**
- Input: Email context and key points
- Output: Professional email in your brand voice
- Includes: Greeting, body, call-to-action, sign-off

**2. Content Marketing GPT**
- Input: Topic and target audience
- Output: Blog post outline, draft, and social snippets
- Includes: SEO optimization and keyword integration

**3. Meeting Assistant GPT**
- Input: Meeting notes (bullet points)
- Output: Structured summary with action items
- Includes: Attendees, decisions, next steps, deadlines

**4. Customer Support GPT**
- Input: Customer question or complaint
- Output: Empathetic, solution-focused response
- Includes: Acknowledgment, solution, follow-up

### 8.3 How to Create a Custom GPT

1. Click your profile → **Explore GPTs** → **Create**
2. Use the GPT Builder to:
   - Name your GPT
   - Describe its purpose
   - Upload reference documents
   - Set instructions and tone
3. Test with sample inputs
4. Share with your workspace team

---

## Part 9: Training Your Team

### 9.1 Initial Training Session (30-45 minutes)

**Cover these topics:**
- Logging into the workspace
- Choosing the right model (GPT-4o for serious work)
- Attaching files (PDFs, documents, images)
- Writing effective prompts (use RIPE framework from Getting Started guide)
- Reviewing and refining outputs
- Security and privacy guidelines

### 9.2 Ongoing Support

**Weekly Check-ins (First Month):**
- Review what's working and what's not
- Share successful prompts and use cases
- Address concerns and questions
- Identify new opportunities for AI use

**Monthly Reviews (After First Month):**
- Measure time saved and productivity gains
- Expand to new use cases
- Train new team members
- Refine custom GPTs and workflows

### 9.3 Building a Prompt Library

Create a shared document (Google Doc, Notion, or SharePoint) with:

**Format:**
```
USE CASE: [What this prompt does]
PROMPT TEMPLATE: [The actual prompt with [brackets] for customization]
EXAMPLE OUTPUT: [Sample of what you get]
NOTES: [When to use, tips for best results]
```

**Categories:**
- Customer emails
- Marketing content
- Internal documents
- Research and analysis
- Administrative tasks

---

## Part 10: Rollout Plan & Next Steps

### 10.1 Week 1: Foundation

- [ ] Upgrade to Team/Enterprise plan
- [ ] Add initial 3-5 users
- [ ] Enable MFA for all users
- [ ] Set up custom instructions
- [ ] Conduct initial training session

### 10.2 Week 2-4: Pilot Phase

- [ ] Each user completes 5-10 tasks with ChatGPT
- [ ] Document successful use cases
- [ ] Build initial prompt library (10-15 prompts)
- [ ] Identify integration needs (email, documents, CRM)
- [ ] Measure time saved and quality improvements

### 10.3 Month 2: Expansion

- [ ] Add 5-10 more users
- [ ] Build 2-3 custom GPTs for common workflows
- [ ] Enable key integrations (email, SharePoint, etc.)
- [ ] Conduct team training workshop
- [ ] Establish AI usage guidelines and policies

### 10.4 Month 3+: Optimization

- [ ] Roll out to entire team
- [ ] Create advanced custom GPTs
- [ ] Integrate with core business systems
- [ ] Measure ROI (time saved, costs reduced, quality improved)
- [ ] Identify next-level automation opportunities

---

## Part 11: ChatGPT Interface Quick Reference

### 11.1 Home Screen & Starting a New Chat

1. Go to [chatgpt.com](https://chatgpt.com)
2. Sign in with your work email
3. Confirm you're in your company workspace (check workspace name top-left)
4. Click **New Chat** to start fresh conversation

### 11.2 Choosing the Right Model

**At the top of chat window, click model dropdown:**

- **GPT-4o:** Use for important business tasks (drafting, analysis, research)
- **GPT-4o mini:** Use for quick, simple tasks (reformatting, simple questions)
- **GPT-3.5:** Legacy model, not recommended for business use

**Rule of Thumb:** When in doubt, use GPT-4o.

### 11.3 Adding Files

1. Click **"+" icon** in message box
2. Choose **Upload from this device** (or connected services if enabled)
3. Select files:
   - PDFs (reports, contracts, proposals)
   - Images (screenshots, diagrams, photos)
   - Spreadsheets (CSV, Excel)
   - Text documents (Word, Google Docs)
4. Wait for upload to complete (file names appear above message box)

**Tips:**
- You can attach multiple files per query
- Scanned documents work better if OCR-processed first
- Max file size: 512MB per file

### 11.4 Writing Effective Prompts

Use the **RIPE framework** (see Getting Started with ChatGPT guide):

**Example:**
```
Role: You are a marketing manager at a B2B SaaS company.

Instructions: Write a 300-word email to existing customers announcing our new feature release.

Parameters:
- Tone: Friendly but professional
- Structure: Greeting → announcement → 3 key benefits → call-to-action → sign-off
- Avoid: Technical jargon, overly salesy language

Examples: Use the attached customer email from March 2024 as a style guide.
```

### 11.5 Reviewing and Saving Work

1. **Review carefully** - check facts, tone, and accuracy
2. **Refine with follow-ups:**
   - "Make this more concise"
   - "Add a section about pricing"
   - "Change tone to be more formal"
3. **Rename chat** for easy retrieval (e.g., "Q4 Marketing Plan - Draft")
4. **Copy output** to your document or email client
5. **Star/pin important chats** if available

---

## Part 12: Troubleshooting & FAQs

### Q: ChatGPT is giving generic/boring outputs

**A:** Add more specificity to your prompts. Use the RIPE framework and include examples of the style you want.

### Q: We're hitting usage limits too often

**A:** Upgrade to Enterprise for higher limits, or:
- Focus on high-value tasks only
- Use GPT-4o mini for simple tasks
- Batch similar tasks together
- Share workspace seats strategically

### Q: ChatGPT made up facts or cited non-existent sources

**A:** This is called "hallucination" and is a known limitation. Always verify:
- Statistics and data
- Legal or regulatory information
- Technical specifications
- Historical facts
- Source citations

### Q: How do we ensure compliance with our industry regulations?

**A:** 
- Use Team/Enterprise plan (no training on your data)
- Enable all security features (MFA, data controls)
- Redact sensitive information before uploading
- Review all outputs before use
- Document your AI usage policies
- Consult with legal/compliance team for industry-specific requirements

### Q: Team members are resistant to using AI

**A:**
- Start with volunteers/early adopters
- Share quick wins and time-saving examples
- Provide hands-on training and support
- Address concerns openly (job security, accuracy, etc.)
- Show, don't tell - demonstrate real results

---

## Part 13: Measuring Success

### Key Metrics to Track

**Time Savings:**
- Hours saved per week per user
- Tasks completed faster with AI
- Reduction in manual/repetitive work

**Quality Improvements:**
- Fewer errors in documents
- More consistent brand voice
- Better customer satisfaction scores

**Cost Savings:**
- Reduced need for external contractors
- Lower customer support costs
- Decreased training time for new hires

**Productivity Gains:**
- More content produced
- Faster project completion
- Increased output per team member

### Monthly Review Template

**What's Working:**
- [List successful use cases]
- [Time saved estimates]
- [Quality improvements noted]

**What's Not Working:**
- [Challenges encountered]
- [Areas needing improvement]
- [Training gaps identified]

**Next Month's Focus:**
- [New use cases to try]
- [Team members to onboard]
- [Integrations to enable]

---

## Conclusion

Implementing ChatGPT across your business is a journey, not a destination. Start small, measure results, and expand gradually. The businesses that succeed with AI are those that:

1. **Start with clear use cases** (don't try to do everything at once)
2. **Train their team properly** (invest in education and support)
3. **Measure and iterate** (track results and refine workflows)
4. **Maintain security** (protect data and follow best practices)
5. **Stay human-centered** (AI augments people, doesn't replace them)

**Welcome to your AI-powered future. The Tech Horizon Academy community is here to support you every step of the way.**

---

## Quick Reference Checklist

### Setup Checklist
- [ ] Choose and purchase Team/Enterprise plan
- [ ] Add initial 3-5 users
- [ ] Enable MFA for all users
- [ ] Set up custom instructions
- [ ] Configure workspace settings
- [ ] Conduct initial training session

### Security Checklist
- [ ] MFA enabled for all users
- [ ] Strong passwords enforced
- [ ] Data controls configured
- [ ] Team trained on what NOT to share
- [ ] Regular security reviews scheduled

### Optimization Checklist
- [ ] Prompt library created and maintained
- [ ] 2-3 custom GPTs built
- [ ] Key integrations enabled
- [ ] Monthly usage reviews scheduled
- [ ] ROI tracking in place

---

**Need Help?** Join the Tech Horizon Academy community or email support@techhorizonlabs.com

**Version:** 1.0 | November 2025  
**License:** © 2025 Tech Horizon Labs. For Tech Horizon Academy members only.
