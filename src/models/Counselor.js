import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const counselorSchema = new mongoose.Schema({
  id: String,
  password: String,
  name: String,
  gender: String,
  phone: String,
  identification_Number: String,
  hospitalAddress: String,
  certificateFile: String,
});

counselorSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

export default mongoose.model('Counselor', counselorSchema);
