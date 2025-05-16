require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('../models/Destination');

const destinations = [
  {
    name: "United States",
    code: "us",
    description: "Explore the diverse landscapes and vibrant cities of America.",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    places: [
      {
        name: "New York",
        description: "The city that never sleeps, featuring iconic landmarks like Times Square and Central Park.",
        imageUrl: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.0060
        }
      },
      {
        name: "Grand Canyon",
        description: "One of the world's natural wonders, carved by the Colorado River.",
        imageUrl: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 36.0544,
          longitude: -112.1401
        }
      },
      {
        name: "Miami Beach",
        description: "Sunny beaches, art deco architecture, and vibrant nightlife.",
        imageUrl: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 25.7907,
          longitude: -80.1300
        }
      }
    ]
  },
  {
    name: "Cancun",
    code: "cancun",
    description: "Paradise on Earth with pristine beaches and ancient Mayan ruins.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    places: [
      {
        name: "Playa Delfines",
        description: "One of Cancun's most beautiful public beaches with stunning views.",
        imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 21.0419,
          longitude: -86.8283
        }
      },
      {
        name: "Isla Mujeres",
        description: "Small island paradise known for snorkeling and beaches.",
        imageUrl: "https://images.unsplash.com/photo-1518690855495-79c1c0d31560?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 21.2324,
          longitude: -86.7319
        }
      },
      {
        name: "Chichen Itza",
        description: "Ancient Mayan ruins and one of the New Seven Wonders of the World.",
        imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 20.6843,
          longitude: -88.5678
        }
      }
    ]
  },
  {
    name: "India",
    code: "india",
    description: "A land of diverse cultures, ancient traditions, and stunning architecture.",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&auto=format&fit=crop&q=60",
    places: [
      {
        name: "Taj Mahal",
        description: "An iconic symbol of love and one of the world's most beautiful buildings.",
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 27.1751,
          longitude: 78.0421
        }
      },
      {
        name: "Jaipur",
        description: "The Pink City known for its stunning palaces and rich history.",
        imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 26.9124,
          longitude: 75.7873
        }
      },
      {
        name: "Goa",
        description: "Beautiful beaches, Portuguese architecture, and vibrant nightlife.",
        imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=60",
        coordinates: {
          latitude: 15.2993,
          longitude: 74.1240
        }
      }
    ]
  }
];

async function seedDestinations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    // Insert new destinations
    const result = await Destination.insertMany(destinations);
    console.log(`Seeded ${result.length} destinations`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding destinations:', error);
    process.exit(1);
  }
}

seedDestinations(); 