const userAuth = async (req, res, next) => {
    if (!req.cookies.user)
        next()
    else
        return res.redirect('/profile')
}

module.exports = userAuth