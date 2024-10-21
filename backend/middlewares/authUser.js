const jwt = require('jsonwebtoken')
require('dotenv').config();
exports.authUser = async(req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Not Authorized ,...Login Again"
            })
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        // if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_pASSWORD){
        //     return res.status(400).json({
        //          success:false,
        //         message:"Not Authorized ,...Login Again"
        //     })
        // }
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.message
        });
    }
}