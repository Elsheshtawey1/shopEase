import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/checkoutSlice";
import { useNavigate } from "react-router-dom";
import "../style/ShippingPage.css";
const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.checkout);

  const [formData, setFormData] = useState(shippingAddress);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigate("/checkout/payment");
  };

  return (
    <div className="shipping-page">
      <h2>Shipping Address</h2>
      <form onSubmit={handleSubmit} className="shipping-form">
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <button type="submit">Continue to Payment</button>
      </form>
    </div>
  );
};

export default ShippingPage;
