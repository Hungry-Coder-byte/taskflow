import express from 'express';
import { Router } from 'react-router-dom';
import { AuthController } from '../controllers/authController';
import { authSchema } from '../schemas/authSchema';
import { ZodError } from 'zod';

const router = new Router();

router.post('/register', express.json(), async (req, res) => {
  try {
    const result = await AuthController.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.post('/login', express.json(), async (req, res) => {
  try {
    const result = await AuthController.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export default router;