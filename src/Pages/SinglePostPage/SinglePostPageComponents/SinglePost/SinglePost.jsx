import { Link, useParams } from "react-router-dom";
import styles from "./SinglePost.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmark,
  dislikePost,
  likePost,
  removeBookmark,
} from "Redux/Reducers/postsSlice";

export const SinglePost = () => {
  const { postId, username } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allPosts = useSelector((state) => state.posts.posts);
  const bookmarks = useSelector((state) => state.posts.bookmarks);
  const allUsers = useSelector((state) => state.users.users);

  return allPosts
    .filter((post) => post._id === postId)
    .map((post) => {
      return (
        <div key={post._id}>
          <div className={styles.post}>
            <Link to={`/${post.username}`}>
              {allUsers
                .filter((user) => user.username === username)
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
              <p>{post.content}</p>
            </div>
          </div>
          <div className={styles.icons_container}>
            <span className="material-icons">chat_bubble</span>
            {bookmarks
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
            <div className={styles.like_div}>
              {post.likes.likedBy
                .map((liked) => liked.username)
                .includes(currentUser.username) ? (
                <span
                  onClick={() => dispatch(dislikePost(post._id))}
                  className="material-icons"
                  style={{
                    color: "var(--alert-color)",
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  onClick={() => dispatch(likePost(post._id))}
                  className="material-icons"
                >
                  favorite_border
                </span>
              )}
              <p>{post.likes.likeCount}</p>
            </div>
          </div>
        </div>
      );
    });
};
