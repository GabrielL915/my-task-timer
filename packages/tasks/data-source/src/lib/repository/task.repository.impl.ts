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

  async updateOne(taskId: keyof Task, input: Task): Promise<Task> {
    const { id, ...updateData } = input;
    const [updateTask]: Task[] = await this.db
      .update(schema.tasks)
      .set(updateData)
      .where(eq(schema.tasks.id, id))
      .returning();
    return updateTask;
  }

  async deleteOne(id: keyof Task) {
    const [deleteTask]: any = await this.db
      .delete(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .returning();
    return deleteTask;
  }

  async findOne(id: keyof Task) {
    const [findOneTask]: any = await this.db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id));
    return findOneTask;
  }

  async findAll() {
    const tasks: Task[] = await this.db.select().from(schema.tasks);
    return tasks;
  }
}
