import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  bookmark,
  dislikePost,
  likePost,
  removeBookmark,
} from "Redux/Reducers/postsSlice";
import { followUser } from "Redux/Reducers/usersSlice";
import styles from "./ExplorePosts.module.css";

export const ExplorePosts = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.posts);
  const allUsers = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const bookmarks = useSelector((state) => state.posts.bookmarks);

  const user = allUsers.find((user) => user.username === currentUser.username);
  const followingUserNameArray = user.following.map((user) => user.username);
  const followingOnlyPosts = allPosts.filter(
    (post) => !followingUserNameArray.includes(post.username)
  );
  const userAndFollowingPost = followingOnlyPosts.filter(
    (post) => post.username !== currentUser.username
  );

  return userAndFollowingPost.map((post) => {
    return (
      <div key={post._id} className={styles.post}>
        <Link to={`/${post.username}`}>
          {allUsers
            .filter((posts) => posts.username === post.username)
            .map((user) => {
              return (
                <img
                  key={user._id}
                  src={
                    user.profilePhoto
                      ? user.profilePhoto
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="User Thumbnail"
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
            <div className={styles.follow_btn}>
              {!allUsers
                .filter((user) => user.username === currentUser.username)
                .map((user) =>
                  user.following.some((user) => user.username === post.username)
                )[0] && (
                <button
                  onClick={() =>
                    dispatch(
                      followUser(
                        allUsers.filter(
                          (user) => user.username === post.username
                        )[0]._id
                      )
                    )
                  }
                >
                  Follow
                </button>
              )}
            </div>
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
                  onClick={() => {
                    dispatch(dislikePost(post._id));
                  }}
                  className="material-icons"
                  style={{
                    color: "var(--alert-color)",
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  onClick={() => {
                    dispatch(likePost(post._id));
                  }}
                  className="material-icons"
                >
                  favorite_border
                </span>
              )}
              <p>{post.likes.likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
