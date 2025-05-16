const fs = require('fs');
const path = require('path');

// 파일 경로
const semanticPath = path.resolve(__dirname, '../system-1/semantic.json');

// 토큰 파일 읽기
const semanticTokens = JSON.parse(fs.readFileSync(semanticPath, 'utf8'));

// 누락된 토큰 추가
if (!semanticTokens.semantic.icon) {
  semanticTokens.semantic.icon = {
    size: {
      xs: { value: "{foundation.size.140}" },
      sm: { value: "{foundation.size.160}" },
      md: { value: "{foundation.size.200}" },
      lg: { value: "{foundation.size.240}" },
      xl: { value: "{foundation.size.320}" }
    },
    padding: {
      none: { value: "{foundation.spacing.0.horizontal}" },
      xs: { value: "{foundation.spacing.20.horizontal}" },
      sm: { value: "{foundation.spacing.40.horizontal}" },
      md: { value: "{foundation.spacing.60.horizontal}" }
    }
  };
}

// 수정된 토큰 파일 저장
fs.writeFileSync(
  semanticPath,
  JSON.stringify(semanticTokens, null, 2),
  'utf8'
);

console.log('시맨틱 토큰에 누락된 항목이 추가되었습니다.'); 