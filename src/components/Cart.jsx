import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import { Link } from "react-router-dom";
import { removeItem, clearCart, increaseQty, decreaseQty } from "../redux/appSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/cart.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.app.product);

  const calculateSubtotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1;
  const shipping = cartItems.length ? 20 : 0;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <FiShoppingCart className="empty-cart-icon" />
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven’t added anything yet!</p>
        <Link to="/AllProductsPage" className="go-shopping-btn">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <FaShoppingCart className="cart-icon" />
        <h1>Your Shopping Cart</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.img} alt={item.title} className="cart-item-img" />
              <div className="item-info">
                <h3>{item.title.substring(0, 20)}</h3>
                <p className="item-description">{item.description.substring(0, 150)}</p>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => dispatch(decreaseQty(item.id))}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQty(item.id))}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                className="delete-item-btn"
                onClick={(e) => {
                  const itemEl = e.currentTarget.closest(".cart-item");
                  itemEl.classList.add("fade-out");
                  setTimeout(() => {
                    dispatch(removeItem(item.id));
                    toast.info(`${item.title} removed from cart.`);
                  }, 400);
                }}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-item total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <button
              className="checkout-btn"
              onClick={() => {
                toast.success("Purchase successful 🎉");
                dispatch(clearCart());
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
          <button
            className="clear-cart-btn"
            onClick={() => {
              dispatch(clearCart());
              toast.warn("Cart cleared!");
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
