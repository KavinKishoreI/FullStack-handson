# Shop Backend — Hands-On Guide

This backend is a small teaching e-commerce API built with Express.js and SQLite.

The quickest way to learn it is to **run the server and exercise the API in Postman**, following the flow below.

---

# 1. Start the backend

### Prerequisites

Install:

- Node.js 20+
- Postman

### Install and run

From the repository root:

```bash
cd backend
npm install
```

Create the environment file.

**Windows:**

```cmd
copy .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Reset the database so you start with fresh products and demo users:

```bash
npm run db:reset
```

Start the development server:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:4000
```

When it starts successfully, you should see:

```text
API listening on http://localhost:4000
```

Leave this terminal running while using Postman.

---

# 2. Your Postman base URL

Use:

```text
http://localhost:4000
```

All API endpoints begin with:

```text
/api
```

So the health check is:

```text
GET http://localhost:4000/api/health
```

---

# 3. First hands-on check

Create a new request in Postman:

```text
GET http://localhost:4000/api/health
```

Click **Send**.

Expected response:

```json
{
  "status": "ok"
}
```

If this works, your Express server is running.

---

# 4. Explore the products

### Get all products

```text
GET /api/products
```

Expected: a list of 8 products.

### Search by name

```text
GET /api/products?search=mouse
```

Try changing `mouse` to:

```text
lamp
keyboard
book
```

### Filter by category

```text
GET /api/products?category=electronics
```

Try:

```text
home
books
stationery
apparel
```

### Get one product

```text
GET /api/products/1
```

Try:

```text
GET /api/products/999
```

The second request should return a `404` because that product does not exist.

---

# 5. Create your own user

Now try the authentication flow.

Create:

```text
POST /api/auth/signup
```

In Postman:

**Body → raw → JSON**

```json
{
  "name": "Sundar",
  "email": "sundar@example.com",
  "password": "secret123"
}
```

You should receive:

- a `201 Created` response;
- a `user` object;
- a JWT `token`.

Save the token somewhere temporarily because you will use it for the protected requests below.

> You can also use the seeded demo account instead of creating a new user.

---

# 6. Use the seeded accounts

The database starts with two accounts.

### Customer

```text
Email:    demo@shop.test
Password: demo123
```

### Admin

```text
Email:    admin@shop.test
Password: admin123
```

The customer account is useful for cart and order practice.

The admin account is useful for product-management practice.

---

# 7. Login and get a JWT

Create:

```text
POST /api/auth/login
```

Body:

```json
{
  "email": "demo@shop.test",
  "password": "demo123"
}
```

The response contains:

```json
{
  "token": "...",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@shop.test",
    "role": "customer"
  }
}
```

Copy the token.

---

# 8. Test a protected endpoint

Create:

```text
GET /api/auth/me
```

In Postman:

**Authorization → Bearer Token**

Paste the JWT from the login response into the token field.

Send the request.

You should receive the currently logged-in user.

This same Bearer Token setup is used for:

```text
/api/auth/me
/api/cart
/api/orders
/admin product operations
```

---

# 9. Hands-on: shopping cart

Use your customer JWT for all cart requests.

## View your cart

```text
GET /api/cart
```

At the beginning:

```json
{
  "items": [],
  "itemCount": 0,
  "total": 0
}
```

## Add a product

```text
POST /api/cart/items
```

Body:

```json
{
  "productId": 1,
  "quantity": 2
}
```

You should receive the updated cart.

## Add the same product again

Send the same request again.

The quantity should increase.

This is useful for seeing the difference between:

```text
POST = add more
PUT  = set an exact quantity
```

## Set an exact quantity

```text
PUT /api/cart/items/1
```

Body:

```json
{
  "quantity": 3
}
```

Send the request twice.

The quantity should remain `3` both times.

## Remove one cart item

```text
DELETE /api/cart/items/1
```

Expected:

```text
204 No Content
```

## Clear the whole cart

```text
DELETE /api/cart
```

Expected:

```text
204 No Content
```

---

# 10. Hands-on: checkout

Add an item to your cart again:

```text
POST /api/cart/items
```

```json
{
  "productId": 1,
  "quantity": 2
}
```

Now checkout:

```text
POST /api/orders
```

No request body is required.

The backend calculates the order total from the database.

After checkout:

- the order is created;
- the cart is cleared;
- product stock is reduced.

Open:

```text
GET /api/products/1
```

and compare the stock with what you saw earlier.

Then open:

```text
GET /api/orders
```

You should see your newly created order.

---

