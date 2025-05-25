import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  phone: { type: String, required: true },
  // identification_Number: { type: Number, required: true },
  adress: { type: String, required: true },
  profile: { type: String },
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
const User = mongoose.model('User', userSchema);
export default User;
