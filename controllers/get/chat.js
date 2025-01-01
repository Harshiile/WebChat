const { getRooms } = require('../post/rooms')

const Chat = (req, res) => {
    let uname = req.body.uname;
    let avatar = req.body.avatar || '/Assets/user.png';
    let roomName = req.params.roomName

    let rooms = getRooms(req, res)
    if (rooms.length > 0) {
        if (rooms.includes(roomName))// If user joined this room
            return res.render('chat', { rooms, uname, roomName, avatar })
        else// If user didn't joined this room
            return res.redirect(`/chat/${rooms[0]}`)
    }
    else
        res.redirect('/chat/webchat')
}

const WebChat = (req, res) => {
    let uname = req.body.uname;
    let avatar = req.body.avatar || '/Assets/user.png';
    res.render('chat', { rooms: [], avatar, uname, roomName: 'Welcome to WebChat' })
}

module.exports = { Chat, WebChat }