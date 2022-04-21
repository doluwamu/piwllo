import {
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_RESET,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_RESET,
  UPDATE_USER_PROFILE_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
} from "../constants/userConstants";

export const getUserProfile = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return { loading: true };
    case GET_USER_PROFILE_SUCCESS:
      return { loading: false, profileInfo: action.payload };
    case GET_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateUserProfile = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_USER_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_USER_PROFILE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllUsers = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case GET_USERS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_USERS_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteUser = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, message: action.payload };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_USER_RESET:
      return {};
    default:
      return state;
  }
};
