import mongoose, { Schema, Document } from 'mongoose';

export interface Task extends Document {
  _id: string;
  title: string;
  description?: string;
  projectId?: string;
  dueDate?: string;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true, minLength: 3 },
  description: { type: String },
  projectId: { type: String },
  dueDate: { type: String },
  assignee: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default TaskSchema;