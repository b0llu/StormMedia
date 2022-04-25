import axios from "axios";
import { createContext, useContext } from "react";
import { useAuthContext } from "./Auth.context";
import { useReducerContext } from "./Reducer.context";
import { ADD_POST } from "Utils/Action";
import { AlertToast, SuccessToast } from "Components";
import { useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const { encodedToken } = useAuthContext();
  const { dispatch } = useReducerContext();
  const [comments, setComments] = useState([]);

  const addPost = async (post) => {
    try {
      const response = await axios.post(
        "/api/user/posts/",
        { content: post },
        { headers: { authorization: encodedToken } }
      );
      if (response.status === 201) {
        dispatch({ type: ADD_POST, payload: response.data.posts });
        SuccessToast("Posted");
      }
    } catch (error) {
      AlertToast(error.response.data.message);
    }
  };

  const addComment = (commentData) => {
    setComments([...comments, commentData]);
    SuccessToast("Commented");
  };

  const likePost = async (id) => {
    try {
      const response = await axios.post(
        `/api/posts/like/${id}`,
        {},
        { headers: { authorization: encodedToken } }
      );
      if (response.status === 201) {
        dispatch({ type: ADD_POST, payload: response.data.posts });
        SuccessToast("Liked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dislikePost = async (id) => {
    try {
      const response = await axios.post(
        `/api/posts/dislike/${id}`,
        {},
        { headers: { authorization: encodedToken } }
      );
      if (response.status === 201) {
        dispatch({ type: ADD_POST, payload: response.data.posts });
        AlertToast("Disliked");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{ addPost, addComment, comments, likePost, dislikePost }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePostContext = () => useContext(PostContext);

export { usePostContext, PostProvider };
