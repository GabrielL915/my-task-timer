import { Task } from '@my-task-timer/tasks-domain';
import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTimeLogDto {
  @Expose()
  @IsDateString(
    {},
    { message: 'A data de início do log de tempo é obrigatória.' }
  )
  startedAt!: string;

  @Expose()
  @IsNotEmpty({ message: 'A tarefa relacionada deve ser informada.' })
  task?: Task;
}
