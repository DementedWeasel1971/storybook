import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../Button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Elevated: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: 0, marginBottom: '8px' }}>Elevated Card</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          This is an elevated card with a shadow effect.
        </p>
      </div>
    ),
    variant: 'elevated',
  },
}

export const Outlined: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: 0, marginBottom: '8px' }}>Outlined Card</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          This is an outlined card with a border.
        </p>
      </div>
    ),
    variant: 'outlined',
  },
}

export const Filled: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: 0, marginBottom: '8px' }}>Filled Card</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          This is a filled card with a background color.
        </p>
      </div>
    ),
    variant: 'filled',
  },
}

export const Interactive: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: 0, marginBottom: '8px' }}>Interactive Card</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Click this card to see the interaction.
        </p>
      </div>
    ),
    onClick: () => alert('Card clicked!'),
  },
}

export const WithButton: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: 0, marginBottom: '8px' }}>Card with Button</h3>
        <p style={{ margin: 0, marginBottom: '16px', color: '#6b7280' }}>
          This card contains a button component.
        </p>
        <Button size="sm">Learn More</Button>
      </div>
    ),
  },
}

export const SmallPadding: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: 0, marginBottom: '8px' }}>Small Padding</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          This card has small padding.
        </p>
      </div>
    ),
    padding: 'sm',
  },
}

export const LargePadding: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: 0, marginBottom: '8px' }}>Large Padding</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          This card has large padding.
        </p>
      </div>
    ),
    padding: 'lg',
  },
}