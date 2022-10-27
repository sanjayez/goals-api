const express = require('express')
const router = express.Router()
const { getUsers, registerUser, updateUser, deleteUser, loginUser, getMe } = require('../Controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getUsers).post(protect, registerUser)
router.route('/me').get(protect, getMe)
router.route('/login').post(loginUser)
router.route('/:id').put(protect, updateUser).delete(protect, deleteUser)

module.exports = router