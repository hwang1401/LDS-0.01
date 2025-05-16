# LDS 디자인 시스템 구축 2단계: 배포 자동화 환경 구축

## 1. 개요

LDS(Lumir Design System) 구축의 두 번째 단계인 '배포 자동화 환경 구축'은 디자인 시스템의 지속적 통합 및 배포(CI/CD) 환경을 설정하는 단계입니다. 이 단계에서는 npm 패키지 배포, 버전 관리 자동화, 문서 사이트 배포 등의 자동화 시스템을 구축합니다.

## 2. 목표 및 결과물

### 목표
- npm 패키지 자동 배포 환경 구축
- 시맨틱 버전 관리 자동화 시스템 구축
- 문서 사이트 및 스토리북 자동 배포 환경 설정
- 지속적 통합을 위한 테스트 및 빌드 파이프라인 구성

### 결과물
- 자동화된 npm 패키지 배포 파이프라인
- 시맨틱 릴리스 구성
- 문서 사이트 자동 배포 시스템
- 자동화된 테스트 및 빌드 워크플로우
- 변경 로그 자동 생성 시스템

## 3. 기술 스택

| 영역 | 기술 | 용도 |
|------|------|------|
| CI/CD | GitHub Actions | 자동화된 워크플로우 실행 |
| 패키지 배포 | npm | 디자인 시스템 패키지 배포 |
| 버전 관리 | semantic-release | 의미론적 버전 관리 자동화 |
| 변경 관리 | changeset | 변경 사항 추적 및 문서화 |
| 문서 배포 | GitHub Pages | 문서 사이트 호스팅 |
| 스토리북 배포 | Chromatic | 스토리북 호스팅 및 시각적 테스트 |

## 4. 상세 작업 절차

### 4.1 npm 패키지 배포 설정

#### 4.1.1 npm 설정 파일 구성

`.npmrc` 파일을 생성하여 패키지 배포 설정을 구성합니다.

```bash
# .npmrc 파일 생성
echo "registry=https://registry.npmjs.org/" > .npmrc
echo "access=public" >> .npmrc
```

#### 4.1.2 패키지 메타데이터 설정

각 패키지의 `package.json` 파일에 필요한 메타데이터를 추가합니다.

```json
// packages/tokens/package.json에 추가
{
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/organization/lumir-design-system.git",
    "directory": "packages/tokens"
  },
  "keywords": [
    "design-system",
    "tokens",
    "lumir"
  ],
  "license": "MIT"
}
```

#### 4.1.3 npm 인증 설정

GitHub Actions에서 npm으로 배포할 수 있도록 npm 인증 토큰을 설정합니다.

1. npm 토큰 생성:
   - npm 웹사이트에 로그인하여 접근 토큰 생성
   - 토큰 권한은 "publish" 설정

2. GitHub Secrets에 토큰 저장:
   - 프로젝트 저장소의 Settings > Secrets > Actions
   - `NPM_TOKEN` 이름으로 토큰 저장

### 4.2 시맨틱 릴리스 설정

#### 4.2.1 semantic-release 설치

```bash
# 루트 디렉토리에 semantic-release 설치
pnpm add -D semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/github
```

#### 4.2.2 semantic-release 설정 파일 생성

`.releaserc.json` 파일을 생성하여 시맨틱 릴리스 설정을 구성합니다.

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }]
  ]
}
```

#### 4.2.3 커밋 메시지 규칙 설정

`.commitlintrc.json` 파일을 생성하여 커밋 메시지 규칙을 설정합니다.

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "body-max-line-length": [0, "always"],
    "footer-max-line-length": [0, "always"]
  }
}
```

#### 4.2.4 commitizen 설정 (선택적)

개발자가 규칙에 맞는 커밋 메시지를 작성할 수 있도록 commitizen을 설정합니다.

```bash
# commitizen 및 관련 패키지 설치
pnpm add -D commitizen cz-conventional-changelog
```

`package.json`에 다음 설정을 추가합니다.

