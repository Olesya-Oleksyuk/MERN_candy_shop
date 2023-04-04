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
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

// сопоставляем введеный пользователем пароль с зашифрованным паролем из БД
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// pre-save метод для хэширования строкового пароля при добавлении новой записи
// модели в БД (при регистрации и при смене пароля)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create model from the schema
const User = mongoose.model('User', userSchema);

// export model
export default User;
