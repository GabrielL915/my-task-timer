import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksFeatureShellComponent } from './tasks-feature-shell.component';

describe('TasksFeatureShellComponent', () => {
  let component: TasksFeatureShellComponent;
  let fixture: ComponentFixture<TasksFeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksFeatureShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
