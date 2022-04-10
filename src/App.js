import "App.css";
import {
  GridContainer,
  LeftSidebar,
  RequireAuth,
  RestrictAuth,
  RightSidebar,
  ThemeToggler,
} from "Components";
import { Routes, Route } from "react-router-dom";
import { HomePage, LandingPage } from "./Pages";

function App() {
  return (
    <GridContainer>
      <ThemeToggler />
      <LeftSidebar />
      <Routes>
        <Route element={<RestrictAuth />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
      <RightSidebar />
    </GridContainer>
  );
}

export default App;
