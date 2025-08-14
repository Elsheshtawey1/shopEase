import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import "../style/Products.css";
import Container from "./Container";
import { useDispatch , useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../redux/appSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { ProductData } from "../api/api";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({ limit, title, showViewAll = true, viewAllClass = "", categoryFilter = "", priceFilter = [0, 1000] }) => {
  const SEARCH = useSelector((state) => state.search);
  const  Product = useSelector((state) => state.app.product);
  const dispatch = useDispatch();
  const FilteredProduct =proudct.fillter((product))

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
                <button
                  className="add-to-wishlist"
                  onClick={() => {
                    dispatch(
                      addToWishlist({
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
                    toast.success(
                      `${product.title.slice(0, 20)} added to wishlist!`,
                      { position: "bottom-right" }
                    );
                  }}
                >
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
