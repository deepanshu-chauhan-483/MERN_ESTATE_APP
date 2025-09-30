"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { useSelector } from "react-redux"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css/bundle"
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaHeart,
  FaEye,
  FaCalendarAlt,
} from "react-icons/fa"
import Contact from "../components/Contact"

export default function Listing() {
  SwiperCore.use([Navigation, Pagination, Autoplay])
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contact, setContact] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if (data.success === false) {
          setError(true)
          setLoading(false)
          return
        }
        setListing(data)
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.listingId])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">We couldn't load this property. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!listing) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Image Carousel Section */}
      <div className="relative w-full py-4 px-10 rounded-2xl">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
          className="h-[400px] md:h-[600px] lg:h-[700px]"
        >
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={url}>
              <div className="relative h-full">
                <div
                  className="h-full bg-cover bg-center rounded-2xl "
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-black/20"></div>
                </div>
                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-2xl text-sm shadow-2xl">
                  {index + 1} / {listing.imageUrls.length}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <FaShare className="text-gray-700" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
            <FaHeart className="text-gray-700 hover:text-red-500" />
          </button>
        </div>

        {/* Share Confirmation */}
        {copied && (
          <div className="fixed top-20 right-4 z-20 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            ✓ Link copied to clipboard!
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{listing.name}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    <span className="text-lg">{listing.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    ${listing.offer ? listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")}
                    {listing.type === "rent" && <span className="text-lg text-gray-500"> /month</span>}
                  </div>
                  {listing.offer && (
                    <div className="text-sm text-gray-500 line-through">
                      ${listing.regularPrice.toLocaleString("en-US")}
                    </div>
                  )}
                </div>
              </div>

              {/* Property Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  listing.type === "rent" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-green-100 text-green-800"
                }`}>
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </span>
                {listing.offer && (
                  <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                    ${(+listing.regularPrice - +listing.discountPrice).toLocaleString()} OFF
                  </span>
                )}
                <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <FaEye className="mr-1" /> Recently viewed
                </span>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <FaBed className="text-2xl text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {listing.bedrooms} {listing.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <FaBath className="text-2xl text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {listing.bathrooms} {listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <FaParking className="text-2xl text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {listing.parking ? "Parking" : "No Parking"}
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <FaChair className="text-2xl text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {listing.furnished ? "Furnished" : "Unfurnished"}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{listing.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Contact Card */}
              {currentUser && listing.userRef !== currentUser._id && (
                <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in this property?</h3>
                  <p className="text-gray-600 mb-6">Get in touch with the landlord for more information or to schedule a viewing.</p>
                  
                  {!contact ? (
                    <button
                      onClick={() => setContact(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Contact Landlord
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <Contact listing={listing} />
                      <button
                        onClick={() => setContact(false)}
                        className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Property Highlights</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-semibold text-gray-900 capitalize">{listing.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bedrooms</span>
                    <span className="font-semibold text-gray-900">{listing.bedrooms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bathrooms</span>
                    <span className="font-semibold text-gray-900">{listing.bathrooms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Parking</span>
                    <span className="font-semibold text-gray-900">{listing.parking ? "Available" : "Not Available"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Furnished</span>
                    <span className="font-semibold text-gray-900">{listing.furnished ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
