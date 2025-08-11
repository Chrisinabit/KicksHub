import { Formik, Form} from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./style.module.css";
import Login from "../loginForm";
import Summary from "../summary/summary";

const passwordRules = {
  length: /.{8,}/,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  specialChar: /[@$!%*?&#]/,
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Must be at least 8-12 characters")
    .matches(/[a-z]+/, /[A-Z]+/, "A mix of uppercase and lowercase")
    .matches(/[@$!%*?&]+/, "Contains special characters")
    .matches(/\d+/, "One number")
    .required("Required"),
});
const CreateAccount = () => {
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [showLogin, setShowLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [enterEmail, setEnterEmail] = useState('')
  //const [ setError] = useState("");

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

  const isFormValid = Password.trim() !== "" 
  && enterEmail.trim() !== ""
  && firstName.trim() && lastName.trim() !=="";

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Account created')
    navigate("/ship");
  };

  return (
    <>
      <div className= {styles.summaryGroup}>
        <div className= {styles.summaryBox}>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          navigate={useNavigate}
          isFormValid={isFormValid}
        >
          {({ handleChange }) => (
            <Form>
              <div className={styles.formGroup}>
                <br />
                <div className= {styles.group}>
                   <button className= {styles.buttonGroup} on onClick={()=> setShowLogin(true)} >Log in</button>
                   <button className= {styles.buttonGroup} on onClick={()=> setShowLogin(false)} >Create Account</button>
                </div>
                {showLogin ? (
                  <Login />
                ): (
                 <><br /><input
                      type="text"
                      name="fname"
                      placeholder="First name"
                      value={Formik.values}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={styles.phoneInput}
                      required /><input
                        type="text"
                        name="lname"
                        placeholder="Last name"
                        value={Formik.values}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.phoneInput}
                        required /><input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={Formik.values}
                        onChange={(e) => setEnterEmail(e.target.value)}
                        className={styles.phoneInput}
                        required /><div className={styles.passwordContainer}>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={Password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            handleChange(e);
                          } }
                          className={styles.phoneInput} />

                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className={styles.showPasswordToggle}
                        >

                          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}{" "}
                        </span>
                      </div><ul style={{ listStyle: "none", padding: 0, fontSize: "12px" }}>
                        {conditions.map((cond, index) => (
                          <li
                            key={index}
                            style={{
                              color: validationCondition(cond.test) ? "green" : "red",
                            }}
                          >
                            {validationCondition(cond.test) ? "✅" : "❌"}{" "}
                            {cond.label}
                          </li>
                        ))}
                      </ul><br /><div>
                        <input
                          type="checkbox"
                          id="remember me"
                          name="remember me"
                          className={styles.formCheck} />
                        <label htmlFor="Remember me" style={{ fontSize: '14px', fontWeight: 'bold', padding: '0.5rem' }}>
                          Sign up for email to hear about product launches, exclusive
                          offers and athlete news{" "}
                        </label>
                      </div><br /><div>
                        <input
                          type="checkbox"
                          id="remember me"
                          name="remember me"
                          className={styles.formCheck} />
                        <label htmlFor="Remember me" style={{ fontSize: '14px', fontWeight: 'bold', padding: '0.5rem' }}>
                          By checking the box, you are creating an account with KicksHub and you agree to the Terms & Conditions and Privacy
                          Policy.{" "}
                        </label>
                      </div><br /><div>

                        <button
                        onClick={onSubmit}
                          type="submit"
                          className={styles.buttonSubmit}
                          disabled={!isFormValid}
                          style={{ backgroundColor: !isFormValid ? "gray" : "red" }}
                        >
                          Create Account
                        </button>
                      </div>
                      </>
                )}
              </div>

       
            </Form>
            
          )}
        </Formik>
        </div>
    <div className= {styles.summaryBox1} style={{border:'0.5px solid #ddd'}}>
      <Summary />
    </div>
      </div>
     
    </>
  );
};
export default CreateAccount;
