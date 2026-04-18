import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  invitationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invitation',
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  attending: {
    type: Boolean,
    required: true,
  },
  guestCount: {
    type: Number,
    default: 1,
  },
  message: String,
}, {
  timestamps: true,
});

const RSVP = mongoose.model('RSVP', rsvpSchema);
export default RSVP;
