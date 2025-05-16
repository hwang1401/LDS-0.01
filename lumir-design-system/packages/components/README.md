# @lumir/components

루미르 디자인 시스템(LDS)의 React 컴포넌트 패키지입니다.

## 설치

```bash
npm install @lumir/components @lumir/tokens
# or
yarn add @lumir/components @lumir/tokens
# or
pnpm add @lumir/components @lumir/tokens
```

## 최근 변경사항 (v1.0.1)

- **시맨틱 토큰 직접 참조 방식으로 변경**: 컴포넌트에서 시맨틱 토큰을 직접 참조하도록 변경하여 구조 단순화
- **CSS 클래스명 형식 통일**: 클래스명 케밥 케이스(kebab-case) 형식으로 통일 (button--primary 형식)
- **토큰 패키지 의존성 업데이트**: v1.0.2 토큰 패키지로 의존성 업데이트
- **Fluent Design 스타일 적용**: Microsoft Fluent Design을 기반으로 한 스타일 가이드 적용

## 기본 컴포넌트

### Box

디자인 시스템의 가장 기본적인 레이아웃 컴포넌트입니다. 다양한 레이아웃 구성에 활용할 수 있습니다.

```jsx
import { Box } from '@lumir/components';

function App() {
  return (
    <Box padding="medium" backgroundColor="neutral-background">
      <Box marginBottom="small">헤더 콘텐츠</Box>
      <Box>메인 콘텐츠</Box>
    </Box>
  );
}
```

#### 주요 속성

- `backgroundColor`: 배경색 설정
- `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`: 패딩 설정
- `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`: 마진 설정
- `borderRadius`: 테두리 반경 설정
- `as`: 렌더링할 HTML 요소 지정 (기본값: 'div')

### Button

사용자 상호작용을 위한 버튼 컴포넌트입니다. 다양한 변형과 상태를 지원합니다.

```jsx
import { Button } from '@lumir/components';

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => console.log('클릭됨')}>기본 버튼</Button>
      <Button variant="secondary" size="small">작은 보조 버튼</Button>
      <Button variant="tertiary" disabled>비활성화된 버튼</Button>
      <Button variant="ghost" leftIcon={<Icon name="star" />}>아이콘 버튼</Button>
    </div>
  );
}
```

#### 주요 속성

- `variant`: 버튼 변형 ('primary', 'secondary', 'tertiary', 'ghost')
- `size`: 버튼 크기 ('small', 'medium', 'large')
- `isFullWidth`: 전체 너비 사용 여부
- `isLoading`: 로딩 상태 표시
- `disabled`: 비활성화 상태
- `leftIcon`, `rightIcon`: 버튼 내 아이콘 표시

## 스토리북으로 컴포넌트 확인하기

컴포넌트 패키지는 스토리북을 통해 모든 컴포넌트를 문서화하고 있습니다. 로컬에서 스토리북을 실행하려면:

```bash
cd packages/components
pnpm storybook
```

스토리북은 http://localhost:6006 에서 확인할 수 있습니다.

## 토큰 시스템 연동

컴포넌트는 @lumir/tokens 패키지의 디자인 토큰을 사용합니다. 토큰은 CSS 변수를 통해 컴포넌트에 적용됩니다.

```jsx
// 애플리케이션 진입점
import '@lumir/tokens/dist/css/tokens.css';
import { ThemeProvider } from '@lumir/components';

function App() {
  return (
    <ThemeProvider theme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

## 컴포넌트 커스터마이징

### 클래스명으로 스타일 확장

```jsx
import { Button } from '@lumir/components';
import styles from './CustomButton.module.css';

function CustomButton(props) {
  return <Button className={styles.customButton} {...props} />;
}
```

```css
/* CustomButton.module.css */
.customButton {
  margin-bottom: var(--semantic-spacing-md);
}
```

### 테마에 따른 스타일 변화

컴포넌트는 light/dark 테마를 자동으로 지원합니다. 테마 전환은 ThemeProvider를 통해 가능합니다.

```jsx
import { useTheme, Button } from '@lumir/components';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
    </Button>
  );
}
```

## 접근성

모든 컴포넌트는 WCAG 2.1 AA 가이드라인을 준수하도록 설계되었습니다:

- 키보드 접근성: 모든 상호작용 요소는 키보드로 접근 가능
- 스크린 리더 지원: 적절한 ARIA 속성 적용
- 색상 대비: 충분한 대비를 제공하는 색상 사용
- 포커스 표시: 명확한 포커스 표시자 제공

## 기여 방법

컴포넌트 개발에 기여하는 방법:

1. 저장소 클론 및 의존성 설치
2. 새 기능 또는 버그 수정을 위한 브랜치 생성
3. 변경사항 구현 및 테스트
4. 풀 리퀘스트 제출 