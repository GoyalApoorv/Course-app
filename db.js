const { Schema, default: mongoose } = require('mongoose');
require('dotenv').config(); 

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log()
  } catch (error) {
    
  }
}

// User Schema
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String, // Corrected typo
  lastName: String,
});

// Admin Schema
const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String, // Corrected typo
  lastName: String,
});

// Course Schema
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  CreatorId: { type: Schema.Types.ObjectId }, // Corrected `Schema.types.ObjectId`
});

// Purchase Schema
const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId }, // Corrected `user0Id` to `userId`
  courseId: { type: Schema.Types.ObjectId },
});

// Models
const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

// Export Models
module.exports = {
  userModel,
  adminModel,
  purchaseModel,
  courseModel,
};
