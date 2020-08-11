const router = require('express').Router()
const { getAllConferences, saveConference, setConfStatus } = require('../controllers/conferences')

router.route('/').post(getAllConferences)
router.route('/add').post(saveConference)
router.route('/setstatus').post(setConfStatus)

module.exports = router    