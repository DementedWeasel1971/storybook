import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button'
import { Input } from '../Input'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Helper component to manage modal state
const ModalExample = (args: any) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: (args) => <ModalExample {...args} />,
  args: {
    title: 'Modal Title',
    children: (
      <div>
        <p>This is the modal content. You can add any content here.</p>
        <p style={{ marginTop: '16px' }}>
          Press ESC or click outside to close the modal.
        </p>
      </div>
    ),
  },
}

export const Small: Story = {
  render: (args) => <ModalExample {...args} />,
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: <p>This is a small modal with limited width.</p>,
  },
}

export const Large: Story = {
  render: (args) => <ModalExample {...args} />,
  args: {
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div>
        <p>This is a large modal that can contain more content.</p>
        <p style={{ marginTop: '16px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    ),
  },
}

export const WithForm: Story = {
  render: (args) => <ModalExample {...args} />,
  args: {
    title: 'Login Form',
    children: (
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          fullWidth
          style={{ marginBottom: '16px' }}
        />
        <Input
          label="Password"
          type="password"
          fullWidth
          style={{ marginBottom: '24px' }}
        />
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button type="submit">Login</Button>
        </div>
      </form>
    ),
  },
}

export const NoTitle: Story = {
  render: (args) => <ModalExample {...args} />,
  args: {
    children: (
      <div style={{ textAlign: 'center', padding: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Are you sure?</h2>
        <p style={{ marginBottom: '24px' }}>
          This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </div>
      </div>
    ),
  },
}

export const LongContent: Story = {
  render: (args) => <ModalExample {...args} />,
  args: {
    title: 'Terms and Conditions',
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ marginBottom: '16px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
            enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        ))}
      </div>
    ),
  },
}

export const PreventClose: Story = {
  render: (args) => <ModalExample {...args} />,
  args: {
    title: 'Cannot close by clicking outside',
    closeOnOverlayClick: false,
    closeOnEscape: false,
    children: (
      <div>
        <p>This modal can only be closed by clicking the X button.</p>
        <p style={{ marginTop: '16px' }}>
          Clicking outside or pressing ESC will not close it.
        </p>
      </div>
    ),
  },
}