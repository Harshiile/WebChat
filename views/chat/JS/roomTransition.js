let createroomBtn = document.querySelector('#createroomBtn')
let joinroomBtn = document.querySelector('#joinroomBtn')
let leaveroomBtn = document.querySelector('#leaveroomBtn')

let createroomForm = document.querySelector('#createroom')
let joinroomForm = document.querySelector('#joinroom')
let leaveroomForm = document.querySelector('#leaveroom')

let noBtn = document.querySelector('#noBtn')
let goToRightBtns = document.querySelectorAll('.goToRightBtn')

const transition = (form1, form2, form3) => {
    form1.classList.remove('transition')
    form2.classList.remove('transition')
    form3.classList.add('transition')
}


createroomBtn.addEventListener('click', () => {
    transition(leaveroomForm, joinroomForm, createroomForm)
})
joinroomBtn.addEventListener('click', () => {
    transition(leaveroomForm, createroomForm, joinroomForm)
})
leaveroomBtn.addEventListener('click', () => {
    transition(createroomForm, joinroomForm, leaveroomForm)
})
noBtn.addEventListener('click', () => {
    leaveroomForm.classList.remove('transition')
})


for (const iter of goToRightBtns) {
    iter.addEventListener("click", () => {
        iter.parentElement.classList.remove('transition')
    })
}