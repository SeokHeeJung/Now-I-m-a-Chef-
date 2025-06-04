# Web Auth App

This project is a web application that provides authentication functionality, including login and signup features. It consists of a backend built with Node.js and Express, and a frontend developed using React.

## Project Structure

```
web-auth-app
├── backend
│   ├── src
│   │   ├── app.js          # Entry point for the backend application
│   │   ├── controllers     # Contains authentication logic
│   │   │   └── authController.js
│   │   ├── models          # Defines the user schema
│   │   │   └── user.js
│   │   ├── routes          # Sets up authentication routes
│   │   │   └── authRoutes.js
│   │   └── utils           # Utility functions for validation
│   │       └── validators.js
│   ├── package.json        # Backend dependencies and scripts
│   └── README.md           # Documentation for the backend
├── frontend
│   ├── src
│   │   ├── components      # Contains Login and Signup components
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Entry point for the frontend application
│   ├── package.json        # Frontend dependencies and scripts
│   └── README.md           # Documentation for the frontend
└── README.md               # Overall project documentation
```

## Getting Started

### Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies using:
   ```
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your MongoDB URI and any other necessary environment variables.
4. Start the backend server with:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies using:
   ```
   npm install
   ```
3. Start the frontend application with:
   ```
   npm start
   ```

## Usage

- Access the frontend application in your browser at `http://localhost:3000`.
- Use the provided forms to sign up or log in to the application.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

---

# Web Auth App (프론트엔드)

이 프로젝트는 로그인 및 회원가입 기능을 포함한 인증 기능을 제공하는 웹 애플리케이션입니다. Node.js 및 Express로 구축된 백엔드와 React로 개발된 프론트엔드로 구성되어 있습니다.

## 프로젝트 구조

```
web-auth-app
├── backend
│   ├── src
│   │   ├── app.js          # 백엔드 애플리케이션의 진입점
│   │   ├── controllers     # 인증 로직을 포함
│   │   │   └── authController.js
│   │   ├── models          # 사용자 스키마 정의
│   │   │   └── user.js
│   │   ├── routes          # 인증 경로 설정
│   │   │   └── authRoutes.js
│   │   └── utils           # 유효성 검사를 위한 유틸리티 함수
│   │       └── validators.js
│   ├── package.json        # 백엔드 의존성 및 스크립트
│   └── README.md           # 백엔드 문서
├── frontend
│   ├── src
│   │   ├── components      # 로그인 및 회원가입 컴포넌트 포함
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── App.js          # 메인 애플리케이션 컴포넌트
│   │   └── index.js        # 프론트엔드 애플리케이션의 진입점
│   ├── package.json        # 프론트엔드 의존성 및 스크립트
│   └── README.md           # 프론트엔드 문서
└── README.md               # 전체 프로젝트 문서
```

## 시작하기

### 백엔드 설정

1. `backend` 디렉토리로 이동합니다.
2. 다음을 사용하여 의존성을 설치합니다.
   ```
   npm install
   ```
3. `backend` 디렉토리에 `.env` 파일을 생성하고 MongoDB URI 및 기타 필요한 환경 변수를 추가합니다.
4. 다음을 사용하여 백엔드 서버를 시작합니다.
   ```
   npm start
   ```

### 프론트엔드 설정

1. `frontend` 디렉토리로 이동합니다.
2. 다음을 사용하여 의존성을 설치합니다.
   ```
   npm install
   ```
3. 다음을 사용하여 프론트엔드 애플리케이션을 시작합니다.
   ```
   npm start
   ```

## 사용법

- 브라우저에서 `http://localhost:3000`에 프론트엔드 애플리케이션에 접근합니다.
- 제공된 양식을 사용하여 애플리케이션에 회원가입하거나 로그인합니다.

## 기여

문제나 개선 사항에 대한 이슈 또는 풀 리퀘스트를 자유롭게 제출해 주세요.