# 💪 Fitness Tracker Application

A modern, full-stack fitness tracking application built with Django and React for HealthTrack Ltd.

![Live Demo](https://img.shields.io/badge/demo-live-success)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Live Demo

**Frontend:** [https://fitness-tracker-healthtrack-deploy.vercel.app/](https://fitness-tracker-healthtrack-deploy.vercel.app/)

## ✨ Features

✅ **User Authentication**
- User registration with validation
- Secure login/logout
- Session management

✅ **Activity Tracking**
- Log workouts (type, duration, date)
- Log meals (calories, meal type)
- Log daily steps

✅ **Activity Management**
- View all activities in beautiful cards
- Update activity status (Planned → In Progress → Completed)
- Delete activities
- Filter by activity type

✅ **Beautiful UI**
- Modern gradient design
- Responsive layout
- Smooth animations
- Colored status badges

## 🛠️ Tech Stack

### Backend
- Django 5.0
- Django REST Framework
- SQLite Database
- Python 3.10

### Frontend
- React 18
- Vite
- Inline Styles (no external CSS frameworks)
- Modern JavaScript (ES6+)

### DevOps
- GitHub Actions (CI/CD)
- Vercel (Deployment)
- Git & GitHub (Version Control)

## 📦 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### Backend Setup
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/fitness-tracker-healthtrack.git
cd fitness-tracker-healthtrack/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Backend runs at: `http://127.0.0.1:8000`

### Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 🚀 API Endpoints

### Authentication
- `POST /api/register/` - Register new user
- `POST /api/login/` - Login user
- `POST /api/logout/` - Logout user
- `GET /api/me/` - Get current user

### Activities
- `GET /api/activities/` - List all activities
- `POST /api/activities/` - Create activity
- `GET /api/activities/{id}/` - Get activity detail
- `PUT /api/activities/{id}/` - Update activity
- `DELETE /api/activities/{id}/` - Delete activity

## 🔄 CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration:

✅ Automated backend testing
✅ Automated frontend build
✅ Runs on every push to master
✅ Automatic deployment to Vercel

## 📊 Project Management

- **Kanban Board:** [[View Project Board](https://github.com/users/kianadae/projects/3)]
- **User Stories:** 15 prioritized user stories
- **Issues Tracking:** GitHub Issues

## 👨‍💻 Author

**Christian M. Ada**  
SOFT806 - Continuous Integration and Continuous Deployment  
Auckland Institute of Studies

## 📄 License

MIT License - feel free to use this project for learning!

## 🙏 Acknowledgments

- Assignment for SOFT806 Course
- HealthTrack Ltd. scenario
- Built as part of CI/CD learning

---

⭐ **Star this repo if you found it helpful!**
