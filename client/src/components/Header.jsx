"use client"

import { FaSearch, FaUser, FaHome, FaInfoCircle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl mr-3">
                <FaHome className="text-white text-xl" />
              </div>
              <h1 className="font-bold text-xl md:text-2xl">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MERN
                </span>
                <span className="text-gray-800 ml-1">Estate</span>
              </h1>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 md:mx-8">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <FaSearch className="text-sm" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1 md:space-x-4">
            <Link
              to="/"
              className="hidden md:flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
            >
              <FaHome className="mr-2" />
              Home
            </Link>
            <Link
              to="/about"
              className="hidden md:flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
            >
              <FaInfoCircle className="mr-2" />
              About
            </Link>

            {/* Profile/Sign In */}
            <Link to="/profile" className="flex items-center">
              {currentUser ? (
                <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
                  <img
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-md"
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt="profile"
                  />
                  <span className="hidden md:block text-gray-700 font-medium">{currentUser.username}</span>
                </div>
              ) : (
                <div className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium">
                  <FaUser className="mr-2" />
                  <span>Sign In</span>
                </div>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
