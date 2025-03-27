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

    const timeLogDomain = this.timeLogMapper.toEntity(input);

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
