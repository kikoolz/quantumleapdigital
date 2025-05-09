import { BarChart, Globe, ImageIcon, Megaphone, Search, Code } from "lucide-react"

export const services = [
  {
    title: "Digital Strategy",
    slug: "digital-strategy",
    shortDescription: "Comprehensive digital strategies tailored to your business goals.",
    description:
      "Our digital strategy services provide a roadmap for your online success. We analyze your business, audience, and competitors to develop a comprehensive plan that aligns with your goals and maximizes your digital potential.",
    icon: <BarChart className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-r from-indigo-500 to-violet-500",
    image: "/images/analytics2.jpg",
    benefits: [
      {
        title: "Data-Driven Approach",
        description: "We use analytics and market research to inform strategic decisions.",
        icon: <BarChart className="h-6 w-6 text-white" />,
      },
      {
        title: "Competitive Analysis",
        description: "Understand your position in the market and identify opportunities.",
        icon: <Search className="h-6 w-6 text-white" />,
      },
      {
        title: "Measurable Goals",
        description: "Clear KPIs and metrics to track progress and success.",
        icon: <BarChart className="h-6 w-6 text-white" />,
      },
      {
        title: "Adaptable Planning",
        description: "Flexible strategies that evolve with your business and market changes.",
        icon: <Globe className="h-6 w-6 text-white" />,
      },
    ],
    process: [
      {
        title: "Discovery & Research",
        description: "We conduct thorough research to understand your business, audience, and competitors.",
      },
      {
        title: "Strategic Planning",
        description: "We develop a comprehensive digital strategy aligned with your business goals.",
      },
      {
        title: "Implementation",
        description: "We execute the strategy across relevant digital channels.",
      },
      {
        title: "Monitoring & Optimization",
        description: "We continuously track performance and refine the strategy for optimal results.",
      },
    ],
    faq: [
      {
        question: "How long does it take to develop a digital strategy?",
        answer:
          "The timeline varies depending on the complexity of your business and goals. Typically, we can develop an initial strategy within 2-4 weeks, with ongoing refinements as we gather more data and insights.",
      },
      {
        question: "How do you measure the success of a digital strategy?",
        answer:
          "We establish clear KPIs aligned with your business objectives at the beginning of our engagement. These might include metrics like website traffic, conversion rates, lead generation, social engagement, or revenue growth.",
      },
      {
        question: "Can you adapt the strategy if our business goals change?",
        answer:
          "Absolutely. Our digital strategies are designed to be flexible and adaptable. We conduct regular reviews and can pivot the strategy as your business evolves or market conditions change.",
      },
    ],
  },
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    shortDescription: "Engage your audience and build brand awareness through strategic social media campaigns.",
    description:
      "Our social media marketing services help you connect with your audience, build brand awareness, and drive engagement across all relevant platforms. We create compelling content, manage your social presence, and implement targeted advertising campaigns to achieve your business objectives.",
    icon: <Megaphone className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    image: "/images/socialmedia.jpg",
    benefits: [
      {
        title: "Increased Brand Awareness",
        description: "Expand your reach and visibility across social platforms.",
        icon: <Megaphone className="h-6 w-6 text-white" />,
      },
      {
        title: "Community Building",
        description: "Develop a loyal community of followers and advocates.",
        icon: <Globe className="h-6 w-6 text-white" />,
      },
      {
        title: "Targeted Advertising",
        description: "Reach specific demographics with precision targeting.",
        icon: <Search className="h-6 w-6 text-white" />,
      },
      {
        title: "Measurable Results",
        description: "Track engagement, reach, and conversion metrics.",
        icon: <BarChart className="h-6 w-6 text-white" />,
      },
    ],
    process: [
      {
        title: "Platform Strategy",
        description: "We identify the most effective social platforms for your business and audience.",
      },
      {
        title: "Content Creation",
        description: "We develop engaging, platform-specific content that resonates with your audience.",
      },
      {
        title: "Community Management",
        description: "We actively manage your social presence, engaging with followers and building community.",
      },
      {
        title: "Paid Campaigns",
        description: "We implement targeted advertising campaigns to amplify your reach and results.",
      },
    ],
    faq: [
      {
        question: "Which social media platforms should my business be on?",
        answer:
          "This depends on your industry, target audience, and business goals. We'll help you identify the platforms where your audience is most active and where your content will have the greatest impact.",
      },
      {
        question: "How often should we post on social media?",
        answer:
          "Posting frequency varies by platform and audience. We'll develop a content calendar that maintains consistent engagement without overwhelming your audience or sacrificing quality.",
      },
      {
        question: "What kind of content performs best on social media?",
        answer:
          "This varies by platform and audience, but generally, authentic, valuable, and visually appealing content performs well. We'll help you create a mix of educational, entertaining, and promotional content tailored to your brand and audience.",
      },
    ],
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    shortDescription: "Compelling content that engages your audience and drives conversions.",
    description:
      "Our content creation services deliver high-quality, strategic content that resonates with your audience and supports your business goals. From blog posts and articles to videos and infographics, we create compelling content that drives engagement, builds authority, and converts visitors into customers.",
    icon: <ImageIcon className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-r from-amber-500 to-orange-500",
    image: "/images/contentcreation.png",
    benefits: [
      {
        title: "Audience Engagement",
        description: "Create content that resonates with your target audience.",
        icon: <Megaphone className="h-6 w-6 text-white" />,
      },
      {
        title: "Brand Authority",
        description: "Establish your brand as a thought leader in your industry.",
        icon: <Globe className="h-6 w-6 text-white" />,
      },
      {
        title: "SEO Benefits",
        description: "Improve search visibility with optimized content.",
        icon: <Search className="h-6 w-6 text-white" />,
      },
      {
        title: "Conversion Optimization",
        description: "Create content designed to guide users through the buyer's journey.",
        icon: <BarChart className="h-6 w-6 text-white" />,
      },
    ],
    process: [
      {
        title: "Content Strategy",
        description: "We develop a comprehensive content strategy aligned with your business goals.",
      },
      {
        title: "Content Creation",
        description: "Our team creates high-quality content across various formats and channels.",
      },
      {
        title: "Distribution",
        description: "We ensure your content reaches your target audience through appropriate channels.",
      },
      {
        title: "Performance Analysis",
        description: "We track content performance and optimize based on data and insights.",
      },
    ],
    faq: [
      {
        question: "What types of content do you create?",
        answer:
          "We create a wide range of content including blog posts, articles, whitepapers, case studies, videos, infographics, social media content, email newsletters, and more.",
      },
      {
        question: "How do you ensure content is aligned with our brand voice?",
        answer:
          "We begin with a thorough brand discovery process to understand your voice, tone, and messaging. We develop content guidelines and work closely with you to ensure all content authentically represents your brand.",
      },
      {
        question: "How often should we publish new content?",
        answer:
          "This depends on your resources, goals, and audience. Quality is more important than quantity. We'll help you develop a sustainable content calendar that maintains consistent engagement without sacrificing quality.",
      },
    ],
  },
  {
    title: "SEO Optimization",
    slug: "seo-optimization",
    shortDescription: "Improve your search visibility and drive organic traffic to your website.",
    description:
      "Our SEO optimization services help improve your website's visibility in search engine results, driving more organic traffic and qualified leads. We implement proven strategies across technical SEO, on-page optimization, and content development to help your business rank higher for relevant keywords.",
    icon: <Search className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
    image: "/images/seo2.jpg",
    benefits: [
      {
        title: "Increased Organic Traffic",
        description: "Drive more qualified visitors to your website through search engines.",
        icon: <Globe className="h-6 w-6 text-white" />,
      },
      {
        title: "Improved Search Rankings",
        description: "Rank higher for relevant keywords in your industry.",
        icon: <Search className="h-6 w-6 text-white" />,
      },
      {
        title: "Enhanced User Experience",
        description: "Create a better website experience that satisfies both users and search engines.",
        icon: <Code className="h-6 w-6 text-white" />,
      },
      {
        title: "Long-Term Results",
        description: "Build sustainable organic search visibility that continues to deliver results.",
        icon: <BarChart className="h-6 w-6 text-white" />,
      },
    ],
    process: [
      {
        title: "SEO Audit",
        description: "We conduct a comprehensive audit of your website and current search performance.",
      },
      {
        title: "Keyword Research",
        description: "We identify the most valuable keywords for your business and audience.",
      },
      {
        title: "On-Page Optimization",
        description: "We optimize your website content, structure, and metadata for search engines.",
      },
      {
        title: "Technical SEO",
        description: "We address technical issues that may be impacting your search performance.",
      },
    ],
    faq: [
      {
        question: "How long does it take to see results from SEO?",
        answer:
          "SEO is a long-term strategy. While some improvements can be seen within a few weeks, significant results typically take 3-6 months. The timeline depends on factors like your website's current state, competition, and the aggressiveness of your strategy.",
      },
      {
        question: "What makes your SEO approach different?",
        answer:
          "We focus on sustainable, white-hat SEO practices that build long-term value. Our approach integrates technical SEO, content strategy, and user experience to create websites that perform well for both users and search engines.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No reputable SEO agency can guarantee specific rankings, as search algorithms are complex and constantly evolving. We focus on measurable improvements in organic traffic, conversions, and visibility for targeted keywords.",
      },
    ],
  },
  {
    title: "PPC Advertising",
    slug: "ppc-advertising",
    shortDescription: "Drive targeted traffic and conversions with strategic paid advertising campaigns.",
    description:
      "Our PPC advertising services help you reach your target audience at the right moment with compelling ad campaigns. We develop and manage paid advertising strategies across search engines, social media, and display networks to drive traffic, leads, and sales with measurable ROI.",
    icon: <Megaphone className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-r from-rose-500 to-pink-500",
    image: "/images/ppcadvertise.jpg",
    benefits: [
      {
        title: "Immediate Results",
        description: "Start driving targeted traffic to your website right away.",
        icon: <Globe className="h-6 w-6 text-white" />,
      },
      {
        title: "Precise Targeting",
        description: "Reach specific audiences based on demographics, interests, and behaviors.",
        icon: <Search className="h-6 w-6 text-white" />,
      },
      {
        title: "Measurable ROI",
        description: "Track performance and calculate exact return on investment.",
        icon: <BarChart className="h-6 w-6 text-white" />,
      },
      {
        title: "Scalable Campaigns",
        description: "Easily adjust budgets and targeting based on performance.",
        icon: <Megaphone className="h-6 w-6 text-white" />,
      },
    ],
    process: [
      {
        title: "Campaign Strategy",
        description: "We develop a comprehensive PPC strategy aligned with your business goals.",
      },
      {
        title: "Account Setup",
        description: "We set up and structure your advertising accounts for optimal performance.",
      },
      {
        title: "Ad Creation",
        description: "We create compelling ad copy and creative that drives clicks and conversions.",
      },
      {
        title: "Optimization & Reporting",
        description: "We continuously monitor and optimize campaigns, providing regular performance reports.",
      },
    ],
    faq: [
      {
        question: "What platforms do you manage PPC campaigns on?",
        answer:
          "We manage campaigns across Google Ads, Microsoft Ads, Facebook/Instagram Ads, LinkedIn Ads, Twitter Ads, and other platforms relevant to your audience and goals.",
      },
      {
        question: "What budget do I need for PPC advertising?",
        answer:
          "Budget requirements vary based on your industry, competition, and goals. We'll help you determine an appropriate budget that balances reach with ROI, starting with a test budget to gather data before scaling.",
      },
      {
        question: "How do you measure the success of PPC campaigns?",
        answer:
          "We track key metrics including impressions, clicks, click-through rate (CTR), conversion rate, cost per click (CPC), cost per acquisition (CPA), and return on ad spend (ROAS). We focus on the metrics most aligned with your business goals.",
      },
    ],
  },
  {
    title: "Web Development",
    slug: "web-development",
    shortDescription: "Custom websites and web applications designed for performance and conversion.",
    description:
      "Our web development services deliver custom websites and web applications that combine stunning design with powerful functionality. We create responsive, user-friendly digital experiences that engage your audience, reflect your brand, and drive business results.",
    icon: <Code className="h-6 w-6 text-white" />,
    gradient: "bg-gradient-to-r from-violet-500 to-purple-500",
    image: "/images/webdesign.jpg",
    benefits: [
      {
        title: "Custom Solutions",
        description: "Tailored websites and applications designed for your specific needs.",
        icon: <Code className="h-6 w-6 text-white" />,
      },
      {
        title: "Responsive Design",
        description: "Seamless experience across all devices and screen sizes.",
        icon: <Globe className="h-6 w-6 text-white" />,
      },
      {
        title: "Performance Optimization",
        description: "Fast-loading websites that provide excellent user experience.",
        icon: <BarChart className="h-6 w-6 text-white" />,
      },
      {
        title: "Conversion-Focused",
        description: "Strategic design and functionality that drives user actions.",
        icon: <Search className="h-6 w-6 text-white" />,
      },
    ],
    process: [
      {
        title: "Discovery & Planning",
        description: "We gather requirements and develop a comprehensive project plan.",
      },
      {
        title: "Design",
        description: "We create wireframes and visual designs that align with your brand and goals.",
      },
      {
        title: "Development",
        description: "Our developers build your website or application using modern technologies.",
      },
      {
        title: "Testing & Launch",
        description: "We thoroughly test and deploy your project, ensuring a smooth launch.",
      },
    ],
    faq: [
      {
        question: "What technologies do you use for web development?",
        answer:
          "We work with a range of modern technologies including React, Next.js, Vue.js, Node.js, and WordPress, selecting the best tools for your specific project requirements.",
      },
      {
        question: "How long does it take to build a website?",
        answer:
          "Timeline varies based on complexity. A basic website might take 4-6 weeks, while more complex sites or web applications can take 3-6 months. We'll provide a detailed timeline during the planning phase.",
      },
      {
        question: "Do you provide website maintenance after launch?",
        answer:
          "Yes, we offer ongoing maintenance and support packages to keep your website secure, up-to-date, and performing optimally. We can also implement regular updates and new features as needed.",
      },
    ],
  },
]
