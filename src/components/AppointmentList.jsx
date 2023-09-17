/*
  Adam Karpovich 314080383
  Veronika Kovaleva 321777583
*/
import React, { useState, useEffect } from "react";

function CostsList(props) {
  // Destructure props for easier access
  const { costs, duration, selectedDate } = props;

  // State to track the total cost of filtered costs
  const [totalCost, setTotalCost] = useState(0);

  // Filter costs based on duration and selected date
  const filteredCosts = costs.filter((cost) => {
    const costDate = new Date(cost.date);

    // Check the duration to determine filtering logic
    if (duration === "day") {
      return costDate.toDateString() === selectedDate.toDateString();
    } else if (duration === "week") {
      // Calculate the start and end of the selected week
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      return costDate >= startOfWeek && costDate <= endOfWeek;
    } else if (duration === "month") {
      return (
        costDate.getFullYear() === selectedDate.getFullYear() &&
        costDate.getMonth() === selectedDate.getMonth()
      );
    } else if (duration === "year") {
      return costDate.getFullYear() === selectedDate.getFullYear();
    }
    // Return true by default if duration is not recognized
    return true;
  });

  useEffect(() => {
    // Calculate total cost based on filtered costs using reduce
    const total = filteredCosts.reduce((sum, cost) => {
      return sum + cost.sum;
    }, 0);

    // Update the total cost in state
    setTotalCost(total);
  }, [filteredCosts]); // Re-run this effect whenever filteredCosts changes

  return (
    <>
      <ul>
        {filteredCosts.map((cost, index) => (
          <li key={index}>
            <strong>{cost.date.toDateString()}</strong> <br />
            <strong>{cost.category}: </strong> {cost.itemName}
            <br />
            <strong>Description:</strong> {cost.description}
            <br />
            <strong>Sum:</strong> ${cost.sum}
          </li>
        ))}
      </ul>
      <div className="total-sum">Total Cost: ${totalCost}</div>
    </>
  );
}

export default CostsList;
