import React from 'react'
import Banner from '../components/Banner'
import Products from '../components/Products'
import Category from '../components/Category'


const Home = () => {
  return (
    <>

      <Banner />
      <Category />
      <Products limit={12} title="Best Sellers " />
    </>
  );
}

export default Home