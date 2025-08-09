import React from "react";
import { Link } from "react-router-dom";
import "../style/NotFound.css";


function NotFound() {
  return (
    <>
      <div className="notfound-container">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-message">Oops! Page Not Found</p>
        <Link to="/" className="notfound-link">
          Go to Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
