// import React, { useState } from 'react';

// const AdminSearchTrain = () => {
//   const [searchtrainNumber, setSearchTrainNumber] = useState('');
//   const [searchResult, setSearchResult] = useState('');

//   const handleTrainNumberChange = (event) => {
//     setTrainNumber(event.target.value);
//   };

//   const handleSearch = () => {
//     // Here, you can perform the actual search based on the train number
//     // For demonstration purposes, we'll just display the result on the page.
//     setSearchResult(`Searching for train number: ${trainNumber}`);

//     try {
            
//       fetch(`http://localhost:3001/api/v1/admin/searchTrain`, {
//     method: "GET",
//     crossDomain: true,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       "Accesss-Control-Allow-Origin": "*",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       // console.log("recieved data is", data.data)
      

//       if (data.flag=="OK") {
//         // let temp=data.data
//             // console.log(temp[0])
//         setTrainDetails(data.data)
//             } else {
//               // alert("No Trains Found")
              
//           }

//       });



//   } catch (err) {
//     console.error("Error:", err);
    
//   }




//   };

//   return (
//     <div>
     
//       <div>
//         <label htmlFor="trainNumber">Enter Train Number:</label>
//         <input
//           type="text"
//           id="trainNumber"
//           value={trainNumber}
//           onChange={handleTrainNumberChange}
//         />
//       </div>
//       <div>
//         <button onClick={handleSearch}>Submit</button>
//       </div>
//       <div>
//         <p>{searchResult}</p>
//       </div>
//     </div>
//   );
// };

// export default AdminSearchTrain;
