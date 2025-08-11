import product from '../data';
import { useContext } from 'react';
import { ContextFunction } from '../CartContext';
import ProductCard from '../ProductCard'; 
import Footer from '../footer';


const Men = () => {
  const {QuickAdd} = useContext(ContextFunction);
  const mensShoes = product.filter((shoe) => shoe.gender === 'Men');
 

 return (
  <>
        <div className="men-page">
          <h1>Men's Collection</h1>
          <div className="shoes-grid">
            {mensShoes.map(shoe => (
              <ProductCard
                key={shoe.id}
                shoe={shoe}
                QuickAdd={QuickAdd} />
            ))}
          </div>
        </div>
        <Footer />
        <br />
        </>
      );
      
    }

export default Men;