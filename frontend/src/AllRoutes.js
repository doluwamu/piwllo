import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import TaskManagerScreen from "./screens/TaskManagerScreen";
import ProfileViewScreen from "./screens/ProfileViewScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import AddRewiewScreen from "./screens/AddRewiewScreen";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" index={true} element={<HomeScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/task-manager" element={<TaskManagerScreen />} />
        <Route path="/user/profile" element={<ProfileViewScreen />} />
        <Route path="/user/profile/edit" element={<ProfileEditScreen />} />
        <Route path="/review" element={<AddRewiewScreen />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
