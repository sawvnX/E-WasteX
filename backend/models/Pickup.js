import mongoose from 'mongoose';

const PickupSchema = new mongoose.Schema(
  {
    pickupId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userPhone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    landmark: String,
    scheduledDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    items: [Object],
    status: {
      type: String,
      enum: [
        'REQUEST_CREATED',
        'COLLECTOR_ASSIGNED',
        'PICKUP_SCHEDULED',
        'COLLECTED',
        'SORTING_CENTER',
        'PROCESSING',
        'RECYCLED',
      ],
      default: 'REQUEST_CREATED',
    },
    collectorId: String,
    collectorName: String,
    collectorPhone: String,
    estimatedPickupTime: String,
    proofImageUrl: String,
    actualCollectedWeightKg: Number,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Pickup', PickupSchema);
