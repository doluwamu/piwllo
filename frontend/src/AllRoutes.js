import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import TaskManagerScreen from "./screens/TaskManagerScreen";
import ImportantTasksScreen from "./screens/ImportantTasksScreen";
import VeryImportantTasksScreen from "./screens/VeryImportantTasksScreen";
import PriorityTasksScreen from "./screens/PriorityTasksScreen";
import ProfileViewScreen from "./screens/ProfileViewScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import AddRewiewScreen from "./screens/AddRewiewScreen";
import CreateTeamScreen from "./screens/CreateTeamScreen";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/user/:userId/profile" element={<ProfileViewScreen />} />
        <Route
          path="/user/:userId/profile/edit"
          element={<ProfileEditScreen />}
        />
        <Route
          path="/task-manager"
          index={true}
          element={<TaskManagerScreen />}
        />
        <Route path="/tasks/important" element={<ImportantTasksScreen />} />
        <Route
          path="/tasks/very-important"
          element={<VeryImportantTasksScreen />}
        />
        <Route path="/tasks/priority" element={<PriorityTasksScreen />} />
        <Route path="/teams/create" element={<CreateTeamScreen />} />
        <Route path="/review" element={<AddRewiewScreen />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
