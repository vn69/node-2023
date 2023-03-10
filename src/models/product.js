import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  name:  String,
  description: String,
  price: Number,
  image: String,
  category: String,
  quantity: Number,
}, {
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

export default mongoose.model('product', productSchema);
