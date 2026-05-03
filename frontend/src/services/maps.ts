import { Loader } from "@googlemaps/js-api-loader";
import { z } from "zod";

/**
 * Zod schema for Polling Station data.
 */
export const PollingStationSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string(),
  hours: z.string(),
  accessibility: z.array(z.string()),
  isPrimary: z.boolean(),
  distance: z.string().optional(),
  wait: z.string().optional()
});

export type PollingStation = z.infer<typeof PollingStationSchema>;

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  version: "weekly",
  libraries: ["places"]
});

/**
 * Google Maps Service for locating polling stations.
 */
export const mapsService = {
  /**
   * Initializes the Google Maps library.
   */
  init: async () => {
    return await loader.load();
  },

  /**
   * Finds nearest polling stations based on an address.
   * Currently mocks the API call but structure is production-ready.
   */
  findNearestPollingStations: async (address: string): Promise<PollingStation[]> => {
    // In a real app, this would use the Google Places Service or a backend proxy
    console.log(`Searching for polling stations near: ${address}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = [
          {
            name: "Central Library",
            address: "123 Main St, Anytown, CA",
            hours: "7:00 AM - 8:00 PM",
            accessibility: ["Wheelchair accessible parking", "Ramp access"],
            isPrimary: true,
            distance: "0.4 miles",
            wait: "5 mins"
          },
          {
            name: "Lincoln High Gymnasium",
            address: "456 Oak Ave, Anytown, CA",
            hours: "7:00 AM - 8:00 PM",
            accessibility: ["Accessible entrance"],
            isPrimary: false,
            distance: "1.2 miles",
            wait: "15 mins"
          }
        ];
        resolve(mockData.map(d => PollingStationSchema.parse(d)));
      }, 1000);
    });
  }
};
