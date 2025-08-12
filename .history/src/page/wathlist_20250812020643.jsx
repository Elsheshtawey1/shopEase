
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import "../style/Products.css";
import Container from "./Container";
import { useDispatch } from "react-redux";
import { addToCart , addToWithList } from "../redux/appSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { ProductData } from "../api/api";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({ limit, title, showViewAll = true, viewAllClass = "", categoryFilter = "", priceFilter = [0, 1000] }) => {
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: ProductData,
  });
  

  if (isLoading)
    return (
      <div className="loading-message">
        <ProductSkeleton count={8} />
      </div>
    );
  if (isError) return <div className="loading-message">Error: {error.message}</div>;

  let displayedProducts = Array.isArray(products) ? (limit ? products.slice(0, limit) : products) : [];

  displayedProducts = displayedProducts.filter((product) => {
    const matchCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchPrice = product.price >= priceFilter[0] && product.price <= priceFilter[1];
    return matchCategory && matchPrice;
  });

  return (
    <Container>
      <div className="products-container">
        <div className="products-header">
          <h1 className={`products-title ${viewAllClass}`}>{title}</h1>
          {showViewAll && (
            <Link to="/AllProductsPage" className="view-all-link">
              View All
            </Link>
          )}
        </div>

        <div className="products-grid">
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-card" role="article" aria-label={product.title}>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                </div>
              </Link>

              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                  <div className="product-rating">
                    <FaStar className="star" />
                    <span>{product.rating?.rate ?? "N/A"}</span>
                  </div>
                  <span className="product-price">${product.price}</span>
                </div>

                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        img: product.image,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        rating: product.rating,
                        description: product.description,
                        category: product.category,
                      })
                    );
                    toast.dismiss();
                    toast.success(`${product.title.slice(0, 20)} added to cart!`, {
                      position: "bottom-right",
                    });
                  }}
                  className="add-to-cart-button"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="add-to-wishlist" onClick={() => {
                  dispatch(
                    addToWithList({
                      id: product.id,
                      img: product.image,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      rating: product.rating,
                      description: product.description,
                      category: product.category,
                    })
                  )
                }}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Products;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../style/NavBar.css";
import Container from "./Container";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const product = useSelector((state) => state.app.product);
const wishlist = useSelector((state) => state.app.wishlist);



  return (
    <>
      <div className="offer-bar">
        <div className="offer-text">
          <p className="animated-offer">🎉 Special Offer: Get 20% off on your first purchase!</p>
        </div>
        <div className="social-icons-nav">
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elsheshtawey/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      <nav className="navbar">
        <Container>
          <div className="navbar-container">
            {/* Left: Logo */}
            <div className="logo">MyLogo</div>

            {/* Nav Links (includes search bar) */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              {/* Search Bar */}
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  aria-label="Search products"
                />
                <button className="search-button">
                  <FiSearch />
                </button>
              </div>

              {/* Navigation Links */}
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                Home
              </NavLink>
              <NavLink to="/AllProductsPage" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                Products
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                Contact
              </NavLink>
            </div>

            {/* Right Icons */}
            <div className="right-icons">
              {/* Profile Icon */}
              <NavLink to="/ProfilePage" className="icon profile-icon" title="Profile" aria-label="Profile">
                <FiUser />
              </NavLink>
              {/* Wishlist Icon */}
              <NavLink to="/wishlist" className="icon wishlist-icon" title="Wishlist" aria-label="Wishlist">
                <FiHeart />
                <span className="cart-count">{wishlist.length}</span>
              </NavLink>

              {/* Cart Icon */}
              <NavLink to="/cart" className="icon" title="Cart" aria-label="Cart">
                <FiShoppingCart />
                <span className="cart-count">{product.length}</span>
              </NavLink>

              {/* Mobile Menu Toggle */}
              <div className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? <FiX /> : <FiMenu />}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import "../style/Products.css";
import Container from "./Container";
import { useDispatch } from "react-redux";
import { addToCart , addToWithList } from "../redux/appSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { ProductData } from "../api/api";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({ limit, title, showViewAll = true, viewAllClass = "", categoryFilter = "", priceFilter = [0, 1000] }) => {
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: ProductData,
  });
  

  if (isLoading)
    return (
      <div className="loading-message">
        <ProductSkeleton count={8} />
      </div>
    );
  if (isError) return <div className="loading-message">Error: {error.message}</div>;

  let displayedProducts = Array.isArray(products) ? (limit ? products.slice(0, limit) : products) : [];

  displayedProducts = displayedProducts.filter((product) => {
    const matchCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchPrice = product.price >= priceFilter[0] && product.price <= priceFilter[1];
    return matchCategory && matchPrice;
  });

  return (
    <Container>
      <div className="products-container">
        <div className="products-header">
          <h1 className={`products-title ${viewAllClass}`}>{title}</h1>
          {showViewAll && (
            <Link to="/AllProductsPage" className="view-all-link">
              View All
            </Link>
          )}
        </div>

        <div className="products-grid">
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-card" role="article" aria-label={product.title}>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                </div>
              </Link>

              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                  <div className="product-rating">
                    <FaStar className="star" />
                    <span>{product.rating?.rate ?? "N/A"}</span>
                  </div>
                  <span className="product-price">${product.price}</span>
                </div>

                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        img: product.image,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        rating: product.rating,
                        description: product.description,
                        category: product.category,
                      })
                    );
                    toast.dismiss();
                    toast.success(`${product.title.slice(0, 20)} added to cart!`, {
                      position: "bottom-right",
                    });
                  }}
                  className="add-to-cart-button"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="add-to-wishlist" onClick={() => {
                  dispatch(
                    addToWithList({
                      id: product.id,
                      img: product.image,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      rating: product.rating,
                      description: product.description,
                      category: product.category,
                    })
                  )
                }}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Products;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWithList } from "../redux/appSlice";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../style/Wishlist.css";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.app.wishlist); // لازم تقرأ من wishlist

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist-container">
        <FiHeart className="empty-wishlist-icon" />
        <h1>Your Wishlist is Empty</h1>
        <p>Looks like you haven’t added anything yet!</p>
        <Link to="/AllProductsPage" className="go-shopping-btn">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item">
          <img src={item.img} alt={item.title} />
          <div className="wishlist-info">
            <h2>{item.title}</h2>
            <p className="wishlist-desc">{item.description}</p>
            <p className="wishlist-price">${item.price}</p>
            <p className="wishlist-category">{item.category}</p>
            <p className="wishlist-rating">Rating: {item.rating?.rate ?? "N/A"}</p>
            <button className="remove-btn" onClick={() => dispatch(removeFromWithList(item.id))}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
