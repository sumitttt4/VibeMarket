// ============================================
// VIBEMARKET TYPE DEFINITIONS
// ============================================

// Vibe-coded tools (hard constraint)
export type VibeTool =
    | 'v0'
    | 'lovable'
    | 'cursor'
    | 'bolt'
    | 'replit'
    | 'other';

export const VIBE_TOOLS: Record<VibeTool, { name: string; color: string }> = {
    v0: { name: 'v0', color: '#000000' },
    lovable: { name: 'Lovable', color: '#FF6B6B' },
    cursor: { name: 'Cursor', color: '#00D4AA' },
    bolt: { name: 'Bolt', color: '#FFD700' },
    replit: { name: 'Replit', color: '#F26207' },
    other: { name: 'Other', color: '#71717A' },
};

// Geographic relevance
export interface Country {
    code: string;
    name: string;
    flag: string;
}

// Use cases for discovery
export type UseCase =
    | 'productivity'
    | 'design'
    | 'developer-tools'
    | 'marketing'
    | 'finance'
    | 'education'
    | 'health'
    | 'entertainment'
    | 'ecommerce'
    | 'social'
    | 'other';

export const USE_CASES: Record<UseCase, { label: string }> = {
    'productivity': { label: 'Productivity' },
    'design': { label: 'Design' },
    'developer-tools': { label: 'Developer Tools' },
    'marketing': { label: 'Marketing' },
    'finance': { label: 'Finance' },
    'education': { label: 'Education' },
    'health': { label: 'Health' },
    'entertainment': { label: 'Entertainment' },
    'ecommerce': { label: 'E-Commerce' },
    'social': { label: 'Social' },
    'other': { label: 'Other' },
};

// Creator info
export interface Creator {
    name: string;
    avatar: string;
    twitter?: string;
    github?: string;
}

// Project structure
export interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    thumbnail: string;

    // Discovery filters
    tool: VibeTool;
    countries: string[];      // Country codes
    useCase: UseCase;
    categories: string[];
    techStack: string[];

    // Links
    demoUrl: string;
    githubUrl?: string;

    // Creator
    creator: Creator;

    // Metrics (secondary)
    upvotes: number;

    // Verification
    isVerified: boolean;
    verifiedAt?: string;

    // Timestamps
    submittedAt: string;
    listedAt?: string;
}

// Filter state
export interface DiscoveryFilters {
    country: string | null;
    useCase: UseCase | null;
    tool: VibeTool | null;
    category: string | null;
}
