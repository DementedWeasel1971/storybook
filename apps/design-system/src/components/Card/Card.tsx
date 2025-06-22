import React from 'react'
import { colors, spacing, borders, shadows } from '../../tokens'

export interface CardProps {
  children: React.ReactNode
  variant?: 'elevated' | 'outlined' | 'filled'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  className,
  onClick,
}) => {
  const baseStyles: React.CSSProperties = {
    borderRadius: borders.radius.lg,
    transition: 'all 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
  }

  const paddingStyles: Record<typeof padding, React.CSSProperties> = {
    sm: {
      padding: spacing[4],
    },
    md: {
      padding: spacing[6],
    },
    lg: {
      padding: spacing[8],
    },
  }

  const variantStyles: Record<typeof variant, React.CSSProperties> = {
    elevated: {
      backgroundColor: colors.background.default,
      boxShadow: shadows.md,
      border: 'none',
    },
    outlined: {
      backgroundColor: colors.background.default,
      boxShadow: 'none',
      border: `${borders.width.thin} solid ${colors.gray[200]}`,
    },
    filled: {
      backgroundColor: colors.background.paper,
      boxShadow: 'none',
      border: 'none',
    },
  }

  const hoverStyles: Record<typeof variant, React.CSSProperties> = {
    elevated: {
      boxShadow: shadows.lg,
    },
    outlined: {
      borderColor: colors.gray[300],
    },
    filled: {
      backgroundColor: colors.gray[100],
    },
  }

  const style: React.CSSProperties = {
    ...baseStyles,
    ...paddingStyles[padding],
    ...variantStyles[variant],
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      Object.assign(e.currentTarget.style, hoverStyles[variant])
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      Object.assign(e.currentTarget.style, variantStyles[variant])
    }
  }

  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}