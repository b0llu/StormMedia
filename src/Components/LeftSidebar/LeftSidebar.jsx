import styles from "./LeftSidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const LeftSidebar = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <aside className={styles.left_sidebar}>
      <p className={styles.brand_name}>
        <i className="fas fa-bolt"></i> StormPlay
      </p>
      <ul className={styles.list}>
        <Link to={`/home`}>
          <li className={`${location.pathname === "/home" && styles.bold}`}>
            <span className="material-icons">home</span>
            Home
          </li>
        </Link>
        <Link to={`/explore`}>
          <li className={`${location.pathname === "/explore" && styles.bold}`}>
            <span className="material-icons">tag</span>
            Explore
          </li>
        </Link>
        <Link to={`/bookmark`}>
          <li className={`${location.pathname === "/bookmark" && styles.bold}`}>
            <span className="material-icons">bookmark</span>Bookmarks
          </li>
        </Link>
        <Link to={`/${currentUser.username}`}>
          <li
            className={`${
              location.pathname === `/${currentUser.username}` && styles.bold
            }`}
          >
            <span className="material-icons">person</span>Profile
          </li>
        </Link>
        <Link to={"/home"}>
          <button className={styles.cta_btn}>Say Something</button>
        </Link>
      </ul>
      <div className={styles.small_profile}>
        <img
          src={
            currentUser.profilePhoto
              ? currentUser.profilePhoto
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="profile_image"
          className={styles.avatar}
        />
        <div className={styles.user}>
          <h1>{currentUser.firstName}</h1>
          <h3>@{currentUser.username}</h3>
        </div>
      </div>
    </aside>
  );
};
