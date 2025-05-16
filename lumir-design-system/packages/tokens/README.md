# @lumir/tokens

루미르 디자인 시스템의 디자인 토큰 패키지입니다.

## 설치

```bash
npm install @lumir/tokens
# or
yarn add @lumir/tokens
# or
pnpm add @lumir/tokens
```

## 개요

디자인 토큰은 디자인 시스템의 기본 구성 요소로, 색상, 타이포그래피, 공간, 그림자 등의 디자인 속성을 정의합니다. 이 패키지는 다양한 형식(CSS 변수, JavaScript 객체, SCSS 변수 등)으로 토큰을 제공합니다.

## 최근 변경사항 (v1.0.2)

- **변환 로직 개선**: semantic.json의 토큰들이 CSS 변수로 올바르게 변환되도록 개선되었습니다.
- **단일 CSS 파일 활용**: 중복된 variables.css 파일을 제거하고 tokens.css 파일로 통합했습니다.
- **컴포넌트 토큰 활용 방식 개선**: 컴포넌트에서 시맨틱 토큰을 직접 참조하는 방식으로 변경되었습니다.

## 토큰 구조 및 네이밍 규칙

루미르 디자인 시스템은 두 가지 주요 토큰 유형을 사용합니다:

### 1. 파운데이션 토큰 (Foundation Tokens)

원시 디자인 값을 정의하는 기본적인 토큰입니다. 이 값들은 직접 사용하기보다 시맨틱 토큰을 통해 사용하는 것이 권장됩니다.

**네이밍 규칙**: `--foundation-[카테고리]-[속성]-[변형]-[값]`

**예시**:
- `--foundation-color-blue-light-50`: 블루 색상 팔레트 라이트 테마의 50 스케일
- `--foundation-typography-fontSize-160`: 16px의 폰트 크기
- `--foundation-spacing-160-horizontal`: 16px의 수평 간격

### 2. 시맨틱 토큰 (Semantic Tokens)

파운데이션 토큰을 참조하여 의미론적 용도로 매핑한 토큰입니다. 이 토큰들은 실제 UI 컴포넌트 개발에 사용됩니다.

**네이밍 규칙**: `--semantic-[카테고리]-[상황]-[용도]-[위계]-[상태]`

**예시**:
- `--semantic-color-button-primary-background-rest`: 기본 상태 버튼의 주요 배경색
- `--semantic-spacing-button-paddingVertical-medium`: 버튼의 중간 크기 수직 패딩
- `--semantic-radius-card-default`: 카드의 기본 테두리 반경

## 토큰 타입별 활용 방식

### 파운데이션 토큰 활용

파운데이션 토큰은 디자인 시스템의 기본 값을 정의합니다. 일반적으로 직접 사용하기보다 시맨틱 토큰을 통해 간접적으로 사용됩니다.

```css
/* 권장하지 않음 - 파운데이션 토큰 직접 사용 */
.button {
  background-color: var(--foundation-color-blue-light-50);
  padding: var(--foundation-spacing-80-horizontal);
}
```

### 시맨틱 토큰 활용

시맨틱 토큰은 디자인 의도와 컴포넌트 맥락을 반영합니다. 실제 UI 개발 시 이 토큰들을 사용하는 것이 권장됩니다.

```css
/* 권장함 - 시맨틱 토큰 사용 */
.button {
  background-color: var(--semantic-color-primary-background-rest);
  padding: var(--semantic-spacing-button-paddingVertical-medium) var(--semantic-spacing-button-paddingHorizontal-medium);
  border-radius: var(--semantic-shape-radius-button-md);
}
```

## 사용 방법

### CSS 변수 사용

1. CSS 파일 가져오기:

```jsx
// React 애플리케이션
import '@lumir/tokens/dist/css/tokens.css';
```

또는 HTML에서:

```html
<link rel="stylesheet" href="node_modules/@lumir/tokens/dist/css/tokens.css">
```

2. CSS 변수 사용:

```css
.my-element {
  /* 시맨틱 토큰 사용 (권장) */
  color: var(--semantic-color-text-primary);
  padding: var(--semantic-spacing-container-padding-medium);
  border-radius: var(--semantic-radius-container-default);
  
  /* 필요한 경우 파운데이션 토큰 사용 */
  font-size: var(--foundation-typography-fontSize-160);
}
```

### JavaScript에서 사용

```js
import { tokens } from '@lumir/tokens';

// 파운데이션 토큰 사용
console.log(tokens.foundation.colors.blue.light[50]); // "#2196F3"
console.log(tokens.foundation.typography.fontSize[160]); // "16px"

// 시맨틱 토큰 사용
console.log(tokens.semantic.color.text.primary); // "#333333"
```

### 테마 전환 시스템 사용

```jsx
import { ThemeProvider } from '@lumir/tokens';
import '@lumir/tokens/dist/css/tokens.css';

function App() {
  return (
    <ThemeProvider theme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

테마 전환 훅 사용:

```jsx
import { useTheme } from '@lumir/tokens';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

## 토큰 버전 체계

디자인 토큰은 다음과 같은 버전 체계를 가집니다:

- **mark01**: 초기 버전 토큰
- **mark02**: 두 번째 버전 토큰
- **current**: 현재 사용 중인 버전 (mark01 또는 mark02를 가리킴)

버전 전환:

```js
import { versionManager } from '@lumir/tokens';

// mark02로 버전 전환
versionManager.switchToVersion('mark02');
```

## 주요 토큰 카테고리 및 예시

### 1. 색상 토큰

