import { useState, useEffect } from "react";
import * as styles from "./LoginBox.module.css";

export const LoginBox = ({ setAuth }) => {
  //   const { login, testLogger } = useAuthContext();
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState({ state: false, text: "" });
  const [type, setType] = useState(true);
  const [trigger, setTrigger] = useState(true);
  //   useDocTitle("Login | StormKeep");

  const validation = /^(?=.*\d)(?=.*[a-z]).{5,10}$/;
  const emailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError({
        ...error,
        state: false,
      });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [trigger]);

  const loginHandler = () => {
    if (userDetails.password.match(validation)) {
      login(userDetails);
    } else if (!userDetails.email || !userDetails.password) {
      setError({
        text: "Dont leave any field empty",
        state: true,
      });
      setTrigger(!trigger);
    } else if (!userDetails.email.match(emailValidation)) {
      setError({
        text: "Please enter correct email",
        state: true,
      });
      setTrigger(!trigger);
    } else {
      setError({
        text: "Password should be AlphaNumeric and more than 5 letters",
        state: true,
      });
      setTrigger(!trigger);
    }
  };

  return (
    <>
      <form className={styles.login_container}>
        {error.state ? <p className="for-alert">{error.text}</p> : null}
        <p className={styles.login_header}>Login</p>
        <label htmlFor="username">Email address :</label>
        <input placeholder="JohnWick@gmail.com" type="email" name="email" />
        <label htmlFor="password">Password :</label>
        <div className={styles.password_input_holder}>
          <input
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            placeholder="*****"
            type={type ? "password" : "text"}
          />
          {type ? (
            <span
              onClick={() => setType(!type)}
              className="material-icons visibility-icon"
            >
              visibility_off
            </span>
          ) : (
            <span
              onClick={() => setType(!type)}
              className="material-icons visibility-icon"
            >
              visibility
            </span>
          )}
        </div>
        <button type="button" className="btn">
          Login with Test Credentials
        </button>
        <button onClick={loginHandler} type="button" className="btn">
          Login
        </button>
        <span onClick={() => setAuth(false)} className={styles.to_signup}>
          Create New Account <i className="fas fa-chevron-right"></i>
        </span>
      </form>
    </>
  );
};
