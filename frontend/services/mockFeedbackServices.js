const mockDB = [
    {
      user: "Alice",
      rating: 5,
      comment: "Beautiful place! Would visit again.",
      destination: "Ames",
      date: "May 1, 2025",
    },
    {
      user: "Bob",
      rating: 4,
      comment: "Great experience overall.",
      destination: "Ames",
      date: "May 2, 2025",
    },
  ];
  
  export const getMockFeedback = async (destination) => {
    return mockDB.filter((entry) => entry.destination === destination);
  };
  
  export const postMockFeedback = async (newFeedback) => {
    mockDB.push(newFeedback);
    return { success: true };
  };
  