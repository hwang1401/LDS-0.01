# Lumir Design System 계층별 구축 가이드

이 문서는 Lumir Design System의 각 계층(프리미티브, 컴파운드, 패턴)별로 구축해야 할 핵심 컴포넌트와 고려사항을 상세히 설명합니다. 각 계층의 컴포넌트들을 체계적으로 개발하기 위한 지침을 제공합니다.

## 목차

1. [프리미티브 계층](#1-프리미티브-계층)
2. [컴파운드 계층](#2-컴파운드-계층)
3. [패턴 계층](#3-패턴-계층)
4. [계층별 개발 우선순위](#4-계층별-개발-우선순위)
5. [계층 간 의존성 관리](#5-계층-간-의존성-관리)

## 1. 프리미티브 계층

프리미티브 컴포넌트는 디자인 시스템의 기본 빌딩 블록으로, 더 이상 분해할 수 없는 가장 기본적인 UI 요소입니다.

### 1.1 핵심 프리미티브 컴포넌트

| 컴포넌트 | 설명 | 변형 및 상태 | 우선순위 |
|---------|------|------------|---------|
| **Button** | 사용자 액션 트리거 | 변형: primary, secondary, ghost, link<br>상태: default, hover, active, focus, disabled, loading | 최우선 |
| **Input** | 사용자 텍스트 입력 | 변형: default, outline, filled<br>상태: default, hover, focus, disabled, readonly, error | 최우선 |
| **Typography** | 텍스트 표시 | 변형: heading(1-6), body, caption, label 등 | 최우선 |
| **Icon** | 시각적 요소 | 변형: filled, outlined, 크기별 | 최우선 |
| **Checkbox** | 상태 토글 | 상태: unchecked, checked, indeterminate, disabled, focus | 높음 |
| **Radio** | 단일 선택 | 상태: unselected, selected, disabled, focus | 높음 |
| **Select** | 단일 옵션 선택 | 상태: default, open, disabled, error | 높음 |
| **Switch** | 켜기/끄기 토글 | 상태: off, on, disabled, loading | 높음 |
| **Avatar** | 사용자 표현 | 변형: 이미지, 이니셜, 크기별 | 중간 |
| **Badge** | 알림 표시 | 변형: dot, count, status | 중간 |
| **Spinner/Loader** | 로딩 표시 | 변형: circular, linear, 크기별 | 중간 |
| **Divider** | 구분선 | 변형: horizontal, vertical | 중간 |
| **Image** | 이미지 표시 | 상태: loading, error | 중간 |
| **Link** | 하이퍼링크 | 상태: default, hover, visited, focus | 중간 |
| **Tag/Chip** | 정보 라벨 | 변형: removable, 색상별<br>상태: default, hover | 중간 |
| **Tooltip** | 도움말 표시 | 변형: 위치(top, right, bottom, left) | 중간 |
| **HelperText** | 설명 텍스트 | 변형: default, error, warning, success | 중간 |
| **Label** | 입력 필드 라벨 | 상태: default, disabled, required | 중간 |
| **ProgressBar** | 진행 상태 | 변형: determinate, indeterminate | 낮음 |
| **Skeleton** | 로딩 플레이스홀더 | 변형: text, circular, rectangular | 낮음 |

### 1.2 프리미티브 계층 구축 고려사항

#### 1.2.1 변형 시스템 설계

- **일관된 변형 속성**: 모든 컴포넌트에 `variant`, `size`, `shape` 등 표준화된 변형 속성 적용
- **네이밍 컨벤션**: `variant="primary"`, `size="md"`, `shape="rounded"` 등 일관된 네이밍 사용
- **변형 확장성**: 향후 추가될 수 있는 변형을 고려한 설계

```jsx
// 변형 시스템 예시
<Button variant="primary" size="md" shape="rounded" />
<Button variant="secondary" size="sm" shape="pill" />
```

#### 1.2.2 상태 관리 표준화

- **기본 상태 속성**: `disabled`, `readOnly`, `loading`, `error` 등 공통 상태 속성 정의
- **상태 전파**: 자식 요소에 상태가 전파되는 방식 표준화
- **시각적 상태 피드백**: 각 상태에 대한 일관된 시각적 피드백 제공

```jsx
// 상태 속성 예시
<Input disabled={true} />
<Button loading={true} />
<Input error={true} errorText="잘못된 형식입니다" />
```

#### 1.2.3 사이즈 체계

- **일관된 크기 척도**: `xs`, `sm`, `md`, `lg`, `xl` 등 표준화된 크기 정의
- **컴포넌트 간 비례**: 동일한 크기 값이 적용된 다른 컴포넌트끼리 시각적 일관성 유지
- **토큰 기반 크기**: 모든 크기는 디자인 토큰에 정의된 값 사용

```jsx
// 사이즈 체계 예시
<Button size="sm" />
<Input size="sm" /> // Button과 Input의 "sm" 크기는 시각적으로 일관성 유지
```

#### 1.2.4 접근성 구현

- **ARIA 역할 및 속성**: 모든 컴포넌트에 적절한 ARIA 역할 및 속성 적용
- **키보드 접근성**: 키보드만으로도 모든 기능을 사용할 수 있도록 구현
- **포커스 관리**: 명확한 포커스 표시 및 논리적인 포커스 이동 경로 제공

```jsx
// 접근성 구현 예시
<Button 
  aria-pressed={isPressed}
  aria-disabled={disabled}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
/>
```

#### 1.2.5 테스트 전략

- **단위 테스트**: 각 컴포넌트의 기능 및 상태 변화 테스트
- **스냅샷 테스트**: 시각적 회귀 방지를 위한 스냅샷 테스트
- **접근성 테스트**: WCAG 지침 준수 여부 자동 테스트

## 2. 컴파운드 계층

컴파운드 컴포넌트는 여러 프리미티브 컴포넌트를 조합하여 만든 복합 UI 요소로, 일관된 상호작용과 내부 상태 관리를 제공합니다.

### 2.1 핵심 컴파운드 컴포넌트

| 컴포넌트 | 구성 요소 | 설명 | 우선순위 |
|---------|----------|------|---------|
| **FormField** | Label + Input + HelperText | 라벨과 설명이 포함된 입력 필드 | 최우선 |
| **Dropdown** | Button + List + ListItem | 옵션 선택을 위한 드롭다운 메뉴 | 최우선 |
| **Modal/Dialog** | Overlay + Container + Header + Footer + Button | 오버레이 콘텐츠 표시 | 최우선 |
| **Card** | Container + Header + Body + Footer | 관련 콘텐츠 그룹화 | 최우선 |
| **Tabs** | TabList + Tab + TabPanel | 탭 인터페이스 | 높음 |
| **Accordion** | Header + Panel + Icon | 접이식 콘텐츠 | 높음 |
| **Toast/Notification** | Container + Icon + Text + Action | 알림 메시지 | 높음 |
| **Tooltip** | Trigger + Content | 추가 정보 표시 | 높음 |
| **Menu** | Trigger + List + Item | 컨텍스트 메뉴 | 높음 |
| **Breadcrumb** | Container + Item + Separator | 내비게이션 경로 | 중간 |
| **Pagination** | Container + Item + Navigation | 페이지 탐색 | 중간 |
| **Alert** | Container + Icon + Text + Action | 상태 알림 | 중간 |
| **Stepper** | Container + Step + Indicator | 단계 표시 | 중간 |
| **DatePicker** | Input + Calendar + Navigation | 날짜 선택 | 중간 |
| **TimePicker** | Input + Selector | 시간 선택 | 중간 |
| **FileUploader** | DropZone + Button + Preview | 파일 업로드 | 중간 |
| **Combobox** | Input + Dropdown | 검색 가능한 드롭다운 | 중간 |
| **Rating** | Container + Star/Icon | 평가 표시/입력 | 낮음 |
| **Carousel** | Container + Slide + Navigation | 슬라이드 쇼 | 낮음 |
| **ColorPicker** | Input + Palette | 색상 선택 | 낮음 |

### 2.2 컴파운드 계층 구축 고려사항

#### 2.2.1 컴포지션 패턴

- **Compound Component 패턴**: 관련 컴포넌트를 논리적으로 그룹화
- **Context API 활용**: 내부 상태를 자식 컴포넌트와 공유
- **Slot 패턴**: 유연한 콘텐츠 구성을 위한 슬롯 제공

```jsx
// 컴포지션 패턴 예시
<Tabs>
  <Tabs.List>
    <Tabs.Tab>탭 1</Tabs.Tab>
    <Tabs.Tab>탭 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel>콘텐츠 1</Tabs.Panel>
    <Tabs.Panel>콘텐츠 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

#### 2.2.2 상태 관리

- **내부 상태 관리**: 컴포넌트 내부 상태(열림/닫힘, 활성 탭 등) 관리
- **외부 제어 가능성**: 필요시 외부에서 상태를 제어할 수 있는 인터페이스 제공
- **상태 전이 애니메이션**: 상태 변화 시 부드러운 시각적 전환

```jsx
// 내부 상태 관리 예시
const Dropdown = ({ defaultOpen, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  
  useEffect(() => {
    if (onOpenChange) onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);
  
  // ...
};
```

#### 2.2.3 접근성 통합

- **키보드 내비게이션**: 컴포넌트 내에서의 키보드 내비게이션 구현
- **ARIA 관계 속성**: 관련 요소 간 관계를 나타내는 ARIA 속성 설정
- **포커스 트랩**: 모달과 같은 요소에서 포커스가 외부로 빠져나가지 않도록 관리

```jsx
// 접근성 통합 예시
<Dialog 
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <DialogTitle id="dialog-title">제목</DialogTitle>
  <DialogDescription id="dialog-description">설명</DialogDescription>
</Dialog>
```

#### 2.2.4 일관된 API 설계

- **공통 Props 패턴**: 유사한 컴포넌트 간 일관된 Props 인터페이스
- **이벤트 핸들러 규칙**: `onChange`, `onSelect` 등 이벤트 핸들러 명명 규칙
- **편의성 API**: 단순한 사용 사례를 위한 편의성 API와 고급 사용을 위한 유연한 API 모두 제공

```jsx
// 일관된 API 예시
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="모달 제목"
  footer={<Button onClick={handleConfirm}>확인</Button>}
>
  콘텐츠
</Modal>
```

#### 2.2.5 성능 최적화

- **메모이제이션**: React.memo, useMemo, useCallback을 활용한 불필요한 리렌더링 방지
- **지연 로딩**: 필요시에만 컴포넌트 렌더링
- **가상화**: 대량의 데이터 표시 시 화면에 보이는 항목만 렌더링

## 3. 패턴 계층

패턴 컴포넌트는 특정 사용자 문제나 비즈니스 요구를 해결하기 위한 복합적인 UI 솔루션으로, 여러 컴파운드와 프리미티브 컴포넌트를 결합하여 특정 맥락에 최적화되어 있습니다.

### 3.1 핵심 패턴 컴포넌트

| 컴포넌트 | 구성 요소 | 설명 | 우선순위 |
|---------|----------|------|---------|
| **Form** | FormField + Button + Validation | 데이터 입력 및 제출 | 최우선 |
| **DataTable** | Table + Pagination + Sorting + Filtering | 데이터 표시 및 조작 | 최우선 |
| **SearchBar** | Input + Dropdown + Results | 검색 기능 | 최우선 |
| **AuthForm** | Form + Validation + State Management | 인증 관련 양식 | 높음 |
| **FilterPanel** | Input + Checkbox + Select + Button | 데이터 필터링 | 높음 |
| **NavigationBar** | Links + Dropdown + Mobile Menu | 사이트 내비게이션 | 높음 |
| **MediaGallery** | Grid + Modal + Navigation | 미디어 탐색 | 중간 |
| **CommentSection** | Form + List + Pagination | 댓글 기능 | 중간 |
| **Checkout** | Form + Steps + Summary | 결제 프로세스 | 중간 |
| **Dashboard** | Cards + Charts + Filters | 데이터 시각화 | 중간 |
| **ProfileSettings** | Form + Tabs + FileUpload | 사용자 설정 | 중간 |
| **NotificationCenter** | List + Badge + Settings | 알림 관리 | 낮음 |
| **Onboarding** | Steps + Modal + Progress | 사용자 온보딩 | 낮음 |
| **ContentManager** | Table + Form + FileUpload | 콘텐츠 관리 | 낮음 |
| **ActivityFeed** | List + Filter + LoadMore | 활동 피드 | 낮음 |

### 3.2 패턴 계층 구축 고려사항

#### 3.2.1 비즈니스 로직 통합

- **도메인 특화 로직**: 특정 비즈니스 도메인에 맞는 로직 통합
- **데이터 검증**: 도메인 규칙에 맞는 데이터 검증 로직
- **API 통합**: 백엔드 서비스와의 통신 로직 통합

```jsx
// 비즈니스 로직 통합 예시
const SignupForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  
  const validateEmail = (email) => {
    // 회사 이메일 정책에 맞는 검증 로직
    return email.endsWith('@company.com');
  };
  
  const handleSubmit = async (event) => {
    // API 통신 및 오류 처리
    try {
      await authService.signup(formData);
    } catch (error) {
      // 오류 처리
    }
  };
  
  // ...
};
```

#### 3.2.2 상태 관리 전략

- **복잡한 상태 관리**: 폼 상태, 필터링, 페이지네이션 등 복잡한 상태 관리
- **비동기 상태 처리**: 로딩, 성공, 오류 등 비동기 작업 상태 처리
- **영구 상태 저장**: 필요시 로컬 스토리지 등을 활용한 상태 저장

```jsx
// 상태 관리 전략 예시
const DataTable = () => {
  // 필터링, 정렬, 페이지네이션 상태
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState({ field: 'name', direction: 'asc' });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  
  // 데이터 로딩 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  
  // 상태 변경 시 데이터 로드
  useEffect(() => {
    loadData();
  }, [filters, sortBy, pagination]);
  
  // ...
};
```

#### 3.2.3 사용자 경험 최적화

- **UX 흐름 최적화**: 사용자 작업 흐름에 맞게 UI 최적화
- **오류 처리 및 피드백**: 사용자 작업에 대한 명확한 피드백 제공
- **성능 최적화**: 복잡한 UI에서도 반응성 유지

```jsx
// 사용자 경험 최적화 예시
const CheckoutFlow = () => {
  const [step, setStep] = useState('shipping');
  const [feedback, setFeedback] = useState(null);
  
  const showFeedback = (message, type) => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };
  
  const handleShippingSubmit = (data) => {
    // 데이터 검증 및 저장
    if (valid) {
      setStep('payment');
      showFeedback('배송 정보가 저장되었습니다.', 'success');
    } else {
      showFeedback('배송 정보를 확인해주세요.', 'error');
    }
  };
  
  // ...
};
```

#### 3.2.4 맥락 적응성

- **다양한 사용 맥락**: 다양한 환경과 사용 사례에 적응 가능한 설계
- **설정 옵션**: 다양한 요구사항에 맞게 조정할 수 있는 설정 옵션
- **기능 토글**: 필요에 따라 기능을 켜고 끌 수 있는 옵션

```jsx
// 맥락 적응성 예시
const DataTable = ({
  enableFiltering = true,
  enableSorting = true,
  enablePagination = true,
  enableSelection = false,
  // 기타 설정 옵션
}) => {
  // 설정에 따라 기능 활성화/비활성화
  // ...
};
```

#### 3.2.5 문서화 및 예시

- **사용 사례 문서화**: 패턴이 해결하는 문제와 적절한 사용 사례 설명
- **통합 예시**: 실제 애플리케이션에서의 통합 예시 제공
- **변형 및 설정 옵션**: 다양한 설정과 변형에 대한 예시 제공

```jsx
/**
 * `SearchBar` 컴포넌트는 사용자가 데이터를 검색하고 결과를 표시하기 위한 패턴입니다.
 * 
 * @example
 * // 기본 사용법
 * <SearchBar
 *   placeholder="검색어를 입력하세요"
 *   onSearch={handleSearch}
 * />
 * 
 * // 자동 완성 기능 활성화
 * <SearchBar
 *   enableAutocomplete
 *   suggestionsProvider={getSuggestions}
 * />
 */
```

## 4. 계층별 개발 우선순위

디자인 시스템 구축 시 단계적으로 접근하는 것이 효과적입니다.

### 4.1 1단계: 기본 프리미티브 (1-2개월)

- **토큰 시스템**: 색상, 타이포그래피, 간격 등 기본 토큰
- **핵심 프리미티브**: Button, Input, Typography, Icon
- **기본 테마**: 라이트/다크 모드 지원

### 4.2 2단계: 확장 프리미티브 및 기본 컴파운드 (2-3개월)

- **확장 프리미티브**: Checkbox, Radio, Select, Switch 등
- **핵심 컴파운드**: FormField, Dropdown, Modal, Card
- **상태 관리 시스템**: 일관된 상태 관리 패턴

### 4.3 3단계: 고급 컴파운드 및 기본 패턴 (3-4개월)

- **고급 컴파운드**: Tabs, Accordion, Toast, Menu 등
- **기본 패턴**: Form, DataTable, SearchBar
- **통합 테스트**: 컴포넌트 간 상호작용 테스트

### 4.4 4단계: 고급 패턴 및 최적화 (4-6개월)

- **고급 패턴**: AuthForm, FilterPanel, NavigationBar 등
- **성능 최적화**: 번들 크기 최적화, 렌더링 성능 향상
- **포괄적 문서화**: 모든 컴포넌트에 대한 상세 문서화

## 5. 계층 간 의존성 관리

디자인 시스템의 계층 간 의존성은 상위 계층이 하위 계층에 의존하는 단방향 흐름으로 관리되어야 합니다.

### 5.1 의존성 방향

- **프리미티브** → 다른 컴포넌트에 의존하지 않음
- **컴파운드** → 프리미티브에만 의존
- **패턴** → 프리미티브와 컴파운드에 의존

### 5.2 의존성 관리 지침

1. **순환 의존성 방지**: 상위 계층 컴포넌트가 하위 계층에 의존하지 않도록 함
2. **명시적 의존성**: 모든 의존성을 명시적으로 선언
3. **최소 의존성**: 필요한 최소한의 의존성만 가지도록 설계
4. **내부 API와 외부 API 구분**: 컴포넌트 내부에서만 사용되는 API와 외부로 노출되는 API 구분

```jsx
// 의존성 방향 예시
// Primitive: 다른 컴포넌트에 의존하지 않음
const Button = (props) => { /* ... */ };

// Compound: Primitive에만 의존
const Modal = (props) => {
  return (
    <>
      <div className="modal-backdrop" />
      <div className="modal-container">
        <Button onClick={props.onClose}>닫기</Button>
        {props.children}
      </div>
    </>
  );
};

// Pattern: Primitive와 Compound에 의존
const LoginForm = (props) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <Input type="email" />
      </FormField>
      <FormField>
        <Input type="password" />
      </FormField>
      <Button type="submit">로그인</Button>
      <Modal isOpen={showError}>
        로그인에 실패했습니다.
      </Modal>
    </Form>
  );
};
```

## 결론

Lumir Design System의 계층별 구축은 체계적이고 일관된 접근 방식이 필요합니다. 프리미티브 컴포넌트부터 시작하여 컴파운드, 패턴으로 확장해 나가는 방식으로 점진적으로 구축하는 것이 효과적입니다. 각 계층의 컴포넌트들이 자신의 책임에 집중하고, 명확한 의존성 방향을 유지함으로써 유지보수 가능하고 확장성 있는 디자인 시스템을 구축할 수 있습니다.

이 문서에서 제시한 컴포넌트 목록과 고려사항은 기본적인 가이드라인이며, 실제 프로젝트의 요구사항과 우선순위에 따라 조정될 수 있습니다. 중요한 것은 일관된 원칙과 접근 방식을 유지하면서 디자인 시스템을 점진적으로 발전시켜 나가는 것입니다.
