import React from "react";
import { useSelector } from "react-redux";
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
import ReviewsListScreen from "./screens/ReviewsListScreen";

const AllRoutes = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!userDetails ? <HomeScreen /> : <TaskManagerScreen />}
        />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/user/:userId/profile" element={<ProfileViewScreen />} />
        <Route
          path="/user/:userId/profile/edit"
          element={<ProfileEditScreen />}
        />
        <Route path="/tasks/:taskRank" element={<TaskRankingScreen />} />
        <Route path="/task/:taskId/edit" element={<EditTaskScreen />} />
        <Route path="/teams/create" element={<CreateTeamScreen />} />
        <Route path="/review" element={<AddRewiewScreen />} />
        <Route path="/reviews" element={<ReviewsListScreen />} />
        <Route path="*" element={<PageNotFoundScreen />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
