import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'albi',
  
  brand: {
    displayName: 'Albi - AI 취업 준비',
    primaryColor: '#6366F1',
    icon: 'https://via.placeholder.com/600x600/6366F1/FFFFFF?text=Albi',
  },
  
  // 내비게이션 바 설정 (비게임 필수)
  navigationBar: {
    withBackButton: true,    // 뒤로가기 버튼 표시
    withHomeButton: false,   // 홈 버튼은 선택사항
  },
  
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite',
      build: 'vite build',
    },
  },
  
  outdir: 'dist',
  
  webViewProps: {
    type: 'partner',
    url: 'https://albi.kr',
    // 제스처 기반 확대/축소 비활성화
    allowsInlineMediaPlayback: true,
    bounces: true,
    pullToRefreshEnabled: false,
    overScrollMode: 'never',
  },
  
  // 권한 설정
  permissions: [],
});
