const asyncHandler = require('express-async-handler')
const { findByIdAndDelete } = require('../model/goalModel')
const goalModel = require('../model/goalModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find()
    res.status(200).json(goals)
})

const postGoal = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please send text')
    }

    const goal = await goalModel.create({
        text: req.body.text
    })

    res.status(201).json(goal)
})

const updateGoal = asyncHandler (async (req, res) => {
    const goal = await goalModel.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler (async (req, res) => {
    const goal = await goalModel.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.remove()
    res.status(200).json(req.params.id)
})


module.exports = {
    getGoals,
    postGoal,
    updateGoal,
    deleteGoal
}