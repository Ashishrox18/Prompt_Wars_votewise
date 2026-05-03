import { describe, it, expect, vi } from 'vitest';
import { mapsService } from './maps';

// Mock the Google Maps Loader
vi.mock('@googlemaps/js-api-loader', () => {
  return {
    Loader: class {
      load = vi.fn().mockResolvedValue({});
    },
  };
});

describe('maps service', () => {
  it('should initialize the loader', async () => {
    const result = await mapsService.init();
    expect(result).toBeDefined();
  });

  it('should return validated polling stations', async () => {
    const stations = await mapsService.findNearestPollingStations('test address');
    expect(stations).toHaveLength(2);
    expect(stations[0].name).toBe('Central Library');
    expect(stations[0].isPrimary).toBe(true);
  });
});
