# 스토리북 폴더 구조

## 1. Concepts(하위 모든 페이지 playground 필요없음 문서만 필요)
- **1.1 디자인시스템개요**
- **1.2 토큰 시스템**
- **1.3 컴포넌트 개발 규칙**
- **1.4 디자인시스템 구축 계획**

## 2. Tokens

### 2.1 Foundation(폴더)(하위 모든 페이지 playground 필요없음 문서만 필요)
- **2.1.1 Palette Color**
- **2.1.2 Font**
- **2.1.3 Height**
- **2.1.4 Layout**
- **2.1.5 Radius**
- **2.1.6 Shadow**
- **2.1.7 Size**
- **2.1.8 Spacing**

### 2.2 Semantic(폴더)(하위 모든 페이지 playground 필요없음 문서만 필요)
- **2.2.1 Color**
- **2.2.2 Layout**
- **2.2.3 Shape**
- **2.2.4 Typography**

## 3. Component

### 3.1. Primitives
- **3.1.1 Button**

### 3.2. Compounds
- **3.2.1 Card**

### 3.3. Patterns
- **3.3.1 Dialog**

## 참고 파일

- **Concepts 섹션**: `docs/stories/concepts` 폴더의 mdx 파일 참고
- **Tokens 섹션**: `shared/tokens/foundation.json`, `design-systems/system-1/tokens/semantic.json` 참고
- **Component 섹션**: `design-systems/system-1/components/primitives/Button/Button.stories.jsx`, `Button.css` 등 참고

## 중요 사항

- 모든 페이지를 구성할 때는 반드시 semantic token을 사용해야 함
- 하드코딩된 값을 직접 사용하지 않고, 토큰 시스템을 통해 스타일 정의
- 토큰 폴더에는 문서만 있어야 함 