// library imports
import { useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
// Lazy-loaded components
const Contact = lazy(() => import("./page/Contact"));
const AllProductsPage = lazy(() => import("./page/AllProductsPage"));
const ProductDetails = lazy(() => import("./page/ProductDetails"));
const Proceed = lazy(() => import("./page/Proceed"));
const Faq = lazy(() => import("./components/Faq"));
const Cart = lazy(() => import("./components/Cart"));

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
        <Route path="/Proceed" element={<Proceed />} />
        <Route path="/Faq" element={<Faq />} />
      </Route>

      <Route path="/Registration" element={<Registration />} />
      <Route path="/Sign" element={<Sign />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);


const App = () => {
  const dispatch = useDispatch();

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
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default App;
