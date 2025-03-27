import { Expose } from 'class-transformer';
import { CreateTimeLogDto } from '@my-task-timer/time-log-domain';
import { IsDateString, IsString } from 'class-validator';

export class UpdateTimeLogDto extends CreateTimeLogDto {
  @Expose()
  @IsDateString({}, { message: 'A data de fim do log de tempo é obrigatória.' })
  endedAt?: string | null;

  @Expose()
  @IsString({ message: 'O id do log de tempo é obrigatório.' })
  id!: string;
}
