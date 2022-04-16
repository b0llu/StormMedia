import { useAuthContext, usePostContext } from "Context";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as styles from "./NewPost.module.css";

export const NewPost = () => {
  const [postDetails, setPostDetails] = useState("");

  const { addPost } = usePostContext();
  const { userState } = useAuthContext();

  return (
    <div className={styles.post_container}>
      <Link to={`/${userState.username}`}>
        <img
          src={
            userState.profilePhoto
              ? userState.profilePhoto
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
          <button
            onClick={() => {
              addPost(postDetails);
              setPostDetails("");
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
