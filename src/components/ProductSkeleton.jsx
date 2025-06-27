import React from "react";
import "../style/ProductSkeleton.css";

const ProductSkeleton = ({ count = 6 }) => {
  return (
    <div className="products-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-image shimmer"></div>
          <div className="skeleton-text shimmer"></div>
          <div className="skeleton-text short shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
