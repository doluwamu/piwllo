import axios from "axios";
import {
  GET_USER_TASKS_REQUEST,
  GET_USER_TASKS_SUCCESS,
  GET_USER_TASKS_FAIL,
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
