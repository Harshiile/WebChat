let createerror = document.querySelector('#createerror')
let joinerror = document.querySelector('#joinerror')
let deleteerror = document.querySelector('#deleteerror')
let createRoomForm = document.querySelector('#createroom')
let joinRoomForm = document.querySelector('#joinroom')
let leaveRoomBtn = document.querySelector('#yesBtn')

// Clean up message when retype
createRoomForm[0].addEventListener('input', () => {
    createerror.innerHTML = ``
})
joinRoomForm[0].addEventListener('input', () => {
    joinerror.innerHTML = ``
})


// Make cookies for rooms
const makeCookieOfRoom = async (roomName) => {
    let data = { roomName }
    let res = await fetch('/createroom', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.status == 200) {
        window.location.href = await res.text()
    }
}

createRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let roomName = createRoomForm[0].value

    socket.emit('createroom', roomName) // Create Room

    socket.on('roomCreationError', (msg) => { // Error in Room Creation
        createerror.innerHTML = `${msg}`
    })

    socket.on('roomCreated', () => { // Successfully Room Created
        makeCookieOfRoom(roomName)
    })

    e.target.reset()
})

joinRoomForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let roomName = joinRoomForm[0].value

    socket.emit('joinroom', roomName) // Room Joined

    socket.on('roomJoiningError', (msg) => {// Error in Room Joining
        joinerror.innerHTML = `${msg}`
    })

    socket.on('roomJoined', () => {// Successfully Room Joined
        makeCookieOfRoom(roomName)
    })

    e.target.reset()
})

// Leaving the Room
leaveRoomBtn.addEventListener('click', async () => {
    let data = { roomName }
    let res = await fetch('/deleteroom', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.status == 200) {
        localStorage.removeItem(roomName)
        location.reload()
    }
})