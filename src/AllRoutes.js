import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import SigninScreen from "./screens/SigninScreen";
import VerifyEmailScreen from "./screens/VerifyEmailScreen";
import TaskManagerScreen from "./screens/TaskManagerScreen";
import TaskRankingScreen from "./screens/TaskRankingScreen";
import ProfileViewScreen from "./screens/ProfileViewScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import AddRewiewScreen from "./screens/AddRewiewScreen";
import CreateTeamScreen from "./screens/CreateTeamScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import PageNotFoundScreen from "./screens/PageNotFound";
import ReviewsListScreen from "./screens/ReviewsListScreen";
import UsersListScreen from "./screens/UsersListScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import TasksListScreen from "./screens/TasksListScreen";
import TasksSearchScreen from "./screens/TasksSearchScreen";

const AllRoutes = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetails } = userLogin;

  return (
    <Router>
      <Routes>
        {/* General */}

        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route
          path="/password-reset/verify-email"
          element={<VerifyEmailScreen />}
        />
        <Route path="/password-reset" element={<ResetPasswordScreen />} />

        {/* Protected */}
        <Route path="/page/:pageNumber" element={<TaskManagerScreen />} />

        <Route path="/task/search/:keyword" element={<TasksSearchScreen />} />
        <Route
          path="/task/search/:keyword/page/:pageNumber"
          element={<TasksSearchScreen />}
        />

        <Route path="/user/:userId/profile" element={<ProfileViewScreen />} />
        <Route
          path="/user/:userId/profile/edit"
          element={<ProfileEditScreen />}
        />

        <Route path="/tasks/:taskRank" element={<TaskRankingScreen />} />
        <Route
          path="/tasks/:taskRank/:pageNumber"
          element={<TaskRankingScreen />}
        />

        <Route path="/task/:taskId/edit" element={<EditTaskScreen />} />
        <Route path="/teams/create" element={<CreateTeamScreen />} />
        <Route path="/review" element={<AddRewiewScreen />} />

        {/* Admins only */}
        <Route path="/reviews" element={<ReviewsListScreen />} />
        <Route path="/users/list" element={<UsersListScreen />} />
        <Route path="/tasks-list" element={<TasksListScreen />} />
        <Route path="/tasks-list/:pageNumber" element={<TasksListScreen />} />

        {/* Unexisting pages */}
        <Route
          path={"/"}
          element={!userDetails ? <HomeScreen /> : <TaskManagerScreen />}
        />
        <Route path="*" element={<PageNotFoundScreen />} />

        {/* others */}
      </Routes>
    </Router>
  );
};

export default AllRoutes;
