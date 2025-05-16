# 루미르 디자인 시스템 (LDS)

루미르 디자인 시스템은 일관되고 효율적인 사용자 인터페이스를 구축하기 위한 컴포넌트, 토큰, 패턴 및 가이드라인의 모음입니다.

## 최근 변경사항

- **시맨틱 토큰 CSS 변환 개선**: 시맨틱 토큰이 CSS 변수로 올바르게 변환되도록 개선
- **단일 CSS 파일 활용**: 중복된 variables.css 파일을 제거하고 tokens.css 파일로 통합
- **컴포넌트에서 시맨틱 토큰 직접 참조**: 컴포넌트에서 시맨틱 토큰을 직접 참조하는 방식으로 변경
- **CSS 클래스명 형식 통일**: 클래스명 케밥 케이스(kebab-case) 형식으로 통일 (button--primary 형식)
- **Fluent Design 스타일 적용**: Microsoft Fluent Design을 기반으로 한 스타일 가이드 적용

## 주요 기능

- 🎨 디자인 토큰 시스템 (색상, 타이포그래피, 공간 등)
- 🧩 재사용 가능한 React 컴포넌트
- 🌓 다크/라이트 테마 지원
- ⚡ 트리쉐이킹 및 다양한 포맷 지원
- 📚 스토리북 기반 문서화

## 패키지 구조

디자인 시스템은 다음 패키지로 구성되어 있습니다:

- `@lumir/tokens`: 디자인 토큰(색상, 타이포그래피, 공간 등)
- `@lumir/components`: React 컴포넌트 라이브러리
- `@lumir/documentation`: 문서 및 가이드라인
- `@lumir/utils`: 유틸리티 함수

## 사용자 역할별 가이드

### 1. 디자이너를 위한 가이드

디자이너는 LDS를 통해 일관된 디자인 작업을 수행하고 개발팀과 효과적으로 협업할 수 있습니다.

#### 1.1 디자인 토큰 시스템 이해하기

LDS는 다음 두 가지 토큰 계층을 사용합니다:

1. **파운데이션 토큰**: 색상, 타이포그래피, 공간 등의 기본 디자인 값
   - 예: `--foundation-color-blue-light-50`, `--foundation-typography-fontSize-160`

2. **시맨틱 토큰**: 파운데이션 토큰에 의미를 부여한 상위 수준의 토큰
   - 예: `--semantic-color-primary-background-rest`

#### 1.2 디자인 작업 흐름

1. **Figma 디자인 시스템 라이브러리 접근**:
   - Figma에서 LDS 라이브러리를 사용하여 디자인 작업을 시작하세요.
   - 공유 라이브러리에서 '루미르 디자인 시스템' 라이브러리를 프로젝트에 연결하세요.

2. **컴포넌트 및 토큰 활용**:
   - 디자인에 LDS 컴포넌트를 활용하세요.
   - 새로운 컴포넌트를 제안할 때는 기존 토큰과 컴포넌트를 기반으로 하세요.

3. **디자인 전달**:
   - 개발자에게 디자인을 전달할 때 사용한 컴포넌트와 변형(variant)을 명시하세요.
   - 커스텀 스타일이 필요한 경우 해당 부분을 명확히 전달하세요.

#### 1.3 디자인 시스템 확장하기

새로운 디자인 요소가 필요할 경우:

1. 기존 토큰과 컴포넌트로 해결할 수 있는지 검토
2. 새로운 토큰이나 컴포넌트가 필요한 경우, 디자인 시스템 팀과 협의
3. 제안된 디자인 요소가 일관성, 접근성, 사용성 측면에서 평가

### 2. 기획자를 위한 가이드

기획자는 LDS를 통해 제품 요구사항을 효과적으로 정의하고 일관된 사용자 경험을 설계할 수 있습니다.

#### 2.1 컴포넌트 라이브러리 이해하기

LDS 컴포넌트는 세 가지 계층으로 구성됩니다:

