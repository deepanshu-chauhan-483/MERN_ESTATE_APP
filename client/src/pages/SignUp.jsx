import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth"
import SignUpIllustration from "../assets/signup_img10.svg"
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaSpinner,
  FaExclamationTriangle,
  FaHome,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa"

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      setSuccess(true)
      setTimeout(() => navigate("/sign-in"), 2000)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-md w-full text-center bg-white rounded-xl shadow p-6">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Welcome to Deepanshu Estate! Redirecting to sign in...
          </p>
          <div className="text-blue-600 text-sm animate-pulse font-medium">Redirecting...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-white flex-col md:flex-row">
      {/* Left Illustration Section */}
      <div className="md:w-3/5 hidden w-full bg-gradient-to-br from-blue-200 to-purple-200 md:flex items-center justify-center p-6">
        <img
          src={SignUpIllustration}
          alt="Sign up illustration"
          className="max-w-full max-h-[90vh] object-contain"
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
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Create
                </span>
                <span className="text-gray-800 ml-1">Account</span>
              </h1>
            </Link>
            <p className="text-gray-500 text-sm">Join us to find your dream property</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm shadow-sm"
                id="username"
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-3 text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md flex items-center text-sm">
                <FaExclamationTriangle className="mr-2" />
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center text-sm">
                  <FaSpinner className="animate-spin mr-2" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center text-sm">
                  <FaUserPlus className="mr-2" />
                  Create Account
                </span>
              )}
            </button>

            <div className="text-center text-gray-400 text-xs my-2">— OR —</div>
            <OAuth />
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-600 hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
