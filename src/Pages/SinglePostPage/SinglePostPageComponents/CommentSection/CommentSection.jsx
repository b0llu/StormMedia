import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "Redux/Reducers/postsSlice";
import { v4 as uuid } from "uuid";
import styles from "./CommentSection.module.css";

export const CommentSection = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser);
  const comments = useSelector((state) => state.posts.comments);
  const [comment, setComment] = useState({
    firstName: currentUser.firstName,
    username: currentUser.username,
    comment: "",
  });

  return (
    <>
      <div className={styles.comment_section}>
        <div className={styles.comment}>
          <img src={currentUser.profilePhoto} alt="user-image" />
          <textarea
            onChange={(e) =>
              setComment({ ...comment, comment: e.target.value })
            }
            placeholder="Reply Here...."
            cols="10"
            rows="2"
            value={comment.comment}
          ></textarea>
          <button
            onClick={() => {
              dispatch(postComment(comment));
              setComment({ ...comment, comment: "" });
            }}
          >
            Reply
          </button>
        </div>
      </div>
      {comments !== undefined && comments.length !== 0 &&
        comments.map((commentData) => {
          return (
            <div key={uuid()} className={styles.comments}>
              <div className={styles.post}>
                <img
                  src={
                    currentUser.profilePhoto
                      ? currentUser.profilePhoto
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="User Thumbnail"
                />
                <div className={styles.post_user_details}>
                  <div className={styles.user_name}>
                    <h1>{commentData.firstName}</h1>
                    <h2>@{commentData.username}</h2>
                  </div>
                  <p>{commentData.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
