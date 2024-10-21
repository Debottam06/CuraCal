const doctorModel = require("../models/doctorModel");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');
const appointmentModel = require("../models/appointmentModel");
const mongoose = require('mongoose');

require('dotenv').config()
exports.changeAvailablity = async(req,res)=>{
    try {
        const {docId} = req.body;
        const doctData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available : !doctData.available})
        return res.status(200).json({
            success:true,
            message:'Avialablity Changed'
        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
    }
}

exports.doctorList = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        return res.status(200).json({
            success:true,
            message:'fetched data',
            doctors
        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
    }
}


exports.loginDoctor = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token = JWT.sign({id:doctor._id},process.env.JWT_SECRET)
            return res.status(200).json({ success: true, token });
        }else {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
          }
        
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
    }
}



exports.appointmentsDoctor = async(req,res)=>{
    try {
        const {docId}  = req.body;
        const appointments = await appointmentModel.find({docId})
        console.log(appointments);
        
        return res.status(200).json({
            success:true,
            message:"fetched all appointments of that paricular doctor",
            appointments
        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
    }
}


exports.appointmentComplete = async (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      // Ensure that appointmentId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        return res.status(400).json({ success: false, message: "Invalid appointment ID" });
      }
  
      // Fetch appointment data to ensure it exists
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      if (!appointmentData) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }
  
      // Mark the appointment as completed
      await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true });
  
      return res.status(200).json({
        success: true,
        message: "Appointment marked as completed successfully"
      });
  
    } catch (error) {
      console.error("Error completing appointment:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

exports.appointmentCancel = async (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      // Ensure that appointmentId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
        return res.status(400).json({ success: false, message: "Invalid appointment ID" });
      }
  
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


exports.doctorDashboard = async(req,res)=>{
    try {
        const {docId}=req.body
        const appointments = await appointmentModel.find({docId})
        let earnings = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+=item.amount;
            }
        })
        let patients = []
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashData = {
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments :appointments.reverse().slice(0,5)

        }
        return res.status(200).json({
            success:true,
            message:"Fetched dashData",
            dashData
        })


    } catch (error) {
        console.error("Error cancelling appointment:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
}  

exports.doctorProfile = async(req,res)=>{
  try {
    const {docId} = req.body;
    const profileData = await doctorModel.findById(docId).select('-password');
    return res.status(200).json({
      success:true,
      message:"Fetched Doctors profile",
      profileData
    })
  } catch (error) {
    console.error("Error cancelling appointment:", error);
      return res.status(500).json({ success: false, message: error.message });
  }
}

exports.updateDoctorProfile = async(req,res)=>{
  try{
    const {docId,fees,address,available}=req.body;

    await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
    return res.status(200).json({
      success:true,
      message:"profile Updated"
      
    })
    

  }catch (error) {
    console.error("Error cancelling appointment:", error);
      return res.status(500).json({ success: false, message: error.message });
  }
}