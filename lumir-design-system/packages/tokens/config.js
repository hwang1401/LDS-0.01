const path = require('path');
const fs = require('fs');
const StyleDictionary = require('style-dictionary');

// SVG 아이콘 디렉토리 경로
const ICONS_DIR = path.resolve(__dirname, 'shared/current/icons');

// SVG 파일을 데이터 URI로 변환하는 함수
function svgToDataURI(filePath) {
  try {
    const svg = fs.readFileSync(filePath, 'utf8');
    // SVG 최적화 (줄바꿈 제거, 여러 공백 하나로 압축)
    const optimizedSvg = svg.replace(/\n/g, '').replace(/\s+/g, ' ');
    // SVG를 데이터 URI로 변환
    return `url("data:image/svg+xml,${encodeURIComponent(optimizedSvg)}")`;
  } catch (err) {
    console.error(`Error processing SVG file: ${filePath}`, err);
    return '';
  }
}

// 아이콘 토큰 생성 함수
function generateIconTokens() {
  const iconTokens = { foundation: { icon: {} } };
  
  // 아이콘 디렉토리 내 모든 폴더 처리
  const iconDirs = fs.readdirSync(ICONS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // 각 아이콘 타입 폴더(logo, line icons, flat icons 등) 처리
  iconDirs.forEach(dirName => {
    const dirPath = path.join(ICONS_DIR, dirName);
    const categoryName = dirName.replace(/\s+/g, '-').toLowerCase();
    iconTokens.foundation.icon[categoryName] = {};
    
    // 폴더 내 SVG 파일 처리
    const svgFiles = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.svg'));
    
    svgFiles.forEach(svgFile => {
      const tokenName = svgFile.replace('.svg', '').replace(/\s+/g, '-').toLowerCase();
      const svgPath = path.join(dirPath, svgFile);
      iconTokens.foundation.icon[categoryName][tokenName] = svgPath;
    });
  });
  
  return iconTokens;
}

// 아이콘 파일 경로를 데이터 URI로 변환하는 커스텀 트랜스폼
StyleDictionary.registerTransform({
  name: 'svg/datauri',
  type: 'value',
  matcher: function(prop) {
    return typeof prop.original.value === 'string' && 
           prop.original.value.endsWith('.svg');
  },
  transformer: function(prop) {
    return svgToDataURI(prop.original.value);
  }
});

// 기존 트랜스폼 그룹에 svg/datauri 트랜스폼 추가
StyleDictionary.registerTransformGroup({
  name: 'css-with-svg',
  transforms: StyleDictionary.transformGroup.css.concat(['svg/datauri'])
});

// 아이콘 토큰 생성
const iconTokens = generateIconTokens();

module.exports = {
  source: [
    path.resolve(__dirname, 'shared/current/foundation.json'),
    path.resolve(__dirname, 'system-1/semantic.json'),
    // 추가 소스로 아이콘 토큰을 메모리에서 제공
    {
      tokens: iconTokens
    }
  ],
  include: [
    path.resolve(__dirname, 'shared/current/**/*.json')
  ],
  platforms: {
    css: {
      transformGroup: 'css-with-svg', // 수정된 트랜스폼 그룹 사용
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          showFileHeader: false
        }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }, {
        destination: 'tokens.cjs.js',
        format: 'javascript/module'
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/types/',
      files: [{
        destination: 'index.d.ts',
        format: 'typescript/module-declarations'
      }, {
        destination: 'theme.d.ts',
        format: 'typescript/theme-interface'
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables'
      }]
    }
  }
}; 