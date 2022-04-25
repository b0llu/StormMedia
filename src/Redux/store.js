import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Reducers/postsSlice";
import userReducer from "./Reducers/usersSlice";
import authReducer from "./Reducers/authSlice";

const reducer = {
  auth: authReducer,
  posts: postReducer,
  users: userReducer,
};

const store = configureStore({
  reducer: reducer,
});

export default store;
