const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//@ desc    register user
//@route    get /api/v1/auth/register
//@access   public
exports.register = asyncHandler(async (req,res,next) => {
    res.status(200).json({ success: true});
});
