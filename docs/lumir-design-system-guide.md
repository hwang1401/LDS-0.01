# Lumir 디자인 시스템 사용 가이드

이 문서는 Lumir 디자인 시스템을 다른 프로젝트에서 사용하는 방법에 대한 가이드입니다. 피그마 MCP 연동 방법과 컴포넌트 사용법을 포함합니다.

## 목차

1. [설치 방법](#1-설치-방법)
2. [피그마 MCP 설정](#2-피그마-mcp-설정)
3. [컴포넌트 사용 방법](#3-컴포넌트-사용-방법)
4. [디자인 토큰 사용 방법](#4-디자인-토큰-사용-방법)
5. [개발 및 빌드 명령어](#5-개발-및-빌드-명령어)
6. [스토리북으로 컴포넌트 확인](#6-스토리북으로-컴포넌트-확인)
7. [피그마 컴포넌트 분석 및 적용 워크플로우](#7-피그마-컴포넌트-분석-및-적용-워크플로우)

## 1. 설치 방법

이 섹션에서는 완전히 새로운 프로젝트를 만들고 Lumir 디자인 시스템을 설치하는 방법을 설명합니다.

### 1.1 새 프로젝트 생성

#### React 프로젝트 생성 (Create React App)

```bash
# Create React App으로 새 프로젝트 생성
npx create-react-app my-app
cd my-app
```

#### Next.js 프로젝트 생성

```bash
# Next.js로 새 프로젝트 생성
npx create-next-app my-app
cd my-app
```

#### Vite 프로젝트 생성

```bash
# Vite로 새 프로젝트 생성
npm create vite@latest my-app -- --template react-ts
cd my-app
```

### 1.2 디자인 시스템 패키지 설치

#### 1.2.1 npm 레지스트리에서 패키지 설치 (배포 완료 후)

생성된 프로젝트 디렉토리에서 Lumir 디자인 시스템 패키지를 설치합니다.

#### npm을 사용하는 경우:

```bash
npm install lumir-design-components lumir-design-tokens
```

#### yarn을 사용하는 경우:

```bash
yarn add lumir-design-components lumir-design-tokens
```

#### pnpm을 사용하는 경우:

```bash
pnpm add lumir-design-components lumir-design-tokens
```

#### 1.2.2 로컬 패키지 설치 (npm 배포 전)

아직 npm에 배포되지 않은 상태에서 로컬 패키지를 사용하려면 다음 방법 중 하나를 선택할 수 있습니다.

##### 방법 1: npm link 사용

디자인 시스템 패키지를 빌드하고 글로벌 npm에 심볼릭 링크를 생성합니다:

```bash
# 디자인 시스템 디렉토리에서
cd Lumir-design-system/lumir-design-system
npm run build

# 토큰 패키지 링크 생성
cd packages/tokens
npm link

# 컴포넌트 패키지 링크 생성
cd ../components
npm link
npm link lumir-design-tokens  # 컴포넌트가 토큰에 의존하므로
```

그런 다음 사용할 프로젝트에서 링크된 패키지를 연결합니다:

```bash
# 사용할 프로젝트 디렉토리에서
cd your-project
npm link lumir-design-tokens
npm link lumir-design-components
```

##### 방법 2: 로컬 파일 경로 사용

package.json에서 직접 로컬 파일 경로를 참조합니다:

```json
{
  "dependencies": {
    "lumir-design-tokens": "file:../path/to/Lumir-design-system/lumir-design-system/packages/tokens",
    "lumir-design-components": "file:../path/to/Lumir-design-system/lumir-design-system/packages/components"
  }
}
```

그런 다음 종속성을 설치합니다:

```bash
npm install
```

##### 방법 3: Pack 파일 사용

디자인 시스템 패키지를 tarball로 패키징하고 해당 파일을 설치합니다:

```bash
# 디자인 시스템 디렉토리에서
cd Lumir-design-system/lumir-design-system
npm run build

# 토큰 패키지 패키징
cd packages/tokens
npm pack
# lumir-design-tokens-1.0.2.tgz 파일이 생성됩니다

# 컴포넌트 패키지 패키징
cd ../components
npm pack
# lumir-design-components-1.0.1.tgz 파일이 생성됩니다
```

그런 다음 사용할 프로젝트에서 패키지 파일을 설치합니다:

```bash
# 사용할 프로젝트 디렉토리에서
cd your-project
npm install /path/to/lumir-design-tokens-1.0.2.tgz
npm install /path/to/lumir-design-components-1.0.1.tgz
```

##### 방법 4: 비공개 npm 레지스트리 사용

회사 내부 npm 레지스트리를 사용하는 경우:

```bash
# 디자인 시스템 패키지를 비공개 레지스트리에 배포
npm publish --registry=https://your-private-registry.com

# 다른 프로젝트에서 설치할 때
npm install lumir-design-components lumir-design-tokens --registry=https://your-private-registry.com
```

#### 1.2.3 로컬 패키지 사용 시 주의사항

- TypeScript 프로젝트에서는 타입 정의가 올바르게 작동하는지 확인하세요.
- 로컬 패키지를 수정한 후에는 다시 빌드하고 링크/설치 과정을 반복해야 합니다.
- 프로덕션용으로는 패키지를 정식으로 npm에 배포하는 것이 권장됩니다.

### 1.3 TypeScript 설정 (TypeScript 프로젝트)

TypeScript 프로젝트인 경우 `tsconfig.json` 파일에 다음 설정을 추가합니다:

```json
{
  "compilerOptions": {
    // 기존 설정...
    "esModuleInterop": true,
    "jsx": "react",
    "allowSyntheticDefaultImports": true
    // 기타 설정...
  }
}
```

### 1.4 스타일 설정

#### 1.4.1 CSS 파일 임포트

애플리케이션의 진입점에서 디자인 시스템 CSS를 불러옵니다:

```javascript
// App.js 또는 index.js 또는 _app.js (Next.js)
import 'lumir-design-tokens/dist/css/tokens.css';
```

#### 1.4.2 전역 스타일 설정 (선택사항)

프로젝트의 기본 스타일에 디자인 시스템 폰트와 기본 스타일을 적용하려면 전역 CSS 파일에 다음 내용을 추가합니다:

```css
/* global.css 또는 index.css */
:root {
  /* 디자인 시스템 기본 설정 적용 */
  font-family: var(--semantic-typography-body-1-regular-fontFamily);
  font-size: var(--semantic-typography-body-1-regular-fontSize);
  line-height: var(--semantic-typography-body-1-regular-lineHeight);
  color: var(--semantic-color-secondary-foreground-1-rest);
  background-color: var(--semantic-color-secondary-background-1-rest);
}

body {
  margin: 0;
  padding: 0;
}
```

### 1.5 폴더 구조 설정 (권장)

일관된 프로젝트 구조를 위해 다음과 같은 폴더 구조를 권장합니다:

```
my-app/
├── src/
│   ├── components/       # 프로젝트 컴포넌트
│   ├── pages/            # 페이지 컴포넌트 (Next.js)
│   ├── styles/           # 스타일 파일
│   ├── utils/            # 유틸리티 함수
│   ├── App.js            # 앱 컴포넌트
│   └── index.js          # 진입점
├── public/               # 정적 파일
└── package.json
```

### 1.6 간단한 시작 예제

#### React 환경에서 기본 설정:

```jsx
// src/index.js 또는 src/main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 디자인 시스템 스타일 임포트
import 'lumir-design-tokens/dist/css/tokens.css';

// 전역 스타일 (있는 경우)
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```jsx
// src/App.js
import React from 'react';
import { Button } from 'lumir-design-components';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Lumir 디자인 시스템 테스트</h1>
      </header>
      <main>
        <Button variant="filled" colorScheme="primary">기본 버튼</Button>
        <Button variant="outlined" colorScheme="secondary">보조 버튼</Button>
        <Button variant="transparent" colorScheme="tertiary">투명 버튼</Button>
      </main>
    </div>
  );
}

export default App;
```

#### Next.js 환경에서 기본 설정:

```jsx
// pages/_app.js
import 'lumir-design-tokens/dist/css/tokens.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

```jsx
// pages/index.js
import { Button } from 'lumir-design-components';

export default function Home() {
  return (
    <div>
      <h1>Lumir 디자인 시스템 테스트</h1>
      <Button variant="filled" colorScheme="primary">기본 버튼</Button>
    </div>
  );
}
```

### 1.7 트러블슈팅

#### 일반적인 문제 해결

1. **CSS 스타일이 적용되지 않음**
   - CSS 파일이 올바르게 임포트되었는지 확인
   - 빌드 설정에서 CSS 모듈이 처리되는지 확인

2. **TypeScript 타입 오류**
   - `tsconfig.json`에 올바른 설정이 있는지 확인
   - 최신 버전의 React 타입이 설치되어 있는지 확인

3. **컴포넌트 렌더링 문제**
   - React 버전이 18.0.0 이상인지 확인 (peerDependency 요구사항)
   - 개발자 도구에서 콘솔 오류 확인

#### Webpack 설정 (필요한 경우)

특별한 Webpack 설정이 필요한 경우:

```js
// webpack.config.js 또는 Next.js의 next.config.js
module.exports = {
  // 기존 설정...
  
  module: {
    rules: [
      // 기존 규칙...
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### 1.8 추가 리소스

- [React 공식 문서](https://reactjs.org/docs/getting-started.html)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Lumir 디자인 시스템 Storybook](https://your-storybook-url.com) (사내 링크로 대체)

## 2. 피그마 MCP 설정

### 2.1 MCP란?

MCP(Model-Code Protocol)는 디자인 도구(피그마)와 코드 에디터(Cursor) 간의 연결을 제공하는 프로토콜입니다. 이를 통해 피그마 디자인을 코드로 쉽게 변환할 수 있습니다.

### 2.2 필요한 도구 설치

Cursor IDE가 설치되어 있어야 합니다. 그리고 피그마 MCP 도구를 설치합니다:

```bash
npm install -g figma-developer-mcp
```

### 2.3 피그마 API 키 생성

1. 피그마에 로그인
2. 오른쪽 상단의 프로필 아이콘 클릭 > Settings
3. Account 탭 > Personal access tokens 섹션
4. "Create a new personal access token" 클릭
5. 토큰 이름 입력 후 생성
6. 생성된 토큰을 안전한 곳에 저장 (한 번만 표시됨)

### 2.4 MCP 설정 파일 생성

Cursor IDE를 사용하는 경우, 다음 경로에 MCP 설정 파일을 생성합니다:

**Windows**: `C:\Users\사용자명\.cursor\mcp.json`
**Mac/Linux**: `~/.cursor/mcp.json`

다음 내용으로 파일을 생성하세요:

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "cmd",
      "args": [
        "/c", 
        "npx", 
        "-y", 
        "figma-developer-mcp", 
        "--figma-api-key=YOUR_FIGMA_API_KEY", 
        "--stdio"
      ]
    }
  }
}
```

`YOUR_FIGMA_API_KEY`를 2.3에서 생성한 API 키로 대체하세요.

### 2.5 연결 테스트

Cursor 채팅에서 다음 프롬프트로 연결 상태를 테스트할 수 있습니다:

```
"피그마 API가 제대로 연결되었는지 확인해줘"
```

## 3. 컴포넌트 사용 방법

### 3.1 버튼 컴포넌트 사용 예시

```jsx
import { Button } from 'lumir-design-components';

// 기본 버튼
<Button>버튼</Button>

// 다양한 변형
<Button variant="filled" colorScheme="primary">Primary Filled</Button>
<Button variant="outlined" colorScheme="secondary">Secondary Outlined</Button>
<Button variant="transparent" colorScheme="tertiary">Tertiary Transparent</Button>

// 아이콘 버튼
<Button
  buttonType="text-icon"
  leftIcon={<IconComponent />}
>
  아이콘 버튼
</Button>

// 크기 변형
<Button size="xsm">XSmall</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xlg">XLarge</Button>

// 상태 변형
<Button isLoading>로딩 버튼</Button>
<Button disabled>비활성화 버튼</Button>
<Button isSelected>선택된 버튼</Button>
<Button isFullWidth>전체 너비 버튼</Button>
```

## 4. 디자인 토큰 사용 방법

### 4.1 CSS 변수로 사용

```css
.my-component {
  /* 색상 토큰 */
  color: var(--semantic-color-primary-foreground-1-rest);
  background-color: var(--semantic-color-primary-background-1-rest);
  
  /* 타이포그래피 토큰 */
  font-family: var(--semantic-typography-body-1-medium-fontFamily);
  font-size: var(--semantic-typography-body-1-medium-fontSize);
  font-weight: var(--semantic-typography-body-1-medium-fontWeight);
  
  /* 간격 토큰 */
  padding: var(--semantic-spacingVer-global-md) var(--semantic-spacingHor-global-md);
  margin: var(--semantic-spacingVer-global-sm);
  
  /* 모양 토큰 */
  border-radius: var(--semantic-shape-radius-button-md);
}
```

### 4.2 JavaScript에서 토큰 불러오기

```javascript
import { tokens } from 'lumir-design-tokens';

console.log(tokens.colors.primary.background[1].rest);
console.log(tokens.typography.body[1].medium.fontSize);
```

## 5. 개발 및 빌드 명령어

### 5.1 모든 패키지 빌드

```bash
npm run build
```

### 5.2 개발 모드로 실행

```bash
npm run dev
```

### 5.3 토큰만 빌드

```bash
npm run token:build
```

### 5.4 린트 실행

```bash
npm run lint
```

### 5.5 테스트 실행

```bash
npm run test
```

## 6. 스토리북으로 컴포넌트 확인

### 6.1 스토리북 실행

```bash
cd packages/components
npm run storybook
```

스토리북은 기본적으로 http://localhost:6006/ 에서 실행됩니다.

### 6.2 스토리북 빌드

```bash
cd packages/components
npm run build-storybook
```

## 7. 피그마 컴포넌트 분석 및 적용 워크플로우

### 7.1 피그마 컴포넌트 분석

Cursor 채팅에서 피그마 링크와 함께 다음과 같이 요청하세요:

```
@피그마링크 버튼 컴포넌트 분석해줘
```

예시:
```
@https://www.figma.com/design/2vcJi3drqE6PSpQZAskTHm/Lumir-Design-System?node-id=396-3951 버튼 컴포넌트 분석해줘
```

### 7.2 토큰 매핑

컴포넌트 분석 후, 다음과 같이 요청하여 디자인 요소와 토큰 매핑을 확인할 수 있습니다:

```
"분석한 Button 디자인 요소에 해당하는 tokens.css의 토큰을 찾아줘. 배경색, 텍스트색, 크기, 테두리 등의 속성에 대한 토큰을 알려줘"
```

### 7.3 React 컴포넌트 생성

분석 및 토큰 매핑 후, 다음과 같이 요청하여 리액트 컴포넌트를 생성할 수 있습니다:

```
"이 button 컴포넌트를 React 컴포넌트로 구현해줘"
```

### 7.4 다양한 상태 추가

추가적인 상태와 변형을 구현하려면 다음과 같이 요청하세요:

```
"버튼 컴포넌트에 호버, 클릭, 비활성화 상태를 추가해줘"
```

### 7.5 MCP 명령어 참조

```bash
# MCP 버전 확인
npx figma-developer-mcp --version

# 특정 피그마 파일의 노드 정보 가져오기
npx figma-developer-mcp get-node --file-key=YOUR_FILE_KEY --node-id=NODE_ID

# 피그마 이미지 다운로드
npx figma-developer-mcp download-images --file-key=YOUR_FILE_KEY --node-ids=NODE_ID1,NODE_ID2 --output-dir=./images
```

---

이 가이드는 Lumir 디자인 시스템을 다양한 프로젝트에서 활용하기 위한 기본적인 정보를 제공합니다.