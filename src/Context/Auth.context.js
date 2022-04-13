import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { AlertToast, SuccessToast } from "Components";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const encodedToken = localStorage.getItem("StormMediaToken");
  const [userState, setUserState] = useState({});
  const [effectTrigger, setEffectTrigger] = useState(false);
  const [users, setUsers] = useState([]);

  const login = async (userDetails) => {
    console.log(userDetails);
    try {
      const response = await axios.post(`/api/auth/login`, {
        username: userDetails.username,
        password: userDetails.password,
      });
      // saving the encodedToken in the localStorage
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("StormMediaToken", response.data.encodedToken);
        localStorage.setItem(
          "StormMediaUser",
          response.data.foundUser.firstName
        );
        SuccessToast("Login Successful");
        setEffectTrigger(!effectTrigger);
      }
    } catch (error) {
      AlertToast(`${error.response.data.errors}`);
    }
  };

  const signup = async (userDetails) => {
    try {
      const { data } = await axios.post(`/api/auth/signup`, {
        firstName: userDetails.name,
        password: userDetails.passwordOne,
      });
      // saving the encodedToken in the localStorage
      localStorage.setItem("StormMediaToken", data.encodedToken);
      localStorage.setItem("StormMediaUser", data.createdUser.firstName);
      SuccessToast("Signup Successful");
      setEffectTrigger(!effectTrigger);
    } catch (error) {
      AlertToast(`${error.response.data.errors}`);
    }
  };

  const signout = () => {
    setEffectTrigger(!effectTrigger);
    AlertToast(`Logged Out`);
    localStorage.removeItem("StormMediaToken");
    localStorage.removeItem("StormMediaUser");
    setUserState([]);
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
      setEffectTrigger(!effectTrigger);
    } catch (error) {
      AlertToast(`${error.response.data.errors}`);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("/api/users");
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (encodedToken) {
        try {
          const response = await axios.post("/api/auth/verify", {
            encodedToken: encodedToken,
          });
          console.log(response);
          if (response && response.data) {
            setUserState(response.data.user);
          }
        } catch (error) {
          AlertToast(`${error.response.data.errors}`);
          console.log(error);
        }
      }
    })();
  }, [effectTrigger]);

  return (
    <AuthContext.Provider
      value={{ login, signup, signout, testLogger, userState, encodedToken, users }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };
