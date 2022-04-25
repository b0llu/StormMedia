import { useAuthContext, usePostContext } from "Context";
import * as styles from "./UserPosts.module.css";

export const UserPosts = ({ posts }) => {
  const { userState } = useAuthContext();
  const { likePost, dislikePost } = usePostContext();

  return (
    posts !== undefined &&
    posts.map((post) => {
      return (
        <div key={post._id} className={styles.post}>
          <img
            src={
              post.profilePhoto
                ? post.profilePhoto
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="User Thumbnail"
          />
          <div className={styles.post_user_details}>
            <div className={styles.user_name}>
              <h1>{post.name}</h1>
              <h2>@{post.username}</h2>
              <h3>{post.time}</h3>
            </div>
            <p>{post.content}</p>
            <div className={styles.icons_container}>
              <span className="material-icons">chat_bubble</span>
              <div className={styles.like_div}>
                {post.likes.likedBy
                  .map((liked) => liked.username)
                  .includes(userState.username) ? (
                  <span
                    onClick={() => dislikePost(post._id)}
                    className="material-icons"
                    style={{
                      color: "var(--alert-color)",
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    onClick={() => likePost(post._id)}
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
    })
  );
};
