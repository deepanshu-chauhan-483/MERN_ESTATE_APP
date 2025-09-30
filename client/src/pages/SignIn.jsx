"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import OAuth from "../components/OAuth"
import SignInIllustration from "../assets/signup_img6.svg" // ← make sure this exists
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaHome,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa"

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white md:flex-row">
      {/* Left Illustration */}
      <div className="md:w-3/5 hidden w-full bg-gradient-to-br from-blue-200 to-purple-200 md:flex items-center justify-center p-6">
        <img
          src={SignInIllustration}
          alt="Sign in illustration"
          className="max-w-full max-h-[50vh] object-contain"
        />
      </div>

      {/* Right Form Section */}
      <div className="md:w-2/5 md:mt-0 mt-10 w-full flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl mr-2">
                <FaHome className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome</span>
                <span className="text-gray-800 ml-1">Back</span>
              </h1>
            </Link>
            <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm shadow-sm"
                id="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm shadow-sm"
                id="password"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot your password?
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md flex items-center text-sm">
                <FaExclamationTriangle className="mr-2" />
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center text-sm">
                  <FaSpinner className="animate-spin mr-2" />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center text-sm">
                  <FaSignInAlt className="mr-2" />
                  Sign In
                </span>
              )}
            </button>

            <div className="text-center text-gray-400 text-xs my-1">— OR —</div>
            <OAuth />
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 hover:underline font-medium">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
