const User = (req, res) => {
    return res.render('user',
        { title: 'Welcome to WebChat', username: ' ', avatar: '/uploads/user.png', uname: ' ', submitBtnStatus: 'Jump to chat' }
    )
}

module.exports = User