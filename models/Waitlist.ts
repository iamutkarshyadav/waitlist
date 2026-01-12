import mongoose, { Schema, model, models } from 'mongoose';

const WaitlistSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    default: 'Waitlist Site',
  },
});

const Waitlist = models.Waitlist || model('Waitlist', WaitlistSchema);

export default Waitlist;
