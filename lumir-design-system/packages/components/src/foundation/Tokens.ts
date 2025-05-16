/**
 * 디자인 토큰 상수 및 유틸리티
 * 시맨틱 토큰에 대한 타입 및 헬퍼 함수 제공
 */

// Color Tokens
export const COLORS = {
  // Primary Colors
  primary50: 'var(--semantic-color-primary-background-1-rest)',
  primary40: 'var(--semantic-color-primary-background-1-hovered)',
  primary30: 'var(--semantic-color-primary-background-1-pressed)',
  primary20: 'var(--semantic-color-primary-background-1-disabled)',
  primary10: 'var(--semantic-color-primary-background-1-subtle)',
  
  // Secondary Colors
  secondary50: 'var(--semantic-color-secondary-background-1-rest)',
  secondary40: 'var(--semantic-color-secondary-background-1-hovered)',
  secondary30: 'var(--semantic-color-secondary-background-1-pressed)',
  secondary20: 'var(--semantic-color-secondary-background-1-disabled)',
  secondary10: 'var(--semantic-color-secondary-background-1-subtle)',
  
  // Text Colors
  textPrimary: 'var(--semantic-color-secondary-foreground-1-rest)',
  textSecondary: 'var(--semantic-color-secondary-foreground-2-rest)',
  textTertiary: 'var(--semantic-color-secondary-foreground-3-rest)',
  textOnColor: 'var(--semantic-color-primary-oncolor-global)',
  
  // Status Colors
  success: 'var(--semantic-color-status-success-global)',
  warning: 'var(--semantic-color-status-warning-global)',
  error: 'var(--semantic-color-status-error-global)',
  info: 'var(--semantic-color-status-info-global)',
};

// Spacing Tokens
export const SPACING = {
  none: 'var(--semantic-spacingVer-global-none)',
  xxxs: 'var(--semantic-spacingVer-global-xxxs)',
  xxs: 'var(--semantic-spacingVer-global-xxs)',
  xs: 'var(--semantic-spacingVer-global-xs)',
  sm: 'var(--semantic-spacingVer-global-sm)',
  md: 'var(--semantic-spacingVer-global-md)',
  lg: 'var(--semantic-spacingVer-global-lg)',
  xl: 'var(--semantic-spacingVer-global-xl)',
  xxl: 'var(--semantic-spacingVer-global-xxl)',
  xxxl: 'var(--semantic-spacingVer-global-xxxl)',
};

// Border Radius Tokens
export const RADIUS = {
  none: 'var(--semantic-radius-global-none)',
  sm: 'var(--semantic-radius-global-sm)',
  md: 'var(--semantic-radius-global-md)',
  lg: 'var(--semantic-radius-global-lg)',
  xl: 'var(--semantic-radius-global-xl)',
  xxl: 'var(--semantic-radius-global-xxl)',
  circular: 'var(--semantic-radius-global-circular)',
  pill: 'var(--semantic-radius-global-pill)',
};

// Shadow Tokens
export const SHADOWS = {
  none: 'none',
  sm: 'var(--semantic-elevation-shadow-sm)',
  md: 'var(--semantic-elevation-shadow-md)',
  lg: 'var(--semantic-elevation-shadow-lg)',
  xl: 'var(--semantic-elevation-shadow-xl)',
};

// Z-Index Tokens
export const Z_INDEX = {
  base: 'var(--semantic-elevation-z-base)',
  raised: 'var(--semantic-elevation-z-raised)',
  navigation: 'var(--semantic-elevation-z-navigation)',
  header: 'var(--semantic-elevation-z-header)',
  dropdown: 'var(--semantic-elevation-z-dropdown)',
  sticky: 'var(--semantic-elevation-z-sticky)',
  overlay: 'var(--semantic-elevation-z-overlay)',
  modal: 'var(--semantic-elevation-z-modal)',
  toast: 'var(--semantic-elevation-z-toast)',
  popover: 'var(--semantic-elevation-z-popover)',
  tooltip: 'var(--semantic-elevation-z-tooltip)',
}; 