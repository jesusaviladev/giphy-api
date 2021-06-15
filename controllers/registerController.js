const bcrypt = require('bcrypt')
const User = require('../models/User.model.js')

const registerController = {}

registerController.newUser = async (request, response, next) => {
	//add a new user 
	const { username, password } = request.body

	if(!username || !password){
		return response.status(400).json({
			error: 'Missing data'
		})
	}

	const userExists = await User.find({username: username})

	if(userExists.length > 0){
		return response.status(400).json({
			error: 'User already exists'
		})
	}

	else {
		const hashedPassword = await bcrypt.hash(password, 10)

		const userToAdd = new User({
			username: username,
			password: hashedPassword
		})

		try {
			const savedUser = await userToAdd.save()

			response.status(201).json(savedUser)
		}

		catch(error){
			next(error)
		}
	}
}

module.exports = registerController