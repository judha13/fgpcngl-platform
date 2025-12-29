# ChurchHub - Church Administration Platform

ChurchHub is a comprehensive church administration platform that helps manage congregations, events, sermons, announcements, and websites from a single dashboard.

## Features

- **Dashboard** - Overview of church statistics and recent activity
- **Member Management** - Complete congregation directory with roles and contact information
- **Event Management** - Create and manage church events with RSVP tracking
- **Sermon Library** - Upload, organize, and publish sermons across multiple websites
- **Announcements** - Broadcast messages to all connected church websites
- **Website Sync** - Manage multiple church websites from one central location
- **Donations Tracking** - Monitor giving patterns and fund allocation
- **Settings** - Configure church information and user permissions

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Query** for data fetching and caching
- **React Router** for navigation
- **Sonner** for toast notifications

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **CORS** enabled for cross-origin requests
- **Helmet** for security headers
- **Rate limiting** for API protection

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database (optional - can use mock data)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd churchhub
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables (optional)**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Start the development servers**
   
   **Frontend (in one terminal):**
   ```bash
   npm run dev
   ```
   
   **Backend (in another terminal):**
   ```bash
   cd backend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001

### Default Login Credentials

- **Email:** admin@churchhub.com
- **Password:** admin123

## Database Setup

### Option 1: PostgreSQL Database
1. Create a PostgreSQL database
2. Update the `.env` file in the backend directory with your database credentials
3. Run the SQL script in `supabase/migrations/20251227074330_long_sunset.sql` to create tables and sample data

### Option 2: Mock Data (Default)
The application includes mock data and will work without a database connection for demonstration purposes.

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## Project Structure

```
churchhub/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service functions
│   ├── context/           # React context providers
│   └── lib/               # Utility functions
├── backend/               # Backend API server
│   ├── routes/            # API route handlers
│   ├── config/            # Database configuration
│   └── middleware/        # Express middleware
├── supabase/              # Database migrations
└── public/                # Static assets
```

## API Endpoints

- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /health` - Health check
- `GET /api/test-db` - Test database connection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.