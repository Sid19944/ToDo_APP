import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
