// Mocked Google Maps Service

export const mockMapsService = {
  findNearestPollingStations: async (_address: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: "Central Library",
            address: "123 Main St",
            hours: "7:00 AM - 8:00 PM",
            accessibility: ["Wheelchair accessible parking", "Ramp access"],
            isPrimary: true
          },
          {
            name: "Community Center",
            address: "456 Oak Ave",
            hours: "7:00 AM - 8:00 PM",
            accessibility: [],
            isPrimary: false
          }
        ]);
      }, 1000);
    });
  }
};
