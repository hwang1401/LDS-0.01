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

### 버전 간 비교

```bash
pnpm token:version compare mark01 mark02
```

## 버전 업데이트 프로세스

1. 새 버전을 생성합니다.
   ```bash
   pnpm token:version create mark02 mark01 "색상 시스템 개선"
   ```
   
2. 토큰 파일을 수정합니다.
   ```bash
   # 수정할 파일: packages/tokens/shared/mark02/foundation.json
   ```
   
3. 변경 로그가 자동으로 생성됩니다.
   ```bash
   # 생성 위치: packages/tokens/CHANGELOG.md
   ```
   
4. 변경 사항을 커밋하고 푸시합니다.
   ```bash
   git add .
   git commit -m "feat(tokens): 색상 시스템 개선"
   git push
   ```
   
5. 필요시 패키지 버전을 업데이트합니다.
   ```bash
   # packages/tokens/package.json의 version 필드 업데이트
   ```

## 주요 버전 간 마이그레이션

1. 버전 간 차이점을 확인합니다.
   ```bash
   pnpm token:version compare mark01 mark02
   ```

2. 마이그레이션 가이드를 작성합니다.
   ```markdown
   # mark01 → mark02 마이그레이션 가이드
   
   ## 변경된 색상 토큰
   - `primary.blue.50` → `primary.blue.60`로 대체됨
   ```

3. 팀에 변경사항을 공유합니다.

## 의존성 관리

디자인 시스템을 사용하는 프로젝트들이 어떤 토큰 버전을 사용하는지 추적하는 것이 중요합니다.
토큰 버전 변경 시 마이그레이션 가이드를 제공하는 것을 권장합니다. 