// Central data store for portfolio content

export const profile = {
  username: "niyasmohammed._",
  name: "Niyas Mohammed",
  profession: "Full-Stack Developer · Product Builder",
  avatar: "/profile.png",
  bio: "🚀 React · Next.js · Node.js · TypeScript\n✨ Turning ideas into pixel-perfect products\n📍 Based in Kerala, India",
  postsCount: 3,
  followersCount: "1.4K",
  followingCount: 248,
  website: "niyasmohammed.dev",
  email: "hello@niyasmohammed.dev",
};

// ─── Profile "About Me" story (opened by tapping avatar) ───
export const profileStory: Highlight = {
  id: "profile-story",
  label: "Niyas",
  icon: "👤",
  gradient:
    "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  pages: [
    {
      id: "about-1",
      type: "about",
      title: "Hi, I'm Niyas 👋",
      subtitle: "Full Stack Developer",
      body: "I'm Niyas, a Full Stack Developer who enjoys turning ideas into products people actually use.\n\nOver the years, I've built booking platforms, startup MVPs, e-commerce applications, and SaaS solutions while working with founders, businesses, and startup teams.\n\nCurrently, I'm focused on growing as a Software Engineer while building products of my own.",
      highlight: "📍 Kerala, India · Open to Work",
      accent:
        "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    },
    {
      id: "about-2",
      type: "about",
      title: "What I Do 🛠️",
      subtitle: "Turning Ideas into Products",
      body: "I help transform ideas into working products.\n\nMy work ranges from designing user experiences and building frontend interfaces to developing backend systems, APIs, and business workflows.\n\nI enjoy solving problems that sit between technology and real-world business needs.",
      highlight: "UX · Frontend · Backend · Business Logic",
      accent: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    },
    {
      id: "about-3",
      type: "about",
      title: "My Journey 🚀",
      subtitle: "Curiosity → Code → Products",
      body: "My journey started long before I wrote my first line of code. As a kid, I was always curious about computers, exploring software, breaking things, fixing them.\n\nThat curiosity led me to Computer Science Engineering at Excel Engineering College, where I joined startup incubation programs, building products like DeWise and Curtainry. Those experiences taught me how ideas become businesses.\n\nAlongside college, I freelanced and worked with real clients - building OASTEL, a travel booking platform serving customers in Malaysia. Real-world projects taught me lessons classrooms never could.\n\nToday I continue as a developer, product builder, and aspiring entrepreneur.",
      highlight: "Excel Engineering College · CSE · 2026",
      accent: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    },
    {
      id: "about-4",
      type: "about",
      title: "Currently Exploring 🔭",
      subtitle: "Always Learning",
      body: "AI & ML\nSystem Design\nMulti-tenant SaaS Architecture\nOperating System",
      highlight: "Expanding the stack · 2026",
      accent: "linear-gradient(135deg, #0d0d0d 0%, #1a0533 50%, #0d0d0d 100%)",
    },
  ],
};

