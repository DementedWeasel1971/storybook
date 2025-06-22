import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label="Email" placeholder="Enter email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<Input helperText="This is a hint" />)
    expect(screen.getByText('This is a hint')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('applies correct size styles', () => {
    const { rerender } = render(<Input size="sm" />)
    let input = screen.getByRole('textbox')
    expect(input).toHaveStyle({ height: '32px' })

    rerender(<Input size="lg" />)
    input = screen.getByRole('textbox')
    expect(input).toHaveStyle({ height: '48px' })
  })

  it('handles fullWidth prop', () => {
    render(<Input fullWidth />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveStyle({ width: '100%' })
  })

  it('handles disabled state', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveStyle({ backgroundColor: '#f9fafb' })
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello world')
    expect(input).toHaveValue('Hello world')
  })

  it('handles onChange event', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('applies error styles', () => {
    render(<Input error="Error message" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveStyle({ borderColor: expect.stringContaining('#ef4444') })
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    
    const input = screen.getByRole('textbox')
    
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalled()
    expect(input).toHaveStyle({ boxShadow: expect.any(String) })
    
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalled()
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    
    rerender(<Input type="password" />)
    // Password inputs don't have role="textbox"
    expect(screen.getByLabelText(/^$/)).toHaveAttribute('type', 'password')
  })

  it('applies aria-describedby for accessibility', () => {
    const { rerender } = render(<Input helperText="Help text" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'helper-text')
    
    rerender(<Input error="Error text" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'error-text')
  })
})