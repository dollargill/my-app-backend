// scripts/testIntex.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Intex = require('../models/Intex');

const testIntex = async () => {
  await connectDB();

  try {
    // Fetch all documents from the intex collection
    const documents = await Intex.find({});
    console.log('Documents from intex collection:', documents);

    
    const newDoc = new Intex({
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      points: 2000,
      level: 'Platinum',
      rewards: ['Reward3'],
    });
    await newDoc.save();
    console.log('New document saved:', newDoc);
    
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

testIntex();
