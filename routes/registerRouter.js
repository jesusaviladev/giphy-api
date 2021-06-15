const express = require('express')
const registerRouter = express.Router()
const registerController = require('../controllers/registerController.js')

registerRouter.post('/', registerController.newUser)

module.exports = registerRouter