import mongoose from 'mongoose';
import { Auth, Auth extends Document } from '../models/Auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/Auth';
import { UserModel } from '@types/mongoose';

interface JwtPayload extends UserModel {
  projectId?: string;
}

export class AuthController {
  static async register(body: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    try {
      const { email, password, firstName, lastName } = body;

      const auth = new Auth({
        email,
        password,
        firstName,
        lastName,
      });

      await auth.save();

      return { message: 'User registered successfully', user: auth };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to register user');
    }
  }

  static async login(body: { email: string; password: string }) {
    try {
      const { email, password } = body;

      const auth = await Auth.findOne({ email });

      if (!auth) {
        throw new Error('User not found');
      }

      const isPasswordValid = await auth.isValidPassword(password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const payload: JwtPayload = auth as any;

      const token = auth.generateToken();

      return { message: 'Login successful', token };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to login user');
    }
  }
}