const express = require('express')

const router = express.Router()


router.use('/users', require('../controllers/User'))
router.use('/task', require('../controllers/Task'))



module.exports = router