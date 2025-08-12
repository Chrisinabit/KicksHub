import product from '../data';
import { useContext } from 'react';
import { ContextFunction } from '../CartContext';
import ProductCard from '../ProductCard';
import Footer from '../footer';



const Women = () => {
  const {QuickAdd} = useContext(ContextFunction);
  const womensShoes = product.filter((shoe) => shoe.gender === 'Women');
 

 return (
  <>
        <div className="men-page">
          <h1 className='section-title'>Women's Collection</h1>
          <div className="product-grid">
            {womensShoes.map(shoe => (
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

export default Women;