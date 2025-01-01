const { userModel } = require('../../models/schema')
const { loginCookieGenerator, userCookieGenerator } = require('./cookieGenerator')
const fs = require('fs')

const pushUserIntoDB = async (req, res) => {
    let body = req.body;
    body['uname'] = ''
    body['avatar'] = '\\uploads\\user.png'
    body['username'] = ''
    let user = await userModel.findOne({ email: body.email })
    if (user)
        return res.status(400).send('User already exist')
    else {
        try {
            // Create new user
            await userModel.create(body)
            res.cookie('login', loginCookieGenerator(body.email, body.password))
            return res.status(200).send('/user')
        } catch (error) {
            return res.status(400).send('Server Error , Please try again')
        }
    }
}

const updateUser = async (req, res) => {
    let data = req.body
    //For new User
    data['avatar'] = data.avatar || '\\uploads\\user.png'

    if (req.file) {
        // Delete previous avatar
        let oldImage = data.avatar

        if (!oldImage.includes('user.png'))
            fs.rmSync(`.\\views${oldImage}`)

        // New Image
        data.avatar = req.file.path.split('views')[1]
    }
    try {
        await userModel.findOneAndUpdate({ "email": data.email }, data)
        res.cookie('user', userCookieGenerator(data))
        return res.redirect('/profile')
    } catch (error) {
        console.log('pushUser error : ', error);
        return res.sendStatus(400)
    }
}


module.exports = { pushUserIntoDB, updateUser }