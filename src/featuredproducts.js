import Footer from './footer';
import ProductCard from "./ProductCard";
import { useState } from "react";

const FeaturedProducts = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCard = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
    <section className='featured' >
      <div className='featured-container'>
        <h2 className='section-title'>Featured Products</h2>
    <div className="product-grid" onClick={openCard}>
      {product.map((shoe) => {
    
        return (
          <article key={shoe.id} className="product-card">
            <ProductCard key={shoe.id} shoe={shoe} />
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
