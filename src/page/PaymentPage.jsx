import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/checkoutSlice";
import { useNavigate } from "react-router-dom";
import "../style/PaymentPage.css";
const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress, paymentMethod } = useSelector((state) => state.checkout);

  const [method, setMethod] = useState(paymentMethod || "Cash on Delivery");

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/checkout/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(method));
    navigate("/checkout/review");
  };

  return (
    <div className="payment-page">
      <h2>Payment Method</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          <input type="radio" value="Cash on Delivery" checked={method === "Cash on Delivery"} onChange={(e) => setMethod(e.target.value)} />
          Cash on Delivery
        </label>

        <label>
          <input type="radio" value="Credit Card" checked={method === "Credit Card"} onChange={(e) => setMethod(e.target.value)} />
          Credit Card
        </label>

        <label>
          <input type="radio" value="PayPal" checked={method === "PayPal"} onChange={(e) => setMethod(e.target.value)} />
          PayPal
        </label>

        <button type="submit">Continue to Review</button>
      </form>
    </div>
  );
};

export default PaymentPage;
