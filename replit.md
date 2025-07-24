# Replit.md

## Overview

This is a full-stack portfolio application built with Express.js, React, and TypeScript. The application showcases a developer's work, skills, and projects with GitHub integration for dynamic content. It features a modern design system using shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: wouter for client-side routing
- **Build Tool**: Vite for development and build processes
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Design System**: shadcn/ui components with Radix UI primitives

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: Drizzle ORM configured for PostgreSQL (via Neon Database)
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **API Design**: RESTful API with JSON responses

### Development Setup
- **Development Server**: Vite middleware integration with Express
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Build Process**: Separate builds for client (Vite) and server (esbuild)
- **TypeScript**: Shared types between client and server via shared directory

## Key Components

### Frontend Components
- **Navigation**: Fixed navigation with smooth scrolling and active section detection
- **Hero Section**: Personal introduction with GitHub profile integration
- **Projects**: Dynamic project showcase fetched from GitHub repositories
- **Skills**: Categorized skill display with progress indicators
- **Contact**: Contact form with validation and submission handling
- **Footer**: Social links and site navigation

### Backend Services
- **GitHub API Integration**: Fetches user profile and repository data
- **Contact Management**: Handles contact form submissions with validation
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Error Handling**: Centralized error handling middleware

### UI Components
- Comprehensive shadcn/ui component library including:
  - Form components (Input, Textarea, Select, Button)
  - Layout components (Card, Sheet, Dialog)
  - Data display (Badge, Progress, Skeleton)
  - Navigation (Tabs, Accordion, Breadcrumb)

## Data Flow

### GitHub Integration
1. Frontend requests GitHub data via backend API endpoints
2. Backend fetches data from GitHub API with optional authentication
3. Data is cached using TanStack Query with configurable stale times
4. Repository data is filtered and categorized by technology stack

### Contact Form
1. Form validation using zod schema on both client and server
2. Form submission via TanStack Query mutations
3. Success/error feedback using toast notifications
4. Contact messages stored via storage abstraction layer

### State Management
- **Server State**: TanStack Query for API data caching and synchronization
- **UI State**: React hooks for component-level state
- **Form State**: react-hook-form with hookform/resolvers for validation

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **wouter**: Lightweight client-side routing
- **zod**: Runtime type validation and schema validation

### UI Dependencies
- **@radix-ui/***: Unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Static Assets**: Frontend assets served from `dist/public`

### Environment Configuration
- **Development**: Vite dev server with Express API proxy
- **Production**: Express serves both API and static frontend assets
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **GitHub Integration**: Optional GITHUB_TOKEN for higher API rate limits

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (configured for Neon Database serverless)
- Environment variables for database connection and optional GitHub token
- Static file serving capability for frontend assets

### Performance Considerations
- **Caching**: TanStack Query provides client-side caching for API responses
- **Code Splitting**: Vite automatically handles code splitting for optimal loading
- **Database**: Drizzle ORM with connection pooling for efficient database usage
- **GitHub API**: Rate limiting handled with optional authentication token