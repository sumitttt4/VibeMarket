"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/filter-bar";
import { ProjectGrid } from "@/components/project-card";
import { MOCK_PROJECTS, filterProjects, getCategories } from "@/lib/data";
import { UseCase, VibeTool } from "@/lib/types";

export default function DiscoverPage() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
    const [selectedTool, setSelectedTool] = useState<VibeTool | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Get all categories from projects
    const categories = useMemo(() => getCategories(MOCK_PROJECTS), []);

    // Filter projects based on selections
    const filteredProjects = useMemo(() => {
        return filterProjects(MOCK_PROJECTS, {
            country: selectedCountry,
            useCase: selectedUseCase,
            tool: selectedTool,
            category: selectedCategory,
        });
    }, [selectedCountry, selectedUseCase, selectedTool, selectedCategory]);

    const hasFilters = selectedCountry || selectedUseCase || selectedTool || selectedCategory;

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
                            className="text-sm text-foreground font-medium"
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

            {/* Page Content */}
            <main className="pt-20 pb-16 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-2xl font-semibold text-foreground mb-2">
                            Discover Projects
                        </h1>
                        <p className="text-muted-foreground">
                            Find AI-built tools by country, use case, and how they were made.
                        </p>
                    </motion.div>

                    {/* Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mb-8"
                    >
                        <FilterBar
                            selectedCountry={selectedCountry}
                            selectedUseCase={selectedUseCase}
                            selectedTool={selectedTool}
                            selectedCategory={selectedCategory}
                            categories={categories}
                            onCountryChange={setSelectedCountry}
                            onUseCaseChange={setSelectedUseCase}
                            onToolChange={setSelectedTool}
                            onCategoryChange={setSelectedCategory}
                        />
                    </motion.div>

                    {/* Results Summary */}
                    <motion.div
                        className="mb-6 flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-sm text-muted-foreground">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
                            {hasFilters && " with current filters"}
                        </p>
                    </motion.div>

                    {/* Project Grid */}
                    {filteredProjects.length > 0 ? (
                        <ProjectGrid projects={filteredProjects} />
                    ) : (
                        <motion.div
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                No projects found
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                Try adjusting your filters to see more results.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedCountry(null);
                                    setSelectedUseCase(null);
                                    setSelectedTool(null);
                                    setSelectedCategory(null);
                                }}
                            >
                                Clear all filters
                            </Button>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800">
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
                        <p className="text-xs text-muted-foreground">
                            © 2024 VibeMarket. Discovery, not hype.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
