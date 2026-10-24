export const profile = {
  name: 'Hamza Khan Lodhi',
  role: 'Software Engineer',
  location: 'Karachi, Pakistan',
  phone: '+92 327 3622257',
  phoneHref: 'tel:+923273622257',
  whatsapp: 'https://wa.me/923273622257?text=Assalam-o-Alaikum%20Hamza%20Khan%20Lodhi%21%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you%20regarding%20a%20project%20or%20an%20opportunity.',
  email: 'hamzalodhi2023@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hamzakhanlodhi/',
  github: 'https://github.com/hamzalodhi2023',
  facebook: 'https://www.facebook.com/HamzaKhanLodhi2023/',
  instagram: 'https://www.instagram.com/hamzakhanlodhi2025/',
  portfolio: 'https://hamza-khan-lodhi.netlify.app/',
  githubHandle: 'hamzalodhi2023',
  linkedinHandle: 'hamzakhanlodhi',
  facebookHandle: 'HamzaKhanLodhi2023',
  instagramHandle: 'hamzakhanlodhi2025',
  availability: 'Open to work',
  photo: '/images/hamza.jpg',
};

export const about = {
  headline: 'Software Engineer',
  paragraphs: [
    'Software Engineer with hands-on technical experience in designing and building modern web applications.',
    'Currently working as a Software Engineer Intern at Geeks of Kolachi, working across frontend and backend technologies including Odoo, JavaScript, TypeScript, React, Next.js, Node.js, MongoDB & MySQL.',
    'Pragmatic problem solver focused on writing maintainable code, adopting modern engineering practices, and continuously building software engineering skills in collaborative team environments.',
  ],
  competencies: [
    {
      title: 'Continuous Learning',
      description:
        'Dedicated to expanding technical breadth through structured coursework, official documentation, and practical build exercises.',
    },
    {
      title: 'Team Collaboration',
      description:
        'Experienced in technical discussions, receiving code feedback constructively, and adapting to established team standards.',
    },
    {
      title: 'Methodical Problem Solving',
      description:
        'Approaches debugging and feature implementation systematically with clear attention to fundamental software mechanics.',
    },
  ],
};

export const experiences = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Geeks of Kolachi',
    companyUrl: 'https://geeksofkolachi.com/',
    location: 'Karachi, Pakistan',
    period: '18 May 2026 — Present',
    current: true,
    points: [
      'Gained hands-on experience in Software Engineering workflows, working with modern JavaScript frameworks, backend APIs, and database structures.',
      'Contributed to frontend development tasks by building component interfaces using React and styling tools like Tailwind CSS, focusing on UI consistency and responsiveness.',
      'Participated actively in internal technical discussions, team planning meetings, and peer code reviews to understand commercial software development standards.',
      'Learned and applied GitHub-based development workflows, including feature branching, pull request reviews, and collaborative repository management.',
    ],
    learnings: [
      'Explored automated testing concepts and learned how testing tools like Playwright ensure application reliability across modern web applications.',
      'Worked on improving debugging and analytical problem-solving skills by troubleshooting bugs alongside senior engineering staff.',
      'Studied best practices for RESTful API design, data handling, and backend logic construction within Node.js environments.',
    ],
  },
];

export const projects = [
  {
    name: 'Rozgar Connect',
    tagline: 'Web Application (Concept Project)',
    status: 'Concept',
    description:
      'A web application concept focused on job search dynamics and real-time interaction features. Built responsive layout interfaces with React and Tailwind CSS, used Redux Toolkit for global state management, implemented client-side JWT token handling for authentication workflows, and integrated Socket.IO event listeners for live web updates.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'Socket.IO', 'JWT'],
    liveUrl: null as string | null,
    repoUrl: 'https://github.com/hamzalodhi2023',
    featured: true,
  },
];

export const skillGroups = [
  {
    category: 'Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript'],
  },
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'TanStack Query', 'Redux Toolkit', 'HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Prisma ORM', 'Drizzle ORM', 'Zod', 'Hybrid Auth'],
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    category: 'Testing & CI/CD',
    skills: ['Playwright', 'GitHub Actions', 'CI/CD Pipelines'],
  },
  {
    category: 'Tools & Mobile',
    skills: ['Git', 'GitHub', 'VS Code', 'Cursor', 'React Native', 'Expo', 'Odoo ERP'],
  },
  {
    category: 'Operating Systems',
    skills: ['Windows', 'Linux'],
  },
];

// Flat marquee list
export const marqueeSkills = Array.from(new Set(skillGroups.flatMap((g) => g.skills)));

export const education = [
  {
    degree: 'Intermediate in Arts (FA)',
    institution: 'Board of Intermediate Education Karachi',
  },
  {
    degree: 'Matriculation (Secondary School Certificate)',
    institution: 'Board of Secondary Education Karachi',
  },
];

export const certificates = [
  {
    title: 'Certificate of Appreciation',
    issuer: 'Sindh Police',
    detail: 'Complaints Management System (CMS) & Website Development',
    url: null as string | null,
  },
  {
    title: 'Building with the Claude API',
    issuer: 'Claude Academy',
    url: 'https://academy.claude.com/verify/4555e272c905fb1f5061bbbdc76259d3',
  },
  {
    title: 'Claude 101',
    issuer: 'Claude Academy',
    url: 'https://academy.claude.com/verify/aa5134ac2352898da9fe3c7782244950',
  },
  {
    title: 'Claude Code 101',
    issuer: 'Claude Academy',
    url: 'https://academy.claude.com/verify/279e3ade12aa4d397d1736c856d0f881',
  },
  {
    title: 'Introduction to GitHub',
    issuer: 'Microsoft',
    url: 'https://learn.microsoft.com/en-us/users/hamzakhanlodhi-1343/achievements/7dxnrmwz',
  },
  {
    title: 'AI for Business Professionals',
    issuer: 'HP LIFE',
    url: 'https://www.life-global.org/certificate/d44af2b1-1e03-40f3-9d0d-971036045a9a',
  },
  {
    title: 'Critical Thinking in the AI Era',
    issuer: 'HP LIFE',
    url: 'https://www.life-global.org/certificate/95776a46-742e-4b58-af32-c39b17877372',
  },
  {
    title: 'Introduction to Software Engineering',
    issuer: 'IBM via Coursera',
    url: 'https://www.coursera.org/account/accomplishments/verify/F4KFRVOH8RDC',
  },
];

export const interests = [
  {
    title: 'Full Stack Web Engineering',
    description: 'Scalable web architecture using Next.js, Node.js, and modern TypeScript.',
  },
  {
    title: 'ERP Solutions',
    description: 'Deepened customization and module architecture within Odoo ecosystems.',
  },
  {
    title: 'Software Quality & Automation',
    description: 'Automated browser testing and end-to-end user flows using Playwright.',
  },
  {
    title: 'Developer Workflows',
    description: 'Continuous integration concepts, Git branch workflows, and API design standards.',
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];
