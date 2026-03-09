# 🚀 GitHub Actions 자동 빌드 가이드

## 📋 개요

이 프로젝트는 **GitHub Actions**를 사용하여 `.ait` 빌드를 자동화합니다.
- **Node 24** 환경에서 자동 빌드
- **Artifacts**로 `.ait` 파일 다운로드
- **Release** 자동 생성 (태그 푸시 시)

---

## 🎯 워크플로우 종류

### 1. **build-ait.yml** - 빌드 자동화
**트리거**:
- ✅ `main` 브랜치 푸시 (자동)
- ✅ 수동 실행 (GitHub Actions 탭)

**실행 파일**:
- `granite.config.ts`
- `public/**`
- `package.json`

**결과**:
- `.ait` 파일을 **Artifacts**로 업로드 (30일 보관)

### 2. **release.yml** - 릴리스 자동화
**트리거**:
- ✅ 태그 푸시 (예: `v1.0.0`)

**결과**:
- GitHub Release 자동 생성
- `.ait` 파일 첨부
- 릴리스 노트 자동 생성

---

## 🔧 사용 방법

### 방법 1: 자동 빌드 (main 브랜치 푸시)

```bash
# 1. 코드 수정
cd /home/user/albi-toss-app
# (파일 수정)

# 2. Git 커밋 및 푸시
git add .
git commit -m "feat: Update app configuration"
git push origin main

# 3. GitHub Actions 자동 실행
# → GitHub 저장소 → Actions 탭 확인
```

### 방법 2: 수동 빌드 (GitHub UI)

```
1. GitHub 저장소 → **Actions** 탭 클릭
2. 왼쪽 메뉴 → **Build AIT Bundle** 선택
3. **Run workflow** 버튼 클릭
4. Branch 선택 (main) → **Run workflow**
5. 빌드 완료 후 Artifacts 다운로드
```

### 방법 3: 릴리스 생성 (태그 푸시)

```bash
# 1. 버전 태그 생성
git tag v1.0.0

# 2. 태그 푸시
git push origin v1.0.0

# 3. GitHub Release 자동 생성
# → GitHub 저장소 → Releases 탭 확인
# → .ait 파일 자동 첨부
```

---

## 📥 `.ait` 파일 다운로드 방법

### Artifacts에서 다운로드

```
1. GitHub 저장소 → **Actions** 탭
2. 최근 워크플로우 실행 선택
3. 하단 **Artifacts** 섹션
4. **albi-toss-app-xxxxx** 클릭 → ZIP 다운로드
5. ZIP 압축 해제 → `.ait` 파일 획득
```

### Release에서 다운로드

```
1. GitHub 저장소 → **Releases** 탭
2. 최신 릴리스 선택
3. **Assets** 섹션 → `.ait` 파일 다운로드
```

---

## 🛠️ 워크플로우 설정

### Node 버전
```yaml
- name: Setup Node.js 24
  uses: actions/setup-node@v4
  with:
    node-version: '24'  # @apps-in-toss/ait-format 요구사항
```

### 빌드 명령어
```yaml
- name: Build .ait bundle
  run: npm run build  # package.json의 "build" 스크립트 실행
```

### Artifacts 보관 기간
```yaml
- name: Upload .ait bundle
  uses: actions/upload-artifact@v4
  with:
    retention-days: 30  # 30일 보관
```

---

## 🚀 빌드 후 배포

### 1. `.ait` 파일 다운로드
- GitHub Actions → Artifacts 또는
- GitHub Releases → Assets

### 2. Toss 콘솔 업로드
```
1. https://console-apps-in-toss.toss.im/ 접속
2. 앱 만들기 → .ait 파일 업로드
3. 앱 정보 입력:
   - 앱 이름: Albi - AI 취업 준비
   - 카테고리: 비즈니스/교육
   - 아이콘 (600x600 PNG)
   - 스크린샷 (2~8개)
4. 정책 URL 입력
5. 심사 제출
```

---

## 🔍 문제 해결

### 빌드 실패 시

**1. Workflow 로그 확인**
```
GitHub → Actions 탭 → 실패한 워크플로우 클릭 → 로그 확인
```

**2. 일반적인 오류**

| 오류 | 원인 | 해결 |
|------|------|------|
| `npm ci` 실패 | package-lock.json 문제 | `npm install` 후 다시 커밋 |
| `ait build` 실패 | granite.config.ts 오류 | 설정 파일 문법 확인 |
| Artifacts 없음 | dist/*.ait 파일 없음 | 빌드 로그 확인 |

**3. Node 버전 확인**
```yaml
- name: Verify Node version
  run: node --version  # 24.x.x 출력되어야 함
```

---

## 📊 워크플로우 상태 배지

README.md에 추가하면 빌드 상태를 표시할 수 있습니다:

```markdown
![Build Status](https://github.com/YOUR_USERNAME/albi-toss-app/workflows/Build%20AIT%20Bundle/badge.svg)
```

---

## 🎓 추가 팁

### 빌드 속도 향상
- `npm ci` 사용 (npm install보다 빠름)
- `cache: 'npm'` 활성화 (node_modules 캐싱)

### 보안
- 비밀 정보는 `secrets.GITHUB_TOKEN` 사용
- API 키는 Repository Secrets에 저장

### 알림
- GitHub 설정 → Notifications에서 빌드 실패 알림 설정

---

## 📞 문의

- **GitHub Issues**: 저장소 Issues 탭
- **이메일**: albi260128@gmail.com

---

**마지막 업데이트**: 2026-03-09
