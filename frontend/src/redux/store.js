import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLogin,
  userRegistration,
  verifyEmail,
  resetPassword,
} from "./reducers/authReducers";
import {
  getUserTasks,
  addTask,
  deleteTask,
  getTaskByRank,
  getTaskById,
  updateTask,
} from "./reducers/taskReducers";
import { getUserProfile, updateUserProfile } from "./reducers/userReducers";
import { addReview, getReviews, deleteReview } from "./reducers/reviewReducers";

const reducer = combineReducers({
  userLogin,
  userRegistration,
  getUserTasks,
  getTaskById,
  getTaskByRank,
  addTask,
  deleteTask,
  updateTask,
  getUserProfile,
  updateUserProfile,
  addReview,
  getReviews,
  deleteReview,
  verifyEmail,
  resetPassword,
});

const userDetailsFromStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const preloadedState = {
  userLogin: { userDetails: userDetailsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
