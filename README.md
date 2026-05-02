# TaskFlow

## Project Overview

TaskFlow is a web application designed for managing tasks and projects, offering a user-friendly interface with drag-and-drop functionality and robust user authentication. This document provides an overview of the application's architecture, dependencies, and key features.

## Technology Stack

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **Backend:** Express, TypeScript, MongoDB

## Dependencies

The following npm packages are used in this project:

*   vite
*   @vitejs
*   path
*   vite-plugin-livereload
*   react
*   react-dom
*   react-router-dom
*   express
*   jsonwebtoken
*   @types
*   mongodb

## Project Structure

The project is structured with a frontend and a backend component.

### Frontend

The frontend is built using React and Vite, providing a responsive and interactive user experience.

*   **`frontend/`**: Root directory for the frontend application.
*   **`frontend/src/main.tsx`**: Entry point for the React application.
*   **`frontend/src/App.tsx`**: Main application component.
*   **`frontend/src/index.css`**: Global styles and Tailwind directives.
*   **`frontend/src/pages/`**: Contains React components for each page of the application (LandingPage, Login, Register, Dashboard, ProjectDetail, TaskDetail).
*   **`frontend/src/components/`**: Contains reusable React components (Layout, Navbar).
*   **`frontend/src/api/client.ts`**:  Handles API requests to the backend.
*   **`frontend/src/store/authStore.ts`**:  Manages authentication state.
*   **`frontend/src/hooks/useAuth.ts`**:  Provides authentication hooks.
*   **`frontend/src/types/index.ts`**: Defines TypeScript types for the application.

### Backend

The backend is built using Express and TypeScript, providing a RESTful API for the frontend.

*   **`backend/`**: Root directory for the backend application.
*   **`backend/src/index.ts`**: Entry point for the Express application.
*   **`backend/src/middleware/auth.ts`**: Authentication middleware.
*   **`backend/src/config/db.ts`**: Configuration for the MongoDB connection.
*   **`backend/src/routes/auth.ts`**: Routes for user authentication (register, login).
*   **`backend/src/models/Auth.ts`**:  MongoDB model for user authentication data.
*   **`backend/src/controllers/authController.ts`**:  Handles authentication logic.
*   **`backend/src/routes/projects.ts`**: Routes for project management (create, read, update, delete).
*   **`backend/src/models/Projects.ts`**: MongoDB model for project data.
*   **`backend/src/controllers/projectsController.ts`**: Handles project logic.
*   **`backend/src/routes/tasks.ts`**: Routes for task management (create, read, update, delete).
*   **`backend/src/models/Tasks.ts`**: MongoDB model for task data.
*   **`backend/src/controllers/tasksController.ts`**: Handles task logic.
*   **`backend/tsconfig.json`**: TypeScript configuration file.

## API Endpoints

The following API endpoints are available:

*   `POST /api/auth/register`: Registers a new user.
*   `POST /api/auth/login`: Logs in an existing user.
*   `GET /api/projects`: Retrieves a list of all projects for the logged-in user.
*   `POST /api/projects`: Creates a new project.
*   `GET /api/projects/:projectId`: Retrieves a specific project by ID.
*   `PUT /api/projects/:projectId`: Updates a specific project.
*   `DELETE /api/projects/:projectId`: Deletes a specific project.
*   `POST /api/tasks`: Creates a new task.
*   `GET /api/tasks`: Retrieves a list of all tasks for the logged-in user.
*   `GET /api/tasks/:taskId`: Retrieves a specific task by ID.
*   `PUT /api/tasks/:taskId`: Updates a specific task.
*   `DELETE /api/tasks/:taskId`: Deletes a specific task.

## Development Setup

Instructions for setting up and running the application are available in the `frontend/` and `backend/` directories.  Refer to the respective `package.json` files for installation and start commands.