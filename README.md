# Zeerostock Assignment

## 🚀 Project Overview

This project is a full-stack implementation of an inventory management and search system for Zeerostock.

It includes:

- Inventory Search API with filters
- React-based frontend UI
- Database design with Suppliers & Inventory
- Backend APIs with validation and grouping logic

---
📁 Project Structure
zeerostock-assignment/
│
├── backend/
│   ├── server.js
│   ├── database.js
│   └── inventory.db
│
├── frontend/
│   ├── src/
│   └── public/
│
└── README.md

## 🛠 Tech Stack

### Frontend
- React.js
- HTML, CSS, JavaScript

### Backend
- Node.js
- Express.js

### Database
- SQLite

---

## ✨ Features

### 🔍 Inventory Search (Assignment A)
- Search products by name (case-insensitive)
- Filter by category
- Filter by price range (min & max)
- Combine multiple filters
- Displays results in table format
- "No results found" handling
- Invalid price range validation

---

### 🗄 Database & APIs (Assignment B)

#### Tables:
- Suppliers (id, name, city)
- Inventory (id, supplier_id, product_name, quantity, price)

#### APIs:
- POST /supplier → Add supplier
- POST /inventory → Add inventory item
- GET /inventory → Fetch all inventory
- GET /inventory/grouped → Supplier-wise total inventory value

---

## 🧠 Search Logic 

The search API works by:

1. Fetching all inventory items
2. Applying filters step-by-step:
   - Product name (partial match using `toLowerCase()` for case-insensitive search)
   - Category match
   - Minimum price filter
   - Maximum price filter
3. Returning filtered results

If no filters are provided, all items are returned.

---

## ⚡ Performance Improvement (For Large Data)

For large datasets, the following improvements can be made:

- Use database indexing on:
  - product_name
  - category
  - price
- Implement pagination (limit & offset)
- Use full-text search (like Elasticsearch)
- Debounce search input in frontend

---

## 🧱 Database Schema 

### Suppliers Table
- Stores supplier details
- One supplier can have multiple inventory items

### Inventory Table
- Stores product details
- Linked to suppliers using `supplier_id`

### Relationship
- One-to-Many (One supplier → Many inventory items)

---

## 🤔 Why SQL (SQLite)?

- Structured data with clear relationships
- Easy to implement joins (needed for grouped query)
- Simple and beginner-friendly
- No external setup required

2️⃣ Backend Setup
    cd backend
    npm install
    node server.js
Runs on:
    http://localhost:5000    

3️⃣ Frontend Setup
    cd frontend
    npm install
    npm start
Runs on:
    http://localhost:3000   

##  Author
    Name: Hashma Sulthana Shaik  
