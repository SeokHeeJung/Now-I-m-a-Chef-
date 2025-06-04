# Web Authentication Application

## Overview
This project is a web authentication application that provides login and signup functionality. It consists of a backend built with Node.js and Express, and a frontend developed using React.

## Backend
The backend is responsible for handling user authentication, including login and signup processes. It uses MongoDB for data storage.

### Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd web-auth-app/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the backend directory and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   ```
5. Start the server:
   ```
   npm start
   ```

### API Usage
- **Signup**
  - Endpoint: `POST /api/auth/signup`
  - Request Body: 
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  
- **Login**
  - Endpoint: `POST /api/auth/login`
  - Request Body: 
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

## Frontend
The frontend provides a user interface for users to log in and sign up. It communicates with the backend API for authentication.

### Setup Instructions
1. Navigate to the frontend directory:
   ```
   cd web-auth-app/frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.