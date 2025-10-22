/**
 * @file charts.js
 * @module charts
 * @description Handles the creation, rendering, and updating of all charts using Chart.js.
 */

/**
 * Stores the Chart.js instance for the daily line chart.
 * This allows the chart to be updated dynamically without re-creating it.
 * @type {Chart|null}
 */
let dailyLineChart = null; //

/**
 * Stores the Chart.js instance for the hazard doughnut chart.
 * This allows the chart to be updated dynamically without re-creating it.
 * @type {Chart|null}
 */
let hazardDoughnutChart = null; //

/**
 * Creates or updates the daily trend line chart.
 * If the chart instance already exists, it updates the data. Otherwise, it creates a new chart.
 *
 * @param {string[]} labels - An array of date strings for the X-axis.
 * @param {number[]} data - An array of NEO counts for the Y-axis.
 */
export function updateDailyLineChart(labels, data) {
  const ctx = document.getElementById('dailyLineChart')?.getContext('2d'); //

  if (!ctx) { //
    console.error('Failed to find the canvas element for dailyLineChart');
    return; //
  }

  if (dailyLineChart) {
    // If chart exists, update its data and refresh
    dailyLineChart.data.labels = labels; //
    dailyLineChart.data.datasets[0].data = data; //
    dailyLineChart.update(); //
  } else {
    // If chart doesn't exist, create it
    dailyLineChart = new Chart(ctx, { //
      type: 'line', //
      data: {
        labels: labels, //
        datasets: [{
          label: 'Total NEOs by Date', //
          data: data, //
          borderColor: 'rgb(54, 162, 235)', //
          backgroundColor: 'rgba(54, 162, 235, 0.5)', //
          tension: 0.2 //
        }]
      },
      options: {
        responsive: true, //
        plugins: {
          title: {
            display: true, //
            text: 'Daily Near-Earth Object Trend' //
          },
          tooltip: {
            enabled: true //
          },
          legend: {
            display: true //
          }
        }
      }
    });
  }
}

/**
 * Creates or updates the hazard distribution doughnut chart.
 * If the chart instance already exists, it updates the data. Otherwise, it creates a new chart.
 *
 * @param {string[]} labels - An array of labels (e.g., 'Hazardous', 'Not Hazardous').
 * @param {number[]} data - An array of counts corresponding to the labels.
 */
export function updateHazardDoughnutChart(labels, data) {
  const ctx = document.getElementById('hazardDoughnutChart')?.getContext('2d'); //

  if (!ctx) { //
    console.error('Failed to find the canvas element for hazardDoughnutChart');
    return; //
  }

  if (hazardDoughnutChart) {
    // If chart exists, update its data and refresh
    hazardDoughnutChart.data.labels = labels; //
    hazardDoughnutChart.data.datasets[0].data = data; //
    hazardDoughnutChart.update(); //
  } else {
    // If chart doesn't exist, create it
    hazardDoughnutChart = new Chart(ctx, { //
      type: 'doughnut', //
      data: {
        labels: labels, //
        datasets: [{
          label: 'NEO Count', //
          data: data, //
          backgroundColor: [ //
            'rgb(255, 99, 132)', // Red for Hazardous
            'rgb(75, 192, 192)'   // Green/Cyan for Not Hazardous
          ],
          hoverOffset: 4 //
        }]
      },
      options: {
        responsive: true, //
        plugins: {
          title: {
            display: true, //
            text: 'NEO Risk Distribution' //
          },
          tooltip: {
            enabled: true //
          },
          legend: {
            display: true //
          }
        }
      }
    });
  }
}