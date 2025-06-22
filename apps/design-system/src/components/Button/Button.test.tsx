import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ backgroundColor: '#2563eb' })

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(button).toHaveStyle({ backgroundColor: '#4b5563' })
  })

  it('applies correct size styles', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ height: '32px' })

    rerender(<Button size="lg">Large</Button>)
    expect(button).toHaveStyle({ height: '48px' })
  })

  it('handles fullWidth prop', () => {
    render(<Button fullWidth>Full Width</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ width: '100%' })
  })

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveStyle({ opacity: '0.6' })
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('prevents click when disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('prevents click when loading', () => {
    const handleClick = jest.fn()
    render(<Button loading onClick={handleClick}>Loading</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})