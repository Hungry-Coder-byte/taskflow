import mongoose, { Schema, Document } from 'mongoose';

// Define the Auth schema
export interface Auth extends Document {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AuthSchema: Schema = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
};

// Create the Auth model
export default mongoose.model<Auth>('Auth', AuthSchema);