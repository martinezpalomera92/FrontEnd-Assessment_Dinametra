/**
 * @file main.js
 * @module main
 * @description The main entry point for the application.
 * This file is the "orchestrator." It imports all other modules,
 * initializes event listeners, and coordinates the data flow:
 * 1. Listen for user input (click).
 * 2. Show 'loading' state.
 * 3. Validate input.
 * 4. Call 'api.js' to fetch data.
 * 5. Call 'dataProcessor.js' to transform data.
 * 6. Call 'charts.js' to render data.
 * 7. Call 'ui.js' to show the final state (charts or error).
 */

// Import all modules (Req 4)
import { fetchNeoData } from './api.js';
import { processDailyData, processHazardData, processDistanceData } from './dataProcessor.js';
import { updateDailyLineChart, updateHazardDoughnutChart, updateDistanceBarChart } from './charts.js';
import { updateUIStatus } from './ui.js';

/**
 * The core function to fetch, process, and render dashboard data.
 * It's an async function to allow 'await' for the API call.
 *
 * @async
 * @param {string} startDate - The start date in YYYY-MM-DD format.
 * @param {string} endDate - The end date in YYYY-MM-DD format.
 */
async function renderDashboard(startDate, endDate) {
  // 1. Show 'loading' state immediately (Req 5)
  updateUIStatus('loading');

  try {
    // 2. --- Input Validation (Business Logic) ---
    // It's better to catch this error *before* sending a bad request to the API.
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays > 7) {
      // This error will be caught by the 'catch' block below
      throw new Error('El rango de fechas no puede ser mayor a 7 días.'); // <-- Changed to Spanish
    }
    // --- End Validation ---

    // 3. Fetch data (API call)
    const apiData = await fetchNeoData(startDate, endDate);
    
    // Verify data integrity before processing
    if (!apiData || !apiData.near_earth_objects) {
        throw new Error("La API no devolvió los datos esperados."); // <-- Changed to Spanish
    }

    // 4. Process data (Pure logic)
    const dailyData = processDailyData(apiData);
    const hazardData = processHazardData(apiData);
    const distanceData = processDistanceData(apiData); // Process data for the new chart

    // 5. Render data (DOM/Canvas)
    updateDailyLineChart(dailyData.labels, dailyData.data);
    updateHazardDoughnutChart(hazardData.labels, hazardData.data);
    updateDistanceBarChart(distanceData.labels, distanceData.data); // Render the new chart

    // 6. Show 'loaded' state
    updateUIStatus('loaded');

  } catch (error) {
    // 7. Show 'error' state (Req 5)
    // This one 'catch' block handles *all* errors: validation, network, API, processing, etc.
    console.error('Failed to render dashboard:', error);
    // Pass the specific error message (now in Spanish) to the UI module
    updateUIStatus('error', error.message);
  }
}

/**
 * Initializes the dashboard application.
 * This function is the entry point, called once the DOM is ready.
 * Its job is to find the filter elements and attach the event listener.
 */
function initializeDashboard() {
  // Get references to DOM elements
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const applyButton = document.getElementById('applyFilters');

  // --- Event Listener ---
  // Attach the main event listener for the filter button (Req 2)
  applyButton.addEventListener('click', () => {
    const start = startDateInput.value;
    const end = endDateInput.value;
    
    // When clicked, just call the main orchestrator function
    renderDashboard(start, end);
  });

  // --- Initial Load ---
  // Load the dashboard with the default dates when the page first loads.
  renderDashboard(startDateInput.value, endDateInput.value);
}

// Wait for the DOM to be fully loaded before trying to find elements
document.addEventListener('DOMContentLoaded', initializeDashboard);