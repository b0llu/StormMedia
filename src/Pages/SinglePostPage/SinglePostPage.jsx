import { CommentSection, SinglePost } from "./SinglePostPageComponents";
import * as styles from "./SinglePostPage.module.css";

export const SinglePostPage = () => {
  return (
    <section>
      <SinglePost />
      <CommentSection />
    </section>
  );
};
