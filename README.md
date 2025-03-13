# Task Management Application

## Overview
This is a full-stack task management application built using **Next.js (Frontend), NestJS (Backend), and MongoDB (Database)**. The application allows users to **create, read, update, and delete (CRUD)** tasks with additional features such as **pagination, search, and filter**.

## Features
### **Frontend (Next.js + Redux Toolkit)**
- **Responsive UI** for managing tasks.
- **Pages:**
  - Home Page: Displays a paginated list of tasks.
  - Task Detail Page: Shows task details (title, description, status).
  - New Task Page: Create a new task.
  - Edit Task Page: Edit an existing task.
- **State Management:**
  - Redux Toolkit is used for managing the global state.
  - Async API calls handled with Redux Thunks.
- **Search & Filter:**
  - Search tasks by title.
  - Filter tasks by status.
- **Form Validation:**
  - Ensures title and description are provided before submission.

### **Backend (NestJS + MongoDB)**
- **REST API Endpoints:**
  - `POST /tasks` - Create a task.
  - `GET /tasks` - Fetch all tasks (supports pagination, search, and filtering).
  - `GET /tasks/:id` - Fetch a specific task by ID.
  - `PUT /tasks/:id` - Update a task.
  - `DELETE /tasks/:id` - Delete a task.
- **MongoDB Integration:**
  - Uses Mongoose ORM.
  - Task schema includes fields: `id`, `title`, `description`, `status`.
- **DTOs & Validation:**
  - Uses class-validator to validate payloads.
- **Error Handling:**
  - Returns proper error codes (e.g., 404 for not found tasks).

### **Testing**
- **Frontend:**
  - Jest tests for Redux slices and async thunks.
  - Component tests for task-related UI components.
- **Backend:**
  - Unit tests for service functions.
  - Integration tests for REST API.

## Bonus Implementations
✅ **Pagination** for task list.<br>
✅ **Search & Filtering** to enhance user experience.<br>
✅ **Docker Support** for running the frontend, backend, and MongoDB in containers.

## Tech Stack
- **Frontend:** Next.js, Redux Toolkit, Axios, Tailwind CSS
- **Backend:** NestJS, Mongoose, MongoDB
- **Testing:** Jest
- **Containerization:** Docker (optional)

## Installation & Setup
### **Prerequisites**
- Node.js (>=16)
- MongoDB (Local or Cloud e.g., MongoDB Atlas)
- Docker (optional)

### **Clone the Repository**
```sh
$ git clone https://github.com/yourusername/task-app.git
$ cd task-app
```

### **Environment Variables**
Create a `.env` file in both **`task-app/` (frontend)** and **`task-api/` (backend)**.

#### **Frontend (`task-app/.env.local`)**
```sh
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

#### **Backend (`task-api/.env`)**
```sh
MONGODB_URI=mongodb://localhost:27017/taskdb
PORT=5000
```

### **Install Dependencies & Start Servers**
#### **Backend Setup**
```sh
$ cd task-api
$ npm install
$ npm run start:dev
```

#### **Frontend Setup**
```sh
$ cd task-app
$ npm install
$ npm run dev
```

### **Run Tests**
#### **Backend Tests**
```sh
$ cd task-api
$ npm run test
```
#### **Frontend Tests**
```sh
$ cd task-app
$ npm run test
```

## Docker Setup (Optional)
To run the entire stack using Docker:
```sh
$ docker-compose up --build
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------------|----------------------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks (supports pagination, search, filter) |
| GET | `/tasks/:id` | Get a specific task by ID |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

## Video Demo
[Upload and share the video link here]

## Contributors
- **Your Name** - [GitHub Profile](https://github.com/yourusername)

## License
This project is licensed under the MIT License.