# 11. View a specific order

Take an order ID from:

```text
GET /api/orders
```

Then request:

```text
GET /api/orders/<orderId>
```

Example:

```text
GET /api/orders/1
```

Use the same customer Bearer Token.

The response contains:

```text
order details
+
items bought
+
price used at purchase time
```

---

# 12. Hands-on: admin product management

Login using:

```text
admin@shop.test
admin123
```

Copy the returned JWT and use it as a Bearer Token.

## Create a product

```text
POST /api/products
```

Body:

```json
{
  "name": "USB Cable",
  "description": "2m USB-C cable",
  "price": 49900,
  "category": "electronics",
  "imageUrl": "https://example.com/cable.jpg",
  "stock": 20
}
```

Expected:

```text
201 Created
```

## Update a product

```text
PATCH /api/products/<productId>
```

Example:

```text
PATCH /api/products/1
```

Body:

```json
{
  "price": 89900,
  "stock": 20
}
```

Expected:

```text
200 OK
```

## Check authorization

Log in as the normal customer and try:

```text
POST /api/products
```

The request should fail with:

```text
403 Admin access required
```

This is the practical difference between:

```text
Authentication → Who are you?
Authorization  → Are you allowed to do this?
```

---

# 13. A good practice sequence

For the full hands-on session, follow this order:

```text
1. Start server
        ↓
2. GET /api/health
        ↓
3. GET /api/products
        ↓
4. Search / filter products
        ↓
5. Signup or login
        ↓
6. GET /api/auth/me
        ↓
7. GET /api/cart
        ↓
8. POST /api/cart/items
        ↓
9. PUT /api/cart/items/:productId
        ↓
10. POST /api/orders
        ↓
11. GET /api/orders
        ↓
12. GET /api/orders/:id
        ↓
13. Login as admin
        ↓
14. POST /api/products
        ↓
15. PATCH /api/products/:id
```

This sequence exercises almost the entire backend.

---

# 14. Reset everything

When you want to start the exercise again from a clean database:

Stop the running server if necessary, then run:

```bash
npm run db:reset
```

Start it again:

```bash
npm run dev
```

The database will be recreated with:

- all seed products;
- demo customer;
- demo admin;
- empty carts;
- no previous orders.

---

# 15. Common problems

### `npm` command not found

Install Node.js 20+ and reopen your terminal.

### Port 4000 is already in use

Stop the other process using port 4000, or set another port in `.env`.

Example:

```env
PORT=4001
```

Then use:

```text
http://localhost:4001
```

### Login says `Invalid email or password`

Check:

- email spelling;
- password spelling;
- whether you reset the database;
- whether the server is connected to the expected database.

### Protected request returns `Authentication required`

Check that Postman has:

```text
Authorization
→ Bearer Token
→ <your JWT>
```

### Protected request returns `Invalid or expired token`

Login again and use the newest token.

### Database seems to contain old data

Run:

```bash
npm run db:reset
```

Then restart the server.

### Postman says the server cannot be reached

Make sure:

```bash
npm run dev
```

is still running and that you are using:

```text
http://localhost:4000
```

---

# Technical Reference

The sections below are here for students who want to understand how the backend is built. The hands-on steps above are the main thing to follow during the workshop.

---

## A. Project structure

```text
backend/
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── data/
│   ├── products.json
│   └── shop.db
└── src/
    ├── server.js
    ├── app.js
    ├── config.js
    ├── db/
    │   ├── schema.sql
    │   ├── index.js
    │   ├── seed.js
    │   └── reset.js
    ├── models/
    │   ├── userModel.js
    │   ├── productModel.js
    │   ├── cartModel.js
    │   └── orderModel.js
    ├── routes/
    │   ├── health.js
    │   ├── auth.js
    │   ├── products.js
    │   ├── cart.js
    │   └── orders.js
    ├── middleware/
    │   ├── requestLogger.js
    │   ├── requireAuth.js
    │   ├── requireAdmin.js
    │   ├── notFound.js
    │   └── errorHandler.js
    └── utils/
        ├── HttpError.js
        └── validate.js
```

### Request flow

```text
Postman / Frontend
        ↓
Express app
        ↓
Middleware
        ↓
Route
        ↓
Model
        ↓
SQLite
        ↓
JSON response
```

Routes handle HTTP requests.

Models handle database operations and SQL.

Middleware handles cross-cutting concerns such as authentication, authorization, logging, and errors.

---

## B. Technology stack

```text
Node.js
Express.js
SQLite
better-sqlite3
bcryptjs
jsonwebtoken
cors
dotenv
```

