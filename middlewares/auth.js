const jwt = require('jsonwebtoken')

const auth = (request,response, next) => {

	const authorization = request.get('authorization')
	let token = ''
	if(authorization && authorization.toLowerCase().startsWith('bearer')){
		token = authorization.substring(7)
	} else {
		return response.status(401).json({
			error: 'Not Authorized'
		})
	}

	const decodedToken = jwt.verify(token, process.env.SECRET)

	if(!token || !decodedToken.id){
		return response.status(401).json({
			error: 'Token missing or invalid'
		})
	}

	else {
		const { id } = decodedToken

		request.userId = id

		next()
	}

}


module.exports = auth