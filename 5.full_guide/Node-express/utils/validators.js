const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
    .isEmail().withMessage('Enter the correct password')
    .custom(async (value, {req})=>{
        try{
            const user = await User.findOne({email: value})
            if (user){
                return Promise.reject('This email already registered')
            }
        }catch(e){
            console.log(e)
        }
    })
    .normalizeEmail(),
    body('password')
    .isLength({min: 6,max: 56})
    .isAlphanumeric()
    .trim(),
    body('confirm').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('passwords must match')
        }
        return true
    })
    .trim(),
    body('name').isLength({min:2}).withMessage('The name must be at least two symbols long')
    .trim()
]

exports.courseValidators = [
    body('title').isLength({min:3}).withMessage('title cant be less than 3 symbols').trim(),
    body('img','Enter the correct image URL').isURL()
]