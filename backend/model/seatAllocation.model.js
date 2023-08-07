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




async function updateSeatAllocations() {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 1); // Adjust as needed

  const day = String(pastDate.getDate()).padStart(2, "0");
  const month = String(pastDate.getMonth() + 1).padStart(2, "0");
  const year = pastDate.getFullYear();

  const formattedPastDate = `${day}-${month}-${year}`;

  try {
    const pastSeatAllocations = await SeatAllocation.find();

    for (const allocation of pastSeatAllocations) {
      const { train_Number, name, unreservedSeats, reservedSeats, date } =
        allocation;

      const allocationDateComponents = date.split("-");
      const allocationDate = new Date(
        allocationDateComponents[2], // year
        allocationDateComponents[1] - 1, // month (months are 0-indexed in JavaScript)
        allocationDateComponents[0] // day
      );

      if (allocationDate < pastDate) {
        // console.log(`Allocation for Train ${train_Number} (${name}) is in the past with date${allocationDate}.`);
        await SeatAllocation.deleteOne({ train_Number, name, date });
        if (unreservedSeats != undefined) {
          for (const obj of unreservedSeats) {
            for (const key in obj) {
              obj[key] = 0;
            }
          }
        }

        if (reservedSeats != undefined) {
          for (const obj of reservedSeats) {
            for (const key in obj) {
              obj[key] = 0;
            }
          }
        }

        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 30);
        const day = String(newDate.getDate()).padStart(2, "0");
        const month = String(newDate.getMonth() + 1).padStart(2, "0");
        const year = newDate.getFullYear();

        const formattedCurrentDate = `${day}-${month}-${year}`;

        await SeatAllocation.create({
          train_Number,
          name,
          unreservedSeats: unreservedSeats,
          reservedSeats: reservedSeats,
          ptrURS: "0",
          ptrRS: "0",
          date: formattedCurrentDate,
        });
      }
    }

    return res
      .status(httpStatusCodes[200].code)
      .json(formResponse(httpStatusCodes[200].code, "ok"));
  } catch (error) {
    console.error("Error updating Seat Allocations:", error);
  }
}

// Schedule the cron job
cron.schedule("0 0 * * *", () => {
  updateSeatAllocations();
  console.log("Cron job executed");
});

module.exports.SeatAllocation = SeatAllocation;
