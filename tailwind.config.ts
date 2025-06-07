
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
			'lg': '1024px',  // Standard breakpoint for container max-width
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			fontFamily: {
				'sans': ['Geist', 'sans-serif'],
				'heading': ['Poppins', 'sans-serif'],
				'hero': ['var(--font-hero)', 'var(--font-heading)', 'Poppins', 'sans-serif'],
				'body': ['var(--font-body)', 'Geist', 'sans-serif'],
				'subtitle': ['var(--font-subtitle)', 'var(--font-heading)', 'Poppins', 'sans-serif'],
				'button': ['var(--font-button)', 'var(--font-heading)', 'Poppins', 'sans-serif'],
				'caption': ['var(--font-caption)', 'var(--font-body)', 'Geist', 'sans-serif'],
				'email': ['Arial', 'sans-serif'],
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
				// New design system colors
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
				neutral: {
					1: 'var(--neutral-1)',
					2: 'var(--neutral-2)',
					3: 'var(--neutral-3)',
					4: 'var(--neutral-4)',
					5: 'var(--neutral-5)',
					6: 'var(--neutral-6)',
					7: 'var(--neutral-7)',
					8: 'var(--neutral-8)',
				},
				success: {
					1: 'var(--color-success-1)',
					2: 'var(--color-success-2)',
					3: 'var(--color-success-3)',
					4: 'var(--color-success-4)',
				},
				warning: {
					1: 'var(--color-warning-1)',
					2: 'var(--color-warning-2)',
					3: 'var(--color-warning-3)',
					4: 'var(--color-warning-4)',
				},
				motortrend: {
					dark: '#1A1F2C',
					red: '#E90C17',
					gray: '#F6F6F7',
					light: '#FFFFFF',
					text: '#222222',
					muted: '#8E9196',
				},
			},
			aspectRatio: {
				'paper': '8.5 / 11',
				'vertical': '9 / 16',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'circular-progress-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'circular-progress-dash': {
					'0%': { 'stroke-dasharray': '1px, 200px', 'stroke-dashoffset': '0' },
					'50%': { 'stroke-dasharray': '100px, 200px', 'stroke-dashoffset': '-15px' },
					'100%': { 'stroke-dasharray': '100px, 200px', 'stroke-dashoffset': '-125px' }
				},
				'linear-progress-indeterminate-bar1': {
					'0%': { left: '-35%', right: '100%' },
					'60%': { left: '100%', right: '-90%' },
					'100%': { left: '100%', right: '-90%' }
				},
				'linear-progress-indeterminate-bar2': {
					'0%': { left: '-200%', right: '100%' },
					'60%': { left: '107%', right: '-8%' },
					'100%': { left: '107%', right: '-8%' }
				},
				'wave': {
					'0%': { transform: 'translateX(-100%)' },
					'50%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'spinner': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.9)', opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-10px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'pop': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'40%': { transform: 'scale(1.02)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'circular-progress': 'circular-progress-rotate 1.4s linear infinite',
				'circular-progress-dash': 'circular-progress-dash 1.4s ease-in-out infinite',
				'linear-progress-bar1': 'linear-progress-indeterminate-bar1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
				'linear-progress-bar2': 'linear-progress-indeterminate-bar2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite',
				'wave': 'wave 2s linear 0.5s infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'spinner': 'spinner 1s linear infinite',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'pop': 'pop 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2.5s infinite linear',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
