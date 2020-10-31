import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewPatientComponent } from './add-new-patient.component';
import {ActivatedRoute} from '@angular/router';
import {BedDataService} from '../services/bed-data.service';
import {PatientDataService} from '../services/patient-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AddNewPatientComponent', () => {
  let component: AddNewPatientComponent;
  let fixture: ComponentFixture<AddNewPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPatientComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [BedDataService, PatientDataService, 
      {provide: ActivatedRoute, useValue: {snapshot: {params: {'bedId': 'B2111'}}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit button', () => {
    spyOn(component,'addPatientDetails');
    let e1 = fixture.debugElement.query(By.css('button')).nativeElement;
    e1.click();
    expect(component.addPatientDetails).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid', () => {

    component.addPatientDetailsForm.controls['bedID'].setValue(null);
    component.addPatientDetailsForm.controls['patientID'].setValue(null);
    component.addPatientDetailsForm.controls['name'].setValue(null);
    component.addPatientDetailsForm.controls['mobileNumber'].setValue(null);
    component.addPatientDetailsForm.controls['bpm'].setValue(null);
    component.addPatientDetailsForm.controls['spo2'].setValue(null);
    component.addPatientDetailsForm.controls['dateOfBirth'].setValue(null);
    expect(component.addPatientDetailsForm.valid).toBeFalsy();
  })

  it('form should be valid when all details are filled', () => {
    component.addPatientDetailsForm.controls['bedID'].setValue('B2111');
    component.addPatientDetailsForm.controls['patientID'].setValue('P1');
    component.addPatientDetailsForm.controls['name'].setValue('Shivani');
    component.addPatientDetailsForm.controls['mobileNumber'].setValue(1234567890);
    component.addPatientDetailsForm.controls['bpm'].setValue('stable');
    component.addPatientDetailsForm.controls['spo2'].setValue('unstable');
    component.addPatientDetailsForm.controls['dateOfBirth'].setValue('10/21/1998');
    expect(component.addPatientDetailsForm.valid).toBeTruthy();
  })

});
