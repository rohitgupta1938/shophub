# 🛍️ ShopHub - MERN Stack Developer Interview Assignment

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application developed for the **Blackcube Solution LLC - MERN Stack Developer Interview Assignment**.

The application allows users to register, log in securely using JWT authentication, manage products, like/unlike products, and manage their own profile.

---

# 🚀 Live Demo

### Frontend

https://shophub-pjg5.vercel.app/

### Backend API

https://shophub-assignment.onrender.com/

---

# 📂 GitHub Repository

https://github.com/yourusername/shophub

---

# 👨‍💻 Developer

**Rohit Gupta**

B.Tech Computer Science & Engineering

MERN Stack Developer

Email: rohitgupta.fullstack@gmail.com

GitHub:  https://github.com/rohitgupta1938/shophub

---

# 📋 Assignment Requirements Covered

## Authentication

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Logout

---

## Home Screen

- ✅ Product Listing
- ✅ Product Image
- ✅ Product Name
- ✅ Product Price
- ✅ Product Description
- ✅ Like Button
- ✅ Edit Button

---

## Product Management

- ✅ Add Product
- ✅ Edit Product
- ✅ Delete Product
- ✅ Product Validation

---

## Liked Products

- ✅ Like Product
- ✅ Unlike Product
- ✅ View Liked Products

---

## Profile

- ✅ Name
- ✅ Email
- ✅ Mobile Number
- ✅ Logout

---

## Validation

- ✅ Required Field Validation
- ✅ Email Validation
- ✅ Mobile Number Validation
- ✅ Password Validation
- ✅ Confirm Password Validation

---

## Security

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Protected APIs
- ✅ Owner Authorization

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Context API
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Database

- MongoDB Atlas

## Deployment

- Frontend: Vercel
- Backend: Render

---

# 📁 Project Structure

```
ShopHub
│
├── backend
│   ├── middleware
│   ├── models
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes
│   │   ├── auth.js
│   │   └── products.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api.js
│   │   ├── context
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend (.env)

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

## Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/shophub.git
```

---

## Install Backend

```bash
cd backend

npm install

npm run dev
```

---

## Install Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Test Credentials

You can either register a new account or use the following credentials:

Email

```
test@example.com
```

Password

```
123456
```

---

# 📡 API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Current User

```
GET /api/auth/me
```

---

## Products

### Get Products

```
GET /api/products
```

### Create Product

```
POST /api/products
```

### Update Product

```
PUT /api/products/:id
```

### Delete Product

```
DELETE /api/products/:id
```

### Like Product

```
POST /api/products/:id/like
```

### Liked Products

```
GET /api/products/liked
```

### My Products

```
GET /api/products/mine
```

---

# 🌐 Deployment

## Frontend

Deploy on **Vercel**

## Backend

Deploy on **Render**

## Database

MongoDB Atlas

---

# 📸 Screenshots

- Login Page
- Signup Page
- Home Page
- Add Product Page
- Edit Product Page
- Liked Products Page
- Profile Page

(Add screenshots after deployment.)

---

# ✅ Evaluation Checklist

- Clean Folder Structure
- Clean Code
- Responsive UI
- Authentication Flow
- CRUD Operations
- Product Management
- Like Functionality
- MongoDB Integration
- API Integration
- Error Handling
- Form Validation
- JWT Authentication
- Deployment Ready

---