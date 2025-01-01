const { getRooms } = require('../post/rooms')
const Profile = (req, res) => {
    let username = req.body.username;
    let uname = req.body.uname;
    let avatar = req.body.avatar || '/Assets/user.png';
    let rooms = getRooms(req, res)
    res.render('profile', { rooms, username, uname, avatar })
}

module.exports = Profile