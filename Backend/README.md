# 🚀 Backend API Documentation

This backend provides endpoints for **user registration** and **login** with JWT-based authentication.

---

## 🛠️ Base URL

```
http://localhost:3000/
```

---

## 📥 User Registration

**Endpoint:**
`POST /user/register`

**Request Body:**

```json
{
  "fullname": {
    "first": "John",
    "last": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Success Response:**

```json
{
  "message": "User registered successfully"
}
```

* **Status:** `200 OK`
* **Cookie:** `token` (JWT token)

**Error Responses:**

* **Status:** `400 Bad Request`

```json
{ "error": "User registration failed" }
```

* **Status:** `409 Conflict`

```json
{ "error": "This email is already registered" }
```

---

## 🔐 User Login

**Endpoint:**
`POST /user/login`

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Success Response:**

```json
{
  "message": "User logged in successfully"
}
```

* **Status:** `200 OK`
* **Cookie:** `token` (JWT token)

**Error Response:**

* **Status:** `401 Unauthorized`

```json
{ "error": "Email or password is invalid" }
```

---

## ℹ️ Notes

* All requests and responses use `application/json`.
* On successful login/registration, a **JWT token** is set in the `token` cookie.
* If you're calling from the frontend, include `credentials: "include"` in fetch or axios for cookie support.
