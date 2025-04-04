import { Task } from '@my-task-timer/tasks-domain';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateTimeLogDto {
  @Expose()
  @IsDateString(
    {},
    { message: 'A data de início do log de tempo é obrigatória.' }
  )
  @ApiProperty({
    example: '2025-01-01',
    description: 'Data de início do log de tempo',
  })
  startedAt!: Date;

  @Expose()
  @IsNotEmpty({ message: 'A tarefa relacionada deve ser informada.' })
  @ApiProperty({
    example: {
      id: '123',
    },
    description: 'ID da tarefa relacionada ao log de tempo',
  })
  task?: Task;
}
