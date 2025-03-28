import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindAllTasksUseCase,
  FindTaskByIdUseCase,
  UpdateTaskUseCase,
  TaskRepository,
  TaskMapper,
} from '@my-task-timer/tasks-domain';
import { TaskRepositoryImpl } from '@my-task-timer/tasks-data-source';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    TaskMapper,
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
  ],
  exports: [TaskRepository, TaskMapper],
})
export class TasksResourceModule {}
