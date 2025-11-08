# Social Anti-Fake News System

## Group Information

### Your Group Name
Zg277

### Member Details (Name and Student ID)

- **Wang Yutao** - 202320257
- **Zhang Ge** - 20232062
- **Tang Ziyu** - 20232046

### The URL of the Deployed Website

https://social-anti-fake-news-system.vercel.app

---

## Project Overview

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

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Deployment**: Vercel Platform
- **Data Storage**: Local Storage (Browser)

## Installation and Running

### Local Development

1. Clone the project
```bash
git clone <repository-url>
cd social-anti-fake-news-system
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Access the application
Open your browser and visit `http://localhost:3000`

### Deploy to Vercel

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy the project
```bash
vercel
```

4. Access the deployed URL

## Project Structure

```
social-anti-fake-news-system/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript logic
├── package.json        # Project configuration
├── vercel.json         # Vercel deployment config
└── README.md           # Project documentation
```

## Contributing

We welcome issues and pull requests to improve this project.

## License

MIT License
