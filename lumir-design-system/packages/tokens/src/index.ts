// 추후 컴포넌트에서 토큰을 임포트할 때 사용할 인덱스 파일
import tokens from '../dist/js/tokens.js';

// 테마 관리 기능 추가
export { 
  ThemeManager, 
  toggleTheme, 
  getCurrentTheme, 
  setTheme,
  type Theme  // Theme 타입도 export 추가
} from './theme-switcher';

export default tokens;
export const colorTokens = tokens.color;
export const typographyTokens = tokens.typography;
export const spacingTokens = tokens.spacing; 