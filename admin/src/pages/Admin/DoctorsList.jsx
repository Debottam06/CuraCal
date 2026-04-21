import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

export default function DoctorsList() {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  // 🔥 Filter + Search Logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchFilter =
      filter === "All" || doc.speciality === filter;

    const matchSearch = doc.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const specialities = [
    "All",
    "General Physician",
    "Dermatologist",
    "Gynecologist",
    "Pediatricians",
    "Neurologist",
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Doctors List
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[500px] px-4 py-2 rounded-lg border outline-none "
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap mb-6">
        {specialities.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-1 rounded-full text-sm border ${
              filter === item
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-gray-500 mb-6">
        Showing {filteredDoctors.length} doctors
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >

            {/* Image */}
            <div className="relative h-40 bg-gray-100 flex items-center justify-center">
              <img
                src={item.image || assets.upload_area}
                alt=""
                className="h-full object-cover"
              />

              {/* Availability */}
              <span
              onClick={() => changeAvailability(item._id)}
                className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full ${
                  item.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                ● {item.available ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>

              <span className="inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mt-1">
                {item.speciality}
              </span>

              <hr className="my-3" />

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {item.experience || "1 yr"} exp.
                </p>

                <button className="border px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition">
                  View →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}