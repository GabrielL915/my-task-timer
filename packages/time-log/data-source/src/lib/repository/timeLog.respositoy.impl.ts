import { DRIZZLE_PROVIDER, schema } from '@my-task-timer/shared-data-source';
import {
  ResponseTimeLogDto,
  TimeLog,
  TimeLogRepository,
} from '@my-task-timer/time-log-domain';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class TimeLogRepositoryImpl implements TimeLogRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async createOne(input: TimeLog): Promise<ResponseTimeLogDto> {
    const { id, ...insertData } = input;
    const [createTimeLog]: any[] = await this.db
      .insert(schema.timeLogs)
      .values([insertData] as any)
      .returning();
    return createTimeLog;
  }

  async updateOne(timeLogId: keyof TimeLog, input: TimeLog): Promise<TimeLog> {
    const { id, ...updateData } = input;
    const [updateTimeLog]: any[] = await this.db
      .update(schema.timeLogs)
      .set(updateData as any)
      .where(eq(schema.timeLogs.id, id))
      .returning();
    return updateTimeLog;
  }

  async deleteOne(id: keyof TimeLog) {
    const [deleteTimeLog]: any = await this.db
      .delete(schema.timeLogs)
      .where(eq(schema.timeLogs.id, id))
      .returning();
    return deleteTimeLog;
  }

  async findOne(id: keyof TimeLog) {
    const [findOneTimeLog]: any = await this.db
      .select()
      .from(schema.timeLogs)
      .where(eq(schema.timeLogs.id, id));
    return findOneTimeLog;
  }

  async findAll() {
    const timeLogs: any = await this.db.select().from(schema.timeLogs);
    return timeLogs.map((timeLog: any) => timeLog);
  }
}
