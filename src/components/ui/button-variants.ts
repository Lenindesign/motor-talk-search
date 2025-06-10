import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl typography-button2 font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Black/Neutral buttons
        solid: "bg-[#141416] text-white hover:bg-[#23262f] active:bg-[#353945] shadow-sm",
        "solid-light": "bg-[#23262f] text-white hover:bg-[#353945] active:bg-[#6e7481] shadow-sm",
        "outline-black": "border border-[#141416] text-[#141416] bg-transparent hover:bg-[#fcfcfd] active:bg-[#f4f5f6]",
        "ghost-black": "text-[#141416] hover:bg-[#fcfcfd] active:bg-[#f4f5f6]",
        
        // Red buttons
        "solid-red": "bg-[#c11b17] text-white hover:bg-[#e90c17] active:bg-red-800 shadow-sm",
        "solid-red-light": "bg-[#e6e8ec] text-neutral-1 hover:bg-neutral-5 active:bg-neutral-4 shadow-sm",
        "outline-red": "border border-[#c11b17] text-[#c11b17] bg-transparent hover:bg-red-50 active:bg-red-100",
        "ghost-red": "text-[#c11b17] hover:bg-red-50 active:bg-red-100",
        
        // Primary buttons (uses primary color defined in the theme)
        "solid-primary": "bg-[#c11b17] text-white hover:bg-[#e90c17] active:bg-[#e90c17] shadow-sm",
        "solid-primary-light": "bg-[#e6e8ec] text-neutral-1 hover:bg-neutral-5 active:bg-neutral-4 shadow-sm",
        "outline-primary": "border border-[#c11b17] text-[#c11b17] bg-transparent hover:bg-[#c11b17]/10 active:bg-[#c11b17]/20",
        "ghost-primary": "text-[#c11b17] hover:bg-[#c11b17]/10 active:bg-[#c11b17]/20",
        
        // Legacy/Additional variants for backward compatibility
        default: "bg-[#141416] text-white hover:bg-[#23262f] active:bg-[#353945] shadow-sm",
        outline: "border border-[#141416] text-[#141416] bg-transparent hover:bg-[#fcfcfd] active:bg-[#f4f5f6]",
        secondary: "bg-[#23262f] text-white hover:bg-[#353945] active:bg-[#6e7481] shadow-sm",
        ghost: "text-[#141416] hover:bg-[#fcfcfd] active:bg-[#f4f5f6]",
        link: "text-neutral-1 underline-offset-4 hover:underline",
        minimal: "text-neutral-1 hover:underline underline-offset-4 p-0 h-auto",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-11 px-8",
        xl: "h-12 px-10 text-lg",
        "icon-sm": "h-8 w-8 p-0",
        icon: "h-10 w-10 p-0",
        "icon-lg": "h-12 w-12 p-0",
        // Legacy size for backward compatibility
        default: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
)