import React, { useState } from "react";
import Products from "../components/Products";
import "../style/Products.css";
import "../style/Filters.css";
import Container from "../components/Container";

const AllProductsPage = () => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
  <Container>
      
  <div className="all-products-page">
    

    <div className="filters-container">
      {/* Category Filter */}
      <div className="filter-item">
        <label>Category:</label>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="filter-item">
        <label>Price from:</label>
        <input
          type="number"
          onChange={(e) =>
            setPriceRange([+e.target.value || 0, priceRange[1]])
          }
        />
      </div>

      <div className="filter-item">
        <label>to:</label>
        <input
          type="number"
          onChange={(e) =>
            setPriceRange([priceRange[0], +e.target.value || 1000])
          }
        />
      </div>
    </div>

    <Products
      showViewAll={false}
      viewAllClass="my-custom-header"
      title="All Products"
      categoryFilter={category}
      priceFilter={priceRange}
    />
  </div>
  </Container>
);
}

export default AllProductsPage;
import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../api/api";
import NotFound from "./NotFound";
import Container from "../components/Container";
import ProductSkeleton from "../components/ProductSkeleton";
import { useDispatch } from "react-redux";
import { addToCart, addToWithList } from "../redux/appSlice";
import { toast } from "react-toastify";
import "../style/ProductDetails.css";
import { useParams } from "react-router-dom";
import Suggested from "../components/Suggested";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    retry: false,
  });

  if (isLoading)
    return (
      <div className="loading-message">
        <ProductSkeleton count={1} />
      </div>
    );
  if (isError || !product) return <NotFound />;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        img: product.image,
        title: product.title,
        price: product.price,
        quantity: 1,
        rating: product.rating,
        description: product.description,
        category: product.category,
      })
    );
    toast.success("✅ Added to cart!", { position: "bottom-right" });
  };
  const handleAddToWishlist = () => {
    dispatch(addToWithList({
      id: product.id,
      img: product.image,
      title: product.title,
      price: product.price,
      quantity: 1,
      rating: product.rating,
      description: product.description,
      category: product.category,
    }));
    toast.dismiss();
    toast.info("❤️ Added to wishlist!", { position: "bottom-right" });
  };

  return (
    <>
      <Container>
        <div className="product-detail-wrapper">
          {/* Left Side */}
          <div className="product-detail-left">
            <img src={product.image} alt={product.title} className="main-image" />
            {/* Thumbnails */}
            <div className="thumbnails">
              <img src={product.image} alt="thumbnail1" />
              <img src={product.image} alt="thumbnail2" />
            </div>
          </div>

          {/* Right Side */}
          <div className="product-detail-right">
            <div className="heed-content">
              <h1 className="product-title">{product.title}</h1>
              <button onClick={handleAddToWishlist} className="favorite-btn">
                <FaHeart />
              </button>
            </div>

            <p className="product-description">{product.description}</p>
            <p className="product-category">{product.category}</p>

            <div className="product-price-rating">
              <p className="product-price">${product.price}</p>
              <div className="product-rating">
                <FaStar className="star-icon" />
                <span>{product.rating?.rate ?? "N/A"}</span>
              </div>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>

        <div className="product-detail-footer">
          <Suggested />
        </div>
      </Container>
    </>
  );
}

export default ProductDetails;
