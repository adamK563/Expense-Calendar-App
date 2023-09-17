/*
  Adam Karpovich 314080383
  Veronika Kovaleva 321777583
*/
import React, { useEffect } from "react";
import { openCostsDB, addCost } from "../utils/idb";

function TestInterface() {
  useEffect(() => {
    // Function to run the IndexedDB test
    const runTest = async () => {
      try {
        // Open the IndexedDB connection here
        const db = await openCostsDB("costsdb", 1);

        // Add the first cost record
        const result1 = await addCost({
          sum: 200,
          category: "HOUSING",
          description: "rent for 01.2023"
        });

        // Add the second cost record
        const result2 = await addCost({
          sum: 300,
          category: "FOOD",
          description: "food for weekend"
        });

        if (db) {
          console.log("Creating db succeeded");
        }

        if (result1) {
          console.log("Adding 1st cost succeeded");
        }

        if (result2) {
          console.log("Adding 2nd cost succeeded");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the runTest function when the component mounts
    runTest();
  }, []); // Empty dependency array means this effect runs once after mounting

  return (
    <div>
      <h2>IndexedDB Test</h2>
      <div>Check the browser console for test results.</div>
    </div>
  );
}

export default TestInterface;
