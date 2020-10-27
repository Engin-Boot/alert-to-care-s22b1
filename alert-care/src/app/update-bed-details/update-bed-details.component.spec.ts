import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBedDetailsComponent } from './update-bed-details.component';

describe('UpdateBedDetailsComponent', () => {
  let component: UpdateBedDetailsComponent;
  let fixture: ComponentFixture<UpdateBedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
