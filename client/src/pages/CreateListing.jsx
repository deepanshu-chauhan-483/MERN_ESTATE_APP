"use client"

import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaCloudUploadAlt, FaTrash, FaImage, FaHome, FaBed, FaBath, FaDollarSign } from "react-icons/fa"

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      const promises = []
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)")
          setUploading(false)
        })
    } else {
      setImageUploadError("You can only upload 6 images per listing")
      setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        },
      )
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      })
    }
    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      })
    }
    if (e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.imageUrls.length < 1) return setError("You must upload at least one image")
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price")
      setLoading(true)
      setError(false)
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      })
      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Create a New Listing</h1>
          <p className="text-xl text-gray-600">Share your property with potential buyers or renters</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Property Details */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <FaHome className="text-2xl text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
            </div>

            <div className="space-y-6">
              {/* Property Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Name</label>
                <input
                  type="text"
                  placeholder="Enter property name"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  id="name"
                  maxLength="62"
                  minLength="10"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe your property..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors h-32 resize-none"
                  id="description"
                  required
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  placeholder="Enter property address"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  id="address"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>

              {/* Property Type & Features */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Property Type & Features</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input
                      type="checkbox"
                      id="sale"
                      className="w-5 h-5 text-blue-600 mr-3"
                      onChange={handleChange}
                      checked={formData.type === "sale"}
                    />
                    <span className="font-medium">For Sale</span>
                  </label>
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input
                      type="checkbox"
                      id="rent"
                      className="w-5 h-5 text-blue-600 mr-3"
                      onChange={handleChange}
                      checked={formData.type === "rent"}
                    />
                    <span className="font-medium">For Rent</span>
                  </label>
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input
                      type="checkbox"
                      id="parking"
                      className="w-5 h-5 text-blue-600 mr-3"
                      onChange={handleChange}
                      checked={formData.parking}
                    />
                    <span className="font-medium">Parking</span>
                  </label>
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input
                      type="checkbox"
                      id="furnished"
                      className="w-5 h-5 text-blue-600 mr-3"
                      onChange={handleChange}
                      checked={formData.furnished}
                    />
                    <span className="font-medium">Furnished</span>
                  </label>
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input
                      type="checkbox"
                      id="offer"
                      className="w-5 h-5 text-blue-600 mr-3"
                      onChange={handleChange}
                      checked={formData.offer}
                    />
                    <span className="font-medium">Special Offer</span>
                  </label>
                </div>
              </div>

              {/* Room Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaBed className="inline mr-2" />
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    min="1"
                    max="10"
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaBath className="inline mr-2" />
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    min="1"
                    max="10"
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaDollarSign className="inline mr-2" />
                    Regular Price {formData.type === "rent" && "(per month)"}
                  </label>
                  <input
                    type="number"
                    id="regularPrice"
                    min="50"
                    max="10000000"
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                </div>
                {formData.offer && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Discounted Price {formData.type === "rent" && "(per month)"}
                    </label>
                    <input
                      type="number"
                      id="discountPrice"
                      min="0"
                      max="10000000"
                      required
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <FaImage className="text-2xl text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Property Images</h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600">
                <span className="font-semibold">Upload up to 6 images.</span> The first image will be used as the cover
                photo.
              </p>

              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <FaCloudUploadAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="hidden"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <label htmlFor="images" className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold">
                  Choose images to upload
                </label>
                <p className="text-gray-500 text-sm mt-2">PNG, JPG up to 2MB each</p>
              </div>

              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {uploading ? "Uploading..." : "Upload Images"}
              </button>

              {imageUploadError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {imageUploadError}
                </div>
              )}

              {/* Uploaded Images */}
              {formData.imageUrls.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Uploaded Images</h3>
                  {formData.imageUrls.map((url, index) => (
                    <div key={url} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                      <div className="flex items-center">
                        <img
                          src={url || "/placeholder.svg"}
                          alt="listing"
                          className="w-16 h-16 object-cover rounded-lg mr-3"
                        />
                        <span className="text-sm text-gray-600">
                          Image {index + 1} {index === 0 && "(Cover)"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                disabled={loading || uploading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {loading ? "Creating Listing..." : "Create Listing"}
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">{error}</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
