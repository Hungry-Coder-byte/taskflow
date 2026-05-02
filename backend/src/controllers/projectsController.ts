import express from 'express';
import mongoose from 'mongoose';
import { Project } from '../src/models/Projects';
import { ProjectModel } from '../src/models/Projects';
import { ZodError } from 'zod';

const router = express.Router();

interface ProjectController {
  createProject: (req: express.Request, res: express.Response) => void;
  getAllProjects: (req: express.Request, res: express.Response) => void;
  getProjectById: (req: express.Request, res: express.Response) => void;
  updateProject: (req: express.Request, res: express.Response) => void;
  deleteProject: (req: express.Request, res: express.Response) => void;
}

const projectsController: ProjectController = {
  createProject: async (req: express.Request, res: express.Response) => {
    try {
      const { name, description, dueDate } = req.body as any;

      const createProjectSchema = zod.object({
        name: zod.string().min(3, 'Project name must be at least 3 characters long'),
        description: zod.string().optional(),
        dueDate: zod.string().optional(),
      });

      const validationResult = await createProjectSchema.safeParse(req.body);

      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.message });
      }

      const newProject = new ProjectModel({
        name,
        description,
        dueDate,
        userId: req.user.userId,
      });

      await newProject.save();

      res.status(201).json(newProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  },

  getAllProjects: async (req: express.Request, res: express.Response) => {
    try {
      const projects = await ProjectModel.find({ userId: req.user.userId });
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get projects' });
    }
  },

  getProjectById: async (req: express.Request, res: express.Response) => {
    try {
      const { projectId } = req.params;

      const project = await ProjectModel.findOne({
        _id: projectId,
        userId: req.user.userId,
      });

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get project' });
    }
  },

  updateProject: async (req: express.Request, res: express.Response) => {
    try {
      const { projectId } = req.params;
      const { name, description, dueDate } = req.body as any;

      const updateProjectSchema = zod.object({
        name: zod.string().optional(),
        description: zod.string().optional(),
        dueDate: zod.string().optional(),
      });

      const validationResult = await updateProjectSchema.safeParse(req.body);

      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.message });
      }

      const project = await ProjectModel.findByIdAndUpdate(
        { _id: projectId, userId: req.user.userId },
        { name, description, dueDate },
        { new: true }
      );

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  },

  deleteProject: async (req: express.Request, res: express.Response) => {
    try {
      const { projectId } = req.params;

      const project = await ProjectModel.findOneAndDelete({
        _id: projectId,
        userId: req.user.userId,
      });

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  },
};

export default projectsController;