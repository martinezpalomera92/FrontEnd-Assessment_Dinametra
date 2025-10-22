/**
 * @file ui.js
 * @module ui
 * @description Handles all DOM manipulation for user feedback (loading states, error messages).
 * This module adheres to the Single Responsibility Principle by separating
 * DOM logic from the main application orchestration in main.js.
 * Fulfills Requirement 5 (Error Handling).
 */

// Get references to UI elements once when the module loads for efficiency
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const statusContainer = document.getElementById('status-container');
const chartWrapper = document.querySelector('.charts-wrapper');

/**
 * Updates the user interface to reflect the current application state.
 * Shows/hides loading indicators, error messages, and the main chart content.
 *
 * @function updateUIStatus
 * @param {'loading' | 'error' | 'loaded'} status - The state to display.
 * @param {string} [message] - An optional message (primarily used for errors).
 * @returns {void}
 */
export function updateUIStatus(status, message = '') {
    // Hide all state elements by default before processing
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // The status container itself is visible by default unless content is 'loaded'
    statusContainer.style.display = 'block';

    // Hide charts if we are loading or if an error occurred
    if (status === 'loading' || status === 'error') {
        chartWrapper.style.display = 'none';
    }

    switch (status) {
        case 'loading':
            // Show only the loading spinner/message
            loadingMessage.style.display = 'block';
            break;
        case 'error':
            // Show only the error message, populated with the error content
            errorMessage.textContent = message || 'Ocurrió un error desconocido.'; // <-- Changed to Spanish
            errorMessage.style.display = 'block';
            break;
        case 'loaded':
            // Content is loaded, hide the entire status container
            statusContainer.style.display = 'none';
            // Show the charts, using 'flex' as defined in styles.css
            chartWrapper.style.display = 'flex';
            break;
        default:
            // Fallback for an invalid state, which helps in debugging
            console.warn(`Invalid UI status called: ${status}`);
            errorMessage.textContent = `Un estado de UI inválido (${status}) fue activado.`; // <-- Changed to Spanish
            errorMessage.style.display = 'block';
    }
}