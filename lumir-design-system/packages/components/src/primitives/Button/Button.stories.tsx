import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'transparent'],
      description: '버튼의 스타일 변형'
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'cta'],
      description: '버튼의 색상 테마'
    },
    buttonType: {
      control: 'select',
      options: ['text-only', 'text-icon', 'icon-only'],
      description: '버튼의 타입'
    },
    size: {
      control: 'select',
      options: ['xsm', 'sm', 'md', 'lg', 'xlg'],
      description: '버튼의 크기'
    },
    isFullWidth: {
      control: 'boolean',
      description: '전체 너비 적용 여부'
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태 여부'
    },
    isSelected: {
      control: 'boolean',
      description: '선택 상태 여부'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    }
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'filled',
    colorScheme: 'primary',
    buttonType: 'text-only',
    size: 'md',
  },
};

export const FilledPrimary: Story = {
  args: {
    children: '버튼',
    variant: 'filled',
    colorScheme: 'primary',
    buttonType: 'text-only',
  },
};

export const FilledSecondary: Story = {
  args: {
    children: '버튼',
    variant: 'filled',
    colorScheme: 'secondary',
    buttonType: 'text-only',
  },
};

export const FilledCTA: Story = {
  args: {
    children: '버튼',
    variant: 'filled',
    colorScheme: 'cta',
    buttonType: 'text-only',
  },
};

export const OutlinedPrimary: Story = {
  args: {
    children: '버튼',
    variant: 'outlined',
    colorScheme: 'primary',
    buttonType: 'text-only',
  },
};

export const OutlinedSecondary: Story = {
  args: {
    children: '버튼',
    variant: 'outlined',
    colorScheme: 'secondary',
    buttonType: 'text-only',
  },
};

export const TransparentPrimary: Story = {
  args: {
    children: '버튼',
    variant: 'transparent',
    colorScheme: 'primary',
    buttonType: 'text-only',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: '아이콘 버튼',
    variant: 'filled',
    colorScheme: 'primary',
    buttonType: 'text-icon',
    leftIcon: <span>→</span>,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: '아이콘 버튼',
    variant: 'filled',
    colorScheme: 'primary',
    buttonType: 'text-icon',
    rightIcon: <span>→</span>,
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'filled',
    colorScheme: 'primary',
    buttonType: 'icon-only',
    leftIcon: <span>→</span>,
    'aria-label': '아이콘 버튼',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화 버튼',
    variant: 'filled',
    colorScheme: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: '로딩 버튼',
    variant: 'filled',
    colorScheme: 'primary',
    isLoading: true,
  },
};

export const Selected: Story = {
  args: {
    children: '선택됨',
    variant: 'filled',
    colorScheme: 'primary',
    isSelected: true,
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      <Button size="xsm">XSmall 버튼</Button>
      <Button size="sm">Small 버튼</Button>
      <Button size="md">Medium 버튼</Button>
      <Button size="lg">Large 버튼</Button>
      <Button size="xlg">XLarge 버튼</Button>
    </div>
  ),
};

export const VariantShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="filled" colorScheme="primary">Primary Filled</Button>
        <Button variant="outlined" colorScheme="primary">Primary Outlined</Button>
        <Button variant="transparent" colorScheme="primary">Primary Transparent</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="filled" colorScheme="secondary">Secondary Filled</Button>
        <Button variant="outlined" colorScheme="secondary">Secondary Outlined</Button>
        <Button variant="transparent" colorScheme="secondary">Secondary Transparent</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="filled" colorScheme="cta">CTA Filled</Button>
        <Button variant="outlined" colorScheme="cta">CTA Outlined</Button>
        <Button variant="transparent" colorScheme="cta">CTA Transparent</Button>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: '전체 너비 버튼',
    variant: 'filled',
    colorScheme: 'primary',
    isFullWidth: true,
  },
};

export const CTA: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    colorScheme: 'cta',
    size: 'md',
  },
}; 