import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPatientDetailsComponent } from './view-patient-details.component';
import {ActivatedRoute} from '@angular/router';
import {PatientDataService} from '../services/patient-data.service';
import {PatientData} from '../models/patient-data';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as deepEqual from 'deep-equal';
import { By } from '@angular/platform-browser';
import {BedDataService} from '../services/bed-data.service';

describe('ViewPatientDetailsComponent', () => {
  let component: ViewPatientDetailsComponent;
  let fixture: ComponentFixture<ViewPatientDetailsComponent>;
  let patientDataServiceRef: PatientDataService;
  let route: ActivatedRoute;
  let bedDataServiceRef: BedDataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPatientDetailsComponent ], 
      imports: [ HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule ],
      providers: [ PatientDataService, PatientData, BedDataService,
      {provide: ActivatedRoute, useValue: {snapshot: {params: {'bedId': 'B2111'}}}},   
      ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientDetailsComponent);
    component = fixture.componentInstance;
    patientDataServiceRef =  TestBed.inject(PatientDataService);
    bedDataServiceRef = TestBed.inject(BedDataService);
    route = TestBed.inject(ActivatedRoute);
    
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the object is of type PatientData and it is not null', () => {
    let data: PatientData = {
      bedID: 'B2111',
      bpm: 'unstable',
      dateOfBirth: '1998-10-21',
      mobileNumber: '9174661167',
      name: 'Shivani Bollabattin',
      patientID: 'P1',
      spo2: 'unstable'
    };

    component = fixture.componentInstance;
    component.ngOnInit();
    
    console.log('from testcase');
    console.log(component.patientData);
    fixture.detectChanges();
    const a = fixture.debugElement.query(By.css('a'));
    console.log(a.nativeElement.textContent.trim());
    console.log(deepEqual(data,component.patientData));
    expect(component.patientData instanceof PatientData).toBeTruthy(); 
    expect(component.patientData!=null).toBeTruthy();   
  });

});
