const fs = require('fs');
const path = require('path');

// dist 폴더 생성
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
  console.log('✓ Created dist/ folder');
}

// public 폴더의 모든 파일을 dist로 복사
const files = fs.readdirSync('public');
files.forEach(file => {
  const srcPath = path.join('public', file);
  const destPath = path.join('dist', file);
  fs.cpSync(srcPath, destPath, { recursive: true });
  console.log(`✓ Copied: ${file} → dist/${file}`);
});

console.log('✓ Build preparation complete!');