1. **프리미티브 컴포넌트**: 기본 UI 요소 (Button, Input, Text 등)
2. **컴파운드 컴포넌트**: 여러 프리미티브 컴포넌트의 조합 (Card, Dropdown, Modal 등)
3. **패턴 컴포넌트**: 특정 사용 사례에 최적화된 복잡한 UI 패턴 (DataTable, Form, SearchBar 등)

#### 2.2 제품 요구사항 작성 시 고려사항

1. **기존 컴포넌트 활용**:
   - 요구사항을 정의할 때 LDS의 기존 컴포넌트를 활용하세요.
   - [스토리북 문서](https://lumir-design-system.github.io/storybook)를 참조하여 사용 가능한 컴포넌트를 확인하세요.

2. **일관된 사용자 경험**:
   - 유사한 기능은 일관된 패턴으로 설계하세요.
   - 컴포넌트의 상태 및 변형을 고려하여 요구사항을 상세히 정의하세요.

3. **새로운 UI 패턴 제안**:
   - 새로운 UI 패턴이 필요할 경우, 기존 디자인 시스템 요소를 기반으로 제안하세요.
   - 디자인 시스템 팀과 협의하여 재사용 가능한 패턴을 정의하세요.

#### 2.3 요구사항 문서에 명시할 내용

- 사용할 컴포넌트와 변형(variant) 명시
- 상태 변화와 상호작용 방식 정의
- 반응형 동작 요구사항 설명
- 접근성 요구사항 포함
- 예외 케이스와 에러 상태 명시

### 3. 개발자를 위한 가이드

개발자는 LDS를 통해 일관되고 유지보수 가능한 UI를 효율적으로 구현할 수 있습니다.

#### 3.1 설치 및 설정

프로젝트에 LDS를 추가하려면:

```bash
# npm 사용시
npm install @lumir/components @lumir/tokens

# yarn 사용시
yarn add @lumir/components @lumir/tokens

# pnpm 사용시
pnpm add @lumir/components @lumir/tokens
```

#### 3.2 디자인 시스템 초기화

애플리케이션의 최상위 레벨에서 Provider를 사용하여 디자인 시스템을 초기화합니다:

```jsx
import { ThemeProvider } from '@lumir/components';
import '@lumir/tokens/dist/css/tokens.css';

function App() {
  return (
    <ThemeProvider theme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

#### 3.3 컴포넌트 사용하기

```jsx
import { Button, Input, Text } from '@lumir/components';

function LoginForm() {
  return (
    <div>
      <Text variant="heading">로그인</Text>
      <Input placeholder="이메일" />
      <Input type="password" placeholder="비밀번호" />
      <Button variant="primary">로그인</Button>
    </div>
  );
}
```

#### 3.4 토큰 시스템 활용하기

CSS에서 토큰 변수 사용:

```css
.customElement {
  /* 시맨틱 토큰 사용 (권장) */
  color: var(--semantic-color-text-primary);
  background-color: var(--semantic-color-primary-background-rest);
  padding: var(--semantic-spacing-button-paddingVertical-medium);
  border-radius: var(--semantic-shape-radius-button-md);
}
```

JavaScript에서 토큰 활용:

```jsx
import { tokens } from '@lumir/tokens';

// 토큰 값 접근
console.log(tokens.semantic.color.text.primary);
```

#### 3.5 테마 시스템 활용하기

테마 전환 기능 구현:

```jsx
import { useTheme, Button } from '@lumir/components';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '다크 모드' : '라이트 모드'}
    </Button>
  );
}
```

#### 3.6 컴포넌트 커스터마이징

스타일 확장하기:

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
  /* 필요한 경우에만 스타일 재정의 */
  margin-top: var(--semantic-spacing-section-gap-medium);
}
```

#### 3.7 컴포넌트 확장 및 조합

