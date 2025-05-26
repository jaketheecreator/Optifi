# Optifi - DeFi Aggregator on Monad

A modern DeFi dashboard frontend built with React, TypeScript, Tailwind CSS, GSAP animations, and ShadCN UI components.

## Features

- **Dark Mode Design**: Beautiful dark-themed UI with Tailwind CSS
- **Responsive Layout**: Mobile-friendly with collapsible sidebar
- **Simple/Pro Mode Toggle**: Switch between simplified and advanced UI views
- **Smooth Animations**: Page transitions and UI interactions with GSAP
- **Modern Components**: Built with ShadCN UI for a consistent design system

## Tech Stack

- React + TypeScript
- Next.js (App Router)
- Tailwind CSS
- GSAP (Animation)
- ShadCN UI (Component Library)

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # Reusable UI components
│   │   └── ui/          # ShadCN UI components
│   ├── hooks/           # Custom React hooks
│   ├── layout/          # Layout components (sidebar, header)
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── next.config.js       # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/optifi.git
   cd optifi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Deploy with default settings

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Monad Network](https://monad.xyz/)