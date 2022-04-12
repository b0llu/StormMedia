import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./Auth.context";
import { useReducerContext } from "./Reducer.context";
import { ADD_POST } from "Utils/Action";

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider value={{ addPost }}>{children}</PostContext.Provider>
  );
};

const usePostContext = () => useContext(PostContext);

export { usePostContext, PostProvider };
