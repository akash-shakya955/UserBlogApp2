import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  dob: { type: Date },
  age: { type: Number },
  gender: { type: String },
  city: { type: String },
  university: { type: String },
  profileImage: { type: String },
  bloodGroup: { type: String },
  height: { type: Number },
  weight: { type: Number },
  eyeColor: { type: String },
  hairColor: { type: String },
  hairType: { type: String },
  addressStreet: { type: String },
  addressCity: { type: String },
  addressState: { type: String },
  addressPostal: { type: String },
  addressCountry: { type: String },
  companyName: { type: String },
  companyDepartment: { type: String },
  companyJobTitle: { type: String },
  companyAddress: { type: String },
  companyCity: { type: String },
  companyState: { type: String },
  companyCountry: { type: String },
  password: { type: String, required: true }
});

export default mongoose.model('User', userSchema);