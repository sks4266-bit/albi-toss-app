# ✅ GitHub Actions 자동 빌드 설정 완료!

## 🎉 완료된 작업

### 1. **GitHub Actions 워크플로우 생성** ✅
- `.github/workflows/build-ait.yml`: 자동 빌드 워크플로우
- `.github/workflows/release.yml`: 자동 릴리스 워크플로우
- `.github/WORKFLOWS.md`: 상세 사용 가이드

### 2. **프로젝트 설정 업데이트** ✅
- `package.json`: Node >=24 엔진 요구사항 명시
- `README.md`: GitHub Actions 빌드 방법 추가

### 3. **Git 커밋** ✅
```
Commit: 566cca0
Message: feat: Add GitHub Actions workflows for automatic .ait build
```

---

## 🚀 다음 단계: GitHub에 푸시하고 빌드하기

### 1️⃣ GitHub 저장소 생성

**옵션 A: GitHub 웹사이트에서 생성**
```
1. https://github.com/new 접속
2. Repository name: albi-toss-app
3. Description: Albi - AI 취업 준비 앱인토스 미니앱
4. Public 또는 Private 선택
5. "Create repository" 클릭
```

**옵션 B: GitHub CLI로 생성 (이미 설정되어 있다면)**
```bash
cd /home/user/albi-toss-app
gh repo create albi-toss-app --public --source=. --remote=origin --push
```

---

### 2️⃣ GitHub에 코드 푸시

```bash
cd /home/user/albi-toss-app

# GitHub 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/albi-toss-app.git

# main 브랜치로 푸시
git push -u origin main
```

**✅ 푸시 완료 후**:
- GitHub Actions가 **자동으로 빌드 시작**
- Node 24 환경에서 `npm run build` 실행
- `.ait` 파일이 Artifacts로 업로드됨

---

### 3️⃣ GitHub Actions에서 `.ait` 파일 다운로드

#### 방법 1: 자동 빌드 (방금 푸시한 경우)
```
1. GitHub 저장소 → "Actions" 탭 클릭
2. 최근 워크플로우 실행 확인 (🟡 진행 중 또는 ✅ 완료)
3. 워크플로우 클릭
4. 하단 "Artifacts" 섹션
5. "albi-toss-app-xxxxx" 클릭 → ZIP 다운로드
6. ZIP 압축 해제 → albi-1.0.0.ait 파일 획득
```

#### 방법 2: 수동 빌드
```
1. GitHub 저장소 → "Actions" 탭
2. 왼쪽 "Build AIT Bundle" 선택
3. "Run workflow" 버튼 클릭
4. Branch: main 선택 → "Run workflow"
5. 빌드 완료 후 Artifacts 다운로드
```

#### 방법 3: 릴리스 생성 (추천)
```bash
# 태그 생성 및 푸시
cd /home/user/albi-toss-app
git tag v1.0.0
git push origin v1.0.0

# GitHub Release 자동 생성
# → GitHub 저장소 → "Releases" 탭 → .ait 파일 다운로드
```

---

## 📦 `.ait` 파일 다운로드 후 배포

### 1. Toss 개발자 콘솔 접속
https://console-apps-in-toss.toss.im/

### 2. 앱 등록
```
1. "앱 만들기" 클릭
2. 앱 정보 입력:
   - 앱 이름: Albi - AI 취업 준비
   - 앱 ID: albi
   - 카테고리: 비즈니스 / 교육
```

### 3. .ait 파일 업로드
```
- 파일: albi-1.0.0.ait
- 버전: 1.0.0
- 릴리스 노트: "첫 번째 정식 출시"
```

### 4. 앱 자산 업로드 (필수)
```
⚠️ 아직 준비되지 않은 항목:
- [ ] 앱 아이콘 (600x600 PNG)
- [ ] 스크린샷 (2~8개, 540x720)
```

### 5. 정책 URL 입력
```
- 개인정보처리방침: https://albi.kr/privacy.html
- 이용약관: https://albi.kr/terms.html
- 고객지원: https://albi.kr/contact.html
```

### 6. 심사 제출
- 심사 기간: 1~3일 (평균 48시간)

---

## 🎯 현재 상태

### ✅ 완료
- [x] 프로젝트 초기화
- [x] GitHub Actions 워크플로우 설정
- [x] granite.config.ts 설정
- [x] public/index.html (WebView)
- [x] Git 저장소 초기화

### 🔄 진행 중
- [ ] GitHub 저장소 생성 및 푸시
- [ ] `.ait` 빌드 (GitHub Actions)

### ⏳ 대기 중
- [ ] 앱 아이콘 준비
- [ ] 스크린샷 준비
- [ ] Toss 콘솔 업로드
- [ ] 심사 제출

---

## 📊 타임라인 예상

| 단계 | 예상 시간 | 현재 상태 |
|------|----------|----------|
| GitHub 저장소 생성 | 5분 | ⏳ 대기 |
| 코드 푸시 | 2분 | ⏳ 대기 |
| GitHub Actions 빌드 | 3-5분 | ⏳ 대기 |
| .ait 다운로드 | 1분 | ⏳ 대기 |
| 앱 아이콘 제작 | 1-2시간 | ⏳ 대기 |
| 스크린샷 캡처 | 30분-1시간 | ⏳ 대기 |
| Toss 콘솔 업로드 | 30분 | ⏳ 대기 |
| 심사 | 1-3일 | ⏳ 대기 |

**총 예상 기간**: **3~5일** (심사 포함)

---

## 🛠️ 도움이 필요하신가요?

### 다음 작업을 도와드릴 수 있습니다:

1. **"GitHub 저장소 만들고 푸시해줘"**
   → GitHub 환경 설정 및 코드 푸시

2. **"앱 아이콘 생성해줘"**
   → 3가지 디자인 옵션 제시 후 생성

3. **"스크린샷 자동 캡처해줘"**
   → Playwright로 albi.kr 화면 캡처

4. **"GitHub Actions 빌드 상태 확인해줘"**
   → 워크플로우 실행 상태 및 로그 확인

5. **"Toss 콘솔 업로드 상세 가이드 알려줘"**
   → 화면별 단계별 업로드 가이드

---

## 🔗 유용한 링크

- **GitHub Actions 문서**: [.github/WORKFLOWS.md](.github/WORKFLOWS.md)
- **프로젝트 README**: [README.md](README.md)
- **Toss 개발자센터**: https://developers-apps-in-toss.toss.im/
- **Toss 콘솔**: https://console-apps-in-toss.toss.im/

---

## 📧 문의

- **이메일**: albi260128@gmail.com
- **웹사이트**: https://albi.kr

---

**다음 단계**: GitHub 저장소 생성 및 코드 푸시 → GitHub Actions 자동 빌드 시작!

어떤 작업부터 진행하시겠습니까? 😊