```jsx
import { Card, Text, Button } from '@lumir/components';

function FeatureCard({ title, description, onAction }) {
  return (
    <Card padding="large">
      <Text variant="heading2">{title}</Text>
      <Text variant="body">{description}</Text>
      <Button variant="primary" onClick={onAction}>
        자세히 보기
      </Button>
    </Card>
  );
}
```

## 타 프로젝트에서 패키지 사용하기

### 1. 패키지 설치하기

루미르 디자인 시스템은 npm 레지스트리에 공개되어 있으며, 다음과 같이 프로젝트에 설치할 수 있습니다:

```bash
# npm 사용시
npm install lumir-design-components lumir-design-tokens

# yarn 사용시
yarn add lumir-design-components lumir-design-tokens

# pnpm 사용시
pnpm add lumir-design-components lumir-design-tokens
```

### 2. 프로젝트 설정

#### 2.1 토큰 스타일 임포트

애플리케이션 진입점 (예: `index.js` 또는 `App.js`)에 토큰 CSS를 임포트합니다:

```jsx
// index.js 또는 App.js
import 'lumir-design-tokens/dist/css/tokens.css';
```

이 단계는 모든 디자인 토큰 CSS 변수를 애플리케이션 전체에서 사용할 수 있도록 합니다.

#### 2.2 테마 프로바이더 설정

루트 컴포넌트를 ThemeProvider로 감싸 테마 기능을 활성화합니다:

```jsx
// App.js
import React from 'react';
import { ThemeProvider } from 'lumir-design-components';
import 'lumir-design-tokens/dist/css/tokens.css';

function App() {
  return (
    <ThemeProvider theme="light">
      <div className="app">
        {/* 애플리케이션 콘텐츠 */}
      </div>
    </ThemeProvider>
  );
}

export default App;
```

### 3. 컴포넌트 사용하기

컴포넌트를 임포트하여 바로 사용할 수 있습니다:

```jsx
// MyComponent.js
import React from 'react';
import { Button, Box, Text } from 'lumir-design-components';

function MyComponent() {
  return (
    <Box padding="medium" backgroundColor="neutral">
      <Text variant="heading3">환영합니다!</Text>
      <Text variant="body">루미르 디자인 시스템을 사용한 예시 컴포넌트입니다.</Text>
      <Button variant="primary" onClick={() => alert('버튼 클릭됨!')}>
        자세히 알아보기
      </Button>
    </Box>
  );
}

export default MyComponent;
```

### 4. 토큰 활용하기

#### 4.1 CSS에서 토큰 사용

CSS 또는 CSS-in-JS 라이브러리에서 토큰 변수를 직접 사용할 수 있습니다:

```css
/* styles.css */
.custom-element {
  color: var(--semantic-color-text-primary);
  background-color: var(--semantic-color-primary-background-rest);
  padding: var(--semantic-spacing-md);
  border-radius: var(--semantic-shape-radius-md);
}
```

스타일드 컴포넌트 사용 시:

```jsx
import styled from 'styled-components';

const StyledElement = styled.div`
  color: var(--semantic-color-text-primary);
  background-color: var(--semantic-color-primary-background-rest);
  padding: var(--semantic-spacing-md);
`;
```

#### 4.2 JavaScript에서 토큰 값 접근

JavaScript에서 토큰 값에 프로그래밍 방식으로 접근할 수 있습니다:

```jsx
import { tokens } from 'lumir-design-tokens';

// 동적 스타일 계산
const dynamicStyle = {
  backgroundColor: tokens.semantic.color.primary.background.rest,
  padding: tokens.semantic.spacing.md,
};
```

### 5. 번들 크기 최적화

트리쉐이킹을 통해 필요한 컴포넌트만 번들에 포함시킬 수 있습니다:

```jsx
// 개별 컴포넌트 임포트 (권장)
import { Button } from 'lumir-design-components';
import { Card } from 'lumir-design-components';

// 이렇게 하지 마세요 (전체 라이브러리 임포트)
import * as LumirComponents from 'lumir-design-components';
```

