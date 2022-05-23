export const sortPosts = (posts, sortBy) => {
  let finalPosts = [...posts];
  switch (sortBy) {
    case "Trending": {
      finalPosts = finalPosts.sort(
        (a, b) => b.likes.likeCount - a.likes.likeCount
      );
      break;
    }
    case "Latest": {
      finalPosts = finalPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    }
    case "Oldest": {
      finalPosts = finalPosts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    }
    default:
      break;
  }
  return finalPosts;
};
