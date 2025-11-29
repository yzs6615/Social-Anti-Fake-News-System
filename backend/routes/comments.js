const express = require('express');
const router = express.Router();

// GET /api/comments - Get comments with pagination and filtering
router.get('/', (req, res) => {
  try {
    let comments = [...req.app.locals.comments];
    
    const { newsId, page = 1, pageSize = 5 } = req.query;
    
    // Filter by newsId if provided
    if (newsId) {
      comments = comments.filter(comment => comment.newsId === parseInt(newsId));
    }
    
    // Calculate pagination
    const pageNum = parseInt(page);
    const size = parseInt(pageSize);
    const totalItems = comments.length;
    const totalPages = Math.ceil(totalItems / size);
    const startIndex = (pageNum - 1) * size;
    const endIndex = startIndex + size;
    
    // Get paginated results
    const paginatedComments = comments.slice(startIndex, endIndex);
    
    // Sort by comment time (newest first)
    paginatedComments.sort((a, b) => 
      new Date(b.commentTime) - new Date(a.commentTime)
    );
    
    res.json({
      success: true,
      data: paginatedComments,
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

// GET /api/comments/:id - Get single comment by ID
router.get('/:id', (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const comment = req.app.locals.comments.find(item => item.id === commentId);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }
    
    res.json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/comments - Create new comment
router.post('/', (req, res) => {
  try {
    const { newsId, author, vote, content, image } = req.body;
    
    // Validation
    if (!newsId || !vote || !['fake', 'real'].includes(vote)) {
      return res.status(400).json({
        success: false,
        error: 'NewsId and valid vote (fake or real) are required'
      });
    }
    
    // Check if news exists
    const news = req.app.locals.news.find(item => item.id === parseInt(newsId));
    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'News not found'
      });
    }
    
    // Get the highest ID and increment
    const maxId = Math.max(...req.app.locals.comments.map(item => item.id), 0);
    const newId = maxId + 1;
    
    // Create new comment
    const newComment = {
      id: newId,
      newsId: parseInt(newsId),
      author: author || 'Anonymous User',
      vote,
      content: content || 'No comment',
      image: image || '',
      commentTime: new Date().toLocaleString('en-US')
    };
    
    // Add to comments array
    req.app.locals.comments.push(newComment);
    
    // Update news vote count
    news.votes[vote]++;
    
    res.status(201).json({
      success: true,
      data: newComment,
      message: 'Comment added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
