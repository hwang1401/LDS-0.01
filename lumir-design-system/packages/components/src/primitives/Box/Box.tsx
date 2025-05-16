import React, { forwardRef } from 'react';
import styles from './Box.module.css';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'aside' | 'nav';
  padding?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  margin?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  paddingTop?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  paddingRight?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  paddingBottom?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  paddingLeft?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  marginTop?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  marginRight?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  marginBottom?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  marginLeft?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  width?: 'auto' | 'full' | 'half' | 'quarter' | string;
  height?: 'auto' | 'full' | string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  display?: 'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex' | 'grid' | 'none';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  alignSelf?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  gap?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  columnGap?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  rowGap?: 'none' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'circular' | 'pill';
  backgroundColor?: 'primary' | 'secondary' | 'surface' | 'transparent';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  zIndex?: 'base' | 'raised' | 'navigation' | 'header' | 'dropdown' | 'sticky' | 'overlay' | 'modal' | 'toast' | 'popover' | 'tooltip';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  children?: React.ReactNode;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(({
  as: Component = 'div',
  padding = 'none',
  margin = 'none',
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  width = 'auto',
  height = 'auto',
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  alignSelf,
  flexWrap,
  flexGrow,
  flexShrink,
  flexBasis,
  gap = 'none',
  columnGap,
  rowGap,
  borderRadius,
  backgroundColor,
  elevation,
  position,
  zIndex,
  overflow,
  className,
  children,
  style,
  ...rest
}, ref) => {
  const classes = [
    styles.box,
    padding !== 'none' && styles[`padding-${padding}`],
    margin !== 'none' && styles[`margin-${margin}`],
    paddingTop && styles[`padding-top-${paddingTop}`],
    paddingRight && styles[`padding-right-${paddingRight}`],
    paddingBottom && styles[`padding-bottom-${paddingBottom}`],
    paddingLeft && styles[`padding-left-${paddingLeft}`],
    marginTop && styles[`margin-top-${marginTop}`],
    marginRight && styles[`margin-right-${marginRight}`],
    marginBottom && styles[`margin-bottom-${marginBottom}`],
    marginLeft && styles[`margin-left-${marginLeft}`],
    width !== 'auto' && (styles[`width-${width}`] || ''),
    height !== 'auto' && (styles[`height-${height}`] || ''),
    display && styles[`display-${display}`],
    flexDirection && styles[`flex-direction-${flexDirection}`],
    justifyContent && styles[`justify-content-${justifyContent}`],
    alignItems && styles[`align-items-${alignItems}`],
    alignSelf && styles[`align-self-${alignSelf}`],
    flexWrap && styles[`flex-wrap-${flexWrap}`],
    gap !== 'none' && styles[`gap-${gap}`],
    columnGap && styles[`column-gap-${columnGap}`],
    rowGap && styles[`row-gap-${rowGap}`],
    borderRadius && styles[`border-radius-${borderRadius}`],
    backgroundColor && styles[`bg-${backgroundColor}`],
    elevation && styles[`elevation-${elevation}`],
    position && styles[`position-${position}`],
    zIndex && styles[`z-index-${zIndex}`],
    overflow && styles[`overflow-${overflow}`],
    className
  ].filter(Boolean).join(' ');

  const combinedStyles = {
    ...(minWidth && { minWidth }),
    ...(minHeight && { minHeight }),
    ...(maxWidth && { maxWidth }),
    ...(maxHeight && { maxHeight }),
    ...(flexGrow !== undefined && { flexGrow }),
    ...(flexShrink !== undefined && { flexShrink }),
    ...(flexBasis && { flexBasis }),
    ...(style || {})
  };

  return (
    <Component 
      ref={ref}
      className={classes}
      style={Object.keys(combinedStyles).length > 0 ? combinedStyles : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box'; 