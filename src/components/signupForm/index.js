import { Formik, Form, Field, ErrorMessage } from "formik";
//import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./style.module.css";
import Login from "../loginForm";
import Summary from "../summary/summary";
import { createAccountSchema } from "../validation/validationSchema";

const passwordRules = {
  length: /.{8,}/,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  specialChar: /[@$!%*?&#]/,
};

const CreateAccount = () => {
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  

  const validationCondition = (regex) => regex.test(Password);

  const conditions = [
    { label: "Minimum 8 characters", test: passwordRules.length },
    { label: "At least one uppercase letter", test: passwordRules.uppercase },
    { label: "At least one lowercase letter", test: passwordRules.lowercase },
    { label: "At least one number", test: passwordRules.number },
    {
      label: "At least one special character (@$!%*?&#)",
      test: passwordRules.specialChar,
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account created");
    navigate("/ship");
  };

  return (
    <>
      <div className={styles.summaryGroup}>
        <div className={styles.summaryBox}>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              password: "",
              email: "",
              terms: false,
            }}
            validationSchema={createAccountSchema}
            onSubmit={handleSubmit}
            navigate={useNavigate}
          >
            {/* Helper function to determine input classes */}

            {({ handleChange, errors, touched, handleBlur }) => {
              // const getInputClasses = (fieldname) => {
              //   const baseClass = styles.phoneInput;
              //   if (errors[fieldname] && touched[fieldname]) {
              //     return `${baseClass} ${styles.inputError}`;
              //   } else if (touched[fieldname] && !errors[fieldname]) {
              //     return `${baseClass} ${styles.inputValid}`;
              //   }
              //   return baseClass;
              // };
              const isFormValid =
                Object.keys(errors).length === 0 &&
                Object.keys(touched).length > 0;

              return (
                <Form>
                  <div className={styles.formGroup}>
                    <br />
                    <div className={styles.group}>
                      <button
                        className={styles.buttonGroup}
                        on
                        onClick={() => setShowLogin(true)}
                      >
                        Log in
                      </button>
                      <button
                        className={styles.buttonGroup}
                        on
                        onClick={() => setShowLogin(false)}
                      >
                        Create Account
                      </button>
                    </div>
                    {showLogin ? (
                      <Login />
                    ) : (
                      <>
                        <br />
                        <Field
                          type="text"
                          name="firstname"
                          placeholder="First name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={`${styles.phoneInput} ${
                            errors.firstname && touched.firstname
                              ? styles.inputError
                              : ""
                          } 
                          ${
                            touched.firstname && !errors.firstname
                              ? styles.inputValid
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
                          placeholder="Last name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={`${styles.phoneInput} ${
                            errors.lastname && touched.lastname
                              ? styles.inputError
                              : ""
                          } 
                          ${
                            touched.lastname && !errors.lastname
                              ? styles.inputValid
                              : ""
                          }`}
                          required
                        />
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          className={styles.errorMessage}
                        />

                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={`${styles.phoneInput} ${
                            errors.email && touched.email
                              ? styles.inputError
                              : ""
                          } 
                          ${
                            touched.email && !errors.email
                              ? styles.inputValid
                              : ""
                          }`}
                          required
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className={styles.errorMessage}
                        />

                        <div className={styles.passwordContainer}>
                          <Field
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            //value={Password}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              handleChange(e);
                            }}
                            className={`${styles.phoneInput} ${
                              errors.password && touched.password
                                ? styles.inputError
                                : ""
                            } 
                          ${
                            touched.password && !errors.password
                              ? styles.inputValid
                              : ""
                          }`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className={styles.errorMessage}
                          />

                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.showPasswordToggle}
                          >
                            {showPassword ? (
                              <AiFillEye />
                            ) : (
                              <AiFillEyeInvisible />
                            )}{" "}
                          </span>
                        </div>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            fontSize: "12px",
                          }}
                        >
                          {conditions.map((cond, index) => (
                            <li
                              key={index}
                              style={{
                                color: validationCondition(cond.test)
                                  ? "green"
                                  : "red",
                              }}
                            >
                              {validationCondition(cond.test) ? "✅" : "❌"}{" "}
                              {cond.label}
                            </li>
                          ))}
                        </ul>
                        <br />

                        <div>
                          <input
                            type="checkbox"
                            id="remember me"
                            name="remember me"
                            className={styles.formCheck}
                            required
                          />
                          <label
                            htmlFor="Remember me"
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0.5rem",
                            }}
                          >
                            Sign up for email to hear about product launches,
                            exclusive offers and athlete news{" "}
                          </label>
                        </div>
                        <br />
                        <div>
                          <Field
                            type="checkbox"
                            id="terms"
                            name="terms"
                            className={`${styles.formCheck} ${
                              errors.terms && touched.terms
                                ? styles.inputError
                                : ""
                            }`}
                            required
                          />
                          <ErrorMessage
                            name="terms"
                            component="div"
                            className={styles.errorMessage}
                          />

                          <label
                            htmlFor="Remember me"
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              padding: "0.5rem",
                            }}
                          >
                            By checking the box, you are creating an account
                            with KicksHub and you agree to the Terms &
                            Conditions and Privacy Policy.{" "}
                          </label>
                        </div>
                        <br />
                        <div>
                          <button
                            onClick={handleSubmit}
                            type="submit"
                            className={`${styles.buttonSubmit} ${
                              isFormValid
                                ? styles.buttonActive
                                : styles.buttonInactive
                            }`}
                            disabled={!isFormValid}
                          >
                            Create Account
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div
          className={styles.summaryBox1}
          style={{ border: "0.5px solid #ddd" }}
        >
          <Summary />
        </div>
      </div>
    </>
  );
};
export default CreateAccount;
