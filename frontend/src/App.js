import React, { useState } from "react";
import "./App.css";

function App() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");

    let url = "http://localhost:5000/search?";

    if (q) url += `q=${q}&`;
    if (category) url += `category=${category}&`;
    if (minPrice) url += `minPrice=${minPrice}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}&`;

    try {
      const res = await fetch(url);
      
      if (!res.ok) {
        const err = await res.json();
        setError(err.message);
        setResults([]);
        return;
      }

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory Search</h2>

      <input
        placeholder="Search product"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Furniture">Furniture</option>
        <option value="Electronics">Electronics</option>
        <option value="Stationery">Stationery</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;