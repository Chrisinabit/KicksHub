import React from 'react'
import CreateAccount from '../components/signupForm';
//import Login from '../components/loginForm';
import ShippingAddress from '../components/shippingAddress';
//import Summary from '../components/summary/summary';
//import styles from '../components/signupForm/style.module.css'

const Shipping = () => {
  return (
    <div >
      {/* <br/> */}
      <CreateAccount />
         <ShippingAddress />
         <br />
    </div>
  )
}

export default Shipping