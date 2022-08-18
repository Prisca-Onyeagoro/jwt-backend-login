import React from 'react';
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'your name is kindly required'],
    },
    email: {
      type: String,
      required: [true, 'please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'your name is kindly required'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

export default User;
