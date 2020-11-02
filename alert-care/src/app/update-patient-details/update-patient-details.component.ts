import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PatientDataService} from '../services/patient-data.service';
import {BedDataService} from '../services/bed-data.service';

@Component({
  selector: 'app-update-patient-details',
  templateUrl: './update-patient-details.component.html',
  styleUrls: ['./update-patient-details.component.css']
})

export class UpdatePatientDetailsComponent implements OnInit {
levels = ['stable', 'unstable'];
updatePatientDetailsForm;
route: ActivatedRoute;
patientDataServiceRef: PatientDataService;
id;
updateSuccess: boolean;
updateFail: boolean;
bedDataServiceRef: BedDataService;

  constructor(patientDataServiceRef: PatientDataService, route: ActivatedRoute, bedDataServiceRef: BedDataService) {
    this.route = route;
    this.patientDataServiceRef = patientDataServiceRef;
    this.bedDataServiceRef = bedDataServiceRef;
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['bedId'];
    this.updatePatientDetailsForm = new FormGroup({
      patientID: new FormControl(''),
      bedID: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      spo2: new FormControl('', Validators.required),
      bpm: new FormControl('', Validators.required)
    });
    

    this.bedDataServiceRef.getPatientAllocatedToBed(this.id).subscribe( data => {
        this.patientDataServiceRef.getPatientDataById(data[0].patientID).subscribe(data => {
            console.log(data);
            this.updatePatientDetailsForm.setValue(data);
          }
        );
    },
    err => { alert('Patient Details Not Found!!!'); }
    );
  
  }

  get patientID(): FormControl
  {
    return this.updatePatientDetailsForm.get('patientID');
  }

  get bedID(): FormControl
  {
    return this.updatePatientDetailsForm.get('bedID');
  }

  get name(): FormControl
  {
    return this.updatePatientDetailsForm.get('name');
  }

  get mobileNumber(): FormControl
  {
    return this.updatePatientDetailsForm.get('mobileNumber');
  }

  get dateOfBirth(): FormControl
  {
    return this.updatePatientDetailsForm.get('dateOfBirth');
  }

  get spo2(): FormControl
  {
    return this.updatePatientDetailsForm.get('spo2');
  }

  get bpm(): FormControl
  {
    return this.updatePatientDetailsForm.get('bpm')
  }

  updatePatientDetails(data): void
  {
    //data.mobileNumber.toString();
    console.log(data);
    this.patientDataServiceRef.updatePatientData(data.patientID, data).subscribe(data => {
        this.updateSuccess = true;
        console.log('true');
        this.updatePatientDetailsForm.reset();
      },
      err=>{
        this.updateFail = true;
      }
    );
  }

}
