import React, { useState } from "react";
import Products from "../components/Products";
import "../style/Products.css";
import "../style/Filters.css";
import Container from "../components/Container";

const AllProductsPage = () => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <Container>
      <div className="all-products-page">
        <div className="filters-container">
          {/* Category Filter */}
          <div className="filter-item">
            <label>Category:</label>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="filter-item">
            <label>Price from:</label>
            <input type="number" onChange={(e) => setPriceRange([+e.target.value || 0, priceRange[1]])} />
          </div>

          <div className="filter-item">
            <label>to:</label>
            <input type="number" onChange={(e) => setPriceRange([priceRange[0], +e.target.value || 1000])} />
          </div>
        </div>

        <Products showViewAll={false} viewAllClass="my-custom-header" title="All Products" categoryFilter={category} priceFilter={priceRange} />
      </div>
    </Container>
  );
};

export default AllProductsPage;
