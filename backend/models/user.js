const mongoose = require('mongoose')
const { Schema } = mongoose




const userModel = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {
        type: String,
        // Just Testing 
        default: 'https://freepikpsd.com/media/2019/10/default-user-profile-image-png-6-Transparent-Images.png'
    },


})

module.exports = mongoose.model('User', userModel)