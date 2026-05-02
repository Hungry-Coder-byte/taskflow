import mongoose, { Schema, Document } from 'mongoose';

export interface Project extends Document {
  _id: string;
  name: string;
  description?: string;
  dueDate?: string;
  tasks: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  description: { type: String },
  dueDate: { type: String },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  ownerId: { type: String, required: true },
});

export default ProjectSchema;