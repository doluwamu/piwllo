import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index={true} element={<HomeScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
