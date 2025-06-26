// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = {
  user: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,  // Handles Login and Register
  },
  preloadedState,
  devTools: true,
});

export default store;




// migrating to Redux Toolkit's configureStore()

// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import { userLoginReducer, userRegisterReducer  } from './reducers/userReducers';

// // Combine reducers
// const rootReducer = combineReducers({
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
// });


// // Load user info from localStorage
// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;


// // Set initial state
// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// };

// // Apply middleware
// const middleware = [thunk];

// // Create store
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
