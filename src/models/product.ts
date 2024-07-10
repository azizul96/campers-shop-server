import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  ratings: number;
  images: string[];
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  ratings: { type: Number, required: true },
  images: { type: [String], required: true },
});

export default mongoose.model<IProduct>('Product', productSchema);
