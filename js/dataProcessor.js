/**
 * @file dataProcessor.js
 * @module dataProcessor
 * @description Contains "pure" functions to transform raw NASA API data into a simple, chart-ready format.
 * This separation of logic makes the code modular and easy to test (Req 4, 8).
 */

/**
 * Processes raw API data to extract daily NEO counts for the line chart (Req 1).
 *
 * @function processDailyData
 * @param {object} apiData - The raw JSON object from the NASA API.
 * @returns {{labels: string[], data: number[]}} An object with arrays for chart.js.
 */
export function processDailyData(apiData) {
  // 'near_earth_objects' is an object where keys are dates
  const neoData = apiData.near_earth_objects;
  // Get an array of the date strings (e.g., ["2025-10-22", "2025-10-23"])
  const dates = Object.keys(neoData).sort();
  // Map each date to the *number* of asteroids recorded for that date
  const data = dates.map(date => neoData[date].length);
  return { labels: dates, data: data };
}

/**
 * Processes raw API data to count hazardous vs. non-hazardous NEOs for the doughnut chart (Req 1).
 *
 * @function processHazardData
 * @param {object} apiData - The raw JSON object from the NASA API.
 * @returns {{labels: string[], data: number[]}} An object with labels and corresponding counts.
 */
export function processHazardData(apiData) {
  let hazardousCount = 0;
  let nonHazardousCount = 0;
  // Get all arrays of asteroids from all dates
  const allAsteroidArrays = Object.values(apiData.near_earth_objects);
  // Use .flat() to merge the arrays-of-arrays into a single, flat array of all asteroids.
  // Then, loop over the unified array to count them.
  allAsteroidArrays.flat().forEach(asteroid => {
    if (asteroid.is_potentially_hazardous_asteroid) {
      hazardousCount++;
    } else {
      nonHazardousCount++;
    }
  });

  return {
    labels: ['Potencialmente Peligrosos', 'No Peligrosos'], // <-- Changed to Spanish
    data: [hazardousCount, nonHazardousCount]
  };
}

/**
 * Processes raw API data to extract close approach distances for a bar chart.
 * This function identifies the closest approach distance for each unique NEO
 * and organizes them for display.
 *
 * @function processDistanceData
 * @param {object} apiData - The raw JSON object from the NASA API.
 * @returns {{labels: string[], data: number[]}} An object with asteroid names (labels)
 * and their closest approach distances in kilometers (data).
 */
export function processDistanceData(apiData) {
    const neoMap = new Map(); // Use a Map to store the closest distance for each unique NEO ID

    // Iterate through all dates and all NEOs
    Object.values(apiData.near_earth_objects).flat().forEach(neo => {
        const neoId = neo.id;
        // Use the name, but remove the parentheses for a cleaner label
        const neoName = neo.name.replace(/[()]/g, '').trim();

        // Find the closest approach for this NEO within the given date range
        let closestDistance = Infinity; // Start with a very large number
        
        // Ensure close_approach_data exists and is an array
        if (neo.close_approach_data && Array.isArray(neo.close_approach_data)) {
            neo.close_approach_data.forEach(cad => {
                // Ensure the path to kilometers exists
                if (cad && cad.miss_distance && cad.miss_distance.kilometers) {
                    const distanceKm = parseFloat(cad.miss_distance.kilometers);
                    if (distanceKm < closestDistance) {
                        closestDistance = distanceKm;
                    }
                }
            });
        }

        // Store or update the closest distance for this NEO
        // Only add if a valid distance was found
        if (closestDistance !== Infinity) {
            if (!neoMap.has(neoId) || closestDistance < neoMap.get(neoId).distance) {
                neoMap.set(neoId, { name: neoName, distance: closestDistance });
            }
        }
    });

    // Sort NEOs by their closest approach distance for better visualization
    const sortedNeos = Array.from(neoMap.values()).sort((a, b) => a.distance - b.distance);

    const labels = sortedNeos.map(neo => neo.name);
    const data = sortedNeos.map(neo => neo.distance);

    // Limit to top 10 for readability in a chart
    return {
        labels: labels.slice(0, 10),
        data: data.slice(0, 10)
    };
}