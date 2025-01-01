const connect = require('./models/connect');
const server = require('./socket');

// env setup
require('dotenv').config();
const port = process.env.PORT

// Connect the database
connect()
    .then(res => {
        server.listen(port, () => {
            console.log(`Your server running on : ${port}`);
        })
    })
    .catch(err => console.log('Failed to initialize server : ', err))
