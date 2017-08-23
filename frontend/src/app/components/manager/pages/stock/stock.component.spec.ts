import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStockComponent } from './stock.component';

describe('ManagerStockComponent', () => {
  let component: ManagerStockComponent;
  let fixture: ComponentFixture<ManagerStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
