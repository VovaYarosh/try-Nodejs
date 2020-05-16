const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//@ desc    register user
//@route    post /api/v1/auth/register
//@access   public
exports.register = asyncHandler(async (req,res,next) => {
    const { name,email, password, role } = req.body;

    //create user
    const user = await User.create({
        name, 
        email, 
        password, 
        role
    });

    sendTokenResponse(user, 200, res);
});


//@ desc    login user
//@route    post /api/v1/auth/login
//@access   public
exports.login = asyncHandler(async (req,res,next) => {
    const { email, password, } = req.body;

    //validate email& password
    if(!email || !password){
        return next(new ErrorResponse('please provide and email and password', 400));
    }

    //check for user
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorResponse('invalid credentials', 401));
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorResponse('invalid credentials', 401));
    }
    
    sendTokenResponse(user, 200, res);
});

//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) =>{
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + proccess.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({success: true, token})
}