import React, { useState } from "react";
import "../style/Sign.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useDispatch } from "react-redux";
import { User } from "../redux/appSlice";
import Swal from "sweetalert2";

const Sign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const auth = getAuth();

    try {
// save user session in local storage
      await setPersistence(auth, browserLocalPersistence);
      // login user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // dispatch user data to the Redux store
      dispatch(
        User({
          __id: user.uid,
          userName: user.displayName,
          email: user.email,
        })
      );

      await Swal.fire({
        title: "Welcome back!",
        text: `Hello ${user.displayName || "User"}, you have successfully signed in.`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });

      navigate("/");
    } catch (error) {
      await Swal.fire({
        title: "Sign In Error",
        text: "Please check your email and password.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1>Sign in to your account</h1>

        {/* Email Field */}
        <div className="input-group">
          <label>
            <FaEnvelope />
          </label>
          <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {/* Password Field */}
        <div className="input-group password-group">
          <label>
            <FaLock />
          </label>
          <input type={showPassword ? "text" : "password"} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          {showPassword ? <FaEyeSlash className="toggle-password" onClick={togglePassword} /> : <FaEye className="toggle-password" onClick={togglePassword} />}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        {/* Registration Link */}
        <p className="register-link">
          Don&apos;t have an account? <Link to="/Registration">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Sign;
