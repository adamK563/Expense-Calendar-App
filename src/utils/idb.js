/*
  Adam Karpovich 314080383
  Veronika Kovaleva 321777583
*/
// Define the database and store names
const DB_NAME = "costsdb";
const STORE_NAME = "costs";

// Function to open the IndexedDB database
const openCostsDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    // Event handler for database upgrade (schema changes)
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
        autoIncrement: true
      });

      // Create an index for searching by date
      store.createIndex("date", "date", { unique: false });
    };

    // Event handler for successful database opening
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    // Event handler for errors during database opening
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Function to add a cost to the IndexedDB
const addCost = async (cost) => {
  const db = await openCostsDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.add(cost);
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Function to retrieve costs from the IndexedDB
const getCosts = async () => {
  const db = await openCostsDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export { addCost, getCosts, openCostsDB };
