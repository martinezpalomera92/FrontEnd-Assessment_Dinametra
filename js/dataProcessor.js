/**
 * @file dataProcessor.js
 * @module dataProcessor
 * @description Contains functions to transform raw NASA API data into a simple, chart-ready format.
 */

/**
 * Processes raw API data to extract daily NEO counts for a line chart.
 *
 * @param {object} apiData - The raw JSON object from the NASA API.
 * @returns {{labels: string[], data: number[]}} An object containing arrays for chart labels (dates) and data (counts).
 */
export function processDailyData(apiData) {
  const neoData = apiData.near_earth_objects; //
  const dates = Object.keys(neoData).sort(); //

  // Map each date to the number of asteroids recorded for that date
  const data = dates.map(date => neoData[date].length); //

  return { labels: dates, data }; //
}

/**
 * Processes raw API data to count hazardous vs. non-hazardous NEOs for a doughnut chart.
 *
 * @param {object} apiData - The raw JSON object from the NASA API.
 * @returns {{labels: string[], data: number[]}} An object containing labels ('Potentially Hazardous', 'Not Hazardous') and their corresponding counts.
 */
export function processHazardData(apiData) {
  let hazardousCount = 0; //
  let nonHazardousCount = 0; //

  // Get all arrays of asteroids from all dates
  const allAsteroidArrays = Object.values(apiData.near_earth_objects); //

  // Flatten the array of arrays into a single array of all asteroids, then count them
  allAsteroidArrays.flat().forEach(asteroid => { //
    if (asteroid.is_potentially_hazardous_asteroid) { //
      hazardousCount++; //
    } else {
      nonHazardousCount++; //
    }
  });

  return {
    labels: ['Potentially Hazardous', 'Not Hazardous'], //
    data: [hazardousCount, nonHazardousCount] //
  };
}