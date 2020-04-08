const keys = require('../keys')

module.exports = function(email, token){
    return  {
        to: email,
    from:keys.EMAIL_FROM,
    subject:'password successfully reset',
    html:`
        <h1>Forgot your password?</h1>
        <p>If not - ignore it</p>
        <p>another way click on the link bellow</p>
        <p><a href="${keys.BASE_URL}/auth/password/${token}">recovery access</a></p>
        <hr />
    `
    }
}