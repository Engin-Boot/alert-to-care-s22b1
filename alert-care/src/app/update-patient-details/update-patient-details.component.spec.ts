import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {PatientDataService} from '../services/patient-data.service';
import { UpdatePatientDetailsComponent } from './update-patient-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser'; 
import {BedDataService} from '../services/bed-data.service';

describe('UpdatePatientDetailsComponent', () => {
  let component: UpdatePatientDetailsComponent;
  let fixture: ComponentFixture<UpdatePatientDetailsComponent>;
  let route: ActivatedRoute;
  let patientDataServiceRef: PatientDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePatientDetailsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ PatientDataService, BedDataService,
      {provide: ActivatedRoute, useValue: {snapshot: {params: {'bedId': 'B2111'}}}}
      ]
     
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePatientDetailsComponent);
    component = fixture.componentInstance;
    patientDataServiceRef =  TestBed.inject(PatientDataService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call update button', () => {
    spyOn(component,'updatePatientDetails');
    let e1 = fixture.debugElement.query(By.css('button')).nativeElement;
    e1.click();
    expect(component.updatePatientDetails).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid', () => {

    component.updatePatientDetailsForm.controls['bedID'].setValue(null);
    component.updatePatientDetailsForm.controls['patientID'].setValue(null);
    component.updatePatientDetailsForm.controls['name'].setValue(null);
    component.updatePatientDetailsForm.controls['mobileNumber'].setValue(null);
    component.updatePatientDetailsForm.controls['bpm'].setValue(null);
    component.updatePatientDetailsForm.controls['spo2'].setValue(null);
    component.updatePatientDetailsForm.controls['dateOfBirth'].setValue(null);
    expect(component.updatePatientDetailsForm.valid).toBeFalsy();
  })

  it('form should be valid when all details are filled', () => {
    component.updatePatientDetailsForm.controls['bedID'].setValue('B2111');
    component.updatePatientDetailsForm.controls['patientID'].setValue('P1');
    component.updatePatientDetailsForm.controls['name'].setValue('Shivani');
    component.updatePatientDetailsForm.controls['mobileNumber'].setValue(1234567890);
    component.updatePatientDetailsForm.controls['bpm'].setValue('stable');
    component.updatePatientDetailsForm.controls['spo2'].setValue('unstable');
    component.updatePatientDetailsForm.controls['dateOfBirth'].setValue('10/21/1998');
    expect(component.updatePatientDetailsForm.valid).toBeTruthy();
  })

  /*it('should update patient details', () => {
    spyOn(component.updatePatientDetailsForm, 'reset');
   let data = {
      bedID: "B2111",
      bpm: "unstable",
      dateOfBirth: "1998-10-21",
      mobileNumber: "9174661167",
      name: "Shivani Bollabattin",
      patientID: "P1",
      spo2: "unstable"
   }
   component.updatePatientDetails(data);
   fixture.detectChanges();
   console.log(component['updateSuccess']);
   //expect(component.updatePatientDetailsForm.reset).toHaveBeenCalled();

  });*/



});
