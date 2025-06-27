import axios from "axios";


export const ProductData = async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data; 
};


export const getSingleProduct = async (id) => {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data; 
};
