# LDS 디자인 시스템 구축 3단계: 디자인 토큰 개발

## 1. 개요

LDS(Lumir Design System) 구축의 세 번째 단계인 '디자인 토큰 개발'은 디자인 시스템 기반이 되는 토큰 체계를 완성하고 최적화하는 단계입니다. 이 단계에서는 기존에 정의된 파운데이션 토큰과 시맨틱 토큰을 검증하고, 테마 시스템을 구축하며, 다양한 형식으로 토큰을 출력하는 빌드 시스템을 완성합니다.

## 2. 목표 및 결과물

### 목표
- 파운데이션 토큰 및 시맨틱 토큰 검증 및 보완
- 라이트/다크 테마 전환 시스템 구축
- 다양한 형식(CSS, JS, SCSS, TypeScript)으로 토큰 출력
- 토큰 버전 관리 시스템 완성
- 토큰 사용 가이드 작성

### 결과물
- 최적화된 토큰 파일 (foundation.json, semantic.json)
- 테마 전환 유틸리티
- 다양한 포맷으로 컴파일된 토큰 파일
- 토큰 관리 시스템 문서
- 테마 시스템 구현 및 문서

## 3. 기술 스택

| 영역 | 기술 | 용도 |
|------|------|------|
| 토큰 변환 | Style Dictionary | 디자인 토큰 처리 및 변환 |
| 테마 관리 | CSS 변수 | 테마 전환 메커니즘 |
| 타입 지원 | TypeScript | 타입 안전성 보장 |
| 토큰 검증 | JSON Schema | 토큰 구조 및 값 검증 |
| 문서화 | Markdown, Storybook | 토큰 사용법 문서화 |

## 4. 상세 작업 절차

### 4.1 파운데이션 토큰 검증 및 보완

#### 4.1.1 토큰 구조 검증

기존 `foundation.json` 파일의 구조와 값을 검증합니다.

```bash
# JSON 스키마 검증 도구 설치
pnpm add -D ajv ajv-cli

# 토큰 스키마 검증
npx ajv validate -s schemas/foundation-schema.json -d packages/tokens/shared/mark01/foundation.json
```

#### 4.1.2 토큰 값 최적화

```javascript
// packages/tokens/scripts/optimize-tokens.js
const fs = require('fs');
const path = require('path');

// 토큰 파일 경로
const foundationPath = path.resolve(__dirname, '../shared/mark01/foundation.json');

// 토큰 파일 읽기
const foundationTokens = JSON.parse(fs.readFileSync(foundationPath, 'utf8'));

// 색상 값 정규화 (소문자 hex 코드로 변환)
function normalizeColorValues(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      normalizeColorValues(obj[key]);
    } else if (
      typeof obj[key] === 'string' && 
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(obj[key])
    ) {
      obj[key] = obj[key].toLowerCase();
    }
  });
  return obj;
}

// 색상 값 정규화 적용
foundationTokens.foundation.color = normalizeColorValues(foundationTokens.foundation.color);

// 최적화된 토큰 파일 저장
fs.writeFileSync(
  foundationPath,
  JSON.stringify(foundationTokens, null, 2),
  'utf8'
);

console.log('파운데이션 토큰이 최적화되었습니다.');
```

#### 4.1.3 토큰 문서화

```markdown
// packages/documentation/tokens/foundation.md
# 파운데이션 토큰

파운데이션 토큰은 디자인 시스템의 기본이 되는 원시 값들입니다. 이 토큰들은 시맨틱 토큰을 구성하는 기본 요소로 사용됩니다.

## 색상 시스템

파운데이션 색상 토큰은 `light`와 `dark` 모드를 모두 지원하며, 각 색상은 0부터 100까지의 단계로 구성됩니다.

### 그레이 스케일

```css
--foundation-color-grey-light-0: #000000;
--foundation-color-grey-light-20: #333333;
--foundation-color-grey-light-40: #666666;
--foundation-color-grey-light-60: #999999;
--foundation-color-grey-light-80: #CCCCCC;
--foundation-color-grey-light-100: #FFFFFF;
```

## 타이포그래피 시스템

...
```

### 4.2 시맨틱 토큰 검증 및 보완

#### 4.2.1 토큰 참조 검증

