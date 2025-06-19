// Color Tokens
export const colors = {
  brand: {
    red: 'var(--motortrend-red)',
    dark: 'var(--motortrend-dark)',
    gray: 'var(--motortrend-gray)',
  },
  neutral: {
    1: 'var(--color-neutral-1)',
    2: 'var(--color-neutral-2)',
    3: 'var(--color-neutral-3)',
    4: 'var(--color-neutral-4)',
    5: 'var(--color-neutral-5)',
    6: 'var(--color-neutral-6)',
    7: 'var(--color-neutral-7)',
  },
  text: {
    primary: 'var(--color-neutral-1)',
    secondary: 'var(--color-neutral-3)',
    disabled: 'var(--color-neutral-5)',
  }
};

// Spacing Tokens
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
};

// Typography Scale
export const typography = {
  h1: 'typography-h1',
  h2: 'typography-h2',
  h3: 'typography-h3',
  h4: 'typography-h4',
  title: 'typography-title',
  subtitle: 'typography-subtitle',
  body: 'typography-body',
  'body-large': 'typography-body-large',
  'body-small': 'typography-body-small',
  caption: 'typography-caption',
  'caption-bold': 'typography-caption-bold',
  button: 'typography-button',
  'button2': 'typography-button2',
};

// Layout Constants
export const layout = {
  maxWidth: '980px',
  containerPadding: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },
  headerHeight: {
    mobile: '56px',
    desktop: '80px',
  },
  zIndex: {
    header: 9999,
    subNav: 9998,
    dropdown: 9997,
    modal: 9996,
    toast: 9995,
  }
};

// Border Radius
export const radius = {
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  modern: 'var(--shadow-modern)',
};

// Transitions
export const transitions = {
  standard: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
};

// Breakpoints (in pixels)
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// CSS Variables
export const cssVariables = `
  :root {
    /* Brand Colors */
    --motortrend-red: #E31837;
    --motortrend-dark: #1A1A1A;
    --motortrend-gray: #F5F5F5;

    /* Neutral Colors */
    --color-neutral-1: #1A1A1A;
    --color-neutral-2: #333333;
    --color-neutral-3: #666666;
    --color-neutral-4: #999999;
    --color-neutral-5: #CCCCCC;
    --color-neutral-6: #E6E6E6;
    --color-neutral-7: #F5F5F5;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadow-modern: 0 4px 12px 0 rgb(0 0 0 / 0.1);
  }
`; 