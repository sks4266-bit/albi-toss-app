import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  // 앱 이름 (콘솔에서 등록한 이름과 동일해야 함)
  appName: 'albi',
  
  // 앱 ID
  appId: 'kr.albi.app',
  
  // 버전
  version: '1.0.0',
  
  // 브랜드 정보
  brand: {
    displayName: 'Albi - AI 취업 준비',
    primaryColor: '#6366F1',
    icon: '', // 아이콘 URL (콘솔에서 업로드 후 추가)
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
  
  // WebView URL (런타임에 로드할 실제 URL)
  webView: {
    url: 'https://albi.kr',
    allowedDomains: [
      'https://albi.kr',
      'https://*.albi.kr',
      'https://albi-app.pages.dev',
      'https://*.albi-app.pages.dev',
    ],
    javaScriptEnabled: true,
    domStorageEnabled: true,
    thirdPartyCookiesEnabled: true,
  },
  
  // 딥링크 설정
  deepLinks: {
    scheme: 'albi',
    host: 'screen',
    paths: [
      '/mentor-chat',
      '/interview',
      '/payment',
      '/profile',
      '/portfolio',
    ],
  },
  
  // Toss 로그인 연동
  tossLogin: {
    enabled: true,
    scopes: [
      'USER_NAME',
      'USER_EMAIL',
      'USER_PHONE',
    ],
  },
  
  // 메타데이터
  metadata: {
    category: 'business',
    tags: ['취업', '면접', 'AI', '멘토', '이력서'],
    supportUrl: 'https://albi.kr/contact.html',
    privacyPolicyUrl: 'https://albi.kr/privacy.html',
    termsOfServiceUrl: 'https://albi.kr/terms.html',
  },
  
  // 권한 요청
  permissions: [
    'camera',
    'push-notifications',
  ],
});
