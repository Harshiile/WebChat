const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected');
    } catch (error) {
        console.log('Error : While connecting Database');
        return error
    }
}

module.exports = connect