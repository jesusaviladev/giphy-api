const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./mongo.js')
const loginRouter = require('./routes/loginRouter.js')
const registerRouter = require('./routes/registerRouter.js')
const usersRouter = require('./routes/usersRouter.js')


const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => {

	response.send('<h1>Giphy App Users API</h1>')
})

app.use('/login', loginRouter)

app.use('/register', registerRouter)

app.use('/users', usersRouter)

app.use((request, response, next) => {
	response.status(404).end()
})

app.use((error, request, response, next) => {

	console.error(error)

	if(error.name === 'CastError'){
	    response.status(400).end()
	}

	else if(error.name === 'JsonWebTokenError'){
		response.status(401).end()
	}

	response.status(500).end()
})

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`)
})


module.exports = { server, app }