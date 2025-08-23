import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginSchema } from "../validation/validationSchema";
import styles from "./style.module.css";

const Login = () => {
 
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);


  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log('submitted')
   navigate('/ship')
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
          navigate={useNavigate}
         
        >
          {({ handleChange, errors, touched, handleBlur }) => {
            const isFormValid =
             Object.keys(errors).length === 0 &&
             Object.keys(touched).length > 0;

            return (
            <Form onSubmit={handleSubmit}>
              <div>
                <br />
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
                    value={password}
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
                            touched.email && !errors.email
                              ? styles.inputValid
                              : ""
                    }`}
                    required
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
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}{" "}
                  </span>
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
                      id="check"
                      name="check"
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
                      Remember me
                    </label>
                  </div>
                  <button
                    style={{
                      fontSize: "12px",
                      textDecoration: "underline",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      color: "blue",
                    }}
                  >
                    Forgot password
                  </button>
                </div>
                <br />
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`${styles.buttonSubmit} ${
                      isFormValid ? styles.buttonActive : styles.buttonInactive}`}
                    disabled={!isFormValid}
                     
                  >
                    Login
                  </button>
                </div>
                <br />
                <p style={{ fontSize: "13px" }}>
                  By logging into my account, I agree to KicksHub’s Terms &
                  Conditions and Privacy Policy.
                </p>
              </div>
            </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
export default Login;
