const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
	username: String,
	password: String,
	favs: [String]
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
	}
})

const User = mongoose.model('users', userSchema)

module.exports = User