#### 파운데이션 색상 토큰
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--foundation-color-blue-light-50` | #2196F3 | 브랜드 블루 색상 50% 스케일 |
| `--foundation-color-grey-light-20` | #333333 | 그레이 색상 20% 스케일 |
| `--foundation-color-grey-light-90` | #E5E5E5 | 그레이 색상 90% 스케일 |

#### 시맨틱 색상 토큰
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--semantic-color-text-primary` | #333333 | 주요 텍스트 색상 |
| `--semantic-color-primary-background-rest` | #2196F3 | 주요 요소 기본 상태 배경색 |
| `--semantic-color-primary-background-hover` | #1E88E5 | 주요 요소 호버 상태 배경색 |
| `--semantic-color-status-error` | #EF5350 | 오류 상태 표시 색상 |

### 2. 타이포그래피 토큰

#### 파운데이션 타이포그래피 토큰
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--foundation-typography-fontFamily-base` | 'Pretendard, sans-serif' | 기본 글꼴 |
| `--foundation-typography-fontSize-120` | 12px | 12px 폰트 크기 |
| `--foundation-typography-fontSize-160` | 16px | 16px 폰트 크기 |

#### 시맨틱 타이포그래피 토큰
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--semantic-typography-heading-1-fontSize` | 24px | 제목 1 폰트 크기 |
| `--semantic-typography-body-regular-fontSize` | 16px | 본문 텍스트 기본 폰트 크기 |
| `--semantic-typography-caption-regular-fontSize` | 12px | 캡션 텍스트 폰트 크기 |

### 3. 공간 및 크기 토큰

#### 파운데이션 공간 토큰
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--foundation-spacing-40-vertical` | 4px | 4px 수직 간격 |
| `--foundation-spacing-160-horizontal` | 16px | 16px 수평 간격 |
| `--foundation-size-160` | 16px | 16px 크기 값 |

#### 시맨틱 공간 토큰
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--semantic-spacing-button-paddingVertical-small` | 4px | 작은 버튼 수직 패딩 |
| `--semantic-spacing-button-paddingHorizontal-medium` | 16px | 중간 버튼 수평 패딩 |
| `--semantic-spacing-card-padding-medium` | 16px | 카드 중간 패딩 |

### 4. 반경 및 테두리 토큰

#### 파운데이션 반경 토큰
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--foundation-radius-40` | 4px | 4px 테두리 반경 |
| `--foundation-radius-1000` | 10000px | 원형 테두리 반경 |

#### 시맨틱 반경 토큰
| 변수명 | 값 | 설명 |
|--------|-----|------|
| `--semantic-shape-radius-button-md` | 4px | 중간 버튼 테두리 반경 |
| `--semantic-shape-radius-button-pill` | 10000px | 알약 형태 버튼 반경 |

## 토큰 빌드 시스템

토큰은 다음과 같은 프로세스를 통해 빌드됩니다:

1. `shared/current/foundation.json`과 `system-1/semantic.json` 파일에서 토큰 정의를 로드
2. 토큰 참조를 해결하여 실제 값으로 변환 (`{foundation.color.blue.light.50}`와 같은 참조 해결)
3. 변환된 토큰을 다양한 형식(CSS, SCSS, JS)으로 출력
   - CSS: `dist/css/tokens.css`
   - SCSS: `dist/scss/_tokens.scss`
   - JavaScript: `dist/js/tokens.js`, `dist/js/tokens.esm.js`

## 토큰 커스터마이징

프로젝트 내에서 토큰을 커스터마이징하려면:

### 파운데이션 토큰 재정의 (권장하지 않음)
```css
:root {
  --foundation-color-blue-light-50: #007bff;
}
```

### 시맨틱 토큰 재정의 (권장)
```css
:root {
  --semantic-color-primary-background-rest: #007bff;
  --semantic-typography-body-regular-fontSize: 18px;
}
```

## 토큰 네이밍 패턴 상세 설명

### 1. 파운데이션 토큰 패턴

```
--foundation-[카테고리]-[속성]-[변형]-[값]
```

- **카테고리**: color, typography, spacing, radius, shadow 등
- **속성**: 카테고리 내 속성 (fontFamily, fontSize, blue, red 등)
- **변형/값**: 숫자 스케일 또는 변형 값 (light, dark, 100, 50 등)

### 2. 시맨틱 토큰 패턴

```
--semantic-[카테고리]-[상황]-[용도]-[위계]-[상태]
```

- **카테고리**: color, typography, spacing, radius, shadow 등
- **상황**: button, card, input, text 등 컴포넌트나 UI 요소
- **용도**: background, foreground, padding, margin, border 등
- **위계**: primary, secondary, small, medium, large 등
- **상태**: rest, hover, active, disabled 등 (필요한 경우) 

### 아이콘 사용 방법

이 패키지는 Lumir Design System의 아이콘 SVG 파일을 포함하고 있습니다. 아이콘 파일은 다음 경로에서 사용할 수 있습니다:

1. **직접 import**:
```jsx
// React 컴포넌트에서 SVG 직접 import
import SearchIcon from 'lumir-design-tokens/dist/icons/line icons/search.svg';

function MyComponent() {
  return <SearchIcon />;
}
```

2. **URL 참조**:
```css
.search-icon {
  background-image: url('~lumir-design-tokens/dist/icons/line icons/search.svg');
}
```

3. **원본 경로 사용**:
```jsx
// 원본 SVG 파일 경로 사용
<img src="/node_modules/lumir-design-tokens/shared/current/icons/line icons/search.svg" alt="Search" />
```

### 아이콘 유형 및 구조

아이콘은 다음과 같은 카테고리로 구성되어 있습니다:

- **라인 아이콘**: `line icons/` - 라인 스타일의 아이콘
- **플랫 아이콘**: `flat icons/` - 플랫 스타일의 아이콘
- **로고**: `logo/` - Lumir 관련 로고 아이콘 