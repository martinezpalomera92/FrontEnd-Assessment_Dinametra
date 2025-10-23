/**
 * @file dataProcessor.test.js
 * @description Unit tests for the dataProcessor module (Req 8).
 */

// We use '..' to go "up one level" from __tests__ to the root, then into 'js/'
import { processDailyData, processHazardData, processDistanceData } from '../js/dataProcessor.js';
import { mockApiData, mockApiDataWithMissingFields } from '../__mocks__/mockApiData.js';

describe('Data Processor Module', () => {

  describe('processDailyData', () => {
    it('should correctly count total asteroids per day', () => {
      const result = processDailyData(mockApiData);
      expect(result.labels).toEqual(['2025-10-20', '2025-10-21']);
      expect(result.data).toEqual([2, 1]); // 2 on day 1, 1 on day 2
    });
  });

  describe('processHazardData', () => {
    it('should correctly count hazardous vs. non-hazardous asteroids (in Spanish)', () => {
      const result = processHazardData(mockApiData);
      // Check that UI labels are in Spanish
      expect(result.labels).toEqual(['Potencialmente Peligrosos', 'No Peligrosos']);
      // Check data (1 hazardous, 2 non-hazardous)
      expect(result.data).toEqual([1, 2]);
    });
  });

  describe('processDistanceData', () => {
    it('should find closest approach, sort, strip parentheses, and limit to 10', () => {
        const result = processDistanceData(mockApiData);

        // Check that parentheses are stripped from names
        expect(result.labels[0]).toBe('Test Asteroid 3'); // Was "(Test Asteroid 3)"
        
        // Check that it's sorted by distance (Asteroid 3 is closest)
        expect(result.data[0]).toBe(1000000);

        // Check that it finds the *closest* of multiple approaches (Asteroid 2)
        expect(result.labels[1]).toBe('Test Asteroid 2');
        expect(result.data[1]).toBe(2000000);

        // Check that it's limited to 10
        expect(result.labels.length).toBeLessThanOrEqual(10);
    });

    it('should handle missing or malformed data gracefully', () => {
        // This test uses the mock with missing fields
        const result = processDistanceData(mockApiDataWithMissingFields);

        // Should return empty arrays but not crash
        expect(result.labels).toEqual([]);
        expect(result.data).toEqual([]);
    });
  });
});