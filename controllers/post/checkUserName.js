const { userModel } = require('../../models/schema')

const checkUserName = async (req, res) => {
    let username = req.body.username
    let users = await userModel.find()
    let userNames = []
    users.forEach(iter => {
        userNames.push(iter.username);
    })
    let userExist = userNames.includes(username)
    return res.json(userExist)
}

module.exports = checkUserName