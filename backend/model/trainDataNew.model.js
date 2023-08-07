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
    Stations: {
        type: Object
      },

    Distance: {
        type: Array
    },
    numberOfCoach: {
      type: Number,
    },
    numberOfSeatsPerCoach: {
      type: Number,
    },
    fare: {
        type: Number,
    }
    
   
  },
  {
    timestamps: true,
  }
);

module.exports.TrainData = model("Traindata", TrainDetailsSchema);
