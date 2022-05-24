import styles from "./LeftSidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Redux/Reducers/authSlice";
import { useThemeContext } from "Context";

export const LeftSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allUsers = useSelector((state) => state.users.users);
  const { theme, toggleLightDarkTheme, setToggle, toggle } = useThemeContext();

  return (
    <aside
      className={
        toggle ? `${styles.left_sidebar_toggle}` : `${styles.left_sidebar}`
      }
    >
      <p className={styles.brand_name}>
        <i className="fas fa-bolt"></i> StormMedia
      </p>
      <div className={styles.brand_name_mobile}>
        <i className="fas fa-bolt"></i>
        <div className={styles.mobile_icon_container}>
          {currentUser._id && (
            <span
              onClick={() => {
                dispatch(logout()), setToggle(false);
              }}
              className={`material-icons ${styles.logout_icon}`}
            >
              logout
            </span>
          )}
          {theme === "light" ? (
            <span
              onClick={toggleLightDarkTheme}
              className={`material-icons ${styles.theme_icon}`}
            >
              dark_mode
            </span>
          ) : (
            <span
              onClick={toggleLightDarkTheme}
              className={`material-icons ${styles.theme_icon}`}
            >
              light_mode
            </span>
          )}
          <span
            onClick={() => setToggle(false)}
            className={`${styles.mobile_close} material-icons`}
          >
            close
          </span>
        </div>
      </div>
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
        <Link to={`/bookmarks`}>
          <li
            className={`${location.pathname === "/bookmarks" && styles.bold}`}
          >
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
        {allUsers
          .filter((user) => user.username === currentUser.username)
          .map((user) => {
            return (
              <img
              key={user._id}
                src={
                  user.profilePhoto
                    ? user.profilePhoto
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="profile_image"
                className={styles.avatar}
              />
            );
          })}
        
        <div className={styles.user}>
          <h1>{currentUser.firstName}</h1>
          <h3>@{currentUser.username}</h3>
        </div>
      </div>
    </aside>
  );
};
