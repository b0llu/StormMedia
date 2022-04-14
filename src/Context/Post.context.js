import axios from "axios";
import { createContext, useContext } from "react";
import { useAuthContext } from "./Auth.context";
import { useReducerContext } from "./Reducer.context";
import { ADD_POST } from "Utils/Action";
import { AlertToast, SuccessToast } from "Components";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const { encodedToken } = useAuthContext();
  const { dispatch } = useReducerContext();

  const addPost = async (post) => {
    try {
      const reponse = await axios.post(
        "/api/user/posts/",
        { content: post },
        { headers: { authorization: encodedToken } }
      );
      if (reponse.status === 201) {
        dispatch({ type: ADD_POST });
        SuccessToast("Posted")
      }
    } catch (error) {
      AlertToast(error.response.data.message);
    }
  };

  return (
    <PostContext.Provider value={{ addPost }}>{children}</PostContext.Provider>
  );
};

const usePostContext = () => useContext(PostContext);

export { usePostContext, PostProvider };
