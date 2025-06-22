import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        Modal content
      </Modal>
    )
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        Modal content
      </Modal>
    )
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
  })

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        Content
      </Modal>
    )
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title')
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    )
    
    fireEvent.click(screen.getByLabelText('Close modal'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking overlay', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    )
    
    fireEvent.click(screen.getByRole('dialog'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when clicking modal content', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </Modal>
    )
    
    fireEvent.click(screen.getByText('Content'))
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('does not close on overlay click when closeOnOverlayClick is false', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>
        Content
      </Modal>
    )
    
    fireEvent.click(screen.getByRole('dialog'))
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('calls onClose when pressing Escape', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    )
    
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not close on Escape when closeOnEscape is false', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEscape={false}>
        Content
      </Modal>
    )
    
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('applies correct size styles', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        Content
      </Modal>
    )
    let modal = screen.getByRole('document')
    expect(modal).toHaveStyle({ maxWidth: '400px' })

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="xl">
        Content
      </Modal>
    )
    modal = screen.getByRole('document')
    expect(modal).toHaveStyle({ maxWidth: '1000px' })
  })

  it('prevents body scroll when open', () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={() => {}}>
        Content
      </Modal>
    )
    
    expect(document.body.style.overflow).not.toBe('hidden')
    
    rerender(
      <Modal isOpen={true} onClose={() => {}}>
        Content
      </Modal>
    )
    
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        Content
      </Modal>
    )
    
    expect(document.body.style.overflow).toBe('hidden')
    
    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        Content
      </Modal>
    )
    
    expect(document.body.style.overflow).toBe('unset')
  })

  it('renders in document.body using portal', () => {
    const { container } = render(
      <div id="app">
        <Modal isOpen={true} onClose={() => {}}>
          Portal content
        </Modal>
      </div>
    )
    
    // Modal should not be in the container div
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument()
    
    // But should be in document.body
    expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument()
  })

  it('applies aria attributes for accessibility', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Accessible Modal">
        Content
      </Modal>
    )
    
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
  })
})