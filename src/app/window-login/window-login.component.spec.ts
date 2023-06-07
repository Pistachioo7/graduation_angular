import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowLoginComponent } from './window-login.component';

describe('WindowLoginComponent', () => {
  let component: WindowLoginComponent;
  let fixture: ComponentFixture<WindowLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
