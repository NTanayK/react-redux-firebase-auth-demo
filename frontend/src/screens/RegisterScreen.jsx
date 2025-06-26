import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
// import { register } from "../actions/userActions";
import { register } from "../features/userSlice";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(
      register(
        formData.name,
        formData.email,
        formData.mobile_number,
        formData.password
      )
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AnimatedPage>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-fade-in-up transition-all duration-700">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Create Account
                </h1>
                <p className="text-purple-200">Join us today and get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile_number"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your mobile number"
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
                      onChange={handleChange}
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

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-purple-200 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white pr-12 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg hover:scale-105 transition-all"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-purple-200">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ml-2 text-purple-300 hover:text-white font-semibold"
                  >
                    Sign In
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

export default RegisterScreen;
