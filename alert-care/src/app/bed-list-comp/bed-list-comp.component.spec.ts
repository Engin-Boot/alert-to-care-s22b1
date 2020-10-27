import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedListCompComponent } from './bed-list-comp.component';

describe('BedListCompComponent', () => {
  let component: BedListCompComponent;
  let fixture: ComponentFixture<BedListCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedListCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedListCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
