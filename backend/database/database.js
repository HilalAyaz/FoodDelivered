const mongoose = require('mongoose')
require('dotenv').config()

async function dbConnect () {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const menu_items = await mongoose.connection.db.collection('FoodItems')
    const data = await menu_items.find({}).toArray()

    const foodCategory = await mongoose.connection.db.collection('FoodCategory')
    const catData = await foodCategory.find({}).toArray()

    global.foodItems = data
    global.foodCategory = catData

    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
  }
}

module.exports = dbConnect
