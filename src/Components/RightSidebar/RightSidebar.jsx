import * as styles from "./RightSidebar.module.css";

export const RightSidebar = () => {
  return (
    <aside className={styles.right_sidebar}>
      <input placeholder="Search Here...." type="text" />
      <div className={styles.follower_section}>
        <h1>Following</h1>
        <div className={styles.small_profile}>
          <img
            src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
            alt="profile_image"
            className={styles.avatar}
          />
          <div className={styles.user}>
            <div>

            <h1>username</h1>
            <h3>@usertag</h3>
            </div>
          </div>
        </div>
        <div className={styles.small_profile}>
          <img
            src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
            alt="profile_image"
            className={styles.avatar}
          />
          <div className={styles.user}>
            <div>

            <h1>username</h1>
            <h3>@usertag</h3>
            </div>
          </div>
        </div>
        <div className={styles.small_profile}>
          <img
            src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
            alt="profile_image"
            className={styles.avatar}
          />
          <div className={styles.user}>
            <div>

            <h1>username</h1>
            <h3>@usertag</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.follower_section}>
        <h1>Who to Follow</h1>
        <div className={styles.small_profile}>
          <img
            src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
            alt="profile_image"
            className={styles.avatar}
          />
          <div className={styles.user}>
            <div>
              <h1>username</h1>
              <h3>@usertag</h3>
            </div>
            <button className={styles.follow_btn}>Follow</button>
          </div>
        </div>
        <div className={styles.small_profile}>
          <img
            src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
            alt="profile_image"
            className={styles.avatar}
          />
          <div className={styles.user}>
            <div>
              <h1>username</h1>
              <h3>@usertag</h3>
            </div>
            <button className={styles.follow_btn}>Follow</button>
          </div>
        </div>
        <div className={styles.small_profile}>
          <img
            src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
            alt="profile_image"
            className={styles.avatar}
          />
          <div className={styles.user}>
            <div>
              <h1>username</h1>
              <h3>@usertag</h3>
            </div>
            <button className={styles.follow_btn}>Follow</button>
          </div>
        </div>
      </div>
    </aside>
  );
};
