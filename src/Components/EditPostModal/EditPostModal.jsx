import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "Redux/Reducers/postsSlice";
import styles from "./EditPostModal.module.css";

export const EditPostModal = ({ profilePhoto, content, setPostModal, id }) => {
  const [postDetails, setPostDetails] = useState({ profilePhoto, content, id });
  const dispatch = useDispatch();

  return (
    <div className={styles.editPost_modal}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.left}>
            <span
              onClick={() =>
                setPostModal({
                  modalState: false,
                  profilePhoto: "",
                  content: "",
                  id: "",
                })
              }
              className="material-icons"
            >
              close
            </span>
            <h1>Edit Post</h1>
          </div>
          <button
            onClick={() => {
              dispatch(editPost(postDetails)),
                setPostModal({
                  modalState: false,
                  profilePhoto: "",
                  content: "",
                  id: "",
                });
            }}
          >
            Edit
          </button>
        </div>
        <div className={styles.post_container}>
          <img
            src={
              profilePhoto
                ? profilePhoto
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="user image"
          />
          <div className={styles.post_details}>
            <textarea
              role="textbox"
              type="text"
              placeholder="What's Happening....."
              autoFocus
              rows="3"
              value={postDetails.content}
              onChange={(e) =>
                setPostDetails({ ...postDetails, content: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
