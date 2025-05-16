const fs = require('fs');
const path = require('path');

// 필요한 디렉토리 생성
const directories = [
  'dist',
  'dist/css',
  'dist/js',
  'dist/scss',
  'dist/icons'
];

directories.forEach(dir => {
  const dirPath = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// 토큰 파일 로드
const foundationPath = path.resolve(__dirname, '../shared/current/foundation.json');
const semanticPath = path.resolve(__dirname, '../system-1/semantic.json');

console.log(`파운데이션 토큰 파일 존재: ${fs.existsSync(foundationPath)}`);
console.log(`시맨틱 토큰 파일 존재: ${fs.existsSync(semanticPath)}`);

// 토큰 데이터 로드
const foundationTokens = JSON.parse(fs.readFileSync(foundationPath, 'utf8'));
const semanticTokens = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));

console.log(`파운데이션 토큰 키: ${Object.keys(foundationTokens).join(', ')}`);
console.log(`시맨틱 토큰 키: ${Object.keys(semanticTokens).join(', ')}`);

// SVG 최적화 함수
function optimizeSvg(svg) {
  return svg
    .replace(/\n/g, '')
    .replace(/\r/g, '')
    .replace(/\t/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')  // 태그 사이 공백 제거
    .replace(/\s*([=:])\s*/g, '$1') // 속성의 공백 제거
    .replace(/ fill="#000000"/g, '') // 기본 채우기 제거
    .replace(/ fill="black"/g, '')
    .replace(/ stroke="#000000"/g, '')
    .replace(/ stroke="black"/g, '')
    .replace(/fill-rule/g, 'f')
    .replace(/clip-rule/g, 'c')
    .replace(/stroke-width/g, 's')
    .replace(/stroke-linecap/g, 'sc')
    .replace(/stroke-linejoin/g, 'sj')
    .trim();
}

// SVG 스프라이트 생성
function generateSvgSprite() {
  const iconsDir = path.resolve(__dirname, '../shared/current/icons');
  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n';
  const iconTokens = { icon: {} };
  
  if (!fs.existsSync(iconsDir)) {
    console.warn('아이콘 소스 디렉토리가 존재하지 않습니다:', iconsDir);
    return iconTokens;
  }
  
  // 아이콘 디렉토리 내 모든 폴더 처리
  const iconDirs = fs.readdirSync(iconsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // 각 아이콘 타입 폴더(logo, line icons, flat icons 등) 처리
  iconDirs.forEach(dirName => {
    const dirPath = path.join(iconsDir, dirName);
    // 폴더명 정규화 (공백 -> 하이픈, 소문자화)
    const categoryName = dirName.replace(/\s+/g, '-').toLowerCase();
    iconTokens.icon[categoryName] = {};
    
    // 폴더 내 SVG 파일 처리
    try {
      const svgFiles = fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.svg'));
      
      svgFiles.forEach(svgFile => {
        // 파일명 정규화 (확장자 제거, 공백 -> 하이픈, 소문자화)
        const tokenName = svgFile.replace('.svg', '').replace(/\s+/g, '-').toLowerCase();
        const svgPath = path.join(dirPath, svgFile);
        
        try {
          // SVG 파일 읽기 및 최적화
          const svgContent = fs.readFileSync(svgPath, 'utf8');
          const viewBox = svgContent.match(/viewBox="([^"]*)"/);
          const viewBoxAttr = viewBox ? viewBox[0] : 'viewBox="0 0 24 24"';
          
          // SVG 내용에서 svg 태그 제거하고 심볼 ID 생성
          const svgBody = svgContent
            .replace(/<\?xml.*?\?>/g, '')
            .replace(/<svg[^>]*>/g, '')
            .replace(/<\/svg>/g, '');
          
          const iconId = `i-${categoryName}-${tokenName}`;
          
          // 스프라이트에 심볼 추가
          spriteContent += `<symbol id="${iconId}" ${viewBoxAttr}>${optimizeSvg(svgBody)}</symbol>\n`;
          
          // 토큰 값을 스프라이트 참조로 설정 (짧은 CSS 값)
          iconTokens.icon[categoryName][tokenName] = `url(#${iconId})`;
        } catch (err) {
          console.error(`SVG 파일 처리 중 오류: ${svgPath}`, err);
        }
      });
    } catch (err) {
      console.error(`아이콘 디렉토리 처리 중 오류: ${dirPath}`, err);
    }
  });
  
  spriteContent += '</svg>';
  
  // 스프라이트 파일 저장
  fs.writeFileSync(path.resolve(__dirname, '../dist/icons/sprite.svg'), spriteContent);
  
  return iconTokens;
}

// 아이콘 파일 복사 함수
function copyIcons() {
  const iconsSourceDir = path.resolve(__dirname, '../shared/current/icons');
  const iconsDestDir = path.resolve(__dirname, '../dist/icons');
  
  if (!fs.existsSync(iconsSourceDir)) {
    console.warn('아이콘 소스 디렉토리가 존재하지 않습니다:', iconsSourceDir);
    return;
  }
  
  // 아이콘 폴더 복사 함수
  function copyDir(src, dest) {
    // 대상 디렉토리가 없으면 생성
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // 소스 디렉토리의 모든 항목 읽기
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        // 디렉토리인 경우 재귀적으로 복사
        copyDir(srcPath, destPath);
      } else {
        // 파일인 경우 복사
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  try {
    copyDir(iconsSourceDir, iconsDestDir);
    console.log('아이콘 파일 복사 완료!');
  } catch (error) {
    console.error('아이콘 파일 복사 중 오류 발생:', error);
  }
}

// 토큰 변환 및 병합
function resolveReferences(obj, allTokens) {
  const processedObj = {};
  
  for (const key in obj) {
    const value = obj[key];
    
    if (typeof value === 'string' && value.includes('{') && value.includes('}')) {
      // 참조 해결
      const matches = value.match(/{([^}]*)}/g);
      if (matches) {
        let resolvedValue = value;
        for (const match of matches) {
          const path = match.replace(/{|}/g, '').split('.');
          const referencedValue = getNestedValue(allTokens, path);
          if (referencedValue !== undefined) {
            resolvedValue = resolvedValue.replace(match, referencedValue);
          } else {
            console.warn(`참조를 해결할 수 없습니다: ${match}`);
          }
        }
        processedObj[key] = resolvedValue;
      } else {
        processedObj[key] = value;
      }
    } else if (typeof value === 'object' && value !== null) {
      // 재귀적으로 처리
      processedObj[key] = resolveReferences(value, allTokens);
    } else {
      processedObj[key] = value;
    }
  }
  
  return processedObj;
}

// 중첩된 객체에서 값 가져오기
function getNestedValue(obj, path) {
  let current = obj;
  for (const part of path) {
    if (current && current[part] !== undefined) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return current;
}

// 아이콘 토큰 생성 (스프라이트 사용)
const iconTokens = generateSvgSprite();

// 변수명 매핑 생성 (짧은 이름으로)
function createIconShortNames(iconTokens) {
  const shortNames = {};
  let counter = 1;
  
  function processObject(obj, prefix) {
    for (const key in obj) {
      const fullPath = prefix ? `${prefix}-${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        processObject(obj[key], fullPath);
      } else {
        // 아이콘 관련 토큰인 경우 짧은 이름 생성
        if (fullPath.includes('icon')) {
          const shortName = `i${counter++}`;
          shortNames[fullPath] = shortName;
        }
      }
    }
  }
  
  processObject(iconTokens, '');
  
  return shortNames;
}

// 파운데이션 토큰에 아이콘 토큰 추가
if (!foundationTokens.foundation) {
  foundationTokens.foundation = {};
}
foundationTokens.foundation = { ...foundationTokens.foundation, ...iconTokens };

// 토큰 병합 및 참조 해결
const allTokens = { ...foundationTokens, ...semanticTokens };
const resolvedTokens = resolveReferences(allTokens, allTokens);

// 짧은 이름 매핑 생성
const shortNameMap = createIconShortNames(iconTokens);

// CSS 변수 생성 (짧은 이름 적용)
function generateCssVariables(tokens, prefix = '') {
  let result = [];
  
  for (const key in tokens) {
    const value = tokens[key];
    const fullPath = prefix ? `${prefix}-${key}` : key;
    
    // 짧은 이름이 있으면 사용, 없으면 원래 이름 사용
    const varName = shortNameMap[fullPath] || fullPath;
    
    if (typeof value === 'object' && value !== null) {
      // 특별한 경우: shadow 객체의 경우 CSS shadow 문법으로 변환
      if (key.includes('shadow') && 
         (value.x !== undefined || value.y !== undefined || value.blur !== undefined)) {
        const x = value.x || '0px';
        const y = value.y || '0px';
        const blur = value.blur || '0px';
        const spread = value.spread || '0px';
        const color = value.color || 'rgba(0, 0, 0, 0.1)';
        const shadowValue = `${x} ${y} ${blur} ${spread} ${color}`;
        result.push(`  --${varName}: ${shadowValue};`);
      } else {
        // 일반적인 중첩 객체는 재귀 처리
        result = result.concat(generateCssVariables(value, fullPath));
      }
    } else {
      result.push(`  --${varName}: ${value};`);
    }
  }
  
  return result;
}

// 짧은 이름 매핑 저장
const shortNameMapContent = `export const iconMap = ${JSON.stringify(shortNameMap, null, 2)};`;
fs.writeFileSync(path.resolve(__dirname, '../dist/js/icon-map.js'), shortNameMapContent);

// 아이콘 사용 헬퍼 생성
const iconHelperContent = `
/**
 * 아이콘을 아이디로 사용하는 CSS 클래스 생성
 */
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  fill: currentColor;
}

/**
 * 스프라이트 방식으로 아이콘 사용 예:
 * <svg class="icon"><use xlink:href="./dist/icons/sprite.svg#i-line-icons-heart"></use></svg>
 */
`;

fs.writeFileSync(path.resolve(__dirname, '../dist/css/icon-helper.css'), iconHelperContent);

// CSS 파일 생성
const cssVariables = generateCssVariables(resolvedTokens);
const cssContent = `:root {\n${cssVariables.join('\n')}\n}\n`;

fs.writeFileSync(path.resolve(__dirname, '../dist/css/tokens.css'), cssContent);

// SCSS 파일 생성 (짧은 이름 사용)
function generateScssVariables(tokens, prefix = '') {
  let result = [];
  
  for (const key in tokens) {
    const value = tokens[key];
    const fullPath = prefix ? `${prefix}-${key}` : key;
    
    // 짧은 이름이 있으면 사용, 없으면 원래 이름 사용
    const varName = shortNameMap[fullPath] || fullPath;
    
    if (typeof value === 'object' && value !== null) {
      result = result.concat(generateScssVariables(value, fullPath));
    } else {
      result.push(`$${varName}: ${value};`);
    }
  }
  
  return result;
}

const scssVariables = generateScssVariables(resolvedTokens);
const scssContent = scssVariables.join('\n');

fs.writeFileSync(path.resolve(__dirname, '../dist/scss/_tokens.scss'), scssContent);

// JS 파일 생성
const jsContent = `export default ${JSON.stringify(resolvedTokens, null, 2)};`;
fs.writeFileSync(path.resolve(__dirname, '../dist/js/tokens.js'), jsContent);
fs.writeFileSync(path.resolve(__dirname, '../dist/js/tokens.esm.js'), `export default ${JSON.stringify(resolvedTokens, null, 2)};`);

// TypeScript 선언 파일 생성
const dtsContent = `
declare const tokens: {
  [key: string]: any;
};

export default tokens;
`;
fs.writeFileSync(path.resolve(__dirname, '../dist/js/tokens.d.ts'), dtsContent);

// 아이콘 파일 복사 실행
copyIcons();

console.log('빌드 완료!');
console.log(`CSS 변수 수: ${cssVariables.length}`);
console.log(`SCSS 변수 수: ${scssVariables.length}`); 