시맨틱 토큰이 실제로 존재하는 파운데이션 토큰을 참조하는지 확인합니다.

```javascript
// packages/tokens/scripts/validate-token-references.js
const fs = require('fs');
const path = require('path');

// 파일 경로
const foundationPath = path.resolve(__dirname, '../shared/mark01/foundation.json');
const semanticPath = path.resolve(__dirname, '../system-1/semantic.json');

// 토큰 파일 읽기
const foundationTokens = JSON.parse(fs.readFileSync(foundationPath, 'utf8'));
const semanticTokens = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));

// 파운데이션 토큰 참조 추출
function getTokenReferences(obj, result = []) {
  Object.values(obj).forEach(value => {
    if (typeof value === 'object' && value !== null) {
      getTokenReferences(value, result);
    } else if (
      typeof value === 'string' && 
      value.startsWith('{foundation.')
    ) {
      result.push(value);
    }
  });
  return result;
}

// 참조 유효성 검사
function validateReference(reference) {
  // {foundation.color.blue.light.50} 형식에서 실제 경로 추출
  const path = reference
    .replace(/^\{foundation\./, '')
    .replace(/\}$/, '')
    .split('.');
  
  // 파운데이션 토큰에서 참조 값 검색
  let current = foundationTokens.foundation;
  for (const segment of path) {
    if (current && current[segment]) {
      current = current[segment];
    } else {
      return false;
    }
  }
  
  return true;
}

// 참조 검증
const references = getTokenReferences(semanticTokens);
const invalidReferences = references.filter(ref => !validateReference(ref));

if (invalidReferences.length > 0) {
  console.error('유효하지 않은 파운데이션 토큰 참조가 발견되었습니다:');
  invalidReferences.forEach(ref => console.error(`- ${ref}`));
  process.exit(1);
} else {
  console.log(`모든 시맨틱 토큰 참조가 유효합니다. (총 ${references.length}개 참조)`);
}
```

#### 4.2.2 누락된 시맨틱 토큰 추가

시맨틱 토큰에 필요한 추가 항목을 정의합니다.

```javascript
// packages/tokens/scripts/add-missing-semantic-tokens.js
const fs = require('fs');
const path = require('path');

// 파일 경로
const semanticPath = path.resolve(__dirname, '../system-1/semantic.json');

// 토큰 파일 읽기
const semanticTokens = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));

// 누락된 토큰 추가
if (!semanticTokens.semantic.icon) {
  semanticTokens.semantic.icon = {
    size: {
      xs: { value: "{foundation.size.140}" },
      sm: { value: "{foundation.size.160}" },
      md: { value: "{foundation.size.200}" },
      lg: { value: "{foundation.size.240}" },
      xl: { value: "{foundation.size.320}" }
    },
    padding: {
      none: { value: "{foundation.spacing.0.horizontal}" },
      xs: { value: "{foundation.spacing.20.horizontal}" },
      sm: { value: "{foundation.spacing.40.horizontal}" },
      md: { value: "{foundation.spacing.60.horizontal}" }
    }
  };
}

// 수정된 토큰 파일 저장
fs.writeFileSync(
  semanticPath,
  JSON.stringify(semanticTokens, null, 2),
  'utf8'
);

console.log('시맨틱 토큰에 누락된 항목이 추가되었습니다.');
```

### 4.3 테마 시스템 구축

#### 4.3.1 테마 전환 메커니즘 설계

CSS 변수를 활용한 테마 전환 메커니즘을 구현합니다.

