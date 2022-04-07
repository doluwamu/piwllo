import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import TaskManagerScreen from "./screens/TaskManagerScreen";
import TaskRankingScreen from "./screens/TaskRankingScreen";
import ProfileViewScreen from "./screens/ProfileViewScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import AddRewiewScreen from "./screens/AddRewiewScreen";
import CreateTeamScreen from "./screens/CreateTeamScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import PageNotFoundScreen from "./screens/PageNotFound";

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
        <Route path="/tasks/:taskRank" element={<TaskRankingScreen />} />
        <Route path="/task/:taskId/edit" element={<EditTaskScreen />} />
        <Route path="/teams/create" element={<CreateTeamScreen />} />
        <Route path="/review" element={<AddRewiewScreen />} />
        <Route path="*" element={<PageNotFoundScreen />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
