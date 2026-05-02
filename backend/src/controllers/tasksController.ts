import express from 'express';
import mongoose from 'mongoose';
import { Task } from '../src/models/Tasks';
import { TaskModel } from '../src/models/Tasks';
import { ZodError } from 'zod';

const router = express.Router();

interface TaskRequest {
  title: string;
  description?: string;
  projectId?: string;
  dueDate?: string;
  assignee?: string;
}

interface TasksController {
  createTask: (req: express.Request, res: express.Response) => void;
  getAllTasks: (req: express.Request, res: express.Response) => void;
  getTaskById: (req: express.Request, res: express.Response) => void;
  updateTask: (req: express.Request, res: express.Response) => void;
  deleteTask: (req: express.Request, res: express.Response) => void;
}

const tasksController: TasksController = {
  createTask: async (req: express.Request, res: express.Response) => {
    try {
      const { title, description, projectId, dueDate, assignee } = req.body as TaskRequest;

      const task = new TaskModel({
        title,
        description,
        projectId,
        dueDate,
        assignee,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await task.save();

      res.status(201).json(task);
    } catch (error: any) {
      console.error(error);
      if (error instanceof ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to create task' });
      }
    }
  },

  getAllTasks: async (req: express.Request, res: express.Response) => {
    try {
      const tasks = await TaskModel.find();
      res.status(200).json(tasks);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get tasks' });
    }
  },

  getTaskById: async (req: express.Request, res: express.Response) => {
    try {
      const { taskId } = req.params;

      const task = await TaskModel.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(200).json(task);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get task' });
    }
  },

  updateTask: async (req: express.Request, res: express.Response) => {
    try {
      const { taskId } = req.params;
      const { title, description, projectId, dueDate, assignee } = req.body as TaskRequest;

      const task = await TaskModel.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      task.title = title;
      task.description = description;
      task.projectId = projectId;
      task.dueDate = dueDate;
      task.assignee = assignee;
      task.updatedAt = new Date();

      await task.save();

      res.status(200).json(task);
    } catch (error: any) {
      console.error(error);
      if (error instanceof ZodError) {
        res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Failed to update task' });
      }
    }
  },

  deleteTask: async (req: express.Request, res: express.Response) => {
    try {
      const { taskId } = req.params;

      const task = await TaskModel.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await task.deleteOne();

      res.status(200).json({ message: 'Task deleted' });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete task' });
    }
  },
};

router.post('/', tasksController.createTask);
router.get('/', tasksController.getAllTasks);
router.get('/:taskId', tasksController.getTaskById);
router.put('/:taskId', tasksController.updateTask);
router.delete('/:taskId', tasksController.deleteTask);

export { tasksController };