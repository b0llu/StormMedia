import axios from "axios";
import { EditProfileModal, Loader, UserPosts } from "Components";
import { useAuthContext, useReducerContext, useUserContext } from "Context";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FETCH_POSTS, LOADING } from "Utils/Action";
import * as styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const [modal, setModal] = useState(false);
  const { userState } = useAuthContext();
  const { userFollowing, userFollowers, posts, users, loading, dispatch } =
    useReducerContext();
  const { username } = useParams();
  const { followUser, unfollowUser } = useUserContext();

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: LOADING });
        const response = await axios.get("/api/posts");
        if (response.status === 200) {
          dispatch({ type: LOADING });
          dispatch({ type: FETCH_POSTS, payload: response.data.posts });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return loading ? (
    <Loader />
  ) : username === userState.username ? (
    <div className={styles.profile_container}>
      {modal && (
        <EditProfileModal
          firstName={userState.firstName}
          bio={userState.bio}
          profilePhoto={userState.profilePhoto}
          coverPhoto={userState.coverPhoto}
          setModal={setModal}
        />
      )}
      {userState.coverPhoto ? (
        <img
          className={styles.profile_backdrop}
          src={userState.coverPhoto}
          alt=""
        />
      ) : (
        <div className={styles.no_img}></div>
      )}
      <div className={styles.user_info}>
        <div className={styles.user_img}>
          <img
            src={
              userState.profilePhoto
                ? userState.profilePhoto
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt=""
          />
          <button onClick={() => setModal(true)}>Edit profile</button>
        </div>
        <div className={styles.user_data}>
          <h1>{userState.firstName}</h1>
          <h3>@{userState.username}</h3>
          <p>{userState.bio}</p>
          <div className={styles.follower_status}>
            <p>
              {userFollowing.length !== 0 ? userFollowing.length : 0} Following
            </p>
            <p>
              {userFollowers.length !== 0 ? userFollowers.length : 0} Followers
            </p>
          </div>
        </div>
        <div className={styles.post_show_container}>
          <p className={styles.post_header}>Posts</p>
          <UserPosts
            posts={posts.filter((post) => post.username === userState.username)}
          />
        </div>
      </div>
    </div>
  ) : (
    users
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
                {userFollowing.some((user) => user.username === username) ? (
                  <button
                    onClick={() => unfollowUser(user._id)}
                    className={styles.follow_btn}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => followUser(user._id)}
                    className={styles.follow_btn}
                  >
                    Follow
                  </button>
                )}
              </div>
              <div className={styles.user_data}>
                <h1>{user.firstName}</h1>
                <h3>@{user.username}</h3>
                <p>{user.bio}</p>
                <div className={styles.follower_status}>
                  <p>
                    {users
                      .filter((user) => user.username === username)
                      .map((user) => user.following)[0].length !== 0
                      ? users
                          .filter((user) => user.username === username)
                          .map((user) => user.following)[0].length
                      : 0}{" "}
                    Following
                  </p>
                  <p>
                    {users
                      .filter((user) => user.username === username)
                      .map((user) => user.followers)[0].length !== 0
                      ? users
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
                  posts={posts.filter(
                    (post) => post.username === user.username
                  )}
                />
              </div>
              {modal && <EditProfileModal />}
            </div>
          </div>
        );
      })
  );
};
