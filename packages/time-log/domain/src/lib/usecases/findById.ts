import { Injectable, NotFoundException } from '@nestjs/common';
import { Usecase } from '@my-task-timer/shared-interfaces';
import {
  ResponseTimeLogDto,
  TimeLog,
  TimeLogMapper,
  TimeLogRepository,
} from '@my-task-timer/time-log-domain';

@Injectable()
export class FindTimeLogByIdUseCase
  implements Usecase<keyof TimeLog, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(input: keyof TimeLog): Promise<ResponseTimeLogDto> {
    const timeLog = await this.timeLogRepository.findOne(input);
    if (!timeLog) {
      throw new NotFoundException('TimeLog not found');
    }
    return this.timeLogMapper.toResponse(timeLog);
  }
}
