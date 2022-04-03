import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_REGISTERATION_FAIL,
  USER_REGISTERATION_REQUEST,
  USER_REGISTERATION_RESET,
  USER_REGISTERATION_SUCCESS,
  USER_LOGOUT,
} from "../constants/authConstants";

export const userRegistration = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTERATION_REQUEST:
      return { loading: true };
    case USER_REGISTERATION_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case USER_REGISTERATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_REGISTERATION_RESET:
      return {};
    default:
      return state;
  }
};

export const userLogin = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGIN_RESET || USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
