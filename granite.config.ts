import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  // 앱 이름
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
      dev: '',
      build: 'node build.cjs',
    },
  },
  
  // 빌드 출력 디렉토리
  outdir: 'dist',
  
  // 권한 요청
  permissions: [
    'camera',
    'push-notifications',
  ],
});
