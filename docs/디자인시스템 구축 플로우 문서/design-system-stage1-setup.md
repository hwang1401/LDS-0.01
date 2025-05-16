# LDS 디자인 시스템 구축 1단계: 초기 설정 및 기반 구축

## 1. 개요

LDS(Lumir Design System) 구축의 첫 번째 단계인 '초기 설정 및 기반 구축'은 디자인 시스템 개발을 위한 기술적 기반을 마련하는 단계입니다. 이 단계에서는 모노레포 구조 설정, 개발 환경 구성, 토큰 관리 시스템 구축 등의 작업을 수행합니다.

## 2. 목표 및 결과물

### 목표
- 확장 가능하고 유지보수가 용이한 모노레포 구조 구축
- 토큰 변환 및 관리 시스템 구축
- 일관된 개발 환경 및 코드 품질 유지 도구 설정
- 토큰 버전 관리 시스템 구현

### 결과물
- 모노레포 기본 구조
- 토큰 변환 및 빌드 시스템 (Style Dictionary)
- 토큰 버전 관리 스크립트
- 기본 CI/CD 파이프라인
- 개발 환경 설정 (TypeScript, ESLint, Prettier)

## 3. 기술 스택

| 영역 | 기술 | 용도 |
|------|------|------|
| 모노레포 | Turborepo | 워크스페이스 및 빌드 캐싱 관리 |
| 패키지 관리 | pnpm | 패키지 관리 및 워크스페이스 지원 |
| 토큰 변환 | Style Dictionary | 디자인 토큰 변환 및 관리 |
| 개발 언어 | TypeScript | 타입 안정성 및 개발 경험 향상 |
| 코드 품질 | ESLint, Prettier | 코드 품질 및 일관성 유지 |
| 빌드 | Rollup | 패키지 번들링 |
| CI/CD | GitHub Actions | 지속적 통합/배포 |

## 4. 상세 작업 절차

### 4.1 모노레포 설정

#### 4.1.1 프로젝트 초기화

```bash
# 새 프로젝트 폴더 생성
mkdir lumir-design-system
cd lumir-design-system

# pnpm 초기화
pnpm init

# Turborepo 설치
pnpm add turbo -D
```

#### 4.1.2 기본 구조 설정

```bash
# 기본 패키지 폴더 구조 생성
mkdir -p packages/tokens packages/components packages/documentation packages/utils
mkdir -p assets/icons config scripts
```

#### 4.1.3 루트 package.json 설정

```json
{
  "name": "lumir-design-system",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "token:build": "turbo run build --filter=@lumir/tokens",
    "token:version": "node packages/utils/version-manager.js"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "typescript": "^5.0.0",
    "eslint": "^8.40.0",
    "prettier": "^2.8.8"
  }
}
```

#### 4.1.4 turbo.json 설정

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    }
  }
}
```

### 4.2 토큰 패키지 설정

#### 4.2.1 토큰 폴더 구조 설정

```bash
# tokens 패키지 초기화
cd packages/tokens
pnpm init
cd ../..

# 토큰 버전 폴더 구조 설정
mkdir -p packages/tokens/shared/mark01 packages/tokens/shared/mark02 packages/tokens/shared/current
mkdir -p packages/tokens/system-1 packages/tokens/system-2

# 기존 토큰 파일 복사
cp foundation.json packages/tokens/shared/mark01/
cp semantic.json packages/tokens/system-1/

# semantic.json 파일의 오류(닫는 괄호 누락) 수정
```

#### 4.2.2 tokens 패키지 설정 (packages/tokens/package.json)

```json
{
  "name": "@lumir/tokens",
  "version": "0.1.0",
  "description": "Lumir Design System 토큰",
  "main": "dist/js/tokens.js",
  "module": "dist/js/tokens.esm.js",
  "types": "dist/types/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "style-dictionary build --config config.js",
    "build:watch": "style-dictionary build --config config.js --watch",
    "clean": "rimraf dist"
  },
  "dependencies": {
    "style-dictionary": "^3.8.0"
  },
  "devDependencies": {
    "rimraf": "^5.0.0"
  }
}
```

#### 4.2.3 토큰 인덱스 파일 (packages/tokens/src/index.ts)

```typescript
// 추후 컴포넌트에서 토큰을 임포트할 때 사용할 인덱스 파일
import tokens from '../dist/js/tokens.js';

