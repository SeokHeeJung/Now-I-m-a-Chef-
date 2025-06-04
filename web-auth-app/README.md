# Web Auth App

This project is a web application that provides authentication functionality, including user login and signup. It consists of a backend built with Node.js and Express, and a frontend developed using React.

## Project Structure

```
web-auth-app
├── backend
│   ├── src
│   │   ├── app.js                # Entry point for the backend application
│   │   ├── controllers            # Contains authentication logic
│   │   │   └── authController.js  # Handles user authentication
│   │   ├── models                 # Defines data models
│   │   │   └── user.js            # User schema for MongoDB
│   │   ├── routes                 # API routes
│   │   │   └── authRoutes.js      # Authentication routes
│   │   └── utils                  # Utility functions
│   │       └── validators.js       # Input validation functions
│   ├── package.json               # Backend dependencies and scripts
│   └── README.md                  # Documentation for the backend
├── frontend
│   ├── src
│   │   ├── components             # UI components
│   │   │   ├── Login.js           # Login form component
│   │   │   └── Signup.js          # Signup form component
│   │   ├── App.js                 # Main application component
│   │   └── index.js               # Entry point for the frontend
│   ├── package.json                # Frontend dependencies and scripts
│   └── README.md                   # Documentation for the frontend
└── README.md                       # Overall project documentation
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   MONGODB_URI=your_mongodb_uri
   PORT=5000
   ```
4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```

## API Endpoints

- **POST /api/auth/signup**: Create a new user account.
- **POST /api/auth/login**: Authenticate a user and return a token.

## License

This project is licensed under the MIT License.