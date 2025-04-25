import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'devmx-tasks-feature-shell',
  imports: [CommonModule],
  templateUrl: './tasks-feature-shell.component.html',
  styleUrl: './tasks-feature-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFeatureShellComponent {}
