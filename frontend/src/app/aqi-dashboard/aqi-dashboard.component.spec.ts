import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqiDashboardComponent } from './aqi-dashboard.component';

describe('AqiDashboardComponent', () => {
  let component: AqiDashboardComponent;
  let fixture: ComponentFixture<AqiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqiDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
