import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';
import { ResponseTimeLogDto } from '../dtos/response.timeLog.dto';
import { TimeLog } from '../entities/timeLog.entity';
import { TimeLogRepository } from '../repository/timeLog.repository';
import { TimeLogMapper } from '../mappers/timeLog.mapper';
import { UpdateTimeLogDto } from '../dtos/update.timeLog';
import { FindTimeLogByIdUseCase } from './findById';

@Injectable()
export class UpdateTimeLogUseCase
  implements Usecase<UpdateTimeLogDto, ResponseTimeLogDto>
{
  constructor(
    private readonly timeLogRepository: TimeLogRepository,
    private readonly findTimeLogByIdUseCase: FindTimeLogByIdUseCase,
    private readonly timeLogMapper: TimeLogMapper
  ) {}

  async execute(input: UpdateTimeLogDto): Promise<ResponseTimeLogDto> {
    const findedTimeLog = await this.findTimeLogByIdUseCase.execute(
      input.id as keyof TimeLog
    );

    const timeLogDomain: TimeLog = {
      ...this.timeLogMapper.toEntity(input),
      id: input.id,
      startedAt: new Date(input.startedAt),
    };

    if (input.endedAt && findedTimeLog.endedAt !== input.endedAt) {
      timeLogDomain.endedAt = new Date(
        new Date(input.endedAt).toLocaleString('en-US', {
          timeZone: 'America/Sao_Paulo',
        })
      );

      const timeDiff =
        timeLogDomain.endedAt.getTime() - findedTimeLog.startedAt.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      const timeSpent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      timeLogDomain.timeSpent = timeSpent;
    }

    const updatedTimeLog = await this.timeLogRepository.updateOne(
      findedTimeLog.id as keyof TimeLog,
      {
        ...findedTimeLog,
        ...timeLogDomain,
      }
    );

    return this.timeLogMapper.toResponse(updatedTimeLog);
  }
}
