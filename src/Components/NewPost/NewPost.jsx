import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createNewPost } from "Redux/Reducers/postsSlice";
import { AlertToast } from "Components/Toasts";
import styles from "./NewPost.module.css";

export const NewPost = () => {
  const [postDetails, setPostDetails] = useState("");
  const allUsers = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [textLength, setTextLength] = useState(0);

  const postHandler = (postDetails) => {
    if (postDetails === "") {
      AlertToast("Why are you Posting Empty Post?");
    } else {
      dispatch(createNewPost(postDetails));
      setPostDetails("");
    }
  };

  return (
    <div className={styles.post_container}>
      <Link to={`/${currentUser.username}`}>
        {allUsers
          .filter((posts) => posts.username === currentUser.username)
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
      <div className={styles.post_details}>
        <textarea
          role="textbox"
          type="text"
          placeholder="What's Happening....."
          autoFocus
          rows="3"
          maxLength={"150"}
          value={postDetails}
          onChange={(e) => {
            setPostDetails(e.target.value);
            setTextLength(e.target.value.length);
          }}
        />
        <div className={styles.post_cta_section}>
          <div className={styles.icons}>
            <span>{textLength}/150</span>
          </div>
          <button
            onClick={() => {
              postHandler(postDetails), setTextLength(0);
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
