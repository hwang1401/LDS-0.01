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

### Figma에서 테마 만들기

1. 'light'와 'dark' 모드 테마 생성
2. 시맨틱 토큰을 토큰 세트의 컨테이너로 사용
3. 테마별 스타일 변형 정의

## 새 토큰 제안 프로세스

1. 토큰 추가 필요성 문서화
2. 파운데이션 레벨 또는 시맨틱 레벨 결정
3. 명명 규칙에 따라 토큰 이름 작성
4. PR을 통해 제안 및 검토

## 디자인 시스템 버전 추적

- 현재 활성화된 토큰 버전 확인
- 변경 사항이 있는 경우 새 버전 요청
- 변경 로그를 통한 버전 간 차이점 확인
- 디자인팀과 개발팀의 동기화 유지 