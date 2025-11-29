const express = require('express');
const cors = require('cors');
const { generateMockData } = require('./data/mockData');
const newsRoutes = require('./routes/news');
const commentsRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize mock data
const mockData = generateMockData();
app.locals.news = mockData.news;
app.locals.comments = mockData.comments;

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/comments', commentsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Social Anti-Fake News System API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Social Anti-Fake News System Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      news: '/api/news',
      comments: '/api/comments'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Total news items: ${app.locals.news.length}`);
  console.log(`💬 Total comments: ${app.locals.comments.length}`);
});

module.exports = app;
