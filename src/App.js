
import { useState } from 'react';
import './App.css';
import Categories from './categories';
import FeaturedProducts from './featuredproducts';
import Footer from './footer';
import Header from './header';
import product from './data';
import Hero from './hero';
import DiscountBanner from './discountBanner';
import Men from './Pages/Men';
import Women from './Pages/women';
import Kids from './Pages/kids';
import { CartProvider } from './CartContext';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const allCategories = ['all', ...new Set (product.map((item) => item.category))];
console.log(allCategories);



function App() {
  const [Products, setProduct] = useState(product);
  const [categories] = useState(allCategories);

  const categoryImages = {
    all: '/images/header1.jpg', // ✅ Manually assign image for 'all'
  };

product.forEach((item) => {
  if (!categoryImages[item.category]) {
    categoryImages[item.category] = item.image; // Pick the first image for that category
  }
});

    
    const filterItems = (category) => {
    if(category === 'all') {
      setProduct(product);
      return
  
    }

    const newItems = product.filter((item) => item.category === category);
    setProduct(newItems); 
  };

 

  return (
    <CartProvider>
    <Router>
      <div className="container">
        <Header />
        
        <Routes>
          {/* Home Page (path="/") */}
          <Route path="/" element={
            <>
              <Hero />
              <DiscountBanner />
              <div className='categories'>
                <h2>Categories</h2>
                <Categories categories={categories} filterItems={filterItems} categoryImages={categoryImages}/>
              </div>
              <div className='products'>
                <h2>Featured Products</h2>
                <FeaturedProducts product={Products} />
              </div>
            </>
          } />

          {/* Men's Page */}
          <Route path="/men" element={<Men />} />

          {/* Women's Page */}
          <Route path="/women" element={<Women />} />
          {/* Kids Page */}
          <Route path="/kids" element={<Kids />} />
        </Routes>
        

        {/* Add more routes as needed */}

        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
