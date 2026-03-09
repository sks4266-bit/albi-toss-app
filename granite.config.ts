import { defineConfig } from '@apps-in-toss/framework';

export default defineConfig({
  // 앱 기본 정보
  appName: 'Albi',
  appId: 'kr.albi.app',
  version: '1.0.0',
  description: 'AI 기반 취업 준비 All-in-One 플랫폼',
  
  // 브랜드 정보
  brand: {
    name: 'Albi - AI 취업 준비',
    color: '#6366F1', // 인디고 블루
  },
  
  // WebView 설정
  webview: {
    // 기존 웹앱 URL 사용
    url: 'https://albi.kr',
    
    // 허용 도메인 (보안)
    allowedDomains: [
      'https://albi.kr',
      'https://*.albi.kr',
      'https://albi-app.pages.dev',
      'https://*.albi-app.pages.dev'
    ],
    
    // WebView 옵션
    options: {
      // JavaScript 활성화
      javaScriptEnabled: true,
      // DOM Storage 활성화
      domStorageEnabled: true,
      // 쿠키 허용
      thirdPartyCookiesEnabled: true,
    }
  },
  
  // 권한 요청
  permissions: [
    'camera',              // 카메라 접근 (프로필 사진 촬영)
    'push-notifications',  // 푸시 알림 (구독 갱신 알림)
  ],
  
  // 딥링크 설정
  deepLinks: [
    {
      scheme: 'albi',
      host: 'screen',
      paths: [
        '/mentor-chat',     // AI 멘토 채팅
        '/interview',       // AI 면접 연습
        '/payment',         // 결제 페이지
        '/profile',         // 마이페이지
        '/portfolio',       // 포트폴리오
      ]
    }
  ],
  
  // 토스 로그인 연동 (선택)
  tossLogin: {
    enabled: true,
    scopes: [
      'USER_NAME',    // 사용자 이름
      'USER_EMAIL',   // 이메일
      'USER_PHONE'    // 전화번호 (선택)
    ]
  },
  
  // 앱 메타데이터
  metadata: {
    category: 'business', // 비즈니스 카테고리
    tags: ['취업', '면접', 'AI', '멘토', '이력서'],
    supportUrl: 'https://albi.kr/contact.html',
    privacyPolicyUrl: 'https://albi.kr/privacy.html',
    termsOfServiceUrl: 'https://albi.kr/terms.html',
  }
});
