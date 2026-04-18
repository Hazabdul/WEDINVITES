import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: String,
  time: String,
  venue: String,
  address: String,
  notes: String,
});

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  w: Number,
  h: Number,
  config: mongoose.Schema.Types.Mixed,
});

const invitationSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    sparse: true, // Allow multiple nulls before slug is generated
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    default: 'DRAFT',
  },
  package: {
    type: String,
    enum: ['BASIC', 'STANDARD', 'PREMIUM'],
    default: 'BASIC',
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING',
  },
  
  // Basic info for quick query
  brideName: String,
  groomName: String,
  weddingDate: Date,

  // Complex structured data
  couple: mongoose.Schema.Types.Mixed,
  event: mongoose.Schema.Types.Mixed,
  family: mongoose.Schema.Types.Mixed,
  content: mongoose.Schema.Types.Mixed,
  media: mongoose.Schema.Types.Mixed,
  theme: mongoose.Schema.Types.Mixed,
  positions: mongoose.Schema.Types.Mixed,

  // Relational data as subdocuments
  events: [eventSchema],
  widgets: [widgetSchema],

}, {
  timestamps: true,
});

const Invitation = mongoose.model('Invitation', invitationSchema);
export default Invitation;
