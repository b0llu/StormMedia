import { useThemeContext } from "Context";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./BookmarkPost.module.css";

export const BookmarkPost = () => {
const dispatch = useDispatch();
const allBookmarks = useSelector((state) => state.posts.bookmarks);
const currentUser = useSelector((state) => state.auth.currentUser);
const allUsers = useSelector((state) => state.users.users);
const { setToggle } = useThemeContext();
console.log(
  allBookmarks
    .map((post) => post.username)
    .includes(allUsers.map((user) => user.username))
);
const something = allBookmarks.map((post) => post.username);
console.log(
  allUsers.filter((user) =>
    user.username.includes(allBookmarks.map((post) => post.username))
  )
);

return (
    <div className={styles.bookmarks_container}>
      <div className={styles.for_flex}>
        <span
          onClick={() => setToggle(true)}
          className={`${styles.mobile_close} material-icons`}
        >
          menu
        </span>
        {allBookmarks.length !== 0 ? (
          <h1 className={styles.header}>Bookmarks</h1>
        ) : (
          <h1 className={styles.header}>No Bookmarks</h1>
        )}
      </div>
      {allBookmarks.map((post) => {
        return (
          <div key={post._id} className={styles.post}>
            <Link to={`/${post.username}`}>
              {allUsers
                .filter(
                  (user) =>
                    user.username === post.username
                )
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
            </Link>
            <div className={styles.post_user_details}>
              <div className={styles.user_name}>
                <Link
                  style={{ color: "var(--content-color)" }}
                  to={`/${post.username}`}
                >
                  <h1>{post.name}</h1>
                </Link>
                <Link
                  style={{ color: "var(--content-color)" }}
                  to={`/${post.username}`}
                >
                  <h2>@{post.username}</h2>
                </Link>
                <h3>{post.time}</h3>
              </div>
              <Link to={`/${post.username}/${post._id}`}>
                <p>{post.content}</p>
              </Link>
              <div className={styles.icons_container}>
                <Link
                  style={{ color: "var(--cta-btn-bg)" }}
                  to={`/${post.username}/${post._id}`}
                >
                  <span className="material-icons">chat_bubble</span>
                </Link>
                {allBookmarks
                  .map((bookmarked) => bookmarked._id)
                  .includes(post._id) ? (
                  <span
                    onClick={() => dispatch(removeBookmark(post._id))}
                    className="material-icons"
                  >
                    bookmark
                  </span>
                ) : (
                  <span
                    onClick={() => dispatch(bookmark(post._id))}
                    className="material-icons"
                  >
                    bookmark_border
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
