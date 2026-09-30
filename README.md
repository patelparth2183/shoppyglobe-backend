# ShoppyGlobe Backend API

A RESTful backend API for the ShoppyGlobe e-commerce application built using Node.js, Express.js and MongoDB.

## Technologies Used
* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Thunder Client
* Nodemon

## Features
* User registration
* User login
* JWT authentication
* Product listing
* Product details
* Add product to cart
* Update cart quantity
* Delete cart item
* MongoDB database integration
* Request logging
* Input validation
* Error handling

## GitHub Link
https://github.com/patelparth2183/shoppyglobe-backend

## Installation
### 1. Clone the repository

```bash
git clone https://github.com/patelparth2183/shoppyglobe-backend
```

### 2. Open the project

```bash
cd shoppyglobe-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the environment file

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
```

Do not upload the `.env` file to GitHub.

### 5. Seed products

```bash
node seedProducts.js
```

### 6. Start the development server

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

## Production Start

```bash
npm start
```

## Database

MongoDB Atlas is used as the database.

Collections:

* users
* products
* carts

## Request Logging

The application logs HTTP requests in the server terminal.

Example:

```text
GET /products
POST /register
POST /login
POST /cart
PUT /cart/:id
DELETE /cart/:id
```

## Author
Parth Patel