```javascript
// packages/tokens/src/theme-switcher.ts
/**
 * 테마 타입 정의
 */
export type Theme = 'light' | 'dark';

/**
 * 현재 테마 상태를 관리하는 클래스
 */
export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = 'light';
  private readonly THEME_STORAGE_KEY = 'lumir-theme';
  private readonly THEME_DATA_ATTRIBUTE = 'data-theme';
  
  private constructor() {
    this.initialize();
  }
  
  /**
   * 싱글톤 인스턴스 반환
   */
  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }
  
  /**
   * 초기 테마 설정
   */
  private initialize(): void {
    // 저장된 테마 확인
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme;
    
    // 시스템 테마 확인
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme: Theme = prefersDark ? 'dark' : 'light';
    
    // 테마 설정 우선순위: 저장된 테마 > 시스템 테마
    const initialTheme = savedTheme || systemTheme;
    this.setTheme(initialTheme);
    
    // 시스템 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // 사용자가 명시적으로 테마를 설정하지 않은 경우에만 시스템 테마 따르기
      if (!localStorage.getItem(this.THEME_STORAGE_KEY)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  /**
   * 테마 설정
   */
  public setTheme(theme: Theme): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute(this.THEME_DATA_ATTRIBUTE, theme);
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }
  
  /**
   * 현재 테마 반환
   */
  public getTheme(): Theme {
    return this.currentTheme;
  }
  
  /**
   * 테마 토글
   */
  public toggleTheme(): void {
    const newTheme: Theme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  /**
   * 사용자 테마 선호도 초기화 (시스템 설정 따르기)
   */
  public resetThemePreference(): void {
    localStorage.removeItem(this.THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
  }
}

// 편의를 위한 전역 테마 관리자 인스턴스
export const themeManager = ThemeManager.getInstance();

// 테마 토글 함수
export function toggleTheme(): void {
  themeManager.toggleTheme();
}

// 현재 테마 반환 함수
export function getCurrentTheme(): Theme {
  return themeManager.getTheme();
}

// 테마 설정 함수
export function setTheme(theme: Theme): void {
  themeManager.setTheme(theme);
}
```

#### 4.3.2 테마별 CSS 변수 생성을 위한 Style Dictionary 변환기 추가

```javascript
// packages/tokens/transforms.js (기존 파일에 추가)

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

// 테마별 CSS 변수 생성 포맷
StyleDictionary.registerFormat({
  name: 'css/themed-variables',
  formatter: function({ dictionary, options, file }) {
    const { light, dark } = dictionary.allTokens.reduce(
      (themes, token) => {
        if (token.value && typeof token.value === 'object' && token.value.light && token.value.dark) {
          const path = token.path.join('-');
          themes.light[path] = token.value.light;
          themes.dark[path] = token.value.dark;
        } else {
          const path = token.path.join('-');
          themes.light[path] = token.value;
          themes.dark[path] = token.value;
        }
        return themes;
      },
      { light: {}, dark: {} }
    );

    let output = [
      '/**',
      ' * 자동 생성된 테마 기반 디자인 토큰',
      ' * @generated',
      ' */',
      ':root {',
      '  /* 라이트 테마 (기본) */'
    ];

    Object.entries(light).forEach(([name, value]) => {
      output.push(`  --${name}: ${value};`);
    });

    output.push('}');
    output.push('');
    output.push('[data-theme="dark"] {');
    output.push('  /* 다크 테마 */');

    Object.entries(dark).forEach(([name, value]) => {
      output.push(`  --${name}: ${value};`);
    });

    output.push('}');

    return output.join('\n');
  }
});
```

#### 4.3.3 Style Dictionary 설정 업데이트

```javascript
// packages/tokens/config.js (업데이트)
const path = require('path');
const { fileHeader } = require('style-dictionary/lib/common/formatHelpers');

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
      }, {
        destination: 'tokens-themed.css',
        format: 'css/themed-variables',
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
      }, {
        destination: 'tokens.cjs.js',
        format: 'javascript/module'
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/types/',
      files: [{
        destination: 'index.d.ts',
        format: 'typescript/module-declarations'
      }, {
        destination: 'theme.d.ts',
        format: 'typescript/theme-interface'
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables'
      }, {
        destination: '_tokens-map.scss',
        format: 'scss/map-deep'
      }]
    }
  }
};
```

#### 4.3.4 TypeScript 테마 인터페이스 포맷 추가

```javascript
// packages/tokens/formats/typescript-theme-interface.js
module.exports = {
  name: 'typescript/theme-interface',
  formatter: function({ dictionary }) {
    const themes = ['light', 'dark'];
    
    // 토큰을 카테고리별로 그룹화
    const tokensByCategory = dictionary.allTokens.reduce((acc, token) => {
      const category = token.path[1]; // semantic.color.primary => color
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(token);
      return acc;
    }, {});
    
    // 각 카테고리별 인터페이스 생성
    const interfaces = Object.entries(tokensByCategory).map(([category, tokens]) => {
      const properties = tokens.map(token => {
        const path = token.path.slice(2).join('.');
        let type = 'string';
        if (token.value && typeof token.value === 'object') {
          type = 'ThemeValue';
        }
        return `  '${path}': ${type};`;
      });
      
      return `export interface ${capitalize(category)}Tokens {\n${properties.join('\n')}\n}`;
    });
    
    // 테마 인터페이스 생성
    return `/**
 * 자동 생성된 테마 토큰 인터페이스
 * @generated
 */

