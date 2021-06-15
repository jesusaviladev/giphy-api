const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model.js')

const loginController = {}

loginController.login = async (request, response) => {
	//login user
	const { username, password } = request.body

	if(!username || !password){
		return response.status(400).json({
			error: 'Must submit correct data'
		})
	}

	const dbUser = await User.findOne({username: username})

	const isPasswordCorrect = dbUser === null 
	? false 
	: await bcrypt.compare(password, dbUser.password)

	if(!(dbUser && isPasswordCorrect)){
		return response.status(401).json({
			error: 'User or password are invalid'
		})
	}

	else {

		const userToSign = {
			id: dbUser.id,
			username: dbUser.username
		}

		const token = jwt.sign(userToSign, process.env.SECRET)

		response.status(202).json({
			username: dbUser.username,
			token: token
		})
	}
}

module.exports = loginController