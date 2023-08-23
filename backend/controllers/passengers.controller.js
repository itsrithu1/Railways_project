const httpStatusCodes = require("../Constants/http-status-codes");
const { formResponse } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Passenger } = require("../model/passenger.model");
const { SeatAllocation } = require("../model/seatAllocation.model");
const { TrainData } = require("../model/trainDataNew.model");
const { NewseatAllocation } = require("../model/NewseatAllocation.model");



function calculateAge(dateOfBirth) {
  console.log("In Function");
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - dob.getFullYear();

  // Check if the birthday has already occurred this year
  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

// exports.addPassenger = async (req, res) => {

//   console.log(req.body);
//   const { passengers } = req.body;
//   var i = 0;
//   var name, gender, dob, phoneNo, insurance, food, seatnum, ptrRS, ptrURS, sAvailable;

//   const train_Number = req.query.train_Number;
//   const date = req.query.date;

//   var PassengerLength = passengers.length;  
//   const seats = await SeatAllocation.findOne({ train_Number, date }).exec();

//   sAvailable = seats.seatsAvailable;

//   if(PassengerLength > sAvailable)
//   {
//     return res.status(httpStatusCodes[202].code).json(
//       formResponse(httpStatusCodes[202].code, "No Seats Available")
//     );
//   }



  
//   console.log("Seats Available ", sAvailable);

//   // to get passenger age array do the following
// let temp_passengers = {};
//   for (i = 0; i < passengers.length; i++) {
//     temp_passengers[i] = age = calculateAge(passengers[i].dob)
// }

// console.log(temp_passengers);

//   const unreservedSeat = seats.unreservedSeats;
//   const reservedSeat = seats.reservedSeats;
//   ptrURS = seats.ptrURS;
//   ptrRS = seats.ptrRS;
// // console.log("Unreserved Seats :",unreservedSeat);
// // console.log("Reserved Seats :",reservedSeat);

//   const urseatArray = Object.keys(unreservedSeat);
//   const rseatArray = Object.keys(reservedSeat);
//   const urbookedStatusArray = Object.values(unreservedSeat);
//   const rbookedStatusArray = Object.values(reservedSeat);

//   const urobject = Object(unreservedSeat)
//   const robject = Object(reservedSeat)


//   const trainData = await TrainData.find({
//     train_Number
//   });


//   let numberOfSeatsPerCoach = trainData[0].numberOfCoach;
//   let numberOfCoach = trainData[0].numberOfSeatsPerCoach;
  
//   let totalSeats=numberOfSeatsPerCoach*numberOfCoach//db
//   let noOfBookedSeats = totalSeats - sAvailable;

//   console.log("Number of Seats Per Coach : ", numberOfSeatsPerCoach);
//   console.log("Number of Coach : ", numberOfCoach);
//   console.log("Number of seat Booked: ", noOfBookedSeats);
  
  
//   let allocated = false;
//   let passengerSeats = [];

//   async function updateDB(text){

//     console.log(text);
//     if(text === "res")
//     {
//       filter = { train_Number, date };
//       update = {
//         $set: {
//           [`reservedSeats.${seatnum}`]: 1,
//           seatsAvailable: sAvailable
//         },
//       };

//       // // By setting { new: true }, you will get the updated document as a result
//       options = { new: true };

//       const updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);
//       console.log(updatedSeatAllocation);
//     }
//     if(text === 'unres')
//     {
//       filter = { train_Number, date };
//         update = {
//           $set: {
//             [`unreservedSeats.${seatnum}`]: 1,
//             seatsAvailable: sAvailable
//           },
//         };

//         // // By setting { new: true }, you will get the updated document as a result
//         options = { new: true };

//         const updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);
//         console.log(updatedSeatAllocation);
//     }
    
//   }


//   function alloc_in(seats_object, passenger) { //seats booking

//     for (let seat in seats_object) {
//         if (seats_object[seat] === 0) {
//             seats_object[seat] = 1
//             // passengers[passenger[0]].name or passengers[passenger[0]].phone to get data of that passenger
//             // console.log("id:" + passenger[0] + " age:" + passenger[1] + " seat:" + seat);
//             a = passenger
//             a[1] = seat
//             seatnum = seat
//             passengerSeats.push(a)
//             noOfBookedSeats += 1;
//             allocated = true;
//             sAvailable--;
//             return seat;
//         }
//     }
// }

// var items = Object.keys(temp_passengers).map(function (key) {
//   return [key, temp_passengers[key]];
// });
// items.sort(function (first, second) {
//   return second[1] - first[1];
// });

// temp_passengers = items //ordered wrt age in descending order
// passengerSeats = []

// if (temp_passengers.length <= totalSeats - noOfBookedSeats) { //there are less passengers than no of available seats
//   for (let passenger of temp_passengers) {
//       allocated = false
//       if (passenger[1] >= 65) {
//           for (let seat in urobject) {
//               if (urobject[seat] === 0 && parseInt(seat.substr(seat.lastIndexOf('S') + 1)) % 2) {
//                 urobject[seat] = 1;
//                   // passengers[passenger[0]].name or passengers[passenger[0]].phone to get data of that passenger
//                   // console.log("id:" + passenger[0] + " age:" + passenger[1] + " seat:" + seat);
//                   a = passenger
//                   a[1] = seat
//                   passengerSeats.push(a)
//                   seatnum = seat
//                   allocated = true;
//                   noOfBookedSeats += 1;
//                   sAvailable--;
//                   updateDB("unres")
//                   break;
//               }
//           }
//           if (!allocated) {
//             robject[alloc_in(robject, passenger)] = 1;
//             updateDB("res")
//           }
//           if (!allocated) {
//             urobject[alloc_in(urobject, passenger)] = 1;
//             updateDB("unres")
//           }
//       } else {
//         urobject[alloc_in(urobject, passenger)] = 1;
//         updateDB("unres")
//           if (!allocated) {
//             robject[alloc_in(robject, passenger)] = 1;
//             updateDB("res")
//           }
//       }
//       if (!allocated) {
//           console.log("id:" + passenger[0] + "age:" + passenger[1] + " couldn't allocate seat");
//       }
//   }
// } 


// console.log(passengerSeats) //output.
// console.log(passengerSeats[0][0])

//   var filter,update,options,updatedSeatAllocation;


//     for (i = 0; i < passengerSeats.length; i++) {
//       j=passengerSeats[i][0]
//       seatnum=passengerSeats[i][1]
//       name = passengers[j].name;
//       gender = passengers[j].gender;
//       dob = passengers[j].dob;
//       phoneNo = passengers[j].phone;
//       insurance = passengers[j].insurance;
//       food = passengers[j].food;

//       console.log("Index:",j);
//       console.log("Seat Num:",seatnum);
//       console.log("Name:",name);

      

//         // if (age < 65) {
//         //   // seatnum = urseatArray[ptrURS];
//         //   ptrURS++;
//         //   sAvailable--;
//         //   console.log("p1");
//         //   console.log(age);
//         //   console.log(seatnum);
//         //   console.log(ptrURS);

          

//         // } 
//         // else {
//         //   seatnum = rseatArray[ptrRS];
//         //   ptrRS++;
//         //   sAvailable--;
//         //   console.log("p2");
//         //   console.log(age);
//         //   console.log(seatnum);
//         //   console.log(ptrRS);

//         //   filter = { train_Number, date };
//         // update = {
//         //   $set: {
//         //     [`reservedSeats.${seatnum}`]: 1,
//         //     ptrRS: ptrRS,
//         //     seatsAvailable: sAvailable
//         //   },
          
          
          
//         //   };
//         //   // By setting { new: true }, you will get the updated document as a result
//         //   options = { new: true };
//         //   updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);

//         // }

//         // if(passengerSeats)

//         try {
//           await Passenger .create({
            
//             name,
//             gender,
//             dob,
//             phoneNo,
//             train_Number,
//             seat_Number: seatnum
//           });

//         } catch (error) {
//           console.log(error);
//         }
//     }

//   res.status(httpStatusCodes[200].code).json(formResponse(httpStatusCodes[200].code, "Passenger Created"));
// };






exports.addPassenger = async (req, res) => {

  console.log(req.body);
  const { passengers } = req.body;
  var i = 0,j=0;
  var name, gender, dob, phoneNo, insurance, food, seatnum, ptrRS, ptrURS, sAvailable;

  const train_Number = req.query.train_Number;
  const date = req.query.date;
  const source = req.query.source;
  const destination = req.query.destination;
  console.log("Train Number : ",train_Number);
  console.log("Date : ",date);

  var PassengerLength = passengers.length;  
  const seats = await NewseatAllocation.findOne({ train_Number, date }).exec();
  // console.log("Seats : ",seats);

  // sAvailable = seats.seatsAvailable;

  // if(PassengerLength > sAvailable)
  // {
  //   return res.status(httpStatusCodes[202].code).json(
  //     formResponse(httpStatusCodes[202].code, "No Seats Available")
  //   );
  // }



  
  // console.log("Seats Available ", sAvailable);

  // to get passenger age array do the following
let temp_passengers = {};
  for (i = 0; i < passengers.length; i++) {
    temp_passengers[i] = age = calculateAge(passengers[i].dob)
}
var items = Object.keys(temp_passengers).map(function (key) {
    return [key, temp_passengers[key]];
  });
  items.sort(function (first, second) {
    return second[1] - first[1];
  });
  
  temp_passengers = items //ordered wrt age in descending order

console.log(temp_passengers);

  const unreservedSeat = seats.unreservedSeats;
  const reservedSeat = seats.reservedSeats;
  ptrURS = seats.ptrURS;
  ptrRS = seats.ptrRS;
// console.log("Unreserved Seats :",unreservedSeat);
// console.log("Reserved Seats :",reservedSeat);

  const urseatArray = Object.keys(unreservedSeat);
  const rseatArray = Object.keys(reservedSeat);
  const urbookedStatusArray = Object.values(unreservedSeat);
  const rbookedStatusArray = Object.values(reservedSeat);
const s = "C3-S37"
console.log("S : ",s);
  console.log("Unreserved Seat : ", urseatArray[0]);
  console.log("Unreserved Values : ", seats.unreservedSeats[s]);
  
  const stationArray = Object.keys(seats.unreservedSeats[s]);
  console.log("Stations  : ", stationArray);
  console.log("Value : ", seats.unreservedSeats[urseatArray[i]][source]);
  // console.log("Length : ",  urseatArray.length  );

  async function updateDB(text, sm){

        console.log("Seat Num in Update : ",sm);
        if(text === "res")
        {
          

          filter = { train_Number, date };
          update = {
            $set: {
              [`reservedSeats.${sm}.${source}`]: 1,
              [`reservedSeats.${sm}.${destination}`]: 2
            }
          };
    
          // // By setting { new: true }, you will get the updated document as a result
          options = { new: true };
    
          const updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);
          // const updatedSeatAllocation = await SeatAllocation.findOne(filter);
console.log("In Update DB");
          console.log(updatedSeatAllocation);
        }
        if(text === 'unres')
        {
          filter = { train_Number, date };
            update = {
              $set: {
                [`unreservedSeats.${sm}.${source}`]: 1,
              [`unreservedSeats.${sm}.${destination}`]: 2
              }
            };
    
            // // By setting { new: true }, you will get the updated document as a result
            options = { new: true };
    
            const updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);
            console.log(updatedSeatAllocation);
        }
        
      }
