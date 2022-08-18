import asyncHandler from 'express-async-handler';
import Goal from '../Models/goalsmodel.js';
import User from '../Models/Usermodels.js';

// @desc getGoals
//@route  Get api/goals
//@access  Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc CreatedGoals
//@route  Create api/goals
//@access  Private
export const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    res.status(400);
    // express error handler
    throw new Error('please enter a vlaid text');
  }
  const goal = await Goal.create({
    text: req.body.id,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
// @desc UpdateGoals
//@route  Update api/goals
//@access  Private
export const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  // check if the user exist
  if (!User) {
    res.status(401);
    throw new Error('user not found');
  }
  // make sure the logedin user actually matches the goal user
  if (goal.user.toString() !== User.id) {
    res.status(401);
    throw new Error('You cant have access to another person dashboard');
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
// @desc getGoals
//@route  Get api/goals
//@access  Private
export const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  await goal.remove();
  // check if the user exist
  if (!User) {
    res.status(401);
    throw new Error('user not found');
  }
  // make sure the logedin user actually matches the goal user
  if (goal.user.toString() !== User.id) {
    res.status(401);
    throw new Error('You cant have access to another person dashboard');
  }
  res.status(200).json({ id: req.params.id });
});
