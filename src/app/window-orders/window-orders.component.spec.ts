import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowOrdersComponent } from './window-orders.component';

describe('WindowOrdersComponent', () => {
  let component: WindowOrdersComponent;
  let fixture: ComponentFixture<WindowOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
