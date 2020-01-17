const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email').isEmail().withMessage('Enter the correct password').custom(async (value, {req})=>{
        try{
            const user = await User.findOne({email: value})
            if (user){
                return Promise.reject('This email already registered')
            }
        }catch(e){
            console.log(e)
        }
    }),
    body('password').isLength({min: 6,max: 56}).isAlphanumeric(),
    body('confirm').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('passwords must match')
        }
        return true
    }),
    body('name').isLength({min:2}).withMessage('The name must be at least two symbols long')
]