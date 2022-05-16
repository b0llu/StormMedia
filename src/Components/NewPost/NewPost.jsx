import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createNewPost } from "Redux/Reducers/postsSlice";
import { AlertToast } from "Components/Toasts";
import styles from "./NewPost.module.css";

export const NewPost = () => {
  const [postDetails, setPostDetails] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

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
        <img
          src={
            currentUser.profilePhoto
              ? currentUser.profilePhoto
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="user image"
        />
      </Link>
      <div className={styles.post_details}>
        <textarea
          role="textbox"
          type="text"
          placeholder="What's Happening....."
          autoFocus
          rows="3"
          value={postDetails}
          onChange={(e) => setPostDetails(e.target.value)}
        />
        <div className={styles.post_cta_section}>
          <div className={styles.icons}>
            <span className="material-icons">image</span>
            <span className="material-icons">gif</span>
            <span className="material-icons">poll</span>
            <span className="material-icons">emoji_emotions</span>
          </div>
          <button onClick={() => postHandler(postDetails)}>Post</button>
        </div>
      </div>
    </div>
  );
};
