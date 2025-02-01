# Habit Tracker API

A RESTful API built with **Node.js, Express, MongoDB, JWT, and bcrypt** to track daily habits and progress.

## Features
- User Authentication (JWT-based)
- Habit Management (Create, Update, Delete)
- Progress Tracking (Daily status updates)
- Secure Password Handling (bcrypt hashing)

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)
- **Security:** bcrypt for password hashing

---

## 🛠️ Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/yourusername/habit-tracker-api.git
cd habit-tracker-api

npm install

PORT=5000
MONGO_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your-secret-key

npm start