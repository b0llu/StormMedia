import { ExplorePosts } from "Components";
import { useThemeContext } from "Context";
import { useDocTitle } from "Hook/useTitle";
import styles from "./ExplorePage.module.css";

export const ExplorePage = () => {
  useDocTitle("Explore | StormMedia")
  const { setToggle } = useThemeContext();
  return (
    <div className={styles.explore_container}>
      <div className={styles.for_flex}>
        <span
          onClick={() => setToggle(true)}
          className={`${styles.mobile_close} material-icons`}
        >
          menu
        </span>
        <h1 className={styles.header}>Explore</h1>
      </div>
      <ExplorePosts />
    </div>
  );
};
