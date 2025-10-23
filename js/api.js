/**
 * @file api.js
 * @module api
 * @description Handles all network requests to the NASA NeoWs API.
 */

/**
 * The default API key for NASA APIs.
 * @const {string}
 */
const API_KEY = 'INSERT_API_KEY_HERE'; //

/**
 * The base URL for the NASA NeoWs (Near Earth Object Web Service) Feed endpoint.
 * @const {string}
 */
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed'; //

/**
 * Fetches Near Earth Object (NEO) data from the NASA API for a specified date range.
 *
 * @async
 * @function fetchNeoData
 * @param {string} startDate - The start date in YYYY-MM-DD format.
 * @param {string} endDate - The end date in YYYY-MM-DD format.
 * @returns {Promise<object>} A promise that resolves to the JSON object returned from the NASA API.
 * @throws {Error} Throws an error if the network response is not 'ok' (e.g., HTTP 400, 404, 500).
 */
export async function fetchNeoData(startDate, endDate) {
  const url = `${BASE_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`; //

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Create a more informative error message for HTTP errors
      const errorData = await response.json(); // Try to get error details from NASA's response
      throw new Error(`HTTP error! Status: ${response.status} - ${errorData.error_message || 'Error, Por favor verifica o agrega tu clave API en js/api.js'}`); //
    }
    
    return await response.json(); //
  } catch (error) {
    console.error('Error fetching API NEO data:', error); //
    // Re-throw the error so the calling function (renderDashboard) can catch it
    throw error; //
  }
}
