# 💻 Traveloop Frontend

This directory contains the high-fidelity frontend for **Traveloop**, built with Next.js 15, TypeScript, and Tailwind CSS.

> [!NOTE]
> For the complete project documentation, including architecture, API, and setup guides, please refer to the [Root README](../README.md).

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🛠️ Key Technologies
- **Next.js 15 (App Router)**: Utilizing React 19 features and Turbopack for optimized builds.
- **TypeScript**: Full-stack type safety for data models and API responses.
- **Tailwind CSS**: Custom design system for premium, responsive UI.
- **Framer Motion**: Advanced micro-animations and page transitions.
- **Lucide React**: Stylized iconography across the dashboard and landing pages.
- **Recharts**: Data visualization for financial and travel analytics.

## 🏗️ Technical Implementation
- **Bento-Grid Layout**: Implementation of a modern bento-grid system for complex dashboard visualization.
- **Unified Trip Builder**: Hydration pattern for AI-generated trips, allowing the same interface for manual and AI flows.
- **Image Optimization**: High-performance image handling using `next/image` with remote pattern configurations.
- **Optimistic UI**: Real-time profile and settings updates for a seamless user experience.
- **Global State**: Centralized *AuthContext* and *apiClient* with automated error interceptors.

## 📂 Structure Highlights
- `/app`: Main dashboard, trip builder, and authentication pages.
- `/components`: Reusable UI modules (itinerary builders, maps, charts).
- `/contexts`: Global state for authentication and AI orchestration.
- `/services`: Axios-based clients for backend communication.

## 🏗️ Unified Trip Builder
The frontend implements a **Hydration Pattern** for AI trips. 
1. The AI Service returns a structured JSON.
2. The `TripContext` hydrates this JSON into the **Unified Trip Builder**.
3. The user interacts with the same interface regardless of whether the trip was started manually or via AI.

---
[← Back to Main Project Documentation](../README.md)
