import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListsComponent } from './lists.component';

describe('StudentScheduleComponent', () => {
  let component: AdminListsComponent;
  let fixture: ComponentFixture<AdminListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
