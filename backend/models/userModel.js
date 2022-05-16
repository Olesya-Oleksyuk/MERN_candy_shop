import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// create schema
const userSchema = mongoose.Schema(
  {
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
    },
  },
  {
    timestamps: true,
  }
);

// сопоставляем введеный пользователем пароль с зашифрованным паролем из БД
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// create model from the schema
const User = mongoose.model('User', userSchema);

// export model
export default User;
