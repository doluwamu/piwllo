import axios from "axios";
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
} from "../constants/taskConstants";
import { logoutUser } from "./authActions";

// Action to get all tasks that belong to a user
export const listUserTasks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_TASKS_REQUEST,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get("/api/v1/tasks/auser", config);

    dispatch({
      type: GET_USER_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: GET_USER_TASKS_FAIL,
      payload:
        error.response.data.message ===
        "Operation `users.findOne()` buffering timed out after 10000msx"
          ? "Ooops, something went wrong :("
          : error.response.data.message ===
            "Operation `users.findOne()` buffering timed out after 10000msx"
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};

// Action for user to create task
export const createTask = (task, rank) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TASK_REQUEST,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.post("/api/v1/tasks", { task, rank }, config);

    dispatch({
      type: ADD_TASK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: ADD_TASK_FAIL,
      payload:
        error.response.data.message ===
        "Operation `users.findOne()` buffering timed out after 10000msx"
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};

// Action to remove task
export const removeTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_TASK_REQUEST,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/tasks/task/${id}`, config);

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: DELETE_TASK_FAIL,
      payload:
        error.response.data.message ===
        "Operation `users.findOne()` buffering timed out after 10000msx"
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};

// Action to fetch task by provided id
export const fetchTaskById = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TASK_BY_ID_REQUEST,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/tasks/task/${taskId}`, config);

    dispatch({
      type: GET_TASK_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: GET_TASK_BY_ID_FAIL,
      payload:
        error.response.data.message ===
        "Operation `users.findOne()` buffering timed out after 10000msx"
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};

// Action to list tasks by rank of importance
export const listTaskByRank = (rank) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TASK_BY_RANK_REQUEST,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/tasks/${rank}`, config);

    dispatch({
      type: GET_TASK_BY_RANK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: GET_TASK_BY_RANK_FAIL,
      payload:
        error.response.data.message ===
        "Operation `users.findOne()` buffering timed out after 10000msx"
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};

// Action to edit task
export const editTask = (task, rank, taskId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASK_RESET,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/v1/tasks/task/${taskId}`,
      { task, rank },
      config
    );

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        error.response.data.message ===
        "Operation `users.findOne()` buffering timed out after 10000msx"
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};