The project uses ES modules:

```json
"type": "module"
```

Development uses:

```text
node --watch
```

---

## C. API reference

### Health

| Method | Path | Auth | Success |
|---|---|---|---|
| GET | `/api/health` | None | `200 { "status": "ok" }` |

### Authentication

| Method | Path | Auth | Body |
|---|---|---|---|
| POST | `/api/auth/signup` | None | `{ name, email, password }` |
| POST | `/api/auth/login` | None | `{ email, password }` |
| GET | `/api/auth/me` | User | Bearer JWT |

Signup currently returns:

```json
{
  "token": "...",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@shop.test",
    "role": "customer"
  }
}
```

Login returns the same `{ token, user }` structure.

### Products

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/products` | None | List products |
| GET | `/api/products/:id` | None | Get one product |
| POST | `/api/products` | Admin | Create product |
| PATCH | `/api/products/:id` | Admin | Update product |

Optional list query parameters:

```text
search
category
```

### Cart

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/cart` | User | Get current cart |
| POST | `/api/cart/items` | User | Add quantity |
| PUT | `/api/cart/items/:productId` | User | Set exact quantity |
| DELETE | `/api/cart/items/:productId` | User | Remove item |
| DELETE | `/api/cart` | User | Clear cart |

### Orders

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/orders` | User | Checkout |
| GET | `/api/orders` | User | List current user's orders |
| GET | `/api/orders/:id` | User | Get one owned order |

---

## D. Main response shapes

### Product

```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "description": "Compact 2.4GHz mouse with silent clicks.",
  "price": 79900,
  "category": "electronics",
  "imageUrl": "https://placehold.co/400x300?text=Mouse",
  "stock": 25
}
```

### Cart

```json
{
  "items": [],
  "itemCount": 0,
  "total": 0
}
```

Cart item:

```json
{
  "productId": 1,
  "name": "Wireless Mouse",
  "price": 79900,
  "imageUrl": "https://placehold.co/400x300?text=Mouse",
  "quantity": 2,
  "lineTotal": 159800
}
```

### Order

```json
{
  "id": 1,
  "total": 159800,
  "status": "placed",
  "createdAt": "2026-09-22 00:00:00",
  "items": [
    {
      "productId": 1,
      "name": "Wireless Mouse",
      "quantity": 2,
      "unitPrice": 79900,
      "lineTotal": 159800
    }
  ]
}
```

### User

```json
{
  "id": 1,
  "name": "Demo User",
  "email": "demo@shop.test",
  "role": "customer"
}
```

Passwords are not returned by the API.

### Errors

```json
{
  "error": {
    "message": "..."
  }
}
```

---

## E. Database summary

Tables:

```text
users
products
cart_items
orders
order_items
```

Relationships:

```text
users
  │
  ├── cart_items ── products
  │
  └── orders
        │
        └── order_items ── products
```

Prices are stored as integer paise:

```text
₹1.00  = 100
₹799.00 = 79900
```

Order items keep `unit_price` so old orders continue to show the purchase-time price.

Checkout is performed in a SQLite transaction:

```text
Read cart
   ↓
Check stock
   ↓
Calculate total from DB
   ↓
Create order
   ↓
Create order items
   ↓
Reduce stock
   ↓
Clear cart
```

If checkout fails, the transaction rolls back.

---

## F. Authentication and authorization

JWT payload:

```json
{
  "sub": 1,
  "role": "customer"
}
```

Clients send:

```text
Authorization: Bearer <token>
```

`requireAuth` verifies the token and loads the user from SQLite.

`requireAdmin` checks:

```text
req.user.role === "admin"
```

This means:

```text
Authentication = identify the user
Authorization  = check what the user is allowed to do
```

---

## G. Environment configuration

Default values:

```env
PORT=4000
DB_PATH=./data/shop.db
JWT_SECRET=dev-only-secret-change-me
CLIENT_ORIGIN=http://localhost:5173
```

For local development, a `.env` file can override these values.

---

## H. Package scripts

Start normally:

```bash
npm start
```

Development with automatic reload:

```bash
npm run dev
```

Reset SQLite:

```bash
npm run db:reset
```

---

## I. Scope

This workshop backend intentionally does not include:

- payments;
- refresh tokens;
- logout;
- email verification;
- password reset;
- pagination;
- image uploads;
- product deletion;
- order cancellation;
- rate limiting;
- TypeScript;
- ORM;
- Docker;
- frontend implementation;
- deployment configuration.
