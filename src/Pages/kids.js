import product from '../data';
import { useContext } from 'react';
import { ContextFunction } from '../CartContext';
import ProductCard from '../ProductCard';

function Kids() {
  const {QuickAdd} = useContext(ContextFunction);
    const kidsShoes = product.filter((shoe) => shoe.gender === 'Kids');
  return (
      <div className="men-page">
        <h1>Kiddies Collection</h1>
        <div className="shoes-grid">
          {kidsShoes.map(shoe => (
               <ProductCard
                key={shoe.id}
                shoe={shoe}
                QuickAdd={QuickAdd} />
          ))}
        </div>
      </div>
  )
}

export default Kids;