import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
    type: 'email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
}

export const WithError: Story = {
  args: {
    label: 'Username',
    value: 'admin',
    error: 'This username is already taken',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width input',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
}

export const NumberType: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: '25',
    min: 0,
    max: 120,
  },
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required',
  },
}