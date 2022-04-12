import { usePostContext } from "Context";
import { useState } from "react";
import * as styles from "./NewPost.module.css";

export const NewPost = () => {
  const [postDetails, setPostDetails] = useState("");

  const { addPost } = usePostContext();

  return (
    <div className={styles.post_container}>
      <img
        src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
        alt="user image"
      />
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
