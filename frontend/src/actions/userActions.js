import axiosInstance from '../axios/axiosInstance';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,


  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants';

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data } = await axiosInstance.post(
        '/user/login/', 
        { username, password }
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const register = (name, email, mobile_number, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post(
      '/user/register/',
      {
        username: name, 
        email,
        mobile_number,
        password
      }
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



// export const logout = () => (dispatch) => {
//   localStorage.removeItem('userInfo');
//   dispatch({ type: USER_LOGOUT });
// };
