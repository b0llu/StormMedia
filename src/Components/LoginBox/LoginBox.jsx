import { AlertToast } from "Components/Toasts";
import { useAuthContext } from "Context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as styles from "./LoginBox.module.css";

export const LoginBox = ({ setAuth }) => {
  const { login, testLogger } = useAuthContext();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [type, setType] = useState(true);
  //   useDocTitle("Login | StormKeep");

  const passowrdValidation = /^(?=.*\d)(?=.*[a-z]).{5,15}$/;

  const loginHandler = () => {
    if (userDetails.password.match(passowrdValidation)) {
      login(userDetails);
    } else if (!userDetails.username || !userDetails.password) {
      AlertToast("Dont leave any field empty");
    } else {
      AlertToast("Password should be AlphaNumeric and more than 5 letters");
    }
  };

  return (
    <form className={styles.login_container}>
      <p className={styles.login_header}>Login</p>
      <label htmlFor="username">UserName :</label>
      <input
        onChange={(e) =>
          setUserDetails({ ...userDetails, username: e.target.value })
        }
        placeholder="Luffy"
        type="email"
        name="email"
      />
      <label htmlFor="password">Password :</label>
      <div className={styles.password_input_holder}>
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
          placeholder="ex. Name123"
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
      <button onClick={testLogger} type="button" className="btn">
        Login with Test Credentials
      </button>
      <button onClick={loginHandler} type="button" className="btn">
        Login
      </button>
      <span onClick={() => setAuth(false)} className={styles.to_signup}>
        Create New Account <i className="fas fa-chevron-right"></i>
      </span>
    </form>
  );
};
