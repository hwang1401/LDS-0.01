# Lumir 디자인 시스템 NPM 배포 가이드

이 문서는 Lumir 디자인 시스템을 npm 패키지로 배포하는 방법에 대한 가이드입니다.

## 1. 사전 준비

### 1.1 npm 계정 확인

npm 계정이 필요합니다. 아직 계정이 없다면 [npm 웹사이트](https://www.npmjs.com/)에서 가입하세요.

### 1.2 빌드 확인

배포 전 항상 최신 빌드를 확인하세요:

```bash
cd Lumir-design-system/lumir-design-system
npm run build
```

## 2. npm 로그인

터미널에서 npm 계정으로 로그인합니다:

```bash
npm login
```

사용자 이름, 비밀번호, 이메일을 입력합니다. 2단계 인증이 활성화되어 있다면 인증 코드도 입력해야 합니다.

## 3. 패키지 배포

Lumir 디자인 시스템은 모노레포 구조로 되어 있으며, `changeset`을 사용하여 패키지를 배포합니다.

### 3.1 버전 관리 (버전 업데이트가 필요한 경우)

변경 사항이 있는 패키지의 버전을 업데이트합니다:

```bash
npm run changeset
```

변경 사항을 선택하고 변경 내용을 설명합니다.

그런 다음 버전을 업데이트합니다:

```bash
npm run version
```

### 3.2 패키지 배포 실행

모든 패키지를 한 번에 배포합니다:

```bash
npm run release
```

또는 프로젝트에 포함된 배포 스크립트를 사용합니다:

```bash
npm run publish-packages
```

## 4. 개별 패키지 배포

각 패키지를 개별적으로 배포해야 하는 경우:

### 4.1 토큰 패키지 배포

```bash
cd packages/tokens
npm publish --access public
```

### 4.2 컴포넌트 패키지 배포

```bash
cd packages/components
npm publish --access public
```

## 5. 배포 확인

배포 후 패키지가 npm 레지스트리에 올라갔는지 확인하세요:

```bash
npm view lumir-design-tokens
npm view lumir-design-components
```

또는 [npm 웹사이트](https://www.npmjs.com/)에서 계정 페이지를 확인하여 패키지가 정상적으로 배포되었는지 확인하세요.

## 6. 프라이빗 레지스트리 배포 (내부용)

회사 내부 npm 레지스트리를 사용하는 경우:

```bash
npm login --registry=https://your-private-registry.com
npm publish --registry=https://your-private-registry.com
```

## 7. 배포 자동화 (CI/CD)

GitHub Actions 등을 사용한 배포 자동화 설정:

1. `.github/workflows/publish.yml` 파일 생성
2. 다음과 같은 워크플로우 설정:

```yaml
name: Publish NPM Package

on:
  push:
    branches: [main]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm run release
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

3. GitHub 저장소 설정에서 NPM_TOKEN 시크릿 추가 (npm에서 발급한 액세스 토큰)

---

배포 중 문제가 발생하면 package.json 파일의 설정, npm 권한, 패키지 이름 중복 등을 확인하세요.

## 8. 패키지 배포 취소 (필요한 경우)

배포 후 문제가 발생한 경우 72시간 이내에 배포를 취소할 수 있습니다:

```bash
npm unpublish lumir-design-components@1.0.1
npm unpublish lumir-design-tokens@1.0.2
```

특정 버전만 취소하려면 패키지 이름 뒤에 `@버전` 형식을 사용하세요.

---

© 2023 Lumir Design System Team 