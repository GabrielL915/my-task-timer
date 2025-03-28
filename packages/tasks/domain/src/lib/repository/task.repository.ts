import {
  Create,
  Delete,
  FindAll,
  FindOne,
  Update,
} from '@my-task-timer/shared-interfaces';
import { Task } from '../entities/task.entity';
import { ResponseTaskDto } from '../dtos/response.task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TaskRepository
  implements
  Create<Task, Task>,
  Update<Task, keyof Task, Task>,
  FindOne<Task, keyof Task, Task>,
  FindAll<Task>,
  Delete<Task, keyof Task, void> {
  abstract createOne(input: Task): Promise<ResponseTaskDto>;

  abstract updateOne(
    id: keyof Task,
    input: Task
  ): Promise<Task>;

  abstract deleteOne(id: keyof Task): Promise<void>;

  abstract findOne(id: keyof Task): Promise<ResponseTaskDto>;

  abstract findAll(): Promise<ResponseTaskDto[]>;
}