export type Theme = 'light' | 'dark';

export interface ThemeValue {
  light: string;
  dark: string;
}

${interfaces.join('\n\n')}

export interface DesignTokens {
  ${Object.keys(tokensByCategory).map(category => `${category}: ${capitalize(category)}Tokens;`).join('\n  ')}
}

export interface ThemeTokens {
  [key: string]: string | ThemeTokens;
}
`;
  }
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

### 4.4 토큰 버전 관리 시스템 완성

#### 4.4.1 버전 관리 스크립트 확장

기존 버전 관리 스크립트에 기능을 추가합니다.

```javascript
// packages/utils/version-manager.js에 추가할 기능
/**
 * 두 버전의 토큰 차이를 비교하는 함수
 * @param {string} versionA - 비교할 첫 번째 버전
 * @param {string} versionB - 비교할 두 번째 버전
 * @returns {object} - 차이점 목록
 */
function compareVersions(versionA, versionB) {
  const versionAPath = path.resolve(VERSION_BASE_PATH, versionA);
  const versionBPath = path.resolve(VERSION_BASE_PATH, versionB);
  
  if (!fs.existsSync(versionAPath) || !fs.existsSync(versionBPath)) {
    console.error(`버전 ${versionA} 또는 ${versionB}가 존재하지 않습니다.`);
    return null;
  }
  
  const tokenA = JSON.parse(fs.readFileSync(path.resolve(versionAPath, 'foundation.json'), 'utf8'));
  const tokenB = JSON.parse(fs.readFileSync(path.resolve(versionBPath, 'foundation.json'), 'utf8'));
  
  const differences = diff(tokenA, tokenB);
  return differences;
}

/**
 * 변경 로그를 생성하는 함수
 * @param {string} version - 새 버전명
 * @param {string} baseVersion - 기반 버전명
 * @param {string} description - 변경 설명
 */
function generateChangeLog(version, baseVersion, description) {
  const changelogPath = path.resolve(__dirname, '../tokens/CHANGELOG.md');
  const date = new Date().toISOString().split('T')[0];
  const differences = compareVersions(baseVersion, version);
  
  let changelogContent = '';
  
  if (fs.existsSync(changelogPath)) {
    changelogContent = fs.readFileSync(changelogPath, 'utf8');
  }
  
  const newEntry = `
## ${version} (${date})

${description || '새 토큰 버전 릴리스'}

### 변경사항

${formatDifferences(differences) || '* 초기 릴리스'}

### 기반 버전

* ${baseVersion}
`;

  fs.writeFileSync(
    changelogPath,
    newEntry + (changelogContent ? '\n\n' + changelogContent : ''),
    'utf8'
  );
  
  console.log(`버전 ${version}에 대한 변경 로그가 생성되었습니다.`);
  return true;
}

// 차이점 포맷 도우미 함수
function formatDifferences(differences) {
  if (!differences || Object.keys(differences).length === 0) {
    return '';
  }
  
  const lines = [];
  
  if (differences.added && differences.added.length) {
    lines.push('**추가된 토큰:**');
    differences.added.forEach(item => {
      lines.push(`* \`${item.path.join('.')}\`: ${JSON.stringify(item.value)}`);
    });
  }
  
  if (differences.modified && differences.modified.length) {
    lines.push('**수정된 토큰:**');
    differences.modified.forEach(item => {
      lines.push(`* \`${item.path.join('.')}\`: ${JSON.stringify(item.oldValue)} → ${JSON.stringify(item.newValue)}`);
    });
  }
  
  if (differences.deleted && differences.deleted.length) {
    lines.push('**삭제된 토큰:**');
    differences.deleted.forEach(item => {
      lines.push(`* \`${item.path.join('.')}\`: ${JSON.stringify(item.value)}`);
    });
  }
  
  return lines.join('\n');
}
```

#### 4.4.2 버전 관리 가이드 작성

```markdown
// packages/documentation/guides/token-versioning.md
# 디자인 토큰 버전 관리 가이드

