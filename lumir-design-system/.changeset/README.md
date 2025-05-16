# Changeset 사용 가이드

## 개요

Changeset은 LDS(Lumir Design System) 모노레포에서 패키지 버전 관리와 릴리스를 자동화하는 도구입니다. 이 문서는 Changeset을 사용하여 패키지 변경 사항을 기록하고, 버전을 업데이트하며, 릴리스하는 방법을 설명합니다.

## 기본 개념

Changeset은 다음과 같은 주요 개념을 기반으로 작동합니다:

- **Changeset 파일**: 각 변경 사항을 기록하는 마크다운 형식의 파일 (`.changeset` 폴더에 저장)
- **버전 타입**: SemVer(Semantic Versioning) 기반의 버전 변경 유형 (major, minor, patch)
- **릴리스 프로세스**: 변경 사항을 기록하고, 버전을 업데이트하고, 패키지를 배포하는 과정

## 워크플로우

LDS에서 Changeset을 사용한 일반적인 워크플로우는 다음과 같습니다:

### 1. 변경 사항 기록

패키지를 수정한 후 변경 사항을 기록합니다:

```bash
# 루트 디렉토리에서 실행
pnpm changeset
```

대화형 CLI가 실행되며 다음 단계를 진행합니다:

1. **패키지 선택**: 변경된 패키지를 스페이스바로 선택합니다.
   ```
   🦋 Which packages would you like to include?
   ☐ @lumir/tokens
   ☐ @lumir/components
   ☐ @lumir/documentation
   ```
   
   > **중요**: 여러 패키지를 선택할 때는 스페이스바를 사용하고, 선택 완료 후 엔터를 누릅니다.

2. **버전 타입 선택**: 각 패키지별로 변경 유형을 선택합니다.
   ```
   🦋 Which packages should have a major bump?
   ☐ @lumir/components
   ```
   
   ```
   🦋 Which packages should have a minor bump?
   ☐ @lumir/components
   ```

   > 선택 기준:
   > - **Major (1.0.0 → 2.0.0)**: 이전 버전과 호환되지 않는 API 변경
   > - **Minor (1.0.0 → 1.1.0)**: 이전 버전과 호환되는 새 기능 추가
   > - **Patch (1.0.0 → 1.0.1)**: 버그 수정, 성능 개선 등 하위 호환성 유지

3. **변경 내용 설명**: 변경 사항에 대한 설명을 입력합니다.
   ```
   🦋 Please enter a summary for this change
   ```
   
   > 좋은 설명의 예:
   > - "Button 컴포넌트에 새로운 variant 추가"
   > - "Text 컴포넌트의 접근성 이슈 수정"
   > - "Input 컴포넌트 포커스 스타일 개선"

이 과정이 완료되면 `.changeset` 디렉토리에 새로운 마크다운 파일이 생성됩니다:

```md
---
"@lumir/components": minor
---

Button 컴포넌트에 새로운 variant 추가
```

### 2. 변경 사항 확인 및 커밋

생성된 Changeset 파일을 검토하고 수정한 후 Git에 커밋합니다:

```bash
git add .changeset/
git commit -m "feat: Button 컴포넌트에 새로운 variant 추가"
```

> **패턴**: 커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/) 형식을 따르는 것이 좋습니다:
> - `feat:` - 새로운 기능
> - `fix:` - 버그 수정
> - `docs:` - 문서 변경
> - `style:` - 코드 스타일 변경
> - `refactor:` - 리팩토링
> - `test:` - 테스트 추가/수정
> - `chore:` - 빌드 프로세스 변경 등

### 3. 버전 업데이트

릴리스 준비가 완료되면 버전을 업데이트합니다:

```bash
pnpm version
```

이 명령은 다음 작업을 수행합니다:

- `.changeset` 디렉토리의 파일을 기반으로 패키지 버전 업데이트
- 각 패키지의 `CHANGELOG.md` 파일 업데이트
- 의존성을 가진 다른 패키지의 버전도 필요에 따라 업데이트

### 4. 릴리스

버전 업데이트 후 패키지를 릴리스합니다:

```bash
pnpm release
```

이 명령은 다음 작업을 수행합니다:

- 모든 패키지 빌드
- npm 레지스트리에 패키지 배포
- 사용된 Changeset 파일 제거

## 자주 묻는 질문 (FAQ)

### Q: 여러 변경 사항이 있을 때는 어떻게 하나요?

A: 각 논리적 변경마다 별도의 Changeset을 생성하는 것이 좋습니다. 예를 들어:

```bash
# 첫 번째 변경 사항
pnpm changeset  # 첫 번째 변경 사항 기록

# 두 번째 변경 사항
pnpm changeset  # 두 번째 변경 사항 기록
```

### Q: 실수로 잘못된 Changeset을 만들었을 때는 어떻게 하나요?

A: `.changeset` 디렉토리에서 해당 파일을 직접 수정하거나 삭제할 수 있습니다:

```bash
# 수정
code .changeset/[file-name].md

# 또는 삭제
rm .changeset/[file-name].md
```

### Q: 의존성이 있는 패키지는 어떻게 처리되나요?

A: Changeset은 패키지 간 의존성을 자동으로 고려합니다. 예를 들어, `@lumir/components`가 `@lumir/tokens`에 의존하고 `@lumir/tokens`가 변경되면 Changeset은 `@lumir/components`의 의존성 버전도 적절히 업데이트합니다.

### Q: Pre-release 버전은 어떻게 관리하나요?

A: Changeset은 pre-release 워크플로우를 지원합니다:

```bash
# pre-release 모드 진입
pnpm changeset pre enter beta

# 일반 changeset 워크플로우 진행
pnpm changeset
pnpm version

# pre-release 모드 종료
pnpm changeset pre exit
```

## CI/CD 통합

LDS는 GitHub Actions를 통해 자동화된 릴리스 프로세스를 설정했습니다:

1. Pull Request 생성 시 Changeset 봇이 변경 사항 유무를 확인
2. `main` 브랜치에 병합되면 자동으로 버전 업데이트 및 릴리스 진행

이 프로세스에 대한 설정은 `.github/workflows/release.yml` 파일에서 확인할 수 있습니다.

## 모범 사례

1. **작은 단위로 변경 사항 기록**: 큰 변경을 하나의 Changeset으로 기록하기보다 작은 단위로 분리하세요.
2. **명확한 설명 작성**: 변경 내용을 명확히 설명하여 다른 개발자가 이해하기 쉽게 작성하세요.
3. **버전 타입 신중히 선택**: SemVer 규칙에 따라 적절한 버전 타입(major, minor, patch)을 선택하세요.
4. **PR 전 변경 사항 기록**: 코드 변경과 함께 Changeset 파일도 함께 PR에 포함시키세요.

## 참고 자료

- [Changeset 공식 문서](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/) 