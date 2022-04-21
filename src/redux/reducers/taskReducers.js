import {
  GET_USER_TASKS_REQUEST,
  GET_USER_TASKS_SUCCESS,
  GET_USER_TASKS_FAIL,
  ADD_TASK_REQUEST,
  ADD_TASK_FAIL,
  ADD_TASK_SUCCESS,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  GET_TASK_BY_RANK_REQUEST,
  GET_TASK_BY_RANK_SUCCESS,
  GET_TASK_BY_RANK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_RESET,
  GET_USER_TASKS_RESET,
  GET_TASK_BY_ID_REQUEST,
  GET_TASK_BY_ID_SUCCESS,
  GET_TASK_BY_ID_FAIL,
  GET_TASK_BY_ID_RESET,
  ADD_TASK_RESET,
  DELETE_TASK_RESET,
  GET_ALL_TASKS_REQUEST,
  GET_ALL_TASKS_SUCCESS,
  GET_ALL_TASKS_FAIL,
  GET_ALL_TASKS_RESET,
} from "../constants/taskConstants";

export const getUserTasks = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_TASKS_REQUEST:
      return { loading: true };
    case GET_USER_TASKS_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case GET_USER_TASKS_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_TASKS_RESET:
      return {};
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
    case ADD_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteTask = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return { loading: true };
    case DELETE_TASK_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case DELETE_TASK_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const getTaskById = (state = {}, action) => {
  switch (action.type) {
    case GET_TASK_BY_ID_REQUEST:
      return { loading: true };
    case GET_TASK_BY_ID_SUCCESS:
      return { loading: false, task: action.payload };
    case GET_TASK_BY_ID_FAIL:
      return { loading: false, getTasksByIdError: action.payload };
    case GET_TASK_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const getTaskByRank = (state = {}, action) => {
  switch (action.type) {
    case GET_TASK_BY_RANK_REQUEST:
      return { loading: true };
    case GET_TASK_BY_RANK_SUCCESS:
      return { loading: false, tasks: action.payload };
    case GET_TASK_BY_RANK_FAIL:
      return { loading: false, getTasksError: action.payload };
    default:
      return state;
  }
};

export const updateTask = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return { loading: true };
    case UPDATE_TASK_SUCCESS:
      return {
        loading: false,
        updateSuccess: true,
        updateMessage: action.payload,
      };
    case UPDATE_TASK_FAIL:
      return {
        loading: false,
        updateSuccess: false,
        updateTasksError: action.payload,
      };
    case UPDATE_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllTasks = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TASKS_REQUEST:
      return { loading: true };
    case GET_ALL_TASKS_SUCCESS:
      return { loading: false, tasks: action.payload };
    case GET_ALL_TASKS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_TASKS_RESET:
      return {};
    default:
      return state;
  }
};
