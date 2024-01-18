const express = require('express')
const userController = require('../controllers/userController')

const { signup, login } = userController
const userAuth = require('../middleware/userAuth')

const router = express.Router()

//registre route
router.post('/signup', userAuth.saveUser, signup)

//login route
router.post('/login', login)

module.exports = router