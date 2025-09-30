import { Link } from "react-router-dom"
import Image1 from "../assets/image1.svg"
import Image2 from "../assets/image2.svg"
import Image3 from "../assets/image3.svg"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About
              </span>{" "}
              MERN Estate
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn more about the platform, the creator, and our mission to empower property seekers across India.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Back to Home
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18m-6 6l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Who We Are */}
        <section className="flex flex-col md:flex-row items-center bg-white rounded-3xl p-8 md:p-12 shadow-xl gap-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={Image1}
              alt="About MERN Estate"
              className="w-64 h-64 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              MERN Estate is a real estate web app built by{" "}
              <span className="text-blue-600 font-medium">Deepanshu Chauhan</span>, a passionate student developer.
              This project was created to practice full-stack development and solve real-world problems with modern
              tools.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="flex flex-col-reverse md:flex-row items-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl gap-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We aim to deliver a modern, fast, and user-friendly property platform. Whether you're a buyer, renter,
              or seller — our goal is to simplify your journey with intelligent features, clean design, and reliable
              tools.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={Image2}
              alt="Our Mission"
              className="w-64 h-64 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="flex flex-col md:flex-row items-center bg-white rounded-3xl p-8 md:p-12 shadow-xl gap-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={Image3}
              alt="Tech Stack"
              className="w-64 h-64 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with 💻</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              MERN Estate runs on the full MERN stack:{" "}
              <span className="text-purple-600 font-semibold">MongoDB, Express, React, and Node.js</span>. It
              features JWT-based auth, Firebase Google login, and Tailwind CSS for responsive styling.
            </p>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start exploring properties today!</h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse listings, discover deals, and connect with sellers instantly.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Search Properties
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
