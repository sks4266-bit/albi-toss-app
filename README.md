# 🚀 Albi 토스 앱인토스 (Toss Apps-in-Toss)

![Build Status](https://github.com/YOUR_USERNAME/albi-toss-app/workflows/Build%20AIT%20Bundle/badge.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen.svg)

## 📱 프로젝트 정보

- **앱 이름**: Albi - AI 취업 준비
- **앱 ID**: kr.albi.app
- **버전**: 1.0.0
- **카테고리**: 비즈니스 / 교육
- **플랫폼**: 토스 앱인토스 (Toss Apps-in-Toss)

## 🎯 앱 설명

AI 기반 취업 준비 All-in-One 플랫폼. 토스 앱 내에서 별도 설치 없이 바로 사용 가능합니다.

### 주요 기능
- 🎤 **AI 면접 연습**: 실전처럼 연습하고 즉시 피드백
- 🤖 **24시간 AI 멘토**: 무제한 1:1 상담 (텍스트 + 음성)
- 📝 **AI 문서 교정**: 이력서, 자기소개서 AI 첨삭
- 📂 **포트폴리오 관리**: 체계적인 경력 관리
- 📊 **성장 트래킹**: 데이터 기반 진도 확인

### 요금제
- **월 ₩4,900** (하루 ₩163, 커피 한 잔 값)
- 7일 무료 체험
- 무제한 AI 멘토 채팅
- 무제한 면접 연습

## 🛠️ 개발 환경 설정

### 필수 요구사항
- Node.js 18+ (현재: v20.19.6)
- npm 10+ (현재: 10.8.2)
- @apps-in-toss/web-framework

### 설치
```bash
npm install
```

## 📦 빌드 및 배포

### 🤖 자동 빌드 (GitHub Actions) ⭐ 권장

**GitHub Actions가 자동으로 Node 24 환경에서 빌드합니다!**

#### 방법 1: 자동 빌드 (코드 푸시)
```bash
git add .
git commit -m "feat: Update configuration"
git push origin main
# → GitHub Actions 자동 실행 → Artifacts 다운로드
```

#### 방법 2: 수동 빌드 (GitHub UI)
```
1. GitHub 저장소 → Actions 탭
2. "Build AIT Bundle" 선택
3. "Run workflow" 버튼 클릭
4. 빌드 완료 후 Artifacts 다운로드
```

#### 방법 3: 릴리스 생성 (태그 푸시)
```bash
git tag v1.0.0
git push origin v1.0.0
# → GitHub Release 자동 생성 → .ait 파일 첨부
```

**📥 다운로드 위치**:
- **Artifacts**: GitHub → Actions → 워크플로우 실행 → Artifacts
- **Release**: GitHub → Releases → Assets

**📖 자세한 가이드**: [.github/WORKFLOWS.md](.github/WORKFLOWS.md)

---

### 💻 로컬 빌드 (Node 24+ 필요)

**주의**: 샌드박스는 Node v20이므로 로컬 컴퓨터에서만 가능

```bash
# Node 24 설치
nvm install 24
nvm use 24

# 빌드
npm install
npm run build
# → dist/albi-1.0.0.ait 생성
```

---

### 로컬 개발 (개발 서버)
```bash
npm run dev
# 샌드박스 앱에서 intoss://albi 접속
```

---
```bash
npm run deploy -- --api-key <YOUR_TOSS_API_KEY>
```

또는 수동 업로드:
1. https://console-apps-in-toss.toss.im/ 접속
2. **앱 만들기** 클릭
3. `dist/albi-1.0.0.ait` 파일 업로드
4. 앱 정보 입력 (이름, 설명, 아이콘, 스크린샷)
5. 심사 제출

## 📁 프로젝트 구조

```
albi-toss-app/
├── public/
│   └── index.html          # WebView HTML (기존 웹앱 로드)
├── src/                    # 추가 소스 파일 (선택)
├── granite.config.ts       # 토스 앱인토스 설정
├── package.json            # 의존성 및 스크립트
└── README.md              # 이 파일
```

## ⚙️ granite.config.ts 주요 설정

### WebView URL
```typescript
webview: {
  url: 'https://albi.kr',  // 기존 웹앱 URL
  allowedDomains: [
    'https://albi.kr',
    'https://*.albi.kr'
  ]
}
```

### 권한
```typescript
permissions: [
  'camera',              // 카메라 접근
  'push-notifications',  // 푸시 알림
]
```

### 딥링크
```typescript
deepLinks: [
  {
    scheme: 'albi',
    host: 'screen',
    paths: [
      '/mentor-chat',     // AI 멘토
      '/interview',       // AI 면접
      '/payment',         // 결제
      '/profile'          // 마이페이지
    ]
  }
]
```

## 🎨 앱 아이콘 준비

### 필수 아이콘 크기
- **600x600 PNG** (토스 콘솔 업로드용)
- 투명 배경 금지
- 배경색: #6366F1 (인디고 블루)

### 아이콘 생성 도구
- https://www.pwabuilder.com/imageGenerator
- Figma, Sketch, Canva 등

## 📸 스크린샷 준비

### 필수 스크린샷
- **최소 2개, 최대 8개**
- **권장 크기**: 540x720 (세로) 또는 720x540 (가로)
- 앱의 주요 기능을 보여주는 화면

### 스크린샷 예시
1. 메인 화면 (AI 면접, AI 멘토 버튼)
2. AI 멘토 채팅 화면
3. AI 면접 연습 화면
4. 포트폴리오 관리 화면

## 🚀 배포 체크리스트

### 배포 전
- [x] granite.config.ts 설정 완료
- [x] public/index.html 작성
- [ ] 앱 아이콘 준비 (600x600 PNG)
- [ ] 스크린샷 준비 (최소 2개)
- [ ] 개인정보 처리방침 URL 확인
- [x] .ait 빌드 테스트

### 토스 콘솔 설정
1. https://console-apps-in-toss.toss.im/ 접속
2. Workspace 생성 (무료)
3. 앱 만들기
4. 앱 정보 입력:
   - 앱 이름: Albi - AI 취업 준비
   - 카테고리: 비즈니스 / 교육
   - 설명: AI 기반 취업 준비 All-in-One 플랫폼
5. .ait 파일 업로드
6. 아이콘 및 스크린샷 업로드
7. 테스트 계정 제공 (선택)
8. 심사 제출

### 심사 기준
- ✅ 앱 설명과 실제 기능 일치
- ✅ 개인정보 처리방침 링크 유효
- ✅ 스크린샷 고품질
- ✅ 권한 요청 이유 명시
- ✅ WebView 도메인 화이트리스트 설정

### 심사 기간
- **1-3일** (보통 48시간 이내)

## 📊 배포 후

### QR 코드 테스트
- 토스 콘솔에서 QR 코드 생성
- 토스 앱에서 QR 코드 스캔
- 앱 테스트

### 앱 URL
- 프라이빗: `intoss-private://appsintoss?_deploymentId=<deployment-id>`
- 퍼블릭 (출시 후): `intoss://appsintoss?appId=kr.albi.app`

## 🔗 관련 링크

- **토스 개발자센터**: https://developers-apps-in-toss.toss.im/
- **토스 콘솔**: https://console-apps-in-toss.toss.im/
- **개발자 커뮤니티**: https://techchat-apps-in-toss.toss.im/
- **Albi 웹사이트**: https://albi.kr
- **Albi GitHub**: (저장소 URL 추가 예정)

## 📞 문의

- **이메일**: albi260128@gmail.com
- **웹사이트**: https://albi.kr

## 📝 라이선스

Private Project

---

**🎉 토스 앱인토스 첫 출시 성공을 기원합니다!**

**작성일**: 2026-03-09  
**버전**: 1.0.0  
**상태**: 준비 완료 (아이콘만 추가하면 배포 가능)
