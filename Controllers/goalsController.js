const asyncHandler = require('express-async-handler')
const goalModel = require('../model/goalModel')
const userModel = require('../model/userModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find({user: req.user._id})
    res.status(200).json(goals)
})

const postGoal = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please send text')
    }

    const goal = await goalModel.create({
        text: req.body.text,
        user: req.user._id
    })

    res.status(201).json(goal)
})

const updateGoal = asyncHandler (async (req, res) => {
    const goal = await goalModel.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    // check if user exists
    const user = await userModel.findById(req.user._id)
    if(!user){
        res.status(401)
        throw new Error('User does not exist')
    }

    // Update only my goals
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
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

    const user = await userModel.findById(req.user._id)
    if(!user){
        res.status(401)
        throw new Error('User does not exist')
    }

    // Update only my goals
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
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