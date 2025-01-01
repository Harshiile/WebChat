let form = document.querySelector('form')
let chatBtn = document.querySelector('#gotochat')
let liveRooms = document.querySelectorAll('#live_rooms li')

for (const room of liveRooms) {
    room.addEventListener('click', () => {
        window.location.href = `/chat/${room.firstElementChild.innerHTML.trim()}`
    })
}

const uploadImage = (url) => {
    avatar.src = `${url}`
}

chatBtn.addEventListener('click', () => {
    if (liveRooms.length > 0)
        window.location.href = liveRooms[0].querySelector('a').href
    else
        window.location.href = '/chat/webchat'
})
