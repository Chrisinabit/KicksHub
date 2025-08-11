import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./style.module.css";

const Login = () => {
  const [enterEmail, setEnterEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  //const [setError] = useState("");

  const isFormValid = enterEmail.trim() !== "" && password.trim() !== "";
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
   console.log('submitted')
   navigate('/ship')
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={onSubmit}
          navigate={useNavigate}
          isFormValid={isFormValid}
        >
          {({ handleChange }) => (
            <Form onSubmit={onSubmit}>
              <div>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={Formik.values}
                  onChange={(e) => setEnterEmail(e.target.value)}
                  className={styles.phoneInput}
                  required
                />
                <div className={styles.passwordContainer}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleChange(e);
                    }}
                    className={styles.phoneInput}
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
                    className={styles.buttonSubmit}
                    disabled={!isFormValid}
                    style={{ backgroundColor: !isFormValid ? "gray" : "red" }}
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
          )}
        </Formik>
      </div>
    </>
  );
};
export default Login;
