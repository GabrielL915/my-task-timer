import {
  Create,
  FindOne,
  FindAll,
  Delete,
  Update,
} from '@my-task-timer/shared-interfaces';
import { TimeLog } from '../entities/timeLog.entity';
import { ResponseTimeLogDto } from '../dtos/response.timeLog.dto';

export abstract class TimeLogRepository
  implements
    Create<TimeLog, TimeLog>,
    Update<TimeLog, keyof TimeLog, TimeLog>,
    FindOne<TimeLog, keyof TimeLog, TimeLog>,
    FindAll<TimeLog>,
    Delete<TimeLog, keyof TimeLog, void>
{
  abstract createOne(input: TimeLog): Promise<ResponseTimeLogDto>;

  abstract updateOne(id: keyof TimeLog, input: TimeLog): Promise<TimeLog>;

  abstract deleteOne(id: keyof TimeLog): Promise<void>;

  abstract findOne(id: keyof TimeLog): Promise<ResponseTimeLogDto>;

  abstract findAll(): Promise<ResponseTimeLogDto[]>;
}
