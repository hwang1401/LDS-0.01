# LDS 디자인 시스템 구축 4단계: 기본 컴포넌트 개발

## 1. 개요

LDS(Lumir Design System) 구축의 네 번째 단계인 '기본 컴포넌트 개발'은 디자인 시스템의 기본적인 UI 빌딩 블록인 프리미티브 컴포넌트를 개발하는 단계입니다. 프리미티브 컴포넌트는 더 이상 분해할 수 없는 가장 기본적인 UI 요소로, 향후 개발될 모든 복합 컴포넌트의 기반이 됩니다.

## 2. 목표 및 결과물

### 목표
- 명확한 컴포넌트 계층 구조 설정(프리미티브, 컴파운드, 패턴)
- 핵심 프리미티브 컴포넌트 개발
- 토큰 기반 스타일링과 일관된 디자인 언어 구현
- 컴포넌트 테스트 프레임워크 구축
- 컴포넌트 문서화 시스템 구현
- 접근성(WCAG) 표준 준수 구현

### 결과물
- 핵심 프리미티브 컴포넌트 라이브러리
- 컴포넌트 테스트 스위트
- 스토리북 기반 컴포넌트 문서화
- 컴포넌트 접근성 검증 시스템
- 컴포넌트 개발 가이드라인

## 3. 컴포넌트 계층 구조 및 분류 기준

### 3.1 컴포넌트 계층 정의

#### 3.1.1 프리미티브 컴포넌트 (Primitives)
- **정의**: 더 이상 분해할 수 없는 기본 UI 빌딩 블록으로, 단일 책임을 가지며 다른 LDS 컴포넌트에 의존하지 않는 독립적인 요소
- **핵심 특성**:
  - 자족성: 다른 LDS 컴포넌트를 가져오지(import) 않음
  - 원자성: 더 작은 의미 있는 UI 컴포넌트로 분해할 수 없음
  - 단일 책임: 명확히 정의된 하나의 기능 또는 목적
  - 맥락 독립성: 어떤 상황에서도 동일하게 작동
- **판별 기준**: 다른 LDS 컴포넌트를 import하지 않고, 더 작은 의미 있는 UI 요소로 분해할 수 없으며, 단일 기능이나 목적을 가진 경우

#### 3.1.2 컴파운드 컴포넌트 (Compounds)
- **정의**: 두 개 이상의 프리미티브 컴포넌트를 조합하여 만든 UI 요소로, 일관된 상호작용 패턴과 내부 상태 관리를 제공하는 자체 포함된 컴포넌트
- **핵심 특성**:
  - 합성성: 프리미티브 컴포넌트들의 조합으로 구성
  - 내부 로직: 구성 요소 간 상호작용 관리
  - 독립적 기능: 단일 UI 패턴으로 일관되게 작동
  - 맥락 독립성: 비즈니스 로직이나 특정 도메인 지식에 의존하지 않음
- **판별 기준**: 여러 프리미티브로 구성되고, 자체 내부 상태를 관리하며, 특정 비즈니스 로직에 의존하지 않는 경우

#### 3.1.3 패턴 컴포넌트 (Patterns)
- **정의**: 특정 사용자 문제나 비즈니스 요구를 해결하기 위해 설계된 복합적인 UI 솔루션으로, 여러 컴파운드와 프리미티브 컴포넌트를 결합하여 특정 맥락에서 작동하도록 최적화된 컴포넌트
- **핵심 특성**:
  - 문제 해결 중심: 특정 사용자 문제나 비즈니스 요구 해결에 초점
  - 복합 기능: 여러 상호작용과 기능을 조합
  - 맥락 의존성: 특정 워크플로우나 비즈니스 로직과 통합
  - 높은 복잡성: 복잡한 상태 관리와 데이터 흐름 포함
- **판별 기준**: 특정 비즈니스 로직이나 도메인 지식을 포함하고, 복잡한 상태 관리가 필요하며, 특정 맥락에 최적화된 경우

### 3.2 토큰 시스템 사용 규칙

#### 3.2.1 토큰 계층 이해
```
Foundation 토큰 → Semantic 토큰 → 컴포넌트
```

#### 3.2.2 컴포넌트 유형별 토큰 사용 규칙
1. **프리미티브 컴포넌트**:
   - Foundation 토큰 직접 참조 가능 (제한적으로)
   - Semantic 토큰 사용 권장

2. **컴파운드 컴포넌트**:
   - **반드시 Semantic 토큰만 사용**
   - Foundation 토큰 직접 참조 금지

3. **패턴 컴포넌트**:
   - **반드시 Semantic 토큰만 사용**
   - Foundation 토큰 직접 참조 금지

