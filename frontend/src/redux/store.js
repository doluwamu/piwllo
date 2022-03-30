import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLogin, userRegistration } from "./reducers/authReducers";
import { getUserTasks } from "./reducers/taskReducers";

const reducer = combineReducers({
  userLogin,
  userRegistration,
  getUserTasks,
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
