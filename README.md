# 📅 Shared Calendar

친구들과 근무, 휴무, 휴가 일정을 공유하는 간단한 캘린더 앱입니다.

## 특징
- ✅ 로그인 불필요
- ✅ URL 공유로 누구나 접근 가능
- ✅ 실시간 데이터 동기화
- ✅ 간단한 CRUD 기능

## 빠른 시작

### 1. Firebase 설정

[Firebase Console](https://console.firebase.google.com)에서:
1. 새 프로젝트 생성
2. Realtime Database 생성 (위치: us-central1)
3. Database Rules 설정:
```json
{
  "rules": {
    "calendars": {
      "$calendarId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```
4. Web App 등록 후 설정 정보 복사

### 2. 환경 변수 설정

`.env.local` 파일 생성:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. 로컬 실행

```bash
npm install
npm start
```

## 배포 (GitHub Pages)

자세한 배포 방법은 [배포 가이드](./DEPLOYMENT.md) 참고
