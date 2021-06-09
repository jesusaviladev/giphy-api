const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => {

	response.send('<h1>Hello world</h1>')
})


const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`)
})


module.exports = { server, app }