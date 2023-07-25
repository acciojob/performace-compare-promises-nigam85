// Array of API URLs
const apiUrls = [
  "https://api.example.com/api1",
  "https://api.example.com/api2",
  // Add more API URLs here as needed
];

// Function to fetch data from an API
async function fetchData(url) {
  const startTime = performance.now();
  try {
    const response = await fetch(url);
    const data = await response.json();
    const endTime = performance.now();
    return { data, time: endTime - startTime };
  } catch (error) {
    const endTime = performance.now();
    return { error, time: endTime - startTime };
  }
}

// Function to fetch data from multiple APIs using Promise.all()
async function fetchAllData() {
  const promises = apiUrls.map((url) => fetchData(url));
  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.log("Error occurred during Promise.all():", error);
    return [];
  }
}

// Function to fetch data from multiple APIs using Promise.any()
async function fetchAnyData() {
  const promises = apiUrls.map((url) => fetchData(url));
  try {
    const result = await Promise.any(promises);
    return [result];
  } catch (error) {
    console.log("Error occurred during Promise.any():", error);
    return [];
  }
}

// Function to display results in the table
function displayResultsInTable(id, results) {
  const tableBody = document.getElementById(id);
  for (const { data, time, error } of results) {
    const row = tableBody.insertRow();
    const apiCell = row.insertCell();
    const timeCell = row.insertCell();
    const statusCell = row.insertCell();
    apiCell.innerText = data ? "Success" : "Error";
    timeCell.innerText = data ? `${time} ms` : "N/A";
    statusCell.innerText = data ? JSON.stringify(data) : JSON.stringify(error);
  }
}

// Fetch data using Promise.all() and display results in the table
fetchAllData().then((results) => displayResultsInTable("output-all", results));

// Fetch data using Promise.any() and display results in the table
fetchAnyData().then((results) => displayResultsInTable("output-any", results));
