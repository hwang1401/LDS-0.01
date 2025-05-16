# LDS 컴포넌트 제작 가이드 - AI 코딩 어시스턴트용

> 본 문서는 Cursor AI와 같은 AI 코딩 어시스턴트가 Lumir Design System(LDS)의 컴포넌트 개발 규칙을 이해하고 정확히 준수하도록 작성되었습니다.

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [필수 준수 규칙](#2-필수-준수-규칙)
3. [컴포넌트 계층 분류 기준](#3-컴포넌트-계층-분류-기준)
4. [토큰 시스템 사용 규칙](#4-토큰-시스템-사용-규칙)
5. [프리미티브 컴포넌트 개발 패턴](#5-프리미티브-컴포넌트-개발-패턴)
6. [컴파운드 컴포넌트 개발 패턴](#6-컴파운드-컴포넌트-개발-패턴)
7. [패턴 컴포넌트 개발 패턴](#7-패턴-컴포넌트-개발-패턴)
8. [사례별 참조 코드](#8-사례별-참조-코드)

## 1. 시스템 개요

LDS는 토큰 기반의 디자인 시스템으로, 모든 시각적 요소는 토큰을 통해 정의되고 컴포넌트는 계층적으로 구성됩니다.

### 1.1 핵심 구성 요소

- **토큰 시스템**: Foundation 토큰과 Semantic 토큰으로 구성
- **컴포넌트 계층**: Primitives, Compounds, Patterns 세 계층으로 구성
- **테마 시스템**: 라이트/다크 테마 지원

## 2. 필수 준수 규칙

AI 코딩 어시스턴트는 다음 규칙을 **항상 준수**해야 합니다:

### 2.1 절대 위반하지 말아야 할 규칙

1. **하드코딩 금지**: 색상, 크기, 간격 등의 값을 직접 하드코딩하지 않고 **항상 토큰을 사용**해야 함
   - ❌ `color: #0078d4;`
   - ✅ `color: var(--semantic-color-primary-background-1-rest);`

2. **컴포넌트 계층 규칙 준수**: 컴포넌트 유형에 따라 정의된 의존성 방향 엄격히 준수
   - ❌ 패턴이 프리미티브에 직접 의존
   - ✅ 패턴 → 컴파운드 → 프리미티브 계층 구조 유지

3. **시맨틱 토큰 사용**: 컴파운드와 패턴 컴포넌트는 **오직 시맨틱 토큰만 사용**
   - ❌ 컴파운드에서 `var(--foundation-color-blue-light-50)` 사용
   - ✅ 컴파운드에서 `var(--semantic-color-primary-background-1-rest)` 사용

4. **명확한 컴포넌트 분류**: 모든 컴포넌트는 단 하나의 계층(프리미티브/컴파운드/패턴)으로 명확히 분류
   - ❌ 계층이 모호한 컴포넌트 생성
   - ✅ 명확한 분류 기준에 따라 계층 결정

## 3. 컴포넌트 계층 분류 기준

AI 어시스턴트는 다음 판별 기준을 사용하여 컴포넌트의 계층을 결정해야 합니다:

### 3.1 프리미티브 컴포넌트 판별 기준

컴포넌트가 다음 **모든** 질문에 "예"로 답할 수 있다면 **프리미티브**입니다:

1. **독립성 테스트**: 이 컴포넌트는 다른 LDS 컴포넌트를 import하지 않고 독립적으로 구현되었는가?
2. **원자성 테스트**: 이 컴포넌트는 더 작은 의미 있는 UI 컴포넌트로 분해할 수 없는가?
3. **단일 책임 테스트**: 이 컴포넌트는 정확히 한 가지 핵심 기능이나 목적을 가지고 있는가?
4. **기본 HTML 근접성 테스트**: 이 컴포넌트는 기본 HTML 요소를 직접 확장하거나 대체하는가?

### 3.2 컴파운드 컴포넌트 판별 기준

컴포넌트가 다음 기준을 **모두** 충족하면 **컴파운드**입니다:

1. **구성 테스트**: 이 컴포넌트는 두 개 이상의 프리미티브 컴포넌트로 구성되어 있는가?
2. **내부 상태 관리 테스트**: 이 컴포넌트는 자체적인 내부 상태를 관리하는가?
3. **범용성 테스트**: 이 컴포넌트는 도메인에 관계없이 다양한 맥락에서 일관되게 사용할 수 있는가?
4. **비즈니스 로직 독립성 테스트**: 이 컴포넌트는 특정 비즈니스 로직이나 도메인 지식에 의존하지 않는가?

### 3.3 패턴 컴포넌트 판별 기준

컴포넌트가 다음 기준 중 **하나 이상**을 충족하면 **패턴**입니다:

1. **비즈니스 로직 테스트**: 이 컴포넌트는 특정 비즈니스 로직이나 도메인 지식을 포함하고 있는가?
2. **사용자 작업 테스트**: 이 컴포넌트는 특정 사용자 작업이나 목표를 완료하기 위해 설계되었는가?
3. **복합 상태 관리 테스트**: 이 컴포넌트는 여러 단계나 복잡한 상태 흐름을 관리하는가?
4. **데이터 의존성 테스트**: 이 컴포넌트는 특정 데이터 구조나 API에 의존하는가?
5. **맥락 특화 테스트**: 이 컴포넌트는 특정 맥락이나 사용 사례에 최적화되어 있는가?

### 3.4 명확한 결정 트리

```
1. 다른 LDS 컴포넌트를 import하지 않는가?
   ├── 예: 더 작은 의미 있는 UI 컴포넌트로 분해할 수 없는가?
   │    ├── 예: 단일 기능이나 목적만 수행하는가?
   │    │    ├── 예: => 프리미티브 컴포넌트
   │    │    └── 아니오: => 컴파운드 컴포넌트 검토
   │    └── 아니오: => 컴파운드 컴포넌트 검토
   └── 아니오: 특정 비즈니스 로직이나 도메인 지식을 포함하는가?
        ├── 예: => 패턴 컴포넌트
        └── 아니오: 여러 컴포넌트 조합으로 단일 기능 단위를 형성하는가?
             ├── 예: => 컴파운드 컴포넌트
             └── 아니오: => 패턴 컴포넌트 검토
```

## 4. 토큰 시스템 사용 규칙

토큰 사용 시 AI 코딩 어시스턴트가 따라야 할 명확한 규칙입니다:

### 4.1 토큰 계층 이해

```
Foundation 토큰 → Semantic 토큰 → 컴포넌트
```

- **Foundation 토큰**: 기본 디자인 값 (색상, 간격, 타이포그래피 등)
- **Semantic 토큰**: Foundation 토큰을 참조하는 의미론적 토큰

### 4.2 컴포넌트 유형별 토큰 사용 규칙

1. **프리미티브 컴포넌트**:
   - Foundation 토큰 직접 참조 가능 (제한적으로)
   - Semantic 토큰 사용 권장

2. **컴파운드 컴포넌트**:
   - **반드시 Semantic 토큰만 사용**
   - Foundation 토큰 직접 참조 금지

3. **패턴 컴포넌트**:
   - **반드시 Semantic 토큰만 사용**
   - Foundation 토큰 직접 참조 금지

### 4.3 토큰 네이밍 이해

1. **Foundation 토큰 네이밍**:
   ```
   --foundation-[카테고리]-[속성]-[변형]-[값]
   ```
   예: `--foundation-color-blue-light-50`

2. **Semantic 토큰 네이밍**:
   ```
   --semantic-[카테고리]-[상황]-[용도]-[위계]-[상태]
   ```
   예: `--semantic-color-primary-background-1-rest`

### 4.4 CSS에서 토큰 참조 방법

```css
/* ✅ 올바른 방법 */
.button {
  background-color: var(--semantic-color-button-primary-background-rest);
  padding: var(--semantic-spacing-button-paddingVertical-medium) var(--semantic-spacing-button-paddingHorizontal-medium);
  border-radius: var(--semantic-radius-button-medium);
  transition: background-color var(--semantic-motion-button-transition-duration) var(--semantic-motion-button-transition-easing);
}

/* ❌ 잘못된 방법 - 하드코딩 */
.button {
  background-color: #0078d4;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 150ms cubic-bezier(0.8, 0, 0.2, 1);
}

/* ❌ 잘못된 방법 - 컴파운드에서 Foundation 토큰 직접 참조 */
.card {
  background-color: var(--foundation-color-neutral-light-100);
  padding: var(--foundation-spacing-100);
}
```

## 5. 프리미티브 컴포넌트 개발 패턴

프리미티브 컴포넌트 개발 시 AI 코딩 어시스턴트가 따라야 할 패턴입니다:

### 5.1 프리미티브 컴포넌트 구조

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
  /* ✅ Semantic 토큰 사용 */
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

### 5.2 프리미티브 컴포넌트 핵심 규칙

1. **단일 책임**: 하나의 핵심 기능에 집중
2. **외부 의존성 없음**: 다른 LDS 컴포넌트에 의존하지 않음
3. **스타일 독립성**: 자체 스타일 정의, 외부 스타일에 영향받지 않음
4. **토큰 기반 스타일링**: 모든 시각적 속성은 토큰으로 정의

## 6. 컴파운드 컴포넌트 개발 패턴

컴파운드 컴포넌트 개발 시 AI 코딩 어시스턴트가 따라야 할 패턴입니다:

### 6.1 컴파운드 컴포넌트 구조

```tsx
// Card.tsx (컴파운드 컴포넌트 예시)
import React from 'react';
import styles from './Card.module.css';
import { Box } from '../primitives/Box'; // ✅ 프리미티브 컴포넌트 가져오기
import { Text } from '../primitives/Text'; // ✅ 프리미티브 컴포넌트 가져오기

export interface CardProps {
  variant?: 'elevated' | 'outlined';
  padding?: 'small' | 'medium' | 'large';
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'medium',
  title,
  children,
  footer,
  ...rest
}) => {
  const classes = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--padding-${padding}`]
  ].filter(Boolean).join(' ');

  return (
    <Box className={classes} {...rest}>
      {title && (
        <div className={styles.header}>
          <Text as="h3" className={styles.title}>{title}</Text>
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </Box>
  );
};
```

```css
/* Card.module.css */
.card {
  /* ✅ Semantic 토큰만 사용 */
  background-color: var(--semantic-color-surface-1-rest);
  color: var(--semantic-color-text-primary);
  border-radius: var(--semantic-radius-card);
}

.card--elevated {
  box-shadow: var(--semantic-shadow-card-rest);
}

.card--outlined {
  border: 1px solid var(--semantic-color-border-card);
}

.card--padding-medium {
  padding: var(--semantic-spacing-card-padding-medium);
}

.header {
  margin-bottom: var(--semantic-spacing-card-header-gap);
}

.content {
  margin-bottom: var(--semantic-spacing-card-content-gap);
}

.footer {
  border-top: 1px solid var(--semantic-color-border-card-footer);
  padding-top: var(--semantic-spacing-card-footer-padding-top);
}
```

### 6.2 컴파운드 컴포넌트 핵심 규칙

1. **프리미티브 조합**: 두 개 이상의 프리미티브 컴포넌트로 구성
2. **내부 상태 관리**: 자체적으로 상태 관리 가능
3. **시맨틱 토큰 전용**: Foundation 토큰 직접 사용 금지
4. **비즈니스 로직 제한**: 특정 도메인 로직 포함하지 않음
5. **범용적 사용성**: 다양한 맥락에서 사용 가능

## 7. 패턴 컴포넌트 개발 패턴

패턴 컴포넌트 개발 시 AI 코딩 어시스턴트가 따라야 할 패턴입니다:

### 7.1 패턴 컴포넌트 구조

```tsx
// SearchBar.tsx (패턴 컴포넌트 예시)
import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { TextField } from '../compounds/TextField'; // ✅ 컴파운드 컴포넌트 가져오기
import { Button } from '../primitives/Button'; // ✅ 프리미티브 컴포넌트 가져오기
import { Icon } from '../primitives/Icon'; // ✅ 프리미티브 컴포넌트 가져오기

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '검색어를 입력하세요',
  onSearch,
  initialValue = '',
  loading = false,
}) => {
  const [query, setQuery] = useState(initialValue);
  
  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className={styles.searchBar}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        iconBefore={<Icon name="search" />}
        className={styles.input}
      />
      <Button 
        onClick={handleSearch}
        disabled={loading || !query.trim()}
        loading={loading}
      >
        검색
      </Button>
    </div>
  );
};
```

```css
/* SearchBar.module.css */
.searchBar {
  /* ✅ Semantic 토큰만 사용 */
  display: flex;
  gap: var(--semantic-spacing-searchbar-gap);
  width: 100%;
}

.input {
  flex: 1;
}
```

### 7.2 패턴 컴포넌트 핵심 규칙

1. **복합적 구성**: 프리미티브와 컴파운드 컴포넌트의 조합
2. **비즈니스 로직 포함**: 특정 사용자 작업이나 도메인 로직 구현 가능
3. **시맨틱 토큰 전용**: Foundation 토큰 직접 사용 금지
4. **맥락 특화**: 특정 사용 사례나 문제 해결에 최적화

## 8. 사례별 참조 코드

### 8.1 토큰 사용 예시

```css
/* ✅ 올바른 프리미티브 컴포넌트 스타일 */
.icon {
  width: var(--semantic-size-icon-medium);
  height: var(--semantic-size-icon-medium);
  color: var(--semantic-color-icon-primary);
}

/* ✅ 올바른 컴파운드 컴포넌트 스타일 */
.tooltip {
  background-color: var(--semantic-color-tooltip-background);
  color: var(--semantic-color-tooltip-foreground);
  padding: var(--semantic-spacing-tooltip-padding);
  border-radius: var(--semantic-radius-tooltip);
  box-shadow: var(--semantic-shadow-tooltip);
}

/* ❌ 잘못된 사용 - 하드코딩 값 */
.menu {
  background-color: white; /* 하드코딩 */
  border-radius: 4px; /* 하드코딩 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 하드코딩 */
}

/* ❌ 잘못된 사용 - 컴파운드에서 Foundation 토큰 직접 참조 */
.dialog {
  background-color: var(--foundation-color-neutral-light-100); /* 직접 참조 */
  padding: var(--foundation-spacing-160); /* 직접 참조 */
}
```

### 8.2 컴포넌트 계층 잘못된 사용 예시

```tsx
// ❌ 잘못된 계층 구조 - 패턴이 프리미티브를 직접 사용하지만 컴파운드 기능 포함
const LoginForm = () => {
  return (
    <form>
      <Input label="이메일" /> {/* Input이 프리미티브라면, label은 프리미티브에 없어야 함 */}
      <Input label="비밀번호" type="password" />
      <Button>로그인</Button>
    </form>
  );
};

// ✅ 올바른 계층 구조
const LoginForm = () => {
  return (
    <form>
      <FormField> {/* 컴파운드 컴포넌트 사용 */}
        <Label>이메일</Label> {/* 프리미티브 */}
        <Input /> {/* 프리미티브 */}
      </FormField>
      <FormField> {/* 컴파운드 컴포넌트 사용 */}
        <Label>비밀번호</Label> {/* 프리미티브 */}
        <Input type="password" /> {/* 프리미티브 */}
      </FormField>
      <Button>로그인</Button> {/* 프리미티브 */}
    </form>
  );
};
```

### 8.3 판별 기준 적용 예시

```
질문: TextField는 어떤 계층의 컴포넌트인가?

분석:
1. TextField는 Input, Label, HelperText 프리미티브를 조합함 (구성 테스트 ✅)
2. TextField는 포커스, 오류 상태 등 자체 상태를 관리함 (내부 상태 관리 테스트 ✅)
3. TextField는 다양한 맥락에서 사용 가능함 (범용성 테스트 ✅)
4. TextField는 특정 비즈니스 로직에 의존하지 않음 (비즈니스 로직 독립성 테스트 ✅)

결론: TextField는 컴파운드 컴포넌트입니다.

질문: SearchBar는 어떤 계층의 컴포넌트인가?

분석:
1. SearchBar는 TextField, Button 등을 조합함
2. SearchBar는 검색 쿼리 관리 및 제출 로직을 포함함 (특정 사용자 작업 테스트 ✅)
3. SearchBar는 검색이라는 특정 맥락에 최적화됨 (맥락 특화 테스트 ✅)

결론: SearchBar는 패턴 컴포넌트입니다.
```

## 마치며

AI 코딩 어시스턴트는 본 문서의 규칙을 엄격히 준수해야 합니다. LDS 컴포넌트 개발 시:

1. 항상 토큰 시스템을 사용하고 하드코딩을 피할 것
2. 컴포넌트 계층별 명확한 판별 기준에 따라 분류할 것
3. 컴포넌트 계층에 따른 토큰 사용 규칙을 지킬 것
4. 코드 생성 시 제시된 패턴을 정확히 따를 것

이 규칙을 따르면 일관되고 유지보수 가능한 LDS 컴포넌트를 개발할 수 있습니다.