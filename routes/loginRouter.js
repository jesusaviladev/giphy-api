const express = require('express')
const loginRouter = express.Router()
const loginController = require('../controllers/loginController.js')

loginRouter.post('/', loginController.login)

module.exports = loginRouter