export const highlights: Highlight[] = [
  {
    id: "experience",
    label: "Experience",
    icon: "💼",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    pages: [
      {
        id: "exp-1",
        type: "experience",
        company: "OASTEL (Client Project)",
        role: "Full Stack Developer",
        period: "2025 – Present",
        location: "Malaysia (Remote)",
        description:
          "Designed and developed a full-stack travel booking platform for a Malaysian tourism operator, enabling customers to discover, book, and manage tours and transportation services online. Built secure booking workflows, Stripe payment integration, automated email confirmations, dynamic timeslot management, and administrative tools.",
        tech: ["Next.js", "Stripe", "Node.js", "MongoDB", "Brevo"],
        logo: "✈️",
        image: "/project_oastel.png",
      },
      {
        id: "exp-2",
        type: "experience",
        company: "DeWise (Startup Incubation)",
        role: "Technical Lead & Application Developer",
        period: "Oct 2024 – Apr 2025",
        location: "Kerala, India",
        description:
          "Led a 3-member team building a gamified learning platform to help individuals monetize skills and launch businesses. Architected the mobile app focusing on user progression, interactive learning, authentication, and marketplace functionality during a 6-month incubation program.",
        tech: ["React Native", "Expo", "TypeScript", "Firebase", "Node.js"],
        logo: "🎮",
        image: "/project_dewise.png",
      },
      {
        id: "exp-3",
        type: "experience",
        company: "Curtainry (Startup Incubation)",
        role: "Product Architect & Frontend Developer",
        period: "2025",
        location: "Kerala, India",
        description:
          "Contributed to early-stage development of Curtainry, digitizing the curtain industry by connecting customers with products and services. Led product ideation, designed system architecture and workflow diagrams, and developed the frontend experience for the platform.",
        tech: [
          "Next.js",
          "React",
          "Figma",
          "Product Design",
          "System Architecture",
        ],
        logo: "🏠",
        image: "/project_curtainry.png",
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    pages: [
      {
        id: "fe-1",
        type: "skill",
        category: "Core Technologies",
        title: "Frontend Mastery",
        skills: [
          { name: "React", level: 95, icon: "⚛️" },
          { name: "Next.js", level: 92, icon: "▲" },
          { name: "Tailwind CSS", level: 98, icon: "🩵" },
          { name: "JavaScript", level: 96, icon: "🟡" },
          { name: "Redux", level: 87, icon: "🗃️" },
          { name: "shadcn", level: 85, icon: "🧩" },
        ],
      },
      {
        id: "fe-2",
        type: "skill",
        category: "UI & Styling",
        title: "Design Implementation",
        skills: [
          { name: "Tailwind CSS", level: 90, icon: "🌊" },
          { name: "CSS3 / SCSS", level: 93, icon: "🎨" },
          { name: "Framer Motion", level: 82, icon: "🎬" },
          { name: "Figma", level: 85, icon: "🖌️" },
        ],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    pages: [
      {
        id: "be-1",
        type: "skill",
        category: "Runtime & Frameworks",
        title: "Backend Stack",
        skills: [
          { name: "Node.js", level: 90, icon: "🟢" },
          { name: "Express.js", level: 88, icon: "🚂" },
          { name: "Helmet", level: 82, icon: "🛡️" },
          { name: "REST APIs", level: 93, icon: "🔗" },
        ],
      },
      {
        id: "be-2",
        type: "skill",
        category: "Databases",
        title: "Data Layer",
        skills: [
          { name: "PostgreSQL", level: 85, icon: "🐘" },
          { name: "MongoDB", level: 83, icon: "🍃" },
          { name: "Firebase", level: 80, icon: "🔥" },
          { name: "Appwrite", level: 76, icon: "📦" },
          { name: "Supabase", level: 78, icon: "⚡" },
        ],
      },
      {
        id: "be-3",
        type: "skill",
        category: "DevOps & Cloud",
        title: "Deployment",
        skills: [
          { name: "CI/CD", level: 78, icon: "🔁" },
          { name: "Vercel / Netlify", level: 92, icon: "▲" },
          { name: "GitHub", level: 88, icon: "🐙" },
          { name: "Docker", level: 80, icon: "🐳" },
        ],
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    icon: "🛠️",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    pages: [
      {
        id: "srv-1",
        type: "service",
        title: "Web Development",
        icon: "🌐",
        description:
          "End-to-end web applications with modern technologies, from landing pages to complex SaaS platforms.",
        features: [
          "Custom React / Next.js Apps",
          "REST API Development",
          "Database Design & Optimization",
          "Performance & SEO",
        ],
      },
      {
        id: "srv-2",
        type: "service",
        title: "Mobile Development",
        icon: "📱",
        description:
          "Cross-platform mobile apps with React Native. Marketplace features, gamification, authentication and more.",
        features: [
          "React Native / Expo",
          "Firebase & Push Notifications",
          "App Store Deployment",
          "Offline-first Architecture",
        ],
      },
      {
        id: "srv-3",
        type: "service",
        title: "Product Design",
        icon: "🎨",
        description:
          "User-centered product design using Figma - wireframes and prototypes to polished UI designs ready for development.",
        features: [
          "Wireframing & Prototyping",
          "UI/UX Design in Figma",
          "Design Systems & Components",
          "User Research & Testing",
        ],
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: "🎓",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    pages: [
      {
        id: "edu-1",
        type: "education",
        institution: "University of Calicut",
        degree: "B.Tech in Computer Science",
        period: "2017 – 2021",
        gpa: "8.4 / 10",
        icon: "🏛️",
        highlights: [
          "Final Year Project: AI-powered campus management system",
          "Tech Club President — organized 10+ events",
          "Won State-level Hackathon 2020",
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    icon: "📬",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    pages: [
      {
        id: "cnt-1",
        type: "contact",
        title: "Let's Build Together",
        email: "niyas.careerpath@gmail.com",
        phone: "+91 97456 76150",
        location: "Kerala, India",
        availability: "Open to Work",
        links: {
          github: "github.com/callmeniyu",
          linkedin: "linkedin.com/in/niyasmohammed",
          twitter: "@niyasdev",
        },
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "OASTEL",
    description:
      "Full-stack travel booking platform for a Malaysian tourism operator. Features Stripe payments, timeslot management, automated emails, and an admin dashboard.",
    images: [
      "/project_oastel.png",
      "/project_dashboard.png",
      "/project_ecommerce.png",
    ],
    tech: ["Next.js", "Stripe", "Node.js", "MongoDB", "Brevo"],
    github: "https://github.com/callmeniyu/Oastel.git",
    live: "https://oastel.com",
    category: "Full-Stack",
    likes: 15,
    comments: 28,
  },
  {
    id: "proj-2",
    title: "DeWise",
    description:
      "Gamified learning platform built with a 3-member team during startup incubation. Users progress through skill-based challenges to monetize their expertise.",
    images: ["/project_dewise.png", "/project_ai_chat.png"],
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "Node.js"],
    github: "https://github.com/callmeniyu/dewiseApp",
    live: "https://www.figma.com/design/nOkg4syDkZKyupOK3n7Bwe/deWise-Prototype?node-id=1305-130&p=f&t=DvGBL5ILTUi4InhG-0",
    category: "Mobile",
    likes: 7,
    comments: 19,
  },
  {
    id: "proj-3",
    title: "Curtainry",
    description:
      "Early-stage marketplace platform digitizing the curtain industry — connecting customers with curtain products and services through a centralized platform.",
    images: [
      "/project_curtainry.png",
      "/project_mobile_app.png",
      "/project_saas.png",
    ],
    tech: [
      "Next.js",
      "React",
      "Figma",
      "Product Design",
      "System Architecture",
    ],
    github: "https://github.com/callmeniyu/curtainry-customer-app",
    live: "https://curtainry-customer-app.vercel.app/",
    category: "Startup",
    likes: 4,
    comments: 14,
  },
  {
    id: "proj-4",
    title: "MossyForestTours",
    description: "Tour booking platform for a business in Cameron Highlands",
    images: ["/project_mossyforest.png", "/project_mossyforest_2.png"],
    tech: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Tailwind"],
    github: "https://github.com/callmeniyu/mossyforesttours-server",
    live: "https://mossyforest.my",
    category: "Booking System",
    likes: 10,
    comments: 58,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Chen",
    role: "CTO at TechCorp Solutions",
    avatar: "👩‍💼",
    text: "Niyas's technical expertise is exceptional. He refactored our entire frontend, cutting load times by 40% and making our codebase a joy to work with. An absolute asset to any team.",
    rating: 5,
    date: "3 weeks ago",
    project: "Enterprise SaaS Refactor",
  },
  {
    id: "test-2",
    name: "Ahmed Al-Rashid",
    role: "Founder, StartupHub",
    avatar: "👨‍💻",
    text: "Working with Niyas felt like having a senior engineer who actually cares. He asked the right questions, delivered ahead of schedule, and the code quality was production-ready from day one.",
    rating: 5,
    date: "1 month ago",
    project: "Fintech Platform",
  },
  {
    id: "test-3",
    name: "Priya Sharma",
    role: "Product Designer, PixelLabs",
    avatar: "👩‍🎨",
    text: "As a designer, I was blown away by how faithfully Niyas implemented every pixel of my designs — including the micro-animations. He bridged the design-dev gap perfectly.",
    rating: 5,
    date: "2 months ago",
    project: "Agency Website",
  },
  {
    id: "test-4",
    name: "Marcus Webb",
    role: "Engineering Lead, Verida",
    avatar: "👨‍🔬",
    text: "Niyas built our analytics dashboard from scratch in 6 weeks. Complex D3 visualizations, WebSocket real-time updates — all delivered cleanly. Would hire again in a heartbeat.",
    rating: 5,
    date: "3 months ago",
    project: "Analytics Dashboard",
  },
];

// ─── Type definitions ───
export type HighlightPage =
  | ExperiencePage
  | SkillPage
  | ServicePage
  | EducationPage
  | ContactPage
  | AboutPage;

export interface Highlight {
  id: string;
  label: string;
  icon: string;
  gradient: string;
  pages: HighlightPage[];
}

export interface AboutPage {
  id: string;
  type: "about";
  title: string;
  subtitle: string;
  body: string;
  highlight: string;
  accent: string;
}

export interface ExperiencePage {
  id: string;
  type: "experience";
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tech: string[];
  logo: string;
  image?: string;
}

export interface SkillPage {
  id: string;
  type: "skill";
  category: string;
  title: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface ServicePage {
  id: string;
  type: "service";
  title: string;
  icon: string;
  description: string;
  features: string[];
}

export interface EducationPage {
  id: string;
  type: "education";
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  icon: string;
  highlights: string[];
}

export interface ContactPage {
  id: string;
  type: "contact";
  title: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  links: { github: string; linkedin: string; twitter: string };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tech: string[];
  github: string;
  live: string;
  category: string;
  likes: number;
  comments: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
  project: string;
}
