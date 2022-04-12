import { useAuthContext } from "Context";
import * as styles from "./LogoutBtn.module.css";

export const LogoutBtn = () => {
  const { userState, signout } = useAuthContext();
  return userState._id ? (
    <span onClick={signout} className={`material-icons ${styles.logout_icon}`}>logout</span>
  ) : null;
};