```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

### 4.3 Changesets 설정

#### 4.3.1 Changesets 설치

```bash
# Changesets 설치
pnpm add -D @changesets/cli
```

#### 4.3.2 Changesets 초기화

```bash
# Changesets 초기화
pnpm changeset init
```

#### 4.3.3 Changesets 설정 파일 수정

`.changeset/config.json` 파일을 수정하여 Changesets 동작을 설정합니다.

```json
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### 4.4 GitHub Actions 워크플로우 설정

#### 4.4.1 테스트 및 빌드 워크플로우

`.github/workflows/ci.yml` 파일을 수정하여 테스트 및 빌드 워크플로우를 설정합니다.

```yaml
name: CI

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
      with:
        fetch-depth: 0
    
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

#### 4.4.2 릴리스 워크플로우

`.github/workflows/release.yml` 파일을 생성하여 릴리스 워크플로우를 설정합니다.

```yaml
name: Release

on:
  push:
    branches: [ main ]

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
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
      
      - name: Build
        run: pnpm build
      
      - name: Create Release Pull Request or Publish to npm
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### 4.4.3 문서 사이트 배포 워크플로우

`.github/workflows/deploy-docs.yml` 파일을 생성하여 문서 사이트 배포 워크플로우를 설정합니다.

```yaml
name: Deploy Docs

on:
  push:
    branches: [ main ]
    paths:
      - 'packages/documentation/**'
      - '.github/workflows/deploy-docs.yml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
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
      
      - name: Build docs
        run: pnpm --filter @lumir/documentation build
      
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: packages/documentation/dist
          branch: gh-pages
```

### 4.5 스토리북 배포 설정 (Chromatic)

#### 4.5.1 Chromatic 설치

```bash
# Chromatic 설치
pnpm add -D chromatic
```

#### 4.5.2 Chromatic 배포 워크플로우

`.github/workflows/chromatic.yml` 파일을 생성하여 Chromatic 배포 워크플로우를 설정합니다.

```yaml
name: 'Chromatic'

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  chromatic-deployment:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
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
      
      - name: Build Storybook
        run: pnpm build-storybook
      
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
```

### 4.6 패키지 배포 스크립트 설정

`package.json`에 배포 관련 스크립트를 추가합니다.

```json
{
  "scripts": {
    "release": "pnpm build && changeset publish",
    "version": "changeset version && pnpm install",
    "changeset": "changeset"
  }
}
```

## 5. 테스트 및 검증

### 5.1 배포 파이프라인 테스트

```bash
# 테스트 changeset 생성
pnpm changeset

# 로컬에서 버전 업데이트 테스트
pnpm version

# 배포 테스트 (실제 배포 없이)
pnpm release --dry-run
```

### 5.2 로컬 문서 사이트 배포 테스트

```bash
# 문서 사이트 빌드
pnpm --filter @lumir/documentation build

# 로컬에서 문서 사이트 테스트
pnpm --filter @lumir/documentation preview
```

### 5.3 권한 및 보안 설정 확인

- GitHub Actions 권한 설정 확인
- npm 레지스트리 접근 권한 확인
- GitHub Pages 배포 권한 확인

## 6. 문제 해결 및 향후 개선 사항

### 6.1 일반적인 문제 해결

- npm 인증 오류: GitHub Secrets 설정 확인
- 배포 실패: 워크플로우 로그 분석
- 자동 버전 업데이트 문제: Changesets 구성 확인

### 6.2 향후 개선 사항

- 자동화 테스트 커버리지 증가
- 배포 속도 최적화
- 다중 환경 지원 (개발, 스테이징, 프로덕션)
- 알림 시스템 통합 (Slack, 이메일 등)

## 7. 참고 자료

- [semantic-release 문서](https://semantic-release.gitbook.io/semantic-release/)
- [Changesets 문서](https://github.com/changesets/changesets)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [npm 배포 문서](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [Chromatic 문서](https://www.chromatic.com/docs/) 