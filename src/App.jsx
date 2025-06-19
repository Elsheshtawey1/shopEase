import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import Sign from "./authentication/Sign";
import Cart from "./components/Cart";
import NotFound from "./page/NotFound";
import { ProductData } from "./api/api";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* route=> fixed */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={ProductData}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
      {/* route=> variable */}
      <Route path="/sign" element={<Sign />}></Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
