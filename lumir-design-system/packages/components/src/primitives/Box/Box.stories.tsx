import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    margin: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    width: {
      control: { type: 'select' },
      options: ['auto', 'full', 'half', 'quarter'],
    },
    display: {
      control: { type: 'select' },
      options: ['block', 'flex', 'inline', 'inline-block', 'inline-flex', 'grid'],
    },
    flexDirection: {
      control: { type: 'select' },
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    justifyContent: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },
    alignItems: {
      control: { type: 'select' },
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

// 단일 Playground 스토리
export const Playground: Story = {
  args: {
    padding: 'md',
    margin: 'none',
    width: 'auto',
    display: 'block',
    children: (
      <div style={{ 
        padding: '20px', 
        backgroundColor: 'var(--semantic-color-background-surface-rest)',
        border: '1px solid var(--semantic-color-border-default-rest)'
      }}>
        Box 컴포넌트 예시 콘텐츠
      </div>
    ),
  },
};

// 문서에서만 표시될 예제들
export const LayoutExamples: Story = {
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box padding="md" display="block">
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'var(--semantic-color-background-surface-rest)',
          border: '1px solid var(--semantic-color-border-default-rest)'
        }}>
          기본 블록 레이아웃
        </div>
      </Box>
      
      <Box 
        padding="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="full"
        height="200px"
        style={{ backgroundColor: 'var(--semantic-color-background-subtle)' }}
      >
        <div style={{ padding: '20px', backgroundColor: 'var(--semantic-color-background-success-subtle)' }}>항목 1</div>
        <div style={{ padding: '20px', backgroundColor: 'var(--semantic-color-background-info-subtle)' }}>항목 2</div>
        <div style={{ padding: '20px', backgroundColor: 'var(--semantic-color-background-warning-subtle)' }}>항목 3</div>
      </Box>
      
      <Box 
        padding="md"
        display="flex"
        flexDirection="column"
        gap="md"
        width="full"
        style={{ backgroundColor: 'var(--semantic-color-background-subtle)' }}
      >
        <div style={{ padding: '20px', backgroundColor: 'var(--semantic-color-background-success-subtle)' }}>수직 항목 1</div>
        <div style={{ padding: '20px', backgroundColor: 'var(--semantic-color-background-info-subtle)' }}>수직 항목 2</div>
        <div style={{ padding: '20px', backgroundColor: 'var(--semantic-color-background-warning-subtle)' }}>수직 항목 3</div>
      </Box>
    </div>
  ),
}; 