import {
  GET_USER_TASKS_REQUEST,
  GET_USER_TASKS_SUCCESS,
  GET_USER_TASKS_FAIL,
} from "../constants/taskConstants";

export const getUserTasks = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_TASKS_REQUEST:
      return { loading: true };
    case GET_USER_TASKS_SUCCESS:
      return { loading: false, tasks: action.payload };
    case GET_USER_TASKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
