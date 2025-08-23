import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../apiServices/shopApi.ts";
import { addressSchema } from "../validation/validationSchema";
import PaystackCheckout from "../PaystackButton/index.js";
import styles from "./style.module.css";

const ShippingAddress = () => {
  const {
    data: cartData = {
      items: [],
      totalItems: 0,
      subtotal: 0,
      total: 0,
      orderTotal: 0,
    },
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const navigate = useNavigate();

  const placeOrder = (e) => {
    //e.preventDefault();
    alert("Please fill your cart");
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading cart data</p>;

  return (
    <>
      <div className={styles.bottomContainer}>
        <p
          style={{
            fontWeight: "bold",
            paddingTop: "3rem",
            paddingLeft: "0.5rem",
          }}
        >
          {" "}
          Shipping Address
        </p>

        <Formik
          initialValues={{
            email: "",
            firstname: "",
            lastname: "",
            address: "",
            phoneNumber: "",
            terms: false,
          }}
          validationSchema={addressSchema}
          navigate={useNavigate}
          onSubmit={(values) => {
            console.log("Form submitted:", values);
          }}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => {
            // const isFormValid =
            //  Object.keys(errors).length === 0 &&
            //  Object.keys(touched).length > 0;

            return (
              <Form>
                <div className={styles.formGroup}>
                  <br />
                  <div>
                    <Field
                      type="text"
                      name="firstname"
                      placeholder="First Name*"
                      //value={values.firstname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`${styles.phoneInput} ${
                        errors.firstname && touched.firstname
                          ? styles.inputError
                          : ""
                      }`}
                      required
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className={styles.errorMessage}
                    />

                    <Field
                      type="text"
                      name="lastname"
                      placeholder="Last Name*"
                      //value={values.lastname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`${styles.phoneInput} ${
                        errors.lastname && touched.lastname
                          ? styles.inputError
                          : ""
                      }`}
                      required
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                  <Field
                    type="text"
                    name="address"
                    placeholder=" Street Address*"
                    //value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`${styles.phoneInput} ${
                      errors.address && touched.address ? styles.inputError : ""
                    }`}
                    required
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className={styles.errorMessage}
                  />

                  <p>Required for shipping related questions</p>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email*"
                      //value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`${styles.phoneInput} ${
                        errors.email && touched.email ? styles.inputError : ""
                      }`}
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.errorMessage}
                    />
                    <Field
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number*"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`${styles.phoneInput} ${
                        errors.phoneNumber && touched.phoneNumber
                          ? styles.inputError
                          : ""
                      }`}
                      required
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input type="checkbox" name="terms" required />

                      <label
                        htmlFor="remember me"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          padding: "0.5rem",
                        }}
                      >
                        Sign up for email to hear about product launches,
                        exclusive offers and athlete news
                      </label>
                    </div>
                  </div>
                  <br />
                  <p style={{ fontSize: "13px" }}>
                    By subscribing, I am agreeing to the KicksHub Privacy Policy
                    and Terms & Conditions .
                  </p>
                  <br />
                  <div className={styles.radioGroup}>
                    <h4>Shipping options</h4>
                    <div
                      className={styles.shippingOptions}
                      role="group"
                      aria-labelledby="shipping-options"
                    >
                      <label className={styles.shippingOption}>
                        <input type="radio" name="shipping" value="standard" />
                        <div className={styles.shippingContent}>
                          <div className={styles.shippingDetails}>
                            <h5>Standard</h5>
                            <p>2-5 business days once shipped</p>
                          </div>
                          {/* <div className={styles.shippingPriceFree}>FREE</div> */}
                        </div>
                      </label>

                      <label className={styles.shippingOption}>
                        <input type="radio" name="shipping" value="usps" />
                        <div className={styles.shippingContent}>
                          <div className={styles.shippingDetails}>
                            <h5>NPS</h5>
                            <p>2-7 business days once shipped</p>
                          </div>
                          {/* <div className={styles.shippingPriceFree}>FREE</div> */}
                        </div>
                      </label>

                      <label className={styles.shippingOption}>
                        <input type="radio" name="shipping" value="expedited" />
                        <div className={styles.shippingContent}>
                          <div className={styles.shippingDetails}>
                            <h5>Express</h5>
                            <p>2 business days once shipped</p>
                          </div>
                          {/* <div className={styles.shippingPriceFree}>$19.95</div> */}
                        </div>
                      </label>

                      <label className={styles.shippingOption}>
                        <input type="radio" name="shipping" value="rush" />
                        <div className={styles.shippingContent}>
                          <div className={styles.shippingDetails}>
                            <h5>Rush</h5>
                            <p>in-stock items shipped within 2 business days</p>
                          </div>
                          {/* <div className={styles.shippingPriceFree}>$25.95</div> */}
                        </div>
                      </label>
                    </div>
                  </div>
                  <br />
                  <div>
                    {cartData.items && cartData.items.length > 0 ? (
                      <>
                        <div className="cart-item">
                          <PaystackCheckout
                            email={values.email}
                            amount={cartData.orderTotal}
                            name={`${values.firstname} ${values.lastname}`}
                          />
                        </div>
                      </>
                    ) : (
                      //<div></div>
                      <button
                        type="Submit"
                        className={styles.buttonSubmit}
                        // className={`${styles.buttonSubmit} ${
                        //   isFormValid ? styles.buttonActive : styles.buttonInactive
                        // }`}
                        // disabled={!isFormValid}
                        onClick={placeOrder}
                      >
                        Continue to Payment
                      </button>
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <br />
      <hr />
      <div
        style={{
          display: "flex",
          padding: "2rem",
          justifyContent: "space-evenly",
        }}
      >
        <p>We accept:</p>
        <img
          src="./images/card1.jpeg"
          alt="mastercard"
          style={{ width: "2rem", height: "2rem" }}
        />
        <img
          src="./images/card7.png"
          alt="mastercard"
          style={{ width: "2rem", height: "2rem" }}
        />
        <img
          src="./images/card2.png"
          alt="mastercard"
          style={{ width: "2rem", height: "2rem" }}
        />
        <img
          src="./images/card3.png"
          alt="mastercard"
          style={{ width: "2rem", height: "2rem" }}
        />
        <img
          src="./images/card4.png"
          alt="mastercard"
          style={{ width: "2rem", height: "2rem" }}
        />
        <img
          src="./images/card5.jpeg"
          alt="mastercard"
          style={{ width: "2rem", height: "2rem" }}
        />
        <img
          src="./images/card6.jpeg"
          alt="mastercard"
          style={{ width: "2rem", height: "2rem" }}
        />
      </div>

      <></>
    </>
  );
};

export default ShippingAddress;

// className= {`${styles.buttonSubmit & isSubmitting || Object.keys(errors).length > 0 ?  styles.invalidSubmit :styles.buttonSubmit}`}
