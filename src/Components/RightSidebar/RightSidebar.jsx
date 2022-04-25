import { useDispatch, useSelector } from "react-redux";
import styles from "./RightSidebar.module.css";
import { followUser, unfollowUser } from "Redux/Reducers/usersSlice";

export const RightSidebar = () => {
  const allUsers = useSelector((state) => state.users.users);
  const currentUser = useSelector(state => state.auth.currentUser)
  const dispatch = useDispatch();
  console.log(allUsers);

  return (
    <aside className={styles.right_sidebar}>
      <input placeholder="Search Here...." type="text" />
      <div className={styles.follower_section}>
        {allUsers.filter(
          (user) => user.username === currentUser.username
        )[0] !== undefined &&
        allUsers.filter((user) => user.username === currentUser.username)[0]
          .following.length !== 0 ? (
          <h1>Following</h1>
        ) : (
          <h1>No Following</h1>
        )}
        {allUsers.filter((user) => user.username === currentUser.username)[0] !==
          undefined &&
          allUsers.filter((user) => user.username === currentUser.username)[0]
            .following.length !== 0 &&
          allUsers
            .filter((user) => user.username === currentUser.username)[0]
            .following.map((user) => {
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
                        onClick={() => {
                          dispatch(unfollowUser(user._id));
                        }}
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
        {allUsers.filter((user) => user.username === currentUser.username)[0] !==
          undefined &&
        allUsers
          .filter((user) => user.username !== currentUser.username)
          .filter((user) =>
            allUsers.filter((user) => user.username === currentUser.username)[0]
              .following.length === 0
              ? user
              : !allUsers
                  .filter((user) => user.username === currentUser.username)[0]
                  .following.map((user) => user.username)
                  .includes(user.username)
          ).length !== 0 ? (
          <h1>Who to Follow</h1>
        ) : (
          <h1>No Suggetions</h1>
        )}
        {allUsers.filter((user) => user.username === currentUser.username)[0] !==
          undefined &&
          allUsers
            .filter((user) => user.username !== currentUser.username)
            .filter((user) =>
              allUsers.filter((user) => user.username === currentUser.username)[0]
                .following.length === 0
                ? user
                : !allUsers
                    .filter((user) => user.username === currentUser.username)[0]
                    .following.map((user) => user.username)
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
                      onClick={() => {
                        dispatch(followUser(user._id));
                      }}
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
