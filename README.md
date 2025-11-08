# 社交反假新闻系统 / Social Anti-Fake News System

## Group Information

### Your Group Name
To be determined

### Member Details (Name and Student ID)

- **Wang Yutao** - 202320257
- **Zhang Ge** - 20232062
- **Tang Ziyu** - 20232046

### The URL of the Deployed Website

social-anti-fake-news-system.vercel.app

---

## 中文说明

### 项目简介

社交反假新闻系统是一款基于群体智慧的新闻真实性验证平台。用户可以通过投票和评论的方式，共同判断新闻的真实性，从而有效识别和抵制假新闻的传播。

### 主要功能

#### 1. 用户核心操作
- **新闻录入**：用户可以录入听到的新闻信息
- **新闻浏览**：用户可以查看所有已录入的新闻
- **投票判断**：用户可以投票判断新闻是否为假新闻
- **评论说明**：用户可以发表评论说明判断理由

#### 2. 新闻判定规则
- 新闻的"真假"状态由用户投票数量决定
- 支持筛选查看"全部新闻"、"假新闻"或"非假新闻"
- 当投票数量达到一定阈值时，系统自动更新新闻状态

#### 3. 页面功能

**首页**
- 展示新闻列表与筛选功能
- 支持选择每页显示的新闻数量（5/10/20条）
- 每条新闻显示：标题、简要内容、状态、发布人、发布时间
- 实现分页功能

**新闻详情页**
- 显示新闻完整信息：标题、内容、状态、发布人、发布时间
- 支持事件图片展示（HTML链接形式）
- 提供投票和查看评论的入口

**投票页面**
- 用户可以选择"假新闻"或"非假新闻"
- 支持添加评论说明判断理由
- 支持上传支撑图片（URL链接形式）

**评论列表页**
- 显示其他用户的投票结果和评论
- 实现分页功能
- 展示投票倾向和详细评论内容

#### 4. 数据存储
- 使用本地存储管理数据
- 支持页面刷新后数据保持
- 暂不支持服务器端数据持久化

#### 5. 模拟数据
- 提供完整的模拟数据用于演示
- 包含不同状态的新闻样本
- 展示分页和筛选功能

### 技术特点

- **响应式设计**：支持桌面端和移动端访问
- **现代化UI**：采用渐变色彩和卡片式设计
- **交互友好**：直观的操作界面和反馈机制
- **数据驱动**：基于投票结果的智能判定

### 部署说明

本项目已配置Vercel部署，支持一键部署到云端。

---

## English Description

### Project Overview

The Social Anti-Fake News System is a crowd-sourced platform for news verification. Users can collaboratively determine the authenticity of news through voting and commenting, effectively identifying and combating the spread of fake news.

### Key Features

#### 1. Core User Operations
- **News Input**: Users can input news they've heard
- **News Browsing**: Users can view all submitted news
- **Voting**: Users can vote on whether news is fake or real
- **Commenting**: Users can provide reasoning for their judgments

#### 2. News Verification Rules
- News authenticity status is determined by user vote counts
- Support filtering for "All News", "Fake News", or "Real News"
- System automatically updates news status when vote threshold is reached

#### 3. Page Features

**Homepage**
- Display news list with filtering capabilities
- Support for customizable page size (5/10/20 items)
- Each news item shows: title, summary, status, publisher, publish time
- Implemented pagination functionality

**News Detail Page**
- Display complete news information: title, content, status, publisher, publish time
- Support for event images (HTML link format)
- Provide access to voting and comment viewing

**Voting Page**
- Users can choose "Fake News" or "Real News"
- Support for adding comments explaining reasoning
- Support for uploading supporting images (URL link format)

**Comments Page**
- Display other users' voting results and comments
- Implemented pagination functionality
- Show voting tendencies and detailed comment content

#### 4. Data Storage
- Uses local storage for data management
- Supports data persistence after page refresh
- Currently does not support server-side data persistence

#### 5. Mock Data
- Provides complete mock data for demonstration
- Includes news samples with different statuses
- Demonstrates pagination and filtering functionality

### Technical Features

- **Responsive Design**: Supports both desktop and mobile access
- **Modern UI**: Features gradient colors and card-based design
- **User-Friendly Interaction**: Intuitive interface and feedback mechanisms
- **Data-Driven**: Intelligent determination based on voting results

### Deployment

This project is configured for Vercel deployment with one-click cloud deployment support.

---

## 技术栈 / Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Deployment**: Vercel Platform
- **Data Storage**: Local Storage (Browser)

## 安装和运行 / Installation and Running

### 本地开发 / Local Development

1. 克隆项目 / Clone the project
```bash
git clone <repository-url>
cd social-anti-fake-news-system
```

2. 安装依赖 / Install dependencies
```bash
npm install
```

3. 启动开发服务器 / Start development server
```bash
npm run dev
```

4. 访问应用 / Access the application
打开浏览器访问 `http://localhost:3000`

### 部署到Vercel / Deploy to Vercel

1. 安装Vercel CLI / Install Vercel CLI
```bash
npm i -g vercel
```

2. 登录Vercel / Login to Vercel
```bash
vercel login
```

3. 部署项目 / Deploy the project
```bash
vercel
```

4. 访问部署的URL / Access the deployed URL

## 项目结构 / Project Structure

```
social-anti-fake-news-system/
├── index.html          # 主页面文件 / Main HTML file
├── styles.css          # 样式文件 / CSS styles
├── script.js           # JavaScript逻辑 / JavaScript logic
├── package.json        # 项目配置 / Project configuration
├── vercel.json         # Vercel部署配置 / Vercel deployment config
└── README.md           # 项目说明文档 / Project documentation
```

## 贡献指南 / Contributing

欢迎提交Issue和Pull Request来改进这个项目。

We welcome issues and pull requests to improve this project.

## 许可证 / License

MIT License
