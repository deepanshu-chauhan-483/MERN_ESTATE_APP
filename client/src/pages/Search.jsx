"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ListingItem from "../components/ListingItem"
import skyline from "../assets/skyline.svg"
import {
  FaSearch,
  FaFilter,
  FaHome,
  FaCar,
  FaCouch,
  FaTags,
  FaSortAmountDown,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa"

export default function Search() {
  const navigate = useNavigate()
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  })
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get("searchTerm")
    const typeFromUrl = urlParams.get("type")
    const parkingFromUrl = urlParams.get("parking")
    const furnishedFromUrl = urlParams.get("furnished")
    const offerFromUrl = urlParams.get("offer")
    const sortFromUrl = urlParams.get("sort")
    const orderFromUrl = urlParams.get("order")

    if (
      searchTermFromUrl || typeFromUrl || parkingFromUrl ||
      furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      })
    }

    const fetchListings = async () => {
      setLoading(true)
      setShowMore(false)
      const searchQuery = urlParams.toString()
      const res = await fetch(`/api/listing/get?${searchQuery}`)
      const data = await res.json()
      setShowMore(data.length > 8)
      setListings(data)
      setLoading(false)
    }

    fetchListings()
  }, [location.search])

  const handleChange = (e) => {
    if (["all", "rent", "sale"].includes(e.target.id)) {
      setSidebardata({ ...sidebardata, type: e.target.id })
    } else if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value })
    } else if (["parking", "furnished", "offer"].includes(e.target.id)) {
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.checked })
    } else if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_")
      setSidebardata({ ...sidebardata, sort, order })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams()
    Object.entries(sidebardata).forEach(([key, val]) => urlParams.set(key, val))
    navigate(`/search?${urlParams.toString()}`)
    setShowFilters(false)
  }

  const onShowMoreClick = async () => {
    const startIndex = listings.length
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("startIndex", startIndex)
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`)
    const data = await res.json()
    if (data.length < 9) setShowMore(false)
    setListings([...listings, ...data])
  }

  const clearFilters = () => {
    setSidebardata({
      searchTerm: "",
      type: "all",
      parking: false,
      furnished: false,
      offer: false,
      sort: "created_at",
      order: "desc",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex flex-col lg:flex-row max-w-[95rem] mx-auto px-4">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden p-2 bg-white shadow-sm">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-700"
          >
            <FaFilter className="mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Sidebar Filters */}
        <div
          className={`lg:w-96 bg-white shadow-xl lg:shadow-none ${showFilters ? "block" : "hidden lg:block"} lg:min-h-screen`}
        >
          <div className="p-4 lg:p-6">
            <div className="flex items-center mb-4">
              <FaSearch className="text-xl text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Search Filters</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Search Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="searchTerm"
                    placeholder="Location or name"
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    value={sidebardata.searchTerm}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaHome className="inline mr-1" /> Property Type
                </label>
                <div className="space-y-2">
                  {["all", "rent", "sale"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        id={type}
                        name="type"
                        onChange={handleChange}
                        checked={sidebardata.type === type}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700 capitalize">{type === "all" ? "All" : `For ${type}`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Offers */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaTags className="inline mr-1" /> Special Offers
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="offer"
                    checked={sidebardata.offer}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">Show only offers</span>
                </label>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="parking"
                      checked={sidebardata.parking}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <FaCar className="text-gray-500" />
                    <span className="text-gray-700">Parking</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="furnished"
                      checked={sidebardata.furnished}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <FaCouch className="text-gray-500" />
                    <span className="text-gray-700">Furnished</span>
                  </label>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaSortAmountDown className="inline mr-1" /> Sort By
                </label>
                <select
                  id="sort_order"
                  onChange={handleChange}
                  value={`${sidebardata.sort}_${sidebardata.order}`}
                  className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                >
                  <option value="regularPrice_desc">Price: High to Low</option>
                  <option value="regularPrice_asc">Price: Low to High</option>
                  <option value="createdAt_desc">Newest First</option>
                  <option value="createdAt_asc">Oldest First</option>
                </select>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                  Search Properties
                </button>
                <button type="button" onClick={clearFilters} className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300">
                  Clear All
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1  lg:ml-8 mt-4 lg:mt-0">
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 mb-4 mt-2 shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 ">Search Results</h2>
            <p className="text-gray-600">
              {!loading && listings.length > 0 && `Found ${listings.length} properties`}
              {!loading && listings.length === 0 && "No properties found"}
              {loading && "Loading..."}
            </p>
            <img src={skyline} alt="skyline" className="h-[200px] w-auto" />
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-10 shadow text-center">
              <FaSpinner className="text-3xl text-blue-600 animate-spin mb-2 mx-auto" />
              <p className="text-gray-600">Please wait...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 shadow text-center">
              <FaExclamationCircle className="text-3xl text-gray-400 mb-2 mx-auto" />
              <p className="text-gray-600">Try adjusting filters</p>
              <button onClick={clearFilters} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {listings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
              {showMore && (
                <div className="text-center mt-6">
                  <button
                    onClick={onShowMoreClick}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
