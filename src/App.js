
import { useState, useEffect } from 'react';
import Categories from './categories';
import FeaturedProducts from './featuredproducts';
//import Footer from './footer';
import Header from './header';
import { useQuery } from '@tanstack/react-query';
//import product from './data';
import Hero from './hero';
import DiscountBanner from './discountBanner';
import Men from './Pages/Men';
import Women from './Pages/women';
import Kids from './Pages/kids';
import Sales from './Pages/sales';
import SearchResults from './Pages/SearchResult.js';
import Loader from './components/loader/index.js';
import ErrorPage from './components/ErrorPage/index.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Shipping from './Pages/shipping';
import { getProducts } from './apiServices/shopApi.ts';
import CreateAccount from './components/signupForm/index.js';

import './App.css';

function App() {


   // Fetch products from API
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [categoryImages, setCategoryImages] = useState({});



 
useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
      
      // Generate categories
      const uniqueCategories = ['all', ...new Set(products.map(item => item.category))];
      setCategories(uniqueCategories);
      
      // Generate category images
      const images = {all: '/images/header1.jpg'} ;
      products.forEach((item) => {
        if (!images[item.category]) {
          images[item.category] = item.image;
        }
      });
      setCategoryImages(images);
    }
  }, [products]);



  const filterItems = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(item => item.category === category);
      setFilteredProducts(filtered);
      
    }
  };

  if (isLoading) return <div> <Loader /></div>;
  if (error) return <div><ErrorPage /></div>;



  return (
   
    <Router>
      <div className="container">
        <Header />
        
        <Routes>
          {/* Home Page (path="/") */}
          <Route path="/" element={
            <>
              <Hero />
              <DiscountBanner />
              
                <Categories categories={categories} filterItems={filterItems} categoryImages={categoryImages}/>
            
              
                <FeaturedProducts products={filteredProducts}
                isLoading={isLoading}
                isError={error}
                />
      
            </>
          } />

          {/* Men's Page */}
          <Route path="/men" element={<Men />} />

          {/* Women's Page */}
          <Route path="/women" element={<Women />} />
          {/* Kids Page */}
          <Route path="/kids" element={<Kids />} />
          {/* Sales Page */}
          <Route path="/sale" element={<Sales />} />
           {/* Shipping Page */}
          <Route path="/ship" element={<Shipping />} />
            {/* Create Account */}
          <Route path="/create-account" element={<CreateAccount />} />
            {/* Search Results Page */}
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        
 
        {/* Add more routes as needed */}

        {/* <Footer /> */}
      </div>
      
    </Router>
   
  );
}

export default App;
