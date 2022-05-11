import { useThemeContext } from "Context";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Redux/Reducers/authSlice";
import styles from "./LogoutBtn.module.css";

export const LogoutBtn = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  return currentUser._id ? (
    <span
      onClick={() => {
        dispatch(logout());
      }}
      className={`material-icons ${styles.logout_icon}`}
    >
      logout
    </span>
  ) : null;
};
