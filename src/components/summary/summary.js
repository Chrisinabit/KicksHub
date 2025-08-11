import React, { useContext} from 'react';
import { ContextFunction } from '../../CartContext';
import styles from './style.module.css'

const Summary = () => {
     const{cartItems} = useContext(ContextFunction); // Mock cart items count
     const totalItems = cartItems.reduce((sum, shoe) => sum + shoe.quantity, 0); 
     const subTotal =  cartItems.reduce((total, shoe) => total + (shoe.price * shoe.quantity), 0).toFixed(2)
     const savings =  ((1.05/100 )* subTotal).toFixed(2);
     const total = (subTotal - savings).toFixed(2);
     const orderTotal = (subTotal - savings).toFixed(2);


  return (
    <div>
        <div style={{backgroundColor:'#A9A9A9',padding:'10px', fontWeight:'bold'}} ><h4>Shipping({totalItems})</h4></div>
        
        <div>
            {cartItems.length > 0 ? (
                <>
                      {cartItems.map((shoe) => (
                        <div key={shoe.id}  shoe = {shoe} className='cart-item' >
                         
                          <img  src= {shoe.image} alt= {shoe.title}
                          className='cart-item-image' 
                          style = {{width: '100px', height: "80px", objectFit:'cover' }}
                          />
                           <div>
                          <p style={{color: 'black'}} > 
                            Price: ${shoe.price}
                            </p>
                          <p style={{color: 'black'}} > 
                            Quantity: {shoe.quantity}
                            </p>
                          <p style={{color: 'black'}} > 
                            Subtotal: ${(shoe.price * shoe.quantity).toFixed(2)}
                            </p>
                            </div>
                          </div>
                          ))}
                             {/* Summary Section */}
                             <div style={{backgroundColor:'#A9A9A9',padding:'10px', fontWeight:'bold'}}> <h4>Order Summary</h4></div> 
                       <div className={styles.shippingContent} > 
                        <div><p>Original Price : </p></div>
                        <div>${subTotal}</div>
                        </div>
                        <div className={styles.shippingContent}>
                        <div><p>Your Savings</p></div>
                        <div>$ {savings} </div>
                        </div>
                        <div className={styles.shippingContent}>
                          <div> <p> Subtotal:</p></div>
                          <div>${total}</div>
                        </div>
                    
                     <div  className={styles.shippingContent}>
                          <div><h4 style={{color: 'black', fontWeight:'bold', fontSize:'16px'}}>Order Total:</h4></div>
                          <div> ${orderTotal}</div>
                     </div>
                   
                    
                           </>
                             ) : (
                                <p></p>
           )}
        </div>
    </div>
   
  );
};

export default Summary;

// .shippingContent {
//   flex: 1;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }