# Social Anti-Fake News System - Backend API

## Overview

This is the backend API for the Social Anti-Fake News System. It provides RESTful endpoints for managing news articles, comments, voting, and search functionality with comprehensive pagination support.

## Features

- ✅ RESTful API with Express.js
- ✅ Comprehensive search functionality (by title, content, publisher)
- ✅ Status-based filtering (all, fake, real)
- ✅ Full pagination support for news and comments
- ✅ Voting system with automatic status calculation
- ✅ CORS enabled for frontend integration
- ✅ Mock data generation (50+ news items, 200+ comments)
- ✅ Error handling and validation
- ✅ Health check endpoint

## API Endpoints

### News Endpoints

- `GET /api/news` - Get all news with pagination, search, and filtering
  - Query parameters:
    - `page` (default: 1) - Page number
    - `pageSize` (default: 10) - Items per page
    - `status` (optional) - Filter by status: 'all', 'fake', 'real'
    - `search` (optional) - Search in title, content, or publisher
  - Example: `/api/news?page=1&pageSize=10&status=fake&search=company`

- `GET /api/news/:id` - Get single news item by ID
- `POST /api/news` - Create new news item
  - Body: `{ title, content, image?, publisher }`
- `POST /api/news/:id/vote` - Submit a vote for a news item
  - Body: `{ vote: 'fake' | 'real', comment?, image?, author? }`
- `GET /api/news/:id/stats` - Get voting statistics for a news item

### Comments Endpoints

- `GET /api/comments` - Get comments with pagination
  - Query parameters:
    - `newsId` (optional) - Filter by news ID
    - `page` (default: 1) - Page number
    - `pageSize` (default: 5) - Items per page
- `GET /api/comments/:id` - Get single comment by ID
- `POST /api/comments` - Create new comment
  - Body: `{ newsId, vote: 'fake' | 'real', author?, content?, image? }`

### Health Check

- `GET /api/health` - Health check endpoint

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
PORT=3001
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (development/production)

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
backend/
├── server.js           # Main server file
├── routes/
│   ├── news.js        # News routes
│   └── comments.js    # Comments routes
├── data/
│   └── mockData.js    # Mock data generator
├── package.json       # Dependencies
├── .env.example       # Environment variables example
├── Dockerfile         # Docker configuration
└── README.md          # This file
```

## Mock Data

The backend includes comprehensive mock data:
- 50+ news items with various statuses
- 200+ comments distributed across news items
- Realistic voting patterns
- Diverse publishers and authors

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd backend
vercel
```

### Docker Deployment

1. Build the image:
```bash
docker build -t anti-fake-news-backend .
```

2. Run the container:
```bash
docker run -p 3001:3001 anti-fake-news-backend
```

### VM Deployment

1. SSH into your VM
2. Clone the repository
3. Install Node.js and npm
4. Navigate to backend directory
5. Install dependencies: `npm install`
6. Start with PM2 or similar:
```bash
npm install -g pm2
pm2 start server.js --name anti-fake-news-api
pm2 save
pm2 startup
```

## API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Testing

Test the API using curl or any HTTP client:

```bash
# Get all news
curl http://localhost:3001/api/news

# Search news
curl "http://localhost:3001/api/news?search=company&status=fake"

# Get news by ID
curl http://localhost:3001/api/news/1

# Create news
curl -X POST http://localhost:3001/api/news \
  -H "Content-Type: application/json" \
  -d '{"title":"Test News","content":"Test content","publisher":"Test Publisher"}'

# Vote on news
curl -X POST http://localhost:3001/api/news/1/vote \
  -H "Content-Type: application/json" \
  -d '{"vote":"fake","comment":"This is fake"}'
```

## License

MIT License
