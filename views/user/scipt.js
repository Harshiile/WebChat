let avatar = document.querySelector('#avatarImg')

// Fields
let avatarInput = document.querySelector('#avatarInput')
let usernameInput = document.querySelector('#username')

// Error message
let username_error = document.querySelector('#username_error')

const uploadImage = (url) => {
    avatar.src = `${url}`
}

avatarInput.addEventListener('change', () => {
    let imageUrl = URL.createObjectURL(avatarInput.files[0])
    uploadImage(imageUrl)
})

// Username check
usernameInput.addEventListener('input', async () => {
    let data = { 'username': usernameInput.value }
    let res = await fetch('/checkusername', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let userExist = await res.json()
    if (userExist) {
        username_error.innerHTML = `Username already exist`;
    }
    else {
        username_error.innerHTML = ``;
    }
})
