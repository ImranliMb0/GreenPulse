# GreenPulse Cloud 🌿

Welcome to GreenPulse Cloud, an AI-powered platform designed to accelerate renewable energy deployment and provide transparent carbon tracking. This application is built with Next.js and Firebase, showcasing a range of features from data visualization to AI-driven insights.

## ✨ Key Features

*   **Authentication**: Secure user sign-up and login functionality using Firebase Authentication.
*   **Dashboard**: Get a quick overview of key metrics like carbon emissions and renewable energy adoption trends through interactive charts.
*   **Interactive GeoMap**: Explore a global map to discover the solar and wind energy potential for any location on Earth. Click anywhere to get instant data.
*   **Carbon Reporting**: Calculate your carbon footprint based on energy consumption and view a history of your generated reports, all stored securely in Firestore.
*   **AI-Driven Insights**: Leverage generative AI to analyze regional data and produce actionable insights for improving sustainability efforts.

## 🚀 Technology Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
*   **Authentication & Database**: [Firebase](https://firebase.google.com/) (Authentication and Firestore)
*   **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
*   **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Getting Started

This project is set up to run in a managed development environment. The application uses Firebase for its backend services.

- To start the development server, run `npm run dev`.
- To build the application for production, run `npm run build`.

## Pages Overview

*   `/`: The public-facing landing page.
*   `/login` & `/signup`: User authentication pages.
*   `/dashboard`: The main dashboard with key performance indicators.
*   `/map`: The interactive GeoMap for exploring renewable energy potential.
*   `/report`: The page for calculating and viewing carbon emission reports.
*   `/insights`: The page for generating AI-driven regional insights.
*   `/settings`: A placeholder for user account settings.
