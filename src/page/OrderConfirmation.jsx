import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/OrderConfirmation.css"; // Assuming you have a CSS file for styling
import { clearCart } from "../redux/appSlice";

const steps = [
  { label: "Order Received", tooltip: "Your order was successfully received" },
  { label: "Processing", tooltip: "Your order is being prepared" },
  { label: "Shipped", tooltip: "Your order is on the way" },
  { label: "Delivered", tooltip: "Order delivered to your address" },
];

function OrderConfirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetails } = useSelector((state) => state.checkout);
  const [redirectSeconds, setRedirectSeconds] = useState(40);

  useEffect(() => {
    if (!orderDetails || !orderDetails.orderItems || orderDetails.orderItems.length === 0) {
      navigate("/checkout/shipping");
    }
  }, [orderDetails, navigate]);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRedirectSeconds((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="order-confirmation-container">
      {/* Animated checkmark */}
      <div className="checkmark-wrapper" aria-label="Order Confirmed">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
        </svg>
      </div>

      <h1>Thank You for Your Order!</h1>
      <p>Your order has been received and is now being processed.</p>

      {/* Progress bar */}
      <div className="progress-bar-container" role="list" aria-label="Order progress">
        {steps.map((step, idx) => {
          const isCompleted = idx < 2;
          const isActive = idx === 1;
          return (
            <div
              key={idx}
              className={`step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
              role="listitem"
              aria-current={isActive ? "step" : undefined}
              tabIndex={0}
              title={step.tooltip}
            >
              <span className="step-label">{step.label}</span>
            </div>
          );
        })}
      </div>

      {/* Order summary in cards */}
      <div className="order-summary-cards">
        <div className="card">
          <h2>Order Items</h2>
          {orderDetails.orderItems.map((item, i) => (
            <details key={i} className="product-details">
              <summary>
                 - { item.title} - {item.quantity} × ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
              </summary>
              <div className="product-info">
                <img src={item.img} alt={item.title} />
                <p>{item.description || "No description available."}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="card">
          <h2>Shipping Address</h2>
          <p>
            {orderDetails.shippingAddress.fullName}
            <br />
            {orderDetails.shippingAddress.address}
            <br />
            {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}
            <br />
            {orderDetails.shippingAddress.country}
          </p>
        </div>

        <div className="card">
          <h2>Payment Method</h2>
          <p>{orderDetails.paymentMethod}</p>
        </div>

        <div className="card total-card">
          <h2>Total</h2>
          <p>${orderDetails.totalPrice}</p>
        </div>
      </div>

      <button onClick={() => navigate("/")} className="back-to-shop-btn" aria-label="Back to Shop">
        Back to Shop
      </button>

      <p className="redirect-note">
        Redirecting to homepage in {redirectSeconds} second
        {redirectSeconds !== 1 ? "s" : ""}...
      </p>
    </div>
  );
}

export default OrderConfirmation;
