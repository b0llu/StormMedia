import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { AlertToast, SuccessToast } from "Components";
import { useReducerContext } from "./Reducer.context";
import {
  ADD_FOLLOWERS,
  ADD_FOLLOWING,
  RESET_FOLLOW_STATUS,
  EFFECT_TRIGGER,
} from "Utils/Action";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const encodedToken = localStorage.getItem("StormMediaToken");
  const [userState, setUserState] = useState({});
  const { dispatch, effectTrigger } = useReducerContext();

  const login = async (userDetails) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        username: userDetails.username,
        password: userDetails.password,
      });
      // saving the encodedToken in the localStorage
      if (response.status === 200) {
        localStorage.setItem("StormMediaToken", response.data.encodedToken);
        localStorage.setItem(
          "StormMediaUser",
          response.data.foundUser.firstName
        );
        SuccessToast("Login Successful");
        dispatch({ type: EFFECT_TRIGGER });
      }
    } catch (error) {
      AlertToast(`${error.response.data.errors}`);
    }
  };

  const signup = async (userDetails) => {
    try {
      const { data } = await axios.post(`/api/auth/signup`, {
        firstName: userDetails.name,
        username: userDetails.username,
        password: userDetails.passwordOne,
      });
      // saving the encodedToken in the localStorage
      localStorage.setItem("StormMediaToken", data.encodedToken);
      localStorage.setItem("StormMediaUser", data.createdUser.firstName);
      SuccessToast("Signup Successful");
      dispatch({ type: EFFECT_TRIGGER });
    } catch (error) {
      AlertToast(`${error.response.data.errors}`);
    }
  };

  const signout = () => {
    dispatch({ type: EFFECT_TRIGGER });
    AlertToast(`Logged Out`);
    localStorage.removeItem("StormMediaToken");
    localStorage.removeItem("StormMediaUser");
    setUserState([]);
    dispatch({ type: RESET_FOLLOW_STATUS });
  };

  const testLogger = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        username: "TheAdmin",
        password: "Admin123",
      });
      localStorage.setItem("StormMediaToken", data.encodedToken);
      localStorage.setItem("StormMediaUser", data.foundUser.firstName);
      SuccessToast("Login Successful");
      dispatch({ type: EFFECT_TRIGGER });
    } catch (error) {
      AlertToast(`${error.response.data.errors}`);
    }
  };

  useEffect(() => {
    (async function () {
      if (encodedToken) {
        try {
          const response = await axios.post("/api/auth/verify", {
            encodedToken: encodedToken,
          });
          if (response && response.data) {
            setUserState(response.data.user);
            dispatch({
              type: ADD_FOLLOWING,
              payload: response.data.user.following,
            });
            dispatch({
              type: ADD_FOLLOWERS,
              payload: response.data.user.followers,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [effectTrigger]);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        signout,
        testLogger,
        userState,
        encodedToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };
