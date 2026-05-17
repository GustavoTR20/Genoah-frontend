# GENOAH Frontend

---

## Description

GENOAH Frontend is a modern subscription management web application developed using React and Vite.

The application allows users to manage digital subscriptions, organize services, monitor monthly and annual expenses, filter subscriptions by status and perform complete CRUD operations through a responsive and modern interface.

---

## Features

- Create new subscriptions
- Edit existing subscriptions
- Delete subscriptions
- Filter subscriptions by status
- Search subscriptions dynamically
- Responsive dashboard interface
- Real-time monthly and annual cost calculation
- Component-based React architecture
- Modern UI inspired by SaaS dashboards

---

## Technologies Used

### Frontend
- React
- Vite
- JavaScript
- CSS3
- Axios
- React Hooks
- Component-Based Architecture

### Backend
- Node.js
- Express.js
- Prisma ORM
- MongoDB Atlas
- REST API
- CORS

### Tools & Version Control
- Git
- GitHub
- VS Code

## Project Development

This project was developed based on a previous CRUD application originally created by me as part of my full stack development learning process.

The application was redesigned and expanded into a modern subscription management dashboard with a cleaner UI, reusable React components and improved frontend organization.

The frontend was built using React and Vite, focusing on responsive dashboard design, state management and component-based architecture.

The project is connected to a separate backend application developed with Node.js, Express and Prisma ORM, using MongoDB Atlas as the database service.

The backend is responsible for handling all CRUD operations, API requests, subscription management and database communication through REST endpoints.

During development, the project structure was refactored multiple times to improve scalability, maintainability and code organization by separating reusable UI sections into independent React components.

---

## Project Structure

```bash
react-project/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── trash.png
│   │
│   ├── components/
│   │   ├── footer.jsx
│   │   ├── sidebar.jsx
│   │   ├── subscriptionTable.jsx
│   │   └── topbar.jsx
│   │
│   ├── pages/
│   │   └── home/
│   │       ├── index.jsx
│   │       └── style.css
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

## GitHub Repository Frontend

https://github.com/GustavoTR20/Genoah-frontend

---

## GitHub Repository Backend

https://github.com/GustavoTR20/Genoah-backend

---

## Live Website

The project is deployed and can be accessed at:

https://genoah-frontend.onrender.com/

---

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/GustavoTR20/Genoah-frontend.git
```

2. Navigate to the project folder:

```bash
cd react-project
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open in browser:

```txt
http://localhost:5173
```