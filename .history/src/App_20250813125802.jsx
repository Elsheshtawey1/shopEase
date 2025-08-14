// library imports
import { useEffect, lazy, Suspense, useRef } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { debounce } from "lodash";
// Redux
import { User } from "./redux/appSlice";
//  API
import { ProductData } from "./api/api";
// Components
import Layout from "./layout/Layout";
import Sign from "./authentication/Sign";
import Registration from "./authentication/Registration";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import Loader from "./components/Loader";
import ErrorBoundary from "./layout/Error Boundary";
import Suggested from "./components/Suggested";
import ProtectRouts from "./Utils/ProtectRouts";
import ShippingPage from "./page/ShippingPage";
import PaymentPage from "./page/PaymentPage";
import ReviewPage from "./page/ReviewPage";
import OrderConfirmation from "./page/OrderConfirmation";
import Wishlist from "./components/Wishlist";
// Lazy-loaded components
const Contact = lazy(() => import("./page/Contact"));
const AllProductsPage = lazy(() => import("./page/AllProductsPage"));
const ProductDetails = lazy(() => import("./page/ProductDetails"));
const Faq = lazy(() => import("./components/Faq"));
const Cart = lazy(() => import("./components/Cart"));
const About = lazy(() => import("./components/AboutUs"));
const CompanyInfo = lazy(() => import("./components/CompanyInfo"));
const Careers = lazy(() => import("./components/Careers"));
const Press = lazy(() => import("./components/Press"));
const Blog = lazy(() => import("./components/Blog"));
const ShippingInfo = lazy(() => import("./components/ShippingInfo"));
const Returns = lazy(() => import("./components/Returns"));
const ProfilePage = lazy(() => import("./page/ProfilePage"));

// ✅ Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={ProductData} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AllProductsPage" element={<AllProductsPage />} loader={ProductData} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/Faq" element={<Faq />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/CompanyInfo" element={<CompanyInfo />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/Press" element={<Press />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/ShippingInfo" element={<ShippingInfo />} />
        <Route path="/Returns" element={<Returns />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>
      <Route element={<ProtectRouts />}>
        <Route path="/checkout/shipping" element={<ShippingPage />} />
        <Route path="/checkout/payment" element={<PaymentPage />} />
        <Route path="/checkout/review" element={<ReviewPage />} />
        <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
      </Route>
      <Route path="/Registration" element={<Registration />} />
      <Route path="/Sign" element={<Sign />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/Suggested" element={<Suggested />} />
    </Route>
  )
);
const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.product);
  const saveCartToLocalStorage = useRef(
    debounce((cart) => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, 1000),
    []
  );

  useEffect(() => {
    saveCartToLocalStorage.current(cart); 
  }, [cart]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          User({
            __id: user.uid,
            userName: user.displayName,
            email: user.email,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </ErrorBoundary>
    </>
  );
};

export default App;
