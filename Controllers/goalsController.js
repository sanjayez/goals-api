const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'get goals'
    })
})

const postGoal = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please send text')
    }
    res.status(201).json({
        message: 'Goal created'
    })
})

const updateGoal = asyncHandler (async (req, res) => {
    res.status(200).json({
        message: `updated goal ${req.params.id}`
    })
})

const deleteGoal = asyncHandler (async (req, res) => {
    res.status(200).json({
        message: `Goal deleted ${req.params.id}`
    })
})


module.exports = {
    getGoals,
    postGoal,
    updateGoal,
    deleteGoal
}