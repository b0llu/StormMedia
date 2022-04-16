import axios from "axios";
import { useReducerContext } from "Context";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FETCH_POSTS } from "Utils/Action";
import * as styles from "./EachPost.module.css";

export const EachPost = () => {
  const { dispatch, posts } = useReducerContext();

  useEffect(() => {
    return (async function () {
      try {
        const response = await axios.get("/api/posts");
        if (response.status === 200) {
          dispatch({ type: FETCH_POSTS, payload: response.data.posts });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return posts.map((post) => {
    return (
      <div key={post._id} className={styles.post}>
        <Link to={`/${post.username}`}>
          <img
            src={
              post.profilePhoto
                ? post.profilePhoto
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="User Thumbnail"
          />
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
          <div className={styles.icons_container}>
            <span className="material-icons">chat_bubble</span>
            <div className={styles.like_div}>
              <span className="material-icons">favorite_border</span>
              <p>{post.likes.likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
