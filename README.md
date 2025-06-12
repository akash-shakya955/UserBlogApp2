# UserBlogApp

A blog management system built with a React frontend and Node.js backend.

## Project Structure
- **backend/**: Contains the Node.js backend with Express, MongoDB, and Multer for file uploads.
- **frontend/**: Contains the React frontend with components for managing users, blogs, tags, and categories.

## Features
- User management (add, edit, delete, view users)
- Blog management (add, edit, delete, view blogs with category and tags)
- Tag and category management
- Search, filter, and pagination support

## Setup
1. **Backend**:
   - Navigate to `backend/` folder
   - Run `npm install` to install dependencies
   - Create a `.env` file with `MONGO_URI` and `PORT`
   - Run `npm run dev` to start the server
2. **Frontend**:
   - Navigate to `frontend/` folder
   - Run `npm install` to install dependencies
   - Run `npm start` to start the React app

## Tech Stack
- Frontend: React, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose, Multer
- Tools: GitHub Desktop, MongoDB Compass
