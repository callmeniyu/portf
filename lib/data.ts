// Central data store for portfolio content

export const profile = {
  username: 'niyasmohammed._',
  name: 'Niyas Mohammed',
  profession: 'Full-Stack Developer · UI/UX Enthusiast',
  avatar: '/profile.png',
  bio: '💻 Building the web, one component at a time\n🚀 React · Next.js · Node.js · TypeScript\n✨ Turning ideas into pixel-perfect products\n📍 Based in Kerala, India',
  postsCount: 6,
  followersCount: '1.4K',
  followingCount: 248,
  website: 'niyasmohammed.dev',
  email: 'hello@niyasmohammed.dev',
}

export const highlights: Highlight[] = [
  {
    id: 'experience',
    label: 'Experience',
    icon: '💼',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pages: [
      {
        id: 'exp-1',
        type: 'experience',
        company: 'TechCorp Solutions',
        role: 'Senior Frontend Developer',
        period: 'Jan 2023 – Present',
        location: 'Remote',
        description:
          'Leading the frontend architecture for a SaaS platform serving 50K+ users. Implemented micro-frontend patterns, reduced load time by 40%, and mentored a team of 4 developers.',
        tech: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'AWS'],
        logo: '🏢',
      },
      {
        id: 'exp-2',
        type: 'experience',
        company: 'StartupHub Inc.',
        role: 'Full-Stack Developer',
        period: 'Jun 2021 – Dec 2022',
        location: 'Kochi, India',
        description:
          'Built end-to-end features for a fintech product. Developed RESTful APIs with Node.js, designed the database schema, and created responsive UIs with React.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
        logo: '🚀',
      },
      {
        id: 'exp-3',
        type: 'experience',
        company: 'Freelance',
        role: 'Web Developer & Designer',
        period: 'Mar 2020 – May 2021',
        location: 'Remote',
        description:
          'Delivered 15+ web projects for clients worldwide. Specialized in converting Figma designs to pixel-perfect React applications and WordPress customization.',
        tech: ['React', 'JavaScript', 'WordPress', 'PHP', 'SCSS'],
        logo: '🎯',
      },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    pages: [
      {
        id: 'fe-1',
        type: 'skill',
        category: 'Core',
        title: 'Frontend Mastery',
        skills: [
          { name: 'React', level: 95, icon: '⚛️' },
          { name: 'Next.js', level: 92, icon: '▲' },
          { name: 'TypeScript', level: 88, icon: '🔷' },
          { name: 'JavaScript', level: 96, icon: '🟡' },
        ],
      },
      {
        id: 'fe-2',
        type: 'skill',
        category: 'Styling',
        title: 'UI & Styling',
        skills: [
          { name: 'Tailwind CSS', level: 90, icon: '🌊' },
          { name: 'CSS3 / SCSS', level: 93, icon: '🎨' },
          { name: 'Framer Motion', level: 82, icon: '🎬' },
          { name: 'Figma', level: 85, icon: '🖌️' },
        ],
      },
      {
        id: 'fe-3',
        type: 'skill',
        category: 'State & Data',
        title: 'State Management',
        skills: [
          { name: 'Redux Toolkit', level: 87, icon: '🗃️' },
          { name: 'Zustand', level: 85, icon: '🐻' },
          { name: 'React Query', level: 88, icon: '🔄' },
          { name: 'GraphQL', level: 78, icon: '💜' },
        ],
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    pages: [
      {
        id: 'be-1',
        type: 'skill',
        category: 'Runtime & Frameworks',
        title: 'Backend Stack',
        skills: [
          { name: 'Node.js', level: 90, icon: '🟢' },
          { name: 'Express.js', level: 88, icon: '🚂' },
          { name: 'Python', level: 72, icon: '🐍' },
          { name: 'REST APIs', level: 93, icon: '🔗' },
        ],
      },
      {
        id: 'be-2',
        type: 'skill',
        category: 'Databases',
        title: 'Databases',
        skills: [
          { name: 'PostgreSQL', level: 85, icon: '🐘' },
          { name: 'MongoDB', level: 83, icon: '🍃' },
          { name: 'Redis', level: 76, icon: '🔴' },
          { name: 'Prisma ORM', level: 88, icon: '🔺' },
        ],
      },
      {
        id: 'be-3',
        type: 'skill',
        category: 'DevOps & Cloud',
        title: 'DevOps',
        skills: [
          { name: 'Docker', level: 80, icon: '🐳' },
          { name: 'AWS', level: 74, icon: '☁️' },
          { name: 'CI/CD', level: 78, icon: '🔁' },
          { name: 'Vercel / Netlify', level: 92, icon: '▲' },
        ],
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: '🛠️',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    pages: [
      {
        id: 'srv-1',
        type: 'service',
        title: 'Web Development',
        icon: '🌐',
        description:
          'End-to-end web applications built with modern technologies. From landing pages to complex SaaS platforms.',
        features: ['Custom React/Next.js Apps', 'API Development', 'Database Design', 'Performance Optimization'],
      },
      {
        id: 'srv-2',
        type: 'service',
        title: 'UI/UX Design',
        icon: '🎨',
        description:
          'Beautiful, user-centric interfaces that convert. Translating your vision into stunning digital experiences.',
        features: ['Figma Design Systems', 'Responsive Layouts', 'Motion Design', 'Brand Identity'],
      },
      {
        id: 'srv-3',
        type: 'service',
        title: 'Consulting',
        icon: '💡',
        description:
          'Technical guidance and code reviews for growing teams. Architecture advice that scales with your business.',
        features: ['Code Reviews', 'Architecture Design', 'Team Mentoring', 'Tech Stack Selection'],
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    pages: [
      {
        id: 'edu-1',
        type: 'education',
        institution: 'University of Calicut',
        degree: 'B.Tech in Computer Science',
        period: '2017 – 2021',
        gpa: '8.4 / 10',
        icon: '🏛️',
        highlights: [
          'Final Year Project: AI-powered campus management system',
          'Tech Club President — organized 10+ events',
          'Won State-level Hackathon 2020',
        ],
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '📬',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    pages: [
      {
        id: 'cnt-1',
        type: 'contact',
        title: "Let's Connect",
        email: 'hello@niyasmohammed.dev',
        phone: '+91 98765 43210',
        location: 'Kochi, Kerala, India',
        availability: 'Open to Work',
        links: {
          github: 'github.com/niyasmohammed',
          linkedin: 'linkedin.com/in/niyasmohammed',
          twitter: '@niyasdev',
        },
      },
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'ShopSphere',
    description:
      'A full-stack e-commerce platform with real-time inventory, payment integration (Stripe), and admin dashboard. Handles 10K+ daily transactions.',
    image: '/project_ecommerce.png',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis'],
    github: 'https://github.com',
    live: 'https://shopsphere.demo',
    category: 'Full-Stack',
    likes: 248,
    comments: 32,
  },
  {
    id: 'proj-2',
    title: 'DataSight Analytics',
    description:
      'Real-time analytics dashboard with interactive charts, custom date ranges, and PDF export. Used by 500+ businesses for data-driven decisions.',
    image: '/project_dashboard.png',
    tech: ['React', 'D3.js', 'Node.js', 'MongoDB', 'WebSockets'],
    github: 'https://github.com',
    live: 'https://datasight.demo',
    category: 'Frontend',
    likes: 193,
    comments: 21,
  },
  {
    id: 'proj-3',
    title: 'NexusAI Chat',
    description:
      'AI-powered chatbot platform with context awareness, multi-model support (GPT-4, Claude), and team collaboration features.',
    image: '/project_ai_chat.png',
    tech: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://nexusai.demo',
    category: 'AI/ML',
    likes: 421,
    comments: 58,
  },
  {
    id: 'proj-4',
    title: 'QuickBite App',
    description:
      'Mobile-first food delivery app with real-time order tracking, geolocation, and restaurant management system built for React Native.',
    image: '/project_mobile_app.png',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Maps API'],
    github: 'https://github.com',
    live: 'https://quickbite.demo',
    category: 'Mobile',
    likes: 167,
    comments: 19,
  },
  {
    id: 'proj-5',
    title: 'PixelForge Agency',
    description:
      'Award-winning creative agency website with GSAP animations, 3D parallax effects, and a dynamic case study showcase.',
    image: '/project_portfolio.png',
    tech: ['Next.js', 'GSAP', 'Three.js', 'Framer Motion', 'Sanity CMS'],
    github: 'https://github.com',
    live: 'https://pixelforge.demo',
    category: 'Creative',
    likes: 312,
    comments: 45,
  },
  {
    id: 'proj-6',
    title: 'TaskFlow SaaS',
    description:
      'Project management tool with kanban boards, time tracking, team chat, and Gantt charts. Trusted by 200+ remote teams worldwide.',
    image: '/project_saas.png',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    github: 'https://github.com',
    live: 'https://taskflow.demo',
    category: 'SaaS',
    likes: 289,
    comments: 37,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Chen',
    role: 'CTO at TechCorp Solutions',
    avatar: '👩‍💼',
    text: "Niyas's technical expertise is exceptional. He refactored our entire frontend, cutting load times by 40% and making our codebase a joy to work with. An absolute asset to any team.",
    rating: 5,
    date: '3 weeks ago',
    project: 'Enterprise SaaS Refactor',
  },
  {
    id: 'test-2',
    name: 'Ahmed Al-Rashid',
    role: 'Founder, StartupHub',
    avatar: '👨‍💻',
    text: 'Working with Niyas felt like having a senior engineer who actually cares. He asked the right questions, delivered ahead of schedule, and the code quality was production-ready from day one.',
    rating: 5,
    date: '1 month ago',
    project: 'Fintech Platform',
  },
  {
    id: 'test-3',
    name: 'Priya Sharma',
    role: 'Product Designer, PixelLabs',
    avatar: '👩‍🎨',
    text: 'As a designer, I was blown away by how faithfully Niyas implemented every pixel of my designs — including the micro-animations. He bridged the design-dev gap perfectly.',
    rating: 5,
    date: '2 months ago',
    project: 'Agency Website',
  },
  {
    id: 'test-4',
    name: 'Marcus Webb',
    role: 'Engineering Lead, Verida',
    avatar: '👨‍🔬',
    text: 'Niyas built our analytics dashboard from scratch in 6 weeks. Complex D3 visualizations, WebSocket real-time updates — all delivered cleanly. Would hire again in a heartbeat.',
    rating: 5,
    date: '3 months ago',
    project: 'Analytics Dashboard',
  },
  {
    id: 'test-5',
    name: 'Layla Hassan',
    role: 'CEO, QuickBite',
    avatar: '👩‍🍳',
    text: 'Our food delivery app needed to launch in 3 months. Niyas made it happen — on time, on budget, with zero bugs post-launch. The UX received rave reviews from users.',
    rating: 5,
    date: '4 months ago',
    project: 'Food Delivery App',
  },
  {
    id: 'test-6',
    name: 'David Park',
    role: 'Freelance Client',
    avatar: '🧑‍💼',
    text: "I've worked with many freelancers, but Niyas stands out. His communication is crystal clear, he proactively flags potential issues, and his code is clean and maintainable.",
    rating: 5,
    date: '5 months ago',
    project: 'E-commerce Store',
  },
]

// Type definitions
export type HighlightPage =
  | ExperiencePage
  | SkillPage
  | ServicePage
  | EducationPage
  | ContactPage

export interface Highlight {
  id: string
  label: string
  icon: string
  gradient: string
  pages: HighlightPage[]
}

export interface ExperiencePage {
  id: string
  type: 'experience'
  company: string
  role: string
  period: string
  location: string
  description: string
  tech: string[]
  logo: string
}

export interface SkillPage {
  id: string
  type: 'skill'
  category: string
  title: string
  skills: { name: string; level: number; icon: string }[]
}

export interface ServicePage {
  id: string
  type: 'service'
  title: string
  icon: string
  description: string
  features: string[]
}

export interface EducationPage {
  id: string
  type: 'education'
  institution: string
  degree: string
  period: string
  gpa: string
  icon: string
  highlights: string[]
}

export interface ContactPage {
  id: string
  type: 'contact'
  title: string
  email: string
  phone: string
  location: string
  availability: string
  links: { github: string; linkedin: string; twitter: string }
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  live: string
  category: string
  likes: number
  comments: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  text: string
  rating: number
  date: string
  project: string
}
