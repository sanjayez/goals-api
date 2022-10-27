const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../Controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerUser)
router.route('/me').get(protect, getMe)
router.route('/login').post(loginUser)

module.exports = router
