import React, { useState } from 'react';

const AdminSearchTrain = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleTrainNumberChange = (event) => {
    setTrainNumber(event.target.value);
  };

  const handleSearch = () => {
    // Here, you can perform the actual search based on the train number
    // For demonstration purposes, we'll just display the result on the page.
    setSearchResult(`Searching for train number: ${trainNumber}`);
  };

  return (
    <div>
     
      <div>
        <label htmlFor="trainNumber">Enter Train Number:</label>
        <input
          type="text"
          id="trainNumber"
          value={trainNumber}
          onChange={handleTrainNumberChange}
        />
      </div>
      <div>
        <button onClick={handleSearch}>Submit</button>
      </div>
      <div>
        <p>{searchResult}</p>
      </div>
    </div>
  );
};

export default AdminSearchTrain;
