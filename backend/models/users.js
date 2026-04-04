import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10);
    next();
});


const User = await mongoose.model('users',userSchema);
export default User;
