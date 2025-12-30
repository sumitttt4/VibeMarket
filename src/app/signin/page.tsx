import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuthForm } from "@/components/auth-form";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Simple Header */}
            <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-deep-teal to-neo-mint flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-semibold text-foreground">VibeMarket</span>
                    </Link>
                </div>
            </header>

            {/* Auth Form */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <AuthForm />
            </main>
        </div>
    );
}
