const { Schema, model } = require("mongoose");
const cron = require("node-cron");

const SeatAllocationDetailsSchema = Schema(
  {
    train_Number: {
      type: Number,
    },
    name: {
      type: String,
    },
    unreservedSeats: {
      type: Object, // Use Map to store key-value pairs
    },
    reservedSeats: {
      type: Object, // Use Map to store key-value pairs
    },
    ptrURS: {
      type: Number,
    },
    ptrRS: {
      type: Number,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SeatAllocation = model("SeatAllocation", SeatAllocationDetailsSchema);

// // Schedule a cron job to run daily to delete documents with past dates
// cron.schedule("0 0 * * *", async () => {
//   const currentDate = new Date();

//   // Calculate the future date, 30 days from the current date
//   const futureDate = new Date();
//   futureDate.setDate(futureDate.getDate() + 30);

//   // Create a new document with the calculated future date

//   //CALL THE RESTAPI TO FILL ALL THE REQUIRED FIELDS IN SEATALLOC
//   // const newAllocation = new SeatAllocation({
//   //   date: futureDate,
//   // });

//   // Save the new document
//   // await newAllocation.save();

//   // Delete documents where the date is less than the current date
//   await SeatAllocation.deleteMany({ date: { $lt: currentDate } });

//   console.log("Expired documents deleted and new document created");
// });

module.exports.SeatAllocation = SeatAllocation;
