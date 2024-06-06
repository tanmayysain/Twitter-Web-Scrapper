const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trendsSchema = new Schema({
  uniqueId: {
    type: Schema.Types.ObjectId,
  },
  trends: [
    {
      name: {
        type: String,
      },
    },
  ],

  timestamp: { 
    type: Date, 
    default: Date.now
    },
  ipAddress: {
    type: String,
  },
});

module.exports = mongoose.model("TwitterTrends", trendsSchema);
