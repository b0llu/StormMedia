import "App.css";
import {
  GridContainer,
  LeftSidebar,
  RequireAuth,
  RestrictAuth,
  RightSidebar,
  ThemeToggler,
} from "Components";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage, LandingPage } from "./Pages";

function App() {
  const location = useLocation()

  return (
    <GridContainer>
      <ThemeToggler />
      {location.pathname !== "/" && <LeftSidebar />}
      <Routes>
        <Route element={<RestrictAuth />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
      {location.pathname !== "/" && <RightSidebar />}
    </GridContainer>
  );
}

export default App;
