import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

// 더미 컴포넌트 생성 - Storybook에서 필요로 함
const TokensDocumentation: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Lumir 디자인 시스템 토큰</h1>
      <p>
        Lumir 디자인 시스템의 기본 디자인 토큰들을 소개합니다. 
        이 토큰들은 시맨틱 토큰으로 구성되어 있으며, 일관된 디자인 언어를 제공합니다.
      </p>
      
      <h2>토큰 카테고리</h2>
      <ul>
        <li><strong>색상 토큰</strong>: 브랜드 컬러, 상태 표시 색상 등</li>
        <li><strong>타이포그래피 토큰</strong>: 글꼴, 크기, 행간, 가중치 등</li>
        <li><strong>간격 토큰</strong>: 여백, 마진, 패딩 등</li>
        <li><strong>라운드 코너 토큰</strong>: 모서리 곡률</li>
      </ul>
      
      <h2>사용 방법</h2>
      <p>
        CSS 변수를 통해 모든 토큰에 접근할 수 있습니다. 예를 들어:
      </p>
      <pre><code>{`.my-element {
  color: var(--semantic-color-primary-foreground-1-rest);
  font-size: var(--semantic-typography-body-1-regular-fontSize);
}`}</code></pre>
      
      <ColorsSection />
      <TypographySection />
      <SpacingSection />
      <RadiusSection />
    </div>
  );
};

const meta: Meta<typeof TokensDocumentation> = {
  title: 'Foundation/Design Tokens',
  component: TokensDocumentation,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true }
    },
  },
};

export default meta;
type Story = StoryObj<typeof TokensDocumentation>;

// 기본 스토리 - 필수
export const Overview: Story = {};

// 컴포넌트 섹션
const ColorsSection = () => (
  <div>
    <h2>시맨틱 컬러 토큰</h2>
    <div style={{ marginBottom: '2rem' }}>
      <h3>Primary Colors</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {[
          'primary-background-1-rest',
          'primary-background-1-hovered',
          'primary-background-1-pressed',
          'primary-background-1-disabled',
          'primary-foreground-1-rest',
        ].map(color => (
          <ColorCard key={color} name={color} variable={`--semantic-color-${color}`} />
        ))}
      </div>
    </div>

    <div style={{ marginBottom: '2rem' }}>
      <h3>Secondary Colors</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {[
          'secondary-background-1-rest',
          'secondary-background-2-rest',
          'secondary-background-3-rest',
          'secondary-foreground-1-rest',
          'secondary-foreground-2-rest',
        ].map(color => (
          <ColorCard key={color} name={color} variable={`--semantic-color-${color}`} />
        ))}
      </div>
    </div>

    <div style={{ marginBottom: '2rem' }}>
      <h3>상태 색상</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {[
          'status-error-global',
          'status-warning-global',
          'status-success-global',
          'status-info-global',
        ].map(color => (
          <ColorCard key={color} name={color} variable={`--semantic-color-${color}`} />
        ))}
      </div>
    </div>
  </div>
);

const TypographySection = () => (
  <div>
    <h2>타이포그래피 토큰</h2>
    
    <div style={{ marginBottom: '2rem' }}>
      <h3>Hero</h3>
      <TypographyCard 
        name="Hero 1 Regular" 
        fontSizeVar="--semantic-typography-hero-1-regular-fontSize"
        lineHeightVar="--semantic-typography-hero-1-regular-lineHeight"
        fontWeightVar="--semantic-typography-hero-1-regular-fontWeight"
        sample="가나다라마바사 ABCDEFG 1234567890"
      />
      <TypographyCard 
        name="Hero 1 Bold" 
        fontSizeVar="--semantic-typography-hero-1-bold-fontSize"
        lineHeightVar="--semantic-typography-hero-1-bold-lineHeight"
        fontWeightVar="--semantic-typography-hero-1-bold-fontWeight"
        sample="가나다라마바사 ABCDEFG 1234567890"
      />
    </div>

    <div style={{ marginBottom: '2rem' }}>
      <h3>Title</h3>
      <TypographyCard 
        name="Title 1 Regular" 
        fontSizeVar="--semantic-typography-title-1-regular-fontSize"
        lineHeightVar="--semantic-typography-title-1-regular-lineHeight"
        fontWeightVar="--semantic-typography-title-1-regular-fontWeight"
        sample="가나다라마바사 ABCDEFG 1234567890"
      />
      <TypographyCard 
        name="Title 2 Regular" 
        fontSizeVar="--semantic-typography-title-2-regular-fontSize"
        lineHeightVar="--semantic-typography-title-2-regular-lineHeight"
        fontWeightVar="--semantic-typography-title-2-regular-fontWeight"
        sample="가나다라마바사 ABCDEFG 1234567890"
      />
    </div>

    <div style={{ marginBottom: '2rem' }}>
      <h3>Body</h3>
      <TypographyCard 
        name="Body 1 Regular" 
        fontSizeVar="--semantic-typography-body-1-regular-fontSize"
        lineHeightVar="--semantic-typography-body-1-regular-lineHeight"
        fontWeightVar="--semantic-typography-body-1-regular-fontWeight"
        sample="가나다라마바사 ABCDEFG 1234567890"
      />
      <TypographyCard 
        name="Body 2 Regular" 
        fontSizeVar="--semantic-typography-body-2-regular-fontSize"
        lineHeightVar="--semantic-typography-body-2-regular-lineHeight"
        fontWeightVar="--semantic-typography-body-2-regular-fontWeight"
        sample="가나다라마바사 ABCDEFG 1234567890"
      />
    </div>
  </div>
);

