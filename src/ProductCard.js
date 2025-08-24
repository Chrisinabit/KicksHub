import { useState } from 'react';
import { addToCart } from './apiServices/shopApi.ts';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from './modal';

import './itemModal.css'

 

const ProductCard = ({product}) => {
  const queryClient = useQueryClient();
   const [isModalOpen, setIsModalOpen] = useState(false);
    

    const openCard = ()=> {
  setIsModalOpen(true)
}

const addToCartMutation = useMutation({
  mutationFn: (productId) => addToCart(productId, 1),
  onSuccess: ()=> {
    queryClient.invalidateQueries(["cart"]);
  },
  onError: (error) => {
    console.error("Error adding to cart:", error);
  }
});
 
const handleAddToCart = (e) => {
  e.stopPropagation();
  addToCartMutation.mutate(product.id);
};


  return (
    <>
    <div  onClick={openCard} >
     
                <img src={product.image} alt={product.title} className='product-img' />
                 <div className="product-info">
                <h3 className='product-name'>{product.title}</h3>
                <p className='product-price1'>${product.price}</p>
                <div className='product-rating1'>{product.rating}</div>
                  <div className='truncate-text'>{product.description}</div>
                <button className="add-to-cart"
                 onClick={handleAddToCart }
                 disabled = {addToCartMutation.isLoading}>
                  {addToCartMutation.isLoading? 'Adding...' : ' Add to Cart'}
                 </button>
                </div>
              </div>
              
  
   
  <Modal isOpen={isModalOpen} >
    <div className="product-modal-card">
  <button className='continue-shopping-btn' onClick={() => setIsModalOpen(false)}>
    Continue Shopping
  </button>
  
  <button className="close-btn" onClick={() => setIsModalOpen(false)}>
    ×
  </button>
  
  <div className="product-content">
    <img 
      src={product.image}
      alt={product.title}
      className='product-image'
    />
    
    <div className='product-info-container'>
      <span className='product-tagline'>{product.Tagline}</span>
      <h2 className='product-title'>{product.title}</h2>
      <p className='product-description'>{product.description}</p>
      <h3 className='product-price'>${product.price}</h3>
      <span className='product-category'>{product.category}</span>
      
      <div className='product-rating'>
        <span className="rating-stars">★★★★★</span>
        <span className="rating-text">({product.rating}/5)</span>
      </div>
      
      <div className="variation-section">
        <p className='variation-title'>Variation Available</p>
        <div className="size-options">
          {product.size && (
         <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {product.size.split(' ').map((size, index) => (
                        <span key={index} className="size-badge" style={{
                          padding: "4px 8px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "12px",
                        
                        }}>
                          {size}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
      
      <button className='add-to-cart-btn' 
      onClick={() => addToCartMutation.mutate(product.id)}
      disabled= {addToCartMutation.isLoading}
      >
        {addToCartMutation.isLoading? 'Adding...' : ' Add to Cart'}
       
      </button>
    </div>
  </div>
</div>
    </Modal>
    </>
  )
}


export default ProductCard;