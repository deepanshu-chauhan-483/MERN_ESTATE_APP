import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
  FaUser,
  FaCamera,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaPlus,
  FaHome,
  FaEye,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa"

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const [showListings, setShowListings] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, avatar: downloadURL }))
      },
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        dispatch(deleteUserStart())
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        })
        const data = await res.json()
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message))
          return
        }
        dispatch(deleteUserSuccess(data))
      } catch (error) {
        dispatch(deleteUserFailure(error.message))
      }
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch("/api/auth/signout")
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        setShowListingsError(true)
        return
      }
      setUserListings(data)
      setShowListings(true)
    } catch (error) {
      setShowListingsError(true)
    }
  }

  const handleListingDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: "DELETE",
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-6">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your account and listings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar || "/placeholder.svg"}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover cursor-pointer border-4 border-blue-100 hover:border-blue-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                    <FaCamera className="text-sm" />
                  </div>
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                  />
                </div>

                {fileUploadError ? (
                  <div className="flex items-center justify-center text-red-600 text-sm mb-2">
                    <FaExclamationTriangle className="mr-2" /> Error uploading image
                  </div>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <div className="flex items-center justify-center text-blue-600 text-sm mb-2">
                    <FaSpinner className="mr-2 animate-spin" /> Uploading {filePerc}%
                  </div>
                ) : filePerc === 100 ? (
                  <div className="flex items-center justify-center text-green-600 text-sm mb-2">
                    <FaCheckCircle className="mr-2" /> Uploaded successfully
                  </div>
                ) : null}

                <h2 className="text-xl font-bold text-gray-900 mb-1">{currentUser.username}</h2>
                <p className="text-gray-600 text-sm mb-4">{currentUser.email}</p>

                <div className="space-y-2">
                  <Link to="/create-listing" className="block bg-green-500 text-white py-2 rounded-xl font-semibold hover:bg-green-600">
                    <FaPlus className="inline mr-1" /> Create Listing
                  </Link>

                  <button onClick={handleShowListings} className="w-full bg-blue-100 text-blue-700 py-2 rounded-xl font-semibold hover:bg-blue-200">
                    <FaHome className="inline mr-1" /> {showListings ? "Hide" : "Show"} Listings
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 text-sm">
                  <button onClick={handleSignOut} className="text-gray-600 hover:text-gray-800 mr-4">
                    <FaSignOutAlt className="inline mr-1" /> Sign Out
                  </button>
                  <button onClick={handleDeleteUser} className="text-red-600 hover:text-red-800">
                    <FaTrash className="inline mr-1" /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <FaUser className="text-xl text-blue-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Account Info</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Leave blank to keep current password"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500"
                  />
                </div>

                <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50">
                  {loading ? <FaSpinner className="inline animate-spin mr-2" /> : <FaEdit className="inline mr-2" />} Update Profile
                </button>

                {error && <div className="text-red-600 text-sm"><FaExclamationTriangle className="inline mr-1" /> {error}</div>}
                {updateSuccess && <div className="text-green-600 text-sm"><FaCheckCircle className="inline mr-1" /> Profile updated!</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}