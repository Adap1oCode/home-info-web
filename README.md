# Property Search Solutions

<div align="center">

**Specialist Property Searches for Legal Professionals**

Fast, accurate, and fully compliant property searches delivered nationwide—trusted by conveyancers and solicitors across England and Wales.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.3-38bdf8)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [License](#license)

---

## 🎯 Overview

Property Search Solutions is a modern, professional web application designed specifically for legal professionals in England and Wales. The platform provides comprehensive property search services including Local Authority Searches, Environmental Searches, Drainage & Water Searches, Title Checks, and Bespoke Search Packages.

### Key Highlights

- ✅ **Fully Responsive Design** - Optimized for all devices
- ✅ **Modern UI/UX** - Clean, professional interface with smooth animations
- ✅ **SEO Optimized** - Built with Next.js for optimal search engine performance
- ✅ **Type-Safe** - Full TypeScript implementation
- ✅ **Fast Performance** - Optimized with Next.js 15 and React 19
- ✅ **Accessible** - WCAG compliant components

---

## ✨ Features

### Core Functionality

- **Hero Section** - Compelling introduction with clear call-to-action
- **About Section** - Detailed information about our services and expertise
- **Services Section** - Comprehensive display of all search services offered
- **Trust Signals** - Credentials and certifications (ICO Registered, COPSO, IPSA)
- **Contact Form** - Professional inquiry form with validation
- **FAQs Page** - Frequently asked questions with accordion interface
- **Privacy Policy** - GDPR compliant privacy information
- **Terms of Use** - Legal terms and conditions

### Technical Features

- Server-Side Rendering (SSR) for optimal performance
- Client-side animations with AOS (Animate On Scroll)
- Form validation and handling
- Responsive navigation with smooth scrolling
- SEO-friendly metadata and structure

---

## 🛠 Tech Stack

### Core Technologies

- **[Next.js 15.1.6](https://nextjs.org/)** - React framework with SSR/SSG
- **[React 19.0.0](https://reactjs.org/)** - UI library
- **[TypeScript 5.7.3](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4.0.3](https://tailwindcss.com/)** - Utility-first CSS framework

### Key Libraries

- **[AOS](https://michalsnik.github.io/aos/)** - Animate On Scroll library
- **[@headlessui/react](https://headlessui.com/)** - Accessible UI components
- **[@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)** - Form styling

### Development Tools

- **Turbopack** - Fast bundler for development
- **PostCSS** - CSS processing
- **ESLint** - Code linting

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd property-search-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
property-search-solutions/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes
│   │   ├── signin/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── (default)/                # Main application routes
│   │   ├── faqs/                 # FAQs page
│   │   ├── privacy-policy/       # Privacy policy page
│   │   ├── terms-of-use/         # Terms of use page
│   │   ├── layout.tsx            # Default layout with Header/Footer
│   │   └── page.tsx              # Homepage
│   ├── api/                      # API routes
│   ├── css/                      # Global styles
│   │   ├── additional-styles/    # Custom styles
│   │   └── style.css             # Main stylesheet
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── ui/                       # UI components (Header, Footer, Logo)
│   ├── about-section.tsx         # About section component
│   ├── contact-form.tsx          # Contact form component
│   ├── hero-home.tsx             # Hero section component
│   ├── services-section.tsx       # Services section component
│   ├── trust-signals.tsx         # Trust signals component
│   └── accordion.tsx             # Accordion component for FAQs
├── public/                        # Static assets
│   └── images/                   # Image files
├── next.config.js                # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Dependencies and scripts
```

---

## 📄 Pages & Routes

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, about, services, trust signals, and contact form |
| `/faqs` | Frequently Asked Questions page with accordion interface |
| `/privacy-policy` | Privacy policy and GDPR compliance information |
| `/terms-of-use` | Terms of use and legal information |

### Authentication Pages (Available but not in use)

- `/signin` - Sign in page
- `/signup` - Sign up page
- `/reset-password` - Password reset page

---

## 🧩 Components

### Layout Components

- **`Header`** - Navigation header with logo and menu
- **`Footer`** - Footer with company information and links
- **`Logo`** - Company logo component

### Page Sections

- **`HeroHome`** - Hero section with main headline and CTA
- **`AboutSection`** - About us section
- **`ServicesSection`** - Services grid with icons and descriptions
- **`TrustSignals`** - Trust badges and credentials
- **`ContactForm`** - Contact form with validation

### UI Components

- **`Accordion`** - Collapsible accordion for FAQs
- **`PageIllustration`** - Background illustrations and effects

---

## 💻 Development

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (via Tailwind plugin)
- Component-based architecture

### Best Practices

- ✅ Use TypeScript for all components
- ✅ Follow Next.js App Router conventions
- ✅ Implement proper SEO metadata
- ✅ Ensure accessibility (WCAG compliance)
- ✅ Optimize images and assets
- ✅ Use semantic HTML

---

## 🏗 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Deploy

The application can be deployed to:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting service**

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 📝 Key Information

### Company Details

- **Business Name**: Property Search Solutions Ltd
- **Email**: info@propertysearchsolutions.co.uk
- **Phone**: 01234 567890
- **Registration**: England & Wales
- **ICO Registration**: [Your Number]

### Services Offered

1. **Local Authority Searches** - Planning, building control, highways, enforcement notices
2. **Environmental Searches** - Flood risk, contaminated land, ground stability, radon data
3. **Drainage & Water Searches** - Sewer connections, water supply, billing arrangements
4. **Title Checks** - Ownership, boundaries, easements, restrictive covenants
5. **Bespoke Search Packages** - Customized bundles for specific requirements

### Compliance

- ✅ ICO Registered
- ✅ UK GDPR Compliant
- ✅ COPSO Member
- ✅ IPSA Member

---

## 🤝 Contributing

This is a private project. For contributions or inquiries, please contact the development team.

---

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

## 📞 Support

For technical support or inquiries:

- **Email**: info@propertysearchsolutions.co.uk
- **Phone**: 01234 567890

---

<div align="center">

**Built with ❤️ using Next.js and React**

Property Search Solutions Ltd © 2024

</div>
