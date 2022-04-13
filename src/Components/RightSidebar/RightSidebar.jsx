import axios from "axios";
import { useAuthContext, useReducerContext, useUserContext } from "Context";
import * as styles from "./RightSidebar.module.css";

export const RightSidebar = () => {
  const { userState } = useAuthContext();
  const { followUser, unfollowUser } = useUserContext();
  const { users, userFollowing } = useReducerContext();

  return (
    <aside className={styles.right_sidebar}>
      <input placeholder="Search Here...." type="text" />
      <div className={styles.follower_section}>
        {userFollowing.length !== 0 ? (
          <h1>Following</h1>
        ) : (
          <h1>No Following</h1>
        )}
        {userFollowing.length !== 0 &&
          userFollowing.map((user) => {
            return (
              <div key={user._id}>
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
                    <button
                      onClick={() => unfollowUser(user._id)}
                      className={styles.follow_btn}
                    >
                      Unfollow
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.follower_section}>
        
        <h1>Who to Follow</h1>
        {users
          .filter((user) => user.username !== userState.username)
          .filter((user) =>
            userFollowing.length === 0
              ? user
              : !userFollowing
                  .map((user) => user.username)
                  .includes(user.username)
          )
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
                  <button
                    onClick={() => followUser(user._id)}
                    className={styles.follow_btn}
                  >
                    Follow
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </aside>
  );
};
