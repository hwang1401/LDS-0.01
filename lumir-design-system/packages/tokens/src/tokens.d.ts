declare module '../dist/js/tokens.js' {
  const tokens: {
    color: Record<string, string>;
    typography: Record<string, any>;
    spacing: Record<string, string>;
    shadow: Record<string, any>;
    [key: string]: any;
  };
  
  export default tokens;
} 