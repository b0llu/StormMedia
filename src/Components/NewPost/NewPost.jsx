import * as styles from "./NewPost.module.css";

export const NewPost = () => {
  return (
    <div className={styles.post_container}>
      <img
        src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
        alt=""
      />
      <div className={styles.post_details}>
        <p
        data-placeholder="What's Happening...."
        contentEditable
        className={styles.textarea}
        ></p>
        <div className={styles.post_cta_section}>
          <div className={styles.icons}>
            <span className="material-icons">image</span>
            <span className="material-icons">gif</span>
            <span className="material-icons">poll</span>
            <span className="material-icons">emoji_emotions</span>
          </div>
          <button>Post</button>
        </div>
      </div>
    </div>
  );
};
