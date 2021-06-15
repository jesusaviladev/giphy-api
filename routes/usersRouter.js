const express = require('express')
const usersRouter = express.Router()
const usersController = require('../controllers/usersController.js')
const auth = require('../middlewares/auth.js')

usersRouter.get('/favs', auth, usersController.getAllFavs)

usersRouter.post('/favs/:favId', auth, usersController.addFav)

usersRouter.delete('/favs/:favId', auth, usersController.removeFav)

module.exports = usersRouter