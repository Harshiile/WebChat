const socket = io()
let roomName = document.querySelector('#roomName').innerHTML.trim()
let msgForm = document.querySelector('#msgForm')
let input = document.querySelector('.input')
let messageCanvas = document.querySelector('#messageCanvas')
let userName = document.querySelector('#username').innerHTML.trim()
let avatarOfSender = document.querySelector('#avatar').src
let rooms = document.querySelectorAll('#rooms span')

// Initial Room Joining at every refresh
window.addEventListener('load', () => {
    for (const room of rooms) {
        socket.emit('initialJoining', room.innerHTML.trim())
        room.parentElement.addEventListener('click', () => {
            window.location.href = `/chat/${room.innerHTML.trim()}`;
        })
    }
})


// Message box Creation
const createMessage = (nameText, msgText, avatar_of_sender, type) => {
    const messageBox = document.createElement('div')
    const name = document.createElement('p')
    const message = document.createElement('p')
    const avatarNameBox = document.createElement('div')
    const senderAvatar = document.createElement('img')

    // avatar-name set
    senderAvatar.src = avatar_of_sender
    senderAvatar.className = 'w-7 h-7 rounded-full'
    name.innerHTML = type == 'send' ? '' : `${nameText}`
    name.className = 'text-[0.85rem] pt-1 italic font-bold'
    avatarNameBox.className = 'flex items-center gap-x-2 pt-2 pl-2'
    if (type != 'send' && nameText != 'WebChat') avatarNameBox.append(senderAvatar)
    avatarNameBox.append(name)

    // message text set
    message.innerHTML = `${msgText}`
    message.className = 'text-md sm:text-lg leading-tight py-1'
    if (type != 'send') message.classList.add('ml-8')

    // messageBox set
    messageBox.className = 'messageStyle'
    messageBox.id = type == 'send' ? 'msgRight' : 'msgLeft'
    if (type != 'send') messageBox.append(avatarNameBox)
    messageBox.append(message)

    messageCanvas.append(messageBox)
    messageCanvas.scrollTop = messageCanvas.scrollHeight
}

// Make Message An Encrypt
const makeEncrpyt = async (msgs) => {
    let data = { msgs }
    let res = await fetch('/encryption', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.status == 200)
        return await res.text();
}

// Decrypt A Message
const decryptMessages = async (msgs) => {
    let data = { msgs }
    let res = await fetch('/decryption', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.status == 200)
        return await res.text();
    return null
}

// Save Message
const saveMessage = async (roomName, sender, msg, avatar, type) => {
    // message creation
    let newMessage = { msg }
    const messageOwener = {
        name: sender,
        avatar
    }
    if (type == 'send')
        newMessage['sender'] = messageOwener
    else
        newMessage['receiver'] = messageOwener


    // message save in local storage
    let prevMsgs = localStorage.getItem(roomName)
    if (prevMsgs) {
        prevMsgs = JSON.parse(await decryptMessages(prevMsgs))
        let newMsgs = [...prevMsgs.messages, newMessage]
        localStorage.setItem(roomName, await makeEncrpyt(newMsgs))
    }
    else {
        if (roomName != 'webchat') {
            let msgs = [newMessage]
            localStorage.setItem(roomName, await makeEncrpyt(msgs))
        }
    }
}


// Message Receive
socket.on('outgoingMessage', (response) => {
    saveMessage(response.roomName, response.userName, response.msg, response.avatarOfSender, 'retrive')
    if (response.roomName == document.URL.split('/chat/')[1])
        createMessage(response.userName, response.msg, response.avatarOfSender, 'retrive')
    else {
        for (const room of rooms) {
            if (room.innerHTML.trim() == response.roomName)
                room.nextElementSibling.style.opacity = "1"
        }
    }
})


// Message Sent
msgForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Message Send
    let message = input.value;
    if (message) {
        let roomName = document.URL.split('/chat/')[1]
        let msg = input.value
        socket.emit('ingoingMessage', { msg, userName, roomName, avatarOfSender });
        createMessage('', input.value, avatarOfSender, 'send')
        saveMessage(roomName, '', msg, avatarOfSender, 'send')
        msgForm.reset()
    }
})



    // Save Message shown
    ; (async () => {
        let msgs = localStorage.getItem(roomName)
        if (msgs) {
            msgs = JSON.parse(await decryptMessages(msgs))
            for (const msgObj of msgs.messages) {
                if (Object.hasOwn(msgObj, 'sender')) {
                    const sender = msgObj.sender;
                    createMessage(sender.name, msgObj.msg, sender.avatar, 'send')
                }
                else {
                    const receiver = msgObj.receiver;
                    createMessage(receiver.name, msgObj.msg, receiver.avatar, 'receive')
                }
                // if (msg.startsWith('send#x#')) {
                //     createMessage('', msg.split('send#x#')[1], 'send')
                // }
                // else {
                //     createMessage(msg.split('#x#')[0], msg.split('#x#')[1], 'retrive')
                // }
            }
        }
    })()