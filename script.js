// 社交反假新闻系统 - 主要JavaScript文件

class AntiFakeNewsSystem {
    constructor() {
        this.news = [];
        this.comments = [];
        this.currentPage = 1;
        this.pageSize = 10;
        this.currentFilter = 'all';
        this.currentNewsId = null;
        this.commentsPage = 1;
        this.commentsPageSize = 5;
        
        this.init();
    }

    init() {
        this.loadMockData();
        this.bindEvents();
        this.renderHomePage();
    }

    // 加载模拟数据
    loadMockData() {
        const mockNews = [
            {
                id: 1,
                title: "某知名企业宣布破产，数千员工面临失业",
                content: "据内部消息透露，该企业由于经营不善，资金链断裂，已正式申请破产保护。公司高层表示，将尽力保障员工权益，但预计将有数千名员工面临失业风险。此次破产事件将对当地经济产生重大影响。",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
                publisher: "张记者",
                publishTime: "2024-01-15 14:30:00",
                votes: { fake: 15, real: 8 },
                status: "fake"
            },
            {
                id: 2,
                title: "科学家发现新的抗癌药物，治愈率高达90%",
                content: "国际知名医学期刊发表最新研究，科学家团队经过十年努力，成功开发出一种新型抗癌药物。该药物在临床试验中显示出惊人的效果，对多种癌症的治愈率达到90%以上。这一突破性发现将为癌症治疗带来革命性变化。",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
                publisher: "李医生",
                publishTime: "2024-01-14 09:15:00",
                votes: { fake: 3, real: 22 },
                status: "real"
            },
            {
                id: 3,
                title: "某城市出现不明飞行物，多名目击者证实",
                content: "昨晚8点左右，该市上空出现不明飞行物，发出强烈光芒。多名市民拍摄到相关视频和照片，专家正在分析这些资料。目前尚未有官方解释，但目击者描述该物体呈椭圆形，移动速度极快。",
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500",
                publisher: "王市民",
                publishTime: "2024-01-13 20:45:00",
                votes: { fake: 12, real: 5 },
                status: "fake"
            },
            {
                id: 4,
                title: "新政策出台：个人所得税起征点将提高至8000元",
                content: "财政部发布最新政策，为减轻中低收入群体负担，个人所得税起征点将从目前的5000元提高至8000元。该政策将于下月起正式实施，预计将惠及全国数千万纳税人。",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500",
                publisher: "陈记者",
                publishTime: "2024-01-12 16:20:00",
                votes: { fake: 2, real: 18 },
                status: "real"
            },
            {
                id: 5,
                title: "某明星被曝吸毒，警方已介入调查",
                content: "据知情人士透露，某知名明星因涉嫌吸毒被警方带走调查。该明星近期行为异常，引起粉丝关注。目前案件正在进一步调查中，相关证据正在收集。",
                image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=500",
                publisher: "娱乐记者",
                publishTime: "2024-01-11 11:30:00",
                votes: { fake: 8, real: 3 },
                status: "fake"
            },
            {
                id: 6,
                title: "新能源汽车销量创新高，市场前景广阔",
                content: "根据最新统计数据，今年新能源汽车销量同比增长150%，创历史新高。专家分析认为，随着技术不断进步和政策支持，新能源汽车市场前景十分广阔，预计未来几年将保持高速增长。",
                image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=500",
                publisher: "汽车行业分析师",
                publishTime: "2024-01-10 15:45:00",
                votes: { fake: 1, real: 25 },
                status: "real"
            },
            {
                id: 7,
                title: "某地发生6.5级地震，已造成重大损失",
                content: "据地震局消息，某地发生6.5级地震，震源深度10公里。目前已有人员伤亡报告，救援工作正在紧张进行中。当地政府已启动应急预案，全力保障人民生命财产安全。",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                publisher: "地震局",
                publishTime: "2024-01-09 08:30:00",
                votes: { fake: 4, real: 16 },
                status: "real"
            },
            {
                id: 8,
                title: "某网红直播带货涉嫌虚假宣传，被罚款100万",
                content: "市场监管部门对某知名网红直播带货进行查处，发现其存在虚假宣传行为。该网红夸大产品功效，误导消费者，被处以100万元罚款。相关部门提醒消费者理性购物。",
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
                publisher: "市场监管部门",
                publishTime: "2024-01-08 13:20:00",
                votes: { fake: 1, real: 19 },
                status: "real"
            },
            {
                id: 9,
                title: "某国总统宣布辞职，政治局势动荡",
                content: "某国总统在电视讲话中宣布辞职，称因健康原因无法继续履行职责。副总统将暂代总统职务，直到新总统选举产生。这一消息引发国际关注，该国政治局势出现动荡。",
                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500",
                publisher: "国际新闻记者",
                publishTime: "2024-01-07 19:15:00",
                votes: { fake: 6, real: 2 },
                status: "fake"
            },
            {
                id: 10,
                title: "新研究发现：每天喝咖啡可延长寿命",
                content: "最新医学研究发现，每天适量饮用咖啡可以显著延长寿命。研究跟踪了数万名参与者，发现咖啡中的抗氧化物质对健康有益。专家建议每天饮用2-3杯咖啡，但不宜过量。",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
                publisher: "健康专家",
                publishTime: "2024-01-06 10:00:00",
                votes: { fake: 7, real: 4 },
                status: "fake"
            }
        ];

        const mockComments = [
            {
                id: 1,
                newsId: 1,
                author: "网友A",
                vote: "fake",
                content: "这个消息明显是假的，该企业前几天还发布了盈利报告，怎么可能突然破产？",
                image: "",
                commentTime: "2024-01-15 15:30:00"
            },
            {
                id: 2,
                newsId: 1,
                author: "网友B",
                vote: "fake",
                content: "我就在这家公司工作，根本没有破产这回事，这是恶意造谣！",
                image: "",
                commentTime: "2024-01-15 16:45:00"
            },
            {
                id: 3,
                newsId: 2,
                author: "医学专家",
                vote: "real",
                content: "作为医学工作者，我认为这个消息是真实的。该研究确实发表在权威期刊上，数据可信。",
                image: "",
                commentTime: "2024-01-14 10:20:00"
            },
            {
                id: 4,
                newsId: 2,
                author: "网友C",
                vote: "real",
                content: "这个研究我也有了解，确实是一个重大突破，为癌症患者带来了希望。",
                image: "",
                commentTime: "2024-01-14 11:15:00"
            },
            {
                id: 5,
                newsId: 3,
                author: "天文爱好者",
                vote: "fake",
                content: "这些视频明显是后期制作的，光影效果不自然，应该是恶作剧。",
                image: "",
                commentTime: "2024-01-13 21:30:00"
            }
        ];

        this.news = mockNews;
        this.comments = mockComments;
    }

