# Realtime Chat Application

A full-stack realtime chat application built with MERN (MongoDB, Express.js, React, Node.js) stack, featuring user authentication, private messaging, and a modern, responsive UI.

## 🚀 Features

- **User Authentication** (Login, Registration)
- **Private Chats**
- **Real-time Messaging** (Socket.io)
- **Online/Offline User Status**
- **Responsive UI** (Tailwind CSS, DaisyUI)
- **MongoDB Atlas** for database
- **Dockerized** for easy development and deployment

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT
- **Other:** Docker, Docker Compose

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Aryan16032004/Realtime-Chat-application.git
cd Realtime-Chat-application
```

### 2. Configure Environment Variables

- **Backend:**  
  Create a `.env` file in the `Backend/` directory:
  ```
    PORT=5001
    MONGODB_URI=
    JWT_SECRET=
    NODE_ENV=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
  ```

### 3. Using Docker Compose

Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is running.

```bash
docker-compose up --build
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5001](http://localhost:5001)

### 4. Manual (Local) Development

#### Backend

```bash
cd Backend
npm install
npm start
```

#### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

