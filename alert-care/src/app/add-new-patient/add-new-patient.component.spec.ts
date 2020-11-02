import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewPatientComponent } from './add-new-patient.component';
import {ActivatedRoute} from '@angular/router';
import {BedDataService} from '../services/bed-data.service';
import {PatientDataService} from '../services/patient-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import{ PatientDataStub} from '../stubs/patientDataStub'
import { PatientData } from '../models/patient-data';

describe('AddNewPatientComponent', () => {
  let component: AddNewPatientComponent;
  let fixture: ComponentFixture<AddNewPatientComponent>;
  let patientDataServiceRef : PatientDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPatientComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [BedDataService, 
      {provide:PatientDataService, useClass:PatientDataStub},
      {provide: ActivatedRoute, useValue: {snapshot: {params: {'bedId': 'B2111'}}}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    patientDataServiceRef = TestBed.inject(PatientDataService);
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
  it('should add patient details successfully',  () => {
   
    let patientData:PatientData = ({
      bedID : "B2111",
      bpm : "unstable",
      dateOfBirth: "1998-10-21",
      mobileNumber: "9174661167",
      name: "Shivani Bollabattin",
      patientID: 'P1',
      spo2: "unstable" 
    });

    let addDetailsSpy = spyOn(component,'addPatientDetails')
    .and
    .callThrough();
    const postDataSpy = spyOn(patientDataServiceRef, 'postPatientData')
    .and
    .callThrough();
   
    
    component.addPatientDetails(patientData);
    fixture.detectChanges();

    expect(addDetailsSpy).toHaveBeenCalled();

    expect(postDataSpy).toHaveBeenCalled();

  });

});
