import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
