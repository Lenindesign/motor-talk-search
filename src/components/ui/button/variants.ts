import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl typography-button2 font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Black variants
        solid: "bg-neutral-1 text-white hover:bg-neutral-2 active:bg-neutral-3 shadow-sm",
        'solid-light': "bg-neutral-2 text-white hover:bg-neutral-3 active:bg-neutral-4 shadow-sm",
        'outline-black': "border-2 border-neutral-1 bg-transparent text-neutral-1 hover:bg-neutral-1 hover:text-white active:bg-neutral-2",
        'ghost-black': "text-neutral-1 hover:bg-neutral-8 active:bg-neutral-7",
        minimal: "bg-transparent text-neutral-2 hover:text-neutral-1 active:bg-neutral-8",
        // Red variants
        'solid-red': "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
        'solid-red-light': "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm",
        'outline-red': "border-2 border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white active:bg-red-700",
        'ghost-red': "text-red-600 hover:bg-red-50 active:bg-red-100",
        // Primary variants
        'solid-primary': "bg-primary text-white hover:bg-primary-hover active:shadow-inner shadow-sm",
        'solid-primary-light': "bg-primary-light text-white hover:bg-primary active:shadow-inner shadow-sm",
        'outline-primary': "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white active:bg-primary-hover",
        'ghost-primary': "text-primary hover:bg-neutral-8 active:bg-neutral-7",
        // Legacy variants (for backward compatibility)
        default: "bg-primary text-white hover:bg-primary-hover active:shadow-inner shadow-sm",
        destructive: "bg-error text-white hover:bg-error/90 active:shadow-inner shadow-sm",
        outline: "border-2 border-neutral-6 bg-transparent text-neutral-1 hover:bg-neutral-7 active:bg-neutral-6",
        secondary: "bg-neutral-6 text-neutral-1 hover:bg-neutral-5 active:bg-neutral-4 shadow-sm",
        ghost: "text-neutral-1 hover:bg-neutral-7 active:bg-neutral-6",
        link: "text-info underline-offset-4 hover:underline active:text-info/80",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-sm rounded-lg",
        lg: "h-12 px-8 text-lg rounded-2xl",
        xl: "h-14 px-10 text-lg rounded-2xl",
        '2xl': "h-16 px-12 text-xl rounded-3xl",
        icon: "h-11 w-11",
        'icon-sm': "h-9 w-9 rounded-lg",
        'icon-lg': "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
