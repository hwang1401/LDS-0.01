/**
 * 여러 컴포넌트에서 공통적으로 사용되는 타입 정의
 */

// 공통 스타일 속성 타입
export type SpacingValue = 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export type RadiusValue = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'circular' | 'pill';
export type ColorValue = 'primary' | 'secondary' | 'tertiary' | 'onColor' | 'success' | 'warning' | 'error' | 'info';
export type ElevationValue = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// 컴포넌트 상태 타입
export type ComponentState = 'rest' | 'hovered' | 'focused' | 'pressed' | 'disabled' | 'loading';

// 컴포넌트 크기 타입
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 공통 컴포넌트 변형 타입
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link';
export type InputVariant = 'default' | 'outline' | 'filled';

// 방향 타입
export type Direction = 'up' | 'right' | 'down' | 'left';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

// 텍스트 관련 타입
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type FontWeight = 'regular' | 'medium' | 'bold';
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

// 테마 관련 타입
export type Theme = 'light' | 'dark'; 