### 6. 버전 관리 및 업데이트

패키지 버전을 package.json에 명시하여 안정적인 버전을 유지하세요:

```json
"dependencies": {
  "lumir-design-components": "^1.0.1",
  "lumir-design-tokens": "^1.0.2"
}
```

### 7. 트러블슈팅 가이드

#### 7.1 스타일이 적용되지 않는 경우

- 토큰 CSS 파일이 올바르게 임포트되었는지 확인하세요.
- CSS 변수 이름을 정확하게 사용했는지 확인하세요.
- 브라우저 개발자 도구에서 CSS 변수 값을 확인하세요.

#### 7.2 컴포넌트 props 타입 에러

- TypeScript 환경에서 타입 정의가 올바르게 로드되었는지 확인하세요.
- 컴포넌트 문서에서 지원되는 props를 확인하세요.

#### 7.3 테마 전환이 작동하지 않는 경우

- ThemeProvider가 애플리케이션 최상위 레벨에 있는지 확인하세요.
- useTheme 훅이 ThemeProvider 내부에서 사용되고 있는지 확인하세요.

## 협업 워크플로우

### 1. 디자인-개발 협업 프로세스

1. **디자인 단계**:
   - 디자이너는 Figma에서 LDS 컴포넌트를 활용하여 디자인
   - 디자인 시스템에 없는 새로운 요소가 필요한 경우 제안

2. **기획 단계**:
   - 기획자는 LDS 컴포넌트를 기반으로 요구사항 정의
   - 상태 및 상호작용을 명확히 문서화

3. **개발 단계**:
   - 개발자는 LDS 컴포넌트를 활용하여 UI 구현
   - 필요한 경우 디자인 시스템 확장

4. **피드백 및 반복**:
   - 구현된 UI 검토 및 피드백
   - 디자인 시스템 개선점 식별

### 2. 디자인 시스템 확장 프로세스

새로운 컴포넌트나 토큰이 필요한 경우:

1. **필요성 평가**:
   - 기존 컴포넌트로 해결 가능한지 검토
   - 재사용 가능성 및 일관성 평가

2. **디자인 및 개발**:
   - 디자이너와 개발자가 협업하여 새 컴포넌트 설계
   - 디자인 시스템 규칙 준수

3. **검증 및 문서화**:
   - 접근성, 사용성, 성능 테스트
   - 스토리북에 새 컴포넌트 문서화

4. **배포 및 통합**:
   - 디자인 시스템 업데이트 및 버전 관리
   - 사용자에게 변경사항 안내

## 개발 환경 설정

1. 저장소 클론:
```bash
git clone https://github.com/organization/lumir-design-system.git
cd lumir-design-system
```

2. 의존성 설치:
```bash
pnpm install
```

3. 개발 모드 실행:
```bash
pnpm dev
```

4. 스토리북 실행:
```bash
cd packages/components
pnpm storybook
```

## 문서화 및 예제

더 자세한 문서와 예제는 [스토리북 문서](https://lumir-design-system.github.io/storybook)를 참조하세요.

## 디자인 시스템 원칙

루미르 디자인 시스템은 다음 원칙을 기반으로 합니다:

1. **일관성**: 모든 플랫폼과 제품에서 일관된 사용자 경험 제공
2. **접근성**: 모든 사용자가 이용할 수 있는 포용적인 디자인
3. **효율성**: 개발자와 디자이너의 작업 효율성 향상
4. **확장성**: 다양한 요구사항에 맞게 확장 가능한 구조
5. **유지관리**: 지속적인 개선과 유지보수가 용이한 시스템

## 지원 및 문의

- **문제 보고**: GitHub Issues를 통해 버그 및 개선 제안
- **질문 및 논의**: Slack 채널 (#lds-support)
- **문서화**: [스토리북 문서](https://lumir-design-system.github.io/storybook)
- **메인테이너**: 디자인 시스템 팀 (design-system@lumir.com) 