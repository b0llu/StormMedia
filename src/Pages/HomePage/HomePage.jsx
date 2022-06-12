import { EachPost, NewPost } from "Components";
import { useThemeContext } from "Context";
import { useDocTitle } from "Hook/useTitle";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortByValue } from "Redux/Reducers/postsSlice";
import { getAllUsers } from "Redux/Reducers/usersSlice";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  useDocTitle("Home | StormMedia");
  const sortState = useSelector((state) => state.posts.sortBy);
  const [filterSelector, useFilterSelector] = useState(sortState);
  const { setToggle } = useThemeContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <section className={styles.content_container}>
      <div className={styles.header_div}>
        <span
          onClick={() => setToggle(true)}
          className={`${styles.mobile_close} material-icons`}
        >
          menu
        </span>
        <h1 className={styles.section_header}>Home</h1>
        <select
          className={styles.filter_selector}
          value={filterSelector}
          onChange={(e) => {
            useFilterSelector(e.target.value);
            dispatch(sortByValue(e.target.value));
          }}
        >
          <option value="Latest">Latest Posts</option>
          <option value="Trending">Trending</option>
          <option value="Oldest">Oldest Posts</option>
        </select>
      </div>
      <NewPost />
      <EachPost />
    </section>
  );
};
