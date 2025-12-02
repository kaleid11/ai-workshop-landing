import { drizzle } from 'drizzle-orm/mysql2';
import { tools } from '../drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

const remainingTools = [
  // Meeting Notes Tools (remaining 4)
  {
    name: 'Happyscribe',
    description: 'Professional transcription service with AI-powered accuracy. Supports 120+ languages and formats.',
    category: 'Meeting Notes',
    url: 'https://www.happyscribe.com',
    pricingModel: 'Paid',
    features: '["120+ languages", "Professional transcription", "Subtitles", "Translation", "API access", "Team collaboration"]',
    useCase: 'Professional-grade transcription for meetings, interviews, and content creation. High accuracy with human review options.',
    tags: '["AI", "Transcription", "Meeting Notes", "Multilingual", "Content Creation"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Plaude',
    description: 'Hardware meeting assistant pin that transcribes and takes notes. Physical device for in-person and virtual meetings.',
    category: 'Meeting Notes',
    url: 'https://www.plaude.com',
    pricingModel: 'Paid',
    features: '["Hardware device", "Wearable pin", "Transcription", "Meeting notes", "Portable", "Offline capable"]',
    useCase: 'Wearable AI pin for capturing meeting notes anywhere. Works for both in-person and virtual meetings.',
    tags: '["AI", "Meeting Notes", "Hardware", "Wearable", "Transcription"]',
    status: 'approved',
    tierRequired: 'pro'
  },
  {
    name: 'Jamie',
    description: 'Privacy-first AI note taker that works offline. No meeting bots required, processes everything locally on your device.',
    category: 'Meeting Notes',
    url: 'https://www.meetjamie.ai',
    pricingModel: 'Paid',
    features: '["Privacy-first", "Offline capable", "No meeting bots", "Local processing", "Cross-platform", "Secure"]',
    useCase: 'Take meeting notes without sending data to the cloud. Everything processes locally for maximum privacy and security.',
    tags: '["AI", "Meeting Notes", "Privacy", "Security", "Offline"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Metaview',
    description: 'Interview intelligence platform for recruiting teams. Automatically captures and analyzes candidate interviews.',
    category: 'Meeting Notes',
    url: 'https://www.metaview.ai',
    pricingModel: 'Paid',
    features: '["Interview transcription", "Candidate insights", "Hiring analytics", "ATS integration", "Collaboration tools", "Compliance"]',
    useCase: 'Streamline recruiting with AI-powered interview notes. Analyze candidate responses and collaborate with hiring teams.',
    tags: '["AI", "Meeting Notes", "Recruiting", "HR", "Hiring"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  
  // a16z Top 50 Apps (29 tools)
  {
    name: 'Fyxer',
    description: 'AI meeting assistant that takes notes and drafts follow-up emails. Combines meeting transcription with email automation.',
    category: 'Meeting Notes',
    url: 'https://www.fyxer.ai',
    pricingModel: 'Paid',
    features: '["Meeting transcription", "Email drafting", "Follow-up automation", "Action items", "Calendar integration"]',
    useCase: 'Automatically transcribe meetings and draft follow-up emails based on discussion points and action items.',
    tags: '["AI", "Meeting Notes", "Email", "Productivity", "Automation"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Freepik',
    description: 'All-in-one creative suite with AI-powered design tools. Includes stock photos, vectors, AI image generation, and design templates.',
    category: 'Design',
    url: 'https://www.freepik.com',
    pricingModel: 'Freemium',
    features: '["AI image generation", "Stock photos", "Vectors", "Design templates", "Mockups", "Icons", "PSD files"]',
    useCase: 'Complete creative toolkit for designers and marketers. Generate AI images, access millions of assets, and create professional designs.',
    tags: '["AI", "Design", "Creative", "Stock Photos", "Image Generation"]',
    status: 'approved',
    tierRequired: 'free'
  },
  {
    name: 'Photoroom',
    description: 'AI-powered photo editing tool that removes backgrounds, enhances images, and creates product photos instantly.',
    category: 'Design',
    url: 'https://www.photoroom.com',
    pricingModel: 'Freemium',
    features: '["Background removal", "AI enhancement", "Product photos", "Batch editing", "Templates", "API access"]',
    useCase: 'Create professional product photos and marketing images in seconds. Perfect for e-commerce and social media content.',
    tags: '["AI", "Photo Editing", "E-commerce", "Design", "Marketing"]',
    status: 'approved',
    tierRequired: 'free'
  },
  {
    name: 'Opus Clip',
    description: 'AI video editor that automatically creates short clips from long videos. Perfect for repurposing content for social media.',
    category: 'Video',
    url: 'https://www.opus.pro',
    pricingModel: 'Freemium',
    features: '["AI video clipping", "Auto-captions", "Viral score", "Multi-platform formatting", "B-roll insertion", "Social media optimization"]',
    useCase: 'Turn long videos into viral short clips for TikTok, YouTube Shorts, and Instagram Reels. AI identifies the best moments automatically.',
    tags: '["AI", "Video Editing", "Social Media", "Content Creation", "Repurposing"]',
    status: 'approved',
    tierRequired: 'free'
  },
  {
    name: 'CapCut',
    description: 'Free video editing app with AI-powered features. Popular for creating social media content and short-form videos.',
    category: 'Video',
    url: 'https://www.capcut.com',
    pricingModel: 'Freemium',
    features: '["AI video editing", "Auto-captions", "Effects library", "Templates", "Music library", "Multi-platform"]',
    useCase: 'Easy video editing for social media creators. AI-powered features make professional editing accessible to everyone.',
    tags: '["AI", "Video Editing", "Social Media", "Content Creation", "Free"]',
    status: 'approved',
    tierRequired: 'free'
  },
  {
    name: 'Cluely',
    description: 'Real-time AI meeting coach that provides live feedback during calls. Helps improve communication and sales performance.',
    category: 'Meeting Notes',
    url: 'https://www.cluely.ai',
    pricingModel: 'Paid',
    features: '["Real-time feedback", "Live coaching", "Sales insights", "Communication analysis", "Performance tracking"]',
    useCase: 'Get AI-powered coaching during live meetings. Improve your communication skills and close more deals with real-time suggestions.',
    tags: '["AI", "Meeting Notes", "Sales", "Coaching", "Communication"]',
    status: 'approved',
    tierRequired: 'pro'
  },
  {
    name: 'Instantly',
    description: 'Cold email outreach platform with AI-powered personalization. Scale email campaigns while maintaining high deliverability.',
    category: 'Sales',
    url: 'https://instantly.ai',
    pricingModel: 'Paid',
    features: '["Email outreach", "AI personalization", "Deliverability optimization", "Campaign management", "Analytics", "Unlimited accounts"]',
    useCase: 'Send thousands of personalized cold emails with high deliverability. AI helps craft compelling messages that get responses.',
    tags: '["AI", "Email", "Sales", "Outreach", "Lead Generation"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: '11x',
    description: 'AI-powered automated GTM (Go-To-Market) employees. Digital workers that handle sales, marketing, and customer success tasks.',
    category: 'Sales',
    url: 'https://www.11x.ai',
    pricingModel: 'Paid',
    features: '["AI employees", "Sales automation", "Lead qualification", "Outreach automation", "CRM integration", "24/7 operation"]',
    useCase: 'Deploy AI workers to handle repetitive GTM tasks. Automate prospecting, outreach, and follow-ups while your team focuses on closing.',
    tags: '["AI", "Sales", "Automation", "AI Agents", "GTM"]',
    status: 'approved',
    tierRequired: 'pro'
  },
  {
    name: 'Micro1',
    description: 'AI-powered recruiting platform that sources, vets, and matches top engineering talent globally.',
    category: 'HR',
    url: 'https://www.micro1.ai',
    pricingModel: 'Paid',
    features: '["AI recruiting", "Talent sourcing", "Technical vetting", "Global talent pool", "Fast hiring", "Pre-vetted candidates"]',
    useCase: 'Hire pre-vetted engineers in days, not months. AI handles sourcing and initial screening to find the perfect candidates.',
    tags: '["AI", "Recruiting", "HR", "Engineering", "Hiring"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Applaud',
    description: 'AI-powered HR automation platform for employee engagement, performance management, and recognition.',
    category: 'HR',
    url: 'https://www.applaud.com',
    pricingModel: 'Paid',
    features: '["Employee engagement", "Performance management", "Recognition programs", "Feedback automation", "Analytics", "Integration"]',
    useCase: 'Automate HR workflows and boost employee engagement. AI-powered insights help managers make better people decisions.',
    tags: '["AI", "HR", "Employee Engagement", "Performance", "Management"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Customer.io',
    description: 'Customer engagement platform with AI-powered messaging automation. Send targeted emails, push notifications, and SMS.',
    category: 'Marketing',
    url: 'https://customer.io',
    pricingModel: 'Paid',
    features: '["Marketing automation", "Email campaigns", "Push notifications", "SMS", "Segmentation", "A/B testing", "Webhooks"]',
    useCase: 'Automate customer communication across email, push, and SMS. AI helps personalize messages and optimize send times.',
    tags: '["AI", "Marketing", "Email", "Automation", "Customer Engagement"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Ada',
    description: 'AI customer service platform that automates support conversations. Resolves customer issues without human intervention.',
    category: 'Customer Service',
    url: 'https://www.ada.cx',
    pricingModel: 'Paid',
    features: '["AI chatbot", "Automated support", "Multi-language", "CRM integration", "Analytics", "Self-service"]',
    useCase: 'Automate customer support with AI that understands context and resolves issues. Reduce support costs while improving satisfaction.',
    tags: '["AI", "Customer Service", "Chatbot", "Automation", "Support"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Crisp',
    description: 'Customer messaging platform with AI-powered chatbot. Combines live chat, email, and social media in one inbox.',
    category: 'Customer Service',
    url: 'https://crisp.chat',
    pricingModel: 'Freemium',
    features: '["Live chat", "AI chatbot", "Shared inbox", "CRM", "Knowledge base", "Multi-channel support"]',
    useCase: 'Unified customer communication platform. AI chatbot handles common questions while humans focus on complex issues.',
    tags: '["AI", "Customer Service", "Live Chat", "Chatbot", "Support"]',
    status: 'approved',
    tierRequired: 'free'
  },
  {
    name: 'Lorikeet',
    description: 'AI customer service automation platform that learns from your support tickets and automates responses.',
    category: 'Customer Service',
    url: 'https://www.lorikeet.ai',
    pricingModel: 'Paid',
    features: '["AI automation", "Ticket analysis", "Auto-responses", "Knowledge base", "Integration", "Analytics"]',
    useCase: 'Train AI on your support history to automatically handle common customer questions. Reduces response time and support costs.',
    tags: '["AI", "Customer Service", "Automation", "Support", "Tickets"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Crosby Legal',
    description: 'Agentic AI law firm that handles legal research, document review, and contract analysis end-to-end.',
    category: 'Legal',
    url: 'https://www.crosbylegal.ai',
    pricingModel: 'Paid',
    features: '["AI legal research", "Document review", "Contract analysis", "Compliance", "Automated workflows", "Legal AI agents"]',
    useCase: 'AI-powered legal services that handle research and document review autonomously. Reduces legal costs for startups.',
    tags: '["AI", "Legal", "Automation", "AI Agents", "Contracts"]',
    status: 'approved',
    tierRequired: 'pro'
  },
  {
    name: 'Cognition (Devin)',
    description: 'AI software engineer that writes code, debugs, and deploys applications autonomously. First AI software engineer.',
    category: 'Development',
    url: 'https://www.cognition-labs.com',
    pricingModel: 'Paid',
    features: '["AI coding", "Autonomous development", "Debugging", "Testing", "Deployment", "Code review"]',
    useCase: 'AI engineer that can build features, fix bugs, and deploy code independently. Works alongside human developers.',
    tags: '["AI", "Development", "Coding", "AI Agents", "Automation"]',
    status: 'approved',
    tierRequired: 'elite'
  },
  {
    name: 'Serval',
    description: 'AI IT service desk that handles technical support tickets, troubleshooting, and system maintenance autonomously.',
    category: 'IT',
    url: 'https://www.serval.ai',
    pricingModel: 'Paid',
    features: '["AI IT support", "Ticket automation", "Troubleshooting", "System monitoring", "Knowledge base", "Integration"]',
    useCase: 'Automate IT support with AI that can diagnose and fix common technical issues. Reduces help desk workload.',
    tags: '["AI", "IT", "Support", "Automation", "Service Desk"]',
    status: 'approved',
    tierRequired: 'pro'
  },
  {
    name: 'Alma',
    description: 'AI-powered immigration law services that automate visa applications, document preparation, and case management.',
    category: 'Legal',
    url: 'https://www.tryalma.ai',
    pricingModel: 'Paid',
    features: '["Immigration law", "Visa applications", "Document automation", "Case management", "Compliance", "AI guidance"]',
    useCase: 'Simplify immigration processes with AI. Automates visa applications and ensures compliance with immigration laws.',
    tags: '["AI", "Legal", "Immigration", "Automation", "Compliance"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Delve',
    description: 'Compliance automation platform that uses AI to monitor regulations, assess risks, and ensure ongoing compliance.',
    category: 'Compliance',
    url: 'https://www.delve.ai',
    pricingModel: 'Paid',
    features: '["Compliance monitoring", "Risk assessment", "Regulatory tracking", "Automated reporting", "Audit trails", "Policy management"]',
    useCase: 'Stay compliant automatically. AI monitors regulatory changes and ensures your business meets all requirements.',
    tags: '["AI", "Compliance", "Risk Management", "Automation", "Regulatory"]',
    status: 'approved',
    tierRequired: 'pro'
  },
  {
    name: 'Combinely',
    description: 'AI accounting automation platform that handles bookkeeping, expense categorization, and financial reporting.',
    category: 'Finance',
    url: 'https://www.combinely.ai',
    pricingModel: 'Paid',
    features: '["Automated bookkeeping", "Expense categorization", "Financial reporting", "Tax preparation", "Integration", "Real-time insights"]',
    useCase: 'Automate accounting tasks with AI. Categorizes expenses, reconciles accounts, and generates financial reports automatically.',
    tags: '["AI", "Accounting", "Finance", "Automation", "Bookkeeping"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Merlin AI',
    description: 'General-purpose AI assistant that works across all websites. Helps with writing, research, and summarization.',
    category: 'Productivity',
    url: 'https://www.getmerlin.in',
    pricingModel: 'Freemium',
    features: '["Browser extension", "AI writing", "Research assistant", "Summarization", "Multi-model support", "Works everywhere"]',
    useCase: 'AI assistant that works on any website. Summarize articles, draft emails, and get instant answers without switching tabs.',
    tags: '["AI", "Productivity", "Writing", "Research", "Browser Extension"]',
    status: 'approved',
    tierRequired: 'free'
  },
  {
    name: 'Arcads',
    description: 'AI avatar creation platform for generating video advertisements. Create spokesperson videos without filming.',
    category: 'Video',
    url: 'https://www.arcads.ai',
    pricingModel: 'Paid',
    features: '["AI avatars", "Video ads", "Text-to-video", "Multiple avatars", "Customization", "Fast generation"]',
    useCase: 'Create video advertisements with AI avatars. Generate spokesperson videos in minutes without actors or filming.',
    tags: '["AI", "Video", "Avatars", "Advertising", "Marketing"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Tavus',
    description: 'Multi-purpose AI avatar platform for creating personalized videos at scale. Used for sales, marketing, and customer success.',
    category: 'Video',
    url: 'https://www.tavus.io',
    pricingModel: 'Paid',
    features: '["AI avatars", "Personalized videos", "Scale video creation", "Voice cloning", "API access", "Integration"]',
    useCase: 'Generate thousands of personalized videos with AI avatars. Perfect for outbound sales, customer onboarding, and marketing.',
    tags: '["AI", "Video", "Avatars", "Personalization", "Sales"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  {
    name: 'Emergent',
    description: 'AI app building platform that helps non-technical users create applications with natural language.',
    category: 'Development',
    url: 'https://www.emergent.ai',
    pricingModel: 'Paid',
    features: '["No-code AI", "App builder", "Natural language", "Rapid prototyping", "Deployment", "Templates"]',
    useCase: 'Build AI-powered applications without coding. Describe what you want in plain English and AI builds it for you.',
    tags: '["AI", "No-Code", "Development", "App Builder", "Productivity"]',
    status: 'approved',
    tierRequired: 'starter'
  },
  
  // Attio CRM
  {
    name: 'Attio',
    description: 'Next-generation AI-native CRM platform designed for modern, data-driven teams. Flexible data model with powerful automation and collaboration features.',
    category: 'CRM',
    url: 'https://attio.com',
    pricingModel: 'Freemium',
    features: '["Flexible data model", "AI-native", "Real-time sync", "Data enrichment", "Workflow automation", "Team collaboration", "Custom objects", "Modern UI"]',
    useCase: 'Modern CRM for VC firms, startups, and data-driven sales teams. Build custom relationships and automate workflows without rigid structures.',
    tags: '["CRM", "AI", "Sales", "Startups", "VC", "Data-Driven", "Collaboration"]',
    status: 'approved',
    tierRequired: 'free'
  }
];

console.log(`Inserting ${remainingTools.length} tools...`);

try {
  await db.insert(tools).values(remainingTools);
  console.log(`✅ Successfully inserted ${remainingTools.length} tools!`);
  process.exit(0);
} catch (error) {
  console.error('❌ Error inserting tools:', error);
  process.exit(1);
}
