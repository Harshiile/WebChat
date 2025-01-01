const jwt = require('jsonwebtoken')

const loginCookieGenerator = (email, password) => {
    return jwt.sign({ email, password }, process.env.JWT_SECRET)
}
const userCookieGenerator = (user) => {
    return jwt.sign({ 'username': user.username, 'uname': user.uname, 'avatar': user.avatar }, process.env.JWT_SECRET)
}
const roomsCookieGenerator = (rooms) => {
    return jwt.sign({ 'rooms': rooms }, process.env.JWT_SECRET)
}
const messageCookieGenerator = (msgs) => {
    return jwt.sign({ 'messages': msgs }, process.env.JWT_SECRET)
}
const verifyMessageCookie = (msgs) => {
    return jwt.verify(msgs, process.env.JWT_SECRET)
}
module.exports = { verifyMessageCookie, messageCookieGenerator, loginCookieGenerator, userCookieGenerator, roomsCookieGenerator }