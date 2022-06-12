import { AlertToast } from "Components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postComment } from "Redux/Reducers/postsSlice";
import styles from "./CommentSection.module.css";

export const CommentSection = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allPosts = useSelector((state) => state.posts.posts);
  const [comment, setComment] = useState({ id: postId, comment: "" });
  const allUsers = useSelector((state) => state.users.users);

  const commentHandler = (comment) => {
    if (comment.comment === "") {
      AlertToast("Comment Field is empty!");
    } else {
      dispatch(postComment(comment));
      setComment({ ...comment, comment: "" });
    }
  };

  return (
    <>
      <div className={styles.comment_section}>
        <div className={styles.comment}>
          {allUsers
            .filter((user) => user.username === currentUser.username)
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
          <textarea
            onChange={(e) =>
              setComment({ ...comment, comment: e.target.value })
            }
            placeholder="Reply Here...."
            cols="10"
            rows="2"
            value={comment.comment}
          ></textarea>
          <button onClick={() => commentHandler(comment)}>Reply</button>
        </div>
      </div>
      {allPosts
        .filter((post) => post._id === postId)
        .map((post) => post.comments)[0] !== undefined &&
        allPosts
          .filter((post) => post._id === postId)
          .map((post) => post.comments)[0]
          .map((commentData) => {
            return (
              <div key={commentData.createdAt} className={styles.comments}>
                <div className={styles.post}>
                  {allUsers
                    .filter((user) => user.username === currentUser.username)
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
                  <div className={styles.post_user_details}>
                    <div className={styles.user_name}>
                      <h1>{currentUser.firstName}</h1>
                      <h2>@{commentData.username}</h2>
                    </div>
                    <p>{commentData.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};
