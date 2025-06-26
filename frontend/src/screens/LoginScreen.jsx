import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { useDispatch, useSelector } from "react-redux";
import GoogleLoginButton from "../components/GoogleLoginButton";

// import { login } from "../actions/userActions";  Redux
import { login } from "../features/userSlice"; // RTK

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("🟢 userInfo from Redux on page load:", userInfo);
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(login(formData.email, formData.password));

    //  RTK thunk expects an object
    dispatch(login({ username: formData.email, password: formData.password }));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AnimatedPage>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-fade-in-up transition-all duration-700">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-purple-200">
                  Sign in to your account to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="emailOrPhone"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter email / phone"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white pr-12 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-purple-300 hover:text-white"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg hover:scale-105 transition-all"
                >
                  Sign In
                </button>
                <hr />
                <GoogleLoginButton />
              </form>

              <div className="mt-8 text-center">
                <p className="text-purple-200">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="ml-2 text-purple-300 hover:text-white font-semibold"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </AnimatedPage>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
