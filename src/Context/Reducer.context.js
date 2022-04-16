import { createContext, useContext, useReducer } from "react";
import { ReducerCases } from "Reducer/ReducerCases";

const ReducerContext = createContext();

const ReducerProvider = ({ children }) => {
  const [
    {
      loading,
      posts,
      effectTrigger,
      users,
      userFollowing,
      userFollowers,
      userTrigger,
    },
    dispatch,
  ] = useReducer(ReducerCases, {
    loading: false,
    effectTrigger: false,
    posts: [],
    users: [],
    userFollowing: [],
    userFollowers: [],
    userTrigger: false,
  });

  return (
    <ReducerContext.Provider
      value={{
        loading,
        posts,
        effectTrigger,
        users,
        userFollowing,
        userFollowers,
        userTrigger,
        dispatch,
      }}
    >
      {children}
    </ReducerContext.Provider>
  );
};

const useReducerContext = () => useContext(ReducerContext);

export { useReducerContext, ReducerProvider };
