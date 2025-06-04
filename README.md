# 👨‍🍳 Now I'm a Chef

이 프로젝트는 요리 레시피 관리 및 인증 기능을 제공하는 웹 애플리케이션입니다.  
Node.js(Express) 기반의 백엔드와 React 기반의 프론트엔드로 구성되어 있습니다.

---

## 주요 기능

- 회원가입 및 로그인
- 레시피 등록, 수정, 삭제
- 사용자별 레시피 관리

---

## 폴더 구조

```
Now-I-m-a-Chef-/
├── auth-backend/    # 인증 및 백엔드 API
│   ├── src/
│   │   ├── app.js              # 백엔드 애플리케이션의 진입점
│   │   ├── controllers/        # 인증 로직
│   │   ├── models/             # 사용자 스키마
│   │   ├── routes/             # 인증 라우트
│   │   └── middleware/         # 인증 미들웨어
│   ├── package.json            # 백엔드 의존성
│   └── README.md               # (서브 문서, 선택)
├── web-auth-app/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/     # 로그인/회원가입 컴포넌트
│   │   │   ├── App.js
│   │   │   └── index.js
│   │   └── README.md           # (서브 문서, 선택)
│   ├── package.json            # 프론트엔드 의존성
│   └── README.md               # (서브 문서, 선택)
└── README.md                   # 전체 프로젝트 문서 (이 파일)
```

---

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/SeokHeeJung/Now-I-m-a-Chef-.git
cd Now-I-m-a-Chef-
```

### 2. 백엔드 실행

```bash
cd auth-backend
npm install
# .env 파일에 MONGODB_URI 등 환경변수 설정
npm start
```

### 3. 프론트엔드 실행

```bash
cd web-auth-app/frontend
npm install
npm start
```

---

## 사용법

- 브라우저에서 `http://localhost:3000` 접속
- 회원가입/로그인 후 레시피 관리 기능 사용

---

## 기여

문제나 개선 사항에 대한 이슈 또는 풀 리퀘스트를 자유롭게 제출해 주세요.

---

## 기술 스택

- **백엔드:** Node.js, Express, MongoDB, Mongoose
- **프론트엔드:** React, JavaScript
- **인증:** JWT(JSON Web Token)
- **기타:** dotenv, bcrypt 등

---

## 환경 변수(.env) 예시

백엔드(auth-backend) 폴더에 `.env` 파일을 아래와 같이 생성하세요.

```
MONGODB_URI=mongodb://localhost:27017/auth-backend
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

---

## 주요 명령어

### 백엔드

- 개발 서버 실행:  
  ```bash
  npm run dev
  ```
- 일반 서버 실행:  
  ```bash
  npm start
  ```

### 프론트엔드

- 개발 서버 실행:  
  ```bash
  npm start
  ```

---

## 폴더별 간단 설명

- **auth-backend/** : 로그인/회원가입 등 인증 및 API 서버 코드
- **web-auth-app/frontend/** : 사용자 인터페이스(React) 코드

---

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

## 문의

- 개발자: 정석희  
- 이메일: your.email@example.com

---

> 추가로 궁금한 점이나 기여를 원하시면 언제든 이슈나 PR을 남겨주세요!