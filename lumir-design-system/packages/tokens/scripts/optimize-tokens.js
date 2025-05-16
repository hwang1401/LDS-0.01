const fs = require('fs');
const path = require('path');

// 토큰 파일 경로
const foundationPath = path.resolve(__dirname, '../shared/mark01/foundation.json');

// 토큰 파일 읽기
const foundationTokens = JSON.parse(fs.readFileSync(foundationPath, 'utf8'));

// 색상 값 정규화 (소문자 hex 코드로 변환)
function normalizeColorValues(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      normalizeColorValues(obj[key]);
    } else if (
      typeof obj[key] === 'string' && 
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(obj[key])
    ) {
      obj[key] = obj[key].toLowerCase();
    }
  });
  return obj;
}

// 색상 값 정규화 적용
foundationTokens.foundation.color = normalizeColorValues(foundationTokens.foundation.color);

// 최적화된 토큰 파일 저장
fs.writeFileSync(
  foundationPath,
  JSON.stringify(foundationTokens, null, 2),
  'utf8'
);

console.log('파운데이션 토큰이 최적화되었습니다.'); 