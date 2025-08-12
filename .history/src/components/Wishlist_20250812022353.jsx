import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/appSlice";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../style/Wishlist.css";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.app.wishlist); // لازم تقرأ من wishlist

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist-container">
        <FiHeart className="empty-wishlist-icon" />
        <h1>Your Wishlist is Empty</h1>
        <p>Looks like you haven’t added anything yet!</p>
        <Link to="/AllProductsPage" className="go-shopping-btn">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item">
          <img src={item.img} alt={item.title} />
          <div className="wishlist-info">
            <h2>{item.title}</h2>
            <p className="wishlist-desc">{item.description}</p>
            <p className="wishlist-price">${item.price}</p>
            <p className="wishlist-category">{item.category}</p>
            <p className="wishlist-rating">Rating: {item.rating?.rate ?? "N/A"}</p>
            <button className="remove-btn" onClick={() => dispatch(removeFromWishlist(item.id))}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;