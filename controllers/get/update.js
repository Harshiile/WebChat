const Update = (req, res) => {
    let username = req.body.username;
    let uname = req.body.uname;
    let avatar = req.body.avatar || '\\uploads\\user.png';
    return res.render('user',
        { title: 'Update YourSelf', username, avatar, uname, submitBtnStatus: 'Update' }
    )
}

module.exports = Update