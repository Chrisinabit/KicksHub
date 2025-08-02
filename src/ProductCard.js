
import { useContext } from 'react';
import { ContextFunction } from './CartContext';

 

const ProductCard = ({shoe}) => {
    const {QuickAdd} = useContext(ContextFunction);
  return (
    <div key={shoe.id} className="shoe-card">
                <img src={shoe.image} alt={shoe.title} />
                <h3>{shoe.title}</h3>
                <p>${shoe.price}</p>
                <div>{shoe.rating}</div>
                <button onClick={QuickAdd} >Add to Cart</button>
              </div>
  )
}

export default ProductCard