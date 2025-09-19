# Token Portfolio

A web application to track and manage a portfolio of cryptocurrency tokens, built with React, TypeScript, and Vite.

## Key Features

- **Connect Wallet**: Seamlessly connect to various cryptocurrency wallets using RainbowKit and wagmi.
- **Portfolio Visualization**: View your token portfolio distribution with an interactive pie chart (powered by Recharts) and a detailed table.
- **Watchlist Management**: Add and remove tokens from your watchlist to monitor their performance.
- **Real-time Data**: Fetches real-time token data using React Query and Axios.
- **Modern UI**: A responsive and aesthetically pleasing user interface built with Tailwind CSS and Radix UI.
- **State Management**: Centralized state management using Redux Toolkit.
- **Data Tables**: Efficient and extensible data tables powered by TanStack Table.

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI, lucide-react
- **State Management**: Redux Toolkit, React Query
- **Wallet Integration**: RainbowKit, wagmi, viem
- **Charting**: Recharts
- **Tables**: TanStack Table
- **Linting**: ESLint
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ManojBuilds/token-portfolio
    ```
2.  Navigate to the project directory:
    ```bash
    cd token-portfolio
    ```
3.  Install the dependencies:
    ```bash
    pnpm install
    ```
4.  Create a `.env.local` file by copying the `.env.example` file:
    ```bash
    cp .env.example .env.local
    ```
5.  Add your environment variables to the `.env.local` file.

### Running the Development Server

To start the development server, run the following command:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
/src
├── assets/              # Static assets like images and icons
├── components/          # Reusable UI components
│   ├── ui/              # Radix UI based components
│   └── watchlist/       # Components specific to the watchlist feature
├── lib/                 # Utility functions and API helpers
├── store/               # Redux Toolkit store configuration
│   └── slices/          # Redux slices for different features
└── types/               # TypeScript type definitions
```

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm preview`: Serves the production build locally for preview.
