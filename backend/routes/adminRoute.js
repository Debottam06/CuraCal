const express = require('express');
const { addDoctor,loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard} = require('../controllers/adminController');
const upload = require('../middlewares/multer');
const { authAdmin } = require('../middlewares/authAdmin');
const { changeAvailablity } = require('../controllers/doctorContoller');

const router = express.Router();

// Route for adding a doctor, using multer for image upload
router.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
router.post('/login',loginAdmin)
router.post('/all-doctors',authAdmin,allDoctors)
router.post('/change-availablity',authAdmin,changeAvailablity)
router.get('/appointments',authAdmin,appointmentsAdmin)
router.post('/cancel-appointment', authAdmin, appointmentCancel);
router.get('/dashboard',authAdmin,adminDashboard)


module.exports = router;
