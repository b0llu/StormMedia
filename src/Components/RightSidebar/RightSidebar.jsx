import axios from "axios";
import { useAuthContext } from "Context";
import * as styles from "./RightSidebar.module.css";

export const RightSidebar = () => {
  const { userState, users } = useAuthContext();

  return (
    <aside className={styles.right_sidebar}>
      <input placeholder="Search Here...." type="text" />
      <div className={styles.follower_section}>
        {Object.keys(userState).length > 0 &&
        userState.following.length !== 0 ? (
          userState.following.map((user) => {
            return (
              <div key={user._id}>
                <h1>Following</h1>
                <div className={styles.small_profile}>
                  <img
                    src={
                      user.profilePhoto
                        ? user.profilePhoto
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt="profile_image"
                    className={styles.avatar}
                  />
                  <div className={styles.user}>
                    <div>
                      <h1>{user.firstName}</h1>
                      <h3>@{user.username}</h3>
                    </div>
                    <button className={styles.follow_btn}>Unfollow</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Following</h1>
        )}
      </div>
      <div className={styles.follower_section}>
        <h1>Who to Follow</h1>
        {users
          .filter((user) => user.username !== userState.username)
          .map((user) => {
            return (
              <div key={user._id} className={styles.small_profile}>
                <img
                  src={
                    user.profilePhoto
                      ? user.profilePhoto
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="profile_image"
                  className={styles.avatar}
                />
                <div className={styles.user}>
                  <div>
                    <h1>{user.firstName}</h1>
                    <h3>@{user.username}</h3>
                  </div>
                  <button className={styles.follow_btn}>Follow</button>
                </div>
              </div>
            );
          })}
      </div>
    </aside>
  );
};
