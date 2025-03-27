import {
  Create,
  FindOne,
  FindAll,
  Delete,
  Update,
} from '@my-task-timer/shared-interfaces';
import { TimeLog } from '../entities/timeLog.entity';

export abstract class TimeLogRepository
  implements
    Create<TimeLog, TimeLog>,
    Update<TimeLog, keyof TimeLog, TimeLog>,
    FindOne<TimeLog, keyof TimeLog, TimeLog>,
    FindAll<TimeLog>,
    Delete<TimeLog, keyof TimeLog, void>
{
  abstract createOne(input: TimeLog): Promise<TimeLog>;

  abstract updateOne(id: keyof TimeLog, input: TimeLog): Promise<TimeLog>;

  abstract deleteOne(id: keyof TimeLog): Promise<void>;

  abstract findOne(id: keyof TimeLog): Promise<TimeLog>;

  abstract findAll(): Promise<TimeLog[]>;
}
