import Video from "../assets/video.mp4"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>l

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-6 lg:py-0">
          {/* Text Content */}
          <div className="flex-1 lg:pr-10 text-center lg:text-left">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  Find your next{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      perfect
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform scale-x-0 animate-pulse"></div>
                  </span>
                  <br />
                  <span className="text-gray-700">place with ease</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  MERN Estate is the best place to find your next perfect place to live. We have a wide range of
                  properties for you to choose from.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl text-sm md:text-base">
                  <span className="relative z-10">Let's get started</span>
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <button className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-2xl hover:border-blue-500 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm md:text-base">
                  Learn more
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-gray-600 text-sm">Properties</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    5K+
                  </div>
                  <div className="text-gray-600 text-sm">Happy Clients</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-gray-600 text-sm">Cities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="flex-1 mt-10 lg:mt-0 w-full max-w-5xl lg:w-[55%]">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-1">
                <div className="relative rounded-3xl bg-black">
                  <video
                    className="w-full h-full aspect-video object-cover rounded-3xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Decorative Gradient Bubbles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
            </div>

            <div className="mt-4 text-center lg:text-left">
              <p className="text-gray-600 text-sm">
                Watch how we help thousands of families find their dream homes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
