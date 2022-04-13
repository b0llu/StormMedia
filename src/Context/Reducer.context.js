import { createContext, useContext, useReducer } from "react";
import { ReducerCases } from "Reducer/ReducerCases";

const ReducerContext = createContext();

const ReducerProvider = ({ children }) => {
  const [{ loading, effectTrigger }, dispatch] = useReducer(ReducerCases, {
    loading: false,
    effectTrigger: false,
  });

  return (
    <ReducerContext.Provider
      value={{
        loading,
        effectTrigger,
        dispatch,
      }}
    >
      {children}
    </ReducerContext.Provider>
  );
};

const useReducerContext = () => useContext(ReducerContext);

export { useReducerContext, ReducerProvider };
