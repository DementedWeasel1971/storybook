import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { colors, spacing, borders, shadows } from '../../tokens'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose()
    }
  }, [closeOnEscape, onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: spacing[4],
  }

  const sizeStyles: Record<typeof size, React.CSSProperties> = {
    sm: { maxWidth: '400px' },
    md: { maxWidth: '600px' },
    lg: { maxWidth: '800px' },
    xl: { maxWidth: '1000px' },
  }

  const modalStyles: React.CSSProperties = {
    backgroundColor: colors.background.default,
    borderRadius: borders.radius.xl,
    boxShadow: shadows.xl,
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    ...sizeStyles[size],
  }

  const headerStyles: React.CSSProperties = {
    padding: spacing[6],
    paddingBottom: spacing[4],
    borderBottom: title ? `${borders.width.thin} solid ${colors.gray[200]}` : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.text.primary,
  }

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: colors.text.secondary,
    cursor: 'pointer',
    padding: spacing[2],
    margin: `-${spacing[2]}`,
    borderRadius: borders.radius.md,
    transition: 'all 0.2s ease',
  }

  const contentStyles: React.CSSProperties = {
    padding: spacing[6],
    paddingTop: title ? spacing[6] : 0,
    overflowY: 'auto',
    flex: 1,
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  const handleCloseButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = colors.gray[100]
    e.currentTarget.style.color = colors.text.primary
  }

  const handleCloseButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = colors.text.secondary
  }

  return createPortal(
    <div
      style={overlayStyles}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div style={modalStyles} role="document">
        {(title || !closeOnOverlayClick) && (
          <div style={headerStyles}>
            {title && <h2 id="modal-title" style={titleStyles}>{title}</h2>}
            <button
              onClick={onClose}
              style={closeButtonStyles}
              onMouseEnter={handleCloseButtonHover}
              onMouseLeave={handleCloseButtonLeave}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        )}
        <div style={contentStyles}>{children}</div>
      </div>
    </div>,
    document.body
  )
}