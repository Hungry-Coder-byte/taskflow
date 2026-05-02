import express from 'express';
import mongoose from 'mongoose';
import { Project } from '../src/models/Projects';
import { ProjectController } from '../src/controllers/projectsController';
import zod from 'zod';
import { ZodError } from 'zod';

const router = express.Router();

const createProjectSchema = zod.object({
  name: zod.string().min(3, 'Project name must be at least 3 characters long'),
  description: zod.string().optional(),
  dueDate: zod.string().optional(),
});

router.post('/', async (req, res) => {
  try {
    const validationError = await createProjectSchema.safeParse(req.body);

    if (validationError.error) {
      return res.status(400).json({ error: validationError.error.message });
    }

    const newProject = new Project({
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
      createdBy: req.user.id,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, createdBy: req.user.id });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

router.put('/:projectId', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
        updatedBy: req.user.id,
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

router.delete('/:projectId', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(deletedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});