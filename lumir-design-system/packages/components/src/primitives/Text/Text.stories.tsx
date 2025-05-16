import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {
    componentSubtitle: 'Text 컴포넌트는 다양한 텍스트 스타일을 제공하는 기본 요소입니다',
    docs: {
      description: {
        component: `
Text 컴포넌트는 Lumir Design System의 모든 텍스트 표시를 담당하는 기본 요소입니다.
다양한 타이포그래피 스타일을 일관되게 적용하며, 시맨틱 토큰에 기반한 디자인을 제공합니다.

## 타이포그래피 시스템

텍스트 컴포넌트는 다음 계층 구조를 따릅니다:
- **Hero**: 가장 강조되는 큰 텍스트 (랜딩 페이지, 배너)
- **Title**: 페이지 또는 섹션의 제목
- **Heading**: 콘텐츠 영역의 제목
- **Body**: 주요 콘텐츠 텍스트
- **Label**: 폼 요소와 함께 사용되는 레이블
- **Caption**: 작은 보조 텍스트

## 주요 특징

- **시맨틱 마크업**: 적절한 HTML 태그 사용 (h1-h6, p, span 등)
- **다양한 스타일링 옵션**: 정렬, 색상, 변형, 굵기 등
- **텍스트 표시 제어**: 줄바꿈, 생략 등의 고급 옵션
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: '텍스트의 스타일 변형을 지정합니다',
      control: 'select',
      options: [
        'hero-1', 'hero-2', 
        'title-1', 'title-2', 
        'heading-1', 'heading-2', 'heading-3', 
        'body-1', 'body-2', 
        'label-1', 'label-2', 
        'caption-1', 'caption-2', 'caption-3'
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body-1' },
      },
    },
    weight: {
      description: '텍스트의 굵기를 지정합니다',
      control: 'select',
      options: ['regular', 'medium', 'bold'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
    },
    as: {
      description: '텍스트를 렌더링할 HTML 요소를 지정합니다',
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'p' },
      },
    },
    align: {
      description: '텍스트의 정렬 방향을 지정합니다',
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      table: {
        type: { summary: 'string' },
      },
    },
    transform: {
      description: '텍스트 변형(대문자, 소문자 등)을 지정합니다',
      control: 'select',
      options: ['none', 'capitalize', 'uppercase', 'lowercase'],
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      description: '텍스트의 색상을 지정합니다',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'onColor', 'success', 'warning', 'error', 'info'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    noWrap: {
      description: '텍스트가 한 줄에 표시되고 넘칠 경우 생략 부호로 표시할지 여부를 지정합니다',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    truncate: {
      description: '텍스트가 지정된 라인 수 이후 생략 부호로 표시할지 여부를 지정합니다',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// 단일 Playground 스토리
export const Playground: Story = {
  args: {
    variant: 'body-1',
    weight: 'regular',
    color: 'primary',
    as: 'p',
    align: 'left',
    transform: 'none',
    noWrap: false,
    truncate: undefined,
    children: '텍스트 컴포넌트 예시입니다. 다양한 속성을 조절해보세요.',
  },
};

// 문서에서만 표시될 예제들
export const TypographyVariants: Story = {
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="hero-1" weight="bold">Hero 1 Bold</Text>
      <Text variant="hero-2" weight="bold">Hero 2 Bold</Text>
      <Text variant="title-1" weight="bold">Title 1 Bold</Text>
      <Text variant="title-2" weight="bold">Title 2 Bold</Text>
      <Text variant="heading-1" weight="medium">Heading 1 Medium</Text>
      <Text variant="heading-2" weight="medium">Heading 2 Medium</Text>
      <Text variant="heading-3" weight="medium">Heading 3 Medium</Text>
      <Text variant="body-1">Body 1 Regular</Text>
      <Text variant="body-2">Body 2 Regular</Text>
      <Text variant="label-1">Label 1 Regular</Text>
      <Text variant="label-2">Label 2 Regular</Text>
      <Text variant="caption-1">Caption 1 Regular</Text>
      <Text variant="caption-2">Caption 2 Regular</Text>
      <Text variant="caption-3">Caption 3 Regular</Text>
    </div>
  ),
};

export const ColorVariants: Story = {
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text color="primary">Primary 색상 텍스트</Text>
      <Text color="secondary">Secondary 색상 텍스트</Text>
      <Text color="tertiary">Tertiary 색상 텍스트</Text>
      <div style={{ background: '#333', padding: '8px' }}>
        <Text color="onColor">OnColor 색상 텍스트</Text>
      </div>
      <Text color="success">Success 색상 텍스트</Text>
      <Text color="warning">Warning 색상 텍스트</Text>
      <Text color="error">Error 색상 텍스트</Text>
      <Text color="info">Info 색상 텍스트</Text>
    </div>
  ),
};

export const WeightExamples: Story = {
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text weight="regular">Regular 굵기 텍스트</Text>
      <Text weight="medium">Medium 굵기 텍스트</Text>
      <Text weight="bold">Bold 굵기 텍스트</Text>
    </div>
  ),
};

export const AlignmentExamples: Story = {
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '400px', border: '1px solid #ddd', padding: '8px' }}>
      <Text align="left">왼쪽 정렬 텍스트</Text>
      <Text align="center">가운데 정렬 텍스트</Text>
      <Text align="right">오른쪽 정렬 텍스트</Text>
      <Text align="justify">양쪽 정렬 텍스트. 이 텍스트는 양쪽 경계에 맞춰 정렬됩니다. 충분히 긴 텍스트여야 합니다.</Text>
    </div>
  ),
};

export const TruncationExamples: Story = {
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Text style={{ marginBottom: '8px' }} weight="bold">noWrap 예제:</Text>
        <div style={{ width: '200px', border: '1px solid #ddd', padding: '8px' }}>
          <Text noWrap>
            이 텍스트는 너무 길어서 컨테이너를 넘어갈 것이지만, noWrap 속성으로 인해 한 줄로 표시되고 넘치는 부분은 생략 부호로 표시됩니다.
          </Text>
        </div>
      </div>
      
      <div>
        <Text style={{ marginBottom: '8px' }} weight="bold">truncate 예제:</Text>
        <div style={{ width: '200px', border: '1px solid #ddd', padding: '8px' }}>
          <Text truncate={2}>
            이 텍스트는 2줄까지만 표시되고, 그 이후에는 생략 부호로 표시됩니다. 충분히 긴 텍스트를 작성해서 여러 줄에 걸쳐 표시되도록 합니다. 이렇게 하면 truncate 속성의 효과를 확인할 수 있습니다.
          </Text>
        </div>
      </div>
    </div>
  ),
}; 