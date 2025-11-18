/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
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
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		typography: ({ theme }: {theme: any}) => ({
        pink: {
          css: {
            "--tw-prose-body": theme("colors.pink[800]"),
            "--tw-prose-headings": theme("colors.pink[900]"),
            "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": theme("colors.pink[900]"),
            "--tw-prose-bold": theme("colors.pink[900]"),
            "--tw-prose-counters": theme("colors.pink[600]"),
            "--tw-prose-bullets": theme("colors.pink[400]"),
            "--tw-prose-hr": theme("colors.pink[300]"),
            "--tw-prose-quotes": theme("colors.pink[900]"),
            "--tw-prose-quote-borders": theme("colors.pink[300]"),
            "--tw-prose-captions": theme("colors.pink[700]"),
            "--tw-prose-code": theme("colors.pink[900]"),
            "--tw-prose-pre-code": theme("colors.pink[100]"),
            "--tw-prose-pre-bg": theme("colors.pink[900]"),
            "--tw-prose-th-borders": theme("colors.pink[300]"),
            "--tw-prose-td-borders": theme("colors.pink[200]"),
            "--tw-prose-invert-body": theme("colors.pink[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.pink[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.pink[400]"),
            "--tw-prose-invert-bullets": theme("colors.pink[600]"),
            "--tw-prose-invert-hr": theme("colors.pink[700]"),
            "--tw-prose-invert-quotes": theme("colors.pink[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
            "--tw-prose-invert-captions": theme("colors.pink[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            "--tw-prose-invert-pre-bg": theme("colors.pink[600]"),
            "--tw-prose-invert-th-borders": theme("colors.pink[500]"),
            "--tw-prose-invert-td-borders": theme("colors.pink[600]"),
          },
        },
        tight: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            'p': {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
            },
            'ul, ol': {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
            },
            'li': {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            'blockquote': {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            'pre': {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            'hr': {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            'table': {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
          },
        },
        zinc: {
          css: {
            "--tw-prose-body": theme("colors.zinc[700]"),
            "--tw-prose-headings": theme("colors.zinc[600]"),
            "--tw-prose-lead": theme("colors.zinc[600]"),
            "--tw-prose-links": theme("colors.zinc[900]"),
            "--tw-prose-bold": theme("colors.zinc[900]"),
            "--tw-prose-counters": theme("colors.zinc[500]"),
            "--tw-prose-bullets": theme("colors.zinc[300]"),
            "--tw-prose-hr": theme("colors.zinc[200]"),
            "--tw-prose-quotes": theme("colors.zinc[900]"),
            "--tw-prose-quote-borders": theme("colors.zinc[200]"),
            "--tw-prose-captions": theme("colors.zinc[500]"),
            "--tw-prose-kbd": theme("colors.zinc[900]"),
            "--tw-prose-kbd-shadows": theme("colors.zinc[900]"),
            "--tw-prose-code": theme("colors.zinc[900]"),
            "--tw-prose-pre-code": theme("colors.zinc[200]"),
            "--tw-prose-pre-bg": theme("colors.zinc[800]"),
            "--tw-prose-th-borders": theme("colors.zinc[300]"),
            "--tw-prose-td-borders": theme("colors.zinc[200]"),
            "--tw-prose-invert-body": theme("colors.zinc[300]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.zinc[400]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.zinc[400]"),
            "--tw-prose-invert-bullets": theme("colors.zinc[600]"),
            "--tw-prose-invert-hr": theme("colors.zinc[700]"),
            "--tw-prose-invert-quotes": theme("colors.zinc[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.zinc[700]"),
            "--tw-prose-invert-captions": theme("colors.zinc[400]"),
            "--tw-prose-invert-kbd": theme("colors.white"),
            "--tw-prose-invert-kbd-shadows": theme("colors.white"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.zinc[300]"),
            // --tw-prose-invert-pre-bg: ,
            "--tw-prose-invert-th-borders": theme("colors.zinc[600]"),
            "--tw-prose-invert-td-borders": theme("colors.zinc[700]"),
          },
        },
      }),
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'caret-blink': 'caret-blink 1.25s ease-out infinite'
  		}
  	}
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
