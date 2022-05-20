import { EachPost, NewPost } from "Components";
import { useThemeContext } from "Context";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  sortByDate,
  sortByRecent,
  sortByTrending,
} from "Redux/Reducers/postsSlice";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [sortDropdown, setSortDropdown] = useState(false);
  const sortOrder = useSelector((state) => state.posts.sortOrder);
  const sortBy = useSelector((state) => state.posts.sortBy);
  const dispatch = useDispatch();
  const { setToggle } = useThemeContext();

  const [filterState, setFilterState] = useState({
    type: "posts/sortByRecent",
    payload: undefined,
  });

  const onSortBy = (type) => {
    switch (type) {
      case "date":
        dispatch(sortByDate(sortOrder === "asc"));
        setFilterState(sortByDate(sortOrder === "asc"));
        break;
      case "trending":
        dispatch(sortByTrending());
        setFilterState(sortByTrending());
        break;
      case "recent":
        dispatch(sortByRecent());
        setFilterState(sortByRecent());
      default:
    }
  };

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
        <span
          onMouseEnter={() => setSortDropdown(!sortDropdown)}
          className="material-icons"
        >
          sort
        </span>
        {sortDropdown && (
          <div
            onMouseLeave={() => setSortDropdown(!sortDropdown)}
            className={styles.sort}
          >
            <label onClick={() => onSortBy("date")}>
              <input
                checked={sortBy === "Date"}
                readOnly
                name="sorting"
                type="radio"
              />
              Date Sort
            </label>
            <label onClick={() => onSortBy("trending")}>
              <input
                checked={sortBy === "Trending"}
                readOnly
                name="sorting"
                type="radio"
              />
              Trending
            </label>
            <label onClick={() => onSortBy("recent")}>
              <input
                checked={sortBy === "Recent"}
                readOnly
                name="sorting"
                type="radio"
              />
              Recent
            </label>
          </div>
        )}
      </div>
      <NewPost />
      <EachPost filterState={filterState} />
    </section>
  );
};
