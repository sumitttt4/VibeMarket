import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        // VibeMarket Primary - Deep Teal
        default:
          "bg-deep-teal text-white hover:bg-deep-teal-600 shadow-md shadow-deep-teal/20 hover:shadow-lg hover:shadow-deep-teal/25 active:scale-[0.98]",
        // Neo Mint Accent
        accent:
          "bg-neo-mint text-deep-teal-700 hover:bg-neo-mint-300 shadow-md shadow-neo-mint/25 active:scale-[0.98]",
        // Destructive
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-md shadow-destructive/20 active:scale-[0.98]",
        // Outline with Glassmorphism
        outline:
          "border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600",
        // Secondary - Subtle
        secondary:
          "bg-neo-mint/20 text-deep-teal border border-neo-mint/50 hover:bg-neo-mint/30 hover:border-neo-mint active:scale-[0.98]",
        // Ghost
        ghost:
          "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground",
        // Link Style
        link: "text-deep-teal underline-offset-4 hover:underline",
        // Magnetic - Premium Interactive
        magnetic:
          "bg-gradient-to-r from-deep-teal to-deep-teal-400 text-white shadow-lg shadow-deep-teal/30 hover:shadow-xl hover:shadow-deep-teal/40 active:scale-[0.98] transition-all duration-300",
      },
      size: {
        // Nova Style - Compact, reduced padding
        default: "h-9 px-4 py-2",
        sm: "h-7 rounded-md gap-1 px-2.5 text-xs",
        lg: "h-10 rounded-xl px-5",
        xl: "h-12 rounded-xl px-6 text-base",
        icon: "size-9",
        "icon-sm": "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  haptic?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  haptic = false,
  onClick,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger haptic feedback on supported devices
    if (haptic && typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10)
    }
    onClick?.(e)
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    />
  )
}

export { Button, buttonVariants }
