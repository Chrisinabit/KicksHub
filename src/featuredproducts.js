import { useContext } from "react";
import { ContextFunction } from './CartContext';



const FeaturedProducts = ({product}) => {
  const {QuickAdd} = useContext(ContextFunction);
  return (
    <div className='product-grid' >
    
      {product.map((Products)=>{
        const {id, title, price, image, category, rating, description} = Products;
        return (
          <> 
          <article key = {id} className='product-card'>
            <img  className='product-img' src= {image} alt= {title} />
            <div className='product-info' >
              <header>
                <h4> {title} </h4>
                <h3 className='product-price' > ${price} </h3>
                <h4>  {category} </h4>
                <p className='product-rating' > {rating} </p>
                <p className='product-info'> {description} </p>
              </header>
              <button  onClick={() => QuickAdd (Products) } className='add-to-cart' >Quick Add</button>
            </div>
          </article>
          </>
        );
        
 })}
        </div>
  );
};

export default FeaturedProducts;