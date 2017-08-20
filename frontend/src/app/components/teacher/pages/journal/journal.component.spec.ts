import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherJournalComponent } from './journal.component';

describe('StudentScheduleComponent', () => {
  let component: TeacherJournalComponent;
  let fixture: ComponentFixture<TeacherJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
