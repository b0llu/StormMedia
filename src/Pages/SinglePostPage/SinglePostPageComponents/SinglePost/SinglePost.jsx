import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as styles from "./SinglePost.module.css";
import axios from "axios";
import { useAuthContext, usePostContext, useReducerContext } from "Context";
import { LOADING } from "Utils/Action";

export const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const { dispatch, posts } = useReducerContext();
  const { userState } = useAuthContext();
  const { likePost, dislikePost } = usePostContext();

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: LOADING });
        const response = await axios.get(`/api/posts/${postId}`);
        if (response.status === 200) {
          setPost([response.data.post]);
        }
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, [posts]);

  return post.map((post) => {
    return (
      <div key={post._id}>
        <div className={styles.post}>
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
          </div>
        </div>
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
    );
  });
};
