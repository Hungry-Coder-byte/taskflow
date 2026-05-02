import { Project } from '@/models/Projects';
import { Task } from '@/models/Tasks';
import { Auth } from '@/models/Auth';

export type User = Auth & {
  _id: string;
};

export interface TaskItem extends Task {
  _id: string;
}

export interface ProjectItem extends Project {
  _id: string;
}

export interface TaskDetail extends TaskItem {
  _id: string;
}

export interface ProjectDetail extends ProjectItem {
  _id: string;
}