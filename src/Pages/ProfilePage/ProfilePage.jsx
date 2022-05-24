import { EditProfileModal, Loader, UserPosts } from "Components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { followUser, unfollowUser } from "Redux/Reducers/usersSlice";
import { useThemeContext } from "Context";

export const ProfilePage = () => {
  const [modal, setModal] = useState(false);
  const { username } = useParams();

  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.posts);
  const allUsers = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.posts.loading);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const { setToggle } = useThemeContext();

  return loading ? (
    <Loader />
  ) : username === currentUser.username ? (
    allUsers
      .filter((post) => post.username === currentUser.username)
      .map((post) => {
        return (
          <div key={post.createdAt} className={styles.profile_container}>
            <div className={styles.for_flex}>
              <span
                onClick={() => setToggle(true)}
                className={`${styles.mobile_close} material-icons`}
              >
                menu
              </span>
              <h1 className={styles.header}>Profile</h1>
            </div>
            {modal && (
              <EditProfileModal
                firstName={post.firstName}
                bio={post.bio}
                profilePhoto={post.profilePhoto}
                coverPhoto={post.coverPhoto}
                URL={post.URL ?? ''}
                setModal={setModal}
              />
            )}
            {post.coverPhoto ? (
              <img
                className={styles.profile_backdrop}
                src={post.coverPhoto}
                alt=""
              />
            ) : (
              <div className={styles.no_img}></div>
            )}
            <div className={styles.user_info}>
              <div className={styles.user_img}>
                <img
                  src={
                    post.profilePhoto
                      ? post.profilePhoto
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt=""
                />
                <button onClick={() => setModal(true)}>Edit profile</button>
              </div>
              <div className={styles.user_data}>
                <h1>{post.firstName}</h1>
                <h3>@{post.username}</h3>
                {allUsers
                  .filter((user) => user.username === currentUser.username)
                  .map((user) => {
                    return (
                      <a key={user._id} target={"_blank"} href={user.URL}>
                        {user.URL}
                      </a>
                    );
                  })}
                <p>{post.bio}</p>
                <div className={styles.follower_status}>
                  <p>
                    {allUsers
                      .filter((user) => user.username === username)
                      .map((user) => user.following)[0].length !== 0
                      ? allUsers
                          .filter((user) => user.username === username)
                          .map((user) => user.following)[0].length
                      : 0}{" "}
                    Following
                  </p>
                  <p>
                    {allUsers
                      .filter((user) => user.username === username)
                      .map((user) => user.followers)[0].length !== 0
                      ? allUsers
                          .filter((user) => user.username === username)
                          .map((user) => user.followers)[0].length
                      : 0}{" "}
                    Followers
                  </p>
                </div>
              </div>
              <div className={styles.post_show_container}>
                <p className={styles.post_header}>Posts</p>
                <UserPosts
                  posts={allPosts.filter(
                    (post) => post.username === currentUser.username
                  )}
                />
              </div>
            </div>
          </div>
        );
      })
  ) : (
    allUsers
      .filter((user) => user.username === username)
      .map((user) => {
        return (
          <div key={user._id} className={styles.profile_container}>
            {user.coverPhoto ? (
              <img
                className={styles.profile_backdrop}
                src={user.coverPhoto}
                alt=""
              />
            ) : (
              <div className={styles.no_img}></div>
            )}
            <div className={styles.user_info}>
              <div className={styles.user_img}>
                <img
                  src={
                    user.profilePhoto
                      ? user.profilePhoto
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt=""
                />
                {allUsers
                  .filter((user) => user.username === currentUser.username)
                  .map((user) =>
                    user.following.some((user) => user.username === username)
                  )[0] ? (
                  <button
                    onClick={() => dispatch(unfollowUser(user._id))}
                    className={styles.follow_btn}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch(followUser(user._id))}
                    className={styles.follow_btn}
                  >
                    Follow
                  </button>
                )}
              </div>
              <div className={styles.user_data}>
                <h1>{user.firstName}</h1>
                <h3>@{user.username}</h3>
                <a target={"_blank"} href={user.URL}>
                  {user.URL}
                </a>
                <p>{user.bio}</p>
                <div className={styles.follower_status}>
                  <p>
                    {allUsers
                      .filter((user) => user.username === username)
                      .map((user) => user.following)[0].length !== 0
                      ? allUsers
                          .filter((user) => user.username === username)
                          .map((user) => user.following)[0].length
                      : 0}{" "}
                    Following
                  </p>
                  <p>
                    {allUsers
                      .filter((user) => user.username === username)
                      .map((user) => user.followers)[0].length !== 0
                      ? allUsers
                          .filter((user) => user.username === username)
                          .map((user) => user.followers)[0].length
                      : 0}{" "}
                    Followers
                  </p>
                </div>
              </div>
              <div className={styles.post_show_container}>
                <p className={styles.post_header}>Posts</p>
                <UserPosts
                  posts={allPosts.filter(
                    (post) => post.username === user.username
                  )}
                />
              </div>
            </div>
          </div>
        );
      })
  );
};