export default tokens;
export const colorTokens = tokens.color;
export const typographyTokens = tokens.typography;
export const spacingTokens = tokens.spacing;
```

### 4.3 Style Dictionary 설정

#### 4.3.1 Style Dictionary 구성 파일 (packages/tokens/config.js)

```javascript
const path = require('path');

module.exports = {
  source: [
    path.resolve(__dirname, 'shared/current/**/*.json'),
    path.resolve(__dirname, 'system-1/**/*.json')
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          showFileHeader: false
        }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/types/',
      files: [{
        destination: 'index.d.ts',
        format: 'typescript/module-declarations'
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables'
      }]
    }
  }
};
```

#### 4.3.2 커스텀 Style Dictionary 포맷 및 변환기 (packages/tokens/transforms.js)

```javascript
const StyleDictionary = require('style-dictionary');

// 라이트/다크 테마 값 분리를 위한 변환기
StyleDictionary.registerTransform({
  name: 'theme/separate',
  type: 'value',
  matcher: token => token.path.includes('color'),
  transformer: token => {
    if (token.original.value && token.original.value.light && token.original.value.dark) {
      return {
        light: token.original.value.light,
        dark: token.original.value.dark
      };
    }
    return token.original.value;
  }
});

// 커스텀 변환 그룹 등록
StyleDictionary.registerTransformGroup({
  name: 'custom/web',
  transforms: [
    'theme/separate',
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css'
  ]
});

module.exports = StyleDictionary;
```

### 4.4 토큰 버전 관리 시스템

#### 4.4.1 버전 관리 스크립트 (packages/utils/version-manager.js)

```javascript
const fs = require('fs');
const path = require('path');

const VERSION_BASE_PATH = path.resolve(__dirname, '../tokens/shared');
const CURRENT_PATH = path.resolve(VERSION_BASE_PATH, 'current');

/**
 * 토큰 버전을 전환하는 함수
 * @param {string} version - 전환할 버전명 (예: 'mark01')
 * @returns {boolean} - 성공 여부
 */
function switchVersion(version) {
  const versionPath = path.resolve(VERSION_BASE_PATH, version);
  
  if (!fs.existsSync(versionPath)) {
    console.error(`버전 ${version}이 존재하지 않습니다.`);
    return false;
  }

  // 현재 버전 폴더 내용 비우기
  if (fs.existsSync(CURRENT_PATH)) {
    fs.readdirSync(CURRENT_PATH).forEach(file => {
      fs.unlinkSync(path.resolve(CURRENT_PATH, file));
    });
  } else {
    fs.mkdirSync(CURRENT_PATH);
  }

  // 지정한 버전 복사
  fs.readdirSync(versionPath).forEach(file => {
    fs.copyFileSync(
      path.resolve(versionPath, file),
      path.resolve(CURRENT_PATH, file)
    );
  });

  console.log(`버전이 ${version}으로 성공적으로 전환되었습니다.`);
  return true;
}

/**
 * 새 토큰 버전을 생성하는 함수
 * @param {string} version - 생성할 버전명 (예: 'mark02')
 * @param {string} baseVersion - 기반이 될 버전명 (예: 'mark01')
 * @returns {boolean} - 성공 여부
 */
