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
    const timeLogDomain: TimeLog = this.timeLogMapper.toEntity(
      input
    ) as unknown as TimeLog;

    timeLogDomain.startedAt = new Date(
      new Date(timeLogDomain.startedAt).toLocaleString('en-US', {
        timeZone: 'America/Sao_Paulo',
      })
    );

    const createdTimeLog = await this.timeLogRepository.createOne(
      timeLogDomain
    );

    return this.timeLogMapper.toResponse(createdTimeLog);
  }
}
