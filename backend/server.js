const db = require('./database');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample inventory data 
const inventory = [
  { id: 1, productName: "Office Chair", category: "Furniture", price: 120, supplier: "ABC Traders" },
  { id: 2, productName: "Laptop", category: "Electronics", price: 800, supplier: "Tech World" },
  { id: 3, productName: "Desk", category: "Furniture", price: 200, supplier: "Home Store" },
  { id: 4, productName: "Pen", category: "Stationery", price: 5, supplier: "WriteWell" },
  { id: 5, productName: "Notebook", category: "Stationery", price: 10, supplier: "WriteWell" },
  { id: 6, productName: "Mobile Phone", category: "Electronics", price: 500, supplier: "Tech World" },
  { id: 7, productName: "Table Lamp", category: "Furniture", price: 40, supplier: "Home Store" },
  { id: 8, productName: "Headphones", category: "Electronics", price: 150, supplier: "Sound Hub" },
  { id: 9, productName: "Marker", category: "Stationery", price: 3, supplier: "WriteWell" },
  { id: 10, productName: "Bookshelf", category: "Furniture", price: 300, supplier: "Home Store" }
];

// GET /search API
app.get('/search', (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let results = inventory;

  // Case-insensitive search
  if (q) {
    results = results.filter(item =>
      item.productName.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Category filter
  if (category) {
    results = results.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Price validation
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({ message: "Invalid price range" });
  }

  // Min price
  if (minPrice) {
    results = results.filter(item =>
      item.price >= Number(minPrice)
    );
  }

  // Max price
  if (maxPrice) {
    results = results.filter(item =>
      item.price <= Number(maxPrice)
    );
  }

  res.json(results);
});

// Server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});





//POST /supplier API
app.post('/supplier', (req, res) => {
  const { name, city } = req.body;

  if (!name || !city) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.run(
    `INSERT INTO suppliers (name, city) VALUES (?, ?)`,
    [name, city],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ id: this.lastID, name, city });
    }
  );
});

//POST /inventory API
app.post('/inventory', (req, res) => {
  const { supplier_id, product_name, quantity, price } = req.body;

  // validations
  if (quantity < 0) {
    return res.status(400).json({ message: "Quantity must be >= 0" });
  }

  if (price <= 0) {
    return res.status(400).json({ message: "Price must be > 0" });
  }

  // check supplier exists
  db.get(
    `SELECT * FROM suppliers WHERE id = ?`,
    [supplier_id],
    (err, supplier) => {
      if (!supplier) {
        return res.status(400).json({ message: "Invalid supplier_id" });
      }

      db.run(
        `INSERT INTO inventory (supplier_id, product_name, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [supplier_id, product_name, quantity, price],
        function (err) {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            id: this.lastID,
            supplier_id,
            product_name,
            quantity,
            price
          });
        }
      );
    }
  );
});

//GET /inventory API
app.get('/inventory', (req, res) => {
  db.all(
    `SELECT * FROM inventory`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(rows);
    }
  );
});

//GROUP BY Query
app.get('/inventory/grouped', (req, res) => {
  db.all(
    `
    SELECT 
      s.id,
      s.name,
      SUM(i.quantity * i.price) AS total_value
    FROM suppliers s
    JOIN inventory i ON s.id = i.supplier_id
    GROUP BY s.id, s.name
    ORDER BY total_value DESC
    `,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(rows);
    }
  );
});