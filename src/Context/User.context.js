import axios from "axios";
import { AlertToast, SuccessToast } from "Components";
import { createContext, useContext, useEffect } from "react";
import { ADD_FOLLOWING, REMOVE_FOLLOWING, GET_USERS, EFFECT_TRIGGER } from "Utils/Action";
import { useAuthContext } from "./Auth.context";
import { useReducerContext } from "./Reducer.context";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { encodedToken } = useAuthContext();
  const { dispatch, userTrigger } = useReducerContext();

  const followUser = async (id) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: ADD_FOLLOWING,
          payload: response.data.user.following,
        });
        SuccessToast("Followed");
      }
    } catch (error) {
      AlertToast(error.response.data.message);
    }
  };

  const unfollowUser = async (id) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: REMOVE_FOLLOWING,
          payload: response.data.user.following,
        });
        AlertToast("Unfollowed");
      }
    } catch (error) {
      AlertToast(error.response.data.message);
    }
  };

  const editProfile = async (userData) => {
    try {
      const response = await axios.post(
        "/api/users/edit",
        { userData },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      if (response.status === 201) {
        dispatch({ type: EFFECT_TRIGGER });
        SuccessToast("Profile Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("/api/users");
        if (response.status === 200) {
          dispatch({ type: GET_USERS, payload: response.data.users });
        }
      } catch (error) {
        AlertToast(error.response.data.message);
      }
    })();
  }, [userTrigger]);

  return (
    <UserContext.Provider value={{ followUser, unfollowUser, editProfile }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserProvider };
