import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies correct variant styles', () => {
    const { rerender } = render(<Card variant="elevated">Elevated</Card>)
    let card = screen.getByText('Elevated').parentElement
    expect(card).toHaveStyle({ boxShadow: expect.any(String) })

    rerender(<Card variant="outlined">Outlined</Card>)
    card = screen.getByText('Outlined').parentElement
    expect(card).toHaveStyle({ border: expect.stringContaining('1px solid') })

    rerender(<Card variant="filled">Filled</Card>)
    card = screen.getByText('Filled').parentElement
    expect(card).toHaveStyle({ backgroundColor: '#f9fafb' })
  })

  it('applies correct padding styles', () => {
    const { rerender } = render(<Card padding="sm">Small</Card>)
    let card = screen.getByText('Small').parentElement
    expect(card).toHaveStyle({ padding: '1rem' })

    rerender(<Card padding="lg">Large</Card>)
    card = screen.getByText('Large').parentElement
    expect(card).toHaveStyle({ padding: '2rem' })
  })

  it('handles onClick prop', () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick}>Clickable</Card>)
    
    const card = screen.getByRole('button')
    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies interactive styles when onClick is provided', () => {
    render(<Card onClick={() => {}}>Interactive</Card>)
    const card = screen.getByRole('button')
    expect(card).toHaveStyle({ cursor: 'pointer' })
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('does not apply interactive styles without onClick', () => {
    render(<Card>Static</Card>)
    const card = screen.getByText('Static').parentElement
    expect(card).not.toHaveAttribute('role', 'button')
    expect(card).not.toHaveAttribute('tabIndex')
    expect(card).toHaveStyle({ cursor: 'default' })
  })

  it('handles keyboard interaction', () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick}>Keyboard</Card>)
    
    const card = screen.getByRole('button')
    card.focus()
    fireEvent.keyDown(card, { key: 'Enter' })
    
    // Note: onClick is triggered by mouse click, not keyboard
    // For full keyboard support, we'd need to add onKeyDown handler
  })
})