const express = require('express')
const router = express.Router();

const {
    getAllUsers,
    createUser,
    createExercise,
    getLogs
} = require('./controllers')

router.route("/").get(getAllUsers).post(createUser)
router.route('/:_id/exercises').post(createExercise)
router.route('/:_id/logs').get(getLogs)

module.exports = router