seatnum=0;
    function seatBookForRes(){
      for(j=0;j<rseatArray.length;j++)
      {
        if(seats.reservedSeats[rseatArray[j]][source] != 1)
        {
            seatnum = rseatArray[j];
          }
          if(seatnum!=0)
          {
            if(seats.reservedSeats[rseatArray[j]][destination] != 1)
            {
            seats.reservedSeats[rseatArray[j]][source] = 1
            seats.reservedSeats[rseatArray[j]][destination] = 2
            console.log("Seat Number : ",seatnum);
            console.log(source, seats.reservedSeats[rseatArray[j]][source]); 
            console.log(destination, seats.reservedSeats[rseatArray[j]][destination]);
            console.log("-------------");
            updateDB("res", seatnum)


            return;
          }
          else{
            seatnum =0;
            console.log("No Seats are available");
          }
        }

        
      }
    
    }

    function seatBookForUnres(){
      for(i=0;i<urseatArray.length;i++) {
        if(seats.unreservedSeats[urseatArray[i]][source] != 1)
        {
            seatnum = urseatArray[i];
            // console.log("Unres : " ,seatnum);
        }

        if(seatnum!=0)
        {
          // console.log("In 2if");
          if(seats.unreservedSeats[urseatArray[i]][destination] != 1)
          {
            // console.log("In 3if");
          seats.unreservedSeats[urseatArray[i]][source] = 1
          seats.unreservedSeats[urseatArray[i]][destination] = 2
          console.log("Seat Number : ",seatnum);
          console.log(source, seats.unreservedSeats[urseatArray[i]][source]); 
          console.log(destination, seats.unreservedSeats[urseatArray[i]][destination]); 
          console.log("-------------");
          updateDB("unres",seatnum)

          return;
        }
        else{
          seatnum =0;
          console.log("No Seats are available");
        }
      }
      }
    }


  for (let passenger of temp_passengers){
    
    console.log("Passenger Age ", passenger[1]);
    
      if(passenger[1] >= 65)
      {
        seatnum=0;
        seatBookForRes();
      }
      else{
        seatnum=0;
        seatBookForUnres();
      }
      


  }
  




