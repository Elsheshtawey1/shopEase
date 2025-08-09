import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { addToCart } from "../redux/appSlice";
import { toast } from "react-toastify";
import Container from "./Container";
import "../style/Suggested.css";
import { ProductData } from "../api/api";
import ProductSkeleton from "./ProductSkeleton";

function Suggested() {
  const dispatch = useDispatch();
  const { id: currentProductId } = useParams(); 

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: ProductData,
    staleTime: 1000 * 60 * 5, 
  });

  if (isLoading) {
    return (
      <Container>
        <div className="suggested-product">
          <h2><ProductSkeleton count={8} /></h2>
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <div className="suggested-product">
          <h2>Failed to load products. Please try again later.</h2>
        </div>
      </Container>
    );
  }
  const filteredProducts = products.filter((product) => String(product.id) !== String(currentProductId));
  const shuffledProducts = [...filteredProducts].sort(() => Math.random() - 0.5);
  const suggestedProducts = shuffledProducts.slice(0, 8);

  return (
    <Container>
      <div className="suggested-product">
        <div className="header">
          <h1>Explore Related Products</h1>
        </div>

        <div className="products-grid">
          {suggestedProducts.map((product) => (
            <div key={product.id} className="product-card" role="article" aria-label={product.title}>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                </div>
              </Link>

              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description.length > 80 ? product.description.slice(0, 80) + "..." : product.description}</p>

                <div className="product-footer">
                  <div className="product-rating" aria-label={`Rating: ${product.rating?.rate ?? "N/A"} out of 5`}>
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
                    toast.success(`${product.title.slice(0, 20)} added to cart!`, { position: "bottom-right" });
                  }}
                  className="add-to-cart-button"
                  aria-label={`Add ${product.title} to cart`}
                >
                  <FaShoppingCart aria-hidden="true" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Suggested;
