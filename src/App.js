import "App.css";
import {
  GridContainer,
  LeftSidebar,
  LogoutBtn,
  RequireAuth,
  RestrictAuth,
  RightSidebar,
  ThemeToggler,
} from "Components";
import MockAPI from "Mockman";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { tokenChecker } from "Redux/Reducers/authSlice";
import { getAllPosts } from "Redux/Reducers/postsSlice";
import { getAllUsers } from "Redux/Reducers/usersSlice";
import { HomePage, LandingPage, ProfilePage, SinglePostPage } from "./Pages";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
    dispatch(tokenChecker());
  }, []);

  return (
    <GridContainer>
      <ThemeToggler />
      <LogoutBtn />
      <ToastContainer />
      {location.pathname !== "/" && <LeftSidebar />}
      <Routes>
        <Route element={<RestrictAuth />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/:username/:postId" element={<SinglePostPage />} />
        </Route>
        <Route path="/mockman" element={<MockAPI />} />
      </Routes>
      {location.pathname !== "/" && <RightSidebar />}
    </GridContainer>
  );
}

export default App;
