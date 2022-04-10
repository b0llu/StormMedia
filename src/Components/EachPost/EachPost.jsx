import * as styles from './EachPost.module.css'

export const EachPost = () => {
    return (
      <div className={styles.post}>
        <img
          src="https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_bigger.jpg"
          alt="User Thumbnail"
        />
        <div className={styles.post_user_details}>
          <div className={styles.user_name}>
            <h1>username</h1>
            <h2>@usertag</h2>
            <h3>9.43 AM</h3>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className={styles.icons_container}>
            <span className="material-icons">chat_bubble</span>
            <span className="material-icons">favorite_border</span>
          </div>
        </div>
      </div>
    );
}