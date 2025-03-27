import { Task } from '@my-task-timer/tasks-domain';
export interface TimeLog {
  id: string;
  startedAt: Date;
  endedAt?: Date | null;
  timeSpent?: string;

  taskId: string;
  task?: Task;
}
