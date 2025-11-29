// Social Anti-Fake News System - Main JavaScript file

// API Configuration
// Change this to your deployed backend URL when deploying
const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3001/api';

class AntiFakeNewsSystem {
    constructor() {
        this.news = [];
        this.comments = [];
        this.currentPage = 1;
        this.pageSize = 10;
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.currentNewsId = null;
        this.commentsPage = 1;
        this.commentsPageSize = 5;
        this.paginationInfo = null;
        this.loading = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadNews();
    }

    // API Helper Methods
    async apiRequest(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // Load news from API
    async loadNews() {
        try {
            this.loading = true;
            const params = new URLSearchParams({
                page: this.currentPage,
                pageSize: this.pageSize,
                status: this.currentFilter,
                ...(this.currentSearch && { search: this.currentSearch })
            });
            
            const response = await this.apiRequest(`/news?${params}`);
            
            if (response.success) {
                this.news = response.data;
                this.paginationInfo = response.pagination;
                this.renderHomePage();
            }
        } catch (error) {
            console.error('Error loading news:', error);
            alert('Failed to load news. Please check if the backend server is running.');
        } finally {
            this.loading = false;
        }
    }

    // Load single news item
    async loadNewsDetail(newsId) {
        try {
            const response = await this.apiRequest(`/news/${newsId}`);
            if (response.success) {
                return response.data;
            }
        } catch (error) {
            console.error('Error loading news detail:', error);
            alert('Failed to load news details.');
        }
        return null;
    }

    // Load comments from API
    async loadComments(newsId) {
        try {
            const params = new URLSearchParams({
                newsId: newsId,
                page: this.commentsPage,
                pageSize: this.commentsPageSize
            });
            
            const response = await this.apiRequest(`/comments?${params}`);
            
            if (response.success) {
                return {
                    comments: response.data,
                    pagination: response.pagination
                };
            }
        } catch (error) {
            console.error('Error loading comments:', error);
        }
        return { comments: [], pagination: null };
    }

    // Bind events
    bindEvents() {
        // Navigation buttons
        document.getElementById('addNewsBtn').addEventListener('click', () => this.showAddNewsModal());
        document.getElementById('backToHome').addEventListener('click', () => this.showPage('homePage'));
        document.getElementById('backToDetail').addEventListener('click', () => this.showPage('newsDetailPage'));
        document.getElementById('backToDetailFromComments').addEventListener('click', () => this.showPage('newsDetailPage'));

        // Search input with debounce
        let searchTimeout;
        document.getElementById('searchInput').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.currentSearch = e.target.value;
                this.currentPage = 1;
                this.loadNews();
            }, 500);
        });

        // Filters
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.currentPage = 1;
            this.loadNews();
        });

        document.getElementById('pageSizeSelect').addEventListener('change', (e) => {
            this.pageSize = parseInt(e.target.value);
            this.currentPage = 1;
            this.loadNews();
        });

        // Modal
        document.getElementById('closeModal').addEventListener('click', () => this.hideAddNewsModal());
        document.getElementById('cancelAdd').addEventListener('click', () => this.hideAddNewsModal());
        document.getElementById('addNewsForm').addEventListener('submit', (e) => this.handleAddNews(e));

        // Detail page buttons
        document.getElementById('voteBtn').addEventListener('click', () => this.showVotePage());
        document.getElementById('viewCommentsBtn').addEventListener('click', () => this.showCommentsPage());
    }

    // Show page
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        if (pageId === 'homePage') {
            this.loadNews();
        } else if (pageId === 'newsDetailPage') {
            this.renderNewsDetail();
        } else if (pageId === 'votePage') {
            this.renderVotePage();
        } else if (pageId === 'commentsPage') {
            this.renderCommentsPage();
        }
    }

    // Render home page
    renderHomePage() {
        this.renderNewsList(this.news);
        this.renderPagination();
    }

    // Render news list
    renderNewsList(news) {
        const newsList = document.getElementById('newsList');
        
        if (this.loading) {
            newsList.innerHTML = `
                <div class="empty-state">
                    <div class="spinner"></div>
                    <p>Loading news...</p>
                </div>
            `;
            return;
        }
        
        if (news.length === 0) {
            newsList.innerHTML = `
                <div class="empty-state">
                    <h3>No News</h3>
                    <p>No related news found under current filter conditions</p>
                </div>
            `;
            return;
        }

        newsList.innerHTML = news.map(item => `
            <div class="news-item ${item.status}" onclick="app.showNewsDetail(${item.id})">
                <div class="news-header">
                    <div class="news-title">${item.title}</div>
                    <div class="news-status status-${item.status}">
                        ${item.status === 'fake' ? 'Fake News' : item.status === 'real' ? 'Real News' : 'Pending'}
                    </div>
                </div>
                <div class="news-content">${this.truncateText(item.content, 100)}</div>
                <div class="news-meta">
                    <span class="news-author">Publisher: ${item.publisher}</span>
                    <span class="news-date">${item.publishTime}</span>
                </div>
            </div>
        `).join('');
    }

    // Render pagination
    renderPagination() {
        const pagination = document.getElementById('pagination');
        
        if (!this.paginationInfo || this.paginationInfo.totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        const { currentPage, totalPages, hasPreviousPage, hasNextPage } = this.paginationInfo;
        let paginationHTML = '';
        
        // Previous page button
        paginationHTML += `
            <button ${!hasPreviousPage ? 'disabled' : ''} onclick="app.goToPage(${currentPage - 1})">
                Previous
            </button>
        `;

        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHTML += `
                    <button class="${i === currentPage ? 'active' : ''}" onclick="app.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }

        // Next page button
        paginationHTML += `
            <button ${!hasNextPage ? 'disabled' : ''} onclick="app.goToPage(${currentPage + 1})">
                Next
            </button>
        `;

        pagination.innerHTML = paginationHTML;
    }

    // Go to specified page
    goToPage(page) {
        this.currentPage = page;
        this.loadNews();
    }

    // Show news detail
    async showNewsDetail(newsId) {
        this.currentNewsId = newsId;
        this.showPage('newsDetailPage');
    }

    // Render news detail
    async renderNewsDetail() {
        const newsDetail = document.getElementById('newsDetail');
        newsDetail.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading...</p></div>';
        
        const news = await this.loadNewsDetail(this.currentNewsId);
        if (!news) {
            newsDetail.innerHTML = '<div class="empty-state"><h3>News not found</h3></div>';
            return;
        }

        newsDetail.innerHTML = `
            <h1 class="detail-title">${news.title}</h1>
            <div class="detail-content">${news.content}</div>
            ${news.image ? `<img src="${news.image}" alt="News Image" class="detail-image">` : ''}
            <div class="detail-meta">
                <span class="news-author">Publisher: ${news.publisher}</span>
                <span class="news-date">Publish Time: ${news.publishTime}</span>
                <span class="news-status status-${news.status}">
                    ${news.status === 'fake' ? 'Fake News' : news.status === 'real' ? 'Real News' : 'Pending'}
                </span>
            </div>
        `;
    }

    // Show voting page
    showVotePage() {
        this.showPage('votePage');
    }

    // Render voting page
    async renderVotePage() {
        const voteForm = document.getElementById('voteForm');
        voteForm.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading...</p></div>';
        
        const news = await this.loadNewsDetail(this.currentNewsId);
        if (!news) {
            voteForm.innerHTML = '<div class="empty-state"><h3>News not found</h3></div>';
            return;
        }

        voteForm.innerHTML = `
            <h3>Vote on the following news:</h3>
            <div class="news-preview">
                <h4>${news.title}</h4>
                <p>${this.truncateText(news.content, 200)}</p>
            </div>
            
            <form id="voteFormElement">
                <div class="vote-options">
                    <label class="vote-option">
                        <input type="radio" name="vote" value="fake" required>
                        <div>Fake News</div>
                    </label>
                    <label class="vote-option">
                        <input type="radio" name="vote" value="real" required>
                        <div>Real News</div>
                    </label>
                </div>
                
                <div class="form-group">
                    <label for="commentText">Comment (Optional)</label>
                    <textarea id="commentText" rows="4" placeholder="Please explain your reasoning..."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="commentImage">Supporting Image URL (Optional)</label>
                    <input type="url" id="commentImage" placeholder="Please enter image link">
                </div>
                
                <div class="form-group">
                    <label for="authorName">Your Name (Optional)</label>
                    <input type="text" id="authorName" placeholder="Enter your name">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Submit Vote</button>
                    <button type="button" onclick="app.showPage('newsDetailPage')" class="btn btn-secondary">Cancel</button>
                </div>
            </form>
        `;

        // Bind voting form events
        document.getElementById('voteFormElement').addEventListener('submit', (e) => this.handleVote(e));
        
        // Bind voting option click events
        document.querySelectorAll('.vote-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.vote-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                option.querySelector('input[type="radio"]').checked = true;
            });
        });
    }

    // Handle voting
    async handleVote(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const vote = formData.get('vote');
        const comment = document.getElementById('commentText').value;
        const image = document.getElementById('commentImage').value;
        const author = document.getElementById('authorName').value;
        
        if (!vote) {
            alert('Please select your voting result');
            return;
        }

        try {
            const response = await this.apiRequest(`/news/${this.currentNewsId}/vote`, {
                method: 'POST',
                body: JSON.stringify({
                    vote,
                    comment,
                    image,
                    author
                })
            });
            
            if (response.success) {
                alert('Vote submitted successfully! Thank you for your participation.');
                this.showPage('newsDetailPage');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            alert('Failed to submit vote. Please try again.');
            }
        }
        
    // Show comments page
    showCommentsPage() {
        this.commentsPage = 1;
        this.showPage('commentsPage');
    }

    // Render comments page
    async renderCommentsPage() {
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading comments...</p></div>';
        
        const { comments, pagination } = await this.loadComments(this.currentNewsId);
        this.commentsPagination = pagination;
        
        this.renderCommentsList(comments);
        this.renderCommentsPagination();
    }

    // Render comments list
    renderCommentsList(comments) {
        const commentsList = document.getElementById('commentsList');
        
        if (comments.length === 0) {
            commentsList.innerHTML = `
                <div class="empty-state">
                    <h3>No Comments</h3>
                    <p>No users have voted or commented on this news yet</p>
                </div>
            `;
            return;
        }

        commentsList.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${comment.commentTime}</span>
                </div>
                <div class="comment-vote vote-${comment.vote}">
                    ${comment.vote === 'fake' ? 'Considers it fake news' : 'Considers it real news'}
                </div>
                <div class="comment-content">${comment.content}</div>
                ${comment.image ? `<img src="${comment.image}" alt="Supporting Image" class="comment-image">` : ''}
            </div>
        `).join('');
    }

    // Render comments pagination
    renderCommentsPagination() {
        const pagination = document.getElementById('commentsPagination');
        
        if (!this.commentsPagination || this.commentsPagination.totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        const { currentPage, totalPages, hasPreviousPage, hasNextPage } = this.commentsPagination;
        let paginationHTML = '';
        
        // Previous page button
        paginationHTML += `
            <button ${!hasPreviousPage ? 'disabled' : ''} onclick="app.goToCommentsPage(${currentPage - 1})">
                Previous
            </button>
        `;

        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="${i === currentPage ? 'active' : ''}" onclick="app.goToCommentsPage(${i})">
                    ${i}
                </button>
            `;
        }

        // Next page button
        paginationHTML += `
            <button ${!hasNextPage ? 'disabled' : ''} onclick="app.goToCommentsPage(${currentPage + 1})">
                Next
            </button>
        `;

        pagination.innerHTML = paginationHTML;
    }

    // Go to specified comments page
    async goToCommentsPage(page) {
        this.commentsPage = page;
        await this.renderCommentsPage();
    }

    // Show add news modal
    showAddNewsModal() {
        document.getElementById('addNewsModal').classList.add('active');
    }

    // Hide add news modal
    hideAddNewsModal() {
        document.getElementById('addNewsModal').classList.remove('active');
        document.getElementById('addNewsForm').reset();
    }

    // Handle add news
    async handleAddNews(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newsData = {
            title: formData.get('newsTitle'),
            content: formData.get('newsContent'),
            image: formData.get('newsImage') || '',
            publisher: formData.get('publisherName')
        };
        
        try {
            const response = await this.apiRequest('/news', {
                method: 'POST',
                body: JSON.stringify(newsData)
            });
            
            if (response.success) {
                alert('News published successfully!');
        this.hideAddNewsModal();
                this.currentPage = 1;
                this.loadNews();
            }
        } catch (error) {
            console.error('Error adding news:', error);
            alert('Failed to publish news. Please try again.');
        }
    }

    // Truncate text
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// Initialize application
const app = new AntiFakeNewsSystem();
