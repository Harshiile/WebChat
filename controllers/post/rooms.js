const jwt = require('jsonwebtoken')
const { roomsCookieGenerator } = require('./cookieGenerator')


const getRooms = (req, res) => {
    if (req.cookies.rooms)
        return jwt.verify(req.cookies.rooms, process.env.JWT_SECRET).rooms
    return []
}

const deleteRoom = (req, res) => {
    let rooms = getRooms(req, res)
    let { roomName } = req.body
    rooms = rooms.filter(item => item != roomName)
    if (rooms.length == 0) {
        res.clearCookie('rooms')
        return res.status(200).send(`/chat/webchat`)
    }
    res.cookie('rooms', roomsCookieGenerator(rooms))
    return res.status(200).send(`/chat/${rooms[0]}`)
}

const createRoom = async (req, res) => {
    let { roomName } = req.body
    let rooms = [roomName]
    if (req.cookies.rooms) {
        let prevRooms = getRooms(req, res)
        rooms = [...prevRooms, roomName]
    }
    res.cookie('rooms', roomsCookieGenerator(rooms))
    return res.status(200).send(`/chat/${roomName}`)
}

module.exports = { createRoom, deleteRoom, getRooms }
