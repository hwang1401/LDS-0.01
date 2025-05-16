import React, { forwardRef } from 'react';
import styles from './Text.module.css';

type TextVariant = 
  | 'hero-1' | 'hero-2' 
  | 'title-1' | 'title-2' 
  | 'heading-1' | 'heading-2' | 'heading-3' 
  | 'body-1' | 'body-2' 
  | 'label-1' | 'label-2' 
  | 'caption-1' | 'caption-2' | 'caption-3';

type FontWeight = 'regular' | 'medium' | 'bold';

type TextAlign = 'left' | 'center' | 'right' | 'justify';

type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

type TextColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'onColor' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /**
   * 텍스트 요소의 HTML 태그를 지정합니다.
   */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';
  
  /**
   * 텍스트의 스타일 변형을 지정합니다.
   */
  variant?: TextVariant;
  
  /**
   * 텍스트의 굵기를 지정합니다.
   */
  weight?: FontWeight;
  
  /**
   * 텍스트의 정렬 방향을 지정합니다.
   */
  align?: TextAlign;
  
  /**
   * 텍스트 변형(대문자, 소문자 등)을 지정합니다.
   */
  transform?: TextTransform;
  
  /**
   * 텍스트의 색상을 지정합니다.
   */
  color?: TextColor;
  
  /**
   * 텍스트가 한 줄에 표시되고 넘칠 경우 생략 부호로 표시할지 여부를 지정합니다.
   */
  noWrap?: boolean;
  
  /**
   * 텍스트가 지정된 라인 수 이후 생략 부호로 표시할지 여부를 지정합니다.
   */
  truncate?: number;
  
  /**
   * 텍스트의 내용물을 지정합니다.
   */
  children: React.ReactNode;
}

/**
 * Text 컴포넌트는 다양한 텍스트 스타일을 제공하는 기본 요소입니다.
 * Fluent Design System의 타이포그래피 계층 구조를 따르며, 시멘틱 토큰을 사용하여 일관된 스타일을 제공합니다.
 */
export const Text = forwardRef<HTMLElement, TextProps>(({
  as: Component = 'p',
  variant = 'body-1',
  weight = 'regular',
  align,
  transform,
  color = 'primary',
  noWrap,
  truncate,
  className,
  children,
  style,
  ...rest
}, ref) => {
  const variantClass = styles[`text--${variant}-${weight}`];
  
  const classes = [
    styles.text,
    variantClass,
    align && styles[`text--align-${align}`],
    transform && styles[`text--transform-${transform}`],
    color && styles[`text--color-${color}`],
    noWrap && styles['text--nowrap'],
    truncate && styles['text--truncate'],
    className
  ].filter(Boolean).join(' ');

  const textStyles = {
    ...(truncate && { WebkitLineClamp: truncate }),
    ...style
  };

  return (
    <Component 
      ref={ref as any}
      className={classes}
      style={textStyles}
      {...rest}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'Text'; 