# 🎓 Course Management Frontend

A modern and responsive frontend for the **Course Management System**, built using **React + TypeScript + Vite**. This frontend connects to a Spring Boot backend and allows users to manage courses and course instances seamlessly.

---

## 🌐 Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Custom CSS (can be extended with Tailwind or MUI)
- **API Layer**: Axios-based service modules
- **Deployment Ready**: Docker + Nginx configured

---

## 📂 Folder Structure

```
src/
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable UI components
│   ├── AddCourse.tsx
│   ├── CourseDetails.tsx
│   ├── CourseInstancesList.tsx
│   ├── CourseList.tsx
│   ├── CoursePage.tsx
│   ├── CreateCourseInstance.tsx
│   ├── Header.tsx
│   └── Instance.tsx
├── pages/                # Route-level components
├── service/              # API service logic
│   ├── CourseService.tsx
│   └── CourseInstanceService.tsx
├── types/                # TypeScript types/interfaces
│   ├── Course.tsx
│   └── CourseInstance.tsx
├── utils/                # Utility helpers
├── App.tsx               # Main App component
└── index.tsx             # ReactDOM entry point
```

---

## 🚀 How to Run the Project

> ✅ Make sure Docker and Docker Compose are installed.

### 1. Clone Both Repositories

```bash
mkdir course-management-system
cd course-management-system

git clone https://github.com/devanshmayatra/course-management.backend
git clone https://github.com/devanshmayatra/course-management.frontend
```

### 2. Run Containers

```bash
cd course-management.backend

docker-compose pull
docker-compose up -d
```

This will start:

- PostgreSQL database  
- Spring Boot backend on `http://localhost:8080`  
- React frontend on `http://localhost:3000`

---


## ⚙️ Environment Variables

Create a `.env` file in the `course-management.frontend` folder:

```env
VITE_BASE_URL=http://localhost:8080
```

This points your frontend to the local Spring Boot backend API.

---

## 🧩 Features

- 📚 View, search, and manage all courses
- 🎯 Add and view course prerequisites
- 🧠 Manage course instances (semester + year + course)
- 🔄 Loading indicators and UI feedback
- 📡 Connected to live API: `http://localhost:8080/api`

---

## 🌐 CORS Note (Backend Setup)

Ensure the Spring Boot backend allows CORS from the frontend by updating `WebConfig.java`:

```java
registry.addMapping("/**")
        .allowedOriginPatterns("http://localhost:3000")
        .allowedMethods("*")
        .allowedHeaders("*")
        .allowCredentials(true);
```

---

## 📮 API Overview

See the [Course Management Backend](https://github.com/devanshmayatra/course-management.backend) for full documentation of available routes and sample requests.

---

## 👤 Author

**Devansh Mayatra**

- GitHub: [@devanshmayatra](https://github.com/devanshmayatra)
- LinkedIn: [Devansh Mayatra](https://www.linkedin.com/in/devanshmayatra)
- Email: [devanshmayatra@gmail.com](mailto:devanshmayatra@gmail.com)

---

> ⭐ If this project helped you, please consider starring the repo!
