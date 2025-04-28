import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-task-timer-tasks-ui',
  imports: [CommonModule],
  templateUrl: './tasks-ui.component.html',
  styleUrl: './tasks-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksUiComponent {}
