# Now I'm a Chef! 🧑🏼‍🍳

이 프로젝트는 **Node.js**와 **Express**, 그리고 **MongoDB**를 이용한 간단한 레시피 관리 웹 애플리케이션입니다. 프론트엔드는 순수 JavaScript와 Vite 번들러를 사용하여 제작되었습니다.

## 폴더 구조

```
backend/   # Express 서버 코드
frontend/  # Vite 기반 프론트엔드 코드
```

### backend
- `server.js`: Express 애플리케이션 진입점으로, REST API를 제공합니다.
- `routes/`: 사용자(auth, user)와 레시피(recipes) 관련 라우터가 정의되어 있습니다.
- `models/`: Mongoose 스키마(User, Recipe)를 포함합니다.
- `migrate_ingredients.js`: 기존 데이터의 재료 형식을 변경하는 스크립트입니다.

### frontend
- `index.html`: 메인 HTML 페이지입니다.
- `script.js`: 로그인/회원가입, 레시피 조회·검색, 댓글 및 창고 기능을 담당합니다.
- `style.css`: 기본 스타일 정의입니다.

## 실행 방법

1. MongoDB가 로컬에서 실행 중이어야 합니다. (기본 포트 27017 사용)
2. `backend/` 디렉터리에서 필요한 패키지를 설치하고 서버를 실행합니다.
   ```bash
   cd backend
   npm install
   npm start
   ```
3. 별도의 개발 서버가 필요하다면 `frontend/`에서 Vite를 실행할 수 있습니다.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   기본적으로 프론트엔드 스크립트는 `/api` 경로로 백엔드 API에 접근합니다.

## 주요 기능

- **회원가입/로그인**: `/api/register`, `/api/login` 엔드포인트로 사용자 인증을 처리합니다.
- **재료 관리**: 로그인한 사용자의 개인 창고에 재료를 추가·삭제하며 유통기한 정보를 저장할 수 있습니다.
- **레시피 목록 및 평점**: 레시피 목록을 조회하고 좋아요/싫어요, 댓글 기능을 제공합니다.
- **검색 기능**: 레시피 검색 뿐만 아니라 사용자가 가지고 있는 재료를 검색하면 그것으로 만들 수 있는 요리들을 추천해줍니다.

## 라이선스

이 저장소는 특별한 라이선스 없이 공개되어 있습니다. 자유롭게 활용하세요.