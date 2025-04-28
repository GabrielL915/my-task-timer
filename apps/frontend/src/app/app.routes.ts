import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tasks-feature',
    loadChildren: () =>
      import('@my-task-timer/tasks-feature').then((m) => m.tasksFeatureRoutes),
  },
];
