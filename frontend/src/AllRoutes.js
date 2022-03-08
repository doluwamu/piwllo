import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import TaskManagerScreen from "./screens/TaskManagerScreen";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index={true} element={<HomeScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/task-manager" element={<TaskManagerScreen />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
