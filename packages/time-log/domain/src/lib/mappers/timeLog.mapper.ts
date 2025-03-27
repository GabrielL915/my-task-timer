import { Mapper } from '@my-task-timer/shared-interfaces';
import {
  CreateTimeLogDto,
  ResponseTimeLogDto,
  UpdateTimeLogDto,
} from '@my-task-timer/time-log-domain';
import { TimeLog } from '../entities/timeLog.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class TimeLogMapper implements Mapper<CreateTimeLogDto, any> {
  toEntity(input: CreateTimeLogDto | UpdateTimeLogDto) {
    if (input instanceof UpdateTimeLogDto) {
      return {
        ...input,
      };
    }
    return {
      startedAt: input.startedAt,
      taskId: input.task!.id,
    };
  }

  toDto(domain: TimeLog): CreateTimeLogDto {
    return {
      ...domain,
    };
  }

  toResponse(domain: TimeLog): ResponseTimeLogDto {
    const timeLogInstance = plainToInstance(CreateTimeLogDto, domain);
    return instanceToPlain(timeLogInstance) as ResponseTimeLogDto;
  }
}
