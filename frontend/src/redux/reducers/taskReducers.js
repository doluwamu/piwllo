import {
  GET_USER_TASKS_REQUEST,
  GET_USER_TASKS_SUCCESS,
  GET_USER_TASKS_FAIL,
  ADD_TASK_REQUEST,
  ADD_TASK_FAIL,
  ADD_TASK_SUCCESS,
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

export const addTask = (state = {}, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return { loading: true };
    case ADD_TASK_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case ADD_TASK_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
