import { CommentSection, SinglePost } from "./SinglePostPageComponents";
import styles from './SinglePostPage.module.css'
import { useDocTitle } from "Hook/useTitle";

export const SinglePostPage = () => {
  useDocTitle('Post | StormMedia')
  return (
    <section>
      <SinglePost />
      <CommentSection />
    </section>
  );
};
