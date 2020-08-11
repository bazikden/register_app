const router = require('express').Router()
const auth = require('../middleware/auth')
const { getAllUsers, saveNewUser, loginUser, authUser, updateUser, updateUserStatus, delUser } = require('../controllers/admin')

router.route('/users').get(getAllUsers).post(saveNewUser)
router.route('/users/update').post(updateUser)
router.route('/users/update-status').post(updateUserStatus)
router.route('/users/delete').post(delUser)

router.route('/login').post(loginUser)
router.route('/auth').get(auth, authUser)

module.exports = router