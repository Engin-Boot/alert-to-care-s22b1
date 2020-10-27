import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,Validators} from '@angular/forms'
import {ActivatedRoute} from '@angular/router';
import {PatientDataService} from '../services/patient-data.service';

@Component({
  selector: 'app-update-patient-details',
  templateUrl: './update-patient-details.component.html',
  styleUrls: ['./update-patient-details.component.css']
})
export class UpdatePatientDetailsComponent implements OnInit {
levels = ['stable','unstable']
updatePatientDetailsForm;
route:ActivatedRoute;
patientDataServiceRef:PatientDataService;
id;
updateSuccess:boolean;
updateFail:boolean;

  constructor(patientDataServiceRef:PatientDataService,route:ActivatedRoute) {
    this.route=route;
    this.patientDataServiceRef=patientDataServiceRef;
   }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['patientId'];
    this.updatePatientDetailsForm = new FormGroup({
      patientID:new FormControl(''),
      bedID:new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      mobileNumber:new FormControl('',Validators.required),
      dateOfBirth:new FormControl('',Validators.required),
      spo2:new FormControl('',Validators.required),
      bpm:new FormControl('',Validators.required)
    })
    
    this.patientDataServiceRef.getPatientDataById(this.id).subscribe(
      data=>{
        console.log(data);
        this.updatePatientDetailsForm.setValue(data);
      }
    )
  }

  get patientID()
  {
    return this.updatePatientDetailsForm.get('patientID');
  }

  get bedID()
  {
    return this.updatePatientDetailsForm.get('bedID');
  }

  get name()
  {
    return this.updatePatientDetailsForm.get('name');
  }

  get mobileNumber()
  {
    return this.updatePatientDetailsForm.get('mobileNumber');
  }

  get dateOfBirth()
  {
    return this.updatePatientDetailsForm.get('dateOfBirth');
  }

  get spo2()
  {
    return this.updatePatientDetailsForm.get('spo2');
  }

  get bpm()
  {
    return this.updatePatientDetailsForm.get('bpm')
  }

  updatePatientDetails(data)
  {
    console.log(data);
    this.patientDataServiceRef.updatePatientData(this.id,data).subscribe(
      data=>{
        this.updateSuccess=true;
        this.updatePatientDetailsForm.reset();
      },
      err=>{
        this.updateFail=true;
      }
    ) 
  }

}
