import React from 'react'
import { colors, spacing, typography, borders, shadows } from '../../tokens'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
    borderRadius: borders.radius.md,
    transition: 'all 0.2s ease',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    border: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
  }

  const sizeStyles: Record<typeof size, React.CSSProperties> = {
    sm: {
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm,
      height: '32px',
    },
    md: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.base,
      height: '40px',
    },
    lg: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.lg,
      height: '48px',
    },
  }

  const variantStyles: Record<typeof variant, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.primary[600],
      color: colors.text.inverse,
      boxShadow: shadows.sm,
    },
    secondary: {
      backgroundColor: colors.gray[600],
      color: colors.text.inverse,
      boxShadow: shadows.sm,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary[600],
      border: `${borders.width.thin} solid ${colors.primary[600]}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary[600],
    },
  }

  const hoverStyles: Record<typeof variant, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.primary[700],
    },
    secondary: {
      backgroundColor: colors.gray[700],
    },
    outline: {
      backgroundColor: colors.primary[50],
    },
    ghost: {
      backgroundColor: colors.gray[100],
    },
  }

  const style: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      Object.assign(e.currentTarget.style, hoverStyles[variant])
    }
    props.onMouseEnter?.(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      Object.assign(e.currentTarget.style, variantStyles[variant])
    }
    props.onMouseLeave?.(e)
  }

  return (
    <button
      className={className}
      style={style}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}