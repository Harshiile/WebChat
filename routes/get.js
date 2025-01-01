const express = require('express')
const router = express.Router()
const cors = require('cors')

router.use(cors())
// Controllers
const Update = require('../controllers/get/update')
const User = require('../controllers/get/user')
const { Chat, WebChat } = require('../controllers/get/chat')
const Profile = require('../controllers/get/profile')
const clearCookie = require('../controllers/post/clearCookie')

// Middlewares
const checkLoginAuth = require('../middlewares/loginAuth')
const noToAuth = require('../middlewares/noToAuth')
const getUserDetails = require('../middlewares/getUserDetails')
const userAuth = require('../middlewares/userAuth')

// Routes
router.get('/', (req, res) => { res.redirect('/login') })
router.get('/login', noToAuth, (req, res) => { res.render('login') })
router.get('/signup', noToAuth, (req, res) => { res.render('signup') })
router.get('/user', checkLoginAuth, userAuth, User)
router.get('/update', checkLoginAuth, getUserDetails, Update)
router.get('/profile', checkLoginAuth, getUserDetails, Profile)
router.get('/chat/webchat', getUserDetails, WebChat)
router.get('/chat/:roomName', checkLoginAuth, getUserDetails, Chat)
router.get('/logout', clearCookie)

module.exports = router