Lumir Design System은 디자인 토큰을 체계적으로 관리하기 위해 버전 관리 시스템을 제공합니다.

## 버전 관리 원칙

1. **파운데이션 토큰**은 `markXX` 형식의 버전으로 관리됩니다.
2. 모든 변경은 **하위 호환성**을 유지해야 합니다.
3. 기존 토큰의 값을 변경할 때는 새 버전을 생성해야 합니다.
4. 현재 활성 버전은 `current` 디렉토리에 복사됩니다.

## 버전 관리 명령어

### 버전 목록 조회

```bash
pnpm token:version list
```

### 버전 전환

```bash
pnpm token:version switch mark01
```

### 새 버전 생성

```bash
pnpm token:version create mark02 mark01 "색상 시스템 개선"
```

## 버전 업데이트 프로세스

1. 새 버전을 생성합니다.
2. 토큰 파일을 수정합니다.
3. 변경 로그가 자동으로 생성됩니다.
4. 변경 사항을 커밋하고 푸시합니다.
5. 필요시 패키지 버전을 업데이트합니다.

## 의존성 관리

디자인 시스템을 사용하는 프로젝트들이 어떤 토큰 버전을 사용하는지 추적하는 것이 중요합니다.
토큰 버전 변경 시 마이그레이션 가이드를 제공하는 것을 권장합니다.
```

### 4.5 토큰 사용 가이드 작성

#### 4.5.1 개발자 사용 가이드

```markdown
// packages/documentation/guides/using-tokens.md
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
```

#### 4.5.2 디자이너 사용 가이드

```markdown
// packages/documentation/guides/tokens-for-designers.md
# 디자이너를 위한 디자인 토큰 가이드

Lumir Design System 토큰은 디자이너와 개발자 간의 일관된 커뮤니케이션을 위한 공통 언어입니다.

## 토큰 아키텍처

Lumir 디자인 시스템은 두 가지 계층의 토큰으로 구성됩니다:

1. **파운데이션 토큰**: 디자인 시스템의 핵심이 되는 원시 값들 (색상, 크기, 간격 등)
2. **시맨틱 토큰**: 파운데이션 토큰을 참조하여 UI 요소의 목적과 상황에 맞게 정의된 의미론적 값들

## 관행 및 네이밍 규칙

### 색상 토큰

색상 토큰은 다음 구조를 따릅니다:

- `semantic.color.[기능].[용도].[강조도].[상태]`

예시:
- `semantic.color.primary.background.1.rest`
- `semantic.color.secondary.foreground.2.hovered`

### 간격 토큰

간격 토큰은 다음 구조를 따릅니다:

- `semantic.spacingVer.global.[크기]` (수직 간격)
- `semantic.spacingHor.global.[크기]` (수평 간격)

크기 옵션: `none`, `xxxs`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`

### 타이포그래피 토큰

타이포그래피 토큰은 다음 구조를 따릅니다:

- `semantic.typography.[유형]/[크기].[무게]`

예시:
- `semantic.typography.heading/1.bold`
- `semantic.typography.body/2.regular`

## Figma에서 디자인 토큰 사용하기

1. Figma Tokens 플러그인 설치
2. JSON 파일 불러오기 (`foundation.json` 및 `semantic.json`)
3. 토큰을 스타일과 컴포넌트에 적용

## 새 토큰 제안 프로세스

1. 토큰 추가 필요성 문서화
2. 파운데이션 레벨 또는 시맨틱 레벨 결정
3. 명명 규칙에 따라 토큰 이름 작성
4. PR을 통해 제안 및 검토
```

### 4.6 토큰 빌드 및 패키지 설정 최적화

#### 4.6.1 토큰 빌드 스크립트 최적화

```javascript
// packages/tokens/scripts/build.js
const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// 필요한 디렉토리가 없으면 생성
const directories = [
  'dist',
  'dist/css',
  'dist/js',
  'dist/scss',
  'dist/types'
];

directories.forEach(dir => {
  const dirPath = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// 커스텀 포맷 등록
const typeScriptThemeInterface = require('../formats/typescript-theme-interface');
StyleDictionary.registerFormat(typeScriptThemeInterface);

// 설정 파일 로드
const config = require('../config');

// Style Dictionary 실행
const styleDictionary = StyleDictionary.extend(config);

console.log('빌드 시작...');
styleDictionary.buildAllPlatforms();
console.log('빌드 완료!');
```

