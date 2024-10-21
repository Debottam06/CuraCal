const express = require('express')
const { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile } = require('../controllers/doctorContoller')
const { authDoctor } = require('../middlewares/authDoctor')
const { appointmentCancel } = require('../controllers/adminController')
const router = express.Router()

router.get('/list',doctorList)
router.post('/login',loginDoctor)
router.get('/appointments',authDoctor,appointmentsDoctor)
router.post('/complete-appointment',authDoctor,appointmentComplete)
router.post('/cancel-appointment',authDoctor,appointmentCancel)
router.get('/dashboard',authDoctor,doctorDashboard)
router.get('/profile',authDoctor,doctorProfile)
router.post('/update-profile',authDoctor,updateDoctorProfile)


module.exports = router