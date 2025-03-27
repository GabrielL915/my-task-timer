import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import {
  CreateTimeLogDto,
  ResponseTimeLogDto,
} from '@my-task-timer/time-log-domain';
import { TimeLogMapper } from '../mappers/timeLog.mapper';
import { TimeLogRepository } from '../repository/timeLog.repository';
import { TimeLog } from '../entities/timeLog.entity';

@Injectable()
export class CreateTimeLogUseCase
  implements Usecase<CreateTimeLogDto, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(input: CreateTimeLogDto): Promise<ResponseTimeLogDto> {
    const timeLogDomain = this.timeLogMapper.toEntity(input);

    timeLogDomain.startedAt = new Date(
      new Date(timeLogDomain.startedAt).toLocaleString('en-US', {
        timeZone: 'America/Sao_Paulo',
      })
    ) as any;

    console.log('input', timeLogDomain);
    const createdTimeLog = await this.timeLogRepository.createOne(
      timeLogDomain as TimeLog
    );
    console.log('input', createdTimeLog);

    return this.timeLogMapper.toResponse(createdTimeLog);
  }
}
