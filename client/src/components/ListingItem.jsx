"use client";

import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBed, FaBath, FaHeart, FaEye, FaTags } from "react-icons/fa";
import { useState } from "react";

export default function ListingItem({ listing }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/listing/${listing._id}`}>
        {/* Image */}
        <div className="relative">
          <img
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg"
            }
            alt="listing cover"
            className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Type Badge */}
          <span className={`absolute top-2 left-2 px-2 py-0.5 text-xs text-white rounded-full ${listing.type === "rent" ? "bg-blue-500" : "bg-green-500"}`}>
            For {listing.type === "rent" ? "Rent" : "Sale"}
          </span>

          {/* Offer Badge */}
          {listing.offer && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-xs text-white rounded-full flex items-center gap-1">
              <FaTags className="text-[10px]" />
              Offer
            </span>
          )}

          {/* Hover Icons */}
          {!listing.offer && isHovered && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsFavorited(!isFavorited);
                }}
                className="bg-white/90 p-1 rounded-full hover:bg-white shadow"
              >
                <FaHeart className={`text-sm ${isFavorited ? "text-red-500" : "text-gray-600"}`} />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="bg-white/90 p-1 rounded-full hover:bg-white shadow"
              >
                <FaEye className="text-sm text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {listing.name}
          </h3>

          {/* Address */}
          <div className="flex items-center text-gray-500 text-sm mt-1 mb-2">
            <MdLocationOn className="mr-1 text-red-500" />
            <p className="truncate">{listing.address}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>

          {/* Price & Features */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-gray-800">
                ${listing.offer ? listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && <span className="text-xs text-gray-500"> /month</span>}
              </p>
              {listing.offer && (
                <p className="text-xs text-gray-400 line-through">
                  ${listing.regularPrice.toLocaleString("en-US")}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FaBed className="text-blue-500" />
                {listing.bedrooms}
              </div>
              <div className="flex items-center gap-1">
                <FaBath className="text-green-500" />
                {listing.bathrooms}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-3 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
            View Details →
          </div>
        </div>
      </Link>
    </div>
  );
}
