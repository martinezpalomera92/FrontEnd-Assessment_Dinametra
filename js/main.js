/**
 * @file main.js
 * @module main
 * @description The main entry point for the application.
 * It imports all necessary modules, initializes event listeners,
 * and orchestrates the data fetching and rendering process.
 */

import { fetchNeoData } from './api.js'; //
import { processDailyData, processHazardData } from './dataProcessor.js'; //
import { updateDailyLineChart, updateHazardDoughnutChart } from './charts.js'; //
// TODO: Import the UI status updater module you created (e.g., './ui.js')
// import { updateUIStatus } from './ui.js';

/**
 * The core function to fetch, process, and render dashboard data.
 * It orchestrates the entire flow from API call to chart rendering.
 *
 * @async
 * @param {string} startDate - The start date in YYYY-MM-DD format.
 * @param {string} endDate - The end date in YYYY-MM-DD format.
 */
async function renderDashboard(startDate, endDate) {
  // TODO: Show loading state to the user
  // updateUIStatus('loading'); 

  try {
    // 1. Get data from the API
    const apiData = await fetchNeoData(startDate, endDate); //

    // 2. Process data into chart-friendly formats
    const dailyData = processDailyData(apiData); //
    const hazardData = processHazardData(apiData); //

    // 3. Render the charts with the processed data
    updateDailyLineChart(dailyData.labels, dailyData.data); //
    updateHazardDoughnutChart(hazardData.labels, hazardData.data); //

    // 4. TODO: Hide loading message and show charts
    // updateUIStatus('loaded'); //

  } catch (error) {
    // 5. If any step fails, show an error message to the user
    console.error('Failed to render dashboard:', error); //
    // TODO: Display the error message in the UI
    // updateUIStatus('error', error.message || 'Could not load data.'); //
  }
}

/**
 * Initializes the dashboard application.
 * Sets up event listeners for filters and triggers the initial data load.
 */
function initializeDashboard() {
  // Get references to DOM elements
  const startDateInput = document.getElementById('startDate'); //
  const endDateInput = document.getElementById('endDate'); //
  const applyButton = document.getElementById('applyFilters'); //

  // Add click listener for the filter button
  applyButton.addEventListener('click', () => { //
    const start = startDateInput.value; //
    const end = endDateInput.value; //
    
    // TODO: Add date validation here (e.g., check for 7-day range)

    // Re-render the dashboard with the new date range
    renderDashboard(start, end); //
  });

  // Perform the initial data load with default dates
  renderDashboard(startDateInput.value, endDateInput.value); //
}

// Wait for the DOM to be fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', initializeDashboard); //