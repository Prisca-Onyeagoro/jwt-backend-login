import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // for hashing the  passwords
import asyncHandler from 'express-async-handler'; // for handling error exceptions
import User from '../Models/Usermodels.js'; // for storing our users information

// @desc  Register a new User
// @route POST /api/users
// @access  public

export const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('please add all fields');
  }
  // checking if the user already exists / have an account
  const UserExist = await User.findOne({ email });
  if (UserExist) {
    res.status(400);
    throw new Error(
      'you have an account with us already kindly Login. thanks.'
    );
  }

  // hashing the password of the user using salting and hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create the user from the usermodel or using the usermodel

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});

// @desc  Authenticate a user
// @route Login /api/users/Login
// @access  public

export const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // checking for the user email//find the user by his/her email

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid Credentials');
  }
});
// @desc  Get user data
// @route GEt /api/users/me
// @access  Private

export const GetMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});
// Generate a json web token(jwt)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });
};
