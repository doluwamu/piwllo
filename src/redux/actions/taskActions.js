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
  UPDATE_TASK_RESET,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  GET_TASK_BY_ID_REQUEST,
  GET_TASK_BY_ID_SUCCESS,
  GET_TASK_BY_ID_FAIL,
  GET_ALL_TASKS_REQUEST,
  GET_ALL_TASKS_SUCCESS,
  GET_ALL_TASKS_FAIL,
} from "../constants/taskConstants";
import { logoutUser } from "./authActions";
import {
  piwlloUserGetAndDeleteInstance,
  piwlloUserPostAndPutInstance,
} from "./index";

import {
  connectionError,
  connectionErrorMessage,
  jwtErrors,
  serverErrors,
} from "./errors.global";

// Action to get all tasks that belong to a user
export const listUserTasks =
  (keyword = "", pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_USER_TASKS_REQUEST,
      });

      // const {
      //   userLogin: { userDetails },
      // } = getState();

      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userDetails.token}`,
      //   },
      // };

      const { data } = await piwlloUserGetAndDeleteInstance.get(
        `/api/v1/tasks/auser?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: GET_USER_TASKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      debugger;
      if (
        error &&
        error.response &&
        error.response.data.message &&
        error.response.data.message === jwtErrors
      ) {
        dispatch(logoutUser());
      }
      console.log(
        error &&
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.includes(connectionError)
          ? connectionErrorMessage
          : error.message && error.message === serverErrors
          ? connectionErrorMessage
          : error.response.data.message || error.message
      );

      dispatch({
        type: GET_USER_TASKS_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.includes(connectionError)
            ? connectionErrorMessage
            : error.message && error.message === serverErrors
            ? connectionErrorMessage
            : error.response.data.message || error.message,
      });
    }
  };

// Action for user to create task
export const createTask = (task) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_TASK_REQUEST,
    });

    const { data } = await piwlloUserPostAndPutInstance.post(
      "/api/v1/tasks",
      task
    );

    dispatch({
      type: ADD_TASK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data.message &&
      error.response.data.message === jwtErrors
    ) {
      dispatch(logoutUser());
    }
    dispatch({
      type: ADD_TASK_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes(connectionError)
          ? connectionErrorMessage
          : error.message && error.message === serverErrors
          ? connectionErrorMessage
          : error.response.data.message || error.message,
    });
  }
};

// Action to remove task
export const removeTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TASK_REQUEST,
    });

    const { data } = await piwlloUserGetAndDeleteInstance.delete(
      `/api/v1/tasks/task/${id}`
    );

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data.message &&
      error.response.data.message === jwtErrors
    ) {
      dispatch(logoutUser());
    }
    dispatch({
      type: DELETE_TASK_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes(connectionError)
          ? connectionErrorMessage
          : error.message && error.message === serverErrors
          ? connectionErrorMessage
          : error.response.data.message || error.message,
    });
  }
};

// Action to fetch task by provided id
export const fetchTaskById = (taskId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TASK_BY_ID_REQUEST,
    });

    const { data } = await piwlloUserGetAndDeleteInstance.get(
      `/api/v1/tasks/task/${taskId}`
    );

    dispatch({
      type: GET_TASK_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data.message &&
      error.response.data.message === jwtErrors
    ) {
      dispatch(logoutUser());
    }
    dispatch({
      type: GET_TASK_BY_ID_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes(connectionError)
          ? connectionErrorMessage
          : error.message && error.message === serverErrors
          ? connectionErrorMessage
          : error.response.data.message || error.message,
    });
  }
};

// Action to list tasks by rank of importance
export const listTaskByRank =
  (rank, pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_TASK_BY_RANK_REQUEST,
      });

      const { data } = await piwlloUserGetAndDeleteInstance.get(
        `/api/v1/tasks/${rank}?pageNumber=${pageNumber}`
      );

      dispatch({
        type: GET_TASK_BY_RANK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data.message &&
        error.response.data.message === jwtErrors
      ) {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_TASK_BY_RANK_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.includes(connectionError)
            ? connectionErrorMessage
            : error.message && error.message === serverErrors
            ? connectionErrorMessage
            : error.response.data.message || error.message,
      });
    }
  };

// Action to edit task
export const editTask = (task, taskId) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TASK_RESET,
    });

    const { data } = await piwlloUserPostAndPutInstance.put(
      `/api/v1/tasks/task/${taskId}`,
      task
    );

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data.message &&
      error.response.data.message === jwtErrors
    ) {
      dispatch(logoutUser());
    }
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes(connectionError)
          ? connectionErrorMessage
          : error.message && error.message === serverErrors
          ? connectionErrorMessage
          : error.response.data.message || error.message,
    });
  }
};

// Action to get all tasks that belong to a user
export const listAllTasks = (pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_TASKS_REQUEST,
    });

    const { data } = await piwlloUserGetAndDeleteInstance.get(
      `/api/v1/tasks?pageNumber=${pageNumber}`
    );

    dispatch({
      type: GET_ALL_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data.message &&
      error.response.data.message === jwtErrors
    ) {
      dispatch(logoutUser());
    }
    dispatch({
      type: GET_ALL_TASKS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes(connectionError)
          ? connectionErrorMessage
          : error.message && error.message === serverErrors
          ? connectionErrorMessage
          : error.response.data.message || error.message,
    });
  }
};
