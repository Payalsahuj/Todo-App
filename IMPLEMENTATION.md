# Implementation

## Overview

This project is built using **Next.js**, **MongoDB**, **Magic.link**, and **Tailwind CSS**. The backend handles user authentication, CRUD operations for todos, and note management, while the frontend is structured using reusable components and leverages Context API for state management.

---

## Folder Structure

```
├── app
│   ├── Component
│   │   ├── Addtodo.tsx
│   │   ├── Button.tsx
│   │   ├── DeleteModal.tsx
│   │   ├── Dropdown.tsx
│   │   ├── FilterSideBar.tsx
│   │   ├── Header.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── Pagination.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TodoDetailsModal.tsx
│   │   └── TodoList.tsx
│   ├── api
│   │   ├── login
│   │   │   └── route.ts
│   │   ├── todos
│   │   │   ├── [id]
│   │   │   │   ├── notes
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── export
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── users
│   │       └── route.js
│   ├── layout.tsx
│   └── page.tsx
├── lib
│   ├── connectDB.js
│   └── verifyToken.js
├── model
│   ├── Todo.js
│   └── User.js

```

---

## Backend Implementation

### **Database Connection (`lib/connectDB.js`)**

- Establishes a MongoDB connection using Mongoose.
- Implements caching logic to prevent multiple database connections.

**Key Logic:**

- Ensures `DATABASE_URL` is defined in `.env.local`.
- Utilizes global caching to improve performance in serverless environments.

### **Token Verification (`lib/verifyToken.js`)**

- Uses `jsonwebtoken` to decode and verify tokens.
- Ensures requests are authenticated securely.

### **Login API (`/api/login.js`)**

- Uses **Magic.link** for passwordless login.
- Upserts user information to MongoDB for persistence.
- Generates a JWT token to secure user sessions.

### **Todos API (`/api/todos`)**

- Provides endpoints for:
  - **GET:** Fetch paginated and filtered todos.
  - **POST:** Create new todos.
  - **PUT:** Update existing todos.
  - **DELETE:** Remove todos by ID.

**Pagination & Filtering Features:**

- Supports filtering by **tags**, **priority**, and **assigned users**.
- Enables efficient data handling with pagination logic.

### **Todos Export API (`/api/todos/export.js`)**

- Provides a secure endpoint to export all todos.

### **Todo Notes API (`/api/todos/notes.js`)**

- Provides functionality to add or update notes on specific todos.

### **Todo Details API (`/api/todos/[id].js`)**

- Provides CRUD operations for individual todo entries.

---

## Frontend Implementation

- Utilizes **Next.js** for seamless API integration and server-side rendering.
- Components are split into modular files for better reusability and scalability.
- Uses **Tailwind CSS** for styling with minimal custom CSS.

### **Login Flow**

- Uses **Magic.link** for secure, passwordless authentication.

### **State Management**

- Implemented using **Context API** for efficient data flow across components.
- Given the project scope, Redux was deemed unnecessary.

---

## Environment Variables

Ensure the following variables are defined in your `.env` file:

```
DATABASE_URL=<Your MongoDB URL>
MAGIC_SECRET=<Your Magic Link Secret>
NEXT_PUBLIC_MAGIC_CLIENT=<Your Magic Client Key>
JWT_SECRET=<Your JWT Secret Key>
```

---

## Tech Stack

- **Next.js** - Framework for React applications.
- **MongoDB** - NoSQL database for data storage.
- **Magic.link** - Secure, passwordless authentication.
- **Tailwind CSS** - Utility-first CSS framework for styling.

---

## Running the Project

1. **Clone the Repository:**
   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Set Environment Variables:**
   Create a `.env.local` file and add your credentials as mentioned above.
4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
5. **Access the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Additional Notes

- For improved security, ensure JWT tokens have a proper expiration time.
- Implement better error handling and input validation for robust APIs.
- Consider optimizing database queries for large datasets.
