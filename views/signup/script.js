let email = document.querySelector('#email')
let password = document.querySelector('#password')
let submitBtn = document.querySelector('#submit')
let error = document.querySelector('#error')

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let data = {
        'email': email.value,
        'password': password.value
    }
    let res = await fetch('/signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.status == 200)
        window.location.href = await res.text()
    else
        error.innerHTML = await res.text()
})

// Clean Up
email.addEventListener('input', () => {
    error.innerHTML = '';
})
password.addEventListener('input', () => {
    error.innerHTML = '';
})