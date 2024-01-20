const express = require('express')
const userController = require('../controllers/userController')

const { signup, login } = userController
const userAuth = require('../middleware/userAuth')

const { createGame, getAllGamesForUser, createRound, getAllRoundsForGame } = require('../controllers/gameController')

const router = express.Router()

//register route
router.post('/signup', userAuth.saveUser, signup)
//login route
router.post('/login', login)

//game routes
router.post('/games', createGame);
router.get('/games/:userMail', getAllGamesForUser);
router.post('/rounds', createRound);
router.get('/round/:gameId', getAllRoundsForGame);


module.exports = router