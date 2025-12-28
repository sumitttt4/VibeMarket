"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Sparkles,
    ArrowLeft,
    ExternalLink,
    Github,
    Twitter,
    Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolBadge } from "@/components/tool-badge";
import { CountryBadge } from "@/components/country-badge";
import { VerifiedBadge } from "@/components/verified-badge";
import { MOCK_PROJECTS } from "@/lib/data";
import { USE_CASES } from "@/lib/types";
import { notFound } from "next/navigation";

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const { id } = use(params);
    const project = MOCK_PROJECTS.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    const useCaseInfo = USE_CASES[project.useCase];

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-limestone/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/discover"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back to Discover</span>
                        </Link>
                    </div>

                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-deep-teal to-neo-mint flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-semibold text-foreground hidden sm:inline">
                            VibeMarket
                        </span>
                    </Link>

                    <Button size="sm" asChild>
                        <Link href="/submit">Submit project</Link>
                    </Button>
                </div>
            </nav>

            {/* Page Content */}
            <main className="pt-20 pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Project Header */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Thumbnail */}
                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6 overflow-hidden relative">
                            <Image
                                src={project.thumbnail}
                                alt={project.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 896px) 100vw, 896px"
                                priority
                            />
                        </div>

                        {/* Title Row */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-semibold text-foreground">
                                        {project.name}
                                    </h1>
                                    {project.isVerified && <VerifiedBadge size="md" />}
                                </div>
                                <p className="text-lg text-muted-foreground">{project.tagline}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 shrink-0">
                                <Button asChild>
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Visit demo
                                    </a>
                                </Button>
                                {project.githubUrl && (
                                    <Button variant="outline" asChild>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Github className="w-4 h-4" />
                                            View source
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center gap-3">
                            <ToolBadge tool={project.tool} size="md" />
                            <span className="text-zinc-300 dark:text-zinc-700">•</span>
                            <span className="text-sm text-muted-foreground">
                                {useCaseInfo.label}
                            </span>
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <motion.div
                            className="md:col-span-2 space-y-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            {/* What it does */}
                            <section>
                                <h2 className="text-sm font-medium text-foreground uppercase tracking-wider mb-3">
                                    What it does
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>
                            </section>

                            {/* Who it's for */}
                            <section>
                                <h2 className="text-sm font-medium text-foreground uppercase tracking-wider mb-3">
                                    Who it's for
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {project.useCase === "finance" &&
                                        "Freelancers, small business owners, and anyone who needs to create professional documents quickly without complex software."}
                                    {project.useCase === "design" &&
                                        "Designers, developers, and creative professionals looking to speed up their workflow with AI-powered tools."}
                                    {project.useCase === "developer-tools" &&
                                        "Developers and engineers who want to automate repetitive tasks and improve their development workflow."}
                                    {project.useCase === "productivity" &&
                                        "Professionals and individuals looking to optimize their time and stay focused on what matters."}
                                    {project.useCase === "marketing" &&
                                        "Marketers, founders, and business professionals who need to create compelling content quickly."}
                                    {project.useCase === "education" &&
                                        "Students, teachers, and lifelong learners who want personalized, AI-assisted learning experiences."}
                                    {project.useCase === "health" &&
                                        "Individuals and families looking to manage their health and wellness more effectively."}
                                    {project.useCase === "ecommerce" &&
                                        "Small business owners, creators, and entrepreneurs looking to sell online without complexity."}
                                    {!["finance", "design", "developer-tools", "productivity", "marketing", "education", "health", "ecommerce"].includes(project.useCase) &&
                                        "Anyone looking for a focused, well-designed tool that solves a specific problem."}
                                </p>
                            </section>

                            {/* Tech Stack */}
                            <section>
                                <h2 className="text-sm font-medium text-foreground uppercase tracking-wider mb-3">
                                    How it was built
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 text-sm font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-700"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            {/* Where it's relevant */}
                            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Where it's relevant
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.countries.map((code) => (
                                        <CountryBadge key={code} code={code} showName size="md" />
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.categories.map((cat) => (
                                        <span
                                            key={cat}
                                            className="px-2.5 py-1 text-xs text-muted-foreground bg-zinc-100 dark:bg-zinc-800 rounded-md"
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Creator */}
                            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Created by
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-teal/20 to-neo-mint/20 flex items-center justify-center text-lg font-medium text-deep-teal">
                                        {project.creator.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">
                                            {project.creator.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {project.creator.twitter && (
                                                <a
                                                    href={`https://twitter.com/${project.creator.twitter.replace("@", "")}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                                                >
                                                    <Twitter className="w-3 h-3" />
                                                    {project.creator.twitter}
                                                </a>
                                            )}
                                            {project.creator.github && (
                                                <a
                                                    href={`https://github.com/${project.creator.github}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                                                >
                                                    <Github className="w-3 h-3" />
                                                    {project.creator.github}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Listing Date */}
                            {project.listedAt && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    Listed {new Date(project.listedAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-deep-teal to-neo-mint flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                                VibeMarket
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            © 2024 VibeMarket
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
