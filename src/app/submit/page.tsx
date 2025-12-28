"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Check, Copy, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries";
import { USE_CASES, VIBE_TOOLS, UseCase, VibeTool } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function SubmitPage() {
    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        description: "",
        targetAudience: "",
        countries: [] as string[],
        tool: "" as VibeTool | "",
        useCase: "" as UseCase | "",
        basePrompt: "",
        refinementSequence: "",
        demoUrl: "",
        creatorName: "",
        creatorTwitter: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const toggleCountry = (code: string) => {
        setFormData((prev) => ({
            ...prev,
            countries: prev.countries.includes(code)
                ? prev.countries.filter((c) => c !== code)
                : [...prev.countries, code],
        }));
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    className="max-w-sm w-full text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="w-12 h-12 rounded-full bg-deep-teal/10 flex items-center justify-center mx-auto mb-5">
                        <Check className="w-6 h-6 text-deep-teal" />
                    </div>
                    <h1 className="text-xl font-serif text-foreground mb-2">
                        DNA received
                    </h1>
                    <p className="text-sm text-muted-foreground mb-6">
                        We're auditing your prompt logic now.
                        If it meets the Vibe Check, you'll be live in 48 hours.
                    </p>
                    <Button variant="outline" asChild>
                        <Link href="/discover">Back to gallery</Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-limestone/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Link>

                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-deep-teal to-neo-mint flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-semibold text-foreground">VibeMarket</span>
                    </Link>

                    <div className="w-16" />
                </div>
            </nav>

            <main className="pt-24 pb-16 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-serif font-normal text-foreground mb-3">
                            Submit your Prompt DNA
                        </h1>
                        <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                            We don't just list apps. We index the intent behind them.
                            Share your prompt logic so others can learn and remix.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.form
                            className="md:col-span-2 space-y-10"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            {/* 1. Core Identity */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                    <span className="text-xs font-mono text-muted-foreground">01</span>
                                    <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
                                        Core Identity
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            Project Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                                            placeholder="e.g. InvoiceNinja"
                                            className="w-full px-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            The Hook (Tagline)
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.tagline}
                                            onChange={(e) => setFormData((p) => ({ ...p, tagline: e.target.value }))}
                                            placeholder="One sentence that sells the utility."
                                            maxLength={100}
                                            className="w-full px-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            How was it built?
                                        </label>
                                        <Select
                                            value={formData.tool || undefined}
                                            onValueChange={(val) => setFormData((p) => ({ ...p, tool: val as VibeTool }))}
                                        >
                                            <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                                <SelectValue placeholder="Select tool..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(Object.keys(VIBE_TOOLS) as VibeTool[]).map((tool) => (
                                                    <SelectItem key={tool} value={tool}>
                                                        {VIBE_TOOLS[tool].name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </section>

                            {/* 2. The Prompt DNA */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                    <span className="text-xs font-mono text-muted-foreground">02</span>
                                    <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
                                        The Logic (Open Source Intent)
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center justify-between">
                                            Base Prompt
                                            <span className="text-[10px] font-normal text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                                                Required
                                            </span>
                                        </label>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            The initial instruct you gave to v0/Cursor.
                                        </p>
                                        <textarea
                                            required
                                            value={formData.basePrompt}
                                            onChange={(e) => setFormData((p) => ({ ...p, basePrompt: e.target.value }))}
                                            placeholder="e.g. Create a dashboard for tracking SaaS metrics..."
                                            rows={6}
                                            className="w-full px-3 py-2.5 text-sm font-mono bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal transition-all resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            Refinement Sequence (Optional)
                                        </label>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            Key follow-up prompts that fixed bugs or polished the UI.
                                        </p>
                                        <textarea
                                            value={formData.refinementSequence}
                                            onChange={(e) => setFormData((p) => ({ ...p, refinementSequence: e.target.value }))}
                                            placeholder="- Make the buttons rounded...&#10;- Fix the mobile responsiveness..."
                                            rows={4}
                                            className="w-full px-3 py-2.5 text-sm font-mono bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* 3. Proof of Work */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                    <span className="text-xs font-mono text-muted-foreground">03</span>
                                    <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">
                                        Proof of Work
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            Live Demo URL
                                        </label>
                                        <input
                                            type="url"
                                            required
                                            value={formData.demoUrl}
                                            onChange={(e) => setFormData((p) => ({ ...p, demoUrl: e.target.value }))}
                                            placeholder="https://..."
                                            className="w-full px-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">
                                            Vibe Engineer Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.creatorName}
                                            onChange={(e) => setFormData((p) => ({ ...p, creatorName: e.target.value }))}
                                            placeholder="Your name"
                                            className="w-full px-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-deep-teal/20 focus:border-deep-teal transition-all"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Submit Action */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-12 text-base font-medium"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Uploading DNA..." : "Submit for Audit"}
                                </Button>
                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    By submitting, you agree to open-source your prompt logic under current Remix terms.
                                </p>
                            </div>
                        </motion.form>

                        {/* Sidebar Logic */}
                        <motion.aside
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            {/* The Vibe Check */}
                            <div className="p-5 rounded-xl bg-limestone-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 mb-3">
                                    <Code2 className="w-4 h-4 text-deep-teal" />
                                    <h3 className="text-sm font-serif font-medium text-foreground">
                                        The Vibe Check
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    We don't accept generic wrapper apps. We look for:
                                </p>
                                <ul className="space-y-2.5 text-xs text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <Check className="w-3.5 h-3.5 text-deep-teal shrink-0 mt-0.5" />
                                        <span>Clean, agency-grade aesthetic</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-3.5 h-3.5 text-deep-teal shrink-0 mt-0.5" />
                                        <span>Novel prompt engineering</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-3.5 h-3.5 text-deep-teal shrink-0 mt-0.5" />
                                        <span>Instant utility (no login walls)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Remix Culture */}
                            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 mb-3">
                                    <Copy className="w-4 h-4 text-muted-foreground" />
                                    <h3 className="text-sm font-serif font-medium text-foreground">
                                        Remix Culture
                                    </h3>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Your prompt logic becomes part of the shared VibeMarket DNA.
                                    When others remix your code, you get permanent credit and a backlink.
                                </p>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
