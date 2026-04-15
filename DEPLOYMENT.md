# GitHub Pages 배포 가이드

## Step 1: package.json 수정

`package.json`의 `"homepage"` 필드 추가:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/calendar-share",
  ...
}
```

## Step 2: GitHub 저장소 생성

1. [GitHub](https://github.com)에서 새 저장소 생성
2. Repository 이름: `calendar-share`
3. Public 선택

## Step 3: GitHub Actions 워크플로우 설정

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        env:
          REACT_APP_FIREBASE_API_KEY: ${{ secrets.REACT_APP_FIREBASE_API_KEY }}
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.REACT_APP_FIREBASE_PROJECT_ID }}
          REACT_APP_FIREBASE_DATABASE_URL: ${{ secrets.REACT_APP_FIREBASE_DATABASE_URL }}
          REACT_APP_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.REACT_APP_FIREBASE_MESSAGING_SENDER_ID }}
          REACT_APP_FIREBASE_APP_ID: ${{ secrets.REACT_APP_FIREBASE_APP_ID }}
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## Step 4: GitHub Secrets 설정

Repository → Settings → Secrets and variables → Actions에서 다음 추가:
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_DATABASE_URL`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

## Step 5: 코드 푸시

```bash
# 초기 설정
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 리모트 추가 및 푸시
git remote add origin https://github.com/YOUR_USERNAME/calendar-share.git
git branch -M main
git push -u origin main
```

## Step 6: GitHub Pages 설정 확인

Repository → Settings → Pages에서:
- Source: `Deploy from a branch`
- Branch: `gh-pages` 선택
- Folder: `/ (root)` 선택

## 배포 완료

작업 완료 후 다음 URL에서 앱 사용 가능:
```
https://YOUR_USERNAME.github.io/calendar-share
```

또는
```
https://YOUR_USERNAME.github.io/calendar-share/custom-calendar-id
```

## 문제 해결

### 페이지가 404 에러 표시

1. Repository 설정에서 Pages 섹션 확인
2. `gh-pages` 브랜치가 정상 생성됐는지 확인
3. GitHub Actions 로그에서 빌드 에러 확인

### 라우팅 이슈

GitHub Pages는 SPA를 완벽히 지원하지 않으므로, 직접 URL 접근 시 문제가 생길 수 있습니다.
`public/404.html` 파일을 생성하면 도움이 됩니다:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Calendar Share</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/')
      );
    </script>
  </head>
  <body></body>
</html>
```
