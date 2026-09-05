import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  fromApplication: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  recipients: [{
    type: String,
    required: true
  }],
  
  response: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  type: {
    type: String,
    required: true,
    enum: ['Notification', 'Alert', 'Report']
  },
  status: {
    type: String,
    required: true,
    enum: ['scheduled', 'sent', 'failed', 'pending'],
    default: 'scheduled'
  },
  scheduledAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true,
  collection: 'emaillogs'
});

// Check if model already exists to avoid overwriting
export default mongoose.models.EmailLog || mongoose.model("EmailLog", emailLogSchema);