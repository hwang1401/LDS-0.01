const StyleDictionary = require('style-dictionary');

// 라이트/다크 테마 값 분리를 위한 변환기
StyleDictionary.registerTransform({
  name: 'theme/separate',
  type: 'value',
  matcher: token => token.path.includes('color'),
  transformer: token => {
    if (token.original.value && token.original.value.light && token.original.value.dark) {
      return {
        light: token.original.value.light,
        dark: token.original.value.dark
      };
    }
    return token.original.value;
  }
});

// 참조 해결 변환기 등록
StyleDictionary.registerTransform({
  name: 'value/resolveReferences',
  type: 'value',
  matcher: (token) => token.value && typeof token.value === 'string' && token.value.includes('{'),
  transformer: (token, options) => {
    const pattern = /{([^}]*)}/g;
    let resolvedValue = token.value;

    // 모든 참조 매치
    const matches = token.value.match(pattern);
    if (matches) {
      matches.forEach(match => {
        // 중괄호 제거하고 참조 경로 추출
        const path = match.replace(/{|}/g, '');
        
        // Style Dictionary 내부 함수를 사용해 참조 해결
        try {
          const resolvedReference = options.dictionary.getReferences(match);
          if (resolvedReference) {
            resolvedValue = resolvedValue.replace(match, resolvedReference);
          } else {
            console.warn(`참조를 해결할 수 없습니다: ${match} in ${token.path.join('.')}`);
          }
        } catch (e) {
          console.error(`참조 해결 오류 (${token.path.join('.')}): ${e.message}`);
        }
      });
    }

    return resolvedValue;
  }
});

// 테마별 CSS 변수 생성 포맷
StyleDictionary.registerFormat({
  name: 'css/themed-variables',
  formatter: function({ dictionary, options, file }) {
    const { light, dark } = dictionary.allTokens.reduce(
      (themes, token) => {
        if (token.value && typeof token.value === 'object' && token.value.light && token.value.dark) {
          const path = token.path.join('-');
          themes.light[path] = token.value.light;
          themes.dark[path] = token.value.dark;
        } else {
          const path = token.path.join('-');
          themes.light[path] = token.value;
          themes.dark[path] = token.value;
        }
        return themes;
      },
      { light: {}, dark: {} }
    );

    let output = [
      '/**',
      ' * 자동 생성된 테마 기반 디자인 토큰',
      ' * @generated',
      ' */',
      ':root {',
      '  /* 라이트 테마 (기본) */'
    ];

    Object.entries(light).forEach(([name, value]) => {
      output.push(`  --${name}: ${value};`);
    });

    output.push('}');
    output.push('');
    output.push('[data-theme="dark"] {');
    output.push('  /* 다크 테마 */');

    Object.entries(dark).forEach(([name, value]) => {
      output.push(`  --${name}: ${value};`);
    });

    output.push('}');

    return output.join('\n');
  }
});

// 커스텀 변환 그룹 등록 - 참조 해결 변환기 추가
StyleDictionary.registerTransformGroup({
  name: 'custom/web',
  transforms: [
    'value/resolveReferences', // 참조 해결을 가장 먼저 수행
    'theme/separate',
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css'
  ]
});

// 기본 변환 그룹에도 참조 해결 추가
StyleDictionary.registerTransformGroup({
  name: 'css',
  transforms: StyleDictionary.transformGroup.css.concat(['value/resolveReferences'])
});

StyleDictionary.registerTransformGroup({
  name: 'js',
  transforms: StyleDictionary.transformGroup.js.concat(['value/resolveReferences'])
});

StyleDictionary.registerTransformGroup({
  name: 'scss',
  transforms: StyleDictionary.transformGroup.scss.concat(['value/resolveReferences'])
});

module.exports = StyleDictionary; 