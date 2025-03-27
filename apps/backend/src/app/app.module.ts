import { Module } from '@nestjs/common';
import { AccountUsersResourceModule } from '@my-task-timer/account-users-resource';
import { DrizzleModule } from '@my-task-timer/shared-resource';
import { ConfigModule } from '@nestjs/config';
import { environment } from '../../../../config/config';
import { TasksResourceModule } from '@my-task-timer/tasks-resource';
import { TimeLogResourceModule } from '@my-task-timer/time-log-resource';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => environment],
    }),
    DrizzleModule,
    AccountUsersResourceModule,
    TasksResourceModule,
    TimeLogResourceModule,
  ],
})
export class AppModule {}
