# ChurchHub Backend API

A Node.js/Express backend API for the ChurchHub admin panel, designed to connect to PostgreSQL database on Hostinger VPS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- PM2 (for production deployment)

### Installation

1. **Upload files to your Hostinger VPS**
   ```bash
   # Create directory on your VPS
   mkdir -p /home/churchhub-backend
   cd /home/churchhub-backend
   
   # Upload all backend files to this directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your actual database credentials
   nano .env
   ```

4. **Set up the database**
   ```bash
   # Connect to your PostgreSQL database and run the init.sql script
   psql -h 157.173.219.190 -U devsigner -d fgpcnagercoil -f sql/init.sql
   ```

5. **Test the connection**
   ```bash
   # Run in development mode
   npm run dev
   
   # Test the API
   curl http://localhost:3001/health
   curl http://localhost:3001/api/test-db
   ```

## 🌐 Production Deployment on Hostinger VPS

### Step 1: Install Node.js on your VPS
```bash
# SSH into your Hostinger VPS
ssh your-username@your-vps-ip

# Install Node.js (using NodeSource repository)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 2: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Step 3: Upload and Configure
```bash
# Create application directory
sudo mkdir -p /var/www/churchhub-backend
cd /var/www/churchhub-backend

# Upload your backend files here
# Set proper permissions
sudo chown -R $USER:$USER /var/www/churchhub-backend

# Install dependencies
npm install --production

# Create logs directory
mkdir logs

# Configure environment
cp .env.example .env
nano .env  # Edit with your actual values
```

### Step 4: Start with PM2
```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Step 5: Configure Firewall (if needed)
```bash
# Allow the API port (3001)
sudo ufw allow 3001
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Check if API is running
- `GET /api/test-db` - Test database connection

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `GET /api/members/:id` - Get member by ID
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

## 🔧 Environment Variables

```env
# Database Configuration
DB_HOST=157.173.219.190
DB_USER=devsigner
DB_PASS=devsigner
DB_NAME=fgpcnagercoil
DB_PORT=5432

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration
FRONTEND_URL=https://your-bolt-app-url.com
```

## 🛠️ Development

```bash
# Install dev dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## 📊 Monitoring

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs churchhub-api

# Restart application
pm2 restart churchhub-api

# Stop application
pm2 stop churchhub-api
```

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation
- SQL injection protection via parameterized queries
- Environment variable protection

## 🐛 Troubleshooting

### Database Connection Issues
1. Check if PostgreSQL is running on your VPS
2. Verify firewall settings allow connections on port 5432
3. Ensure SSL settings are correct in database config
4. Test connection manually: `psql -h 157.173.219.190 -U devsigner -d fgpcnagercoil`

### API Not Accessible
1. Check if the application is running: `pm2 status`
2. Verify firewall allows port 3001: `sudo ufw status`
3. Check logs: `pm2 logs churchhub-api`
4. Test locally: `curl http://localhost:3001/health`

### CORS Issues
1. Update `FRONTEND_URL` in `.env` file
2. Restart the application: `pm2 restart churchhub-api`

## 📞 Support

If you encounter issues:
1. Check the logs: `pm2 logs churchhub-api`
2. Verify environment variables are set correctly
3. Test database connection independently
4. Ensure all dependencies are installed