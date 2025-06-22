export const colors = {
  // Primary colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93bbfd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: {
    light: '#10b981',
    main: '#059669',
    dark: '#047857',
  },
  
  error: {
    light: '#f87171',
    main: '#ef4444',
    dark: '#dc2626',
  },
  
  warning: {
    light: '#fbbf24',
    main: '#f59e0b',
    dark: '#d97706',
  },
  
  info: {
    light: '#60a5fa',
    main: '#3b82f6',
    dark: '#2563eb',
  },
  
  // Background colors
  background: {
    default: '#ffffff',
    paper: '#f9fafb',
    dark: '#111827',
  },
  
  // Text colors
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    disabled: '#9ca3af',
    inverse: '#ffffff',
  },
} as const

export type Colors = typeof colors