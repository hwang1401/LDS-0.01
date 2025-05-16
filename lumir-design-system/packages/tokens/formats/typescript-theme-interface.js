module.exports = {
  name: 'typescript/theme-interface',
  formatter: function({ dictionary }) {
    const themes = ['light', 'dark'];
    
    // 토큰을 카테고리별로 그룹화
    const tokensByCategory = dictionary.allTokens.reduce((acc, token) => {
      const category = token.path[1]; // semantic.color.primary => color
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(token);
      return acc;
    }, {});
    
    // 각 카테고리별 인터페이스 생성
    const interfaces = Object.entries(tokensByCategory).map(([category, tokens]) => {
      const properties = tokens.map(token => {
        const path = token.path.slice(2).join('.');
        let type = 'string';
        if (token.value && typeof token.value === 'object') {
          type = 'ThemeValue';
        }
        return `  '${path}': ${type};`;
      });
      
      return `export interface ${capitalize(category)}Tokens {\n${properties.join('\n')}\n}`;
    });
    
    // 테마 인터페이스 생성
    return `/**
 * 자동 생성된 테마 토큰 인터페이스
 * @generated
 */

export type Theme = 'light' | 'dark';

export interface ThemeValue {
  light: string;
  dark: string;
}

${interfaces.join('\n\n')}

export interface DesignTokens {
  ${Object.keys(tokensByCategory).map(category => `${category}: ${capitalize(category)}Tokens;`).join('\n  ')}
}

export interface ThemeTokens {
  [key: string]: string | ThemeTokens;
}
`;
  }
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
} 