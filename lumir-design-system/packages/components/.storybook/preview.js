// CSS 변수를 포함한 스타일 시트 가져오기를 위한 설정이 필요합니다
import 'lumir-design-tokens/dist/css/tokens.css';
import '../src/styles/storybook-global.css';
import { create } from '@storybook/theming/create';

// 미리보기 영역을 위한 테마 설정
const previewTheme = create({
  base: 'light',
  
  // 브랜드
  brandTitle: 'Lumir Design System',
  brandUrl: '#',
  
  // 색상
  colorPrimary: '#2196F3', // semantic-color-primary-foreground-1-rest
  colorSecondary: '#42A5F5', // semantic-color-primary-background-2-rest

  // 배경색 및 텍스트 색상
  appBg: '#F4F4F4', // foundation-color-grey-light-96
  appContentBg: '#FFFFFF', // foundation-color-grey-light-100
  textColor: '#333333', // semantic-color-secondary-foreground-1-rest
});

// 디자인 토큰 CSS 변수 임포트 (실제 토큰 파일로 교체 필요)
const designTokens = {
  // 색상 토큰
  // 기본 색상
  '--semantic-color-primary-background-1-rest': '#2196F3',
  '--semantic-color-primary-background-1-hovered': '#42A5F5',
  '--semantic-color-primary-background-1-pressed': '#1976D2',
  '--semantic-color-primary-background-1-disabled': '#BBDEFB',
  '--semantic-color-primary-background-1-subtle': '#E3F2FD',
  '--semantic-color-primary-foreground-1-rest': '#1565C0',
  
  '--semantic-color-secondary-background-1-rest': '#F5F5F5',
  '--semantic-color-secondary-background-2-rest': '#EEEEEE',
  '--semantic-color-secondary-background-3-rest': '#E0E0E0',
  '--semantic-color-secondary-foreground-1-rest': '#333333',
  '--semantic-color-secondary-foreground-2-rest': '#666666',
  '--semantic-color-secondary-foreground-3-rest': '#999999',
  
  '--semantic-color-primary-oncolor-global': '#FFFFFF',
  
  // 상태 색상
  '--semantic-color-status-success-global': '#4CAF50',
  '--semantic-color-status-warning-global': '#FF9800',
  '--semantic-color-status-error-global': '#F44336',
  '--semantic-color-status-info-global': '#2196F3',
  
  // 타이포그래피 토큰
  // 글꼴
  '--foundation-typography-fontFamily-base': "'Noto Sans KR', sans-serif",
  
  // 크기
  '--semantic-typography-hero-1-regular-fontSize': '3rem',
  '--semantic-typography-hero-1-regular-lineHeight': '1.2',
  '--semantic-typography-hero-1-regular-fontWeight': '400',
  '--semantic-typography-hero-1-bold-fontSize': '3rem',
  '--semantic-typography-hero-1-bold-lineHeight': '1.2',
  '--semantic-typography-hero-1-bold-fontWeight': '700',
  
  '--semantic-typography-title-1-regular-fontSize': '2.5rem',
  '--semantic-typography-title-1-regular-lineHeight': '1.2',
  '--semantic-typography-title-1-regular-fontWeight': '400',
  '--semantic-typography-title-2-regular-fontSize': '2rem',
  '--semantic-typography-title-2-regular-lineHeight': '1.3',
  '--semantic-typography-title-2-regular-fontWeight': '400',
  
  '--semantic-typography-body-1-regular-fontSize': '1rem',
  '--semantic-typography-body-1-regular-lineHeight': '1.5',
  '--semantic-typography-body-1-regular-fontWeight': '400',
  '--semantic-typography-body-2-regular-fontSize': '0.875rem',
  '--semantic-typography-body-2-regular-lineHeight': '1.5',
  '--semantic-typography-body-2-regular-fontWeight': '400',
  
  // 간격 토큰
  '--semantic-spacingVer-global-none': '0',
  '--semantic-spacingVer-global-xxxs': '0.125rem',
  '--semantic-spacingVer-global-xxs': '0.25rem',
  '--semantic-spacingVer-global-xs': '0.5rem',
  '--semantic-spacingVer-global-sm': '0.75rem',
  '--semantic-spacingVer-global-md': '1rem',
  '--semantic-spacingVer-global-lg': '1.5rem',
  '--semantic-spacingVer-global-xl': '2rem',
  '--semantic-spacingVer-global-xxl': '3rem',
  '--semantic-spacingVer-global-xxxl': '4rem',
  
  // 라운드 코너 토큰
  '--semantic-radius-global-none': '0',
  '--semantic-radius-global-sm': '0.125rem',
  '--semantic-radius-global-md': '0.25rem',
  '--semantic-radius-global-lg': '0.5rem',
  '--semantic-radius-global-xl': '0.75rem',
  '--semantic-radius-global-xxl': '1rem',
  '--semantic-radius-global-circular': '50%',
  '--semantic-radius-global-pill': '9999px',
};

// 문서에 CSS 변수 적용
function applyDesignTokens() {
  Object.entries(designTokens).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

// 토큰 적용
setTimeout(applyDesignTokens, 0);

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: previewTheme,
      toc: {
        title: 'Lumir Design System',
        headingSelector: 'h2, h3',
      },
    },
    // 배경색 설정
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FFFFFF', // foundation-color-grey-light-100
        },
        {
          name: 'subtle',
          value: '#F4F4F4', // foundation-color-grey-light-96
        },
        {
          name: 'dark',
          value: '#333333', // semantic-color-secondary-foreground-1-rest
        },
      ],
    },
    // 뷰포트 크기 설정
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1366px',
            height: '900px',
          },
        },
      },
    },
  },
};

export default preview; 