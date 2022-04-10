import { useThemeContext } from "Context";
import * as styles from "./ThemeToggler.module.css";

export const ThemeToggler = () => {
  const { theme, toggleLightDarkTheme } = useThemeContext();
  return theme === "light" ? (
    <span onClick={toggleLightDarkTheme} className={`material-icons ${styles.theme_icon}`}>
      dark_mode
    </span>
  ) : (
    <span onClick={toggleLightDarkTheme} className={`material-icons ${styles.theme_icon}`}>
      light_mode
    </span>
  );
};
