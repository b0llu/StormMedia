import { BookmarkPost } from "Components";
import { useDocTitle } from "Hook/useTitle";

export const BookmarksPage = () => {
  useDocTitle("Bookmarks | StormMedia");

  return <BookmarkPost />;
};
