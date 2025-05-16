const fs = require('fs');
const path = require('path');

// 파일 경로
const foundationPath = path.resolve(__dirname, '../shared/mark01/foundation.json');
const semanticPath = path.resolve(__dirname, '../system-1/semantic.json');

// 토큰 파일 읽기
const foundationTokens = JSON.parse(fs.readFileSync(foundationPath, 'utf8'));
const semanticTokens = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));

// 파운데이션 토큰 참조 추출
function getTokenReferences(obj, result = []) {
  Object.values(obj).forEach(value => {
    if (typeof value === 'object' && value !== null) {
      getTokenReferences(value, result);
    } else if (
      typeof value === 'string' && 
      value.startsWith('{foundation.')
    ) {
      result.push(value);
    }
  });
  return result;
}

// 참조 유효성 검사
function validateReference(reference) {
  // {foundation.color.blue.light.50} 형식에서 실제 경로 추출
  const path = reference
    .replace(/^\{foundation\./, '')
    .replace(/\}$/, '')
    .split('.');
  
  // 파운데이션 토큰에서 참조 값 검색
  let current = foundationTokens.foundation;
  for (const segment of path) {
    if (current && current[segment]) {
      current = current[segment];
    } else {
      return false;
    }
  }
  
  return true;
}

// 참조 검증
const references = getTokenReferences(semanticTokens);
const invalidReferences = references.filter(ref => !validateReference(ref));

if (invalidReferences.length > 0) {
  console.error('유효하지 않은 파운데이션 토큰 참조가 발견되었습니다:');
  invalidReferences.forEach(ref => console.error(`- ${ref}`));
  process.exit(1);
} else {
  console.log(`모든 시맨틱 토큰 참조가 유효합니다. (총 ${references.length}개 참조)`);
} 