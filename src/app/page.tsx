"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Sparkles,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ProjectGrid } from "@/components/project-card";
import { MOCK_PROJECTS, filterProjects } from "@/lib/data";
import { COUNTRIES } from "@/lib/countries";
import { USE_CASES, UseCase } from "@/lib/types";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

export default function Home() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

    // Filter projects based on selection
    const filteredProjects = filterProjects(MOCK_PROJECTS, {
        country: selectedCountry,
        useCase: selectedUseCase,
    }).slice(0, 6);

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-limestone/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-deep-teal to-neo-mint flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-semibold text-foreground">VibeMarket</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/discover"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Discover
                        </Link>
                        <Link
                            href="/submit"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Submit
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            About
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hidden sm:flex">
                            Sign In
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/submit">Submit project</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Refined for clarity */}
            <motion.section
                className="pt-32 pb-20 px-4 sm:px-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-2xl mx-auto text-center">
                    {/* Primary Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-foreground leading-[1.1] tracking-tight mb-5"
                    >
                        A discovery layer for{" "}
                        <span className="text-deep-teal">vibe-coded apps</span>
                    </motion.h1>

                    {/* Secondary Explanation */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed"
                    >
                        Find AI-built tools by country, use case, and how they were made.
                        No hype. Just fit.
                    </motion.p>

                    {/* CTAs - Browse is primary */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3"
                    >
                        <Button size="lg" asChild>
                            <Link href="/discover">Browse projects</Link>
                        </Button>
                        <Button variant="ghost" size="lg" asChild>
                            <Link href="/submit">Submit a project</Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Scope Section */}
            <section className="py-14 px-4 sm:px-6 border-y border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
                <div className="max-w-xl mx-auto text-center">
                    {/* Strong intro line */}
                    <h2 className="text-xl font-serif font-normal text-foreground mb-3">
                        Only vibe-coded projects.
                    </h2>

                    {/* Supporting explanation */}
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                        Built with AI-assisted tools like v0, Cursor, or Lovable.
                        Shipped fast. Designed with intent. No bloat.
                    </p>

                    {/* Tool list - minimal, inline */}
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <span>Built with:</span>
                        <span className="font-mono text-foreground">v0</span>
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        <span className="font-mono text-foreground">Cursor</span>
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        <span className="font-mono text-foreground">Lovable</span>
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        <span className="font-mono text-foreground">Bolt</span>
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        <span className="font-mono text-foreground">Replit</span>
                    </div>
                </div>
            </section>

            {/* Discovery Preview Section */}
            <section className="py-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-serif font-normal text-foreground mb-2">
                            Browse by what you need
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Filter by purpose and location
                        </p>
                    </div>

                    {/* Filters - Use Case first (intent), then Country (relevance) */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                        {/* Use Case - Primary filter */}
                        <Select
                            value={selectedUseCase || 'all'}
                            onValueChange={(val) => setSelectedUseCase(val === 'all' ? null : val as UseCase)}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Any purpose" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Any purpose</SelectItem>
                                {(Object.keys(USE_CASES) as UseCase[]).slice(0, 6).map((uc) => (
                                    <SelectItem key={uc} value={uc}>
                                        {USE_CASES[uc].label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Country - Secondary filter */}
                        <Select
                            value={selectedCountry || 'all'}
                            onValueChange={(val) => setSelectedCountry(val === 'all' ? null : val)}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Any country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Any country</SelectItem>
                                {COUNTRIES.filter(c => c.code !== 'GLOBAL').slice(0, 8).map((country) => (
                                    <SelectItem key={country.code} value={country.code}>
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Project Grid */}
                    <ProjectGrid projects={filteredProjects} />

                    {/* View All CTA */}
                    <div className="text-center mt-8">
                        <Button variant="outline" asChild>
                            <Link href="/discover">
                                Browse all projects
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Who This Is For */}
            <section className="py-14 px-4 sm:px-6 bg-white/50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
                <div className="max-w-3xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* For Builders */}
                        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <h3 className="text-sm font-medium text-foreground mb-3">
                                If you build with AI tools
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>Get listed without competing globally</li>
                                <li>Reach users who need what you built</li>
                                <li>Skip the Product Hunt hustle</li>
                            </ul>
                        </div>

                        {/* For Discoverers */}
                        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <h3 className="text-sm font-medium text-foreground mb-3">
                                If you're looking for tools
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>Find apps relevant to your country</li>
                                <li>Filter by what you actually need</li>
                                <li>No ads, no algorithm, no noise</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Stats */}
            <section className="py-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-semibold text-foreground">247</div>
                            <div className="text-xs text-muted-foreground">Projects listed</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-foreground">18</div>
                            <div className="text-xs text-muted-foreground">Countries</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold text-foreground">5</div>
                            <div className="text-xs text-muted-foreground">Vibe tools</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-deep-teal to-neo-mint flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                                VibeMarket
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                                About
                            </a>
                            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                                Twitter
                            </a>
                        </div>

                        {/* Copyright */}
                        <p className="text-xs text-muted-foreground">
                            © 2024 VibeMarket
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
