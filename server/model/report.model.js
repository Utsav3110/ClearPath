import mongoose from "mongoose";

// Define the Report Schema
const reportSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,   // Must be 'Point' for GeoJSON
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],  // Array of two numbers [longitude, latitude]
      required: true
    }
  },
 
  description: {
    type: String,
    maxlength: 250  // Optional short description for users to provide more info
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User who made the report
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  }
},{
    timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
