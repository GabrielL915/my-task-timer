import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-task-timer-tasks-feature',
  imports: [CommonModule],
  templateUrl: './tasks-feature.component.html',
  styleUrl: './tasks-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFeatureComponent {}
