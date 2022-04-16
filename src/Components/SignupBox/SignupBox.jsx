import { AlertToast } from "Components/Toasts";
import { useAuthContext } from "Context";
import { useState, useEffect } from "react";
import * as styles from "./SignupBox.module.css";

export const SignupBox = ({ setAuth }) => {
  //   useDocTitle("Signup | StormKeep");
  const { signup } = useAuthContext();
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    passwordOne: "",
    passwordTwo: "",
    terms: false,
  });
  const [type, setType] = useState(true);

  const passwordValidation = /^(?=.*\d)(?=.*[a-z]).{5,10}$/;

  const signupHandler = () => {
    if (
      !userDetails.name ||
      !userDetails.passwordOne ||
      !userDetails.passwordTwo ||
      !userDetails.username
    ) {
      AlertToast("Dont leave any field empty");
    } else if (
      !userDetails.passwordOne.match(passwordValidation) ||
      !userDetails.passwordTwo.match(passwordValidation) ||
      userDetails.passwordOne !== userDetails.passwordTwo
    ) {
      AlertToast(
        "Password must be same and Alphanumeric and minimum 5 letters long"
      );
    } else {
      signup(userDetails);
    }
  };

  return (
    <form className={styles.signup_container}>
      <p className={styles.signup_header}>SignUp</p>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="firstName"
        onChange={(e) =>
          setUserDetails({ ...userDetails, name: e.target.value })
        }
        placeholder="Luffy"
      />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="firstName"
        onChange={(e) =>
          setUserDetails({ ...userDetails, username: e.target.value })
        }
        placeholder="Mugiwara"
      />
      <label htmlFor="password">Password:</label>
      <div className={styles.password_input_holder}>
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, passwordOne: e.target.value })
          }
          placeholder="ex.Name123"
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
      <label htmlFor="password">Confirm Password:</label>
      <div className={styles.password_input_holder}>
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, passwordTwo: e.target.value })
          }
          placeholder="ex.Name123"
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
      <button onClick={signupHandler} type="button" className="btn">
        Signup
      </button>
      <span className={styles.to_login} onClick={() => setAuth(true)}>
        Already have an Account? <i className="fas fa-chevron-right"></i>
      </span>
    </form>
  );
};
