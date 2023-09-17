/*
  Adam Karpovich 314080383
  Veronika Kovaleva 321777583
*/
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { getCosts } from "../utils/idb";
import "./CalendarApp.css";
import AppointmentSubmission from "./AppointmentSubmission";
import DurationSelector from "./DurationSelector";
import AppointmentsList from "./AppointmentList";
import TestInterface from "./TestInterface";

function CalendarApp() {
  // State to manage selected date, duration, and costs (not appointments)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState("day");
  const [costs, setCosts] = useState([]);

  // Filter costs based on duration and selected date (not appointments)
  const filteredCosts = costs.filter((cost) => {
    const costDate = new Date(cost.date);

    // Filter costs based on the selected duration
    if (duration === "day") {
      return costDate.toDateString() === selectedDate.toDateString();
    } else if (duration === "week") {
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

  // State to track the total cost of filtered costs (not appointments)
  const [totalCost, setTotalCost] = useState(0);

  // Fetch costs from IndexedDB and update the state
  useEffect(() => {
    async function fetchCosts() {
      try {
        const costsFromDB = await getCosts();
        setCosts(costsFromDB);
      } catch (error) {
        console.error("Error fetching costs:", error);
      }
    }

    // Fetch costs when the component mounts
    fetchCosts();
  }, []); // Run only on component mount

  useEffect(() => {
    // Calculate total cost based on filtered costs using reduce (not appointments)
    const total = filteredCosts.reduce((sum, cost) => {
      return sum + parseFloat(cost.sum);
    }, 0);

    // Update the total cost in state
    setTotalCost(total);
  }, [filteredCosts]);

  return (
    <div className="calendar-app">
      <h2>Expense Calendar App</h2>
      {/* Component for submitting costs */}
      <AppointmentSubmission
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        costs={costs}
        setCosts={setCosts}
      ></AppointmentSubmission>
      <div className="appointment-list">
        <h3>
          Spendings on {selectedDate.toDateString()} - {duration}
        </h3>
        {/* Component for selecting duration */}
        <DurationSelector setDuration={setDuration}></DurationSelector>
        {/* Component for displaying costs */}
        <AppointmentsList
          costs={filteredCosts}
          duration={duration}
          selectedDate={selectedDate}
          totalCost={totalCost}
        ></AppointmentsList>
      </div>
      <div className="calendar-app">
        <TestInterface />
      </div>
    </div>
  );
}

export default CalendarApp;
