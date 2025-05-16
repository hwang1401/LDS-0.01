# 디자인 토큰 사용 가이드

Lumir Design System 토큰은 다양한 형식으로 제공되어 어떤 개발 환경에서도 쉽게 사용할 수 있습니다.

## CSS에서 사용하기

CSS 변수를 활용한 방법입니다.

```css
@import '@lumir/tokens/dist/css/tokens.css';

.button {
  background-color: var(--semantic-color-primary-background-1-rest);
  color: var(--semantic-color-primary-oncolor-global);
  padding: var(--semantic-spacingVer-global-sm) var(--semantic-spacingHor-global-md);
  border-radius: var(--semantic-radius-global-md);
}
```

## Sass에서 사용하기

Sass 변수 또는 맵을 활용한 방법입니다.

```scss
@import '@lumir/tokens/dist/scss/tokens';

.button {
  background-color: $semantic-color-primary-background-1-rest;
  color: $semantic-color-primary-oncolor-global;
  padding: $semantic-spacingVer-global-sm $semantic-spacingHor-global-md;
  border-radius: $semantic-radius-global-md;
}

// 또는 맵 사용
@import '@lumir/tokens/dist/scss/tokens-map';

.button {
  background-color: map-get-deep($tokens, 'semantic.color.primary.background.1.rest');
  color: map-get-deep($tokens, 'semantic.color.primary.oncolor.global');
}
```

## JavaScript/TypeScript에서 사용하기

```typescript
import tokens from '@lumir/tokens';

const primaryColor = tokens.semantic.color.primary.background[1].rest;
const buttonPadding = `${tokens.semantic.spacingVer.global.sm} ${tokens.semantic.spacingHor.global.md}`;
```

## 테마 전환하기

테마 전환 유틸리티를 사용한 방법입니다.

```typescript
import { setTheme, toggleTheme, getCurrentTheme } from '@lumir/tokens';

// 현재 테마 확인
const currentTheme = getCurrentTheme(); // 'light' 또는 'dark'

// 테마 수동 설정
setTheme('dark');

// 테마 토글
toggleTheme(); // light → dark 또는 dark → light
```

CSS에서는 `data-theme` 속성이 자동으로 관리됩니다:

```css
@import '@lumir/tokens/dist/css/tokens-themed.css';

.button {
  background-color: var(--semantic-color-primary-background-1-rest);
  /* data-theme 속성에 따라 자동으로 값이 변경됩니다 */
}
``` 