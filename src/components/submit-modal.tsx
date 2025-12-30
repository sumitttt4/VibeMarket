'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User } from '@supabase/supabase-js';
import { submitVibe } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Zap, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SubmitModalProps {
    children: React.ReactNode;
    user: User | null;
}

export function SubmitModal({ children, user }: SubmitModalProps) {
    const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        live_url: '',
        tool: '',
        tags: '',
        logo_url: '',
        key_features: '',
        plan: 'free' as 'free' | 'paid'
    });

    const [activeTab, setActiveTab] = useState<'launch' | 'list'>('launch');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (plan: 'free' | 'paid') => {
        setIsLoading(true);
        try {
            const result = await submitVibe({
                title: formData.title,
                description: formData.description,
                live_url: formData.live_url,
                tool: formData.tool,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                logo_url: formData.logo_url || null,
                key_features: formData.key_features.split(',').map(f => f.trim()).filter(Boolean),
                plan: plan,
                votes: 0
            });

            if (result.success) {
                if (plan === 'paid') {
                    setStep(4);
                    setFormData({
                        title: '',
                        description: '',
                        live_url: '',
                        tool: '',
                        tags: '',
                        logo_url: '',
                        key_features: '',
                        plan: 'free'
                    });
                    router.refresh();
                } else {
                    setStep(3);
                    setFormData({
                        title: '',
                        description: '',
                        live_url: '',
                        tool: '',
                        tags: '',
                        logo_url: '',
                        key_features: '',
                        plan: 'free'
                    });
                    router.refresh();
                }
            } else {
                alert(result.error || 'Failed to submit');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const showAuthStep = !user;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild id="submit-trigger">
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-[#F9F9F7] border-none text-[#1A1A1A]">
                <div className="p-0">
                    {/* Header Tabs (StartupRanked style) */}
                    {!showAuthStep && (step === 1 || step === 2) && (
                        <div className="flex border-b border-zinc-200">
                            <button
                                onClick={() => setActiveTab('launch')}
                                className={cn(
                                    "flex-1 py-5 px-6 flex items-center justify-center gap-3 transition-all",
                                    activeTab === 'launch' ? "bg-white border-b-2 border-b-[#1F5E63]" : "bg-zinc-50 text-zinc-400"
                                )}
                            >
                                <Zap className={cn("w-5 h-5", activeTab === 'launch' ? "text-[#1F5E63]" : "text-zinc-300")} />
                                <div className="text-left">
                                    <div className="font-bold text-sm">Launch It</div>
                                    <div className="text-[10px] leading-tight opacity-70">Schedule a launch week</div>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('list')}
                                className={cn(
                                    "flex-1 py-5 px-6 flex items-center justify-center gap-3 transition-all",
                                    activeTab === 'list' ? "bg-white border-b-2 border-b-[#1F5E63]" : "bg-zinc-50 text-zinc-400"
                                )}
                            >
                                <Check className={cn("w-5 h-5", activeTab === 'list' ? "text-[#1F5E63]" : "text-zinc-300")} />
                                <div className="text-left">
                                    <div className="font-bold text-sm">List It</div>
                                    <div className="text-[10px] leading-tight opacity-70">Add to directory directly</div>
                                </div>
                            </button>
                        </div>
                    )}

                    <div className="p-8">
                        <DialogHeader className="mb-8">
                            <DialogTitle className="text-3xl font-serif font-bold tracking-tight text-center">
                                {step === 1 ? (showAuthStep ? 'First, let\'s get you in' : 'Add Vibe') :
                                    step === 2 ? 'The Pitch' :
                                        step === 3 ? 'Vibe Received!' :
                                            step === 4 ? 'Complete Payment' :
                                                'Choose Your Launch'}
                            </DialogTitle>
                        </DialogHeader>

                        {showAuthStep ? (
                            <div className="flex flex-col items-center gap-4 py-8">
                                <p className="text-zinc-600 text-center mb-6 max-w-sm">
                                    Experience the center of the vibe-coding movement. Log in to start sharing your work.
                                </p>
                                <Button
                                    onClick={() => router.push('/signin?next=/')}
                                    className="w-full h-12 bg-[#1A1A1A] text-white hover:bg-zinc-800 text-base font-semibold"
                                >
                                    Log in to Continue
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-zinc-400">Product Name</Label>
                                                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Acme AI" className="h-12 bg-white border-zinc-200 focus:ring-[#1F5E63]" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="logo_url" className="text-xs font-bold uppercase tracking-widest text-zinc-400">Logo URL (Optional)</Label>
                                                <Input id="logo_url" name="logo_url" value={formData.logo_url} onChange={handleInputChange} placeholder="https://..." className="h-12 bg-white border-zinc-200" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="live_url" className="text-xs font-bold uppercase tracking-widest text-zinc-400">Website URL</Label>
                                            <Input id="live_url" name="live_url" value={formData.live_url} onChange={handleInputChange} placeholder="https://yourproduct.com" className="h-12 bg-white border-zinc-200" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tool" className="text-xs font-bold uppercase tracking-widest text-zinc-400">Built With</Label>
                                            <Select onValueChange={(val) => setFormData({ ...formData, tool: val })} value={formData.tool}>
                                                <SelectTrigger className="h-12 bg-white border-zinc-200">
                                                    <SelectValue placeholder="Select a tool" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="v0">v0.dev</SelectItem>
                                                    <SelectItem value="lovable">Lovable</SelectItem>
                                                    <SelectItem value="bolt">Bolt.new</SelectItem>
                                                    <SelectItem value="cursor">Cursor</SelectItem>
                                                    <SelectItem value="replit">Replit</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button
                                            onClick={() => setStep(2)}
                                            className="w-full h-12 mt-6 bg-[#1F5E63] hover:bg-[#164e52] text-white text-base font-bold shadow-lg"
                                            disabled={!formData.title || !formData.live_url || !formData.tool}
                                        >
                                            Next: Add Details
                                        </Button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-zinc-400">Short Description</Label>
                                            <Input id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="A brief one-liner about your product" className="h-12 bg-white border-zinc-200" maxLength={100} />
                                            <div className="text-[10px] text-zinc-400 text-right">{formData.description.length}/100 characters</div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="key_features" className="text-xs font-bold uppercase tracking-widest text-zinc-400">Key Features (comma-separated)</Label>
                                            <Input id="key_features" name="key_features" value={formData.key_features} onChange={handleInputChange} placeholder="Analytics, API, Automation" className="h-12 bg-white border-zinc-200" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tags" className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tags</Label>
                                            <Input id="tags" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="productivity, ai, design" className="h-12 bg-white border-zinc-200" />
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 font-bold">Back</Button>
                                            <Button
                                                onClick={() => setStep(5)}
                                                className="flex-[2] h-12 bg-[#1F5E63] hover:bg-[#164e52] text-white font-bold shadow-md"
                                            >
                                                Choose Launch Plan
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {step === 5 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Free Plan */}
                                        <div className="relative p-6 rounded-2xl border-2 border-zinc-200 bg-white hover:border-[#1F5E63]/30 transition-all cursor-pointer group"
                                            onClick={() => handleSubmit('free')}>
                                            <h3 className="font-bold text-xl mb-1 text-zinc-900">Standard</h3>
                                            <p className="text-3xl font-serif font-bold mb-6 text-zinc-900">$0</p>

                                            <ul className="space-y-3 text-sm text-zinc-500 mb-8">
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-zinc-300" />
                                                    7-day review queue
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-zinc-300" />
                                                    Basic visibility
                                                </li>
                                            </ul>

                                            <Button variant="outline" className="w-full h-11 border-zinc-200 font-bold group-hover:bg-[#1F5E63] group-hover:text-white group-hover:border-[#1F5E63] transition-colors" disabled={isLoading}>
                                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Select Standard'}
                                            </Button>
                                        </div>

                                        {/* Paid Plan */}
                                        <div className="relative p-6 rounded-2xl border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-2xl cursor-pointer group hover:scale-[1.02] transition-all"
                                            onClick={() => handleSubmit('paid')}>
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                Recommended
                                            </div>

                                            <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                                                Skip the Hustle
                                                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            </h3>
                                            <p className="text-3xl font-serif font-bold mb-6 text-white">$10 <span className="text-xs font-sans font-normal text-zinc-400">/ forever</span></p>

                                            <ul className="space-y-3 text-sm text-zinc-400 mb-8">
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-white font-medium">Instant Review (24h)</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-white font-medium">First-Row Placement</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <Check className="w-4 h-4 text-yellow-400" />
                                                    Featured Badge
                                                </li>
                                            </ul>

                                            <Button className="w-full h-11 bg-white text-black hover:bg-zinc-100 font-bold shadow-md" disabled={isLoading}>
                                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get Started'}
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="text-center py-10 space-y-8 animate-in fade-in zoom-in duration-300">
                                        <div className="mx-auto w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-[#1F5E63]">
                                            <Check className="w-10 h-10" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-serif font-bold">Vibe Received!</h3>
                                            <p className="text-zinc-500 max-w-xs mx-auto">
                                                Your masterpiece is now in our review queue.
                                            </p>
                                        </div>

                                        <div className="p-5 bg-white border border-zinc-200 rounded-2xl text-sm shadow-sm">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-zinc-400 font-medium">STATUS</span>
                                                <span className="text-amber-600 font-bold px-2 py-0.5 bg-amber-50 rounded text-[10px]">PENDING</span>
                                            </div>
                                            <p className="text-center text-zinc-600 leading-relaxed font-serif italic">
                                                "Good things take time. Expect a 7-day wait."
                                            </p>
                                        </div>

                                        <div className="space-y-3 pt-4">
                                            <Button
                                                onClick={() => {
                                                    setOpen(false);
                                                    setStep(1);
                                                }}
                                                className="w-full h-12 bg-[#1A1A1A] text-white hover:bg-zinc-800 font-bold"
                                            >
                                                Back to Feed
                                            </Button>

                                            <button
                                                onClick={() => setStep(5)}
                                                className="text-xs font-bold text-[#1F5E63] hover:underline"
                                            >
                                                WAIT, I WANT TO SKIP THE QUEUE!
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="text-center py-10 space-y-8 animate-in fade-in zoom-in duration-300">
                                        <div className="mx-auto w-20 h-20 bg-[#1F5E63]/10 rounded-full flex items-center justify-center text-[#1F5E63]">
                                            <Zap className="w-10 h-10 fill-[#1F5E63]" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-serif font-bold">Nearly There!</h3>
                                            <p className="text-zinc-500 max-w-xs mx-auto">
                                                Activate your <span className="font-bold text-[#1A1A1A]">First-Row</span> placement by completing payment.
                                            </p>
                                        </div>

                                        <div className="p-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl shadow-lg">
                                            <div className="bg-white p-5 rounded-xl text-center">
                                                <div className="flex items-center justify-between text-xs font-extrabold text-zinc-400 mb-4 tracking-tighter uppercase">
                                                    <span>UPGRADE</span>
                                                    <span>ACTIVE</span>
                                                </div>
                                                <p className="text-zinc-900 font-serif text-lg leading-snug">
                                                    Your project is live in <strong>24 hours</strong> <br />
                                                    post-verification.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-4">
                                            <a
                                                href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex w-full h-12 items-center justify-center rounded-md bg-[#1F5E63] text-white hover:bg-[#164e52] font-bold shadow-xl"
                                                onClick={() => setOpen(false)}
                                            >
                                                Complete Payment ($10)
                                            </a>

                                            <button
                                                onClick={() => setOpen(false)}
                                                className="text-sm font-bold text-zinc-400 hover:text-zinc-600"
                                            >
                                                I'll pay later
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
