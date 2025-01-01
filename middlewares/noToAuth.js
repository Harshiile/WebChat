const noToAuth = async (req, res, next) => {
    if (req.cookies.login)
        return res.redirect('/profile')
    next()
}

module.exports = noToAuth