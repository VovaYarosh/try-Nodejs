const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//@ desc    get all users
//@route    get /api/v1/auth/users
//@access   private/admin
exports.getUsers = asyncHandler(async (req,res,next) => {
    res.status(200).json(res.advancedResults);
});

//@ desc    get single user
//@route    get /api/v1/auth/users/:id
//@access   private/admin
exports.getUser = asyncHandler(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: user
    });
});

//@ desc    create user
//@route    post /api/v1/auth/users
//@access   private/admin
exports.createUser = asyncHandler(async (req,res,next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
});

//@ desc    update user
//@route    put /api/v1/auth/users/:id
//@access   private/admin
exports.updateUser = asyncHandler(async (req,res,next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});

//@ desc    delete user
//@route    delete /api/v1/auth/users/:id
//@access   private/admin
exports.deleteUser = asyncHandler(async (req,res,next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
});