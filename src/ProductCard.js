import { useState } from 'react';
import { useContext } from 'react';
import { ContextFunction } from './CartContext';
import Modal from './modal';
import './itemModal.css'

 

const ProductCard = ({shoe}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
    const {QuickAdd} = useContext(ContextFunction);

    

    const openCard = ()=> {
  setIsModalOpen(true)
}
  return (
    <>
    <div key={shoe.id} onClick={openCard} >
     
                <img className='product-img' src={shoe.image} alt={shoe.title} />
                 <div className="product-info">
                <h3 className='product-name'>{shoe.title}</h3>
                <p className='product-price1'>${shoe.price}</p>
                <div className='product-rating1'>{shoe.rating}</div>
                  <div className='truncate-text'>{shoe.description}</div>
                <button class="add-to-cart" onClick={() => QuickAdd(shoe) }>Add to Cart</button>
                </div>
              </div>
              
  
   
  <Modal isOpen={isModalOpen} >
    <div key={shoe.id} className="product-modal-card">
  <button className='continue-shopping-btn' onClick={() => setIsModalOpen(false)}>
    Continue Shopping
  </button>
  
  <button className="close-btn" onClick={() => setIsModalOpen(false)}>
    ×
  </button>
  
  <div className="product-content">
    <img 
      src={shoe.image} 
      alt={shoe.title}
      className='product-image'
    />
    
    <div className='product-info-container'>
      <span className='product-tagline'>{shoe.Tagline}</span>
      <h2 className='product-title'>{shoe.title}</h2>
      <p className='product-description'>{shoe.description}</p>
      <h3 className='product-price'>${shoe.price}</h3>
      <span className='product-category'>{shoe.category}</span>
      
      <div className='product-rating'>
        <span className="rating-stars">★★★★★</span>
        <span className="rating-text">({shoe.rating}/5)</span>
      </div>
      
      <div className="variation-section">
        <p className='variation-title'>Variation Available</p>
        <div className="size-options">
          {shoe.size && (
            <span className="size-badge">{shoe.size}</span>
          )}
        </div>
      </div>
      
      <button className='add-to-cart-btn' onClick={() => QuickAdd(shoe)}>
        Add to Cart
      </button>
    </div>
  </div>
</div>
    </Modal>
    </>
  )
}


export default ProductCard;