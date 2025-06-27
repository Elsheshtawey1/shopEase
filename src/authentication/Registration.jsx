import React, { useState } from "react";
import "../style/Registration.css";
import { FaEye, FaEyeSlash, FaEnvelope, FaFacebookF, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import GoogleLoginButton from "../components/GoogleLoginButton"
function Registration() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = (target) => {
    if (target === "password") {
      setShowPassword(!showPassword);
    } else if (target === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    terms: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.name,
      });

      await Swal.fire({
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 1500,
      });

      resetForm();
      navigate("/Sign");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please check your credentials and try again.",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors, touched }) => (
          <Form className="register-form">
            <h1>Create your account</h1>
            <p>
              Already have an account? <Link to="/Sign">Sign in</Link>
            </p>

            <div className="social-buttons">
              <GoogleLoginButton />
              <button type="button" className="social-btn">
                <FaFacebookF /> Facebook
              </button>
            </div>

            <div className="divider">
              <span>Or register with email</span>
            </div>

            {/* Name */}
            <div className={`input-group ${errors.name && touched.name ? "has-error" : ""}`}>
              <label>
                <FaUser />
              </label>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            {/* Email */}
            <div className={`input-group ${errors.email && touched.email ? "has-error" : ""}`}>
              <label>
                <FaEnvelope />
              </label>
              <Field type="email" name="email" placeholder="Email address" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            {/* Password */}
            <div className={`input-group password-group ${errors.password && touched.password ? "has-error" : ""}`}>
              <label>
                <FaLock />
              </label>
              <Field type={showPassword ? "text" : "password"} name="password" placeholder="Password" />
              {showPassword ? <FaEyeSlash className="toggle-password" onClick={() => togglePassword("password")} /> : <FaEye className="toggle-password" onClick={() => togglePassword("password")} />}
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            {/* Confirm Password */}
            <div className={`input-group password-group ${errors.confirmPassword && touched.confirmPassword ? "has-error" : ""}`}>
              <label>
                <FaLock />
              </label>
              <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" />
              {showConfirmPassword ? (
                <FaEyeSlash className="toggle-password" onClick={() => togglePassword("confirmPassword")} />
              ) : (
                <FaEye className="toggle-password" onClick={() => togglePassword("confirmPassword")} />
              )}
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            {/* Terms */}
            <div className="checkbox-group">
              <Field type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
              <ErrorMessage name="terms" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
