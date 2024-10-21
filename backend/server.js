const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectCloudinary } = require('./config/cloudinary');
const app = express();
const PORT = process.env.PORT || 3200;
const adminRouter = require('./routes/adminRoute');
const doctorRouter = require('./routes/doctorRoute');
const userRouter= require('./routes/userRoute')
const { dbConnect } = require('./config/database');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Database & Cloudinary Connection
dbConnect();
connectCloudinary();

// Start Server
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT NO. ${PORT}`);
});
