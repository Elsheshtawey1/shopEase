import React, { useState } from "react";
import "../style/Category.css";
import Container from "./Container";
import { useQuery } from "@tanstack/react-query";
import { ProductData } from "../api/api";
import ProductSkeleton from "./ProductSkeleton";

function Category() {
  const {
    data: rawProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: ProductData,
  });

  const [hovered, setHovered] = useState(null);

  if (isLoading)
    return (
      <div className="loading-message">
        <ProductSkeleton count={8} />
      </div>
    );

  if (isError) return <p className="error-message">Error: {error.message}</p>;

  const products = Array.isArray(rawProducts) ? rawProducts : [];

  return (
    <Container>
      <div className="category">
        <h1 className="category-title">Top Products</h1>
        <div className="carousel-track">
          {[...products, ...products].map((product, idx) => {
            const className = hovered === idx ? "carousel-item active" : hovered === null ? "carousel-item" : "carousel-item faded";

            return (
              <div key={idx} className={className} onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)}>
                <img src={product.image} alt={product.title} />
                <h2>{product.title.slice(0, 20)}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Category;
