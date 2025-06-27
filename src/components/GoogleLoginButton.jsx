import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      Swal.fire({
        title: "Login Successful",
        text: `Welcome ${user.displayName}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: "Please try again later",
      });
    }
  };

  return (
    <button type="button" className="social-btn" onClick={handleGoogleLogin}>
      <FaGoogle /> Google
    </button>
  );
}

export default GoogleLoginButton;
