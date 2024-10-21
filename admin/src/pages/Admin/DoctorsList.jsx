import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets"; // Assuming you have this path set up correctly

export default function DoctorsList() {
    const { doctors, aToken, getAllDoctors, changeAvailability, cancelAppointment } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors(); // Fetch doctors when the token is available
        }
    }, [aToken]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">
                Doctors List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {doctors.length > 0 ? (
                    doctors.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-40 object-fit" // Adjusted height
                            />
                            <div className="p-5">
                                <h2 className="text-xl font-bold mb-2 text-gray-800">
                                    {item.name}
                                </h2>
                                <p className="text-gray-500 mb-4 text-sm">{item.speciality}</p>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        onChange={() => changeAvailability(item._id)}
                                        checked={item.available}
                                        readOnly
                                        className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded-md"
                                    />
                                    <p className="text-sm text-gray-700">Available</p>
                                </div>
                                
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-400">
                        No doctors found
                    </p>
                )}
            </div>
        </div>
    );
}
