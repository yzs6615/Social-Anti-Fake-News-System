// Generate comprehensive mock data for the Anti-Fake News System

function generateMockData() {
  const news = [
    {
      id: 1,
      title: "Famous Company Announces Bankruptcy, Thousands of Employees Face Unemployment",
      content: "According to internal sources, the company has officially applied for bankruptcy protection due to poor management and broken capital chain. Company executives said they will try their best to protect employee rights, but it is expected that thousands of employees will face unemployment risks. This bankruptcy incident will have a major impact on the local economy.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
      publisher: "Reporter Zhang",
      publishTime: "2024-01-15 14:30:00",
      votes: { fake: 15, real: 8 },
      status: "fake"
    },
    {
      id: 2,
      title: "Scientists Discover New Anti-Cancer Drug with 90% Cure Rate",
      content: "International medical journal published latest research. After ten years of effort, a team of scientists successfully developed a new type of anti-cancer drug. The drug showed amazing results in clinical trials, with a cure rate of over 90% for various cancers. This breakthrough discovery will bring revolutionary changes to cancer treatment.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
      publisher: "Dr. Li",
      publishTime: "2024-01-14 09:15:00",
      votes: { fake: 3, real: 22 },
      status: "real"
    },
    {
      id: 3,
      title: "UFO Appears in City, Multiple Witnesses Confirm",
      content: "Around 8 PM last night, an unidentified flying object appeared in the sky above the city, emitting strong light. Many citizens captured related videos and photos, and experts are analyzing these materials. There is no official explanation yet, but witnesses described the object as oval-shaped and moving at extremely high speed.",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500",
      publisher: "Citizen Wang",
      publishTime: "2024-01-13 20:45:00",
      votes: { fake: 12, real: 5 },
      status: "fake"
    },
    {
      id: 4,
      title: "New Policy: Personal Income Tax Threshold Raised to 8000 Yuan",
      content: "The Ministry of Finance issued the latest policy. To reduce the burden on middle and low-income groups, the personal income tax threshold will be raised from the current 5000 yuan to 8000 yuan. This policy will be officially implemented next month and is expected to benefit tens of millions of taxpayers nationwide.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500",
      publisher: "Reporter Chen",
      publishTime: "2024-01-12 16:20:00",
      votes: { fake: 2, real: 18 },
      status: "real"
    },
    {
      id: 5,
      title: "Celebrity Exposed for Drug Use, Police Investigating",
      content: "According to informed sources, a famous celebrity was taken away by police for investigation on suspicion of drug use. The celebrity's recent abnormal behavior has attracted fan attention. The case is currently under further investigation and relevant evidence is being collected.",
      image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=500",
      publisher: "Entertainment Reporter",
      publishTime: "2024-01-11 11:30:00",
      votes: { fake: 8, real: 3 },
      status: "fake"
    },
    {
      id: 6,
      title: "New Energy Vehicle Sales Hit Record High, Market Prospects Bright",
      content: "According to the latest statistics, new energy vehicle sales increased by 150% year-on-year this year, hitting a record high. Expert analysis believes that with continuous technological progress and policy support, the new energy vehicle market prospects are very bright, and it is expected to maintain high-speed growth in the coming years.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=500",
      publisher: "Auto Industry Analyst",
      publishTime: "2024-01-10 15:45:00",
      votes: { fake: 1, real: 25 },
      status: "real"
    },
    {
      id: 7,
      title: "6.5 Magnitude Earthquake Occurs, Causing Major Damage",
      content: "According to the earthquake bureau, a 6.5 magnitude earthquake occurred with a focal depth of 10 kilometers. There have been reports of casualties, and rescue work is underway. Local government has activated emergency response plan to fully protect people's lives and property safety.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      publisher: "Earthquake Bureau",
      publishTime: "2024-01-09 08:30:00",
      votes: { fake: 4, real: 16 },
      status: "real"
    },
    {
      id: 8,
      title: "Internet Celebrity Fined 1 Million for False Advertising in Live Streaming",
      content: "Market supervision department investigated a famous internet celebrity's live streaming sales and found false advertising behavior. The internet celebrity exaggerated product effects and misled consumers, and was fined 1 million yuan. Relevant departments remind consumers to shop rationally.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
      publisher: "Market Supervision Department",
      publishTime: "2024-01-08 13:20:00",
      votes: { fake: 1, real: 19 },
      status: "real"
    },
    {
      id: 9,
      title: "President Announces Resignation, Political Situation Turbulent",
      content: "A country's president announced his resignation in a televised speech, saying he could not continue to perform his duties due to health reasons. The vice president will temporarily act as president until a new president is elected. This news has attracted international attention and the country's political situation has become turbulent.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500",
      publisher: "International News Reporter",
      publishTime: "2024-01-07 19:15:00",
      votes: { fake: 6, real: 2 },
      status: "fake"
    },
    {
      id: 10,
      title: "New Research: Daily Coffee Consumption Can Extend Lifespan",
      content: "Latest medical research found that moderate daily coffee consumption can significantly extend lifespan. The study tracked tens of thousands of participants and found that antioxidants in coffee are beneficial to health. Experts recommend drinking 2-3 cups of coffee daily, but not in excess.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      publisher: "Health Expert",
      publishTime: "2024-01-06 10:00:00",
      votes: { fake: 7, real: 4 },
      status: "fake"
    }
  ];

  // Generate additional news items to demonstrate pagination (50+ items total)
  const additionalNewsTitles = [
    "Tech Giant Announces Revolutionary AI Breakthrough",
    "Local Restaurant Chain Expands Nationwide",
    "New Study Links Exercise to Better Mental Health",
    "City Council Approves New Public Transportation Plan",
    "Scientists Discover New Species in Deep Ocean",
    "Stock Market Reaches All-Time High",
    "Major Sports Team Wins Championship",
    "New Educational Program Launched for Underprivileged Youth",
    "Climate Change Summit Reaches Historic Agreement",
    "Breakthrough in Renewable Energy Technology",
    "Famous Author Releases New Bestseller",
    "Medical Breakthrough: New Treatment for Rare Disease",
    "International Trade Agreement Signed",
    "New Museum Opens in Downtown Area",
    "Space Mission Successfully Lands on Mars",
    "Local Charity Raises Record Amount for Homeless",
    "New Airport Terminal Opens to Public",
    "Tech Startup Receives Billion-Dollar Investment",
    "Historic Building Restored to Original Glory",
    "New Law Protects Consumer Privacy Rights",
    "Major Film Festival Announces Winners",
    "Sports Stadium Undergoes Major Renovation",
    "New Research Center Opens at University",
    "International Music Festival Draws Thousands",
    "New Bridge Connects Two Major Cities",
    "Tech Company Launches Revolutionary Product",
    "Local Farmers Market Expands Operations",
    "New Hospital Wing Opens for Pediatric Care",
    "International Conference Addresses Global Issues",
    "New Park Opens in Urban Area",
    "Major Retailer Announces Expansion Plans",
    "New Study Reveals Benefits of Meditation",
    "Historic Monument Receives Restoration Funding",
    "New Transportation System Reduces Traffic",
    "International Art Exhibition Opens",
    "New Research Shows Benefits of Green Spaces",
    "Major Construction Project Nears Completion",
    "New Educational Initiative Launched",
    "International Food Festival Celebrates Diversity",
    "New Technology Improves Internet Speed"
  ];

  const publishers = [
    "Reporter Smith", "Journalist Johnson", "News Correspondent Brown",
    "Reporter Davis", "Editor Wilson", "Reporter Martinez",
    "Journalist Anderson", "Reporter Taylor", "News Writer Thomas",
    "Reporter Jackson", "Journalist White", "Reporter Harris",
    "News Correspondent Martin", "Reporter Thompson", "Journalist Garcia"
  ];

  const fakeContentTemplates = [
    "Rumors circulating about {topic} have been debunked by experts.",
    "False information about {topic} has been spreading on social media.",
    "Unverified claims regarding {topic} need fact-checking.",
    "Misleading information about {topic} has been identified."
  ];

  const realContentTemplates = [
    "Official sources confirm {topic} with verified evidence.",
    "Authorities have verified the information about {topic}.",
    "Multiple reliable sources confirm {topic}.",
    "Expert analysis supports the claims about {topic}."
  ];

  // Generate 40 additional news items
  for (let i = 0; i < 40; i++) {
    const title = additionalNewsTitles[i];
    const isFake = Math.random() > 0.6; // 40% fake, 60% real
    const template = isFake 
      ? fakeContentTemplates[Math.floor(Math.random() * fakeContentTemplates.length)]
      : realContentTemplates[Math.floor(Math.random() * realContentTemplates.length)];
    
    const content = template.replace('{topic}', title.toLowerCase());
    const publisher = publishers[Math.floor(Math.random() * publishers.length)];
    const fakeVotes = Math.floor(Math.random() * 20);
    const realVotes = Math.floor(Math.random() * 20);
    
    // Determine status based on votes
    let status = 'unknown';
    if (fakeVotes + realVotes >= 5) {
      status = fakeVotes > realVotes ? 'fake' : 'real';
    }
    
    const daysAgo = Math.floor(Math.random() * 30);
    const publishDate = new Date();
    publishDate.setDate(publishDate.getDate() - daysAgo);
    const publishTime = publishDate.toLocaleString('en-US');
    
    news.push({
      id: 11 + i,
      title,
      content: `${content} This development has significant implications for the community and requires careful consideration. Further updates will be provided as more information becomes available.`,
      image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=500`,
      publisher,
      publishTime,
      votes: { fake: fakeVotes, real: realVotes },
      status
    });
  }

  // Generate comments
  const comments = [
    {
      id: 1,
      newsId: 1,
      author: "User A",
      vote: "fake",
      content: "This news is obviously fake. The company just released a profit report a few days ago. How could it suddenly go bankrupt?",
      image: "",
      commentTime: "2024-01-15 15:30:00"
    },
    {
      id: 2,
      newsId: 1,
      author: "User B",
      vote: "fake",
      content: "I work at this company and there's no bankruptcy at all. This is malicious rumor!",
      image: "",
      commentTime: "2024-01-15 16:45:00"
    },
    {
      id: 3,
      newsId: 2,
      author: "Medical Expert",
      vote: "real",
      content: "As a medical worker, I believe this news is true. The research was indeed published in an authoritative journal and the data is credible.",
      image: "",
      commentTime: "2024-01-14 10:20:00"
    },
    {
      id: 4,
      newsId: 2,
      author: "User C",
      vote: "real",
      content: "I also know about this research. It is indeed a major breakthrough that brings hope to cancer patients.",
      image: "",
      commentTime: "2024-01-14 11:15:00"
    },
    {
      id: 5,
      newsId: 3,
      author: "Astronomy Enthusiast",
      vote: "fake",
      content: "These videos are obviously post-produced. The lighting effects are unnatural and should be a prank.",
      image: "",
      commentTime: "2024-01-13 21:30:00"
    }
  ];

  // Generate additional comments for various news items
  const commentTemplates = {
    fake: [
      "This seems suspicious. I need more evidence.",
      "I've seen similar fake news before. This is likely fabricated.",
      "The source is not credible. I don't trust this.",
      "This contradicts what I know about the topic.",
      "Too many red flags. This is probably fake."
    ],
    real: [
      "I can confirm this from my own experience.",
      "This aligns with other verified sources.",
      "The evidence is compelling and well-documented.",
      "I trust the source and the information provided.",
      "This makes sense given the context."
    ]
  };

  const userNames = [
    "John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams",
    "David Brown", "Emily Davis", "Chris Wilson", "Lisa Martinez",
    "Tom Anderson", "Amy Taylor", "Mark Thomas", "Jessica Jackson"
  ];

  // Generate comments for news items
  for (let newsId = 1; newsId <= 50; newsId++) {
    const numComments = Math.floor(Math.random() * 8) + 1; // 1-8 comments per news
    
    for (let j = 0; j < numComments; j++) {
      const isFakeVote = Math.random() > 0.5;
      const vote = isFakeVote ? 'fake' : 'real';
      const templates = commentTemplates[vote];
      const content = templates[Math.floor(Math.random() * templates.length)];
      const author = userNames[Math.floor(Math.random() * userNames.length)];
      
      const daysAgo = Math.floor(Math.random() * 30);
      const commentDate = new Date();
      commentDate.setDate(commentDate.getDate() - daysAgo);
      const commentTime = commentDate.toLocaleString('en-US');
      
      comments.push({
        id: comments.length + 1,
        newsId,
        author,
        vote,
        content,
        image: "",
        commentTime
      });
    }
  }

  return { news, comments };
}

module.exports = { generateMockData };
