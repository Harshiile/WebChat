const { messageCookieGenerator, verifyMessageCookie } = require('./cookieGenerator')

const encryptMessage = async (req, res) => {
    let { msgs } = req.body
    return res.status(200).send(messageCookieGenerator(msgs))
}
const decryptMessage = async (req, res) => {
    let { msgs } = req.body
    return res.status(200).send(verifyMessageCookie(msgs))
}

module.exports = { encryptMessage, decryptMessage }