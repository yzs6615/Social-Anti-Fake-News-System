// Social Anti-Fake News System - Main JavaScript File

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
        try {
            this.loadMockData();
            this.bindEvents();
            this.renderHomePage();
            console.log('Application initialized successfully');
            console.log('News count:', this.news.length);
            console.log('Comments count:', this.comments.length);
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }

    // Load mock data
    loadMockData() {
        try {
            console.log('Loading mock data...');
        const mockNews = [
            {
                id: 1,
                title: "Major Company Announces Bankruptcy, Thousands of Employees Face Unemployment",
                content: "According to internal sources, the company has officially filed for bankruptcy protection due to poor management and broken capital chain. Company executives stated they will do their best to protect employee rights, but thousands of employees are expected to face unemployment risks. This bankruptcy event will have a significant impact on the local economy.",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
                publisher: "Reporter Zhang",
                publishTime: "2024-01-15 14:30:00",
                votes: { fake: 15, real: 8 },
                status: "fake"
            },
            {
                id: 2,
                title: "Scientists Discover New Anti-Cancer Drug with 90% Cure Rate",
                content: "A leading international medical journal published the latest research. After ten years of effort, a team of scientists successfully developed a new type of anti-cancer drug. The drug showed remarkable results in clinical trials, achieving a cure rate of over 90% for multiple types of cancer. This breakthrough discovery will bring revolutionary changes to cancer treatment.",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
                publisher: "Dr. Li",
                publishTime: "2024-01-14 09:15:00",
                votes: { fake: 3, real: 22 },
                status: "real"
            },
            {
                id: 3,
                title: "UFO Appears in City, Multiple Witnesses Confirm",
                content: "Around 8 PM last night, an unidentified flying object appeared in the sky above the city, emitting intense light. Multiple citizens captured videos and photos. Experts are analyzing the materials. There is no official explanation yet, but witnesses described the object as oval-shaped and moving at extremely high speed.",
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500",
                publisher: "Citizen Wang",
                publishTime: "2024-01-13 20:45:00",
                votes: { fake: 12, real: 5 },
                status: "fake"
            },
            {
                id: 4,
                title: "New Policy: Personal Income Tax Threshold Raised to 8000 Yuan",
                content: "The Ministry of Finance released a new policy. To reduce the burden on middle and low-income groups, the personal income tax threshold will be raised from the current 5000 yuan to 8000 yuan. The policy will officially take effect next month and is expected to benefit tens of millions of taxpayers nationwide.",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500",
                publisher: "Reporter Chen",
                publishTime: "2024-01-12 16:20:00",
                votes: { fake: 2, real: 18 },
                status: "real"
            },
            {
                id: 5,
                title: "Celebrity Exposed for Drug Use, Police Investigating",
                content: "According to informed sources, a well-known celebrity was taken away by police for investigation on suspicion of drug use. The celebrity's recent abnormal behavior has attracted fan attention. The case is under further investigation, and relevant evidence is being collected.",
                image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=500",
                publisher: "Entertainment Reporter",
                publishTime: "2024-01-11 11:30:00",
                votes: { fake: 8, real: 3 },
                status: "fake"
            },
            {
                id: 6,
                title: "New Energy Vehicle Sales Hit Record High, Market Prospects Bright",
                content: "According to the latest statistics, new energy vehicle sales increased by 150% year-on-year this year, hitting a record high. Experts believe that with continuous technological progress and policy support, the new energy vehicle market has very bright prospects and is expected to maintain rapid growth in the coming years.",
                image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=500",
                publisher: "Automotive Industry Analyst",
                publishTime: "2024-01-10 15:45:00",
                votes: { fake: 1, real: 25 },
                status: "real"
            },
            {
                id: 7,
                title: "6.5 Magnitude Earthquake Occurs, Causing Significant Damage",
                content: "According to the Seismological Bureau, a 6.5 magnitude earthquake occurred in a certain area with a focal depth of 10 kilometers. There are already reports of casualties, and rescue work is in progress. Local government has activated emergency plans to fully protect people's lives and property safety.",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                publisher: "Seismological Bureau",
                publishTime: "2024-01-09 08:30:00",
                votes: { fake: 4, real: 16 },
                status: "real"
            },
            {
                id: 8,
                title: "Influencer Fined 1 Million for False Advertising in Live Streaming",
                content: "Market supervision department investigated a well-known influencer's live streaming sales and found false advertising behavior. The influencer exaggerated product efficacy, misled consumers, and was fined 1 million yuan. Relevant departments remind consumers to shop rationally.",
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
                publisher: "Market Supervision Department",
                publishTime: "2024-01-08 13:20:00",
                votes: { fake: 1, real: 19 },
                status: "real"
            },
            {
                id: 9,
                title: "President Announces Resignation, Political Situation Turbulent",
                content: "A country's president announced his resignation in a televised speech, citing health reasons for being unable to continue performing his duties. The vice president will temporarily assume the presidency until a new president is elected. This news has attracted international attention, and the country's political situation has become turbulent.",
                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500",
                publisher: "International News Reporter",
                publishTime: "2024-01-07 19:15:00",
                votes: { fake: 6, real: 2 },
                status: "fake"
            },
            {
                id: 10,
                title: "New Study Finds: Drinking Coffee Daily Can Extend Lifespan",
                content: "The latest medical research found that drinking coffee in moderation daily can significantly extend lifespan. The study tracked tens of thousands of participants and found that antioxidants in coffee are beneficial to health. Experts recommend drinking 2-3 cups of coffee daily, but not in excess.",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
                publisher: "Health Expert",
                publishTime: "2024-01-06 10:00:00",
                votes: { fake: 7, real: 4 },
                status: "fake"
            },
            {
                id: 11,
                title: "Tech Giant Launches Revolutionary AI Assistant",
                content: "A major technology company announced the launch of its latest AI assistant that can understand and respond to complex queries in multiple languages. The AI system uses advanced machine learning algorithms and has been trained on billions of data points. Early testers report impressive accuracy and natural conversation flow.",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500",
                publisher: "Tech Reporter",
                publishTime: "2024-01-05 12:00:00",
                votes: { fake: 2, real: 20 },
                status: "real"
            },
            {
                id: 12,
                title: "Meteor Shower Visible Tonight Across Northern Hemisphere",
                content: "Astronomers predict a spectacular meteor shower will be visible tonight across the Northern Hemisphere. The event is expected to peak around midnight, with up to 100 meteors per hour. Weather conditions are favorable for viewing in most regions. This is a rare astronomical event that occurs only once every few years.",
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500",
                publisher: "Astronomy News",
                publishTime: "2024-01-04 18:30:00",
                votes: { fake: 1, real: 18 },
                status: "real"
            },
            {
                id: 13,
                title: "Local Restaurant Chain Closes All Locations Overnight",
                content: "A popular restaurant chain with over 50 locations nationwide suddenly closed all its branches without prior notice. Employees arrived at work to find locked doors and posted closure notices. Customers who had purchased gift cards are left wondering about refunds. The company has not issued any official statement.",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
                publisher: "Business News",
                publishTime: "2024-01-03 09:00:00",
                votes: { fake: 5, real: 12 },
                status: "real"
            },
            {
                id: 14,
                title: "Vaccine Breakthrough: Single Shot Prevents Multiple Diseases",
                content: "Scientists have developed a revolutionary vaccine that provides protection against five different diseases with a single injection. The vaccine has completed Phase III clinical trials with 95% effectiveness. Health authorities are preparing for mass production and distribution. This could significantly reduce healthcare costs and improve global health outcomes.",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
                publisher: "Medical Journal",
                publishTime: "2024-01-02 14:20:00",
                votes: { fake: 3, real: 21 },
                status: "real"
            },
            {
                id: 15,
                title: "Cryptocurrency Exchange Hacked, Millions Stolen",
                content: "A major cryptocurrency exchange announced it was hacked, with millions of dollars worth of digital assets stolen. The exchange has suspended all trading and withdrawals. Security experts are investigating the breach. Users are advised to change their passwords and enable two-factor authentication immediately.",
                image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500",
                publisher: "Finance News",
                publishTime: "2024-01-01 16:45:00",
                votes: { fake: 2, real: 17 },
                status: "real"
            },
            {
                id: 16,
                title: "Famous Actor Announces Retirement from Acting",
                content: "A beloved actor with a career spanning four decades announced their retirement from acting. The actor cited a desire to spend more time with family and pursue other interests. Fans worldwide have expressed sadness and gratitude for the actor's contributions to cinema. The actor's final film will be released next month.",
                image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500",
                publisher: "Entertainment Weekly",
                publishTime: "2023-12-31 11:00:00",
                votes: { fake: 1, real: 19 },
                status: "real"
            },
            {
                id: 17,
                title: "New Planet Discovered in Habitable Zone",
                content: "Astronomers using the latest space telescope have discovered a new exoplanet located in the habitable zone of its star system. The planet is approximately 1.5 times the size of Earth and may have conditions suitable for liquid water. Further observations are planned to analyze its atmosphere and potential for supporting life.",
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500",
                publisher: "Space News",
                publishTime: "2023-12-30 10:15:00",
                votes: { fake: 1, real: 22 },
                status: "real"
            },
            {
                id: 18,
                title: "Social Media Platform Bans Political Ads",
                content: "A major social media platform announced it will ban all political advertising starting next month. The decision comes after months of controversy over misinformation in political ads. The platform stated it wants to focus on connecting people rather than being a political battleground. Critics argue this limits free speech.",
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500",
                publisher: "Tech News",
                publishTime: "2023-12-29 13:30:00",
                votes: { fake: 4, real: 15 },
                status: "real"
            },
            {
                id: 19,
                title: "Breakthrough in Quantum Computing Achieves New Milestone",
                content: "Researchers have achieved a major breakthrough in quantum computing, successfully performing calculations that would take classical computers thousands of years. The quantum computer solved a complex optimization problem in just minutes. This advancement brings us closer to practical applications in cryptography, drug discovery, and financial modeling.",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
                publisher: "Science Daily",
                publishTime: "2023-12-28 15:00:00",
                votes: { fake: 2, real: 20 },
                status: "real"
            },
            {
                id: 20,
                title: "Wildlife Conservation Success: Endangered Species Population Doubles",
                content: "Conservation efforts have led to a remarkable success story as the population of an endangered species has doubled in the past five years. Strict protection measures, habitat restoration, and anti-poaching initiatives have contributed to this achievement. Conservationists are optimistic about the species' long-term survival prospects.",
                image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
                publisher: "Nature News",
                publishTime: "2023-12-27 09:45:00",
                votes: { fake: 1, real: 18 },
                status: "real"
            },
            {
                id: 21,
                title: "Ancient City Discovered Underwater After 2000 Years",
                content: "Marine archaeologists have discovered the remains of an ancient city submerged underwater for over 2000 years. The discovery was made using advanced sonar technology. The city appears to be remarkably well-preserved, with structures, artifacts, and even streets still visible. This could provide valuable insights into ancient civilizations.",
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500",
                publisher: "Archaeology Today",
                publishTime: "2023-12-26 14:20:00",
                votes: { fake: 3, real: 16 },
                status: "real"
            },
            {
                id: 22,
                title: "Global Internet Outage Affects Millions",
                content: "A massive internet outage affected millions of users worldwide for several hours. The outage was caused by a technical failure at a major internet infrastructure provider. Services gradually restored as engineers worked to fix the issue. This incident highlights the vulnerability of our interconnected digital world.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500",
                publisher: "Tech Reporter",
                publishTime: "2023-12-25 08:00:00",
                votes: { fake: 2, real: 19 },
                status: "real"
            },
            {
                id: 23,
                title: "Revolutionary Battery Technology Extends Electric Vehicle Range",
                content: "A breakthrough in battery technology promises to extend electric vehicle range by 300%. The new solid-state battery technology charges faster, lasts longer, and is more environmentally friendly. Major automakers are already investing in this technology. Mass production is expected to begin within two years.",
                image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=500",
                publisher: "Auto News",
                publishTime: "2023-12-24 11:30:00",
                votes: { fake: 1, real: 21 },
                status: "real"
            },
            {
                id: 24,
                title: "Mysterious Signal Detected from Deep Space",
                content: "Astronomers have detected a mysterious repeating signal from deep space that cannot be explained by known natural phenomena. The signal appears to follow a pattern that some scientists find intriguing. While most experts believe it's likely a natural source, the possibility of an artificial origin cannot be completely ruled out. Further analysis is ongoing.",
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500",
                publisher: "Space Research",
                publishTime: "2023-12-23 20:15:00",
                votes: { fake: 8, real: 6 },
                status: "fake"
            },
            {
                id: 25,
                title: "Time Travel Machine Invented by Secret Lab",
                content: "A secret government laboratory claims to have successfully invented a time travel machine. According to leaked documents, the machine can transport objects back in time by up to 24 hours. However, no evidence or demonstrations have been provided. The scientific community remains highly skeptical of these claims.",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
                publisher: "Conspiracy News",
                publishTime: "2023-12-22 17:00:00",
                votes: { fake: 19, real: 1 },
                status: "fake"
            },
            {
                id: 26,
                title: "Alien Artifacts Found on Mars, NASA Confirms",
                content: "NASA has reportedly discovered alien artifacts on Mars during a recent rover mission. The artifacts appear to be of intelligent design and cannot be explained by natural geological processes. However, NASA has not released any official statement, and the images circulating online appear to be digitally altered.",
                image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500",
                publisher: "UFO Enthusiast",
                publishTime: "2023-12-21 12:45:00",
                votes: { fake: 14, real: 3 },
                status: "fake"
            },
            {
                id: 27,
                title: "Miracle Cure: Man Claims to Have Found Fountain of Youth",
                content: "A man claims to have discovered a natural spring that reverses aging. He says drinking the water has made him look 20 years younger. Scientists have tested the water and found it to be ordinary spring water with no special properties. Medical experts warn against believing such unsubstantiated claims.",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500",
                publisher: "Alternative Health",
                publishTime: "2023-12-20 10:00:00",
                votes: { fake: 16, real: 2 },
                status: "fake"
            },
            {
                id: 28,
                title: "Bigfoot Sightings Increase in National Park",
                content: "Multiple visitors to a national park have reported sightings of a large, ape-like creature matching descriptions of Bigfoot. Park rangers have found large footprints and heard unusual sounds. However, no photographic evidence has been captured, and wildlife experts believe the sightings are likely misidentifications of bears or other known animals.",
                image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
                publisher: "Cryptozoology News",
                publishTime: "2023-12-19 15:30:00",
                votes: { fake: 11, real: 4 },
                status: "fake"
            },
            {
                id: 29,
                title: "Government Secretly Testing Mind Control Technology",
                content: "Whistleblowers claim the government is secretly testing mind control technology on unsuspecting citizens. They allege that certain radio frequencies can influence human behavior and thoughts. However, no credible evidence has been presented, and experts in neuroscience dismiss these claims as baseless conspiracy theories.",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
                publisher: "Conspiracy Theorist",
                publishTime: "2023-12-18 19:20:00",
                votes: { fake: 17, real: 1 },
                status: "fake"
            },
            {
                id: 30,
                title: "Reality TV Star Wins Nobel Prize in Physics",
                content: "A reality TV star with no scientific background has been awarded the Nobel Prize in Physics for groundbreaking research. The announcement has shocked the scientific community. However, the Nobel Prize committee has not released any official statement, and this appears to be a hoax spread through social media.",
                image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500",
                publisher: "Entertainment Gossip",
                publishTime: "2023-12-17 13:10:00",
                votes: { fake: 20, real: 0 },
                status: "fake"
            }
        ];

        const mockComments = [
            // News 1 comments (5 comments)
            { id: 1, newsId: 1, author: "User A", vote: "fake", content: "This news is clearly fake. The company just released a profit report a few days ago. How could it suddenly go bankrupt?", image: "", commentTime: "2024-01-15 15:30:00" },
            { id: 2, newsId: 1, author: "User B", vote: "fake", content: "I work at this company, and there's no bankruptcy at all. This is malicious rumor!", image: "", commentTime: "2024-01-15 16:45:00" },
            { id: 3, newsId: 1, author: "Financial Analyst", vote: "fake", content: "The company's stock price has been stable, and their quarterly reports show healthy finances. This is definitely false information.", image: "", commentTime: "2024-01-15 17:20:00" },
            { id: 4, newsId: 1, author: "User C", vote: "real", content: "I heard similar rumors from industry insiders. There might be some truth to this.", image: "", commentTime: "2024-01-15 18:00:00" },
            { id: 5, newsId: 1, author: "Business Reporter", vote: "fake", content: "I've verified with multiple sources - this is completely false. The company is operating normally.", image: "", commentTime: "2024-01-15 19:15:00" },
            
            // News 2 comments (4 comments)
            { id: 6, newsId: 2, author: "Medical Expert", vote: "real", content: "As a medical professional, I believe this news is true. The research was indeed published in an authoritative journal, and the data is credible.", image: "", commentTime: "2024-01-14 10:20:00" },
            { id: 7, newsId: 2, author: "User C", vote: "real", content: "I'm also aware of this research. It's indeed a major breakthrough that brings hope to cancer patients.", image: "", commentTime: "2024-01-14 11:15:00" },
            { id: 8, newsId: 2, author: "Oncologist", vote: "real", content: "I've read the published paper. The clinical trial results are impressive and peer-reviewed. This is legitimate medical progress.", image: "", commentTime: "2024-01-14 12:30:00" },
            { id: 9, newsId: 2, author: "Patient Advocate", vote: "real", content: "This gives hope to so many families. The research methodology looks sound and the results are promising.", image: "", commentTime: "2024-01-14 14:00:00" },
            
            // News 3 comments (5 comments)
            { id: 10, newsId: 3, author: "Astronomy Enthusiast", vote: "fake", content: "These videos are clearly post-produced. The lighting effects are unnatural. It should be a hoax.", image: "", commentTime: "2024-01-13 21:30:00" },
            { id: 11, newsId: 3, author: "Skeptic", vote: "fake", content: "No credible evidence has been provided. All the videos look like CGI or drones. This is fake news.", image: "", commentTime: "2024-01-13 22:15:00" },
            { id: 12, newsId: 3, author: "Witness", vote: "real", content: "I was there and saw it too! It was definitely something unusual in the sky. Not a plane or drone.", image: "", commentTime: "2024-01-13 23:00:00" },
            { id: 13, newsId: 3, author: "UFO Researcher", vote: "fake", content: "While I'm interested in UFOs, this particular case lacks proper documentation and verification. Too many red flags.", image: "", commentTime: "2024-01-14 00:30:00" },
            { id: 14, newsId: 3, author: "Aviation Expert", vote: "fake", content: "This is likely a weather balloon or military aircraft. The description matches known aircraft characteristics.", image: "", commentTime: "2024-01-14 08:00:00" },
            
            // News 4 comments (4 comments)
            { id: 15, newsId: 4, author: "Tax Advisor", vote: "real", content: "This policy change has been discussed in government circles. The announcement appears legitimate and well-sourced.", image: "", commentTime: "2024-01-12 17:00:00" },
            { id: 16, newsId: 4, author: "Economist", vote: "real", content: "This makes economic sense and aligns with current fiscal policy trends. The implementation timeline seems realistic.", image: "", commentTime: "2024-01-12 18:30:00" },
            { id: 17, newsId: 4, author: "User D", vote: "real", content: "I checked the official government website and this policy is indeed listed. This is real news.", image: "", commentTime: "2024-01-12 19:45:00" },
            { id: 18, newsId: 4, author: "Policy Analyst", vote: "real", content: "The policy details match what I've heard from reliable sources. This is accurate reporting.", image: "", commentTime: "2024-01-12 20:15:00" },
            
            // News 5 comments (5 comments)
            { id: 19, newsId: 5, author: "Entertainment Insider", vote: "fake", content: "I know this celebrity personally. They're clean and this is completely false. Someone is spreading malicious rumors.", image: "", commentTime: "2024-01-11 12:00:00" },
            { id: 20, newsId: 5, author: "Fan", vote: "fake", content: "This is clearly fake news trying to damage their reputation. No official sources have confirmed this.", image: "", commentTime: "2024-01-11 13:20:00" },
            { id: 21, newsId: 5, author: "User E", vote: "real", content: "I saw the police cars at their residence. There might be something to this story.", image: "", commentTime: "2024-01-11 14:30:00" },
            { id: 22, newsId: 5, author: "Legal Expert", vote: "fake", content: "If this were true, there would be official police statements. The lack of official confirmation suggests this is false.", image: "", commentTime: "2024-01-11 15:45:00" },
            { id: 23, newsId: 5, author: "Entertainment Reporter", vote: "fake", content: "I've checked with multiple sources in law enforcement. This story is completely fabricated.", image: "", commentTime: "2024-01-11 16:30:00" },
            
            // News 6 comments (4 comments)
            { id: 24, newsId: 6, author: "Auto Industry Expert", vote: "real", content: "The sales data matches official industry reports. This is accurate and well-researched.", image: "", commentTime: "2024-01-10 16:30:00" },
            { id: 25, newsId: 6, author: "Market Analyst", vote: "real", content: "I've seen the same statistics from multiple reliable sources. The growth numbers are legitimate.", image: "", commentTime: "2024-01-10 17:15:00" },
            { id: 26, newsId: 6, author: "EV Owner", vote: "real", content: "As someone who recently bought an EV, I can confirm the market is booming. This news is spot on.", image: "", commentTime: "2024-01-10 18:00:00" },
            { id: 27, newsId: 6, author: "Industry Insider", vote: "real", content: "The statistics align with what I know from industry contacts. This is reliable reporting.", image: "", commentTime: "2024-01-10 19:20:00" },
            
            // News 7 comments (5 comments)
            { id: 28, newsId: 7, author: "Seismologist", vote: "real", content: "I've verified this with the Seismological Bureau's official records. The earthquake did occur as reported.", image: "", commentTime: "2024-01-09 09:15:00" },
            { id: 29, newsId: 7, author: "Local Resident", vote: "real", content: "I felt the earthquake myself. The magnitude and timing match what's reported here. This is accurate.", image: "", commentTime: "2024-01-09 10:00:00" },
            { id: 30, newsId: 7, author: "Emergency Responder", vote: "real", content: "I was part of the rescue team. The damage reports and casualty numbers are consistent with what we observed.", image: "", commentTime: "2024-01-09 11:30:00" },
            { id: 31, newsId: 7, author: "News Verifier", vote: "real", content: "Cross-checked with multiple news sources and official channels. This is confirmed real news.", image: "", commentTime: "2024-01-09 12:45:00" },
            { id: 32, newsId: 7, author: "Geologist", vote: "real", content: "The seismic data matches official records. The magnitude, location, and depth are all accurate.", image: "", commentTime: "2024-01-09 14:00:00" },
            
            // News 8 comments (4 comments)
            { id: 33, newsId: 8, author: "Consumer Advocate", vote: "real", content: "I've seen the official announcement from the market supervision department. This is legitimate news.", image: "", commentTime: "2024-01-08 14:00:00" },
            { id: 34, newsId: 8, author: "Legal Expert", vote: "real", content: "The fine amount and details match what I've heard from legal sources. This appears to be accurate.", image: "", commentTime: "2024-01-08 15:20:00" },
            { id: 35, newsId: 8, author: "User F", vote: "real", content: "Good! False advertising should be punished. This is real and I'm glad they're being held accountable.", image: "", commentTime: "2024-01-08 16:00:00" },
            { id: 36, newsId: 8, author: "Industry Watcher", vote: "real", content: "This case has been widely reported in business news. The information is accurate and verified.", image: "", commentTime: "2024-01-08 17:30:00" },
            
            // News 9 comments (3 comments)
            { id: 37, newsId: 9, author: "Political Analyst", vote: "fake", content: "I've checked multiple international news sources. No country's president has announced resignation recently. This is false.", image: "", commentTime: "2024-01-07 20:00:00" },
            { id: 38, newsId: 9, author: "International News", vote: "fake", content: "No major news outlets have reported this. This appears to be completely fabricated.", image: "", commentTime: "2024-01-07 21:15:00" },
            { id: 39, newsId: 9, author: "User G", vote: "fake", content: "This is clearly fake. If a president resigned, it would be headline news everywhere. Not seeing it anywhere else.", image: "", commentTime: "2024-01-07 22:30:00" },
            
            // News 10 comments (5 comments)
            { id: 40, newsId: 10, author: "Nutritionist", vote: "fake", content: "While coffee has some health benefits, claiming it extends lifespan significantly is an exaggeration. The study likely has limitations.", image: "", commentTime: "2024-01-06 11:00:00" },
            { id: 41, newsId: 10, author: "Health Researcher", vote: "fake", content: "I've reviewed similar studies. The correlation doesn't necessarily mean causation. This is misleading.", image: "", commentTime: "2024-01-06 12:30:00" },
            { id: 42, newsId: 10, author: "Coffee Lover", vote: "fake", content: "I wish this were true, but I'm skeptical. Most health claims about single foods are overstated.", image: "", commentTime: "2024-01-06 13:45:00" },
            { id: 43, newsId: 10, author: "Medical Doctor", vote: "fake", content: "The study methodology seems flawed. Moderation is key, but coffee alone won't extend your life significantly.", image: "", commentTime: "2024-01-06 14:20:00" },
            { id: 44, newsId: 10, author: "Skeptic", vote: "fake", content: "These kinds of health claims pop up regularly and are usually debunked. I don't trust this one either.", image: "", commentTime: "2024-01-06 15:00:00" },
            
            // News 11 comments (4 comments)
            { id: 45, newsId: 11, author: "AI Researcher", vote: "real", content: "I've tested this AI assistant. The capabilities described are accurate and impressive. This is legitimate tech news.", image: "", commentTime: "2024-01-05 13:00:00" },
            { id: 46, newsId: 11, author: "Tech Enthusiast", vote: "real", content: "The company did announce this. I've seen the official press release and demo videos. This is real.", image: "", commentTime: "2024-01-05 14:15:00" },
            { id: 47, newsId: 11, author: "Software Engineer", vote: "real", content: "The technical details match what I know about their AI development. This is accurate reporting.", image: "", commentTime: "2024-01-05 15:30:00" },
            { id: 48, newsId: 11, author: "Tech Journalist", vote: "real", content: "I attended the launch event. The AI assistant works as described. This is confirmed real news.", image: "", commentTime: "2024-01-05 16:45:00" },
            
            // News 12 comments (4 comments)
            { id: 49, newsId: 12, author: "Astronomer", vote: "real", content: "I've checked the astronomical calendar. This meteor shower event is indeed scheduled and the predictions are accurate.", image: "", commentTime: "2024-01-04 19:00:00" },
            { id: 50, newsId: 12, author: "Sky Watcher", vote: "real", content: "I've been following this meteor shower forecast. The timing and peak predictions match what I've seen from other sources.", image: "", commentTime: "2024-01-04 20:30:00" },
            { id: 51, newsId: 12, author: "Amateur Astronomer", vote: "real", content: "The meteor shower details are correct. I've confirmed with multiple astronomy websites. This is real.", image: "", commentTime: "2024-01-04 21:15:00" },
            { id: 52, newsId: 12, author: "Nature Lover", vote: "real", content: "Looking forward to watching it! The information matches what I've seen from NASA and other space agencies.", image: "", commentTime: "2024-01-04 22:00:00" },
            
            // News 13 comments (5 comments)
            { id: 53, newsId: 13, author: "Former Employee", vote: "real", content: "I worked there until last week. The closure was sudden and unexpected. This news is accurate.", image: "", commentTime: "2024-01-03 10:00:00" },
            { id: 54, newsId: 13, author: "Customer", vote: "real", content: "I tried to go there today and found it closed. I have gift cards too. This is unfortunately true.", image: "", commentTime: "2024-01-03 11:30:00" },
            { id: 55, newsId: 13, author: "Business Reporter", vote: "real", content: "I've confirmed this with multiple sources. The closure is real and happened overnight as reported.", image: "", commentTime: "2024-01-03 12:45:00" },
            { id: 56, newsId: 13, author: "Local News", vote: "real", content: "Our news team verified this. All locations are indeed closed. Employees were not given advance notice.", image: "", commentTime: "2024-01-03 14:00:00" },
            { id: 57, newsId: 13, author: "User H", vote: "real", content: "I drove by three locations today - all closed with notices on the doors. This is definitely real news.", image: "", commentTime: "2024-01-03 15:20:00" },
            
            // News 14 comments (4 comments)
            { id: 58, newsId: 14, author: "Medical Researcher", vote: "real", content: "I've read the published research. The Phase III trial results are impressive and peer-reviewed. This is legitimate.", image: "", commentTime: "2024-01-02 15:00:00" },
            { id: 59, newsId: 14, author: "Public Health", vote: "real", content: "This vaccine development has been tracked by health authorities. The effectiveness data matches official reports.", image: "", commentTime: "2024-01-02 16:30:00" },
            { id: 60, newsId: 14, author: "Pharmaceutical Expert", vote: "real", content: "The clinical trial data is available in medical journals. This is a real breakthrough in vaccine technology.", image: "", commentTime: "2024-01-02 17:45:00" },
            { id: 61, newsId: 14, author: "Health Official", vote: "real", content: "I'm aware of this vaccine development. The information reported is accurate and well-sourced.", image: "", commentTime: "2024-01-02 18:20:00" },
            
            // News 15 comments (5 comments)
            { id: 62, newsId: 15, author: "Crypto Trader", vote: "real", content: "I use this exchange and can confirm trading is suspended. This hack is unfortunately real.", image: "", commentTime: "2024-01-01 17:30:00" },
            { id: 63, newsId: 15, author: "Security Expert", vote: "real", content: "The exchange has confirmed the breach. This is a serious security incident and the reporting is accurate.", image: "", commentTime: "2024-01-01 18:15:00" },
            { id: 64, newsId: 15, author: "Blockchain Analyst", vote: "real", content: "I've verified the blockchain transactions. Large amounts were indeed moved from the exchange's wallets. This is real.", image: "", commentTime: "2024-01-01 19:00:00" },
            { id: 65, newsId: 15, author: "User I", vote: "real", content: "I can't access my account. The exchange website confirms the hack. This is unfortunately true.", image: "", commentTime: "2024-01-01 20:30:00" },
            { id: 66, newsId: 15, author: "Finance Reporter", vote: "real", content: "Multiple news outlets have confirmed this. The exchange has issued official statements. This is verified real news.", image: "", commentTime: "2024-01-01 21:45:00" },
            
            // News 16 comments (4 comments)
            { id: 67, newsId: 16, author: "Film Critic", vote: "real", content: "The actor's retirement announcement was made through their official channels. This is confirmed real news.", image: "", commentTime: "2023-12-31 12:00:00" },
            { id: 68, newsId: 16, author: "Entertainment Insider", vote: "real", content: "I've confirmed this with the actor's representatives. The retirement is real and the final film details are accurate.", image: "", commentTime: "2023-12-31 13:30:00" },
            { id: 69, newsId: 16, author: "Fan", vote: "real", content: "The actor posted about this on social media. It's sad but true. This is legitimate news.", image: "", commentTime: "2023-12-31 14:45:00" },
            { id: 70, newsId: 16, author: "Movie Buff", vote: "real", content: "Multiple entertainment news sources have confirmed this. The retirement announcement is real.", image: "", commentTime: "2023-12-31 15:20:00" },
            
            // News 17 comments (4 comments)
            { id: 71, newsId: 17, author: "Astrophysicist", vote: "real", content: "I've seen the telescope data. The exoplanet discovery is legitimate and has been confirmed by multiple observatories.", image: "", commentTime: "2023-12-30 11:00:00" },
            { id: 72, newsId: 17, author: "Space Enthusiast", vote: "real", content: "NASA and ESA have both confirmed this discovery. The planet details match official announcements. This is real.", image: "", commentTime: "2023-12-30 12:30:00" },
            { id: 73, newsId: 17, author: "Astronomer", vote: "real", content: "The discovery has been published in peer-reviewed journals. The data is solid and the reporting is accurate.", image: "", commentTime: "2023-12-30 13:45:00" },
            { id: 74, newsId: 17, author: "Science Writer", vote: "real", content: "I've verified this with multiple space agencies. The exoplanet discovery is confirmed and legitimate.", image: "", commentTime: "2023-12-30 14:20:00" },
            
            // News 18 comments (5 comments)
            { id: 75, newsId: 18, author: "Tech Policy Expert", vote: "real", content: "The platform has officially announced this policy change. The details match their press release. This is real news.", image: "", commentTime: "2023-12-29 14:30:00" },
            { id: 76, newsId: 18, author: "Social Media Analyst", vote: "real", content: "I've seen the official announcement from the platform. The policy change is confirmed and will take effect as stated.", image: "", commentTime: "2023-12-29 15:15:00" },
            { id: 77, newsId: 18, author: "User J", vote: "real", content: "The platform sent out notifications about this. It's a real policy change, though controversial.", image: "", commentTime: "2023-12-29 16:00:00" },
            { id: 78, newsId: 18, author: "Digital Rights", vote: "real", content: "This has been widely reported across tech news. The platform's announcement is legitimate and verified.", image: "", commentTime: "2023-12-29 17:30:00" },
            { id: 79, newsId: 18, author: "Tech Reporter", vote: "real", content: "I've confirmed this with the platform's communications team. The policy change is real and will be implemented.", image: "", commentTime: "2023-12-29 18:45:00" },
            
            // News 19 comments (4 comments)
            { id: 80, newsId: 19, author: "Quantum Physicist", vote: "real", content: "I've reviewed the research paper. The quantum computing breakthrough is legitimate and peer-reviewed.", image: "", commentTime: "2023-12-28 16:00:00" },
            { id: 81, newsId: 19, author: "Computer Scientist", vote: "real", content: "The calculations described are consistent with quantum computing capabilities. This is a real scientific achievement.", image: "", commentTime: "2023-12-28 17:15:00" },
            { id: 82, newsId: 19, author: "Tech Researcher", vote: "real", content: "Multiple research institutions have confirmed this breakthrough. The quantum computing milestone is verified.", image: "", commentTime: "2023-12-28 18:30:00" },
            { id: 83, newsId: 19, author: "Science Journalist", vote: "real", content: "I've verified this with the research team. The quantum computing achievement is real and significant.", image: "", commentTime: "2023-12-28 19:45:00" },
            
            // News 20 comments (4 comments)
            { id: 84, newsId: 20, author: "Wildlife Biologist", vote: "real", content: "I've seen the population data. The conservation success story is real and well-documented by wildlife organizations.", image: "", commentTime: "2023-12-27 10:30:00" },
            { id: 85, newsId: 20, author: "Conservationist", vote: "real", content: "I work with the conservation program. The population increase is accurate and reflects years of dedicated effort.", image: "", commentTime: "2023-12-27 11:15:00" },
            { id: 86, newsId: 20, author: "Nature Lover", vote: "real", content: "This is wonderful news! I've seen reports from multiple conservation groups confirming this success.", image: "", commentTime: "2023-12-27 12:00:00" },
            { id: 87, newsId: 20, author: "Environmentalist", vote: "real", content: "The conservation data is publicly available and verified. This is a real success story worth celebrating.", image: "", commentTime: "2023-12-27 13:30:00" },
            
            // News 21 comments (5 comments)
            { id: 88, newsId: 21, author: "Marine Archaeologist", vote: "real", content: "I'm part of the research team. The underwater city discovery is real and has been documented with extensive evidence.", image: "", commentTime: "2023-12-26 15:00:00" },
            { id: 89, newsId: 21, author: "History Enthusiast", vote: "real", content: "This discovery has been reported in archaeological journals. The underwater city findings are legitimate.", image: "", commentTime: "2023-12-26 16:30:00" },
            { id: 90, newsId: 21, author: "Archaeology Student", vote: "real", content: "I've seen the research papers and sonar images. This is a real archaeological discovery with solid evidence.", image: "", commentTime: "2023-12-26 17:15:00" },
            { id: 91, newsId: 21, author: "Underwater Explorer", vote: "real", content: "The discovery has been verified by multiple archaeological institutions. This is confirmed real news.", image: "", commentTime: "2023-12-26 18:00:00" },
            { id: 92, newsId: 21, author: "Ancient History", vote: "real", content: "The preservation details match what I've learned about underwater archaeology. This is a legitimate find.", image: "", commentTime: "2023-12-26 19:30:00" },
            
            // News 22 comments (4 comments)
            { id: 93, newsId: 22, author: "Network Engineer", vote: "real", content: "I experienced the outage myself. Multiple ISPs were affected. This is unfortunately real and well-documented.", image: "", commentTime: "2023-12-25 09:00:00" },
            { id: 94, newsId: 22, author: "IT Professional", vote: "real", content: "The outage was confirmed by multiple internet infrastructure providers. This is verified real news.", image: "", commentTime: "2023-12-25 10:30:00" },
            { id: 95, newsId: 22, author: "User K", vote: "real", content: "I couldn't access the internet for hours. Many websites were down. This is definitely real.", image: "", commentTime: "2023-12-25 11:15:00" },
            { id: 96, newsId: 22, author: "Tech Analyst", vote: "real", content: "The outage has been widely reported and confirmed by service providers. The technical details are accurate.", image: "", commentTime: "2023-12-25 12:00:00" },
            
            // News 23 comments (4 comments)
            { id: 97, newsId: 23, author: "Battery Engineer", vote: "real", content: "I've seen the research on solid-state batteries. The technology described is real and being developed by major companies.", image: "", commentTime: "2023-12-24 12:30:00" },
            { id: 98, newsId: 23, author: "EV Manufacturer", vote: "real", content: "We're aware of this battery technology. The development timeline and capabilities match what we know.", image: "", commentTime: "2023-12-24 13:15:00" },
            { id: 99, newsId: 23, author: "Auto Industry", vote: "real", content: "Multiple automakers have confirmed investing in this technology. The battery breakthrough is legitimate.", image: "", commentTime: "2023-12-24 14:00:00" },
            { id: 100, newsId: 23, author: "Tech Investor", vote: "real", content: "I've reviewed the technical specifications. This battery technology is real and has significant potential.", image: "", commentTime: "2023-12-24 15:30:00" },
            
            // News 24 comments (5 comments)
            { id: 101, newsId: 24, author: "Astronomer", vote: "fake", content: "While interesting signals are detected, the claim of 'mysterious' pattern is exaggerated. Most are natural phenomena.", image: "", commentTime: "2023-12-23 21:00:00" },
            { id: 102, newsId: 24, author: "SETI Researcher", vote: "fake", content: "We detect many signals, but none have been confirmed as artificial. This is likely natural and being sensationalized.", image: "", commentTime: "2023-12-23 22:30:00" },
            { id: 103, newsId: 24, author: "Space Scientist", vote: "fake", content: "The signal description doesn't match any confirmed artificial transmissions. This is probably natural radio sources.", image: "", commentTime: "2023-12-23 23:15:00" },
            { id: 104, newsId: 24, author: "Skeptic", vote: "fake", content: "These 'mysterious signals' claims pop up regularly. They're always explained as natural phenomena. This is no different.", image: "", commentTime: "2023-12-24 00:30:00" },
            { id: 105, newsId: 24, author: "Astrophysicist", vote: "fake", content: "The signal characteristics match known pulsars or other natural sources. The 'mystery' is media hype.", image: "", commentTime: "2023-12-24 08:00:00" },
            
            // News 25 comments (4 comments)
            { id: 106, newsId: 25, author: "Physicist", vote: "fake", content: "Time travel violates known physics. No credible scientist would claim this. This is completely false.", image: "", commentTime: "2023-12-22 18:00:00" },
            { id: 107, newsId: 25, author: "Science Skeptic", vote: "fake", content: "If time travel existed, we'd have evidence. This is clearly a hoax with no scientific basis.", image: "", commentTime: "2023-12-22 19:30:00" },
            { id: 108, newsId: 25, author: "Conspiracy Debunker", vote: "fake", content: "No government lab would have this capability. This is pure science fiction presented as fact.", image: "", commentTime: "2023-12-22 20:15:00" },
            { id: 109, newsId: 25, author: "User L", vote: "fake", content: "This is obviously fake. Time travel machines don't exist. This is clickbait nonsense.", image: "", commentTime: "2023-12-22 21:00:00" },
            
            // News 26 comments (5 comments)
            { id: 110, newsId: 26, author: "NASA Employee", vote: "fake", content: "I work at NASA. We have not discovered alien artifacts. This is completely false and not from official sources.", image: "", commentTime: "2023-12-21 13:30:00" },
            { id: 111, newsId: 26, author: "Mars Mission", vote: "fake", content: "The rover images are publicly available. There are no alien artifacts. This is fabricated news.", image: "", commentTime: "2023-12-21 14:15:00" },
            { id: 112, newsId: 26, author: "Space Agency", vote: "fake", content: "NASA has not made any such announcement. All official rover findings are published and this isn't among them.", image: "", commentTime: "2023-12-21 15:00:00" },
            { id: 113, newsId: 26, author: "Planetary Scientist", vote: "fake", content: "I've analyzed all Mars rover data. There are no artifacts of intelligent design. This is false.", image: "", commentTime: "2023-12-21 16:30:00" },
            { id: 114, newsId: 26, author: "Skeptic", vote: "fake", content: "These 'alien artifact' claims appear regularly and are always debunked. This is no exception.", image: "", commentTime: "2023-12-21 17:15:00" },
            
            // News 27 comments (4 comments)
            { id: 115, newsId: 27, author: "Medical Doctor", vote: "fake", content: "There's no scientific basis for water reversing aging. This is a classic scam targeting vulnerable people.", image: "", commentTime: "2023-12-20 11:00:00" },
            { id: 116, newsId: 27, author: "Health Expert", vote: "fake", content: "No water can reverse aging. This is pseudoscience and potentially dangerous if people delay real medical treatment.", image: "", commentTime: "2023-12-20 12:30:00" },
            { id: 117, newsId: 27, author: "Skeptic", vote: "fake", content: "Fountain of youth claims are as old as time. They're always fake. This is no different.", image: "", commentTime: "2023-12-20 13:15:00" },
            { id: 118, newsId: 27, author: "Science Writer", vote: "fake", content: "If this were real, it would be the biggest medical discovery ever. The lack of evidence says it all.", image: "", commentTime: "2023-12-20 14:00:00" },
            
            // News 28 comments (5 comments)
            { id: 119, newsId: 28, author: "Wildlife Biologist", vote: "fake", content: "Bigfoot has never been proven to exist. All sightings are misidentifications of known animals.", image: "", commentTime: "2023-12-19 16:00:00" },
            { id: 120, newsId: 28, author: "Park Ranger", vote: "fake", content: "I work at that park. The footprints are likely from bears. There's no evidence of an unknown species.", image: "", commentTime: "2023-12-19 17:30:00" },
            { id: 121, newsId: 28, author: "Cryptozoology Skeptic", vote: "fake", content: "Bigfoot claims have been around for decades with zero credible evidence. This is no different.", image: "", commentTime: "2023-12-19 18:15:00" },
            { id: 122, newsId: 28, author: "Wildlife Expert", vote: "fake", content: "Large footprints in forests are almost always bears. There's no scientific evidence for Bigfoot.", image: "", commentTime: "2023-12-19 19:00:00" },
            { id: 123, newsId: 28, author: "Skeptic", vote: "fake", content: "No photos, no DNA, no body. Just stories. Bigfoot doesn't exist and these sightings are hoaxes or mistakes.", image: "", commentTime: "2023-12-19 20:30:00" },
            
            // News 29 comments (4 comments)
            { id: 124, newsId: 29, author: "Neuroscientist", vote: "fake", content: "Mind control via radio frequencies is science fiction. There's no scientific evidence supporting such claims.", image: "", commentTime: "2023-12-18 20:00:00" },
            { id: 125, newsId: 29, author: "Conspiracy Debunker", vote: "fake", content: "These mind control conspiracy theories have been debunked repeatedly. There's no credible evidence.", image: "", commentTime: "2023-12-18 21:30:00" },
            { id: 126, newsId: 29, author: "Science Educator", vote: "fake", content: "Radio frequencies cannot control human minds. This is a baseless conspiracy theory with no scientific basis.", image: "", commentTime: "2023-12-18 22:15:00" },
            { id: 127, newsId: 29, author: "Skeptic", vote: "fake", content: "If the government could control minds, we'd see evidence. This is pure conspiracy theory nonsense.", image: "", commentTime: "2023-12-18 23:00:00" },
            
            // News 30 comments (3 comments)
            { id: 128, newsId: 30, author: "Nobel Committee", vote: "fake", content: "The Nobel Prize committee has not awarded any prize to a reality TV star. This is completely false.", image: "", commentTime: "2023-12-17 14:00:00" },
            { id: 129, newsId: 30, author: "Science Community", vote: "fake", content: "Nobel Prizes require decades of research. A reality TV star winning one is impossible. This is a hoax.", image: "", commentTime: "2023-12-17 15:30:00" },
            { id: 130, newsId: 30, author: "Academic", vote: "fake", content: "The Nobel Prize process is rigorous and transparent. This claim is completely fabricated and false.", image: "", commentTime: "2023-12-17 16:15:00" }
        ];

        this.news = mockNews;
        this.comments = mockComments;
        
        console.log('Mock data loaded:', {
            newsCount: this.news.length,
            commentsCount: this.comments.length
        });
        } catch (error) {
            console.error('Error loading mock data:', error);
            throw error;
        }
    }

    // Bind events
    bindEvents() {
        // Navigation buttons
        document.getElementById('addNewsBtn').addEventListener('click', () => this.showAddNewsModal());
        document.getElementById('backToHome').addEventListener('click', () => this.showPage('homePage'));
        document.getElementById('backToDetail').addEventListener('click', () => this.showPage('newsDetailPage'));
        document.getElementById('backToDetailFromComments').addEventListener('click', () => this.showPage('newsDetailPage'));

        // Filters
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
            this.renderHomePage();
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
        try {
            const filteredNews = this.getFilteredNews();
            const paginatedNews = this.getPaginatedNews(filteredNews);
            
            console.log('Rendering home page:', {
                totalNews: this.news.length,
                filteredNews: filteredNews.length,
                paginatedNews: paginatedNews.length,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            });
            
            this.renderNewsList(paginatedNews);
            this.renderPagination(filteredNews.length);
        } catch (error) {
            console.error('Error rendering home page:', error);
        }
    }

    // Get filtered news
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

    // Get paginated news
    getPaginatedNews(news) {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return news.slice(start, end);
    }

    // Render news list
    renderNewsList(news) {
        const newsList = document.getElementById('newsList');
        
        if (!newsList) {
            console.error('newsList element not found');
            return;
        }
        
        if (news.length === 0) {
            newsList.innerHTML = `
                <div class="empty-state">
                    <h3>No News</h3>
                    <p>No relevant news found under current filter conditions</p>
                </div>
            `;
            return;
        }

        newsList.innerHTML = news.map(item => `
            <div class="news-item ${item.status}" data-news-id="${item.id}">
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
        
        // Add event listeners to news items
        newsList.querySelectorAll('.news-item').forEach(item => {
            item.addEventListener('click', () => {
                const newsId = parseInt(item.getAttribute('data-news-id'));
                this.showNewsDetail(newsId);
            });
        });
    }

    // Render pagination
    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.pageSize);
        const pagination = document.getElementById('pagination');
        
        if (!pagination) {
            console.error('pagination element not found');
            return;
        }
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous page button
        const prevDisabled = this.currentPage === 1 ? 'disabled' : '';
        paginationHTML += `
            <button ${prevDisabled} data-page="${this.currentPage - 1}" class="pagination-btn">
                Previous
            </button>
        `;

        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                const activeClass = i === this.currentPage ? 'active' : '';
                paginationHTML += `
                    <button class="pagination-btn ${activeClass}" data-page="${i}">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }

        // Next page button
        const nextDisabled = this.currentPage === totalPages ? 'disabled' : '';
        paginationHTML += `
            <button ${nextDisabled} data-page="${this.currentPage + 1}" class="pagination-btn">
                Next
            </button>
        `;

        pagination.innerHTML = paginationHTML;
        
        // Add event listeners to pagination buttons
        pagination.querySelectorAll('.pagination-btn').forEach(btn => {
            if (!btn.disabled) {
                btn.addEventListener('click', () => {
                    const page = parseInt(btn.getAttribute('data-page'));
                    this.goToPage(page);
                });
            }
        });
    }

    // Go to specified page
    goToPage(page) {
        this.currentPage = page;
        this.renderHomePage();
    }

    // Show news detail
    showNewsDetail(newsId) {
        this.currentNewsId = newsId;
        this.showPage('newsDetailPage');
    }

    // Render news detail
    renderNewsDetail() {
        const news = this.news.find(item => item.id === this.currentNewsId);
        if (!news) return;

        const newsDetail = document.getElementById('newsDetail');
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
    renderVotePage() {
        const news = this.news.find(item => item.id === this.currentNewsId);
        if (!news) return;

        const voteForm = document.getElementById('voteForm');
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
                    <input type="url" id="commentImage" placeholder="Enter image URL">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Submit Vote</button>
                    <button type="button" id="cancelVoteBtn" class="btn btn-secondary">Cancel</button>
                </div>
            </form>
        `;

        // Bind voting form events
        document.getElementById('voteFormElement').addEventListener('submit', (e) => this.handleVote(e));
        
        // Bind cancel button
        const cancelBtn = document.getElementById('cancelVoteBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.showPage('newsDetailPage'));
        }
        
        // Bind voting option click events
        document.querySelectorAll('.vote-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.vote-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                option.querySelector('input[type="radio"]').checked = true;
            });
        });
    }

    // Handle vote
    handleVote(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const vote = formData.get('vote');
        const comment = document.getElementById('commentText').value;
        const image = document.getElementById('commentImage').value;
        
        if (!vote) {
            alert('Please select your vote');
            return;
        }

        // Add comment
        const newComment = {
            id: this.comments.length + 1,
            newsId: this.currentNewsId,
            author: 'Anonymous User',
            vote: vote,
            content: comment || 'No comment',
            image: image,
            commentTime: new Date().toLocaleString('en-US')
        };
        
        this.comments.push(newComment);
        
        // Update news vote data
        const news = this.news.find(item => item.id === this.currentNewsId);
        if (news) {
            news.votes[vote]++;
            
            // Recalculate news status
            const totalVotes = news.votes.fake + news.votes.real;
            if (totalVotes >= 5) {
                news.status = news.votes.fake > news.votes.real ? 'fake' : 'real';
            }
        }
        
        alert('Vote submitted successfully! Thank you for your participation.');
        this.showPage('newsDetailPage');
    }

    // Show comments page
    showCommentsPage() {
        this.commentsPage = 1;
        this.showPage('commentsPage');
    }

    // Render comments page
    renderCommentsPage() {
        const newsComments = this.comments.filter(comment => comment.newsId === this.currentNewsId);
        const paginatedComments = this.getPaginatedComments(newsComments);
        
        this.renderCommentsList(paginatedComments);
        this.renderCommentsPagination(newsComments.length);
    }

    // Get paginated comments
    getPaginatedComments(comments) {
        const start = (this.commentsPage - 1) * this.commentsPageSize;
        const end = start + this.commentsPageSize;
        return comments.slice(start, end);
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
                    ${comment.vote === 'fake' ? 'Voted as Fake News' : 'Voted as Real News'}
                </div>
                <div class="comment-content">${comment.content}</div>
                ${comment.image ? `<img src="${comment.image}" alt="Supporting Image" class="comment-image">` : ''}
            </div>
        `).join('');
    }

    // Render comments pagination
    renderCommentsPagination(totalComments) {
        const totalPages = Math.ceil(totalComments / this.commentsPageSize);
        const pagination = document.getElementById('commentsPagination');
        
        if (!pagination) {
            console.error('commentsPagination element not found');
            return;
        }
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous page button
        const prevDisabled = this.commentsPage === 1 ? 'disabled' : '';
        paginationHTML += `
            <button ${prevDisabled} data-comment-page="${this.commentsPage - 1}" class="comment-pagination-btn">
                Previous
            </button>
        `;

        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === this.commentsPage ? 'active' : '';
            paginationHTML += `
                <button class="comment-pagination-btn ${activeClass}" data-comment-page="${i}">
                    ${i}
                </button>
            `;
        }

        // Next page button
        const nextDisabled = this.commentsPage === totalPages ? 'disabled' : '';
        paginationHTML += `
            <button ${nextDisabled} data-comment-page="${this.commentsPage + 1}" class="comment-pagination-btn">
                Next
            </button>
        `;

        pagination.innerHTML = paginationHTML;
        
        // Add event listeners to comment pagination buttons
        pagination.querySelectorAll('.comment-pagination-btn').forEach(btn => {
            if (!btn.disabled) {
                btn.addEventListener('click', () => {
                    const page = parseInt(btn.getAttribute('data-comment-page'));
                    this.goToCommentsPage(page);
                });
            }
        });
    }

    // Go to specified comments page
    goToCommentsPage(page) {
        this.commentsPage = page;
        this.renderCommentsPage();
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
    handleAddNews(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newNews = {
            id: this.news.length + 1,
            title: formData.get('newsTitle'),
            content: formData.get('newsContent'),
            image: formData.get('newsImage') || '',
            publisher: formData.get('publisherName'),
            publishTime: new Date().toLocaleString('en-US'),
            votes: { fake: 0, real: 0 },
            status: 'unknown'
        };
        
        this.news.unshift(newNews); // Add to beginning
        
        alert('News published successfully!');
        this.hideAddNewsModal();
        this.renderHomePage();
    }

    // Truncate text
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// Initialize application when DOM is ready
(function() {
    'use strict';
    
    console.log('Script.js loaded');
    console.log('Document ready state:', document.readyState);
    console.log('AntiFakeNewsSystem defined:', typeof AntiFakeNewsSystem !== 'undefined');
    
    function initializeApp() {
        try {
            console.log('Initializing application...');
            
            // Check if required elements exist
            const requiredElements = ['newsList', 'homePage', 'pagination'];
            const missingElements = requiredElements.filter(id => !document.getElementById(id));
            
            if (missingElements.length > 0) {
                console.error('Missing required elements:', missingElements);
                return;
            }
            
            if (typeof AntiFakeNewsSystem === 'undefined') {
                console.error('AntiFakeNewsSystem class is not defined!');
                return;
            }
            
            // Hide loading indicator
            const loadingIndicator = document.getElementById('loadingIndicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
            const app = new AntiFakeNewsSystem();
            window.app = app; // Make app globally accessible
            
            console.log('Application initialized successfully');
            console.log('App instance:', app);
            
            // Verify news data loaded
            setTimeout(() => {
                if (app && app.news && app.news.length > 0) {
                    console.log('News data loaded:', app.news.length, 'items');
                } else {
                    console.error('News data not loaded!');
                    const newsList = document.getElementById('newsList');
                    if (newsList) {
                        newsList.innerHTML = '<div class="empty-state"><h3>Data Loading Error</h3><p>News data failed to load. Please refresh the page.</p></div>';
                    }
                }
            }, 100);
            
        } catch (error) {
            console.error('Error initializing application:', error);
            console.error('Error stack:', error.stack);
            
            const newsList = document.getElementById('newsList');
            if (newsList) {
                newsList.innerHTML = '<div class="empty-state"><h3>Initialization Error</h3><p>' + error.message + '</p><p>Please check the browser console for details.</p></div>';
            }
        }
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        console.log('Waiting for DOMContentLoaded...');
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        console.log('DOM already ready, initializing immediately...');
        // Use setTimeout to ensure all scripts are loaded
        setTimeout(initializeApp, 0);
    }
})();
