import { createContext, useContext, useReducer } from "react";
import { ReducerCases } from "Reducer/ReducerCases";

const ReducerContext = createContext();

const ReducerProvider = ({ children }) => {
  const [{ loading, effectTrigger, users, userFollowing }, dispatch] =
    useReducer(ReducerCases, {
      loading: false,
      effectTrigger: false,
      users: [],
      userFollowing: [],
    });

  return (
    <ReducerContext.Provider
      value={{
        loading,
        effectTrigger,
        users,
        userFollowing,
        dispatch,
      }}
    >
      {children}
    </ReducerContext.Provider>
  );
};

const useReducerContext = () => useContext(ReducerContext);

export { useReducerContext, ReducerProvider };
