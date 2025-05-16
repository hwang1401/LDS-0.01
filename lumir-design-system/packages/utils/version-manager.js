const fs = require('fs');
const path = require('path');

const VERSION_BASE_PATH = path.resolve(__dirname, '../tokens/shared');
const CURRENT_PATH = path.resolve(VERSION_BASE_PATH, 'current');

/**
 * 토큰 버전을 전환하는 함수
 * @param {string} version - 전환할 버전명 (예: 'mark01')
 * @returns {boolean} - 성공 여부
 */
function switchVersion(version) {
  const versionPath = path.resolve(VERSION_BASE_PATH, version);
  
  if (!fs.existsSync(versionPath)) {
    console.error(`버전 ${version}이 존재하지 않습니다.`);
    return false;
  }

  // 현재 버전 폴더 내용 비우기
  if (fs.existsSync(CURRENT_PATH)) {
    fs.readdirSync(CURRENT_PATH).forEach(file => {
      fs.unlinkSync(path.resolve(CURRENT_PATH, file));
    });
  } else {
    fs.mkdirSync(CURRENT_PATH);
  }

  // 지정한 버전 복사
  fs.readdirSync(versionPath).forEach(file => {
    fs.copyFileSync(
      path.resolve(versionPath, file),
      path.resolve(CURRENT_PATH, file)
    );
  });

  console.log(`버전이 ${version}으로 성공적으로 전환되었습니다.`);
  return true;
}

/**
 * 새 토큰 버전을 생성하는 함수
 * @param {string} version - 생성할 버전명 (예: 'mark02')
 * @param {string} baseVersion - 기반이 될 버전명 (예: 'mark01')
 * @param {string} description - 변경 설명 (선택적)
 * @returns {boolean} - 성공 여부
 */
function createVersion(version, baseVersion, description) {
  const versionPath = path.resolve(VERSION_BASE_PATH, version);
  const baseVersionPath = path.resolve(VERSION_BASE_PATH, baseVersion);
  
  if (fs.existsSync(versionPath)) {
    console.error(`버전 ${version}이 이미 존재합니다.`);
    return false;
  }
  
  if (!fs.existsSync(baseVersionPath)) {
    console.error(`기반 버전 ${baseVersion}이 존재하지 않습니다.`);
    return false;
  }

  // 새 버전 폴더 생성
  fs.mkdirSync(versionPath);

  // 기반 버전 파일 복사
  fs.readdirSync(baseVersionPath).forEach(file => {
    fs.copyFileSync(
      path.resolve(baseVersionPath, file),
      path.resolve(versionPath, file)
    );
  });

  console.log(`새 버전 ${version}이 ${baseVersion}을 기반으로 생성되었습니다.`);
  
  // 변경 로그 생성 (설명이 제공된 경우)
  if (description) {
    generateChangeLog(version, baseVersion, description);
  }
  
  return true;
}

/**
 * 사용 가능한 모든 버전을 나열하는 함수
 */
function listVersions() {
  const versions = fs.readdirSync(VERSION_BASE_PATH)
    .filter(file => 
      fs.statSync(path.resolve(VERSION_BASE_PATH, file)).isDirectory() && 
      file !== 'current'
    );
  
  console.log('사용 가능한 버전:');
  versions.forEach(version => {
    console.log(`- ${version}`);
  });
  
  return versions;
}

/**
 * 두 버전의 토큰 차이를 비교하는 함수
 * @param {string} versionA - 비교할 첫 번째 버전
 * @param {string} versionB - 비교할 두 번째 버전
 * @returns {object} - 차이점 목록
 */
function compareVersions(versionA, versionB) {
  const versionAPath = path.resolve(VERSION_BASE_PATH, versionA);
  const versionBPath = path.resolve(VERSION_BASE_PATH, versionB);
  
  if (!fs.existsSync(versionAPath) || !fs.existsSync(versionBPath)) {
    console.error(`버전 ${versionA} 또는 ${versionB}가 존재하지 않습니다.`);
    return null;
  }
  
  const tokenA = JSON.parse(fs.readFileSync(path.resolve(versionAPath, 'foundation.json'), 'utf8'));
  const tokenB = JSON.parse(fs.readFileSync(path.resolve(versionBPath, 'foundation.json'), 'utf8'));
  
  // 간단한 차이점 확인 (전체 토큰 구조에 대한 심층 비교가 필요하다면 더 복잡한 알고리즘 필요)
  const differences = {
    added: [],
    modified: [],
    deleted: []
  };
  
  // A에 없고 B에 있는 항목 찾기 (추가된 항목)
  findDifferences(tokenB, tokenA, [], differences.added, 'added');
  
  // A에 있고 B에 있지만 값이 다른 항목 찾기 (수정된 항목)
  findDifferences(tokenA, tokenB, [], differences.modified, 'modified');
  
  // A에 있고 B에 없는 항목 찾기 (삭제된 항목)
  findDifferences(tokenA, tokenB, [], differences.deleted, 'deleted');
  
  return differences;
}