#### 4.6.2 package.json 스크립트 업데이트

```json
// packages/tokens/package.json 업데이트
{
  "scripts": {
    "build": "node scripts/build.js",
    "build:watch": "nodemon --watch shared --watch system-1 --ext json --exec 'node scripts/build.js'",
    "clean": "rimraf dist",
    "validate": "node scripts/validate-token-references.js",
    "optimize": "node scripts/optimize-tokens.js",
    "prebuild": "npm run validate && npm run optimize",
    "prepare": "npm run build"
  }
}
```

## 5. 테스트 및 검증

### 5.1 토큰 검증 테스트

```bash
# 토큰 참조 유효성 검사
pnpm --filter @lumir/tokens validate

# 토큰 최적화
pnpm --filter @lumir/tokens optimize

# 테마 가이드 생성
pnpm --filter @lumir/tokens build
```

### 5.2 토큰 출력 형식 검증

빌드된 토큰 파일이 다양한 형식으로 올바르게 출력되었는지 확인합니다:

```bash
# CSS 변수 확인
cat packages/tokens/dist/css/tokens.css

# JavaScript 모듈 확인
cat packages/tokens/dist/js/tokens.js

# TypeScript 타입 정의 확인
cat packages/tokens/dist/types/index.d.ts

# Sass 변수 확인
cat packages/tokens/dist/scss/_tokens.scss
```

### 5.3 테마 전환 테스트

```javascript
// packages/tokens/test/theme-switcher.test.js
const { ThemeManager } = require('../dist/js/theme-switcher');

// 테마 매니저 싱글톤 테스트
describe('ThemeManager', () => {
  beforeEach(() => {
    // DOM 환경 초기화
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });
  
  test('기본 테마가 light로 설정되어야 함', () => {
    const themeManager = ThemeManager.getInstance();
    expect(themeManager.getTheme()).toBe('light');
  });
  
  test('테마 변경이 data-theme 속성에 반영되어야 함', () => {
    const themeManager = ThemeManager.getInstance();
    themeManager.setTheme('dark');
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('lumir-theme')).toBe('dark');
  });
  
  test('테마 토글이 올바르게 작동해야 함', () => {
    const themeManager = ThemeManager.getInstance();
    themeManager.setTheme('light');
    themeManager.toggleTheme();
    
    expect(themeManager.getTheme()).toBe('dark');
    
    themeManager.toggleTheme();
    expect(themeManager.getTheme()).toBe('light');
  });
});
```

## 6. 문제 해결 및 향후 개선 사항

### 6.1 일반적인 문제 해결

- **토큰 참조 오류**: 시맨틱 토큰이 존재하지 않는 파운데이션 토큰을 참조하는 경우
  → `pnpm --filter @lumir/tokens validate` 실행 후 오류 확인
  
- **테마 전환 문제**: CSS 변수가 올바르게 적용되지 않는 경우
  → 브라우저 개발자 도구로 `data-theme` 속성과 CSS 변수 값 확인
  
- **빌드 오류**: Style Dictionary 변환 중 오류가 발생하는 경우
  → 토큰 파일 형식 및 구조 검증

### 6.2 향후 개선 사항

- **토큰 시각화 도구**: 토큰 값을 시각적으로 확인할 수 있는 도구
- **토큰 추적 시스템**: 토큰 사용 현황을 추적하는 시스템
- **디자인 도구 연동**: Figma와의 양방향 동기화
- **토큰 검색 도구**: 개발자가 필요한 토큰을 쉽게 찾는 도구
- **다국어 지원 토큰**: 다국어 텍스트를 토큰으로 관리하는 방안

## 7. 참고 자료

- [Style Dictionary 문서](https://amzn.github.io/style-dictionary/#/)
- [Design Tokens 개념](https://www.designtokens.org/)
- [CSS 변수 MDN 문서](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [테마 전환 기법](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
- [토큰 네이밍 규칙](https://designsystem.digital.gov/design-tokens/) 