//   const urobject = Object(unreservedSeat)
//   const robject = Object(reservedSeat)


//   const trainData = await TrainData.find({
//     train_Number
//   });


//   let numberOfSeatsPerCoach = trainData[0].numberOfCoach;
//   let numberOfCoach = trainData[0].numberOfSeatsPerCoach;
  
//   let totalSeats=numberOfSeatsPerCoach*numberOfCoach//db
//   let noOfBookedSeats = totalSeats - sAvailable;

//   console.log("Number of Seats Per Coach : ", numberOfSeatsPerCoach);
//   console.log("Number of Coach : ", numberOfCoach);
//   console.log("Number of seat Booked: ", noOfBookedSeats);
  
  
//   let allocated = false;
//   let passengerSeats = [];

//   async function updateDB(text){

//     console.log(text);
//     if(text === "res")
//     {
//       filter = { train_Number, date };
//       update = {
//         $set: {
//           [`reservedSeats.${seatnum}`]: 1,
//           seatsAvailable: sAvailable
//         },
//       };

//       // // By setting { new: true }, you will get the updated document as a result
//       options = { new: true };

//       const updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);
//       console.log(updatedSeatAllocation);
//     }
//     if(text === 'unres')
//     {
//       filter = { train_Number, date };
//         update = {
//           $set: {
//             [`unreservedSeats.${seatnum}`]: 1,
//             seatsAvailable: sAvailable
//           },
//         };

