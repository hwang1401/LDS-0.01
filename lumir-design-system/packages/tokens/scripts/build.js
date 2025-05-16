const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// 커스텀 변환 로드
require('../transforms');

// 필요한 디렉토리가 없으면 생성
const directories = [
  'dist',
  'dist/css',
  'dist/js',
  'dist/scss',
  'dist/types'
];

directories.forEach(dir => {
  const dirPath = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// 커스텀 포맷 등록
const typeScriptThemeInterface = require('../formats/typescript-theme-interface');

// 설정 파일 로드
const config = require('../config');

// 새로운 방식으로 커스텀 포맷 등록
config.format = config.format || {};
config.format[typeScriptThemeInterface.name] = typeScriptThemeInterface.formatter;

// 토큰 파일 존재 확인
const foundationPath = path.resolve(__dirname, '../shared/current/foundation.json');
const semanticPath = path.resolve(__dirname, '../system-1/semantic.json');

console.log(`파운데이션 토큰 파일 존재: ${fs.existsSync(foundationPath)}`);
console.log(`시맨틱 토큰 파일 존재: ${fs.existsSync(semanticPath)}`);

// 토큰 파일 내용 확인
if (fs.existsSync(foundationPath)) {
  const foundationContent = JSON.parse(fs.readFileSync(foundationPath, 'utf8'));
  console.log(`파운데이션 토큰 키: ${Object.keys(foundationContent).join(', ')}`);
}

if (fs.existsSync(semanticPath)) {
  const semanticContent = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));
  console.log(`시맨틱 토큰 키: ${Object.keys(semanticContent).join(', ')}`);
  
  // 디버깅을 위해 시맨틱 타이포그래피 경로 출력
  if (semanticContent.semantic && semanticContent.semantic.typography) {
    console.log("타이포그래피 키:", Object.keys(semanticContent.semantic.typography));
  }
}

// Style Dictionary 실행
const styleDictionary = StyleDictionary.extend(config);

// 토큰 수 디버깅
console.log(`전체 토큰 수: ${styleDictionary.allTokens ? styleDictionary.allTokens.length : '알 수 없음'}`);

console.log('빌드 시작...');
styleDictionary.buildAllPlatforms();
console.log('빌드 완료!'); 