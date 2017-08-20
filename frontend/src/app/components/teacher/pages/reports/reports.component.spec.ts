import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherReportsComponent } from './reports.component';

describe('StudentScheduleComponent', () => {
  let component: TeacherReportsComponent;
  let fixture: ComponentFixture<TeacherReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
