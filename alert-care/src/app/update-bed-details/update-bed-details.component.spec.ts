import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateBedDetailsComponent } from './update-bed-details.component';
import {ActivatedRoute} from '@angular/router';
import {BedDataService} from '../services/bed-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('UpdateBedDetailsComponent', () => {
  let component: UpdateBedDetailsComponent;
  let fixture: ComponentFixture<UpdateBedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBedDetailsComponent ],
      imports: [HttpClientTestingModule],
      providers: [BedDataService, 
      {provide:ActivatedRoute, useValue: {snapshot: {params: {'bedId': 'B2111'}}}}
      ]
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

  it('should call update button', () => {
    spyOn(component,'updateBedDetails');
    let e1 = fixture.debugElement.query(By.css('button')).nativeElement;
    e1.click();
    expect(component.updateBedDetails).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid', () => {

    component.updateBedDetailsForm.controls['bedID'].setValue(null);
    component.updateBedDetailsForm.controls['department'].setValue(null);
    component.updateBedDetailsForm.controls['occupancyStatus'].setValue(null);
    expect(component.updateBedDetailsForm.valid).toBeFalsy();
  })

  it('form should be valid when all details are filled', () => {
    component.updateBedDetailsForm.controls['bedID'].setValue('B2111');
    component.updateBedDetailsForm.controls['department'].setValue('Dental');
    component.updateBedDetailsForm.controls['occupancyStatus'].setValue('Vacant');
    expect(component.updateBedDetailsForm.valid).toBeTruthy();
  })


});
