import { useThemeContext } from "Context";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bookmark, removeBookmark } from "Redux/Reducers/postsSlice";
import styles from "./BookmarkPost.module.css";

export const BookmarkPost = () => {
  const dispatch = useDispatch();
  const allBookmarks = useSelector((state) => state.posts.bookmarks);
  const allUsers = useSelector((state) => state.users.users);
  const allPosts = useSelector((state) => state.posts.posts);
  const { setToggle } = useThemeContext();

  const bookmarks = allPosts.filter((post) =>
    allBookmarks.map((bookmarkPost) => bookmarkPost._id).includes(post._id)
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
        <h1 className={styles.header}>Bookmarks</h1>
      </div>
      {bookmarks.length === 0 ? (
        <h1
          style={{
            color: "var(--content-color)",
            fontSize: "3rem",
            fontWeight: "500",
            textAlign: "center",
            margin: "2rem",
          }}
        >
          Nothing in Bookmarks
        </h1>
      ) : (
        bookmarks.map((post) => {
          return (
            <div key={post._id} className={styles.post}>
              <Link to={`/${post.username}`}>
                {allUsers
                  .filter((user) => user.username === post.username)
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
                    <span className="material-icons">chat_bubble_outline</span>
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
        })
      )}
    </div>
  );
};
