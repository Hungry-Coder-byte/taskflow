import express from 'express';
import mongoose from 'mongoose';
import { Task } from '../src/models/Tasks';
import { TaskController } from '../src/controllers/tasksController';
import zod from 'zod';
import { ZodError } from 'zod';

const router = express.Router();

const createTaskSchema = zod.object({
  title: zod.string().min(3, 'Task title must be at least 3 characters long'),
  description: zod.string().optional(),
  projectId: zod.string().optional(),
  dueDate: zod.string().optional(),
  assignee: zod.string().optional(),
});

interface TaskRequest extends Task {
  title: string;
  description?: string;
  projectId?: string;
  dueDate?: string;
  assignee?: string;
}

router.post('/', async (req, res) => {
  const validatedTask: TaskRequest = await createTaskSchema.parseAsync(req.body);

  try {
    const newTask = new TaskController.Task(validatedTask);
    await newTask.save();
    res.status(201).json(newTask.toObject());
  } catch (error: any) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await TaskController.getAllTasks(req.user.id);
    res.status(200).json(tasks);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

router.get('/:taskId', async (req, res) => {
  try {
    const task = await TaskController.getTaskById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
});

router.put('/:taskId', async (req, res) => {
  try {
    const updatedTask = await TaskController.updateTask(req.params.taskId, req.body);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:taskId', async (req, res) => {
  try {
    await TaskController.deleteTask(req.params.taskId);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});