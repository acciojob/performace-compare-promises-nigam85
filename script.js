// Array of API URLs
const apiUrls = [
    'https://api.example.com/1',
    'https://api.example.com/2',
    // Add more API URLs here
];

// Function to fetch data from a single API
function fetchData(apiUrl) {
    return fetch(apiUrl).then(response => response.json());
}

// Function to measure the time taken for a Promise to resolve
function measureTime(promise) {
    const startTime = performance.now();
    return promise.then(() => performance.now() - startTime);
}

// Function to compare Promise.all and Promise.any
async function comparePerformance() {
    const allPromises = apiUrls.map(apiUrl => measureTime(fetchData(apiUrl)));
    const anyPromise = Promise.any(allPromises);

    const [allTime, anyTime] = await Promise.all([Promise.all(allPromises), anyPromise]);

    // Display the results on the webpage
    document.getElementById('output-all').textContent = allTime.reduce((acc, time) => acc + time, 0);
    document.getElementById('output-any').textContent = anyTime;

    // Note: 'allTime' is an array of times taken for each Promise in Promise.all
}

// Call the comparison function
comparePerformance();
