'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/lib/types';
import { ToolBadge } from '@/components/tool-badge';
import { CountryBadge } from '@/components/country-badge';
import { VerifiedBadge } from '@/components/verified-badge';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
    className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
    return (
        <Link href={`/project/${project.id}`}>
            <motion.article
                className={cn(
                    'group relative flex flex-col',
                    'bg-white dark:bg-zinc-900',
                    'border border-zinc-200 dark:border-zinc-800',
                    'rounded-xl overflow-hidden',
                    'transition-all duration-200',
                    'hover:border-zinc-300 dark:hover:border-zinc-700',
                    'hover:shadow-md',
                    className
                )}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
            >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <Image
                        src={project.thumbnail}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Verified indicator - subtle */}
                    {project.isVerified && (
                        <div className="absolute top-2.5 right-2.5">
                            <VerifiedBadge size="sm" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                    {/* Name */}
                    <h3 className="font-medium text-foreground group-hover:text-deep-teal transition-colors mb-1 leading-tight">
                        {project.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                        {project.tagline}
                    </p>

                    {/* Footer: Relevance info */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
                        {/* Country Relevance - Primary */}
                        <div className="flex -space-x-1.5 overflow-hidden p-0.5">
                            {project.countries.slice(0, 3).map(code => (
                                <CountryBadge key={code} code={code} size="sm" className="ring-2 ring-white dark:ring-zinc-900" />
                            ))}
                            {project.countries.length > 3 && (
                                <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 ring-2 ring-white dark:ring-zinc-900 flex items-center justify-center text-[9px] font-medium text-muted-foreground">
                                    +{project.countries.length - 3}
                                </div>
                            )}
                        </div>

                        {/* Tool - Secondary, subtle */}
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
                            {project.tool}
                        </span>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}

// Grid container for project cards
interface ProjectGridProps {
    projects: Project[];
    className?: string;
}

export function ProjectGrid({ projects, className }: ProjectGridProps) {
    return (
        <div
            className={cn(
                'grid gap-4',
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                className
            )}
        >
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <ProjectCard project={project} />
                </motion.div>
            ))}
        </div>
    );
}
