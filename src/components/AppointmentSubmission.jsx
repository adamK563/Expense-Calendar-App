/*
  Adam Karpovich 314080383
  Veronika Kovaleva 321777583
*/
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { addCost } from "../utils/idb";

function AppointmentSubmission(props) {
  // State to manage cost form input
  const [costDetails, setCostDetails] = useState({
    itemName: "",
    sum: "",
    category: "",
    description: ""
  });

  // Destructuring props for easier access
  const { selectedDate, setSelectedDate, costs, setCosts } = props;

  // Function to handle cost submission
  const handleCostSubmit = async () => {
    // Create a new cost object
    const newCost = {
      date: selectedDate,
      itemName: costDetails.itemName,
      sum: parseFloat(costDetails.sum),
      category: costDetails.category,
      description: costDetails.description
    };

    try {
      // Add the cost to the database and get the ID
      const costId = await addCost(newCost);
      newCost.id = costId;

      // Update the costs state with the new cost
      setCosts([...costs, newCost]);

      // Clear the cost form
      setCostDetails({
        itemName: "",
        sum: "",
        category: "",
        description: ""
      });
    } catch (error) {
      console.error("Error adding cost:", error);
    }
  };

  // Function to handle input changes in the cost form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <div className="calendar-app">
      <div className="calendar-container">
        {/* Calendar component for selecting a date */}
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>
      <div className="appointment-form">
        <h3>Spendings Submission</h3>
        {/* Input fields for cost details */}
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={costDetails.itemName}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="number"
          name="sum"
          placeholder="Sum"
          value={costDetails.sum}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <select
          name="category" // Updated field name
          value={costDetails.category} // Updated field name
          onChange={handleInputChange}
        >
          <option value="">Select Spending Category</option>
          <option value="Food">Food</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Travel">Travel</option>
          <option value="Housing">Housing</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={costDetails.description}
          onChange={handleInputChange}
          autoComplete="off"
        />

        {/* Button to submit the cost */}
        <button onClick={handleCostSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default AppointmentSubmission;
