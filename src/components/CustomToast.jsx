import React from "react";
import { toast } from "react-toastify";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "../style/CustomToast.css"; 
export const CustomToast = ({ type, message }) => {
  return (
    <div className={`custom-toast ${type}`}>
      {type === "success" && <FaCheckCircle className="toast-icon success" />}
      {type === "error" && <FaExclamationCircle className="toast-icon error" />}
      <span>{message}</span>
    </div>
  );
};


export const showSuccessToast = (message) => {
  toast(<CustomToast type="success" message={message} />, {
    position: "bottom-right",
    autoClose: 3000,
  });
};

export const showErrorToast = (message) => {
  toast(<CustomToast type="error" message={message} />, {
    position: "bottom-right",
    autoClose: 3000,
  });
};
