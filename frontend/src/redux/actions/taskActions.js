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
} from "../constants/taskConstants";

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
    dispatch({
      type: GET_USER_TASKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

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
    dispatch({
      type: ADD_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};

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
    dispatch({
      type: DELETE_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};