//         // // By setting { new: true }, you will get the updated document as a result
//         options = { new: true };

//         const updatedSeatAllocation = await SeatAllocation.findOneAndUpdate(filter, update, options);
//         console.log(updatedSeatAllocation);
//     }
    
//   }


//   function alloc_in(seats_object, passenger) { //seats booking

//     for (let seat in seats_object) {
//         if (seats_object[seat] === 0) {
//             seats_object[seat] = 1
//             // passengers[passenger[0]].name or passengers[passenger[0]].phone to get data of that passenger
//             // console.log("id:" + passenger[0] + " age:" + passenger[1] + " seat:" + seat);
//             a = passenger
//             a[1] = seat
//             seatnum = seat
//             passengerSeats.push(a)
//             noOfBookedSeats += 1;
//             allocated = true;
//             sAvailable--;
//             return seat;
//         }
//     }
// }

// var items = Object.keys(temp_passengers).map(function (key) {
//   return [key, temp_passengers[key]];
// });
// items.sort(function (first, second) {
//   return second[1] - first[1];
// });

// temp_passengers = items //ordered wrt age in descending order
// passengerSeats = []

// if (temp_passengers.length <= totalSeats - noOfBookedSeats) { //there are less passengers than no of available seats
//   for (let passenger of temp_passengers) {
//       allocated = false
//       if (passenger[1] >= 65) {
//           for (let seat in urobject) {
//               if (urobject[seat] === 0 && parseInt(seat.substr(seat.lastIndexOf('S') + 1)) % 2) {
//                 urobject[seat] = 1;
//                   // passengers[passenger[0]].name or passengers[passenger[0]].phone to get data of that passenger
//                   // console.log("id:" + passenger[0] + " age:" + passenger[1] + " seat:" + seat);
//                   a = passenger
//                   a[1] = seat
//                   passengerSeats.push(a)
//                   seatnum = seat
//                   allocated = true;
//                   noOfBookedSeats += 1;
//                   sAvailable--;
//                   updateDB("unres")
//                   break;
//               }
//           }
//           if (!allocated) {
//             robject[alloc_in(robject, passenger)] = 1;
//             updateDB("res")
//           }
//           if (!allocated) {
//             urobject[alloc_in(urobject, passenger)] = 1;
//             updateDB("unres")
//           }
//       } else {
//         urobject[alloc_in(urobject, passenger)] = 1;
//         updateDB("unres")
//           if (!allocated) {
//             robject[alloc_in(robject, passenger)] = 1;
//             updateDB("res")
//           }
//       }
//       if (!allocated) {
//           console.log("id:" + passenger[0] + "age:" + passenger[1] + " couldn't allocate seat");
//       }
//   }
// } 


// console.log(passengerSeats) //output.
// console.log(passengerSeats[0][0])

//   var filter,update,options,updatedSeatAllocation;


//     for (i = 0; i < passengerSeats.length; i++) {
//       j=passengerSeats[i][0]
//       seatnum=passengerSeats[i][1]
//       name = passengers[j].name;
//       gender = passengers[j].gender;
//       dob = passengers[j].dob;
//       phoneNo = passengers[j].phone;
//       insurance = passengers[j].insurance;
//       food = passengers[j].food;

//       console.log("Index:",j);
//       console.log("Seat Num:",seatnum);
//       console.log("Name:",name);

      


//         try {
//           await Passenger .create({
            
//             name,
//             gender,
//             dob,
//             phoneNo,
//             train_Number,
//             seat_Number: seatnum
//           });

        // } 
        // catch (error) {
        //   console.log(error);
        // }
    // }

  res.status(httpStatusCodes[200].code).json(formResponse(httpStatusCodes[200].code, "Passenger Created"));
};