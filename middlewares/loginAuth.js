const jwt = require('jsonwebtoken')

const checkLoginAuth = async (req, res, next) => {
    if (req.cookies.login) {
        req.body.email = jwt.verify(req.cookies.login, process.env.JWT_SECRET).email
        next()
    }
    else
        return res.redirect('/login')
}

module.exports = checkLoginAuth