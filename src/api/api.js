import axios from "axios";

export const ProductData = async () => {
  const Product = await axios.get("https://fakestoreapi.com/products");
  return Product.data;
}