import { useDispatch, useSelector } from "react-redux";
import styles from "./RightSidebar.module.css";
import { followUser, unfollowUser } from "Redux/Reducers/usersSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const RightSidebar = () => {
  const location = useLocation();
  const allUsers = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm("");
  }, [location.pathname]);

  return (
    <aside className={styles.right_sidebar}>
      <div className={styles.input_container}>
        <input
          className={styles.search_bar}
          placeholder="Search Here...."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.input_search_result}>
          {searchTerm.length > 0 &&
            allUsers
              .filter((user) =>
                user.username.toLowerCase().includes(searchTerm)
              )
              .map((user) => {
                return (
                  <div
                    key={user.id}
                    onClick={() => navigate(`/${user.username}`)}
                    className={styles.small_profile}
                  >
                    <img
                      key={user._id}
                      src={
                        user.profilePhoto
                          ? user.profilePhoto
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt="profile_image"
                      className={styles.avatar}
                    />
                    <div className={styles.user}>
                      <h1>{user.firstName}</h1>
                      <h3>@{user.username}</h3>
                    </div>
                  </div>
                );
              })}
          {searchTerm.length > 0 &&
            allUsers.filter((user) =>
              user.username.toLowerCase().includes(searchTerm)
            ).length === 0 && (
              <div className={styles.small_profile}>
                <h1>No User Found</h1>
              </div>
            )}
        </div>
      </div>
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
        {allUsers.filter(
          (user) => user.username === currentUser.username
        )[0] !== undefined &&
          allUsers.filter((user) => user.username === currentUser.username)[0]
            .following.length !== 0 &&
          allUsers
            .filter((user) => user.username === currentUser.username)[0]
            .following.map((user) => {
              return (
                <div key={user._id}>
                  <div className={styles.small_profile}>
                    <Link to={`/${user.username}`}>
                      <img
                        src={
                          user.profilePhoto
                            ? user.profilePhoto
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        }
                        alt="profile_image"
                        className={styles.avatar}
                      />
                    </Link>
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
        {allUsers.filter(
          (user) => user.username === currentUser.username
        )[0] !== undefined &&
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
        {allUsers.filter(
          (user) => user.username === currentUser.username
        )[0] !== undefined &&
          allUsers
            .filter((user) => user.username !== currentUser.username)
            .filter((user) =>
              allUsers.filter(
                (user) => user.username === currentUser.username
              )[0].following.length === 0
                ? user
                : !allUsers
                    .filter((user) => user.username === currentUser.username)[0]
                    .following.map((user) => user.username)
                    .includes(user.username)
            )
            .map((user) => {
              return (
                <div key={user._id} className={styles.small_profile}>
                  <Link to={`/${user.username}`}>
                    <img
                      src={
                        user.profilePhoto
                          ? user.profilePhoto
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt="profile_image"
                      className={styles.avatar}
                    />
                  </Link>
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
