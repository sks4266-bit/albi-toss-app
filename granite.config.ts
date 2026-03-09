import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  // 앱 이름 (콘솔에서 등록한 이름과 동일해야 함)
  appName: 'albi',
  
  // 브랜드 정보
  brand: {
    displayName: 'Albi - AI 취업 준비',
    primaryColor: '#6366F1',
    icon: '', // 아이콘 URL (콘솔에서 업로드 후 추가)
  },
  
  // WebView 설정 (기존 웹앱 https://albi.kr 사용)
  web: {
    host: 'albi.kr',
    port: 443,
    commands: {
      dev: 'echo "WebView uses external URL"',
      build: 'echo "WebView uses external URL"',
    },
  },
  
  // WebView 타입 (비게임)
  webViewProps: {
    type: 'partner',
  },
  
  // 빌드 출력 디렉토리
  outdir: 'dist',
  
  // 권한 요청
  permissions: [
    'camera',
    'push-notifications',
  ],
});
