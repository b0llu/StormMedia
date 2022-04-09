import { ThemeToggler } from "Components";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./Pages";

function App() {
  return (
    <>
      <ThemeToggler />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
