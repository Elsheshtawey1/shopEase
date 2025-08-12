


import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import "../style/Products.css";
import Container from "./Container";
import { useDispatch } from "react-redux";
import { addToCart , addToWithList } from "../redux/appSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { ProductData } from "../api/api";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({ limit, title, showViewAll = true, viewAllClass = "", categoryFilter = "", priceFilter = [0, 1000] }) => {
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: ProductData,
  });
  

  if (isLoading)
    return (
      <div className="loading-message">
        <ProductSkeleton count={8} />
      </div>
    );
  if (isError) return <div className="loading-message">Error: {error.message}</div>;

  let displayedProducts = Array.isArray(products) ? (limit ? products.slice(0, limit) : products) : [];

  displayedProducts = displayedProducts.filter((product) => {
    const matchCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchPrice = product.price >= priceFilter[0] && product.price <= priceFilter[1];
    return matchCategory && matchPrice;
  });

  return (
    <Container>
      <div className="products-container">
        <div className="products-header">
          <h1 className={`products-title ${viewAllClass}`}>{title}</h1>
          {showViewAll && (
            <Link to="/AllProductsPage" className="view-all-link">
              View All
            </Link>
          )}
        </div>

        <div className="products-grid">
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-card" role="article" aria-label={product.title}>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                </div>
              </Link>

              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                  <div className="product-rating">
                    <FaStar className="star" />
                    <span>{product.rating?.rate ?? "N/A"}</span>
                  </div>
                  <span className="product-price">${product.price}</span>
                </div>

                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        img: product.image,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        rating: product.rating,
                        description: product.description,
                        category: product.category,
                      })
                    );
                    toast.dismiss();
                    toast.success(`${product.title.slice(0, 20)} added to cart!`, {
                      position: "bottom-right",
                    });
                  }}
                  className="add-to-cart-button"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="add-to-wishlist" onClick={() => {
                  dispatch(
                    addToWithList({
                      id: product.id,
                      img: product.image,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      rating: product.rating,
                      description: product.description,
                      category: product.category,
                    })
                  )
                }}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Products;

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
        <input
          type="number"
          onChange={(e) =>
            setPriceRange([+e.target.value || 0, priceRange[1]])
          }
        />
      </div>

      <div className="filter-item">
        <label>to:</label>
        <input
          type="number"
          onChange={(e) =>
            setPriceRange([priceRange[0], +e.target.value || 1000])
          }
        />
      </div>
    </div>

    <Products
      showViewAll={false}
      viewAllClass="my-custom-header"
      title="All Products"
      categoryFilter={category}
      priceFilter={priceRange}
    />
  </div>
  </Container>
);
}

export default AllProductsPage;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: JSON.parse(localStorage.getItem("cart")) || [],
  user: null,
};

export const appSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload.id);
      console.log("Adding to cart:", action.payload);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.product.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.product));
    },
    removeItem: (state, action) => {
      state.product = state.product.filter((item) => item.id !== action.payload);
       localStorage.setItem("cart", JSON.stringify(state.product));
    },

    clearCart: (state) => {
      state.product = [];
       localStorage.setItem("cart", JSON.stringify([]));
    },

    increaseQty: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.product));
      }
    },

    decreaseQty: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(state.product));
      }
    },

    setCart: (state, action) => {
      state.product = action.payload;
    },

    User: (state, action) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { addToCart, removeItem, clearCart, increaseQty, decreaseQty, setCart, User, logoutUser } = appSlice.actions;

export default appSlice.reducer;
