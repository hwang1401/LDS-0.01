import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 스타일 변형을 지정합니다.
   */
  variant?: 'filled' | 'outlined' | 'transparent';
  
  /**
   * 버튼의 종류를 지정합니다.
   */
  buttonType?: 'text-icon' | 'text-only' | 'icon-only';
  
  /**
   * 버튼의 색상 테마를 지정합니다.
   */
  colorScheme?: 'primary' | 'secondary' | 'cta';
  
  /**
   * 버튼의 크기를 지정합니다.
   */
  size?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';
  
  /**
   * 버튼의 전체 너비 여부를 지정합니다.
   */
  isFullWidth?: boolean;
  
  /**
   * 버튼의 로딩 상태를 지정합니다.
   */
  isLoading?: boolean;
  
  /**
   * 버튼의 선택 상태를 지정합니다.
   */
  isSelected?: boolean;
  
  /**
   * 버튼의 왼쪽에 표시될 아이콘을 지정합니다.
   */
  leftIcon?: React.ReactNode;
  
  /**
   * 버튼의 오른쪽에 표시될 아이콘을 지정합니다.
   */
  rightIcon?: React.ReactNode;
  
  /**
   * 버튼의 내용물을 지정합니다.
   */
  children?: React.ReactNode;
}

/**
 * Button 컴포넌트는 사용자 상호작용을 위한 기본적인 요소입니다.
 * Lumir Design System의 스타일링을 따르며, 시맨틱 토큰을 사용하여 일관된 디자인을 제공합니다.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'filled',
  buttonType = 'text-only',
  colorScheme = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  isSelected = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}, ref) => {
  const resolveButtonType = () => {
    if (buttonType === 'text-icon' && (leftIcon || rightIcon)) {
      return 'text-icon';
    } else if (buttonType === 'icon-only' && (leftIcon || rightIcon) && !children) {
      return 'icon-only';
    }
    return 'text-only';
  };

  const actualButtonType = resolveButtonType();

  const classes = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${colorScheme}`],
    styles[`button--${size}`],
    styles[`button--${actualButtonType}`],
    isFullWidth ? styles['button--fullWidth'] : '',
    isLoading ? styles['button--loading'] : '',
    isSelected ? styles['button--selected'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || isLoading}
      aria-pressed={isSelected}
      {...rest}
    >
      {isLoading && (
        <span className={styles.spinner} aria-hidden="true"></span>
      )}
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      {(actualButtonType !== 'icon-only' && children) && <span className={styles.content}>{children}</span>}
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button'; 