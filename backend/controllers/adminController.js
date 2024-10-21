const Doctor = require('../models/doctorModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken')
const appointmentModel = require('../models/appointmentModel')
const userModel = require('../models/userModel')
require('dotenv').config()
// API for adding a doctor
exports.addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    return res.status(200).json({
      success: true,
      message: 'Doctor added successfully'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Again"
    });
  }
};

// API for admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, token });
    } else {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to fetch all doctors
exports.allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Fetched all doctors successfully.',
      doctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch doctors.' });
  }
};

// API to fetch all appointments
exports.appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    
    return res.status(200).json({
      success: true,
      message: "Fetched all appointments",
      appointments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch appointments.' });
  }
};

// API to cancel an appointment
exports.appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Fetch appointment data to verify user and get docId, slotDate, and slotTime
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Mark the appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Update the doctor's booked slots
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await Doctor.findById(docId);

    if (!doctorData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked || {};

    // Check if the specific date has booked slots
    if (slots_booked[slotDate]) {
      // Remove the slot from the doctor's booked slots
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

      // Update the doctor's booked slots
      await Doctor.findByIdAndUpdate(docId, { slots_booked });
    }

    return res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


//api to get dashboard data for admin panel


exports.adminDashboard = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5), // Correctly fetching the latest appointments
        };

        return res.status(200).json({
            success: true,
            message: "Dashdata is ready",
            dashData,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
