import { EachPost } from "Components";
import styles from "./ExplorePage.module.css";

export const ExplorePage = () => {
  return (
    <div className={styles.explore_container}>
      <h1 className={styles.header}>Explore</h1>
      <EachPost />
    </div>
  );
};
