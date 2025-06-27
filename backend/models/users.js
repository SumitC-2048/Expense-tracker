import mongoose from 'mongoose';

// username, email, password

const userSchema = new mongoose.Schema({
    Username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

const User = mongoose.model('users',userSchema);
export default User;
