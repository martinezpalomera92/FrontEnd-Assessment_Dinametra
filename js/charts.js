/**
 * @file charts.js
 * @module charts
 * @description Handles the creation, rendering, and dynamic updating of all Chart.js instances.
 */

// REMOVED: const ChartDataLabels = window.ChartDataLabels;

/**
 * Stores the Chart.js instance for the daily line chart.
 * @type {Chart|null}
 */
let dailyLineChart = null;

/**
 * Stores the Chart.js instance for the hazard doughnut chart.
 * @type {Chart|null}
 */
let hazardDoughnutChart = null;

/**
 * Stores the Chart.js instance for the distance bar chart.
 * @type {Chart|null}
 */
let distanceBarChart = null;

/**
 * Creates or updates the daily trend line chart.
 *
 * @function updateDailyLineChart
 * @param {string[]} labels - An array of date strings for the X-axis.
 * @param {number[]} data - An array of NEO counts for the Y-axis.
 */
export function updateDailyLineChart(labels, data) {
  const ctx = document.getElementById('dailyLineChart')?.getContext('2d');
  
  if (!ctx) {
    console.error('Failed to find the canvas element for dailyLineChart');
    return;
  }

  if (dailyLineChart) {
    dailyLineChart.data.labels = labels;
    dailyLineChart.data.datasets[0].data = data;
    dailyLineChart.update();
  } else {
    dailyLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de NEOs por Día', // (Spanish UI)
          data: data,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows chart to fully adapt to container size
        plugins: {
          title: {
            display: true,
            text: 'Tendencia Diaria de Objetos Cercanos' // (Spanish UI)
          },
          tooltip: { enabled: true },
          legend: { display: true }
        }
      }
    });
  }
}

/**
 * Creates or updates the hazard distribution doughnut chart.
 *
 * @function updateHazardDoughnutChart
 * @param {string[]} labels - An array of labels (e.g., 'Hazardous').
 * @param {number[]} data - An array of counts corresponding to the labels.
 */
export function updateHazardDoughnutChart(labels, data) {
  const ctx = document.getElementById('hazardDoughnutChart')?.getContext('2d');
  
  if (!ctx) {
    console.error('Failed to find the canvas element for hazardDoughnutChart');
    return;
  }

  // REMOVED: Chart.register(ChartDataLabels);

  if (hazardDoughnutChart) {
    hazardDoughnutChart.data.labels = labels;
    hazardDoughnutChart.data.datasets[0].data = data;
    hazardDoughnutChart.update();
  } else {
    hazardDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels, // Already in Spanish from dataProcessor.js
        datasets: [{
          label: 'Conteo de NEOs', // (Spanish UI)
          data: data,
          backgroundColor: [
            'rgb(255, 99, 132)', // Red for Hazardous
            'rgb(75, 192, 192)'   // Green/Cyan for Not Hazardous
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // This is the key to fixing the "too big" issue
        plugins: {
          title: {
            display: true,
            text: 'Distribución de Riesgo de NEOs' // (Spanish UI)
          },
          tooltip: { enabled: true },
          legend: { 
            display: true,
            position: 'bottom' // Place legend at the bottom for a compact look
          }
          // REMOVED: The 'datalabels' configuration block
        }
      }
      // REMOVED: plugins: [ChartDataLabels]
    });
  }
}

/**
 * Creates or updates the close approach distances bar chart.
 *
 * @function updateDistanceBarChart
 *... (The rest of this file is correct and unchanged) ...
 * @param {string[]} labels - An array of NEO names for the X-axis.
 * @param {number[]} data - An array of closest approach distances in kilometers for the Y-axis.
 */
export function updateDistanceBarChart(labels, data) {
    const ctx = document.getElementById('distanceBarChart')?.getContext('2d');

    if (!ctx) {
        console.error('Failed to find the canvas element for distanceBarChart');
        return;
    }

    if (distanceBarChart) {
        distanceBarChart.data.labels = labels;
        distanceBarChart.data.datasets[0].data = data;
        distanceBarChart.update();
    } else {
        distanceBarChart = new Chart(ctx, {
            type: 'bar', // Bar chart type
            data: {
                labels: labels, // NEO names
                datasets: [{
                    label: 'Aproximación Más Cercana (km)', // (Spanish UI)
                    data: data, // Distances
                    backgroundColor: 'rgba(153, 102, 255, 0.6)', // Purple
                    borderColor: 'rgb(153, 102, 255)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // This makes it a horizontal bar chart
                plugins: {
                    title: {
                        display: true,
                        text: 'Top 10 Aproximaciones Más Cercanas' // (Spanish UI)
                    },
                    tooltip: { enabled: true },
                    legend: { display: false } // Not needed for a single-dataset bar chart
                },
                scales: {
                    x: { // The horizontal axis (now shows distance)
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Distancia (km)' // (Spanish UI)
                        }
                    },
                    y: { // The vertical axis (now shows names)
                        title: {
                            display: false,
                        }
                    }
                }
            }
        });
    }
}