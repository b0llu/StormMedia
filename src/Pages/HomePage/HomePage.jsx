import { NewPost } from 'Components'
import * as styles from './HomePage.module.css'

export const HomePage = () => {
    return (
      <section className={styles.content_container}>
        <div className={styles.header_div}>
          <h1 className={styles.section_header}>Home</h1>
          <span className="material-icons">sort</span>
        </div>
        <NewPost />
      </section>
    );
}