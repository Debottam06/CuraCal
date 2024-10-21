const jwt = require('jsonwebtoken')
require('dotenv').config();
exports.authAdmin = async(req,res,next)=>{
    try {
        const {atoken} = req.headers
        if(!atoken){
            return res.status(400).json({
                success:false,
                message:"Not Authorized ,...Login Again"
            })
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(400).json({
                 success:false,
                message:"Not Authorized ,...Login Again"
            })
        }
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.message
        });
    }
}