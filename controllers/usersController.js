const User = require('../models/User.model.js')
const jwt = require('jsonwebtoken')

const usersController = {}

usersController.getAllFavs = async (request, response,next) => {
	//get all favorites
	const { userId } = request

	if(!userId){
		return response.status(400).json({
			error: "missing data"
		})
	}

	try {
		const user = await User.findById(userId)
		const favs = user.favs
		response.status(200).json(favs)
	}

	catch(error){
		next(error)
	}
}

usersController.addFav = async (request, response, next) => {
	//add a fav
	const { userId } = request
	const { favId } = request.params

	if(!favId || !userId){
		return response.status(400).json({
			error: "missing data"
		})
	}

	try {
		const user = await User.findById(userId)
		
		const alreadyExists = user.favs.some(fav => fav === favId)

		if(!alreadyExists){

			user.favs = user.favs.concat(favId)

			const newFavsUser = await user.save()

			response.status(201).json(newFavsUser.favs)

		}

		else {
			response.status(200).json(user.favs)
		}
	}

	catch(error){
		next(error)
	}

}

usersController.removeFav = async (request, response, next) => {
	//remove fav
	const { userId } = request
	const { favId } = request.params

	if(!userId){
		return response.status(400).json({
			error: "missing data"
		})
	}

	try {
		const user = await User.findById(userId)

		user.favs = user.favs.filter((fav)=> fav !== favId)

		const newFavs = await user.save()	

		response.status(202).json(newFavs.favs)
	}

	catch(error){
		next(error)
	}
}

module.exports = usersController