import { Usecase } from '@my-task-timer/shared-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { TaskMapper } from '@my-task-timer/tasks-domain';
import { Task } from '../entities/task.entity';

@Injectable()
export class DeleteTaskUseCase implements Usecase<keyof Task, void> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: keyof Task) {
    await this.taskRepository.deleteOne(input);
    return;
  }
}