#### 3.2.3 필수 준수 규칙
1. **하드코딩 금지**: 색상, 크기, 간격 등의 값을 직접 하드코딩하지 않고 **항상 토큰을 사용**
2. **컴포넌트 계층 규칙 준수**: 컴포넌트 유형에 따라 정의된 의존성 방향 엄격히 준수
3. **시맨틱 토큰 사용**: 컴파운드와 패턴 컴포넌트는 **오직 시맨틱 토큰만 사용**

## 4. 기술 스택

| 영역 | 기술 | 용도 |
|------|------|------|
| 프레임워크 | React | 컴포넌트 개발 기반 |
| 언어 | TypeScript | 타입 안정성 및 개발 경험 향상 |
| 스타일링 | CSS Variables, CSS Modules | 토큰 기반 스타일링 |
| 테스트 | Jest, React Testing Library | 단위 및 통합 테스트 |
| 문서화 | Storybook | 컴포넌트 개발 및 문서화 |
| 접근성 | axe-core, @storybook/addon-a11y | 접근성 검증 |
| 빌드 | Rollup | 컴포넌트 패키지 번들링 |

## 5. 개발 대상 컴포넌트 목록

### 5.1 프리미티브 컴포넌트

| 컴포넌트 | 특징 | 우선순위 |
|---------|-------------------|---------|
| **Box** | 기본 레이아웃 컨테이너 | 최우선 |
| **Text** | 텍스트 표시 요소 | 최우선 |
| **Icon** | 아이콘 표시 요소 | 최우선 |
| **Button** | 액션 트리거 요소 | 최우선 |
| **Input** | 텍스트 입력 요소 | 최우선 |
| **Checkbox** | 선택 상태 요소 | 높음 |
| **Radio** | 단일 선택 요소 | 높음 |
| **Divider** | 구분선 요소 | 높음 |
| **Avatar** | 사용자 표현 요소 | 중간 |
| **Badge** | 알림 표시 요소 | 중간 |
| **Spinner** | 로딩 표시 요소 | 중간 |
| **Link** | 하이퍼링크 요소 | 중간 |

## 6. 프리미티브 컴포넌트 개발 가이드

### 6.1 컴포넌트 구조 패턴

```tsx
// Button.tsx (프리미티브 컴포넌트 예시)
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'; // 변형
  size?: 'small' | 'medium' | 'large'; // 크기
  disabled?: boolean; // 상태
  children: React.ReactNode; // 내용
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // 이벤트
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  ...rest
}) => {
  // 클래스 구성
  const classes = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    disabled ? styles['button--disabled'] : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
```

```css
/* Button.module.css */
.button {
  /* Semantic 토큰 사용 */
  font-family: var(--semantic-typography-button-fontFamily);
  font-weight: var(--semantic-typography-button-fontWeight);
  border: none;
  border-radius: var(--semantic-radius-button-medium);
  cursor: pointer;
  transition: background-color var(--semantic-motion-duration-fast) var(--semantic-motion-easing-standard);
}

/* 변형 */
.button--primary {
  background-color: var(--semantic-color-button-primary-background-rest);
  color: var(--semantic-color-button-primary-foreground-rest);
}

.button--primary:hover:not(.button--disabled) {
  background-color: var(--semantic-color-button-primary-background-hover);
}

.button--primary:active:not(.button--disabled) {
  background-color: var(--semantic-color-button-primary-background-active);
  transform: scale(0.98);
}

/* 크기 */
.button--medium {
  height: var(--semantic-size-button-medium-height);
  padding: 0 var(--semantic-spacing-button-medium-horizontal);
  font-size: var(--semantic-typography-button-medium-fontSize);
}

/* 상태 */
.button--disabled {
  opacity: var(--semantic-opacity-disabled);
  cursor: not-allowed;
}
```

### 6.2 스타일링 특징 적용

#### 6.2.1 그림자 및 깊이
컴포넌트 간의 깊이와 계층을 표현하기 위한 그림자 사용:

```css
.card {
  box-shadow: var(--semantic-shadow-card-rest);
}

.card:hover {
  box-shadow: var(--semantic-shadow-card-hover);
}
```

#### 6.2.2 애니메이션 및 전환
자연스럽고 부드러운 애니메이션을 통한 사용자 경험 향상:

```css
.element {
  transition: all var(--semantic-motion-duration-normal) var(--semantic-motion-easing-standard);
}

@keyframes dialogEnter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### 6.2.3 반응형 상호작용
사용자 액션에 대한 명확한 피드백 제공:

```css
.button:active {
  transform: scale(0.98);
}

.checkbox:checked + .checkbox-indicator {
  animation: checkmark 0.2s var(--semantic-motion-easing-standard) forwards;
}
```

## 7. 프리미티브 컴포넌트 개발 절차

### 7.1 컴포넌트 라이브러리 초기 설정

#### 7.1.1 컴포넌트 패키지 초기화

```bash
# components 패키지 디렉토리로 이동
cd packages/components

# 패키지 초기화
pnpm init

