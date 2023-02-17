import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import App from "../App";
import Scoreboard from "./Scoreboard";
import { AnimatePresence } from "framer-motion";

// Wrapper for our routes to enable exit animations using framer motion
const RoutePaths = (props) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/pokefind" element={<App storage={props.storage} db={props.db} />} />
        <Route path="/scoreboard" element={<Scoreboard db={props.db} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default RoutePaths;