/**
 * 객체 간 차이점을 재귀적으로 찾는 함수
 */
function findDifferences(objA, objB, path, result, type) {
  for (const key in objA) {
    const currentPath = [...path, key];
    
    if (typeof objA[key] === 'object' && objA[key] !== null && !Array.isArray(objA[key])) {
      // 객체인 경우 재귀적으로 탐색
      if (objB[key] === undefined) {
        // B에 해당 키가 없는 경우 (추가/삭제된 경우)
        if (type === 'added') {
          result.push({ path: currentPath, value: objA[key] });
        } else if (type === 'deleted') {
          result.push({ path: currentPath, value: objA[key] });
        }
      } else {
        // 두 객체 모두 키가 있는 경우 재귀적으로 비교
        findDifferences(objA[key], objB[key], currentPath, result, type);
      }
    } else {
      // 원시 값인 경우 직접 비교
      if (objB[key] === undefined) {
        // B에 해당 키가 없는 경우 (추가/삭제된 경우)
        if (type === 'added' || type === 'deleted') {
          result.push({ path: currentPath, value: objA[key] });
        }
      } else if (type === 'modified' && JSON.stringify(objA[key]) !== JSON.stringify(objB[key])) {
        // 값이 다른 경우 (수정된 경우)
        result.push({ 
          path: currentPath, 
          oldValue: objA[key], 
          newValue: objB[key] 
        });
      }
    }
  }
}

/**
 * 변경 로그를 생성하는 함수
 * @param {string} version - 새 버전명
 * @param {string} baseVersion - 기반 버전명
 * @param {string} description - 변경 설명
 */
function generateChangeLog(version, baseVersion, description) {
  const changelogPath = path.resolve(__dirname, '../tokens/CHANGELOG.md');
  const date = new Date().toISOString().split('T')[0];
  const differences = compareVersions(baseVersion, version);
  
  let changelogContent = '';
  
  if (fs.existsSync(changelogPath)) {
    changelogContent = fs.readFileSync(changelogPath, 'utf8');
  }
  
  const newEntry = `
## ${version} (${date})

${description || '새 토큰 버전 릴리스'}

### 변경사항

${formatDifferences(differences) || '* 초기 릴리스'}

### 기반 버전

* ${baseVersion}
`;

  fs.writeFileSync(
    changelogPath,
    newEntry + (changelogContent ? '\n\n' + changelogContent : ''),
    'utf8'
  );
  
  console.log(`버전 ${version}에 대한 변경 로그가 생성되었습니다.`);
  return true;
}

/**
 * 차이점 포맷 도우미 함수
 */
function formatDifferences(differences) {
  if (!differences || Object.keys(differences).length === 0) {
    return '';
  }
  
  const lines = [];
  
  if (differences.added && differences.added.length) {
    lines.push('**추가된 토큰:**');
    differences.added.forEach(item => {
      lines.push(`* \`${item.path.join('.')}\`: ${JSON.stringify(item.value)}`);
    });
  }
  
  if (differences.modified && differences.modified.length) {
    lines.push('**수정된 토큰:**');
    differences.modified.forEach(item => {
      lines.push(`* \`${item.path.join('.')}\`: ${JSON.stringify(item.oldValue)} → ${JSON.stringify(item.newValue)}`);
    });
  }
  
  if (differences.deleted && differences.deleted.length) {
    lines.push('**삭제된 토큰:**');
    differences.deleted.forEach(item => {
      lines.push(`* \`${item.path.join('.')}\`: ${JSON.stringify(item.value)}`);
    });
  }
  
  return lines.join('\n');
}

// CLI 사용
const args = process.argv.slice(2);
if (args.length > 0) {
  const command = args[0];
  
  switch(command) {
    case 'switch':
      if (args.length > 1) {
        switchVersion(args[1]);
      } else {
        console.error('버전을 지정해주세요. 예: switch mark01');
      }
      break;
    case 'create':
      if (args.length > 2) {
        createVersion(args[1], args[2], args[3]);
      } else {
        console.error('새 버전명과 기반 버전명을 지정해주세요. 예: create mark02 mark01 "변경 설명"');
      }
      break;
    case 'list':
      listVersions();
      break;
    case 'compare':
      if (args.length > 2) {
        const differences = compareVersions(args[1], args[2]);
        console.log(formatDifferences(differences));
      } else {
        console.error('비교할 두 버전을 지정해주세요. 예: compare mark01 mark02');
      }
      break;
    default:
      console.error('알 수 없는 명령입니다. 사용 가능한 명령: switch, create, list, compare');
  }
}

module.exports = { 
  switchVersion, 
  createVersion, 
  listVersions,
  compareVersions,
  generateChangeLog
}; 