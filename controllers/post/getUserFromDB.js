const { userModel } = require('../../models/schema')
const { loginCookieGenerator, userCookieGenerator } = require('./cookieGenerator')

const getUserFromDB = async (req, res) => {
    let body = req.body

    // Verification of email and password
    let emailRegex, passwordRegex;
    // if(body.email)

    let user = await userModel.findOne({ email: body.email })
    if (user) {
        if (body.password == user.password) {
            // Create jwt token
            res.cookie('login', loginCookieGenerator(body.email, body.password))
            res.cookie('user', userCookieGenerator(user))
            return res.status(200).send('/profile')
        }
        else
            return res.status(400).send('Password incorrect')
    }
    else
        return res.status(400).send('User not found')
}
module.exports = getUserFromDB