# GDG Bandung Website

The official website for Google Developer Group Bandung, built with modern web technologies to showcase our community activities, events, and member resources.

## Tech Stack

- **Framework**: React with React Router V7 and Vite
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: BetterAuth
- **Styling**: TailwindCSS
- **Type Safety**: TypeScript
- **UI Components**: Shadcn UI Components
- **Icons**: Lucide React Icons

## Features

- 🏠 Landing Page
- 📄 Code of Conduct
- 📜 Terms and Conditions
- 🔗 URL Shortener
  - Custom short URLs
  - QR code generation
  - Static redirects configuration
  - Expiration date support
  - Active/inactive URL management

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

1. **Application Configuration**
```env
# Server URL for authentication endpoints
VITE_SERVER_URL="http://localhost:5173/api/auth"

# Domain configuration
VITE_DOMAIN="YOUR DOMAIN" #example mydomain.com/

# Secret key for security
SECRET="YOUR_SECRET"
```

2. **Management System**
```env
# Enable/disable management system
VITE_FLAG_MANAGEMENT_SYSTEM="YOUR VALUE" # true or false
```

3. **Database Configuration**
```env
# PostgreSQL database connection URL
DATABASE_URL="postgresql://user:password@localhost:5432/gdgbandung"

# Optional: PostgreSQL container configuration (for Docker Compose)
POSTGRES_DB="gdgbandung"
POSTGRES_USER="user"
POSTGRES_PASSWORD="password"
POSTGRES_HOST_PORT="5432"
POSTGRES_CONTAINER_PORT="5432"
```

**Note**: The `VITE_` prefix is required for environment variables to be accessible in the frontend code. All other variables are only accessible in the backend.

### Database Setup

1. **Generate Migration**
   ```bash
   bun run generate
   ```
   This command generates a new migration file based on your schema changes.

2. **Run Migration**
   ```bash
   bun run migrate
   ```
   This command applies the generated migration to your database.

   Alternatively, you can use:
   ```bash
   bun drizzle push
   ```
   This command directly pushes the migration to the database.

3. **Seed Database**
   ```bash
   bun run seed
   ```
   This command populates your database with initial data.

4. **Verify Setup**
   - Ensure your PostgreSQL database is running
   - Update the `DATABASE_URL` in your `.env` file
   - Confirm the database connection is successful

### Database Tools

- **Drizzle Studio**
  ```bash
  bun run studio
  ```
  Run Drizzle Studio to visualize and manage your database schema.

- **Type Generation**
  ```bash
  bun run drizzle
  ```
  Generate TypeScript types for your database schema.


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### UI Components

The project uses Shadcn UI components for consistent and modern UI elements. Available components include:
- Cards
- Tables
- Buttons
- Inputs
- Selects
- Badges
- Toast notifications

### Icons

The project uses Lucide React Icons for consistent iconography throughout the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

For any questions or support, please contact the GDG Bandung team at:
- Email: info@gdgbandung.com
- GitHub: @gdg-bandung
- Twitter: @GDG_Bandung

---

Built with ❤️ by the GDG Bandung community
