import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
//import { useState } from "react";

import styles from "./style.module.css";


const validationSchema = Yup.object().shape({
      email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    
 
});


const ShippingAddress = () => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    alert('Payment Complete & Order Placed')
    navigate("/");
  };

  return (
    <>
    <div className= {styles.bottomContainer} >
      <h4 style={{fontWeight:'bold', paddingTop:'3rem'}}> Shipping address</h4>
      
      <Formik
        initialValues={{
          email: "",
          firstname: "",
          lastname: "",
          address: "",
          phoneNumber: "",
        }}
         validationSchema={ validationSchema}
        onSubmit={onSubmit}
        navigate={useNavigate}
      >
        {({ errors, touched, handleChange}) => (
          <Form>
            <div className={styles.formGroup}>
              <br />
              <div className={styles.group}>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name*"
                  value={Formik.values}
                  onChange={handleChange}
                  className= {`${styles.phoneInput} ${errors.firstname && touched.firstname ? styles.inputError : ''}`}
                  required
                />
                 <ErrorMessage name="fname" component="div" className="error-message" />

                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name*"
                  value={Formik.values}
                  onChange={handleChange}
                  className={`${styles.phoneInput} ${errors.lastname && touched.lastname ? styles.inputError : ''}`}
                  required
                />
                 <ErrorMessage name="lname" component="div" className="error-message" />
              </div>
              <input
                type="text"
                name="address"
                placeholder=" Street Address*"
                value={Formik.values}
                onChange={handleChange}
                className={`${styles.phoneInput}${errors.address && touched.address ? styles.inputError : ''}`}
                required
              />
              <ErrorMessage name="address" component="div" className="error-message" />

              <p>Required for shipping related questions</p>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={Formik.values}
                  onChange={handleChange}
                  className={`${styles.phoneInput}${errors.email && touched.email ? styles.inputError : ''}`}
                  required
                />
                 <ErrorMessage name="email" component="div" className="error-message" />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number*"
                  value={Formik.values}
                  onChange={handleChange}
                  className={`${styles.phoneInput}${errors.phoneNumber && touched.phoneNumber ? styles.inputError : ''}`}
                  required
                />
                <ErrorMessage name="phoneNumber" component="div" className="error-message" />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    id="remember me"
                    name="remember me"
                    className={styles.formCheck}
                  />
                  <label
                    htmlFor="remember me"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "0.5rem",
                    }}
                  >
                    Sign up for email to hear about product launches, exclusive
                    offers and athlete news
                  </label>
                </div>
              </div>
              <br />
              <p style={{ fontSize: "13px" }}>
                By subscribing, I am agreeing to the KicksHub Privacy Policy
                and Terms & Conditions .
              </p>
              <br />
              <div className= {styles.radioGroup}>
        <h4>Shipping options</h4>
        <div className= {styles.shippingOptions} role="group" aria-labelledby="shipping-options">
            
            <label className= {styles.shippingOption}>
                <input type="radio" name="shipping" value="standard" />
                <div className= {styles.shippingContent}>
                    <div className= {styles.shippingDetails}>
                        <h5>Standard</h5>
                        <p>2-5 business days once shipped</p>
                    </div>
                    <div className= {styles.shippingPriceFree}>FREE</div>
                </div>
            </label>

            <label className= {styles.shippingOption}>
                <input type="radio" name="shipping" value="usps" />
                <div className= {styles.shippingContent}>
                    <div className= {styles.shippingDetails}>
                        <h5>NPS</h5>
                        <p>2-7 business days once shipped</p>
                    </div>
                    <div className= {styles.shippingPriceFree}>FREE</div>
                </div>
            </label>

            <label className= {styles.shippingOption}>
                <input type="radio" name="shipping" value="expedited" />
                <div className= {styles.shippingContent}>
                    <div className= {styles.shippingDetails}>
                        <h5>Express</h5>
                        <p>2 business days once shipped</p>
                    </div>
                    <div className= {styles.shippingPriceFree}>$19.95</div>
                </div>
            </label>

            <label className= {styles.shippingOption}>
                <input type="radio" name="shipping" value="rush" />
                <div className= {styles.shippingContent}>
                    <div className= {styles.shippingDetails}>
                        <h5>Rush</h5>
                        <p>in-stock items shipped within 2 business days</p>
                    </div>
                    <div className= {styles.shippingPriceFree}>$25.95</div>
                </div>
            </label>

        </div>
        </div>
        <br />
              <button className= {styles.buttonSubmit} onClick={onSubmit} >Continue to Payment</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    <br />
    <hr />
    <div style={{display:'flex', padding:'2rem', justifyContent:'space-around'}}><p>We accept:</p>
    <img src="./images/card1.jpeg" alt="mastercard" style={{width:'2rem', height:'2rem'}} />
    <img src="./images/card2.png" alt="mastercard" style={{width:'2rem', height:'2rem'}}/>
    <img src="./images/card3.png" alt="mastercard" style={{width:'2rem', height:'2rem'}}/>
    <img src="./images/card4.png" alt="mastercard" style={{width:'2rem', height:'2rem'}}/>
    <img src="./images/card5.jpeg" alt="mastercard" style={{width:'2rem', height:'2rem'}}/>
    <img src="./images/card6.jpeg" alt="mastercard" style={{width:'2rem', height:'2rem'}}/>
    </div>
    
    <></>
    </>
  );
};

export default ShippingAddress;
