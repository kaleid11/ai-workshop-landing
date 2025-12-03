# Tech Horizon Academy - AI Workshop Platform

> **Master AI Before Your Competitors Do** - The all-in-one platform for pioneers who refuse to be left behind.

A comprehensive AI learning and tools platform featuring 2,400+ curated AI tools, live workshops, recorded sessions, prompt library, and a complete learning hub for mastering AI in social media and business automation.

## 🚀 Features

### 🎓 Complete Learning Hub
- **Live Workshops** - Weekly interactive sessions with AI experts
- **Recorded Workshops** - Access library of past workshop recordings
- **Prompt Library** - 118+ curated AI prompts for various use cases
- **Knowledge Base** - Comprehensive guides and best practices

### 🛠️ AI Tools Database (2,400+ Tools)
- Curated collection of AI tools across multiple categories
- Advanced search and filtering by category, pricing model
- AI-powered tool picker for personalized recommendations
- Tool comparison feature
- Detailed tool information with use cases and pricing

### 📚 Resources
- **Workflows** - Pre-built automation workflows
- **Templates** - Ready-to-use templates for various tasks
- **Case Studies** - Real-world AI implementation examples

### 💳 Flexible Membership Tiers
- **Access Pass** - One-time payment for workshop access
- **Workshop** - Individual workshop purchases
- **Starter** - 2 workshop tokens/month + recordings
- **Lite** - 4 workshop tokens/month + priority support
- **Pro** - Unlimited workshops + all features
- **Enterprise** - Custom solutions for teams

## 🏗️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Tailwind CSS 4** - Utility-first styling
- **Wouter** - Lightweight routing
- **tRPC** - End-to-end typesafe APIs
- **React Query** - Data fetching and caching
- **shadcn/ui** - Beautiful component library

### Backend
- **Express 4** - Web server framework
- **tRPC 11** - Type-safe API layer
- **Drizzle ORM** - Type-safe database queries
- **MySQL/TiDB** - Database
- **Manus OAuth** - Authentication system

### Infrastructure
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety across the stack
- **Superjson** - Automatic data serialization
- **Stripe** - Payment processing

## 📦 Installation

### Prerequisites
- Node.js 22.13.0 or higher
- pnpm package manager
- MySQL or TiDB database

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/kaleid11/ai-workshop-landing.git
cd ai-workshop-landing
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-jwt-secret
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
VITE_APP_ID=your-app-id
OWNER_OPEN_ID=your-owner-openid
OWNER_NAME=Your Name

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App Configuration
VITE_APP_TITLE=Tech Horizon Academy
VITE_APP_LOGO=/logo.png

# Manus Built-in APIs
BUILT_IN_FORGE_API_URL=https://forge-api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key
VITE_FRONTEND_FORGE_API_URL=https://forge-api.manus.im

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

4. **Push database schema**
```bash
pnpm db:push
```

5. **Seed the database** (optional)
```bash
# Import tools, prompts, and other data
node scripts/seed-database.mjs
```

6. **Start development server**
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts with OAuth integration
- **purchases** - Workshop purchase records
- **userSubscriptions** - Active subscription management
- **membershipTiers** - Tier definitions and pricing
- **tools** - AI tools database (2,400+ entries)
- **prompts** - Prompt library
- **workshops** - Workshop schedules and details
- **workshopBookings** - User workshop registrations

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Database
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Drizzle Studio

# Testing
pnpm test             # Run vitest tests
pnpm test:ui          # Run tests with UI

# Code Quality
pnpm lint             # Lint code
pnpm type-check       # TypeScript type checking
```

### Project Structure

```
ai-workshop-landing/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities and tRPC client
│   │   └── contexts/      # React contexts
│   └── public/            # Static assets
├── server/                # Backend Express + tRPC
│   ├── routers.ts         # tRPC route definitions
│   ├── db.ts              # Database queries
│   └── _core/             # Core server infrastructure
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Table definitions
├── shared/                # Shared types and constants
└── scripts/               # Utility scripts
```

## 🎨 Key Features Implementation

### AI Tool Picker
Uses LLM integration to analyze user requirements and recommend suitable tools from the database.

### Stripe Integration
- One-time payments for workshops and access passes
- Recurring subscriptions for membership tiers
- Webhook handling for payment events
- Automatic access management

### Workshop System
- Token-based access control
- Booking management
- Calendar integration
- Automated email notifications

### Tools Database
- Advanced search with full-text indexing
- Category and pricing filters
- Performance optimized with database indexes
- 2,400+ curated tools across multiple categories

## 🔒 Security

- JWT-based session management
- Manus OAuth integration
- Stripe webhook signature verification
- Environment variable protection
- SQL injection prevention via Drizzle ORM
- XSS protection with React

## 📈 Performance Optimizations

- Database indexes on frequently queried fields
- React Query caching for API responses
- Code splitting with Vite
- Lazy loading of components
- Optimized bundle size
- CDN for static assets

## 🚀 Deployment

### Prerequisites
- Node.js environment
- MySQL/TiDB database
- Stripe account
- Domain name (optional)

### Steps

1. Build the application
```bash
pnpm build
```

2. Set production environment variables

3. Start the production server
```bash
pnpm start
```

4. Configure reverse proxy (nginx/Apache)

5. Set up SSL certificate

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. Contributions are not currently accepted.

## 📧 Support

For support inquiries, please contact: [Your Contact Information]

## 🔗 Links

- **Live Demo**: [Your Demo URL]
- **Documentation**: [Your Docs URL]
- **GitHub**: https://github.com/kaleid11/ai-workshop-landing

---

**Built with ❤️ for pioneers who refuse to be left behind**
