import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

// 토큰 값 가져오기 (CSS 변수를 직접 사용할 수 없으므로 하드코딩)
const theme = create({
  base: 'light',
  
  // 브랜드
  brandTitle: 'Lumir Design System',
  brandUrl: '#',
  
  // 색상
  colorPrimary: '#2196F3', // semantic-color-primary-foreground-1-rest
  colorSecondary: '#42A5F5', // semantic-color-primary-background-2-rest

  // UI
  appBg: '#FFFFFF', // foundation-color-grey-light-100
  appContentBg: '#FFFFFF', // foundation-color-grey-light-100
  appBorderColor: '#E0E0E0', // foundation-color-grey-light-88
  appBorderRadius: 4, // semantic-radius-global-md

  // 텍스트 색상
  textColor: '#333333', // semantic-color-secondary-foreground-1-rest
  textInverseColor: '#FFFFFF', // foundation-color-grey-light-100

  // 폼 요소
  inputBg: '#FFFFFF', // foundation-color-grey-light-100
  inputBorder: '#CCCCCC', // semantic-color-secondary-background-1-rest
  inputTextColor: '#333333', // semantic-color-secondary-foreground-1-rest
  inputBorderRadius: 4, // semantic-radius-global-md

  // 버튼 스타일링
  buttonBg: '#2196F3', // semantic-color-primary-background-1-rest
  buttonBorder: '#1E88E5', // semantic-color-primary-stroke-1-rest
});

addons.setConfig({
  theme,
}); 