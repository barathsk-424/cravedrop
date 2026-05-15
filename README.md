# 🔥 CraveDrop — Premium Restaurant & Food Delivery Platform

A full-stack, production-ready restaurant ordering platform built with **Next.js 16**, **Supabase**, and **TypeScript**. Features online ordering, table reservations, Instamart grocery delivery, and a premium cinematic UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

---

## ✨ Features

- **🍔 Food Ordering** — Browse menus, add to cart, and checkout with a seamless flow
- **🍽️ Dineout** — Discover top restaurants and book tables with real-time availability
- **🛒 Instamart** — Grocery and essentials delivery with category-based browsing
- **🔍 Smart Search** — Real-time search with instant results filtered by name, category, and description
- **👤 Authentication** — Supabase auth with session persistence across page refreshes
- **🎨 Dark/Light Mode** — Premium theme toggle with smooth transitions
- **📱 Fully Responsive** — Mobile-first design with bottom navigation
- **🛡️ Admin Dashboard** — Order management, analytics, and content control

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Backend/Auth** | Supabase (PostgreSQL + Auth + Storage) |
| **State Management** | Zustand (cart) + TanStack Query (server state) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (customer)/         # Customer-facing routes
│   │   ├── cart/           # Shopping cart page
│   │   ├── checkout/       # Checkout flow
│   │   ├── dineout/        # Dineout restaurant discovery
│   │   ├── help/           # Help & support
│   │   ├── instamart/      # Grocery delivery
│   │   ├── location/       # Location selector
│   │   ├── menu/           # Restaurant menu
│   │   ├── offers/         # Deals & promotions
│   │   ├── orders/         # Order history & tracking
│   │   ├── profile/        # User profile & settings
│   │   ├── layout.tsx      # Customer layout (Header + Footer + Nav)
│   │   └── page.tsx        # Homepage
│   ├── admin/              # Admin dashboard
│   ├── auth/               # Login & registration
│   │   ├── login/
│   │   └── register/
│   ├── actions/            # Server actions
│   ├── globals.css         # Global styles & design tokens
│   └── layout.tsx          # Root layout (fonts, providers)
├── components/
│   ├── admin/              # Admin-specific components
│   ├── customer/           # Customer UI components (FoodCard, CartPanel)
│   ├── home/               # Homepage sections
│   ├── layout/             # Header, Footer, BottomNav
│   ├── providers/          # ThemeProvider, QueryProvider
│   └── ui/                 # Reusable UI primitives (Button, Input, etc.)
├── constants/              # App configuration & constants
├── hooks/                  # Custom React hooks (useSupabase)
├── lib/                    # Utilities & Supabase clients
│   ├── supabase.ts         # Browser client (singleton)
│   ├── supabase-server.ts  # Server client (SSR)
│   ├── demo-data.ts        # Fallback demo data
│   ├── data-access.ts      # Server-side data fetching
│   └── utils.ts            # Helper functions (cn, formatCurrency)
├── stores/                 # Zustand state stores
│   ├── cart.ts             # Cart state management
│   └── auth.ts             # Auth state management
└── types/                  # TypeScript type definitions
    ├── index.ts            # App-wide types
    └── supabase.ts         # Auto-generated Supabase types
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17+ (recommended: 20+)
- **npm** or **pnpm**
- A **Supabase** project ([create one free](https://supabase.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cravedrop.git
cd cravedrop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

### Netlify

1. Push your code to GitHub
2. Create a new site on [netlify.com](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard

## 🗄️ Database Schema

The app uses Supabase PostgreSQL with the following core tables:

- `profiles` — User accounts & preferences
- `categories` — Food categories
- `foods` — Menu items with pricing
- `food_images` — Food item images
- `orders` — Customer orders
- `order_items` — Individual items in orders
- `banners` — Promotional banners
- `addresses` — Delivery addresses
- `coupons` — Discount codes

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by **CraveDrop Team**
