import React from "react";
import Products from "../components/Products";
import '../style/Products.css'

const AllProductsPage = () => {
  return <Products showViewAll={false} viewAllClass="my-custom-header" title="All Products" />;
};


export default AllProductsPage;
