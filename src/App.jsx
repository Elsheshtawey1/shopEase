import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import Sign from "./authentication/Sign";
import Cart from "./components/Cart";
import NotFound from "./page/NotFound";
import { ProductData } from "./api/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllProductsPage from "./page/AllProductsPage";
import Registration from "./authentication/Registration";
import { User } from "./redux/appSlice";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import { useDispatch } from "react-redux"; 
import ProductDetails from "./page/ProductDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={ProductData} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/AllProductsPage" element={<AllProductsPage />} loader={ProductData} />
        <Route path="*" element={<NotFound />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Route>

      <Route path="/Registration" element={<Registration />} />
      <Route path="/Sign" element={<Sign />} />
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

    //  Cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default App;
