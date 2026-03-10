import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  // 앱 이름 (콘솔에 등록한 이름과 동일해야 함)
  appName: 'albi',
  
  // 브랜드 정보
  brand: {
    displayName: 'Albi - AI 취업 준비',
    primaryColor: '#6366F1',
    icon: 'https://via.placeholder.com/600x600/6366F1/FFFFFF?text=Albi',
  },
  
  // WebView 설정
  web: {
    host: 'localhost',
    port: 3000,
    commands: {
      dev: 'echo "Dev mode"',
      build: 'node build.cjs',
    },
  },
  
  // 빌드 출력 디렉토리
  outdir: 'dist',
  
  // WebView 타입 설정 및 URL 지정
  webViewProps: {
    type: 'partner',
    url: 'https://albi.kr',
  },
});
