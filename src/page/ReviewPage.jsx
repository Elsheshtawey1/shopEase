import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveOrderDetails } from "../redux/checkoutSlice";
import "../style/ReviewPage.css";

const ReviewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress, paymentMethod } = useSelector((state) => state.checkout);
  const cartItems = useSelector((state) => state.app.product);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/checkout/shipping");
    } else if (!paymentMethod) {
      navigate("/checkout/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = cartItems.length ? 20 : 0;
  const taxPrice = itemsPrice * 0.1;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    const orderData = {
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    dispatch(saveOrderDetails(orderData));
    navigate("/OrderConfirmation");
  };

  return (
    <div className="review-page">
      <h2>Review Your Order</h2>

      <div className="review-section">
        <h3>Shipping Address</h3>
        <p>
          {shippingAddress.fullName}, {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.country} - {shippingAddress.postalCode}
        </p>
      </div>

      <div className="review-section">
        <h3>Payment Method</h3>
        <p>{paymentMethod}</p>
      </div>

      <div className="review-section">
        <h3>Order Items</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="review-item">
            <img src={item.img} alt={item.title} />
            <p>{item.title.slice(0, 28)}</p>
            <p>
              {item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="review-summary">
        <p>Items: ${itemsPrice.toFixed(2)}</p>
        <p>Shipping: ${shippingPrice.toFixed(2)}</p>
        <p>Tax: ${taxPrice.toFixed(2)}</p>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>

      <button onClick={placeOrderHandler} className="place-order-btn">
        Place Order
      </button>
    </div>
  );
};

export default ReviewPage;
