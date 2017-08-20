import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectsComponent } from './subjects.component';

describe('StudentScheduleComponent', () => {
  let component: AdminSubjectsComponent;
  let fixture: ComponentFixture<AdminSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
