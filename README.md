# GDG Bandung Website

The official website for Google Developer Group Bandung, built with modern web technologies to showcase our community activities, events, and member resources.

## Tech Stack

- **Framework**: React with React Router V7 and Vite
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: BetterAuth
- **Styling**: TailwindCSS
- **Type Safety**: TypeScript

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gdg-bandung/gdgbandung.com.git
```

2. Install dependencies:
```bash
bun install
```

3. Copy `.env.example` to `.env` and configure your environment variables:
```bash
cp .env.example .env
```

4. Set up your PostgreSQL database and update the database URL in `.env`

5. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

Make sure to configure the following environment variables in your `.env` file:

- `DATABASE_URL`: Your PostgreSQL database URL
- `SESSION_SECRET`: Secret key for session management
- `NEXT_PUBLIC_SITE_URL`: Public URL of your site
- Other configuration variables as needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

For any questions or support, please contact the GDG Bandung team at:
- Email: info@gdgbandung.com
- GitHub: @gdg-bandung
- Twitter: @GDG_Bandung

---

Built with ❤️ by the GDG Bandung community
