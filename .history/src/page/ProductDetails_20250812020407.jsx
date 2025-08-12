import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../api/api";
import NotFound from "./NotFound";
import Container from "../components/Container";
import ProductSkeleton from "../components/ProductSkeleton";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/appSlice";
import { toast } from "react-toastify";
import "../style/ProductDetails.css";
import { useParams } from "react-router-dom";
import Suggested from "../components/Suggested";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    retry: false,
  });

  if (isLoading)
    return (
      <div className="loading-message">
        <ProductSkeleton count={1} />
      </div>
    );
  if (isError || !product) return <NotFound />;

  const handleAddToCart = () => {
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
    toast.success("✅ Added to cart!", { position: "bottom-right" });
  };

  return (
    <>
      <Container>
        <div className="product-detail-wrapper">
          {/* Left Side */}
          <div className="product-detail-left">
            <img src={product.image} alt={product.title} className="main-image" />
            {/* Thumbnails */}
            <div className="thumbnails">
              <img src={product.image} alt="thumbnail1" />
              <img src={product.image} alt="thumbnail2" />
            </div>
          </div>

          {/* Right Side */}
          <div className="product-detail-right">
            <div className="heed-content">
              <h1 className="product-title">{product.title}</h1>
              <button className="favorite-btn">
                <FaHeart />
              </button>
            </div>

            <p className="product-description">{product.description}</p>
            <p className="product-category">{product.category}</p>

            <div className="product-price-rating">
              <p className="product-price">${product.price}</p>
              <div className="product-rating">
                <FaStar className="star-icon" />
                <span>{product.rating?.rate ?? "N/A"}</span>
              </div>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>

        <div className="product-detail-footer">
          <Suggested />
        </div>
      </Container>
    </>
  );
}

export default ProductDetails;
