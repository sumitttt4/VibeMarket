import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        // Default - Deep Teal
        default:
          "border-transparent bg-deep-teal text-white",
        // Vibe-Verified Badge - Premium Gradient
        verified:
          "border-neo-mint/60 bg-gradient-to-r from-neo-mint-50 to-neo-mint-100 text-deep-teal font-medium shadow-sm",
        // Secondary - Subtle Neo Mint
        secondary:
          "border-transparent bg-neo-mint/20 text-deep-teal",
        // Destructive
        destructive:
          "border-transparent bg-destructive/10 text-destructive",
        // Outline
        outline:
          "text-foreground border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm",
        // Tech Stack Tag
        tech:
          "border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[10px] tracking-tight",
        // Prompt DNA Badge
        dna:
          "border-deep-teal/30 bg-deep-teal/5 text-deep-teal font-mono text-[10px] tracking-tight",
        // Status Badges
        success:
          "border-transparent bg-neo-mint/20 text-deep-teal-600",
        warning:
          "border-transparent bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
        info:
          "border-transparent bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
