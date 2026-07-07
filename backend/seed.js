require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Bus = require('./models/bus');
const bcrypt = require('bcryptjs');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const admin = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created');
    }

    // Clear existing buses
    await Bus.deleteMany({});

    // Generate buses with dynamic dates (starting from today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const generateDate = (dayOffset, hours, minutes) => {
      const date = new Date(today);
      date.setDate(date.getDate() + dayOffset);
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    // Sample buses - Indian cities with Tamil Nadu focus
    const buses = [
      // Kanchipuram to Vellore routes (Today and next 3 days)
      {
        busNumber: 'KV001',
        from: 'Kanchipuram',
        to: 'Vellore',
        departureTime: generateDate(0, 6, 30),
        duration: 2,
        busType: 'AC',
        totalSeats: 40,
        availableSeats: Array.from({ length: 35 }, (_, i) => i + 1),
        price: 150
      },
      {
        busNumber: 'KV002',
        from: 'Kanchipuram',
        to: 'Vellore',
        departureTime: generateDate(0, 9, 15),
        duration: 2,
        busType: 'Non-AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 45 }, (_, i) => i + 1),
        price: 100
      },
      {
        busNumber: 'KV003',
        from: 'Kanchipuram',
        to: 'Vellore',
        departureTime: generateDate(0, 12, 0),
        duration: 2,
        busType: 'Semi-Sleeper',
        totalSeats: 45,
        availableSeats: Array.from({ length: 42 }, (_, i) => i + 1),
        price: 120
      },
      {
        busNumber: 'KV004',
        from: 'Kanchipuram',
        to: 'Vellore',
        departureTime: generateDate(0, 15, 45),
        duration: 2,
        busType: 'AC',
        totalSeats: 40,
        availableSeats: Array.from({ length: 30 }, (_, i) => i + 1),
        price: 150
      },
      {
        busNumber: 'KV005',
        from: 'Kanchipuram',
        to: 'Vellore',
        departureTime: generateDate(0, 18, 30),
        duration: 2,
        busType: 'Non-AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 38 }, (_, i) => i + 1),
        price: 100
      },
      // Vellore to Kanchipuram routes
      {
        busNumber: 'VK001',
        from: 'Vellore',
        to: 'Kanchipuram',
        departureTime: generateDate(0, 7, 0),
        duration: 2,
        busType: 'Non-AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 48 }, (_, i) => i + 1),
        price: 100
      },
      {
        busNumber: 'VK002',
        from: 'Vellore',
        to: 'Kanchipuram',
        departureTime: generateDate(0, 10, 30),
        duration: 2,
        busType: 'AC',
        totalSeats: 40,
        availableSeats: Array.from({ length: 25 }, (_, i) => i + 1),
        price: 150
      },
      {
        busNumber: 'VK003',
        from: 'Vellore',
        to: 'Kanchipuram',
        departureTime: generateDate(0, 14, 15),
        duration: 2,
        busType: 'Semi-Sleeper',
        totalSeats: 45,
        availableSeats: Array.from({ length: 40 }, (_, i) => i + 1),
        price: 120
      },
      // Chennai routes
      {
        busNumber: 'TN001',
        from: 'Chennai',
        to: 'Coimbatore',
        departureTime: generateDate(0, 6, 0),
        duration: 8,
        busType: 'AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 50 }, (_, i) => i + 1),
        price: 450
      },
      {
        busNumber: 'TN002',
        from: 'Chennai',
        to: 'Madurai',
        departureTime: generateDate(0, 8, 30),
        duration: 6,
        busType: 'Non-AC',
        totalSeats: 45,
        availableSeats: Array.from({ length: 45 }, (_, i) => i + 1),
        price: 550
      },
      {
        busNumber: 'TN003',
        from: 'Chennai',
        to: 'Tiruchchirappalli',
        departureTime: generateDate(0, 10, 0),
        duration: 5,
        busType: 'Sleeper',
        totalSeats: 40,
        availableSeats: Array.from({ length: 40 }, (_, i) => i + 1),
        price: 350
      },
      {
        busNumber: 'TN004',
        from: 'Coimbatore',
        to: 'Chennai',
        departureTime: generateDate(0, 14, 0),
        duration: 8,
        busType: 'AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 50 }, (_, i) => i + 1),
        price: 450
      },
      {
        busNumber: 'TN005',
        from: 'Madurai',
        to: 'Chennai',
        departureTime: generateDate(0, 16, 30),
        duration: 6,
        busType: 'Non-AC',
        totalSeats: 45,
        availableSeats: Array.from({ length: 45 }, (_, i) => i + 1),
        price: 550
      },
      {
        busNumber: 'TN006',
        from: 'Tiruchchirappalli',
        to: 'Chennai',
        departureTime: generateDate(0, 18, 0),
        duration: 5,
        busType: 'Semi-Sleeper',
        totalSeats: 40,
        availableSeats: Array.from({ length: 40 }, (_, i) => i + 1),
        price: 350
      },
      {
        busNumber: 'CD001',
        from: 'Chennai',
        to: 'Chengalpattu',
        departureTime: generateDate(0, 7, 30),
        duration: 1.5,
        busType: 'Non-AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 48 }, (_, i) => i + 1),
        price: 80
      },
      {
        busNumber: 'RV001',
        from: 'Ranipet',
        to: 'Vellore',
        departureTime: generateDate(0, 10, 30),
        duration: 1,
        busType: 'Non-AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 45 }, (_, i) => i + 1),
        price: 60
      },
      {
        busNumber: 'TV002',
        from: 'Tiruvallur',
        to: 'Chennai',
        departureTime: generateDate(0, 6, 45),
        duration: 1.5,
        busType: 'Non-AC',
        totalSeats: 48,
        availableSeats: Array.from({ length: 43 }, (_, i) => i + 1),
        price: 70
      },
      {
        busNumber: 'IS001',
        from: 'Chennai',
        to: 'Bangalore',
        departureTime: generateDate(0, 7, 0),
        duration: 6,
        busType: 'AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 50 }, (_, i) => i + 1),
        price: 600
      },
      {
        busNumber: 'IS002',
        from: 'Chennai',
        to: 'Pondicherry',
        departureTime: generateDate(0, 11, 0),
        duration: 3,
        busType: 'AC',
        totalSeats: 40,
        availableSeats: Array.from({ length: 35 }, (_, i) => i + 1),
        price: 200
      },
      {
        busNumber: 'CHV001',
        from: 'Chennai',
        to: 'Vellore',
        departureTime: generateDate(1, 7, 0),
        duration: 2,
        busType: 'AC',
        totalSeats: 40,
        availableSeats: Array.from({ length: 40 }, (_, i) => i + 1),
        price: 160
      },
      {
        busNumber: 'CHV002',
        from: 'Chennai',
        to: 'Vellore',
        departureTime: generateDate(1, 13, 30),
        duration: 2,
        busType: 'Non-AC',
        totalSeats: 50,
        availableSeats: Array.from({ length: 45 }, (_, i) => i + 1),
        price: 110
      },
      {
        busNumber: 'KPV001',
        from: 'Kanchipuram',
        to: 'Vellore',
        departureTime: generateDate(1, 9, 0),
        duration: 2,
        busType: 'Semi-Sleeper',
        totalSeats: 45,
        availableSeats: Array.from({ length: 42 }, (_, i) => i + 1),
        price: 120
      },
      {
        busNumber: 'CHP001',
        from: 'Chennai',
        to: 'Pondicherry',
        departureTime: generateDate(1, 11, 0),
        duration: 3,
        busType: 'AC',
        totalSeats: 42,
        availableSeats: Array.from({ length: 42 }, (_, i) => i + 1),
        price: 220
      },
      {
        busNumber: 'CVC001',
        from: 'Chengalpattu',
        to: 'Vellore',
        departureTime: generateDate(1, 8, 45),
        duration: 2.5,
        busType: 'Non-AC',
        totalSeats: 48,
        availableSeats: Array.from({ length: 48 }, (_, i) => i + 1),
        price: 130
      }
    ];

    await Bus.insertMany(buses);
    console.log(buses.length + ' buses created successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
