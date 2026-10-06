import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'COLLECTOR', 'RECYCLER', 'ADMIN'], default: 'USER' },
    avatar: String,
    phone: String,
    address: String,
    points: { type: Number, default: 100 },
    totalRecycledKg: { type: Number, default: 0 },
    totalItemsRecycled: { type: Number, default: 0 },
    co2SavedKg: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
