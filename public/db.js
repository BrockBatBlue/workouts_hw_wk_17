let db;
// create a new db request for a "budget" database.
const request = indexedDB.open("workout", 1);

request.onupgradeneeded = function (event) {
  // create object store called "pending" and set autoIncrement to true
  db = event.target.result;
  const workoutStore = db.createObjectStore("pending", {
    autoIncrement: true,
  });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log("Uh oh, this did not work.");
  // log error here
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  const transaction = db.transaction(["pending"], "readwrite");
  // access your pending object store
  const workPending = transaction.objectStore("pending");
  // add record to your store with add method.
  workPending.add(record);
}

function checkDatabase() {
  // open a transaction on your pending db
  const transaction = db.transaction(["pending"], "readwrite");
  // access your pending object store
  const workOut = transaction.objectStore("pending");
  // get all records from store and set to a variable
  const getAll = workOut.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          const transaction = db.transaction.objectStore(
            ["pending"],
            "readwrite"
          );
          // access your pending object store
          const workOut = transaction.objectStore("pending");
          // clear all items in your store
          workOut.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
