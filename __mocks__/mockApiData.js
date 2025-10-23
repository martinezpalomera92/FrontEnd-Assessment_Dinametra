/**
 * @file mockApiData.js
 * @description Mock data simulating a response from the NASA NeoWs API for testing.
 */
export const mockApiData = {
  "element_count": 3,
  "near_earth_objects": {
    "2025-10-20": [
      {
        "id": "1",
        "name": "(Test Asteroid 1)",
        "is_potentially_hazardous_asteroid": false,
        "close_approach_data": [
            { "miss_distance": { "kilometers": "5000000" } }
        ]
      },
      {
        "id": "2",
        "name": "(Test Asteroid 2)",
        "is_potentially_hazardous_asteroid": true,
        "close_approach_data": [
            { "miss_distance": { "kilometers": "3000000" } },
            { "miss_distance": { "kilometers": "2000000" } } // This one is closer
        ]
      }
    ],
    "2025-10-21": [
      {
        "id": "3",
        "name": "(Test Asteroid 3)",
        "is_potentially_hazardous_asteroid": false,
        "close_approach_data": [
            { "miss_distance": { "kilometers": "1000000" } } // The closest of all
        ]
      }
    ]
  }
};

/**
 * Mock data simulating a response with missing or malformed fields
 * to test for graceful failure (robustness).
 */
export const mockApiDataWithMissingFields = {
    "element_count": 2,
    "near_earth_objects": {
      "2025-10-20": [
        {
          "id": "1",
          "name": "(Test Asteroid 1)",
          "is_potentially_hazardous_asteroid": false
          // No 'close_approach_data' field
        }
      ],
      "2025-10-21": [
        {
          "id": "2",
          "name": "(Test Asteroid 2)",
          "is_potentially_hazardous_asteroid": true,
          "close_approach_data": [
            { "miss_distance": { "astronomical": "0.1" } } // No 'kilometers' field
          ]
        }
      ]
    }
};