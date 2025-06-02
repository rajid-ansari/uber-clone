# 🚀 Backend API Documentation

This backend provides endpoints for **user registration** and **login** with JWT-based authentication.

---

## 🛠️ Base URL

```
http://localhost:4000/
```

---

## 📥 User Registration

**Endpoint:**
`POST /user/register`

**Request Body:**

```json
{
  "fullname": {
    "first": "John",     // required, min 3 characters
    "last": "Doe"       // optional, min 3 characters
  },
  "email": "john.doe@example.com",    // required, valid email format
  "password": "password123"           // required, min 6 characters
}
```

**Success Response:**

```json
{
  "message": "User registered successfully"
}
```

* **Status:** `201 CREATED`
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


---

## 🚪 User Logout

**Endpoint:**  
`GET /user/logout`

**Authentication:**  
Requires a valid JWT token in the `token` cookie or `Authorization` header.

**Success Response:**

```json
{
  "success": "logged out successfully"
}
```

* **Status:** `200 OK`
* The `token` cookie will be cleared.

**Error Response:**

* **Status:** `401 Unauthorized`

```json
{ "error": "unauthorized" }
```

---

## 👤 User Profile

**Endpoint:**  
`GET /user/profile`

**Authentication:**  
Requires a valid JWT token in the `token` cookie or `Authorization` header.

**Success Response:**

```json
{
  "_id": "user_id",
  "fullname": {
    "first": "John",
    "last": "Doe"
  },
  "email": "john.doe@example.com",
  "createdAt": "2024-05-30T12:34:56.789Z",
  "updatedAt": "2024-05-30T12:34:56.789Z",
  "__v": 0
}
```

* **Status:** `200 OK`

**Error Response:**

* **Status:** `401 Unauthorized`

```json
{ "message": "Unauthorizaed" }
```

---

## 🧑‍✈️ Captain Registration

**Endpoint:**  
`POST /captain/register`

**Request Body:**
```json
{
  "fullname": {
    "first": "Jane",      // required, min 3 characters
    "last": "Smith"       // optional
  },
  "email": "jane.smith@example.com",   // required, valid email
  "password": "password123",           // required, min 6 characters
  "vehicle": {
    "vehicleType": "Car",              // required, one of: "Bike", "Car", "Auto"
    "vehicleNumber": "AB1234",         // required, min 4 characters
    "vehicleCapacity": 4,              // required, integer >= 1
    "color": "Red"                     // optional
  }
}
```

**Success Response:**
```json
{
  "message": "captain created successfully"
}
```
* **Status:** `201 Created`
* **Cookie:** `token` (JWT token)

**Error Responses:**
* **Status:** `400 Bad Request`
```json
{ "error": "All fields are required" }
```
* **Status:** `409 Conflict`
```json
{ "error": "This email is already exist" }
```

---

## 🧑‍✈️ Captain Login

**Endpoint:**  
`POST /captain/login`

**Request Body:**
```json
{
  "email": "jane.smith@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "message": "captain logged in successfully"
}
```
* **Status:** `200 OK`
* **Cookie:** `token` (JWT token)

**Error Response:**
* **Status:** `401 Unauthorized`
```json
{ "error": "Invalid email or password" }
```

---

## 🧑‍✈️ Captain Profile

**Endpoint:**  
`GET /captain/profile`

**Authentication:**  
Requires a valid JWT token in the `token` cookie or `Authorization` header.

**Success Response:**
```json
{
  "_id": "captain_id",
  "fullname": {
    "first": "Jane",
    "last": "Smith"
  },
  "email": "jane.smith@example.com",
  "vehicle": {
    "vehicleType": "Car",
    "vehicleNumber": "AB1234",
    "vehicleCapacity": 4,
    "color": "Red"
  },
  "createdAt": "2024-05-30T12:34:56.789Z",
  "updatedAt": "2024-05-30T12:34:56.789Z",
  "__v": 0
}
```
* **Status:** `200 OK`

**Error Response:**
* **Status:** `401 Unauthorized`
```json
{ "message": "Unauthorizaed" }
```

---

## 🧑‍✈️ Captain Logout

**Endpoint:**  
`GET /captain/logout`

**Authentication:**  
Requires a valid JWT token in the `token` cookie or `Authorization` header.

**Success Response:**
```json
{
  "success": "logged out successfully"
}
```
* **Status:** `200 OK`
* The `token` cookie will be cleared.

**Error Response:**
* **Status:** `401 Unauthorized`
```json
{ "error": "unauthorized" }
```