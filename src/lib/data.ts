import { Project } from './types';

// Placeholder SaaS screenshots using picsum.photos
const getPlaceholderImage = (id: number) => `https://picsum.photos/seed/saas${id}/800/500`;

// Mock projects data for development
export const MOCK_PROJECTS: Project[] = [
    {
        id: 'invoice-ninja',
        name: 'InvoiceNinja',
        tagline: 'Generate professional invoices in seconds with AI',
        description: 'A clean, fast invoicing tool that auto-fills client details, calculates taxes by region, and exports to PDF. Built for freelancers and small businesses who hate dealing with paperwork.',
        thumbnail: getPlaceholderImage(1),
        tool: 'v0',
        countries: ['IN', 'US', 'GB'],
        useCase: 'finance',
        categories: ['invoicing', 'freelance', 'business'],
        techStack: ['Next.js', 'Supabase', 'Tailwind'],
        demoUrl: 'https://invoice-ninja.demo',
        githubUrl: 'https://github.com/demo/invoice-ninja',
        creator: {
            name: 'Priya Sharma',
            avatar: '/avatars/priya.png',
            twitter: '@priya_builds',
        },
        upvotes: 234,
        isVerified: true,
        verifiedAt: '2024-12-15',
        submittedAt: '2024-12-10',
        listedAt: '2024-12-12',
    },
    {
        id: 'color-craft',
        name: 'ColorCraft',
        tagline: 'AI-powered color palette generator for designers',
        description: 'Generate beautiful, accessible color palettes from any image or text description. Includes contrast checking, export to Figma/Tailwind, and palette history.',
        thumbnail: getPlaceholderImage(2),
        tool: 'cursor',
        countries: ['GLOBAL'],
        useCase: 'design',
        categories: ['colors', 'design-tools', 'accessibility'],
        techStack: ['React', 'TypeScript', 'Tailwind'],
        demoUrl: 'https://colorcraft.demo',
        creator: {
            name: 'Alex Chen',
            avatar: '/avatars/alex.png',
            twitter: '@alexdesigns',
        },
        upvotes: 189,
        isVerified: true,
        verifiedAt: '2024-12-20',
        submittedAt: '2024-12-18',
        listedAt: '2024-12-19',
    },
    {
        id: 'chai-break',
        name: 'ChaiBreak',
        tagline: 'Pomodoro timer with Indian work culture in mind',
        description: 'A productivity timer designed for the Indian work style. Includes chai break reminders, festive themes, and syncs with your calendar for meeting-aware focus sessions.',
        thumbnail: getPlaceholderImage(3),
        tool: 'lovable',
        countries: ['IN'],
        useCase: 'productivity',
        categories: ['timer', 'focus', 'work'],
        techStack: ['Next.js', 'Framer Motion'],
        demoUrl: 'https://chaibreak.demo',
        creator: {
            name: 'Rahul Mehta',
            avatar: '/avatars/rahul.png',
            twitter: '@rahulmehta_dev',
        },
        upvotes: 312,
        isVerified: true,
        verifiedAt: '2024-12-22',
        submittedAt: '2024-12-20',
        listedAt: '2024-12-21',
    },
    {
        id: 'readme-gen',
        name: 'ReadmeGen',
        tagline: 'Beautiful READMEs from your codebase in one click',
        description: 'Point it at any GitHub repo and get a professional, well-structured README. Understands project structure, detects tech stack, and writes clear documentation.',
        thumbnail: getPlaceholderImage(4),
        tool: 'bolt',
        countries: ['US', 'DE', 'GB', 'GLOBAL'],
        useCase: 'developer-tools',
        categories: ['documentation', 'github', 'developer'],
        techStack: ['Node.js', 'OpenAI', 'Tailwind'],
        demoUrl: 'https://readmegen.demo',
        githubUrl: 'https://github.com/demo/readme-gen',
        creator: {
            name: 'Sarah Wilson',
            avatar: '/avatars/sarah.png',
            github: 'sarahwilson',
        },
        upvotes: 445,
        isVerified: true,
        verifiedAt: '2024-12-18',
        submittedAt: '2024-12-15',
        listedAt: '2024-12-16',
    },
    {
        id: 'gram-shop',
        name: 'GramShop',
        tagline: 'Turn your Instagram into a storefront',
        description: 'Connect your Instagram, import products from posts, and get a mobile-first store. Includes UPI payments for India, Stripe for global, and WhatsApp order notifications.',
        thumbnail: getPlaceholderImage(5),
        tool: 'replit',
        countries: ['IN', 'ID', 'PH', 'NG'],
        useCase: 'ecommerce',
        categories: ['instagram', 'store', 'social-commerce'],
        techStack: ['React', 'Node.js', 'MongoDB'],
        demoUrl: 'https://gramshop.demo',
        creator: {
            name: 'Fatima Khan',
            avatar: '/avatars/fatima.png',
            twitter: '@fatima_codes',
        },
        upvotes: 278,
        isVerified: false,
        submittedAt: '2024-12-23',
        listedAt: '2024-12-24',
    },
    {
        id: 'pitch-deck-ai',
        name: 'PitchDeck AI',
        tagline: 'Generate investor-ready pitch decks from a description',
        description: 'Describe your startup in plain English and get a polished pitch deck. Includes competitor analysis, market sizing, and financial projections. Export to Google Slides or PDF.',
        thumbnail: getPlaceholderImage(6),
        tool: 'v0',
        countries: ['US', 'GB', 'SG', 'AE'],
        useCase: 'marketing',
        categories: ['startup', 'presentations', 'investors'],
        techStack: ['Next.js', 'OpenAI', 'Vercel'],
        demoUrl: 'https://pitchdeckai.demo',
        creator: {
            name: 'Marcus Johnson',
            avatar: '/avatars/marcus.png',
            twitter: '@marcusj',
        },
        upvotes: 567,
        isVerified: true,
        verifiedAt: '2024-12-25',
        submittedAt: '2024-12-22',
        listedAt: '2024-12-23',
    },
    {
        id: 'study-buddy',
        name: 'StudyBuddy',
        tagline: 'AI tutor for competitive exam preparation',
        description: 'Personalized study plans for JEE, NEET, UPSC, and other Indian competitive exams. Includes practice questions, doubt solving, and progress tracking.',
        thumbnail: getPlaceholderImage(7),
        tool: 'cursor',
        countries: ['IN'],
        useCase: 'education',
        categories: ['exams', 'tutoring', 'students'],
        techStack: ['Next.js', 'Supabase', 'OpenAI'],
        demoUrl: 'https://studybuddy.demo',
        creator: {
            name: 'Ankit Verma',
            avatar: '/avatars/ankit.png',
            twitter: '@ankitbuilds',
        },
        upvotes: 423,
        isVerified: true,
        verifiedAt: '2024-12-26',
        submittedAt: '2024-12-24',
        listedAt: '2024-12-25',
    },
    {
        id: 'med-remind',
        name: 'MedRemind',
        tagline: 'Never miss your medications again',
        description: 'Simple medication reminder with family sharing. Supports Indian pharmacy names, generic alternatives lookup, and sends reminders via WhatsApp or SMS.',
        thumbnail: getPlaceholderImage(8),
        tool: 'lovable',
        countries: ['IN', 'US', 'GB'],
        useCase: 'health',
        categories: ['medication', 'reminders', 'healthcare'],
        techStack: ['React Native', 'Firebase'],
        demoUrl: 'https://medremind.demo',
        creator: {
            name: 'Dr. Neha Gupta',
            avatar: '/avatars/neha.png',
        },
        upvotes: 156,
        isVerified: false,
        submittedAt: '2024-12-26',
        listedAt: '2024-12-27',
    },
];

// Filter projects by criteria
export const filterProjects = (
    projects: Project[],
    filters: {
        country?: string | null;
        useCase?: string | null;
        tool?: string | null;
        category?: string | null;
    }
): Project[] => {
    return projects.filter(project => {
        if (filters.country && filters.country !== 'GLOBAL') {
            if (!project.countries.includes(filters.country) && !project.countries.includes('GLOBAL')) {
                return false;
            }
        }

        if (filters.useCase && project.useCase !== filters.useCase) {
            return false;
        }

        if (filters.tool && project.tool !== filters.tool) {
            return false;
        }

        if (filters.category && !project.categories.includes(filters.category)) {
            return false;
        }

        return true;
    });
};

// Get unique categories from projects
export const getCategories = (projects: Project[]): string[] => {
    const categories = new Set<string>();
    projects.forEach(p => p.categories.forEach(c => categories.add(c)));
    return Array.from(categories).sort();
};
