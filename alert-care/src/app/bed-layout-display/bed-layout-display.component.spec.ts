import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedLayoutDisplayComponent } from './bed-layout-display.component';

describe('BedLayoutDisplayComponent', () => {
  let component: BedLayoutDisplayComponent;
  let fixture: ComponentFixture<BedLayoutDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedLayoutDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedLayoutDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
