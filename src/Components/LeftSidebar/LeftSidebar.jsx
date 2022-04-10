import * as styles from "./LeftSidebar.module.css";
import { NavLink, useLocation } from "react-router-dom";

export const LeftSidebar = () => {
  const location = useLocation();

  return (
    <aside className={styles.left_sidebar}>
        <p className={styles.brand_name}>
          <i className="fas fa-bolt"></i> StormPlay
        </p>
        <ul className={styles.list}>
          <li className={`${location.pathname === "/home" && styles.bold}`}>
            <span className="material-icons">home</span>
            Home
          </li>
          <li className={`${location.pathname === "/explore" && styles.bold}`}>
            <span className="material-icons">tag</span>
            Explore
          </li>
          <li className={`${location.pathname === "/bookmark" && styles.bold}`}>
            <span className="material-icons">bookmark</span>Bookmarks
          </li>
          <li className={`${location.pathname === "/profile" && styles.bold}`}>
            <span className="material-icons">person</span>Profile
          </li>
          <button className={styles.cta_btn}>Say Something</button>
        </ul>
        <div className={styles.small_profile}>
          <img
            src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
            alt="profile_image"
            className={styles.avatar}
          />
          <div className={styles.user}>
            <h1>username</h1>
            <h3>@usertag</h3>
          </div>
        </div>
    </aside>
  );
};
