const clearCookie = (req, res) => {
    res.clearCookie('login')
    res.clearCookie('user')
    return res.redirect('/login')
}
module.exports = clearCookie