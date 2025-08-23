import { getCart } from '../../apiServices/shopApi.ts';
import { useQuery } from '@tanstack/react-query';
import styles from './style.module.css'

const Summary = () => {

    const { data: cartData = { items: [], totalItems: 0, subtotal: 0, 
      total: 0, savings: 0, afterSavings:0, shipping: 0, orderTotal:0}, isError, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
    
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading cart data</p>;

  return (
    <div>
        <div style={{backgroundColor:'#A9A9A9',padding:'10px', fontWeight:'bold'}} ><h4>Shipping({cartData.totalItems})</h4></div>
        
        <div>
            {cartData.items && cartData.items.length> 0 ? (
                <>
                      {cartData.items.map((item, index) => (
                        < div key={`cart-item-${item.productId}-${index}`} 
                        style={{display: "flex",  margin: "1rem"}}>
                         
                          <img  src= {`http://localhost:5000${item.product.image}`} alt= {item.product.title}
                          className='cart-item-image' 
                          style = {{width: '100px', height: "80px", objectFit:'cover' }}
                          />
                           <div style={{paddingLeft: '1rem'}}>
                            <h4 style={{color: 'black'}} > 
                            {item.product.title}
                            </h4>
                          <p style={{color: 'black', }} > 
                            Price: ${item.product.price}
                            </p>
                          <p style={{color: 'black'}} > 
                            Quantity: {item.quantity}
                            </p>
                          <p style={{color: 'black'}} > 
                            Subtotal: ${item.subtotal.toFixed(2)}
                            </p>
                            </div>
                          </div>
                          ))}
                             {/* Summary Section */}
                             <div style={{backgroundColor:'#A9A9A9',padding:'10px', fontWeight:'bold'}}> <h4>Order Summary</h4></div> 
                       <div className={styles.shippingContent} > 
                        <div><p>Original Price : </p></div>
                        <div>${cartData.subtotal}</div>
                        </div>
                        <div className={styles.shippingContent}>
                        <div><p>Your Savings:</p></div>
                        <div>$ {cartData.savings} </div>
                        </div>
                        <div className={styles.shippingContent}>
                          <div> <p> Subtotal:</p></div>
                          <div>${cartData.afterSavings}</div>
                        </div>
                        <div className={styles.shippingContent}>
                          <div> <p> Shipping Fee:</p></div>
                          <div>${cartData.shipping}</div>
                        </div>
                    
                     <div  className={styles.shippingContent}>
                          <div><h4 style={{color: 'black', fontWeight:'bold', fontSize:'16px'}}>Order Total:</h4></div>
                          <div> ${cartData.orderTotal}</div>
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

