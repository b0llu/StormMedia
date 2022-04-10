import { useLocation } from "react-router-dom";
import * as styles from "./GridContainer.module.css";

export const GridContainer = ({ children }) => {
  const location = useLocation();

  return (
    <section
      className={
        location.pathname === "/"
          ? styles.grid_container_home
          : styles.grid_container
      }
    >
      {children}
    </section>
  );
};
