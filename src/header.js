import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaShoePrints } from 'react-icons/fa';
import { ContextFunction } from './CartContext';
import Modal from './modal'; // Assuming you have a Modal comp
import ModalcartItems from './ModalcartItems';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const{cartItems} = useContext(ContextFunction); // Mock cart items count


//const totalItems = cartItems.reduce((sum, shoe) => sum + 1, 0); 

  const navItems = [{ path: '/', label: 'Home' },
    { path: '/men', label: 'Men' },
    { path: '/women', label: 'Women' },
    { path: '/kids', label: 'Kids' },
    { path: '/sale', label: 'Sale' }];

    const OpenCart= () => {
      setIsModalOpen(true);
    }


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
              <FaShoppingCart />
               {cartItems > 0 && (
                <span className="cart-count">{cartItems}  </span>
                 
               )} 
            </li>
            <Modal isOpen={isModalOpen} 
               onClose={()=> setIsModalOpen(false)} 
                >
                  <p style={{color: 'black'}}> You have succesfully logged in </p>
                  <div className='cart-items'>
                   <p style={{color: 'black'}}> Total: ${cartItems.reduce((total, shoe) => total + (shoe.price * shoe.quantity), 0).toFixed(2)} </p>
                   <p style={{color: 'black'}}> totalItems: {cartItems.reduce((sum, shoe) => sum + shoe.quantity, 0)} </p>
                     {cartItems > 0 ? (
                      cartItems.map((shoe) => (
                        <ModalcartItems key={shoe.id} shoe={shoe} />
                      ))
                    ) : (
                      <p>No items in cart</p>
                    )}
                  </div>
                  <button  onClick={() => setIsModalOpen(false)}>Close</button>
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


/* <p style={{color: 'black'}}> Total: ${cartItems.reduce((total, shoe) => total + shoe.price, 0).toFixed(2)} </p>
     {cartItems > 0 ? (
                      cartItems.map((shoe) => (
                        <ModalcartItems key={shoe.id} shoe={shoe} />
                      ))
                    ) : (
                      <p>No items in cart</p>
                    )} */
                    
                 