const SpacingSection = () => (
  <div>
    <h2>간격 토큰</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].map(size => (
        <SpacingCard key={size} name={size} variable={`--semantic-spacingVer-global-${size}`} />
      ))}
    </div>
  </div>
);

const RadiusSection = () => (
  <div>
    <h2>라운드 코너 토큰</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      {['none', 'sm', 'md', 'lg', 'xl', 'xxl', 'circular'].map(size => (
        <RadiusCard key={size} name={size} variable={`--semantic-radius-global-${size}`} />
      ))}
    </div>
  </div>
);

// 컴포넌트 헬퍼 함수
const ColorCard = ({ name, variable }: { name: string, variable: string }) => {
  const colorValue = getComputedStyle(document.documentElement).getPropertyValue(variable);
  
  return (
    <div style={{ width: '150px' }}>
      <div 
        style={{ 
          height: '80px', 
          backgroundColor: `var(${variable})`,
          borderRadius: 'var(--semantic-radius-global-md)',
          marginBottom: '8px',
          border: '1px solid #E0E0E0'
        }} 
      />
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#666' }}>{variable}</div>
      <div style={{ fontSize: '12px', color: '#999' }}>{colorValue}</div>
    </div>
  );
};

const TypographyCard = ({ 
  name, 
  fontSizeVar, 
  lineHeightVar, 
  fontWeightVar, 
  sample 
}: { 
  name: string;
  fontSizeVar: string;
  lineHeightVar: string;
  fontWeightVar: string;
  sample: string;
}) => {
  const fontSize = getComputedStyle(document.documentElement).getPropertyValue(fontSizeVar);
  const lineHeight = getComputedStyle(document.documentElement).getPropertyValue(lineHeightVar);
  const fontWeight = getComputedStyle(document.documentElement).getPropertyValue(fontWeightVar);
  
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div 
        style={{ 
          fontSize: `var(${fontSizeVar})`,
          lineHeight: `var(${lineHeightVar})`,
          fontWeight: `var(${fontWeightVar})`,
          marginBottom: '8px'
        }}
      >
        {sample}
      </div>
      <div style={{ display: 'flex', fontSize: '14px', color: '#666', gap: '16px' }}>
        <div>{name}</div>
        <div>Size: {fontSize}</div>
        <div>Line Height: {lineHeight}</div>
        <div>Weight: {fontWeight}</div>
      </div>
    </div>
  );
};

const SpacingCard = ({ name, variable }: { name: string, variable: string }) => {
  const spacingValue = getComputedStyle(document.documentElement).getPropertyValue(variable);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '80px' }}>{name}</div>
      <div
        style={{
          height: '24px',
          width: `var(${variable})`,
          backgroundColor: 'var(--semantic-color-primary-background-1-rest)',
          marginRight: '16px',
        }}
      />
      <div style={{ fontSize: '14px', color: '#666' }}>
        {variable}: {spacingValue}
      </div>
    </div>
  );
};

const RadiusCard = ({ name, variable }: { name: string, variable: string }) => {
  const radiusValue = getComputedStyle(document.documentElement).getPropertyValue(variable);
  
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          height: '80px',
          width: '80px',
          borderRadius: `var(${variable})`,
          backgroundColor: 'var(--semantic-color-primary-background-1-rest)',
          marginBottom: '8px',
        }}
      />
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        {variable}: {radiusValue}
      </div>
    </div>
  );
}; 