/**
 * @file api.test.js
 * @description Unit tests for the api module, mocking global fetch (Req 8).
 */

import { fetchNeoData } from '../js/api.js';
import { mockApiData } from '../__mocks__/mockApiData.js';

// Tell Jest to replace the global 'fetch' function with a mock
global.fetch = jest.fn();

// This runs before each test, clearing any previous mock data
beforeEach(() => {
  fetch.mockClear();
});

describe('API Module', () => {

  it('should fetch data successfully and return JSON', async () => {
    // Mock a successful fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApiData) // Mock the .json() method
    });

    const data = await fetchNeoData('2025-10-20', '2025-10-21');

    // Check that fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("start_date=2025-10-20&end_date=2025-10-21")
    );

    // Check that we returned the correct data
    expect(data).toEqual(mockApiData);
  });

  it('should throw an error when network response is not ok', async () => {
    // Mock a failed fetch response (e.g., HTTP 400)
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ error_message: 'Date range limit exceeded' })
    });

    // We expect 1 assertion (the 'catch' block) to be called
    expect.assertions(1);

    try {
      await fetchNeoData('2025-10-20', '2025-10-30');
    } catch (error) {
      // Check that our module threw the correct error message
      expect(error.message).toContain('Date range limit exceeded');
    }
  });
});