import * as actionTypes from "../action-types";

const initialState = {
  loading: false,
  token: localStorage.getItem("token"),
  user: null,
  // userId: localStorage.getItem("userId"),
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  error: "",
  authError: null,
};
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CREDENTIALS:
    case actionTypes.GET_USER:
      return {
        ...state,
        loading: true,
        user: null,
        token: null,
        isAutheticated: false,
        authError: null,
      };
    case actionTypes.USER_LOADED:
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        authError: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: "You can login now",
      };

    case actionTypes.LOGIN_FAILED:
    case actionTypes.REGISTER_FAILED:
    case actionTypes.SET_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        authError: action.payload,
        error: "",
        token: null,
        user: null,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      // localStorage.removeItem("userId");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: null,
        authError: null,
        error: "",
      };
    default:
      return state;
  }
}

export const ToggleOpenReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case actionTypes.SET_OPEN:
      return {
        ...state,
        open: true,
      };

    case actionTypes.SET_CLOSE:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};
