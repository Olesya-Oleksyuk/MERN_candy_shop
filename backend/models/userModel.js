import mongoose from 'mongoose';

// create schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true
});

// create model from the schema
const User = mongoose.model('User', userSchema);

// export model
export default User;