const jwt = require('jsonwebtoken')

const getUserDetails = (req, res, next) => {
    if (req.cookies.user) {
        let { username, uname, avatar } = jwt.verify(req.cookies.user, process.env.JWT_SECRET)
        req.body.username = username
        req.body.uname = uname
        req.body.avatar = avatar
    }
    next()
}
module.exports = getUserDetails