import * as actionTypes from "../action-types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// "https://trade-backend-daari.ondigitalocean.app/api/registration/login"

const BASE_URL =
  "https://webtrader.plus";

// AUTHENTICATIONS
// export const loadUser = (userId) => async (dispatch) => {
//   dispatch({
//     type: actionTypes.GET_USER,
//   });
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
//   try {
//     const { data } = await axios.get(
//       `${BASE_URL}/api/profile/single/${userId}`
//     );
//     dispatch({
//       type: actionTypes.USER_LOADED,
//       payload: data,
//     });
//   } catch (error) {
//     // console.log(error);
//     dispatch({
//       type: actionTypes.SET_ERROR,
//       payload: error.message,
//     });
//   }
// };

export const loadUser = (timer) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_USER,
  });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const { data } = await axios.get(`${BASE_URL}/api/user`);

  dispatch({
    type: actionTypes.USER_LOADED,
    payload: data,
  });
};

export const registerUser = (profile) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CREDENTIALS,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(profile);
  try {
    const { status } = await axios.post(
      `${BASE_URL}/api/v1/auth/register`,
      body,
      config
    );

    if (status === 200) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAILED,
      payload: error.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CREDENTIALS,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      body,
      config
    );

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        token: data.access_token,
      },
    });

    dispatch(loadUser());
    logoutOnExpiry(dispatch, data.expires_in);
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAILED,
      payload: error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

const logoutOnExpiry = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer * 1000);
};
