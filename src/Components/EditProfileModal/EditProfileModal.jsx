import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editUser, imageTry } from "Redux/Reducers/usersSlice";
import styles from "./EditProfileModal.module.css";

export const EditProfileModal = ({
  firstName,
  bio,
  profilePhoto,
  coverPhoto,
  setModal,
  URL,
}) => {
  const dispatch = useDispatch();
  const [editedData, setEditedData] = useState({
    firstName,
    bio,
    profilePhoto,
    coverPhoto,
    URL,
  });

  const urlCheck = (url) => {
    let str = "https://";

    if (url === "") {
      return "";
    } else if (url.startsWith(str)) {
      return url;
    } else {
      return str + url;
    }
  };

  const profileUpdaterHandler = async (editedData) => {
    const obj = {
      firstName: editedData.firstName,
      bio: editedData.bio,
      URL: urlCheck(editedData.URL) ?? editedData.URL,
    };
    dispatch(editUser(obj));
  };

  const profilePhotoHandler = (image) => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      data.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET ?? ""
      );
      fetch(process.env.REACT_APP_CLOUDINARY_API_URL ?? "", {
        method: "post",
        mode: "cors",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const obj = {
            firstName: editedData.firstName,
            bio: editedData.bio,
            URL: urlCheck(editedData.URL) ?? editedData.URL,
            profilePhoto: data.url,
          };
          dispatch(editUser(obj));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const backdropHandler = async (image) => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      data.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET ?? ""
      );
      fetch(process.env.REACT_APP_CLOUDINARY_API_URL ?? "", {
        method: "post",
        mode: "cors",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const obj = {
            firstName: editedData.firstName,
            bio: editedData.bio,
            coverPhoto: data.url,
            URL: urlCheck(editedData.URL) ?? editedData.URL,
          };
          dispatch(editUser(obj));
        });
    } catch (error) {
      console.log(error);
    }
  };

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
              profileUpdaterHandler(editedData);
              setModal(false);
            }}
          >
            Save
          </button>
        </div>
        {coverPhoto ? (
          <>
            <img className={styles.profile_backdrop} src={coverPhoto} alt="" />
            <div className={styles.backdrop_filter_change}>
              <input
                onChange={(e) => {
                  backdropHandler(e.target.files[0]);
                }}
                className={styles.backdrop_change}
                id="backdrop_change"
                type="file"
                accept="image/jpeg,image/png,image/webp"
              />
              <label htmlFor="backdrop_change">
                <img
                  className={styles.label_img}
                  src="https://w7.pngwing.com/pngs/386/187/png-transparent-computer-icons-blog-change-angle-text-logo-thumbnail.png"
                  alt="change image label"
                />
              </label>
            </div>
          </>
        ) : (
          <>
            <div className={styles.no_img}></div>
            <div className={styles.backdrop_filter_change}>
              <input
                onChange={(e) => {
                  backdropHandler(e.target.files[0]);
                }}
                className={styles.backdrop_change}
                id="backdrop_change"
                type="file"
                accept="image/jpeg,image/png,image/webp"
              />
              <label htmlFor="backdrop_change">
                <img
                  className={styles.label_img}
                  src="https://w7.pngwing.com/pngs/386/187/png-transparent-computer-icons-blog-change-angle-text-logo-thumbnail.png"
                  alt="change image label"
                />
              </label>
            </div>
          </>
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
              onChange={(e) => {
                profilePhotoHandler(e.target.files[0]);
              }}
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
            <div className={styles.name_section}>
              <label>URL</label>
              <input
                onChange={(e) =>
                  setEditedData({ ...editedData, URL: e.target.value })
                }
                type="text"
                value={editedData.URL}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
