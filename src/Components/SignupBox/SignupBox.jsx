import { useState, useEffect } from "react";
import * as styles from "./SignupBox.module.css";

export const SignupBox = ({ setAuth }) => {
  //   useDocTitle("Signup | StormKeep");
  //   const { signup } = useAuthContext();
  const [userDetails, setUserDetails] = useState({
    user: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    terms: false,
  });
  const [error, setError] = useState({ state: false, text: "" });
  const [type, setType] = useState(true);
  const [trigger, setTrigger] = useState(true);

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

  const signupHandler = () => {
    if (
      !userDetails.email ||
      !userDetails.passwordOne ||
      !userDetails.passwordTwo ||
      !userDetails.user
    ) {
      setError({
        text: "Dont leave any field empty",
        state: true,
      });
      setTrigger(!trigger);
    } else if (
      !userDetails.passwordOne.match(validation) ||
      !userDetails.passwordTwo.match(validation) ||
      userDetails.passwordOne !== userDetails.passwordTwo
    ) {
      setError({
        text: "Password must be same and Alphanumeric and minimum 5 letters long",
        state: true,
      });
      setTrigger(!trigger);
    } else if (!userDetails.terms) {
      setError({
        text: "Accept Terms and Conditions",
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
      signup(userDetails);
    }
  };

  return (
    <>
      <form className={styles.signup_container}>
        {error.state ? <p className="for-alert">{error.text}</p> : null}
        <p className={styles.signup_header}>SignUp</p>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="firstName"
          onChange={(e) =>
            setUserDetails({ ...userDetails, user: e.target.value })
          }
          placeholder="IamBatman"
        />
        <label htmlFor="username">Email address:</label>
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
          className="block-inputs"
          placeholder="IamBatman@gmail.com"
          type="email"
          name="email"
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
        <button type="button" className="btn">
          Signup
        </button>
        <span className={styles.to_login} onClick={() => setAuth(true)}>
          Already have an Account? <i className="fas fa-chevron-right"></i>
        </span>
      </form>
    </>
  );
};
