import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceParkingComponent } from './place-parking.component';

describe('PlaceParkingComponent', () => {
  let component: PlaceParkingComponent;
  let fixture: ComponentFixture<PlaceParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceParkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
