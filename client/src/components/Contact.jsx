"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaUser, FaEnvelope, FaPaperPlane, FaSpinner } from "react-icons/fa"

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/user/${listing.userRef}`)
        const data = await res.json()
        setLandlord(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchLandlord()
  }, [listing.userRef])

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <FaSpinner className="animate-spin text-2xl text-blue-600 mx-auto mb-2" />
        <p className="text-gray-600">Loading contact information...</p>
      </div>
    )
  }

  return (
    <>
      {landlord && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          {/* Landlord Info */}
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mr-4">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Contact Property Owner</h3>
              <p className="text-gray-600">
                Get in touch with <span className="font-semibold text-blue-600">{landlord.username}</span> about{" "}
                <span className="font-semibold">{listing.name}</span>
              </p>
            </div>
          </div>

          {/* Message Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
              <textarea
                name="message"
                id="message"
                rows="4"
                value={message}
                onChange={onChange}
                placeholder={`Hi ${landlord.username}, I'm interested in ${listing.name}. Could you please provide more information about the property?`}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {message.length}/500 characters
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 gap-3">
              <Link
                to={`mailto:${landlord.email}?subject=Inquiry about ${listing.name}&body=${encodeURIComponent(
                  message || `Hi ${landlord.username}, I'm interested in ${listing.name}. Could you please provide more information?`
                )}`}
                className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <FaEnvelope className="mr-2" />
                Send Email Message
              </Link>

              <div className="flex items-center justify-center text-sm text-gray-600">
                <FaPaperPlane className="mr-2" />
                Message will open in your default email client
              </div>
            </div>

            {/* Landlord Contact Info */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{landlord.username}</p>
                  <p className="text-sm text-gray-600">{landlord.email}</p>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                  Verified Owner
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
