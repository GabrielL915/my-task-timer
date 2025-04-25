import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tasks-feature-shell',
    loadChildren: () =>
      import('@my-task-timer/tasks-feature').then(
        (m) => m.tasksFeatureShellRoutes
      ),
  },
];
