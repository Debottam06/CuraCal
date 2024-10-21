const validator = require("validator")
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const cloudinary = require('cloudinary').v2;
const razorpay = require('razorpay')
require('dotenv').config()
require('dotenv').config()
exports.registerUser = async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email ||!password){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"Enter a valid email"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
              success: false,
              message: "Please enter a strong password"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET)

        return res.status(200).json({
            success:true,
            message:"User Register Successfull",
            token
        })        

    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
    }
}


exports.loginUser = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.status(200).json({
                success:true,
                message: "Credential matched",
                token
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch user data excluding the password field
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Fetched user data successfully",
            userData
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.updateProfile = async(req,res)=>{
    try {
        const {userId,name,phone,address,dob,gender} = req.body;
        const imageFile = req.file;

        if(!name ||!phone  ||!dob ||!gender){
            return res.status(400).json({
                success:false,
                message:"Data missing"
            })
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }

        return res.status(200).json({
            success:true,
            message:"Profile Updated"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


exports.bookAppointment = async (req, res) => {
    try {
      const { userId, docId, slotDate, slotTime } = req.body;
  
      // Ensure all required data is present
      if (!userId || !docId || !slotDate || !slotTime) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }
  
      // Fetch the doctor data excluding the password field
      const docData = await doctorModel.findById(docId).select('-password');
      if (!docData) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found",
        });
      }
  
      // Check if the doctor is available
      if (!docData.available) {
        return res.status(400).json({
          success: false,
          message: "Doctor not available",
        });
      }
  
      // Initialize or update the slots_booked object
      let slots_booked = docData.slots_booked || {};
  
      // Check if the selected slot is already booked
      if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({
          success: false,
          message: "Slot not available",
        });
      }
  
      // Add the slot to the booked slots
      if (!slots_booked[slotDate]) {
        slots_booked[slotDate] = [];
      }
      slots_booked[slotDate].push(slotTime);
  
      // Fetch user data
      const userData = await userModel.findById(userId).select('-password');
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Create the appointment record
      const newAppointment = new appointmentModel({
        userId,
        docId,
        slotDate,
        slotTime,
        userData,
        docData,
        amount: docData.fees,
        date: Date.now(),
        cancelled: false,
        payment: false,
        isCompleted: false,
      });
  
      // Save the appointment and update doctor's booked slots
      await newAppointment.save();
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      return res.status(200).json({
        success: true,
        message: "Appointment booked successfully",
        appointment: newAppointment,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.listAppointment = async(req,res)=>{
    try {
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        return res.status(200).json({
            success:true,
            message:"Fetched appointment list",
            appointments
        })
    } catch (error) {
        console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  

  exports.cancelAppointment = async (req, res) => {
    try {
      const { userId, appointmentId } = req.body;
  
      // Fetch appointment data to verify user and get docId, slotDate, and slotTime
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      // Check if the user is authorized to cancel this appointment
      if (appointmentData.userId !== userId) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized action",
        });
      }
  
      // Mark the appointment as cancelled
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  
      // Update the doctor's booked slots
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;
  
      // Remove the slot from the doctor's booked slots
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      return res.status(200).json({
        success: true,
        message: "Appointment cancelled successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const razorpayInstance = new razorpay({
    key_id:"process.env.RAZORPAY_KEY_ID",
    key_secret:'process.env.RAZORPAY_KEY_SECRET'
  })
  //api to make payment of appointment using razorpay
  exports.paymentRazorpay = async(req,res)=>{
    try {
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData || appointmentData.cancelled){
            return res.status(400).json({
                success:false,
                message:"Appointment cancelled or not found"
            })
        }

        //creating options for razorpay payment
        const options = {
            amount: appointmentData.amount*100,
            currency: process.env.currency,
            receipt: appointmentId,
            // payment_capture: 1
        };

        //creation of an order
        const order = await razorpayInstance.orders.create(options)
        return res.status(200).json({
            success:true,
            order
        })

    } catch (error) {
        console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }