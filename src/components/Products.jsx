import React from "react";
import { useLoaderData } from "react-router-dom";

const Products = () => {
  const products = useLoaderData(); 
  console.log(products);

  if (!products || !Array.isArray(products)) {
    return <p>Loading or error fetching products...</p>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product">
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
