import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models/Auth';
import { UserModel } from '@types/mongoose';

interface JwtPayload extends UserModel {
  projectId?: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRATION: string;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;

    verify(token, process.env.JWT_SECRET, (err: Error) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const decodedToken = verify(token, process.env.JWT_SECRET) as JwtPayload;

      const user = User.findById(decodedToken.id).exec();

      if (user) {
        req.user = decodedToken;
        next();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

export default authMiddleware;