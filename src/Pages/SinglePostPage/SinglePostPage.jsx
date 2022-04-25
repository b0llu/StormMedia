import { CommentSection, SinglePost } from "./SinglePostPageComponents";
import styles from './SinglePostPage.module.css'

export const SinglePostPage = () => {
  return (
    <section>
      <SinglePost />
      <CommentSection />
    </section>
  );
};
