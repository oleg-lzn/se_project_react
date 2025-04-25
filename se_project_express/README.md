# 🧥 WTWR (What to Wear?) — Back-End

This project is the back-end of the **WTWR (What to Wear?)** web application — a platform for users to share and explore clothing items based on the weather. The back-end is built with **Node.js**, **Express.js**, and **MongoDB**, and follows REST API principles. It handles user and item data, provides authorization stubs, and is structured for future scalability and deployment.

---

## 🛠️ Technologies Used

- **Node.js** — JavaScript runtime for building the server-side application.
- **Express.js** — Fast and minimalist web framework for routing and middleware.
- **MongoDB** — NoSQL database for storing users and clothing items.
- **Mongoose** — ODM library for working with MongoDB using models and schemas.
- **Nodemon** — For development with automatic server restarts on code changes.
- **REST API** — Standardized communication between client and server.
- **ESLint** — For code linting and enforcing coding standards.

---

## 📦 Tech Stack

| Layer            | Technology        |
| ---------------- | ----------------- |
| Runtime          | Node.js           |
| Server Framework | Express.js        |
| Database         | MongoDB           |
| ODM              | Mongoose          |
| Linting          | ESLint            |
| Dev Tools        | Nodemon           |
| HTTP Format      | RESTful API       |
| Testing Tools    | Postman, Insomnia |

---

## ⚙️ Development Approach

The project is designed with modularity and scalability in mind. Key principles include:

- **Separation of concerns**: Routes, controllers, models, and utilities are split into distinct folders.
- **Middleware usage**: All requests pass through middleware for preprocessing (e.g., user stub, JSON parsing).
- **Data abstraction**: Database operations are encapsulated in models.
- **RESTful routing**: Routes are organized according to resource-based principles.
- **Error handling**: Unmatched routes return 404 with a consistent response format.

The current version uses a **hardcoded user ID** for development purposes, simulating authentication. In production, this would be replaced with proper authentication middleware (e.g., JWT-based).

---

## 🚀 Future Improvements

- Implement real authentication with JWT tokens.
- Add validation with `Joi` or `Celebrate`.
- Improve error handling with custom error classes.
- Add environment variable support (`dotenv`) for config and database URLs.
- Deploy using services like Render, Heroku, or AWS.

---
