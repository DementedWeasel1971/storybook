import React from 'react'
import { colors, spacing, typography, borders } from '../../tokens'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  size = 'md',
  fullWidth = false,
  disabled = false,
  className,
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    fontFamily: typography.fontFamily.sans,
    borderRadius: borders.radius.md,
    border: `${borders.width.thin} solid ${error ? colors.error.main : colors.gray[300]}`,
    backgroundColor: disabled ? colors.gray[50] : colors.background.default,
    color: disabled ? colors.text.disabled : colors.text.primary,
    transition: 'all 0.2s ease',
    outline: 'none',
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
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.lg,
      height: '48px',
    },
  }

  const inputStyle: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...style,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: spacing[2],
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  }

  const helperStyle: React.CSSProperties = {
    marginTop: spacing[1],
    fontSize: typography.fontSize.xs,
    color: error ? colors.error.main : colors.text.secondary,
  }

  const containerStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-block',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!disabled) {
      e.currentTarget.style.borderColor = error ? colors.error.dark : colors.primary[500]
      e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? colors.error.light + '20' : colors.primary[500] + '20'}`
    }
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = error ? colors.error.main : colors.gray[300]
    e.currentTarget.style.boxShadow = 'none'
    props.onBlur?.(e)
  }

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        className={className}
        style={inputStyle}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-text' : helperText ? 'helper-text' : undefined}
        {...props}
      />
      {(error || helperText) && (
        <div id={error ? 'error-text' : 'helper-text'} style={helperStyle}>
          {error || helperText}
        </div>
      )}
    </div>
  )
}