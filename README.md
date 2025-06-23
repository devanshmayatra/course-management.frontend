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


{
	"info": {
		"_postman_id": "0c3fd10e-8ee8-4a98-878d-1ba4d413be4d",
		"name": "course_ management",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "38629221"
	},
	"item": [
		{
			"name": "instances",
			"item": [
				{
					"name": "create instance",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"semester\": 1,\r\n    \"year\": 2025,\r\n    \"courseIds\": [2]\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8080/api/instance",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"instance"
							]
						}
					},
					"response": []
				},
				{
					"name": "get instances by year and sem",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:8080/api/instance/2025/1/6",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"instance",
								"2025",
								"1",
								"6"
							]
						}
					},
					"response": []
				},
				{
					"name": "delete by sem year and courseId",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:8080/api/instance/2025/0/8",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"instance",
								"2025",
								"0",
								"8"
							]
						}
					},
					"response": []
				},
				{
					"name": "get all instances",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:8080/api/instance",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8080",
							"path": [
								"api",
								"instance"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "get all courses",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:8080/api/courses",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
						"courses"
					]
				}
			},
			"response": []
		},
		{
			"name": "add course",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"title\":\"Math\",\r\n    \"description\":\"Playing with numbers !\",\r\n    \"prerequisites\":[1]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:8080/api/courses/add",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
						"courses",
						"add"
					]
				}
			},
			"response": []
		},
		{
			"name": "get one course",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:8080/api/courses/5",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
						"courses",
						"5"
					]
				}
			},
			"response": []
		},
		{
			"name": "delete course",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:8080/api/courses/7",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "8080",
					"path": [
						"api",
						"courses",
						"7"
					]
				}
			},
			"response": []
		}
	]
}


