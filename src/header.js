import React, { useContext} from 'react';
import { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaShoePrints } from 'react-icons/fa';
import { ContextFunction } from './CartContext';
import Modal from './modal'; 
import { FaTrash } from 'react-icons/fa';
import './modalLayout.css';


const Header = () => {

   const {QuickAdd} = useContext(ContextFunction);
   const {QuickRemove} = useContext(ContextFunction);
   const {Remove} = useContext(ContextFunction);
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const{cartItems} = useContext(ContextFunction); // Mock cart items count
  

const totalItems = cartItems.reduce((sum, shoe) => sum + shoe.quantity, 0); 
const subTotal =  cartItems.reduce((total, shoe) => total + (shoe.price * shoe.quantity), 0).toFixed(2)


  const navItems = [{ path: '/', label: 'Home' },
    { path: '/men', label: 'Men' },
    { path: '/women', label: 'Women' },
    { path: '/kids', label: 'Kids' },
    { path: '/sale', label: 'Sale' }];

    const OpenCart= () => {
      setIsModalOpen(true);
    }
     const navigate = useNavigate();

  return (
    <>

        <nav className="navbar">
        <ul className="container">
        {/* Logo (left) */}
        <ul className="logo">
          <FaShoePrints size={24} />
          <span>KicksHub</span>
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
          className="hamburger" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu Items (center) - Hidden on mobile */}
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <li 
              key={index}>
              <Link to = {item.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
            </li>
          ))}
        </ul>

        {/* Icons (right) */}
        <ul className="icons">
          <li href="#search" aria-label="Search">
            <FaSearch />
          </li>
          <ul className="cart-icon">
            <li href="#cart" aria-label="Cart" onClick={OpenCart} >
                <FaShoppingCart style={{cursor:'pointer'}} />
               {cartItems > 0 && (
                <span className="cart-count" >{cartItems}  </span>
               )}
               {totalItems > 0 && (
                <span className="cart-count" style={{cursor:'pointer'}}>{totalItems}  </span>
               )}
               
            </li>
            <Modal isOpen={isModalOpen} 
               onClose={()=> setIsModalOpen(false)} 
                >
                  <div className='cart-items'>
                    <button 
                    onClick={()=> setIsModalOpen(false)}
                    className='continue-shopping-btn'
                    >Continue Shoping</button>
                    <h4 style={{marginTop: '2rem', color:'#A9A9A9', fontWeight:'bold'}}>CART ({totalItems}) </h4>
                    
                    {cartItems.length > 0 ? (
                      <>
                      {cartItems.map((shoe) => (
                        <div key={shoe.id}  shoe = {shoe} className='cart-item' >
                         
                          <img  src= {shoe.image} alt= {shoe.title}
                          className='cart-item-image' 
                          style = {{width: '100px', height: "80px", objectFit:'cover' }}
                          />
                          <div style={{display: 'flex',position: 'absolute', 
                            justifyContent:'flex-end',
                            marginTop:'9rem' }} > 
                            <FaTrash 
                            style={{color:'red', fontSize:'15px'}} /> 
                            <span onClick={()=> Remove(shoe)} style={{fontSize:'12px', color:'red', cursor:'pointer'}} >Remove</span>
                            </div>
                            
                          {/* Product details */}
                          <div className='cart-item-details' >
                            
                            <h5>{shoe.title}</h5>
                          <p className='' > {shoe.description} </p>
                          
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
                               {/* <ModalcartItems key = {shoe.id} shoe={shoe} />  */}
                              {shoe.quantity > 1 ?
                              <button onClick={()=> QuickRemove (shoe)}
                              style={{backgroundColor:'#000000', 
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              width: '3rem'}} >-</button>:<button className='disabled:' style={{
                              backgroundColor:'#A9A9A9',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              width: '3rem'
                              }} >-</button>}
                              <h4> {shoe.quantity} </h4>
                              <button onClick={()=> QuickAdd (shoe)}
                              style={{backgroundColor:'black', 
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              width: '3rem'}}
                              >+</button>
                          </div>
                       
                      ))}
                   
                     
                      {/* Total Section */}
                       <div className='cart-total' >
                        <hr />
                   <p style={{color: 'black', fontWeight:'bold', fontSize:'18px'}}> Subtotal: ${subTotal} </p>
                   <p style={{color: 'black', fontWeight:'bold'}}> Total items: {totalItems} </p>
                   </div>
                   </>
                    ) : (
                      <p>No items in cart</p>
                    )}
                    
                  </div>
                  <button  
                  onClick={() => navigate('/ship') & setIsModalOpen(false)}
                  className='add-to-cart-btn'
                    >
                      Checkout (${subTotal}) </button>
                       
             </Modal>
          </ul>
          <li href="#profile" aria-label="User profile">
            <FaUser />
          </li>
        </ul>
      </ul>
    </nav>
    </>
  );
};
  


export default Header;



                 