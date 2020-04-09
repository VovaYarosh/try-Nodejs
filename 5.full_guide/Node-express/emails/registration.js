const keys = require('../keys')

module.exports = function(email){
    return {
        to: email,
        from:keys.EMAIL_FROM,
        subject:'Registration successful',
        html:`
            <h1>Welcome to our Shop</h1>
            <p>Your account created successfully with email ${email}</p>
            <hr />
            <a href="${keys.BASE_URL}">Courses shop</a>
        `
    }
}