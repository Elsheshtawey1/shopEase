import React from "react";
import { Link } from "react-router-dom";
import "../style/NotFound.css";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>الصفحة غير موجودة | متجر الملابس</title>
        <meta name="description" content="عذرًا، الصفحة التي تبحث عنها غير موجودة." />
      </Helmet>

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
