const express = require('express');
const router = express.Router();

// Helper function to calculate news status based on votes
function calculateStatus(votes) {
  const totalVotes = votes.fake + votes.real;
  if (totalVotes < 5) {
    return 'unknown';
  }
  return votes.fake > votes.real ? 'fake' : 'real';
}

// GET /api/news - Get all news with pagination, filtering, and search
router.get('/', (req, res) => {
  try {
    let news = [...req.app.locals.news];
    
    // Search functionality
    const { search, status, page = 1, pageSize = 10 } = req.query;
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      news = news.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.content.toLowerCase().includes(searchLower) ||
        item.publisher.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (status && status !== 'all') {
      news = news.filter(item => item.status === status);
    }
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const size = parseInt(pageSize);
    const totalItems = news.length;
    const totalPages = Math.ceil(totalItems / size);
    const startIndex = (pageNum - 1) * size;
    const endIndex = startIndex + size;
    
    // Get paginated results
    const paginatedNews = news.slice(startIndex, endIndex);
    
    // Update status for each news item based on current votes
    const newsWithUpdatedStatus = paginatedNews.map(item => ({
      ...item,
      status: calculateStatus(item.votes)
    }));
    
    res.json({
      success: true,
      data: newsWithUpdatedStatus,
      pagination: {
        currentPage: pageNum,
        pageSize: size,
        totalItems,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/news/:id - Get single news item by ID
router.get('/:id', (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    const news = req.app.locals.news.find(item => item.id === newsId);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'News not found'
      });
    }
    
    // Update status based on current votes
    const newsWithUpdatedStatus = {
      ...news,
      status: calculateStatus(news.votes)
    };
    
    res.json({
      success: true,
      data: newsWithUpdatedStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/news - Create new news item
router.post('/', (req, res) => {
  try {
    const { title, content, image, publisher } = req.body;
    
    // Validation
    if (!title || !content || !publisher) {
      return res.status(400).json({
        success: false,
        error: 'Title, content, and publisher are required'
      });
    }
    
    // Get the highest ID and increment
    const maxId = Math.max(...req.app.locals.news.map(item => item.id), 0);
    const newId = maxId + 1;
    
    // Create new news item
    const newNews = {
      id: newId,
      title,
      content,
      image: image || '',
      publisher,
      publishTime: new Date().toLocaleString('en-US'),
      votes: { fake: 0, real: 0 },
      status: 'unknown'
    };
    
    // Add to news array (at the beginning)
    req.app.locals.news.unshift(newNews);
    
    res.status(201).json({
      success: true,
      data: newNews,
      message: 'News published successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/news/:id/vote - Submit a vote for a news item
router.post('/:id/vote', (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    const { vote, comment, image, author } = req.body;
    
    // Validation
    if (!vote || !['fake', 'real'].includes(vote)) {
      return res.status(400).json({
        success: false,
        error: 'Valid vote (fake or real) is required'
      });
    }
    
    const news = req.app.locals.news.find(item => item.id === newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'News not found'
      });
    }
    
    // Update vote count
    news.votes[vote]++;
    
    // Recalculate status
    news.status = calculateStatus(news.votes);
    
    // Add comment if provided
    if (comment || image) {
      const comments = req.app.locals.comments;
      const maxCommentId = Math.max(...comments.map(c => c.id), 0);
      const newComment = {
        id: maxCommentId + 1,
        newsId: newsId,
        author: author || 'Anonymous User',
        vote: vote,
        content: comment || 'No comment',
        image: image || '',
        commentTime: new Date().toLocaleString('en-US')
      };
      comments.push(newComment);
    }
    
    res.json({
      success: true,
      data: {
        news: {
          ...news,
          status: calculateStatus(news.votes)
        }
      },
      message: 'Vote submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/news/:id/stats - Get voting statistics for a news item
router.get('/:id/stats', (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    const news = req.app.locals.news.find(item => item.id === newsId);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'News not found'
      });
    }
    
    const totalVotes = news.votes.fake + news.votes.real;
    const fakePercentage = totalVotes > 0 ? (news.votes.fake / totalVotes * 100).toFixed(1) : 0;
    const realPercentage = totalVotes > 0 ? (news.votes.real / totalVotes * 100).toFixed(1) : 0;
    
    res.json({
      success: true,
      data: {
        votes: news.votes,
        totalVotes,
        fakePercentage: parseFloat(fakePercentage),
        realPercentage: parseFloat(realPercentage),
        status: calculateStatus(news.votes),
        confidence: totalVotes >= 5 ? 'high' : 'low'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
