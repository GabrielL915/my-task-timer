import { DRIZZLE_PROVIDER, schema } from '@my-task-timer/shared-data-source';
import { Task, TaskRepository } from '@my-task-timer/tasks-domain';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async createOne(input: Task): Promise<Task> {
    const { id, ...insertData } = input;
    const [createTask]: Task[] = await this.db
      .insert(schema.tasks)
      .values([insertData])
      .returning();
    return createTask;
  }

  async updateOne(id: string, input: Task): Promise<Task> {
    const [updatedTask] = await this.db
      .update(schema.tasks)
      .set(input)
      .where(eq(schema.tasks.id, id))
      .returning();

    return updatedTask;
  }

  async deleteOne(id: string) {
    await this.db.delete(schema.tasks).where(eq(schema.tasks.id, id)).execute();
    return 'Task removed successfully';
  }

  async findOne(id: string): Promise<Task> {
    const [findOneTask] = await this.db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id));
    return findOneTask;
  }

  async findAllById(userId: string) {
    const tasks: Task[] = await this.db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.userId, userId));
    return tasks;
  }
}
