'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { signInWithMagicLink } from '@/app/auth/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, Mail, CheckCircle2 } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[#1F5E63] text-white hover:bg-[#164e52] h-10 py-2 px-4"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending link...
                </>
            ) : (
                <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Magic Link
                </>
            )}
        </button>
    );
}

export function AuthForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    async function handleMagicLink(formData: FormData) {
        setError(null);
        setSuccess(false);

        const email = formData.get('email') as string;
        if (!email) {
            setError('Please enter a valid email address.');
            return;
        }

        const result = await signInWithMagicLink(email);

        if (result?.error) {
            setError(result.error);
        } else {
            setSuccess(true);
        }
    }

    if (success) {
        return (
            <Card className="w-full max-w-md border-zinc-200 bg-white shadow-xl">
                <CardHeader className="space-y-4 text-center pb-8">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-serif">Check your inbox</CardTitle>
                    <CardDescription className="text-base text-zinc-600">
                        We sent a magic link to your email. Click it to sign in instantly.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col space-y-4 border-t border-zinc-100 pt-6 bg-zinc-50/50 rounded-b-xl">
                    <div className="text-sm text-center">
                        <Link href="/signin" onClick={() => setSuccess(false)} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                            ← Try a different email
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md border-zinc-200 bg-white shadow-xl">
            <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-2xl font-serif font-normal">Welcome to VibeMarket</CardTitle>
                <CardDescription className="text-base">Sign in with a magic link to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleMagicLink} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="sr-only">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className="bg-white border-zinc-200 h-11 text-base placeholder:text-zinc-400"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-600">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <SubmitButton />
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t border-zinc-100 pt-6 bg-zinc-50/50 rounded-b-xl">
                <div className="text-sm text-muted-foreground text-center px-4">
                    By clicking continue, you agree to our{' '}
                    <a href="#" className="underline hover:text-foreground decoration-zinc-400 underline-offset-2">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="underline hover:text-foreground decoration-zinc-400 underline-offset-2">
                        Privacy Policy
                    </a>.
                </div>
                <div className="text-sm text-center">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                        ← Back to home
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
