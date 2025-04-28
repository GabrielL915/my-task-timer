import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksUiComponent } from './tasks-ui.component';

describe('TasksUiComponent', () => {
  let component: TasksUiComponent;
  let fixture: ComponentFixture<TasksUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
