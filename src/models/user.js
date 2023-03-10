import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name:  String,
  email: String,
  password:   String,
}, {
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

export default mongoose.model('user', userSchema);
