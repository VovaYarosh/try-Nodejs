const {body} = require('express-validator')

exports.registerValidators = [
    body('email').isEmail().withMessage('Enter the correct password'),
    body('password').isLength({min: 6,max: 56}).isAlphanumeric(),
    body('confirm').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('passwords must match')
        }
        return true
    }),
    body('name').isLength({min:2}).withMessage('The name must be at least two symbols long')
]