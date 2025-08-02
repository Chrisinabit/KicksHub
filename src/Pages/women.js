import product from '../data';
import { useContext } from 'react';
import { ContextFunction } from '../CartContext';
import ProductCard from '../ProductCard';



const Women = () => {
  const {QuickAdd} = useContext(ContextFunction);
  const womensShoes = product.filter((shoe) => shoe.gender === 'Women');
 

 return (
        <div className="men-page">
          <h1>Women's Collection</h1>
          <div className="shoes-grid">
            {womensShoes.map(shoe => (
                <ProductCard
                    key={shoe.id}
                    shoe={shoe}
                    QuickAdd={QuickAdd} />
            ))}
          </div>
        </div>
      );
      
    }

export default Women;