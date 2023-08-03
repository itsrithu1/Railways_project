const { Schema, model } = require("mongoose");

const TicketDatasSchema = Schema(
  {
    passengerId: {
      type: String,
      unique: true,
    },
    trainId: {
       type: String,
       unique: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports.Train = model("Train", TicketDatasSchema);
