import Footer from './footer';
import ProductCard from "./ProductCard";
//import { useState } from "react";
// import { getProducts } from './apiServices/shopApi.ts';
// import { useQuery } from '@tanstack/react-query';
 import Loader from './components/loader/index.js';
 import ErrorPage from './components/ErrorPage/index.js';

const FeaturedProducts = ({products, isLoading, isError}) => {
 
  if (!products.length) {
    return <p>No products available</p>;
  }
    

  // const openCard = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

   if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  return (
    <>
    <section className='featured' >
      <div className='featured-container'>
        <h2 className='section-title'>Featured Products</h2>
    <div className="product-grid" >
      {products.map((product) => {
    
        return (
          <article key={product.id} className="product-card">
            <ProductCard product={product} />
          </article>
        );
      })}
    </div>
    </div>
    </section>
   <Footer />
   </>
  );
};

export default FeaturedProducts;
