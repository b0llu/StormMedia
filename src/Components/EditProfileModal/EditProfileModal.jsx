import { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "Redux/Reducers/usersSlice";
import styles from "./EditProfileModal.module.css";

export const EditProfileModal = ({
  firstName,
  bio,
  profilePhoto,
  coverPhoto,
  setModal,
}) => {
  const dispatch = useDispatch();
  const [editedData, setEditedData] = useState({
    firstName,
    bio,
    profilePhoto,
    coverPhoto,
  });
  return (
    <div className={styles.edit_modal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.left}>
            <span onClick={() => setModal(false)} className="material-icons">
              close
            </span>
            <h1>Edit profile</h1>
          </div>
          <button
            onClick={() => {
              dispatch(editUser(editedData));
              setModal(false);
            }}
          >
            Save
          </button>
        </div>
        {coverPhoto ? (
          <img className={styles.profile_backdrop} src={coverPhoto} alt="" />
        ) : (
          <div className={styles.no_img}></div>
        )}
        <div className={styles.user_img}>
          <img
            src={
              profilePhoto
                ? profilePhoto
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="Profile Photo"
          />
          <div className={styles.photo_upload_div}>
            <input
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  profilePhoto: e.target.files[0],
                })
              }
              className={styles.photo_change}
              id="photo_change"
              type="file"
              accept="image/jpeg,image/png,image/webp"
            />
            <label htmlFor="photo_change">
              <img
                className={styles.label_img}
                src="https://w7.pngwing.com/pngs/386/187/png-transparent-computer-icons-blog-change-angle-text-logo-thumbnail.png"
                alt="change image label"
              />
            </label>
          </div>
          <div className={styles.data}>
            <div className={styles.name_section}>
              <label>Name</label>
              <input
                onChange={(e) =>
                  setEditedData({ ...editedData, firstName: e.target.value })
                }
                type="text"
                maxLength="12"
                value={editedData.firstName}
              />
            </div>
            <div className={styles.bio_section}>
              <label>Bio</label>
              <textarea
                onChange={(e) =>
                  setEditedData({ ...editedData, bio: e.target.value })
                }
                value={editedData.bio}
                cols="30"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