function createVersion(version, baseVersion) {
  const versionPath = path.resolve(VERSION_BASE_PATH, version);
  const baseVersionPath = path.resolve(VERSION_BASE_PATH, baseVersion);
  
  if (fs.existsSync(versionPath)) {
    console.error(`버전 ${version}이 이미 존재합니다.`);
    return false;
  }
  
  if (!fs.existsSync(baseVersionPath)) {
    console.error(`기반 버전 ${baseVersion}이 존재하지 않습니다.`);
    return false;
  }

  // 새 버전 폴더 생성
  fs.mkdirSync(versionPath);

  // 기반 버전 파일 복사
  fs.readdirSync(baseVersionPath).forEach(file => {
    fs.copyFileSync(
      path.resolve(baseVersionPath, file),
      path.resolve(versionPath, file)
    );
  });

  console.log(`새 버전 ${version}이 ${baseVersion}을 기반으로 생성되었습니다.`);
  return true;
}

/**
 * 사용 가능한 모든 버전을 나열하는 함수
 */
function listVersions() {
  const versions = fs.readdirSync(VERSION_BASE_PATH)
    .filter(file => 
      fs.statSync(path.resolve(VERSION_BASE_PATH, file)).isDirectory() && 
      file !== 'current'
    );
  
  console.log('사용 가능한 버전:');
  versions.forEach(version => {
    console.log(`- ${version}`);
  });
  
  return versions;
}

// CLI 사용
const args = process.argv.slice(2);
if (args.length > 0) {
  const command = args[0];
  
  switch(command) {
    case 'switch':
      if (args.length > 1) {
        switchVersion(args[1]);
      } else {
        console.error('버전을 지정해주세요. 예: switch mark01');
      }
      break;
    case 'create':
      if (args.length > 2) {
        createVersion(args[1], args[2]);
      } else {
        console.error('새 버전명과 기반 버전명을 지정해주세요. 예: create mark02 mark01');
      }
      break;
    case 'list':
      listVersions();
      break;
    default:
      console.error('알 수 없는 명령입니다. 사용 가능한 명령: switch, create, list');
  }
}

module.exports = { switchVersion, createVersion, listVersions };
```

### 4.5 개발 환경 설정

#### 4.5.1 TypeScript 구성 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "moduleResolution": "node",
    "declaration": true,
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@lumir/*": ["packages/*/src"]
    }
  },
  "exclude": ["**/node_modules", "**/dist"]
}
```

#### 4.5.2 ESLint 설정 (.eslintrc.js)

```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  rules: {
    // 커스텀 규칙 설정
  }
};
```

#### 4.5.3 Prettier 설정 (.prettierrc)

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid"
}
```

### 4.6 CI/CD 파이프라인

#### 4.6.1 GitHub Actions 워크플로우 (.github/workflows/ci.yml)

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 7
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 16
        cache: 'pnpm'
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Lint
      run: pnpm lint
    
    - name: Build
      run: pnpm build
    
    - name: Test
      run: pnpm test
```

## 5. 테스트 및 검증

### 5.1 토큰 변환 검증

```bash
# 토큰 버전을 mark01로 설정
pnpm token:version switch mark01

# 토큰 빌드
pnpm token:build

# 결과물 확인
ls -la packages/tokens/dist/
```

### 5.2 빌드 결과물 검증 항목

- CSS 변수가 올바르게 생성되었는지 확인
- JavaScript 모듈이 올바르게 생성되었는지 확인
- TypeScript 타입 정의가 올바르게 생성되었는지 확인
- SCSS 변수가 올바르게 생성되었는지 확인

## 6. 다음 단계

초기 설정 및 기반 구축 단계가 완료되면, 다음 작업으로 넘어갑니다:

1. **시멘틱 토큰 검증 및 보완**: semantic.json 파일의 오류 수정 및 필요한 토큰 추가
2. **컴포넌트 라이브러리 구조 설정**: Primitive 컴포넌트 개발 준비
3. **스토리북 설정**: 컴포넌트 문서화 및 시각화 도구 준비
4. **테마 시스템 구현**: 라이트/다크 테마 전환 메커니즘 개발

## 7. 참고 자료

- [Turborepo 문서](https://turbo.build/repo/docs)
- [Style Dictionary 문서](https://amzn.github.io/style-dictionary/#/)
- [Design Tokens 개념](https://www.designtokens.org/)
- [토큰 네이밍 규칙](https://designsystem.digital.gov/design-tokens/) 