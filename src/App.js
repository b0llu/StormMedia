import { GridContainer, LeftSidebar, ThemeToggler } from "Components";
import { Routes, Route } from "react-router-dom";
import { HomePage, LandingPage } from "./Pages";

function App() {
  return (
    <GridContainer>
      <ThemeToggler />
      <LeftSidebar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </GridContainer>
  );
}

export default App;
