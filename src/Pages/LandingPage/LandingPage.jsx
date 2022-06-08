import { LoginBox, SignupBox } from "Components";
import { useDocTitle } from "Hook/useTitle";
import { useState } from "react";
import styles from "./LandingPage.module.css";

export const LandingPage = () => {
  const [auth, setAuth] = useState(true);
  useDocTitle('Login | StormMedia')

  return (
    <div className={styles.landing_container}>
      <div>
        <img className={styles.rsp_img} src="/hero1.jpg" alt="Hero Img" />
      </div>
      <div className={styles.landing_holder}>
        <i className={`fas fa-bolt ${styles.logo}`}></i>
        <h1>Happening Now</h1>
        <h2>Join StormMedia Today.</h2>
        <div className={styles.auth_container}>
          {auth ? (
            <LoginBox setAuth={setAuth} />
          ) : (
            <SignupBox setAuth={setAuth} />
          )}
        </div>
      </div>
    </div>
  );
};
