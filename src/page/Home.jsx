import React from 'react'
import Banner from '../components/Banner'
import Products from '../components/Products'
import Category from '../components/Category'
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>الرئيسية | متجر الملابس والإكسسوارات</title>
        <meta name="description" content="استمتع بأحدث صيحات الموضة من الملابس والإكسسوارات بتوصيل سريع وجودة عالية." />
        <meta name="keywords" content="ملابس, إكسسوارات, تسوق, موضة, فاشون" />
      </Helmet>
      <Banner />
      <Category />
      <Products limit={12} title="Best Sellers " />
    </>
  );
}

export default Home