# 기본 의존성 설치
pnpm add react react-dom @lumir/tokens
pnpm add -D typescript @types/react @types/react-dom rollup @rollup/plugin-typescript rollup-plugin-peer-deps-external

# 폴더 구조 생성
mkdir -p src/primitives src/compounds src/patterns src/utils
```

#### 7.1.2 컴포넌트 패키지 설정 (packages/components/package.json)

```json
{
  "name": "@lumir/components",
  "version": "0.1.0",
  "description": "Lumir Design System Components",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "sideEffects": false,
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "clean": "rimraf dist storybook-static"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@lumir/tokens": "workspace:*"
  },
  "devDependencies": {
    "@babel/core": "^7.21.0",
    "@rollup/plugin-commonjs": "^24.0.1",
    "@rollup/plugin-node-resolve": "^15.0.1",
    "@rollup/plugin-typescript": "^11.0.0",
    "@storybook/addon-a11y": "^6.5.16",
    "@storybook/addon-actions": "^6.5.16",
    "@storybook/addon-essentials": "^6.5.16",
    "@storybook/addon-links": "^6.5.16",
    "@storybook/builder-webpack5": "^6.5.16",
    "@storybook/manager-webpack5": "^6.5.16",
    "@storybook/react": "^6.5.16",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@types/jest": "^29.4.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "babel-loader": "^9.1.2",
    "eslint": "^8.36.0",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0",
    "rimraf": "^4.3.0",
    "rollup": "^3.19.0",
    "rollup-plugin-css-only": "^4.3.0",
    "rollup-plugin-dts": "^5.2.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "ts-jest": "^29.0.5",
    "tslib": "^2.5.0",
    "typescript": "^4.9.5"
  }
}
```

### 7.2 핵심 프리미티브 컴포넌트 개발 순서

1. **Box 컴포넌트**: 기본 레이아웃 요소
2. **Text 컴포넌트**: 텍스트 표시 요소
3. **Button 컴포넌트**: 액션 트리거 요소
4. **Icon 컴포넌트**: 아이콘 표시 요소
5. **Input 컴포넌트**: 텍스트 입력 요소
6. **Checkbox 컴포넌트**: 체크박스 요소
7. **Radio 컴포넌트**: 라디오 버튼 요소

### 7.3 컴포넌트 테스트 작성

각 컴포넌트에 대해 다음 유형의 테스트를 작성합니다:

1. **단위 테스트**: 컴포넌트의 기본 렌더링 및 기능 검증
2. **상호작용 테스트**: 사용자 상호작용에 따른 동작 검증
3. **접근성 테스트**: WCAG 지침 준수 여부 검증
4. **스냅샷 테스트**: 시각적 회귀 방지

### 7.4 컴포넌트 문서화

각 컴포넌트에 대해 Storybook을 사용하여 다음 항목을 문서화합니다:

1. **기본 사용법**: 컴포넌트의 기본 사용 방법
2. **변형 및 크기**: 지원되는 모든 변형과 크기
3. **상태**: 다양한 상태(disabled, loading 등)
4. **속성(Props) 정의**: 모든 속성에 대한 설명과 기본값
5. **사용 예시**: 실제 사용 사례와 예시 코드

## 8. 품질 및 일관성 확보 방안

### 8.1 컴포넌트 개발 체크리스트

모든 프리미티브 컴포넌트는 다음 체크리스트를 충족해야 합니다:

- [ ] 다른 LDS 컴포넌트에 의존하지 않음
- [ ] 모든 시각적 속성은 토큰을 통해 정의됨(하드코딩 없음)
- [ ] 키보드 접근성 및 포커스 관리 구현
- [ ] ARIA 역할 및 속성 적절히 적용
- [ ] 모든 상태 및 변형 테스트 작성
- [ ] 문서화 및 사용 예시 제공

### 8.2 코드 리뷰 가이드라인

컴포넌트 코드 리뷰 시 다음 사항을 중점적으로 확인합니다:

1. **토큰 사용**: 하드코딩된 값이 없는지 확인
2. **계층 규칙**: 컴포넌트 계층 규칙을 준수하는지 확인
3. **접근성**: 접근성 지침을 준수하는지 확인
4. **성능**: 불필요한 렌더링이나 성능 이슈가 없는지 확인
5. **일관성**: 디자인 시스템의 일관된 디자인 언어를 적용했는지 확인

## 9. 결론

이 단계에서는 LDS 디자인 시스템의 기본 빌딩 블록인 프리미티브 컴포넌트를 개발합니다. 명확한 계층 구조, 토큰 시스템 사용 규칙을 준수하여 일관되고 유지보수 가능한 컴포넌트 라이브러리를 구축하는 것이 목표입니다. 이렇게 구축된 프리미티브 컴포넌트는 향후 컴파운드 컴포넌트와 패턴 컴포넌트 개발의 견고한 기반이 될 것입니다. 