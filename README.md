# 📘 Course Management Frontend

A modern React + TypeScript based frontend for the **Course Management System** — designed to manage Courses and Course Instances. Built with Vite, styled cleanly, and integrated seamlessly with a Spring Boot + PostgreSQL backend.

---

## 🌐 Live Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Spring Boot
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose
- **UI Design**: Custom (responsive + clean)

---

## 🖥️ Features

- View, search, and manage courses
- Create and list course instances
- Popup-based course creation
- Dynamic loading indicators
- Integrated with API: `http://localhost:8080/api`

---

## 📂 Folder Structure

src/
├── assets/ # Static assets (images, icons, etc.)
├── components/ # Reusable UI components
├── pages/ # Page-level components
├── service/ # API service layers
├── types/ # TypeScript types/interfaces
├── utils/ # Utility files
├── App.tsx # Main app entry
└── index.tsx # ReactDOM render


---

## 🚀 How to Run the Project

> ✅ Make sure Docker and Docker Compose are installed.

### 1. Clone Both Repositories

```bash
mkdir course-management-system
cd course-management-system

git clone https://github.com/devanshmayatra/course-management.backend
git clone https://github.com/devanshmayatra/course-management.frontend

cd course-management.backend

docker-compose pull
docker-compose up

This will start:

PostgreSQL database
Spring Boot backend on http://localhost:8080
React frontend on http://localhost:3000

CORS Setup (Backend Required)
In WebConfig.java, update your CORS config:(If not there)
registry.addMapping("/**")
        .allowedOriginPatterns("http://localhost:3000")
        .allowedMethods("*")
        .allowedHeaders("*")
        .allowCredentials(true);

Environment Variable (Frontend)
Create a .env in the frontend folder if needed:
VITE_BASE_URL=http://localhost:8080

# Sheet1

|info| | | |item| | | | | | | | | | | | | | | | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|_postman_id|name|schema|_exporter_id|name|item| | | | | | | | | | | |request| | | | | | | | | | |response|
| | | | | |name|request| | | | | | | | | |response|method|header|url| | | | |auth|body| | | |
| | | | | | |method|header|body| | |url| | | | | | | |raw|protocol|host|port|path|type|mode|raw|options| |
| | | | | | | | |mode|raw|options|raw|protocol|host|port|path| | | | | | | | | | | |raw| |
| | | | | | | | | | |raw| | | | | | | | | | | | | | | | |language| |
| | | | | | | | | | |language| | | | | | | | | | | | | | | | | | |
|0c3fd10e-8ee8-4a98-878d-1ba4d413be4d|course_ management|https://schema.getpostman.com/json/collection/v2.1.0/collection.json|38629221|instances|create instance|POST| |raw|{     "semester": 1,     "year": 2025,     "courseIds": [2] }|json|http://localhost:8080/api/instance|http|localhost|8080|api| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |instance| | | | | | | | | | | | | |
| | | | | |get instances by year and sem|GET| | | | |http://localhost:8080/api/instance/2025/1/6|http|localhost|8080|api| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |instance| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |2025| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |1| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |6| | | | | | | | | | | | | |
| | | | | |delete by sem year and courseId|DELETE| | | | |http://localhost:8080/api/instance/2025/0/8|http|localhost|8080|api| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |instance| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |2025| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |0| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |8| | | | | | | | | | | | | |
| | | | | |get all instances|GET| | | | |http://localhost:8080/api/instance|http|localhost|8080|api| | | | | | | | | | | | | |
| | | | | | | | | | | | | | | |instance| | | | | | | | | | | | | |
| | | | |get all courses| | | | | | | | | | | | |GET| |http://localhost:8080/api/courses|http|localhost|8080|api| | | | | |
| | | | | | | | | | | | | | | | | | | | | | | |courses| | | | | |
| | | | |add course| | | | | | | | | | | | |POST| |http://localhost:8080/api/courses/add|http|localhost|8080|api|noauth|raw|{     "title":"Math",     "description":"Playing with numbers !",     "prerequisites":[1] }|json| |
| | | | | | | | | | | | | | | | | | | | | | | |courses| | | | | |
| | | | | | | | | | | | | | | | | | | | | | | |add| | | | | |
| | | | |get one course| | | | | | | | | | | | |GET| |http://localhost:8080/api/courses/5|http|localhost|8080|api| | | | | |
| | | | | | | | | | | | | | | | | | | | | | | |courses| | | | | |
| | | | | | | | | | | | | | | | | | | | | | | |5| | | | | |
| | | | |delete course| | | | | | | | | | | | |DELETE| |http://localhost:8080/api/courses/7|http|localhost|8080|api| | | | | |
| | | | | | | | | | | | | | | | | | | | | | | |courses| | | | | |
| | | | | | | | | | | | | | | | | | | | | | | |7| | | | | |