    // 绑定事件
    bindEvents() {
        // 导航按钮
        document.getElementById('addNewsBtn').addEventListener('click', () => this.showAddNewsModal());
        document.getElementById('backToHome').addEventListener('click', () => this.showPage('homePage'));
        document.getElementById('backToDetail').addEventListener('click', () => this.showPage('newsDetailPage'));
        document.getElementById('backToDetailFromComments').addEventListener('click', () => this.showPage('newsDetailPage'));

        // 筛选器
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.currentPage = 1;
            this.renderHomePage();
        });

        document.getElementById('pageSizeSelect').addEventListener('change', (e) => {
            this.pageSize = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderHomePage();
        });

        // 模态框
        document.getElementById('closeModal').addEventListener('click', () => this.hideAddNewsModal());
        document.getElementById('cancelAdd').addEventListener('click', () => this.hideAddNewsModal());
        document.getElementById('addNewsForm').addEventListener('submit', (e) => this.handleAddNews(e));

        // 详情页按钮
        document.getElementById('voteBtn').addEventListener('click', () => this.showVotePage());
        document.getElementById('viewCommentsBtn').addEventListener('click', () => this.showCommentsPage());
    }

    // 显示页面
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        if (pageId === 'homePage') {
            this.renderHomePage();
        } else if (pageId === 'newsDetailPage') {
            this.renderNewsDetail();
        } else if (pageId === 'votePage') {
            this.renderVotePage();
        } else if (pageId === 'commentsPage') {
            this.renderCommentsPage();
        }
    }

    // 渲染首页
    renderHomePage() {
        const filteredNews = this.getFilteredNews();
        const paginatedNews = this.getPaginatedNews(filteredNews);
        
        this.renderNewsList(paginatedNews);
        this.renderPagination(filteredNews.length);
    }

    // 获取筛选后的新闻
    getFilteredNews() {
        if (this.currentFilter === 'all') {
            return this.news;
        } else if (this.currentFilter === 'fake') {
            return this.news.filter(item => item.status === 'fake');
        } else if (this.currentFilter === 'real') {
            return this.news.filter(item => item.status === 'real');
        }
        return this.news;
    }

    // 获取分页后的新闻
    getPaginatedNews(news) {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return news.slice(start, end);
    }

    // 渲染新闻列表
    renderNewsList(news) {
        const newsList = document.getElementById('newsList');
        
        if (news.length === 0) {
            newsList.innerHTML = `
                <div class="empty-state">
                    <h3>暂无新闻</h3>
                    <p>当前筛选条件下没有找到相关新闻</p>
                </div>
            `;
            return;
        }

        newsList.innerHTML = news.map(item => `
            <div class="news-item ${item.status}" onclick="app.showNewsDetail(${item.id})">
                <div class="news-header">
                    <div class="news-title">${item.title}</div>
                    <div class="news-status status-${item.status}">
                        ${item.status === 'fake' ? '假新闻' : item.status === 'real' ? '非假新闻' : '待判定'}
                    </div>
                </div>
                <div class="news-content">${this.truncateText(item.content, 100)}</div>
                <div class="news-meta">
                    <span class="news-author">发布人：${item.publisher}</span>
                    <span class="news-date">${item.publishTime}</span>
                </div>
            </div>
        `).join('');
    }

    // 渲染分页
    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.pageSize);
        const pagination = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // 上一页按钮
        paginationHTML += `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="app.goToPage(${this.currentPage - 1})">
                上一页
            </button>
        `;

        // 页码按钮
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <button class="${i === this.currentPage ? 'active' : ''}" onclick="app.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }

        // 下一页按钮
        paginationHTML += `
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="app.goToPage(${this.currentPage + 1})">
                下一页
            </button>
        `;

        pagination.innerHTML = paginationHTML;
    }

    // 跳转到指定页面
    goToPage(page) {
        this.currentPage = page;
        this.renderHomePage();
    }

    // 显示新闻详情
    showNewsDetail(newsId) {
        this.currentNewsId = newsId;
        this.showPage('newsDetailPage');
    }

    // 渲染新闻详情
    renderNewsDetail() {
        const news = this.news.find(item => item.id === this.currentNewsId);
        if (!news) return;

        const newsDetail = document.getElementById('newsDetail');
        newsDetail.innerHTML = `
            <h1 class="detail-title">${news.title}</h1>
            <div class="detail-content">${news.content}</div>
            ${news.image ? `<img src="${news.image}" alt="新闻图片" class="detail-image">` : ''}
            <div class="detail-meta">
                <span class="news-author">发布人：${news.publisher}</span>
                <span class="news-date">发布时间：${news.publishTime}</span>
                <span class="news-status status-${news.status}">
                    ${news.status === 'fake' ? '假新闻' : news.status === 'real' ? '非假新闻' : '待判定'}
                </span>
            </div>
        `;
    }

    // 显示投票页面
    showVotePage() {
        this.showPage('votePage');
    }

    // 渲染投票页面
    renderVotePage() {
        const news = this.news.find(item => item.id === this.currentNewsId);
        if (!news) return;

        const voteForm = document.getElementById('voteForm');
        voteForm.innerHTML = `
            <h3>对以下新闻进行投票判断：</h3>
            <div class="news-preview">
                <h4>${news.title}</h4>
                <p>${this.truncateText(news.content, 200)}</p>
            </div>
            
            <form id="voteFormElement">
                <div class="vote-options">
                    <label class="vote-option">
                        <input type="radio" name="vote" value="fake" required>
                        <div>假新闻</div>
                    </label>
                    <label class="vote-option">
                        <input type="radio" name="vote" value="real" required>
                        <div>非假新闻</div>
                    </label>
                </div>
                
                <div class="form-group">
                    <label for="commentText">评论说明（可选）</label>
                    <textarea id="commentText" rows="4" placeholder="请说明您的判断理由..."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="commentImage">支撑图片URL（可选）</label>
                    <input type="url" id="commentImage" placeholder="请输入图片链接">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">提交投票</button>
                    <button type="button" onclick="app.showPage('newsDetailPage')" class="btn btn-secondary">取消</button>
                </div>
            </form>
        `;

        // 绑定投票表单事件
        document.getElementById('voteFormElement').addEventListener('submit', (e) => this.handleVote(e));
        
        // 绑定投票选项点击事件
        document.querySelectorAll('.vote-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.vote-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                option.querySelector('input[type="radio"]').checked = true;
            });
        });
    }

    // 处理投票
    handleVote(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const vote = formData.get('vote');
        const comment = document.getElementById('commentText').value;
        const image = document.getElementById('commentImage').value;
        
        if (!vote) {
            alert('请选择您的投票结果');
            return;
        }

        // 添加评论
        const newComment = {
            id: this.comments.length + 1,
            newsId: this.currentNewsId,
            author: '匿名用户',
            vote: vote,
            content: comment || '无评论',
            image: image,
            commentTime: new Date().toLocaleString('zh-CN')
        };
        
        this.comments.push(newComment);
        
        // 更新新闻投票数据
        const news = this.news.find(item => item.id === this.currentNewsId);
        if (news) {
            news.votes[vote]++;
            
            // 重新计算新闻状态
            const totalVotes = news.votes.fake + news.votes.real;
            if (totalVotes >= 5) {
                news.status = news.votes.fake > news.votes.real ? 'fake' : 'real';
            }
        }
        
        alert('投票成功！感谢您的参与。');
        this.showPage('newsDetailPage');
    }

    // 显示评论页面
    showCommentsPage() {
        this.commentsPage = 1;
        this.showPage('commentsPage');
    }

    // 渲染评论页面
    renderCommentsPage() {
        const newsComments = this.comments.filter(comment => comment.newsId === this.currentNewsId);
        const paginatedComments = this.getPaginatedComments(newsComments);
        
        this.renderCommentsList(paginatedComments);
        this.renderCommentsPagination(newsComments.length);
    }

    // 获取分页后的评论
    getPaginatedComments(comments) {
        const start = (this.commentsPage - 1) * this.commentsPageSize;
        const end = start + this.commentsPageSize;
        return comments.slice(start, end);
    }

    // 渲染评论列表
    renderCommentsList(comments) {
        const commentsList = document.getElementById('commentsList');
        
        if (comments.length === 0) {
            commentsList.innerHTML = `
                <div class="empty-state">
                    <h3>暂无评论</h3>
                    <p>还没有用户对此新闻进行投票评论</p>
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
                    ${comment.vote === 'fake' ? '认为是假新闻' : '认为非假新闻'}
                </div>
                <div class="comment-content">${comment.content}</div>
                ${comment.image ? `<img src="${comment.image}" alt="支撑图片" class="comment-image">` : ''}
            </div>
        `).join('');
    }

    // 渲染评论分页
    renderCommentsPagination(totalComments) {
        const totalPages = Math.ceil(totalComments / this.commentsPageSize);
        const pagination = document.getElementById('commentsPagination');
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // 上一页按钮
        paginationHTML += `
            <button ${this.commentsPage === 1 ? 'disabled' : ''} onclick="app.goToCommentsPage(${this.commentsPage - 1})">
                上一页
            </button>
        `;

        // 页码按钮
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="${i === this.commentsPage ? 'active' : ''}" onclick="app.goToCommentsPage(${i})">
                    ${i}
                </button>
            `;
        }

        // 下一页按钮
        paginationHTML += `
            <button ${this.commentsPage === totalPages ? 'disabled' : ''} onclick="app.goToCommentsPage(${this.commentsPage + 1})">
                下一页
            </button>
        `;

        pagination.innerHTML = paginationHTML;
    }

    // 跳转到指定评论页面
    goToCommentsPage(page) {
        this.commentsPage = page;
        this.renderCommentsPage();
    }

    // 显示添加新闻模态框
    showAddNewsModal() {
        document.getElementById('addNewsModal').classList.add('active');
    }

    // 隐藏添加新闻模态框
    hideAddNewsModal() {
        document.getElementById('addNewsModal').classList.remove('active');
        document.getElementById('addNewsForm').reset();
    }

    // 处理添加新闻
    handleAddNews(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newNews = {
            id: this.news.length + 1,
            title: formData.get('newsTitle'),
            content: formData.get('newsContent'),
            image: formData.get('newsImage') || '',
            publisher: formData.get('publisherName'),
            publishTime: new Date().toLocaleString('zh-CN'),
            votes: { fake: 0, real: 0 },
            status: 'unknown'
        };
        
        this.news.unshift(newNews); // 添加到开头
        
        alert('新闻发布成功！');
        this.hideAddNewsModal();
        this.renderHomePage();
    }

    // 截断文本
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// 初始化应用
const app = new AntiFakeNewsSystem();
