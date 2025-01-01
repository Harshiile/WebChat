const { Server } = require('socket.io')
const http = require('http')
const app = require('./app')

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', async (socket) => {
    console.log('new User : ', socket.id);

    // Create Room
    socket.on('createroom', (room) => {
        const allRooms = io.sockets.adapter.rooms;
        if (allRooms.get(room)) {
            socket.emit('roomCreationError', 'Room is already Exist')
        }
        else {
            socket.join(room)
            socket.emit('roomCreated')
        }
    })

    // Join Room
    socket.on('joinroom', (room) => {
        if (io.sockets.adapter.rooms.get(room)) {
            if (socket.rooms.has(room))
                socket.emit('roomJoiningError', 'You are already in room')
            else {
                socket.emit('roomJoined')
            }
        }
        else {
            socket.emit('roomJoiningError', 'Room is not Exist')
        }
    })

    // Initial joining at every refresh
    socket.on('initialJoining', async (room) => {
        socket.join(room)
    })

    // Messages
    socket.on('ingoingMessage', (res) => {
        if (res.roomName == 'webchat')// Default room
            socket.emit('outgoingMessage', { 'userName': 'WebChat', 'msg': 'There is no room, you can create one or join one room', 'roomName': res.roomName })
        else
            socket.broadcast.to(res.roomName).emit('outgoingMessage', { 'userName': res.userName, 'msg': res.msg, 'roomName': res.roomName, 'avatarOfSender': res.avatarOfSender })
    });
})

module.exports = server