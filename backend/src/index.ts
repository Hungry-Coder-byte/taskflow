import express from 'express';
import projectsRoutes from './routes/projects.ts';
import tasksRoutes from './routes/tasks.ts';
import authRoutes from './routes/auth.ts';
import { authMiddleware } from './middleware/auth.ts';
import dbConfig from './config/db.ts';
import { errorHandler } from './middleware/errorHandler.ts';

const app = express();
const port = dbConfig.port || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', authMiddleware, projectsRoutes);
app.use('/api/tasks', authMiddleware, tasksRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});