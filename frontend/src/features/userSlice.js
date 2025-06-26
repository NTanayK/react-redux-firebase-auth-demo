// Everything in one place: actions + reducer (RTK) Redux ToolKit

// useCase: Classic Redux was becoming verbose and harder to maintain. 
// RTK simplifies logic with createSlice, uses Immer for immutable updates, and eliminates boilerplate like action constants. 
// This helped me reduce bugs and onboard new developers faster.


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios/axiosInstance';


const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

// action

export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/user/login/', { username, password });
      console.log("🟢 Login API response:", data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
        console.log("🔴 Login error:", error);
      return rejectWithValue(
        error.response?.data?.detail || error.message
      );
    }
  }
);


export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, mobile_number, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/user/register/', {
        username: name,
        email,
        mobile_number,
        password,
      });

      localStorage.setItem('userInfo', JSON.stringify(data)); 
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || error.message
      );
    }
  }
);


export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (idToken, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/firebase-login/', { idToken });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Google login failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('userInfo');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("✅ Redux updated with:", action.payload);
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("❌ Login failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
      .addCase(register.fulfilled, (state, action) => {
        console.log("✅ Redux updated with:", action.payload);
          state.loading = false;
          state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.log("❌ Register failed:", action.payload);
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        console.log("✅ Redux updated with For Google Login:", action.payload);
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        console.log("❌ Login With Google failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { logout } = userSlice.actions;
export default userSlice.reducer;       // importing as import userReducer in store.js



// basic reducer

// const userSlice = createSlice({
//   name: 'userLogin',
//   initialState,
//   reducers: {
//     loginRequest(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.userInfo = action.payload;
//     },
//     loginFail(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout(state) {
//       return initialState;
//     },
//   },
// });


// export const { loginRequest, loginSuccess, loginFail, logout } = userSlice.actions;
// export default userSlice.reducer;



