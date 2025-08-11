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
    <div className="product-grid" onClick={openCard}>
      {product.map((shoe) => {
    
        return (
          <article key={shoe.id} className="product-card">
            <ProductCard key={shoe.id} shoe={shoe} />
          </article>
        );
      })}
    </div>
   <Footer />
   </>
  );
};

export default FeaturedProducts;
