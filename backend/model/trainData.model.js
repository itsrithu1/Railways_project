const { Schema, model } = require("mongoose");

const TrainDetailsSchema = Schema(
  {
    
    train_Number: {
      type: Number,
      // index: true,
      unique: true,
      // sparse:true
    },
    name: {
      type: String,
    },
    source: {
      type: String,
    },
    destination: {
      type: String,
    },
    numberOfCoach: {
      type: Number,
    },
    numberOfSeatsPerCoach: {
      type: Number,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    fare:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports.Train = model("Train", TrainDetailsSchema);
