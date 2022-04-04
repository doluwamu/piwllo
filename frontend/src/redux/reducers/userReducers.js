import {
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_RESET,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_RESET,
  UPDATE_USER_PROFILE_SUCCESS,
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
