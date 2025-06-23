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

Environment Variable (Frontend)
Create a .env in the frontend folder if needed:
VITE_BASE_URL=http://localhost:8080


## 👤 Author

**Devansh Mayatra**

- GitHub: [@devanshmayatra](https://github.com/devanshmayatra)
- LinkedIn: [Devansh Mayatra](https://www.linkedin.com/in/devanshmayatra)
- Email: [devanshmayatra@gmail.com](mailto:devanshmayatra@gmail.com)

If you like this project, feel free to ⭐ the repo and share your thoughts!


