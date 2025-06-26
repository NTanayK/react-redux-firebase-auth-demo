import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import axiosInstance from "../axios/axiosInstance";
import { loginWithGoogle } from "../features/userSlice";
import { useDispatch } from "react-redux";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  //   const handleGoogleLogin = async () => {
  //     try {
  //       const result = await signInWithPopup(auth, googleProvider);
  //       const user = result.user;
  //       const idToken = await user.getIdToken();

  //       const { data } = await axiosInstance.post("/user/auth/firebase-login/", {
  //         idToken,
  //       });

  //       console.log("✅ Backend response:", data);

  //       // Optional: Save data.token in Redux/localStorage
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //     } catch (error) {
  //       console.error("❌ Google Login Error:", error.message);
  //     }
  //   };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Dispatch to backend and update Redux
      dispatch(loginWithGoogle(idToken));
    } catch (error) {
      console.error("❌ Google Login Error:", error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC8UIU_Gr-DPz6nMHszhUk-ppwrRkFOQUs",
//   authDomain: "empower-1211.firebaseapp.com",
//   projectId: "empower-1211",
//   storageBucket: "empower-1211.firebasestorage.app",
//   messagingSenderId: "591991209544",
//   appId: "1:591991209544:web:5ed2ee6b03f7867ce3227d",
//   measurementId: "G-N15T86H5LG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
