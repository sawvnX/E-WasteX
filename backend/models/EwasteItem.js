import mongoose from 'mongoose';

const EwasteItemSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userName: String,
    category: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    serialNumber: String,
    condition: { type: String, required: true },
    workingStatus: { type: Boolean, default: false },
    purchaseYear: Number,
    weightKg: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    description: String,
    imageUrl: String,
    hazardLevel: { type: String, default: 'Low' },
    recyclability: { type: String, default: 'High' },
    estimatedValueINR: { type: Number, default: 0 },
    rewardPoints: { type: Number, default: 100 },
    status: { type: String, enum: ['SUBMITTED', 'COLLECTED', 'SORTED', 'DISMANTLED', 'RECYCLED'], default: 'SUBMITTED' },
    lifecycle: [
      {
        status: String,
        timestamp: String,
        location: String,
        note: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('EwasteItem', EwasteItemSchema);
