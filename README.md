# Student Management System API

## Getting Started

### Prerequisites

- Node.js (version 18 or above)
- MongoDB Atlas account
- Postman 

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://SOUMOJIT-CHAKRABORTY/TGH-Assignment.git
   cd TGH-Assignment
Install dependencies:

bash

npm install
Set up environment variables:

Create a .env file in the root directory and add the following:

env

MONGO_URI=mongodb+srv://admin:soumojit123@assignment.glj9jsj.mongodb.net/assignment?retryWrites=true&w=majority

Usage
Start the server:

bash

npm start
API is accessible at:


http://localhost:3000/api
API Documentation
The API documentation is available in Postman.

Postman API Documentation

Endpoints
Admin Endpoints
1. Login
Endpoint: POST /api/admin/login

Request Body:

json

{
  "email": "admin@admin.com",
  "password": "adminpassword"
}
Response:

json
Copy code
{
  "token": "your-admin-jwt-token"
}
2. Add Student
Endpoint: POST /api/admin/add-student

Request Body:

json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Computer Science",
  "password": "studentpassword"
}
Response:

json
Copy code
{
  "message": "Student added successfully."
}
3. Assign Task to Student
Endpoint: POST /api/admin/assign-task/:studentId

Request Body:

json
Copy code
{
  "task": "Complete Assignment 1",
  "dueTime": "2023-01-01T12:00:00Z"
}
Response:

json
Copy code
{
  "message": "Task assigned successfully."
}
Student Endpoints
1. Login
Endpoint: POST /api/student/login

Request Body:

json
Copy code
{
  "email": "john.doe@example.com",
  "password": "studentpassword"
}
Response:

json
Copy code
{
  "token": "your-student-jwt-token",
  "user": {
    "id": "student-id",
    "email": "john.doe@example.com",
    "name": "John Doe"
  }
}
2. View Task Status
Endpoint: GET /api/student/task-status/:studentId

Response:

json
Copy code
{
  "taskStatuses": [
    {
      "name": "Complete Assignment 1",
      "status": "pending"
    },
    {
      "name": "Read Chapter 3",
      "status": "completed"
    }
  ]
}
3. Update Task Status
Endpoint: PUT /api/student/update-task-status/:taskId

Request Body:

json
Copy code
{
  "status": "completed"
}
Response:

json
Copy code
{
  "message": "Task status updated successfully."
}
