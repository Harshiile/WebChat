const express = require('express')
const router = express.Router()
const multer = require('multer')

// Controllers
const checkLoginAuth = require('../middlewares/loginAuth')
const { pushUserIntoDB, updateUser } = require('../controllers/post/pushUser')
const checkUserName = require('../controllers/post/checkUserName')
const getUserFromDB = require('../controllers/post/getUserFromDB')
const getUserDetails = require('../middlewares/getUserDetails')
const { createRoom, getRooms, deleteRoom } = require('../controllers/post/rooms')
const { encryptMessage, decryptMessage } = require('../controllers/post/messageCookie')

//Create DiskStroage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`)
    }
})
const upload = multer({ storage })

// Routes
router.post('/signup', pushUserIntoDB)
router.post('/login', getUserFromDB)
router.post('/checkusername', checkUserName)
router.post('/createroom', checkLoginAuth, createRoom)
router.post('/deleteroom', deleteRoom)
router.post('/getroom', checkLoginAuth, getRooms)
router.post('/update', upload.single('avatar'), checkLoginAuth, getUserDetails, updateUser)
router.post('/user', checkLoginAuth, updateUser)
router.post('/encryption', encryptMessage)
router.post('/decryption', decryptMessage)





module.exports = router