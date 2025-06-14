import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				sm: '40rem',
				md: '48rem',
				lg: '64rem',
				xl: '80rem',
				'2xl': '96rem'
			}
		},
		screens: {
			'xs': '480px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			fontFamily: {
				// Apple-style font system
				'sans': ['SF Pro Text', 'Geist', 'system-ui', 'sans-serif'],
				'heading': ['SF Pro Display', 'Poppins', 'system-ui', 'sans-serif'],
				'hero': ['SF Pro Display', 'Poppins', 'system-ui', 'sans-serif'],
				'body': ['SF Pro Text', 'Geist', 'system-ui', 'sans-serif'],
				'subtitle': ['SF Pro Text', 'Poppins', 'system-ui', 'sans-serif'],
				'button': ['SF Pro Text', 'Poppins', 'system-ui', 'sans-serif'],
				'caption': ['SF Pro Text', 'Geist', 'system-ui', 'sans-serif'],
				'mono': ['SF Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
			},
			fontSize: {
				// Apple-style typography scale
				'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
				'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px - Apple's body text
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
				'2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
				'5xl': ['3rem', { lineHeight: '1' }],           // 48px
				'6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
				'7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
				'8xl': ['6rem', { lineHeight: '1' }],           // 96px
				'9xl': ['8rem', { lineHeight: '1' }],           // 128px
			},
			spacing: {
				// Apple's 8pt grid system
				'0.5': '0.125rem',  // 2px
				'1': '0.25rem',     // 4px
				'1.5': '0.375rem',  // 6px
				'2': '0.5rem',      // 8px - Apple's base unit
				'2.5': '0.625rem',  // 10px
				'3': '0.75rem',     // 12px
				'3.5': '0.875rem',  // 14px
				'4': '1rem',        // 16px
				'5': '1.25rem',     // 20px
				'6': '1.5rem',      // 24px
				'7': '1.75rem',     // 28px
				'8': '2rem',        // 32px
				'9': '2.25rem',     // 36px
				'10': '2.5rem',     // 40px
				'11': '2.75rem',    // 44px - Apple's minimum touch target
				'12': '3rem',       // 48px
				'14': '3.5rem',     // 56px
				'16': '4rem',       // 64px
				'20': '5rem',       // 80px
				'24': '6rem',       // 96px
				'28': '7rem',       // 112px
				'32': '8rem',       // 128px
				'36': '9rem',       // 144px
				'40': '10rem',      // 160px
				'44': '11rem',      // 176px
				'48': '12rem',      // 192px
				'52': '13rem',      // 208px
				'56': '14rem',      // 224px
				'60': '15rem',      // 240px
				'64': '16rem',      // 256px
				'72': '18rem',      // 288px
				'80': '20rem',      // 320px
				'96': '24rem',      // 384px
			},
			borderRadius: {
				// Apple-style border radius
				'none': '0',
				'sm': '0.25rem',    // 4px
				'DEFAULT': '0.5rem', // 8px
				'md': '0.75rem',    // 12px - Apple's standard
				'lg': '1rem',       // 16px
				'xl': '1.25rem',    // 20px
				'2xl': '1.5rem',    // 24px
				'3xl': '2rem',      // 32px
				'full': '9999px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					1: 'var(--color-primary-1)',
					2: 'var(--color-primary-2)',
					3: 'var(--color-primary-3)',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					1: 'var(--color-secondary-1)',
					2: 'var(--color-secondary-2)',
					3: 'var(--color-secondary-3)',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Apple-style semantic colors
				error: {
					1: 'var(--color-error-1)',
					2: 'var(--color-error-2)',
					3: 'var(--color-error-3)',
					4: 'var(--color-error-4)',
				},
				info: {
					1: 'var(--color-info-1)',
					2: 'var(--color-info-2)',
					3: 'var(--color-info-3)',
					4: 'var(--color-info-4)',
				},
				// Apple-style neutral palette
				neutral: {
					1: 'var(--color-neutral-1)',  // Apple's primary text
					2: 'var(--color-neutral-2)',  // Apple's secondary text
					3: 'var(--color-neutral-3)',  // Apple's tertiary text
					4: 'var(--color-neutral-4)',  // Apple's quaternary text
					5: 'var(--color-neutral-5)',  // Apple's separator
					6: 'var(--color-neutral-6)',  // Apple's grouped background
					7: 'var(--color-neutral-7)',  // Apple's secondary grouped background
					8: 'var(--color-neutral-8)',  // Apple's primary background
				},
				success: {
					1: 'var(--color-success-1)',
					2: 'var(--color-success-2)',  // Apple's green
					3: 'var(--color-success-3)',
					4: 'var(--color-success-4)',
				},
				warning: {
					1: 'var(--color-warning-1)',
					2: 'var(--color-warning-2)',  // Apple's orange
					3: 'var(--color-warning-3)',
					4: 'var(--color-warning-4)',
				},
				// MotorTrend brand colors
				motortrend: {
					dark: '#1A1F2C',
					red: '#E90C17',
					'red-hover': '#c11b17',
					gray: '#F6F6F7',
					light: '#FFFFFF',
					text: '#222222',
					muted: '#8E9196',
				},
			},
			boxShadow: {
				// Apple-style shadow system
				'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				'none': 'none',
				// Apple-style modern shadows
				'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'modern-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'modern-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			},
			transitionTimingFunction: {
				// Apple-style easing curves
				'apple': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'apple-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'apple-ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
				'apple-ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
				'apple-ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			transitionDuration: {
				// Apple-style timing
				'fast': '150ms',
				'normal': '300ms',
				'slow': '500ms',
			},
			aspectRatio: {
				'paper': '8.5 / 11',
				'vertical': '9 / 16',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// Apple-style animations
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'scale-out': {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0', transform: 'scale(0.95)' }
				},
				'slide-in-from-top': {
					'0%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-from-right': {
					'0%': { opacity: '0', transform: 'translateX(10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-from-bottom': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-from-left': {
					'0%': { opacity: '0', transform: 'translateX(-10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-2px)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Apple-style animations
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
				'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
				'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
				'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
				'shimmer': 'shimmer 2s infinite linear',
				'pulse-subtle': 'pulse-subtle 2s infinite',
				'bounce-subtle': 'bounce-subtle 1s infinite',
				'float': 'float 3s ease-in-out infinite',
			},
			backdropBlur: {
				'xs': '2px',
				'sm': '4px',
				'DEFAULT': '8px',
				'md': '12px',
				'lg': '16px',
				'xl': '24px',
				'2xl': '40px',
				'3xl': '64px',
			},
			minHeight: {
				'touch': '44px', // Apple's minimum touch target
			},
			maxWidth: {
				'container': '980px', // Design system container width
			},
		},
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
