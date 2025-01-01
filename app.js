const express = require('express')
const cookieParser = require('cookie-parser')
const getRoutes = require('./routes/get')
const postRoutes = require('./routes/post')

const app = express()

// Middlewares
app.use(express.static('./views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('view engine', 'ejs');
app.set('views', './views')

// Routes
app.use(getRoutes)
app.use(postRoutes)

module.exports = app